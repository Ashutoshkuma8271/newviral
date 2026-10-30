import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { BRAND, SERVICES } from '../constants/content.ts';
import { Reveal } from './common/Reveal.tsx';
import { PhoneField } from './common/PhoneField.tsx';
import { isValidPhoneNumber, parsePhoneNumber, getCountryCallingCode, type CountryCode } from 'libphonenumber-js/min';

// Set VITE_FORM_ENDPOINT (for example a Formspree or Web3Forms URL) in a .env file to send enquiries from the form.
// Without it, the form opens a pre-filled email or WhatsApp message instead, and never claims to have sent anything.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

interface Fields {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  message: string;
}
type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'handoff';

const EMPTY: Fields = { name: '', business: '', email: '', phone: '', website: '', service: '', message: '' };
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), 'Not sure yet'];

const inputClass =
  'mt-2 block w-full rounded-xl border border-white/15 bg-[#171822] px-4 text-base text-white placeholder:text-white/40 shadow-sm transition-all duration-200 hover:border-amber-400/50 focus:border-[#F59E0B] focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/20 aria-[invalid=true]:border-rose-500 aria-[invalid=true]:focus:ring-rose-500/20';

export const ContactPanel: React.FC = () => {
  const [params] = useSearchParams();
  const [fields, setFields] = useState<Fields>({ ...EMPTY, service: SERVICE_OPTIONS[0] });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [country, setCountry] = useState<CountryCode>('IN');

  // Arriving from a package card: "/contact?package=Growth"
  useEffect(() => {
    const pkg = params.get('package');
    if (pkg)
      setFields((f) => ({
        ...f,
        message: `I'm interested in the ${pkg} package. Please share what's included and how to start.`,
      }));
  }, [params]);

  const set =
    (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validate = () => {
    const next: typeof errors = {};
    if (!fields.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = 'Please enter a valid email address.';
    if (!fields.phone.trim()) next.phone = 'Please enter a phone or WhatsApp number.';
    else if (!isValidPhoneNumber(fields.phone, country))
      next.phone = 'This number doesn’t look right for the selected country. Please check it.';
    if (fields.website.trim() && !/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(fields.website.trim()))
      next.website = 'Please enter a web address like yourbusiness.com.';
    if (fields.message.trim().length < 10) next.message = 'Tell us a little about what you need (10+ characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // The full number with country code, e.g. "+91 85128 77877"
  const fullPhone = () => {
    try {
      return parsePhoneNumber(fields.phone, country).formatInternational();
    } catch {
      return `+${getCountryCallingCode(country)} ${fields.phone}`;
    }
  };

  const summary = () =>
    [
      `Name: ${fields.name}`,
      ...(fields.business ? [`Business: ${fields.business}`] : []),
      `Email: ${fields.email}`,
      `Phone: ${fullPhone()}`,
      ...(fields.website ? [`Website: ${fields.website}`] : []),
      `Service: ${fields.service}`,
      '',
      fields.message,
    ].join('\n');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = (e.currentTarget.elements.namedItem('company_website') as HTMLInputElement | null)?.value;
    if (honeypot) return; // bots fill the hidden field
    if (!validate()) return;

    if (ENDPOINT) {
      setStatus('sending');
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...fields, phone: fullPhone(), _subject: `New enquiry from ${fields.name}` }),
        });
        setStatus(res.ok ? 'sent' : 'failed');
        if (res.ok) setFields({ ...EMPTY, service: SERVICE_OPTIONS[0] });
      } catch {
        setStatus('failed');
      }
    } else {
      window.location.href = `mailto:${BRAND.contact.email}?subject=${encodeURIComponent(`Enquiry from ${fields.name}`)}&body=${encodeURIComponent(summary())}`;
      setStatus('handoff');
    }
  };

  const whatsappUrl = `${BRAND.contact.whatsapp.split('?')[0]}?text=${encodeURIComponent(summary())}`;

  return (
    <section className="relative bg-[#0C0D12] py-20 sm:py-28">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Details */}
        <Reveal direction="left" className="lg:col-span-5">
          <h2 className="max-w-[14ch] text-fluid-h2 font-display font-semibold text-white">
            Tell us <span className="font-editorial font-normal italic text-shimmer-pure text-[1.12em] drop-shadow-[0_2px_16px_rgba(245,158,11,0.45)]">what you need.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#CBD5E1]">
            Share a few details and we'll come back within one working day with ideas and next steps. No jargon, no
            pressure.
          </p>

          <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
            <div className="py-5">
              <dt className="text-sm text-[#CBD5E1]">Email</dt>
              <dd className="mt-1 text-xl font-semibold text-white">
                <a href={`mailto:${BRAND.contact.email}`} className="transition-colors hover:text-[#F59E0B]">
                  {BRAND.contact.email}
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="text-sm text-[#CBD5E1]">Phone</dt>
              <dd className="mt-1 text-xl font-semibold text-white">
                <a
                  href={`tel:${BRAND.contact.phone.replace(/[^+\d]/g, '')}`}
                  className="transition-colors hover:text-[#F59E0B]"
                >
                  {BRAND.contact.phone}
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="text-sm text-[#CBD5E1]">Hours</dt>
              <dd className="mt-1 text-lg text-white">{BRAND.contact.hours}</dd>
            </div>
            <div className="py-5">
              <dt className="text-sm text-[#CBD5E1]">Visit us</dt>
              <dd className="mt-1 text-lg leading-snug text-white">
                <address className="not-italic">
                  {BRAND.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={BRAND.contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[15px] font-semibold text-[#F59E0B] transition-colors hover:text-[#FBBF24]"
                >
                  Open in Google Maps ↗
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* Form */}
        <Reveal direction="right" delay={0.1} className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-white/10 bg-[#14151F] p-6 text-white shadow-2xl sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-white">
                Your name
                <input
                  className={`${inputClass} h-12`}
                  value={fields.name}
                  onChange={set('name')}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  placeholder="Full name"
                />
                {errors.name && <span className="mt-1.5 block text-sm font-normal text-rose-400">{errors.name}</span>}
              </label>
              <label className="block text-sm font-semibold text-[#F8FAFC]">
                Business <span className="font-normal text-[#94A3B8]">(optional)</span>
                <input
                  className={`${inputClass} h-12`}
                  value={fields.business}
                  onChange={set('business')}
                  autoComplete="organization"
                  placeholder="Company name"
                />
              </label>
              <label className="block text-sm font-semibold text-[#F8FAFC]">
                Email
                <input
                  type="email"
                  className={`${inputClass} h-12`}
                  value={fields.email}
                  onChange={set('email')}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  placeholder="you@company.com"
                />
                {errors.email && <span className="mt-1.5 block text-sm font-normal text-rose-400">{errors.email}</span>}
              </label>
              {/* Not a <label>: the field holds two controls (country picker and number), each labelled itself */}
              <div className="block text-sm font-semibold text-[#F8FAFC]">
                Phone or WhatsApp
                <PhoneField
                  country={country}
                  onCountryChange={(c) => {
                    setCountry(c);
                    if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                  }}
                  value={fields.phone}
                  onChange={(v) => {
                    setFields((f) => ({ ...f, phone: v }));
                    if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                  }}
                  invalid={!!errors.phone}
                  describedBy={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <span id="phone-error" className="mt-1.5 block text-sm font-normal text-rose-400">
                    {errors.phone}
                  </span>
                )}
              </div>
              <label className="block text-sm font-semibold text-[#F8FAFC]">
                Your website <span className="font-normal text-[#94A3B8]">(optional)</span>
                <input
                  type="url"
                  inputMode="url"
                  className={`${inputClass} h-12`}
                  value={fields.website}
                  onChange={set('website')}
                  autoComplete="url"
                  aria-invalid={!!errors.website}
                  placeholder="yourbusiness.com"
                />
                {errors.website && (
                  <span className="mt-1.5 block text-sm font-normal text-rose-400">{errors.website}</span>
                )}
              </label>
              <label className="block text-sm font-semibold text-[#F8FAFC]">
                What do you need help with?
                <select className={`${inputClass} h-12`} value={fields.service} onChange={set('service')}>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} className="bg-[#171822] text-white">{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-6 block text-sm font-semibold text-[#F8FAFC]">
              Tell us about your project
              <textarea
                rows={5}
                className={`${inputClass} resize-y py-3`}
                value={fields.message}
                onChange={set('message')}
                aria-invalid={!!errors.message}
                placeholder="What is your business, and what would you like to achieve?"
              />
              {errors.message && (
                <span className="mt-1.5 block text-sm font-normal text-rose-400">{errors.message}</span>
              )}
            </label>

            {/* Hidden spam trap */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>
                Leave this empty
                <input name="company_website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex h-14 cursor-pointer items-center justify-center gap-2.5 rounded-full border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] px-9 text-base font-bold text-[#0C0D12] shadow-[0_4px_24px_rgba(245,158,11,0.45),inset_0_1px_1px_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_36px_rgba(245,158,11,0.65)] disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending' && (
                  <svg className="h-5 w-5 animate-spin text-[#0C0D12]" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                )}
                <span>{status === 'sending' ? 'Sending enquiry…' : ENDPOINT ? 'Send enquiry' : 'Email us this enquiry'}</span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!validate()) e.preventDefault();
                }}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#10B981]/50 bg-[#10B981]/15 px-8 text-base font-semibold text-[#10B981] transition-all duration-300 hover:border-[#10B981] hover:bg-[#10B981] hover:text-white"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div aria-live="polite" className="mt-6">
              {status === 'sent' && (
                <p className="flex items-start gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-[15px] text-emerald-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  Thank you, your enquiry is with us. We'll reply within one working day.
                </p>
              )}
              {status === 'handoff' && (
                <p className="rounded-xl border border-primary/40 bg-primary/20 p-4 text-[15px] text-lavender">
                  Your email app should have opened with your message ready to send. If it didn't, write to{' '}
                  <a className="font-semibold text-accent underline" href={`mailto:${BRAND.contact.email}`}>
                    {BRAND.contact.email}
                  </a>{' '}
                  or use WhatsApp.
                </p>
              )}
              {status === 'failed' && (
                <p className="rounded-xl border border-rose-500/30 bg-rose-500/15 p-4 text-[15px] text-rose-200">
                  Sorry, that didn't go through, and nothing was sent. Please try again, or email{' '}
                  <a className="font-semibold text-accent underline" href={`mailto:${BRAND.contact.email}`}>
                    {BRAND.contact.email}
                  </a>{' '}
                  or message us on WhatsApp.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
