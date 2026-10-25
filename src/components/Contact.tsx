import React, { useState } from 'react';
import {
  Send,
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  ExternalLink,
  PhoneCall,
  Loader2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

// Get your free access key at https://web3forms.com (takes ~2 minutes, no backend needed)
const WEB3FORMS_ACCESS_KEY = '34c543a6-c330-40d9-bfbd-e87d27c8c364';

const inputBase =
  'w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border text-base sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF4B1F] transition-all';

const labelBase =
  'block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5';

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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
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
        setSendError('Could not send the message. Please try again or use the direct channels.');
      }
    } catch {
      setSendError('Network error. Please try again or use the direct channels.');
    } finally {
      setIsSending(false);
    }
  };
  
  const channels = [
    {
      key: 'telegram',
      href: PERSONAL_INFO.telegramUrl,
      title: 'Telegram',
      sub: PERSONAL_INFO.viberTelegramNumber,
      icon: <Send className="w-4 h-4" />,
      iconCls: 'bg-sky-100 text-sky-700',
      hoverCls: 'hover:bg-sky-50 hover:border-sky-300',
    },
    {
      key: 'viber',
      href: PERSONAL_INFO.viberUrl,
      title: 'Viber',
      sub: PERSONAL_INFO.viberTelegramNumber,
      icon: <PhoneCall className="w-4 h-4" />,
      iconCls: 'bg-purple-100 text-purple-700',
      hoverCls: 'hover:bg-purple-50 hover:border-purple-300',
    },
    {
      key: 'linkedin',
      href: PERSONAL_INFO.linkedinUrl,
      title: 'LinkedIn',
      sub: 'Professional network',
      icon: <Linkedin className="w-4 h-4" />,
      iconCls: 'bg-blue-100 text-blue-700',
      hoverCls: 'hover:bg-blue-50 hover:border-blue-300',
    },
    {
      key: 'github',
      href: PERSONAL_INFO.githubUrl,
      title: 'GitHub',
      sub: '@RajnishYadav900',
      icon: <Github className="w-4 h-4" />,
      iconCls: 'bg-zinc-200 text-zinc-900',
      hoverCls: 'hover:bg-zinc-100 hover:border-zinc-300',
    },
  ];

  return (
    <section id="contact" className="py-10 sm:py-24 bg-zinc-50/70 border-t border-zinc-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-start mb-6 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
            <span>Get In Touch</span>
          </div>
          <h2 className="text-[1.65rem] leading-tight sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
            Let's Build Something <span className="text-[#FF4B1F]">Great Together.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
            Have a project idea, opportunity or question? Send a message or connect on any channel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-14">

          {/* FORM: mobile pe pehle */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-zinc-200 p-4 sm:p-10 shadow-lg">

              {submitted ? (
                <div className="py-6 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-zinc-900">{formData.name}</span>. Your message reached Rajnish's inbox. He will reply shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                    <div>
                      <label htmlFor="name" className={labelBase}>
                        Your Name <span className="text-[#FF4B1F]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Krish Yadav"
                        className={`${inputBase} ${
                          errors.name ? 'border-red-500 bg-red-50/30' : 'border-zinc-200 bg-zinc-50/50 hover:bg-white'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelBase}>
                        Email <span className="text-[#FF4B1F]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. abc@gmail.com"
                        className={`${inputBase} ${
                          errors.email ? 'border-red-500 bg-red-50/30' : 'border-zinc-200 bg-zinc-50/50 hover:bg-white'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelBase}>
                      Subject <span className="text-[#FF4B1F]">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Web project / Role inquiry"
                      className={`${inputBase} ${
                        errors.subject ? 'border-red-500 bg-red-50/30' : 'border-zinc-200 bg-zinc-50/50 hover:bg-white'
                      }`}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelBase}>
                      Message <span className="text-[#FF4B1F]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share project details, timeline or your question..."
                      className={`${inputBase} resize-none sm:resize-y ${
                        errors.message ? 'border-red-500 bg-red-50/30' : 'border-zinc-200 bg-zinc-50/50 hover:bg-white'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {sendError && (
                    <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                      {sendError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl bg-zinc-950 hover:bg-[#FF4B1F] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-500/20 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                </form>
              )}
            </div>
          </div>

          {/* CHANNELS */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-zinc-200 p-3.5 sm:p-6 shadow-xs">
              <h3 className="text-sm font-bold text-zinc-900 mb-2.5 sm:mb-3 px-0.5">
                Connect Channels
              </h3>

              <div className="space-y-2">
                {/* Gmail: copy button ke saath */}
                <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-orange-50/60 border border-orange-200/80">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-2.5 min-w-0 flex-1 group"
                    aria-label="Send email"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-orange-200 text-[#FF4B1F] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-900 group-hover:text-[#FF4B1F] transition-colors">
                        Gmail
                      </p>
                      <p className="text-[11px] font-mono text-zinc-600 truncate">
                        {PERSONAL_INFO.email}
                      </p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-400 transition-colors text-[11px] font-semibold"
                    title="Copy email address"
                    aria-label="Copy email address"
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

                {/* Other channels */}
                {channels.map((c) => (
                  <a
                    key={c.key}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 transition-all group ${c.hoverCls}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${c.iconCls}`}>
                        {c.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-zinc-900">{c.title}</p>
                        <p className="text-[11px] text-zinc-500 truncate">{c.sub}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};