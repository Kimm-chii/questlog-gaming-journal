import { GameStatus } from '../types';

export function StatusBadge({ status }: { status: GameStatus }) {
  const configs: Record<GameStatus, { bg: string; text: string; border: string; dot: string }> = {
    'Playing': { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/20', dot: 'bg-blue-400' },
    'Completed': { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
    'Dropped': { bg: 'bg-rose-500/10', text: 'text-rose-300', border: 'border-rose-500/20', dot: 'bg-rose-400' },
    'On Hold': { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/20', dot: 'bg-amber-400' },
    'Plan to Play': { bg: 'bg-zinc-500/10', text: 'text-zinc-300', border: 'border-zinc-500/20', dot: 'bg-zinc-400' },
  };

  const { bg, text, border, dot } = configs[status];

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${bg} ${text} ${border} backdrop-blur-md shadow-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} shadow-[0_0_8px_currentColor]`} />
      {status}
    </div>
  );
}
