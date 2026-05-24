import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";
import { adminEmailTemplate, userAutoReplyTemplate, ContactFormData } from "@/lib/email-templates";

// ─── Rate limiting (simple in-memory; use Redis/Upstash in production cluster) ───
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per IP per window
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

// ─── Input validation ─────────────────────────────────────────────────────────
function validateInput(body: unknown): { data: ContactFormData; error?: never } | { data?: never; error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body." };
  }

  const { name, phone, email, service, message } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { error: "Name must be at least 2 characters." };
  }

  if (!phone || typeof phone !== "string") {
    return { error: "Phone number is required." };
  }

  // Basic phone validation — allows +91, spaces, dashes
  const phoneClean = phone.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{7,15}$/.test(phoneClean)) {
    return { error: "Please enter a valid phone number." };
  }

  if (email && typeof email === "string" && email.trim() !== "") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { error: "Please enter a valid email address." };
    }
  }

  if (message && typeof message === "string" && message.trim().length > 2000) {
    return { error: "Message must be under 2000 characters." };
  }

  return {
    data: {
      name: (name as string).trim().slice(0, 100),
      phone: phoneClean.slice(0, 20),
      email: typeof email === "string" ? email.trim().slice(0, 200) : "",
      service: typeof service === "string" ? service.trim().slice(0, 100) : "",
      message: typeof message === "string" ? message.trim().slice(0, 2000) : "",
    },
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    // Parse & validate
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const validation = validateInput(body);
    if (validation.error) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 422 }
      );
    }

    const data = validation.data!;
    const adminEmail = process.env.ADMIN_EMAIL ?? process.env.SMTP_USER!;

    // Build email content
    const adminMail = adminEmailTemplate(data);
    const userMail = userAutoReplyTemplate(data);

    // Send both emails concurrently
    const emailPromises: Promise<unknown>[] = [
      transporter.sendMail({
        from: `"Kriosk Creatta Website" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        replyTo: data.email || undefined,
        subject: adminMail.subject,
        html: adminMail.html,
        text: adminMail.text,
      }),
    ];

    // Only send auto-reply if user provided an email
    if (data.email) {
      emailPromises.push(
        transporter.sendMail({
          from: `"Kriosk Creatta" <${process.env.SMTP_USER}>`,
          to: data.email,
          subject: userMail.subject,
          html: userMail.html,
          text: userMail.text,
        })
      );
    }

    await Promise.all(emailPromises);

    return NextResponse.json(
      { success: true, message: "Your message has been sent! We'll be in touch soon." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API] Error:", err);

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

// Block non-POST methods
export function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}