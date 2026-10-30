import React from 'react';
import { usePageMeta } from '../lib/usePageMeta.ts';
import { Hero } from '../components/Hero.tsx';
import { About } from '../components/About.tsx';
import { ServicesOverview } from '../components/ServicesOverview.tsx';
import { ProcessPreview } from '../components/ProcessPreview.tsx';
import { WorkPreview } from '../components/WorkPreview.tsx';
import { WhyChooseUs } from '../components/WhyChooseUs.tsx';
import { CtaBanner } from '../components/CtaBanner.tsx';
import { StatementScene } from '../components/StatementScene.tsx';
import { ChapterIndicator } from '../components/common/ChapterIndicator.tsx';

export const Home: React.FC = () => {
  usePageMeta({
    title: "Vyral Bee | Digital Marketing Agency for Social, Web & Ads",
    description: "Vyral Bee plans, creates and runs your social media, design, video, website and ads as one system, so your brand gets seen and chosen.",
  });

  return (
    <>
      <ChapterIndicator />
      <Hero />
      <ServicesOverview />
      <StatementScene />
      <About />
      <WorkPreview />
      <ProcessPreview />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
};

export default Home;
