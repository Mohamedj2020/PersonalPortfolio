import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { personalData } from '../data';

const ContactNew = () => {
  const formId = process.env.REACT_APP_FORMSPREE_ID || 'mgvnklbq';
  const [state, handleSubmit] = useForm(formId);

  return (
    <section id="contact" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-xl font-medium tracking-tight text-white scroll-fade">
        <span className="section-heading">Get In Touch</span>
      </h2>

      <div className="scroll-fade">
        <p className="text-base leading-relaxed text-zinc-400 mb-8">
          I'm always interested in hearing about new opportunities and projects.
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>

        <div className="mb-8">
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-zinc-800/80 mb-8"></div>

        {/* Contact Form */}
        <div className="scroll-fade" style={{ transitionDelay: '150ms' }}>
          {state.succeeded ? (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-sm font-medium text-emerald-400">Thanks! I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-glow w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-zinc-600"
                  placeholder="Your name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-glow w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-zinc-600"
                  placeholder="you@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="input-glow w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-zinc-600 resize-none"
                  placeholder="Your message..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="self-start inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
              >
                {state.submitting ? 'Sending...' : 'Send Message'}
              </button>
              <ValidationError errors={state.errors} className="text-red-400 text-xs" />
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactNew;
