import React from 'react';
import { usePageMeta } from '../lib/usePageMeta.ts';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader.tsx';
import { ProcessTimeline } from '../components/ProcessTimeline.tsx';
import { FirstMonth } from '../components/FirstMonth.tsx';
import { Faq } from '../components/Faq.tsx';
import { CtaBanner } from '../components/CtaBanner.tsx';
import { PROCESS_FAQS } from '../constants/faqs.ts';

export const ProcessPage: React.FC = () => {
  usePageMeta({
    title: "Our Process | How Vyral Bee Works, Step by Step",
    description: "A clear six-step cycle that repeats every month, and what your first month looks like from kick-off call to first report.",
  });

  return (
    <>
      <PageHeader
        image="process"
        title="How we work, step by step."
        accent="step by step."
        intro="A clear six-step cycle that repeats every month, and a first month that gets you from kick-off call to first report."
        actions={
          <Link
            to="/contact"
            className="glint group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-accent px-8 text-base font-semibold text-white shadow-[0_0_24px_rgba(37, 99, 235,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(56, 189, 248,0.5)]"
          >
            Start with a call
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        }
      />
      <ProcessTimeline />
      <FirstMonth />
      <Faq items={PROCESS_FAQS} />
      <CtaBanner />
    </>
  );
};

export default ProcessPage;
