import nodemailer from "nodemailer";

if (!process.env.SMTP_HOST) throw new Error("Missing SMTP_HOST in environment");
if (!process.env.SMTP_USER) throw new Error("Missing SMTP_USER in environment");
if (!process.env.SMTP_PASS) throw new Error("Missing SMTP_PASS in environment");

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE !== "false", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/** Verify connection on startup (only in development) */
if (process.env.NODE_ENV === "development") {
  transporter.verify((error) => {
    if (error) {
      console.error("[Mailer] SMTP connection failed:", error.message);
    } else {
      console.log("[Mailer] SMTP connection verified ✓");
    }
  });
}