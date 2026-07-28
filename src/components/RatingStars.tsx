import { Star } from 'lucide-react';

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]'
              : 'fill-zinc-800 text-zinc-700'
          }`}
        />
      ))}
    </div>
  );
}
