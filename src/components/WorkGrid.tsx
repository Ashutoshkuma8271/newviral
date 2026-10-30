import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, X, Filter } from 'lucide-react';
import { PORTFOLIO_ITEMS, WORK_CATEGORIES } from '../constants/content.ts';
import { workSrc, workSrcSet } from '../lib/images.ts';
import { Skeleton, CardSkeleton } from './common/Skeleton.tsx';
import { Reveal } from './common/Reveal.tsx';

const ITEMS_PER_PAGE = 6;

const CATEGORY_COLORS: Record<string, { badge: string; glow: string; border: string }> = {
  Social: {
    badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    glow: 'rgba(168,85,247,0.15)',
    border: 'hover:border-purple-500/50',
  },
  Reels: {
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    glow: 'rgba(244,63,94,0.15)',
    border: 'hover:border-rose-500/50',
  },
  Ads: {
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    glow: 'rgba(59,130,246,0.15)',
    border: 'hover:border-blue-500/50',
  },
  Websites: {
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    glow: 'rgba(6,182,212,0.15)',
    border: 'hover:border-cyan-500/50',
  },
  Branding: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    glow: 'rgba(245,158,11,0.15)',
    border: 'hover:border-amber-500/50',
  },
};

export const WorkGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Filter items based on active category and search query
  const filteredItems = useMemo(() => {
    return PORTFOLIO_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.stats.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const currentSafePage = Math.min(currentPage, totalPages);
  const startIndex = (currentSafePage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <section ref={gridTopRef} className="relative bg-[#0C0D12] py-20 sm:py-28 text-white border-t border-white/[0.06]">
      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
              <Sparkles className="h-3.5 w-3.5" />
              Complete Project Directory
            </div>
            <h2 className="mt-4 text-fluid-h2 font-display font-semibold tracking-tight text-white">
              Explore Our <span className="text-shimmer-pure font-editorial italic text-[1.08em]">Full Archive</span>
            </h2>
            <p className="mt-3 max-w-xl text-base text-[#94A3B8]">
              Browse through our work across social media, short-form reels, performance ads, web platforms, and brand systems.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title, tag, metric..."
              className="w-full rounded-full border border-white/10 bg-[#161722]/90 py-2.5 pl-11 pr-10 text-sm text-white placeholder-[#64748B] backdrop-blur-md transition-all duration-200 focus:border-amber-400/60 focus:bg-[#1E1F2E] focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#94A3B8] hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-10">
          <span className="mr-2 hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#64748B] sm:flex">
            <Filter className="h-3.5 w-3.5" /> Filter:
          </span>
          {WORK_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] text-[#0C0D12] shadow-[0_2px_14px_rgba(245,158,11,0.4)]'
                    : 'border border-white/10 bg-[#161722]/80 text-[#CBD5E1] hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
                {cat === 'All' && (
                  <span className="ml-1.5 opacity-70 text-[11px]">({PORTFOLIO_ITEMS.length})</span>
                )}
                {cat !== 'All' && (
                  <span className="ml-1.5 opacity-70 text-[11px]">
                    ({PORTFOLIO_ITEMS.filter((i) => i.category === cat).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between pb-6 text-xs text-[#94A3B8]">
          <span>
            Showing <strong className="text-white">{filteredItems.length === 0 ? 0 : startIndex + 1}</strong>
            –<strong className="text-white">{Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)}</strong> of{' '}
            <strong className="text-white">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'project' : 'projects'}
          </span>
          {totalPages > 1 && (
            <span>
              Page <strong className="text-white">{currentSafePage}</strong> of{' '}
              <strong className="text-white">{totalPages}</strong>
            </span>
          )}
        </div>

        {/* Cards Grid with Skeleton Support */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#161722]/40 py-20 px-6 text-center">
            <Search className="h-12 w-12 text-[#64748B]" />
            <h3 className="mt-4 text-lg font-semibold text-white">No projects found</h3>
            <p className="mt-2 max-w-sm text-sm text-[#94A3B8]">
              No results match "{searchQuery}" in {activeCategory}. Try clearing your search query or picking another filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-6 rounded-full border border-amber-400/40 bg-amber-400/10 px-5 py-2 text-xs font-semibold text-[#F59E0B] transition-all hover:bg-amber-400/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {paginatedItems.map((item, idx) => {
                const colorConfig = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Social;
                const isLoaded = loadedImages[item.id];

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#14151F]/90 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] ${colorConfig.border}`}
                  >
                    <div>
                      {/* Top Bar: Category Tag & Demo Status */}
                      <div className="flex items-center justify-between gap-2 pb-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${colorConfig.badge}`}
                        >
                          {item.category}
                        </span>
                        <span className="text-[11px] font-medium text-[#64748B]">
                          {item.label}
                        </span>
                      </div>

                      {/* Image Container with Shimmer Skeleton */}
                      <div className="relative my-3 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#1C1D2B]">
                        {!isLoaded && (
                          <Skeleton className="absolute inset-0 h-full w-full rounded-2xl" />
                        )}
                        <img
                          src={workSrc(item.image)}
                          srcSet={workSrcSet(item.image)}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => setLoadedImages((prev) => ({ ...prev, [item.id]: true }))}
                          className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}
                        />

                        {/* Metric Pill Floater */}
                        <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[#0C0D12]/85 px-3 py-1 text-xs font-bold text-amber-300 shadow-lg backdrop-blur-md">
                          {item.stats}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-amber-300">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom CTA Bar */}
                    <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#CBD5E1]">
                        Explore Case
                      </span>
                      <a
                        href="/contact"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:border-amber-400 group-hover:bg-[#F59E0B] group-hover:text-[#0C0D12] group-hover:scale-110"
                        aria-label={`Inquire about ${item.title}`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav
            aria-label="Portfolio pagination"
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/[0.06]"
          >
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentSafePage - 1)}
              disabled={currentSafePage === 1}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#161722] px-5 text-xs sm:text-sm font-semibold text-[#CBD5E1] transition-all duration-200 hover:border-white/30 hover:bg-[#1E1F2E] hover:text-white disabled:pointer-events-none disabled:opacity-40"
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {/* Numbered Page Buttons */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isCurrent = page === currentSafePage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    aria-current={isCurrent ? 'page' : undefined}
                    aria-label={`Page ${page}`}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isCurrent
                        ? 'border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] text-[#0C0D12] shadow-[0_2px_14px_rgba(245,158,11,0.4)]'
                        : 'border border-white/10 bg-[#161722] text-[#CBD5E1] hover:border-white/20 hover:bg-[#1E1F2E] hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentSafePage + 1)}
              disabled={currentSafePage === totalPages}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#161722] px-5 text-xs sm:text-sm font-semibold text-[#CBD5E1] transition-all duration-200 hover:border-white/30 hover:bg-[#1E1F2E] hover:text-white disabled:pointer-events-none disabled:opacity-40"
              aria-label="Go to next page"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default WorkGrid;

