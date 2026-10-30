import React from 'react';
import { Check, Minus } from 'lucide-react';
import { PRICING_PACKAGES } from '../constants/content.ts';
import { SectionHeader } from './common/SectionHeader.tsx';
import { Reveal } from './common/Reveal.tsx';
import { PLAIN } from './PackageTiers.tsx';

/** Packages page: every item against every plan in one table, so the differences are clear at a glance. */
export const ComparePlans: React.FC = () => {
  const rows = PRICING_PACKAGES[0].features.map((f) => f.name);

  return (
    <section className="relative bg-[#0C0D12] py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          title="Compare the plans side by side."
          accent="side by side."
          intro="Everything that comes with each plan, in one place."
        />

        <Reveal className="mt-14 sm:mt-16">
          <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-[#141520]/95 shadow-[0_16px_50px_rgba(0,0,0,0.5)]">
            <table className="w-full min-w-[560px] table-fixed border-collapse text-left">
              <caption className="sr-only">What each plan includes</caption>
              <colgroup>
                <col className="w-[37%] sm:w-[49%]" />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr className="border-b border-white/10 bg-[#0C0D12]/70">
                  <th scope="col" className="p-4 text-sm font-semibold uppercase tracking-wider text-[#CBD5E1] sm:p-6">
                    <span>What you get</span>
                  </th>
                  {PRICING_PACKAGES.map((pkg) => (
                    <th
                      key={pkg.name}
                      scope="col"
                      className={`px-2 py-4 text-center align-bottom sm:p-6 ${
                        pkg.popular ? 'bg-[#F59E0B]/[0.10] border-x border-[#F59E0B]/30' : ''
                      }`}
                    >
                      {pkg.popular && (
                        <span className="mb-2 inline-block rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0C0D12] shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                          {pkg.badge}
                        </span>
                      )}
                      <span className="block font-display text-base font-semibold text-white sm:text-xl">{pkg.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((name, r) => (
                  <tr
                    key={name}
                    className={`transition-colors duration-200 hover:bg-[#1E293B]/50 ${
                      r < rows.length - 1 ? 'border-b border-[#334155]/40' : ''
                    }`}
                  >
                    <th scope="row" className="py-4 pl-4 pr-2 font-normal sm:p-6">
                      <span className="block text-sm font-semibold leading-snug text-[#F8FAFC] sm:text-base">{name}</span>
                      <span className="mt-0.5 hidden text-sm text-[#94A3B8] sm:block">{PLAIN[name]}</span>
                    </th>
                    {PRICING_PACKAGES.map((pkg) => {
                      const value = pkg.features.find((f) => f.name === name)?.included;
                      return (
                        <td
                          key={pkg.name}
                          className={`px-1 py-4 text-center sm:p-6 ${
                            pkg.popular ? 'bg-[#2563EB]/[0.12] border-x border-[#2563EB]/30' : ''
                          }`}
                        >
                          {value === true ? (
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-[0_0_8px_rgba(56,189,248,0.35)]">
                              <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                              <span className="sr-only">Included</span>
                            </span>
                          ) : value === 'Add-on' ? (
                            <span className="inline-flex whitespace-nowrap rounded-full border border-[#38BDF8]/40 bg-[#38BDF8]/[0.08] px-2.5 py-1 text-[11px] font-semibold text-[#38BDF8] sm:text-xs">
                              Add-on
                            </span>
                          ) : (
                            <span className="inline-flex text-white/20">
                              <Minus className="h-5 w-5" aria-hidden="true" />
                              <span className="sr-only">Not included</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
