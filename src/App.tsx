/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { placeholderGames } from './data';
import { GameCard } from './components/GameCard';
import { CompactGameCard } from './components/CompactGameCard';
import { GameStatus } from './types';
import { Search, LayoutGrid, List, Hexagon, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<GameStatus | 'All'>('All');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'compact'>('grid');

  const filteredGames = useMemo(() => {
    return placeholderGames.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || game.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const statuses: (GameStatus | 'All')[] = ['All', 'Playing', 'Completed', 'On Hold', 'Plan to Play', 'Dropped'];

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Floating Glassmorphic Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <div className="flex items-center justify-between px-3 py-2.5 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-full shadow-2xl">
          {/* Left: Enhanced Avatar (Click to scroll top) */}
          <button onClick={scrollToTop} className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-900 to-indigo-700 border border-indigo-500/50 shadow-inner group-hover:scale-105 transition-transform">
              <Hexagon className="w-5 h-5 text-indigo-200 group-hover:rotate-90 transition-transform duration-700" />
              <Sparkles className="w-2.5 h-2.5 text-indigo-300 absolute top-1 right-1" />
            </div>
            <span className="text-base font-display font-semibold tracking-wide text-white transition-colors group-hover:text-indigo-200">QuestLog</span>
          </button>

          {/* Right: Personal Collection CTA Button */}
          <button 
            onClick={scrollToLibrary}
            className="flex items-center px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-indigo-500/20 hover:-translate-y-0.5"
          >
            <span>Personal Collection</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full mx-auto flex flex-col relative">
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 px-6 w-full max-w-5xl mx-auto flex flex-col items-center text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-medium text-indigo-300 mb-8 tracking-wider uppercase">
              Personal Archive
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white mb-6 leading-tight">
              Documenting digital <br className="hidden md:block"/> <span className="text-zinc-500">experiences.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-10">
              A simple curated space for the interactive worlds I've explored. Tracking victories, reflections, and the backlog of adventures yet to come.
            </p>
          </motion.div>
        </section>

        {/* Library Section */}
        <div id="library" className="w-full max-w-5xl mx-auto px-6 pb-24 relative z-10 scroll-mt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <p className="text-zinc-400 text-lg">Tracking <span className="text-zinc-100 font-medium">{placeholderGames.length}</span> adventures across <span className="text-zinc-100 font-medium">{new Set(placeholderGames.map(g => g.platform)).size}</span> platforms.</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-zinc-900 pb-6">
            <div className="flex flex-wrap gap-2.5">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                    statusFilter === status 
                      ? 'bg-zinc-100 text-zinc-900 shadow-md' 
                      : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center bg-zinc-900/50 border border-zinc-800 rounded-lg p-1 shadow-sm">
              <button 
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-md transition-all duration-300 hover:-translate-y-0.5 ${layoutMode === 'grid' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setLayoutMode('compact')}
                className={`p-1.5 rounded-md transition-all duration-300 hover:-translate-y-0.5 ${layoutMode === 'compact' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
                aria-label="Compact view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {filteredGames.length > 0 ? (
            <div className={layoutMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "flex flex-col gap-3"}>
              {filteredGames.map((game) => (
                layoutMode === 'grid' ? (
                  <GameCard key={game.id} game={game} />
                ) : (
                  <CompactGameCard key={game.id} game={game} />
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-zinc-900/20 rounded-3xl border border-zinc-800/50 border-dashed">
              <div className="w-16 h-16 rounded-full bg-zinc-800/30 flex items-center justify-center mx-auto mb-5">
                <LayoutGrid className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-medium text-zinc-200 mb-2">No entries found</h3>
              <p className="text-zinc-500 text-base max-w-sm mx-auto font-light">Try adjusting your filters or search query to find what you're looking for.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto py-12 border-t border-zinc-900/50 bg-zinc-950 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-zinc-500 text-sm font-light">
            <Hexagon className="w-4 h-4 text-indigo-500" />
            <span>© {new Date().getFullYear()} QuestLog. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500 font-medium">
            <button onClick={scrollToTop} className="hover:text-zinc-300 transition-all duration-300 hover:-translate-y-0.5">GitHub</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
