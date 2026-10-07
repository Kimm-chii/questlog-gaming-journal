import React from 'react';
import { GameEntry } from '../types';
import { StatusBadge } from './StatusBadge';
import { RatingStars } from './RatingStars';
import { Calendar, MonitorPlay } from 'lucide-react';
import { motion } from 'motion/react';

const statusBorder: Record<string, string> = {
  'Playing':      'border-l-blue-500',
  'Completed':    'border-l-emerald-500',
  'Dropped':      'border-l-rose-500',
  'On Hold':      'border-l-amber-500',
  'Plan to Play': 'border-l-zinc-700',
};

export function GameCard({ game, index = 0 }: { game: GameEntry; index?: number; key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className={`group flex flex-col bg-zinc-900/40 border border-zinc-800/60 border-l-2 ${statusBorder[game.status]} rounded-lg overflow-hidden hover:border-zinc-700/50 hover:bg-zinc-900/60 transition-all duration-300 shadow-md hover:shadow-xl`}
    >
      {/* Cover strip */}
      <div className="relative h-44 w-full bg-zinc-800 overflow-hidden">
        {game.coverImage ? (
          <>
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-full h-full object-cover opacity-65 group-hover:opacity-85 transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <MonitorPlay className="w-10 h-10 text-zinc-700" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-0.5 z-10">
          <h3 className="text-xl font-display font-bold text-white leading-tight drop-shadow-md">{game.title}</h3>
          <div className="flex items-center text-zinc-400 text-xs gap-1.5 font-medium">
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>{game.platform}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 gap-4">
        <div className="flex items-center justify-between">
          <StatusBadge status={game.status} />
          {game.rating > 0 && <RatingStars rating={game.rating} />}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {game.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-zinc-800/60 text-zinc-500 text-xs font-medium rounded border border-zinc-800 tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed flex-grow font-light">
          {game.notes}
        </p>

        <div className="flex items-center justify-between text-xs text-zinc-600 pt-3 border-t border-zinc-800/50 mt-auto">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Added {new Date(game.dateAdded + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {game.lastPlayed && (
            <span>Last played {new Date(game.lastPlayed + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
