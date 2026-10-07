/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { placeholderGames } from './data';
import { GameCard } from './components/GameCard';
import { CompactGameCard } from './components/CompactGameCard';
import GrainOverlay from './components/GrainOverlay';
import { GameStatus } from './types';
import { Search, LayoutGrid, List, Hexagon, SearchX } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<GameStatus | 'All'>('All');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'compact'>('grid');

  // Counts per status from the full dataset (not affected by active filters)
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    placeholderGames.forEach((g) => {
      counts[g.status] = (counts[g.status] || 0) + 1;
    });
    return { All: placeholderGames.length, ...counts };
  }, []);

  const filteredGames = useMemo(() => {
    return placeholderGames.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || game.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const statuses: (GameStatus | 'All')[] = ['All', 'Playing', 'Completed', 'On Hold', 'Plan to Play', 'Dropped'];

  const playingCount = statusCounts['Playing'] ?? 0;
  const completedCount = statusCounts['Completed'] ?? 0;

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 font-sans">
      <GrainOverlay />

      {/* Floating navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <div className="flex items-center justify-between px-3 py-2.5 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-full shadow-2xl">
          {/* Logo */}
          <button onClick={scrollToTop} className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-950 to-amber-800 border border-amber-700/50 shadow-inner group-hover:scale-105 transition-transform">
              <Hexagon className="w-5 h-5 text-amber-300 group-hover:rotate-90 transition-transform duration-700" />
            </div>
            <span className="text-base font-display font-bold tracking-wide text-white transition-colors group-hover:text-amber-200">
              QuestLog
            </span>
          </button>

          {/* CTA */}
          <button
            onClick={scrollToLibrary}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-semibold rounded-full transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600 hover:-translate-y-0.5"
          >
            <span>Library</span>
            <span className="text-xs text-zinc-500 font-normal">· {placeholderGames.length}</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full mx-auto flex flex-col relative">
        {/* Hero */}
        <section className="relative pt-48 pb-20 px-6 w-full max-w-5xl mx-auto flex flex-col z-10 overflow-hidden">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-1/3 w-[480px] h-[280px] bg-amber-500/[0.07] rounded-full blur-3xl pointer-events-none -translate-x-1/4"
          />

          {/* Decorative total count — large background type */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[13rem] font-display font-bold text-zinc-900 leading-none select-none pointer-events-none hidden lg:block"
          >
            {placeholderGames.length}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center md:items-start text-center md:text-left relative z-10"
          >
            <p className="text-xs font-medium text-zinc-700 tracking-[0.25em] uppercase mb-8">
              Personal Archive
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-[1.05]">
              The games<br className="hidden md:block" /> I've lived in.
            </h1>
            <p className="text-base md:text-lg text-zinc-500 max-w-xl font-light leading-relaxed">
              <span className="text-zinc-200 font-normal">{placeholderGames.length} entries.</span>{' '}
              {playingCount > 0 && <>{playingCount} still running. </>}
              {completedCount > 0 && <>{completedCount} cleared. </>}
              A few I probably should've finished.
            </p>
          </motion.div>
        </section>

        {/* Library */}
        <div id="library" className="w-full max-w-5xl mx-auto px-6 pb-24 relative z-10 scroll-mt-32">
          {/* Section divider */}
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 bg-zinc-900" />
            <span className="text-xs text-zinc-700 tracking-[0.2em] uppercase font-medium">Library</span>
            <div className="h-px flex-1 bg-zinc-900" />
          </div>

          {/* Controls row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                placeholder="Search games or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/20 transition-all"
              />
            </div>

            {/* Layout toggle */}
            <div className="flex items-center bg-zinc-900/50 border border-zinc-800 rounded p-1">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded transition-all duration-200 ${layoutMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-300'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('compact')}
                className={`p-1.5 rounded transition-all duration-200 ${layoutMode === 'compact' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-300'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Status filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-zinc-900">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
                  statusFilter === status
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'bg-transparent text-zinc-500 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>{status}</span>
                <span className={`text-xs font-normal tabular-nums ${statusFilter === status ? 'text-zinc-500' : 'text-zinc-700'}`}>
                  {statusCounts[status] ?? 0}
                </span>
              </button>
            ))}
          </div>

          {/* Results */}
          {filteredGames.length > 0 ? (
            <div className={layoutMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'flex flex-col gap-2.5'}>
              {filteredGames.map((game, index) =>
                layoutMode === 'grid' ? (
                  <GameCard key={game.id} game={game} index={index} />
                ) : (
                  <CompactGameCard key={game.id} game={game} index={index} />
                )
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-32 border border-zinc-800/40 border-dashed rounded-lg">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-5">
                <SearchX className="w-5 h-5 text-zinc-600" />
              </div>
              <h3 className="text-base font-display font-semibold text-zinc-300 mb-2">Nothing found</h3>
              <p className="text-zinc-600 text-sm max-w-xs font-light mb-6">
                No entries matched that search or filter.
              </p>
              <button
                onClick={clearFilters}
                className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-10 border-t border-zinc-900/60 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-zinc-700 text-sm">
            <Hexagon className="w-3.5 h-3.5 text-amber-900" />
            <span className="font-display font-semibold text-zinc-600">QuestLog</span>
          </div>
          <p className="text-xs text-zinc-700 font-light">
            {placeholderGames.length} games tracked &middot; Built for fun
          </p>
        </div>
      </footer>
    </div>
  );
}
