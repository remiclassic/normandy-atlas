'use client';

import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollText } from 'lucide-react';

const LINKEDIN_URL = 'https://www.linkedin.com/in/remicouture/';

const CreditsScrollContent = memo(function CreditsScrollContent() {
  return (
    <div className="px-6 pb-8 pt-14 sm:px-8 sm:pb-10">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1">
        Credits
      </p>
      <h2
        id="credits-dialog-title"
        className="font-display text-xl font-semibold leading-snug text-parchment sm:text-2xl mb-6"
      >
        Created by Guillaume Remi Couture
      </h2>

      <div className="accent-line-gold mb-8 opacity-80" />

      <section className="mb-10">
        <p className="text-[13px] leading-relaxed text-text-muted">
          This atlas was created by Guillaume Remi Couture, a UX/UI designer with nearly two decades of
          experience building interactive systems, games, and digital products used by millions of people
          worldwide.
        </p>
        <p className="mt-4 text-[13px] leading-relaxed text-parchment/90 font-medium">
          But this project is not just another product.
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-parchment/90 font-medium">It is personal.</p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">Why This Atlas Exists</h3>
        <p className="text-[13px] leading-relaxed text-text-muted">
          For as long as I can remember, I have been drawn to the story of the Normans, not just the
          surface-level version you find in textbooks, but the deeper layers: the movement of people, the
          migrations, the transformations, the way Viking settlers became one of the most influential forces
          in medieval Europe.
        </p>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
          Normandy is not just a place. It is a turning point. It is where identities shifted, where cultures
          blended, where something new was created. That ripple effect spread across England, Southern Italy,
          the Crusader states, and eventually into New France.
        </p>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
          But most of this story is fragmented, so I built something to see it clearly.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">The Vision</h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-4">
          This atlas is meant to be more than a map. It is a living system that lets you:
        </p>
        <ul className="list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-2">
          <li>Follow migrations across time</li>
          <li>Explore where people came from and where they settled</li>
          <li>Understand how cultures evolved</li>
          <li>Connect events across centuries in a visual way</li>
        </ul>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
          Instead of reading history in pieces, you can experience it as a continuous story.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">Built from Experience</h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-4">
          This project brings together everything I have learned over 18+ years in design:
        </p>
        <ul className="list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-2">
          <li>Game UI and interactive systems</li>
          <li>World-building and spatial storytelling</li>
          <li>UX design for complex systems</li>
          <li>AI-assisted workflows and modern web tech</li>
        </ul>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
          I have worked with companies like Disney and others, designing experiences meant to guide millions of
          users. This atlas applies that same thinking to history.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">A Personal Note</h3>
        <p className="text-[13px] leading-relaxed text-text-muted">
          I am not building this as a traditional historian. I am building this as someone trying to
          understand where things come from. The Norman story is not just about conquest. It is about identity,
          movement, and transformation. And in a way, it reflects something deeper about all of us.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">Work With Me</h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-4">
          If you are interested in working together, collaborating, or bringing this level of design thinking
          into your own project, connect on LinkedIn:
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-[13px] font-medium text-gold hover:text-gold-bright underline underline-offset-2 transition-colors"
        >
          linkedin.com/in/remicouture
        </a>
        <p className="mt-4 text-[12px] leading-relaxed text-text-dim">I am available for:</p>
        <ul className="mt-2 list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-2">
          <li>UX/UI design consulting</li>
          <li>Interactive systems and product design</li>
          <li>Game UI/UX</li>
          <li>AI-assisted workflows and prototyping</li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">Support This Project</h3>
        <p className="text-[13px] leading-relaxed text-text-muted mb-4">
          My goal is to make this atlas a full-time project. If you find value in it and want to support its
          growth:
        </p>
        <ul className="list-disc pl-5 text-[13px] leading-relaxed text-text-muted space-y-2">
          <li>You can share it with others</li>
          <li>You can reach out for collaboration</li>
          <li>Or support directly (donations, sponsorships, partnerships)</li>
        </ul>
        <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
          Every bit of support helps expand the data, improve accuracy, and push this further.
        </p>
      </section>

      <section>
        <h3 className="font-display text-[15px] font-semibold text-parchment mb-3">Ongoing Project</h3>
        <p className="text-[13px] leading-relaxed text-text-muted">
          This atlas is continuously evolving. New eras, deeper historical accuracy, and richer data layers
          will be added over time. If you are exploring this now, you are early, and that is part of the
          journey.
        </p>
      </section>
    </div>
  );
});

export const CreditsIconButton = memo(function CreditsIconButton({
  onOpen,
}: {
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-dim transition-colors duration-200 hover:bg-white/[0.04] hover:text-gold/70"
      aria-label="Open credits and about"
    >
      <ScrollText className="h-[14px] w-[14px]" strokeWidth={1.5} aria-hidden />
    </button>
  );
});

export const CreditsModal = memo(function CreditsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="credits-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-[rgba(8,10,14,0.72)] p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="credits-dialog-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative max-h-[min(85vh,720px)] w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] glass-panel-elevated shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-transparent bg-white/[0.04] text-text-dim transition-all duration-150 hover:border-white/[0.06] hover:bg-white/[0.08] hover:text-text-muted"
              aria-label="Close credits"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="max-h-[min(85vh,720px)] overflow-y-auto scrollbar-thin">
              <CreditsScrollContent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});
