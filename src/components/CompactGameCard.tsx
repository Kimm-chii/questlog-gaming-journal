import { GameEntry } from '../types';
import { StatusBadge } from './StatusBadge';
import { RatingStars } from './RatingStars';
import { Calendar, MonitorPlay } from 'lucide-react';
import { motion } from 'motion/react';

export function CompactGameCard({ game }: { game: GameEntry; key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-row items-center bg-zinc-900/60 border border-zinc-800/80 rounded-xl overflow-hidden hover:border-zinc-700/80 transition-all duration-200 shadow-sm hover:shadow-md hover:bg-zinc-900/80 p-3 pr-5 gap-5"
    >
      <div className="relative h-14 w-14 shrink-0 bg-zinc-800 rounded-lg overflow-hidden hidden sm:block">
        {game.coverImage ? (
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <MonitorPlay className="w-6 h-6 text-zinc-700" />
          </div>
        )}
      </div>

      <div className="flex flex-col min-w-0 flex-grow gap-1.5 justify-center">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-white truncate">{game.title}</h3>
          <div className="hidden sm:flex items-center text-zinc-400 text-xs gap-1 font-medium bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700/50">
            <MonitorPlay className="w-3 h-3" />
            <span>{game.platform}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={game.status} />
          {game.rating > 0 && (
            <div className="hidden md:flex items-center gap-2 border-l border-zinc-800/80 pl-3">
               <RatingStars rating={game.rating} />
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex flex-wrap items-center gap-1.5 shrink-0 max-w-[200px] justify-end">
        {game.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-zinc-800/60 text-zinc-300 text-xs font-medium rounded-md border border-zinc-700/50 whitespace-nowrap">
            {tag}
          </span>
        ))}
        {game.tags.length > 2 && (
          <span className="px-2 py-0.5 bg-zinc-800/60 text-zinc-400 text-xs font-medium rounded-md border border-zinc-700/50">
            +{game.tags.length - 2}
          </span>
        )}
      </div>

      <div className="hidden md:flex items-center text-xs text-zinc-500 font-medium shrink-0 w-28 justify-end">
        <Calendar className="w-3.5 h-3.5 mr-1.5" />
        <span>{new Date(game.dateAdded).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </motion.div>
  );
}
