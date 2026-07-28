import { GameEntry } from '../types';
import { StatusBadge } from './StatusBadge';
import { RatingStars } from './RatingStars';
import { Calendar, MonitorPlay } from 'lucide-react';
import { motion } from 'motion/react';

export function GameCard({ game }: { game: GameEntry; key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-zinc-900/80"
    >
      <div className="relative h-56 w-full bg-zinc-800 overflow-hidden">
        {game.coverImage ? (
          <>
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <MonitorPlay className="w-12 h-12 text-zinc-700" />
          </div>
        )}
        <div className="absolute top-4 right-4 z-20">
          <StatusBadge status={game.status} />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-1 z-10">
           <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-md">{game.title}</h3>
           <div className="flex items-center text-zinc-300 text-sm gap-2 font-medium">
             <MonitorPlay className="w-4 h-4" />
             <span>{game.platform}</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6">
        {game.rating > 0 && (
          <div className="mb-5 pb-5 border-b border-zinc-800/60">
            <RatingStars rating={game.rating} />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-5">
          {game.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-zinc-800/80 text-zinc-300 text-xs font-medium rounded-md border border-zinc-700/50">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
          {game.notes}
        </p>

        <div className="flex items-center justify-between text-xs text-zinc-500 font-medium pt-4 border-t border-zinc-800/60 mt-auto">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Added {new Date(game.dateAdded).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
