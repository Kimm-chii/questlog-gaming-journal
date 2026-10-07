import { GameStatus } from '../types';

export function StatusBadge({ status }: { status: GameStatus }) {
  const configs: Record<GameStatus, { text: string; dot: string }> = {
    'Playing':      { text: 'text-blue-400',    dot: 'bg-blue-400' },
    'Completed':    { text: 'text-emerald-400', dot: 'bg-emerald-400' },
    'Dropped':      { text: 'text-rose-400',    dot: 'bg-rose-400' },
    'On Hold':      { text: 'text-amber-400',   dot: 'bg-amber-400' },
    'Plan to Play': { text: 'text-zinc-500',    dot: 'bg-zinc-600' },
  };

  const { text, dot } = configs[status];

  return (
    <div className={`flex items-center gap-1.5 ${text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      <span className="text-xs font-semibold tracking-widest uppercase">{status}</span>
    </div>
  );
}
