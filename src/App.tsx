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
import { Search, LayoutGrid, List, SearchX } from 'lucide-react';
import { motion, MotionConfig } from 'motion/react';

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

  // Hero covers: current games first, topped up from the rest of the list
  const nowPlaying = [
    ...placeholderGames.filter((g) => g.status === 'Playing'),
    ...placeholderGames.filter((g) => g.status !== 'Playing'),
  ].slice(0, 3);

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
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen flex flex-col bg-zinc-950 font-sans">
      <GrainOverlay />

      {/* Top bar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Wordmark */}
          <button onClick={scrollToTop} className="flex items-center group cursor-pointer" aria-label="QuestLog, back to top">
            <span className="wordmark text-[15px] text-white">QuestLog</span>
            <span aria-hidden="true" className="ml-1 inline-block w-[7px] h-[15px] bg-amber-400 group-hover:bg-amber-200 transition-colors" />
          </button>

          {/* CTA */}
          <button
            onClick={scrollToLibrary}
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <span>Library</span>
            <span className="font-mono text-xs text-zinc-600 tabular-nums">{String(placeholderGames.length).padStart(2, '0')}</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full mx-auto flex flex-col relative">
        {/* Hero */}
        <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-6 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-end z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-start text-left lg:pb-4"
          >
            <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] font-display font-extrabold text-white mb-6 leading-[1]">
              The games I've lived in.
            </h1>
            <p className="text-base md:text-lg text-zinc-400 max-w-md leading-relaxed">
              <span className="text-zinc-100">{placeholderGames.length} entries.</span>{' '}
              {playingCount > 0 && <>{playingCount} still running. </>}
              {completedCount > 0 && <>{completedCount} cleared. </>}
              A few I probably should've finished.
            </p>
            <button
              onClick={scrollToLibrary}
              className="mt-8 text-sm font-medium text-amber-300 hover:text-amber-200 underline underline-offset-[6px] decoration-amber-300/40 hover:decoration-amber-200 transition-colors"
            >
              Browse the library
            </button>
          </motion.div>

          {/* Now playing covers */}
          <div>
            <p className="font-mono text-xs text-zinc-500 mb-4">Now playing</p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {nowPlaying.map((game, i) => (
                <motion.figure
                  key={game.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                  className={i === 1 ? 'sm:translate-y-6' : ''}
                >
                  <div className="aspect-[2/3] bg-zinc-900 overflow-hidden rounded-[3px] ring-1 ring-white/10 shadow-2xl shadow-black/60">
                    {game.coverImage && (
                      <img src={game.coverImage} alt={game.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <figcaption className="mt-3 text-xs sm:text-sm text-zinc-300 font-medium leading-snug line-clamp-2">
                    {game.title}
                    <span className="block font-mono text-[11px] text-zinc-600 font-normal mt-0.5">{game.platform}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* Library */}
        <div id="library" className="w-full max-w-6xl mx-auto px-6 pb-24 relative z-10 scroll-mt-20">
          {/* Section heading */}
          <div className="flex items-baseline justify-between gap-6 mb-8 pt-10 border-t border-zinc-900">
            <h2 className="text-2xl font-extrabold text-white">Library</h2>
            <span className="font-mono text-xs text-zinc-600 tabular-nums">
              {filteredGames.length} of {placeholderGames.length}
            </span>
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
            <div className={layoutMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10' : 'flex flex-col gap-2.5'}>
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
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center">
            <span className="wordmark text-xs text-zinc-500">QuestLog</span>
            <span aria-hidden="true" className="ml-1 inline-block w-[5px] h-[11px] bg-amber-500/70" />
          </div>
          <p className="font-mono text-xs text-zinc-600">
            {placeholderGames.length} games tracked &middot; Built for fun
          </p>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}
