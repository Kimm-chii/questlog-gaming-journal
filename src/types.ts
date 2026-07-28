export type GameStatus = 'Playing' | 'Completed' | 'Dropped' | 'Plan to Play' | 'On Hold';

export interface GameEntry {
  id: string;
  title: string;
  platform: string;
  status: GameStatus;
  rating: number; // 0 to 5
  tags: string[];
  notes: string;
  coverImage?: string;
  dateAdded: string;
  lastPlayed?: string;
}
