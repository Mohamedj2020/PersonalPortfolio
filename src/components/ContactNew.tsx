import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { personalData } from '../data';

const ContactNew = () => {
  const formId = process.env.REACT_APP_FORMSPREE_ID || 'mgvnklbq';
  const [state, handleSubmit] = useForm(formId);

  return (
    <section id="contact" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-2xl font-medium tracking-tight text-stone-50 scroll-fade">
        <span className="section-heading">Contact</span>
      </h2>

      <div className="grid gap-6 lg:grid-cols-[0.76fr,1.24fr]">
        <div className="scroll-fade rounded-[32px] border border-red-500/12 bg-[rgba(17,10,10,0.72)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.32em] text-red-200/70">Let&apos;s Build</p>
          <h3 className="mt-4 font-serif text-4xl text-stone-50">Good work starts with a clear conversation.</h3>
          <p className="mt-4 text-sm leading-7 text-stone-400">
            I&apos;m always open to internships, software engineering opportunities, interesting
            product work, and thoughtful conversations with other builders.
          </p>

          <div className="mt-8 rounded-[24px] border border-white/6 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Direct line</p>
            <a
              href={`mailto:${personalData.email}`}
              className="mt-3 inline-flex text-sm font-semibold text-red-100/90 transition-colors hover:text-stone-50"
            >
              {personalData.email}
            </a>
          </div>
        </div>

        <div className="scroll-fade rounded-[32px] border border-white/6 bg-black/30 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm" style={{ transitionDelay: '150ms' }}>
          {state.succeeded ? (
            <div className="rounded-[24px] border border-red-500/18 bg-red-500/10 p-5">
              <p className="text-sm font-semibold text-red-50">Message sent. I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-200">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-glow w-full rounded-[20px] border border-white/10 bg-[rgba(18,10,10,0.72)] px-4 py-3 text-sm text-stone-50 placeholder-stone-600 outline-none transition-all"
                  placeholder="Your name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-red-300" />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-glow w-full rounded-[20px] border border-white/10 bg-[rgba(18,10,10,0.72)] px-4 py-3 text-sm text-stone-50 placeholder-stone-600 outline-none transition-all"
                  placeholder="you@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-300" />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-stone-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="input-glow w-full resize-none rounded-[20px] border border-white/10 bg-[rgba(18,10,10,0.72)] px-4 py-3 text-sm text-stone-50 placeholder-stone-600 outline-none transition-all"
                  placeholder="Tell me what you&apos;re building or what kind of role you&apos;re hiring for."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-xs text-red-300" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="btn-gradient inline-flex w-fit items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(122,12,24,0.3)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {state.submitting ? 'Sending...' : 'Send message'}
              </button>
              <ValidationError errors={state.errors} className="text-xs text-red-300" />
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactNew;
