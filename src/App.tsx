/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { placeholderGames } from './data';
import { GameCard } from './components/GameCard';
import { CompactGameCard } from './components/CompactGameCard';
import { GameStatus } from './types';
import { Search, Plus, LayoutGrid, Gamepad2, List } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">QuestLog</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-semibold rounded-lg select-none">
            <span>Personal Collection</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-3 text-white">My Library</h2>
            <p className="text-zinc-400 text-lg">Tracking {placeholderGames.length} adventures across {new Set(placeholderGames.map(g => g.platform)).size} platforms.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2.5">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  statusFilter === status 
                    ? 'bg-zinc-100 text-zinc-900 shadow-md' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 shadow-sm">
            <button 
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${layoutMode === 'grid' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setLayoutMode('compact')}
              className={`p-1.5 rounded-md transition-colors ${layoutMode === 'compact' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
              aria-label="Compact view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filteredGames.length > 0 ? (
          <div className={layoutMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-3"}>
            {filteredGames.map((game) => (
              layoutMode === 'grid' ? (
                <GameCard key={game.id} game={game} />
              ) : (
                <CompactGameCard key={game.id} game={game} />
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-zinc-900/40 rounded-3xl border border-zinc-800/80 border-dashed">
            <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-5">
              <LayoutGrid className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="text-xl font-medium text-zinc-200 mb-2">No games found</h3>
            <p className="text-zinc-500 text-base max-w-sm mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
          </div>
        )}
      </main>
    </div>
  );
}
