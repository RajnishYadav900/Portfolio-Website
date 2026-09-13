import React, { useState } from 'react';
import {
  Send,
  Mail,
  MessageSquare,
  Linkedin,
  Facebook,
  Github,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Phone,
  PhoneCall,
  Loader2,
} from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';

// Get your free access key at https://web3forms.com (takes ~2 minutes, no backend needed)
const WEB3FORMS_ACCESS_KEY = '34c543a6-c330-40d9-bfbd-e87d27c8c364';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please provide a subject.';
    if (!formData.message.trim()) newErrors.message = 'Please type your message.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSendError(null);
    setIsSending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio Inquiry: ${formData.subject}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setSendError('Could not send the message. Please try again or use the direct contact options below.');
      }
    } catch {
      setSendError('Network error. Please try again or use the direct contact options below.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSendViaMailto = () => {
    const subjectEncoded = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const bodyEncoded = encodeURIComponent(
      `Hello Rajnish,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  const handleSendViaWhatsApp = () => {
    const textEncoded = encodeURIComponent(
      `Hello Rajnish,\nI am ${formData.name} (${formData.email}).\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
    );
    window.open(`${PERSONAL_INFO.whatsappUrl}?text=${textEncoded}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-zinc-50/70 border-t border-zinc-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
            Let's Build Something <span className="text-[#FF4B1F]">Great Together.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
            Have an opportunity, project idea, or question? Feel free to send a message or connect through any preferred channel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          
          {/* Left Column: Direct Contact Details & Quick Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card with Copy Trigger */}
            <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF4B1F]">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Primary Email
                </span>
              </div>
              <p className="text-xs font-semibold text-zinc-500 mb-1">Direct inquiries & opportunities</p>
              <div className="flex items-center justify-between gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200/80">
                <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="shrink-0 p-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Connect Channels */}
            <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 mb-2">Connect Channels</h3>

              {/* WhatsApp */}
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-emerald-50 hover:border-emerald-300 border border-zinc-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 group-hover:text-emerald-950">
                      WhatsApp <span className="font-mono font-normal text-zinc-600">({PERSONAL_INFO.whatsappNumber})</span>
                    </p>
                    <p className="text-[11px] text-zinc-500">Instant chat & messaging</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600" />
              </a>

              {/* Telegram */}
              <a
                href={PERSONAL_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-sky-50 hover:border-sky-300 border border-zinc-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 group-hover:text-sky-950">
                      Telegram <span className="font-mono font-normal text-zinc-600">({PERSONAL_INFO.viberTelegramNumber})</span>
                    </p>
                    <p className="text-[11px] text-zinc-500">Direct message channel</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-sky-600" />
              </a>

              {/* Viber */}
              <a
                href={PERSONAL_INFO.viberUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-purple-50 hover:border-purple-300 border border-zinc-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 group-hover:text-purple-950">
                      Viber <span className="font-mono font-normal text-zinc-600">({PERSONAL_INFO.viberTelegramNumber})</span>
                    </p>
                    <p className="text-[11px] text-zinc-500">Calls & direct chat</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-purple-600" />
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-blue-50 hover:border-blue-300 border border-zinc-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 group-hover:text-blue-950">LinkedIn</p>
                    <p className="text-[11px] text-zinc-500">Professional profile & network</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-blue-600" />
              </a>

              {/* Facebook */}
              <a
                href={PERSONAL_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-indigo-50 hover:border-indigo-300 border border-zinc-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 group-hover:text-indigo-950">Facebook</p>
                    <p className="text-[11px] text-zinc-500">Social profile & updates</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600" />
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 border border-zinc-200/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-200 text-zinc-900 flex items-center justify-center">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">
                      GitHub <span className="font-mono font-normal text-zinc-600">(@RajnishYadav900)</span>
                    </p>
                    <p className="text-[11px] text-zinc-500">Open source repositories & projects</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900" />
              </a>
            </div>

            {/* Location & Status Pill */}
            <div className="rounded-2xl bg-zinc-950 text-white p-5 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#FF4B1F]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">{PERSONAL_INFO.location}</p>
                  <p className="text-[11px] text-zinc-400">Timezone: UTC+5:45 (NPT)</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/40">
                Active
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-10 shadow-lg">
              
              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                    <Check className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-black text-zinc-950 tracking-tight">
                    Message Sent!
                  </h3>

                  <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-zinc-900">{formData.name}</span>. Your message has been delivered directly to Rajnish's inbox. He will get back to you shortly.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-md shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Also Send via WhatsApp</span>
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 underline"
                    >
                      Compose another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                        Your Name <span className="text-[#FF4B1F]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF4B1F] transition-all ${
                          errors.name ? 'border-red-500 bg-red-50/30' : 'border-zinc-200 bg-zinc-50/50 hover:bg-white'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                        Email Address <span className="text-[#FF4B1F]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. alex@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF4B1F] transition-all ${
                          errors.email ? 'border-red-500 bg-red-50/30' : 'border-zinc-200 bg-zinc-50/50 hover:bg-white'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Subject <span className="text-[#FF4B1F]">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Collaboration on Web Project / Role Inquiry"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF4B1F] transition-all ${
                        errors.subject ? 'border-red-500 bg-red-50/30' : 'border-zinc-200 bg-zinc-50/50 hover:bg-white'
                      }`}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Message <span className="text-[#FF4B1F]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share project requirements, timelines, or ask any question..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF4B1F] transition-all resize-y ${
                        errors.message ? 'border-red-500 bg-red-50/30' : 'border-zinc-200 bg-zinc-50/50 hover:bg-white'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {sendError && (
                    <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                      {sendError}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-950 hover:bg-[#FF4B1F] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-500/20 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-zinc-500 text-center mt-3">
                    Configured with instant validation. Connects directly to personal communication endpoints.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};