import React from 'react';
import { GameEntry } from '../types';
import { StatusBadge } from './StatusBadge';
import { RatingStars } from './RatingStars';
import { MonitorPlay } from 'lucide-react';
import { motion } from 'motion/react';

export function GameCard({ game, index = 0 }: { game: GameEntry; index?: number; key?: React.Key }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="group flex flex-col"
    >
      {/* Cover */}
      <div className="relative aspect-[2/3] w-full bg-zinc-900 overflow-hidden rounded-[3px] ring-1 ring-white/10 shadow-xl shadow-black/50">
        {game.coverImage ? (
          <img
            src={game.coverImage}
            alt={game.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MonitorPlay className="w-10 h-10 text-zinc-700" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow pt-4 gap-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <StatusBadge status={game.status} />
          {game.rating > 0 && <RatingStars rating={game.rating} />}
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{game.title}</h3>
          <p className="font-mono text-[11px] text-zinc-500 mt-1">
            {game.platform}
            {game.lastPlayed && (
              <> · last played {new Date(game.lastPlayed + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</>
            )}
          </p>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
          {game.notes}
        </p>

        <div className="hidden sm:flex flex-wrap gap-x-3 gap-y-1 mt-auto pt-1">
          {game.tags.map((tag) => (
            <span key={tag} className="text-xs text-zinc-600">
              #{tag.toLowerCase().replace(/\s+/g, '-')}
            </span>
          ))}
        </div>

        <p className="font-mono text-[11px] text-zinc-700">
          Added {new Date(game.dateAdded + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </motion.article>
  );
}
