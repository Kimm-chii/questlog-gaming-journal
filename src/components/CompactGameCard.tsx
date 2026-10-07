import React from 'react';
import { GameEntry } from '../types';
import { StatusBadge } from './StatusBadge';
import { RatingStars } from './RatingStars';
import { MonitorPlay } from 'lucide-react';
import { motion } from 'motion/react';

const statusBorder: Record<string, string> = {
  'Playing':      'border-l-blue-500',
  'Completed':    'border-l-emerald-500',
  'Dropped':      'border-l-rose-500',
  'On Hold':      'border-l-amber-500',
  'Plan to Play': 'border-l-zinc-700',
};

export function CompactGameCard({ game, index = 0 }: { game: GameEntry; index?: number; key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      className={`group flex flex-row items-center bg-zinc-900/40 border border-zinc-800/60 border-l-2 ${statusBorder[game.status]} rounded-[3px] overflow-hidden hover:border-zinc-700/50 hover:bg-zinc-900/60 transition-colors duration-200 p-2.5 pr-5 gap-4`}
    >
      <div className="relative h-[72px] w-12 shrink-0 bg-zinc-800 rounded-[2px] overflow-hidden ring-1 ring-white/10">
        {game.coverImage ? (
          <img
            src={game.coverImage}
            alt={game.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <MonitorPlay className="w-5 h-5 text-zinc-700" />
          </div>
        )}
      </div>

      <div className="flex flex-col min-w-0 flex-grow gap-1 justify-center">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-display font-bold text-white truncate">{game.title}</h3>
          <span className="hidden sm:inline font-mono text-[11px] text-zinc-600 shrink-0">{game.platform}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <StatusBadge status={game.status} />
          {game.rating > 0 && (
            <div className="hidden md:flex">
              <RatingStars rating={game.rating} />
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex flex-wrap items-center gap-1.5 shrink-0 max-w-[200px] justify-end">
        {game.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-zinc-800/60 text-zinc-500 text-xs font-medium rounded border border-zinc-800 whitespace-nowrap tracking-wide">
            {tag}
          </span>
        ))}
        {game.tags.length > 2 && (
          <span className="px-2 py-0.5 bg-zinc-800/60 text-zinc-600 text-xs rounded border border-zinc-800">
            +{game.tags.length - 2}
          </span>
        )}
      </div>

      <div className="hidden md:flex items-center font-mono text-[11px] text-zinc-600 shrink-0 w-28 justify-end">
        <span>{new Date(game.dateAdded + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </motion.div>
  );
}
