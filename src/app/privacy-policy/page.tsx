import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-cream pt-24">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/" className="text-brand-green text-sm font-body hover:underline mb-8 inline-block">← Back to Home</Link>
          <h1 className="font-display text-4xl font-bold text-brand-charcoal mb-6">Privacy Policy</h1>
          <div className="prose prose-sm font-body text-brand-muted space-y-4">
            <p>Kriosk Creata Limited Liability Partnership (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy.</p>
            <p>We collect contact information (name, phone, email) only when you submit our contact form, and use it solely to respond to your enquiry.</p>
            <p>We do not sell, trade, or share your personal data with third parties without your consent.</p>
            <p>For questions, contact us at <a href="mailto:info@krioskcreatta.com" className="text-brand-green">info@krioskcreatta.com</a>.</p>
            <p className="text-xs text-brand-muted/60 mt-8">© {new Date().getFullYear()} Kriosk Creata LLP. All rights reserved.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
