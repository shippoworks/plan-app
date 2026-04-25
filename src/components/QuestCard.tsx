import { CARD_COLORS, type Quest } from "../types";

const difficultyLabel: Record<Quest["difficulty"], { label: string; tone: string }> = {
  easy: { label: "🟢 かんたん", tone: "text-lime" },
  normal: { label: "🟡 ふつう", tone: "text-sun" },
  hard: { label: "🔥 チャレンジ", tone: "text-primary" },
};

type Props = {
  quest: Quest;
  onTap?: () => void;
};

export function QuestCard({ quest, onTap }: Props) {
  return (
    <div
      onClick={onTap}
      className={`${CARD_COLORS[quest.color]} flex h-full w-full flex-col justify-between rounded-card p-7 shadow-card`}
    >
      <div>
        <div className="text-7xl">{quest.emoji}</div>
        <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight">
          {quest.title}
        </h2>
        {quest.oneLiner && (
          <p className="mt-3 text-base leading-relaxed text-ink/70">{quest.oneLiner}</p>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          {quest.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-ink/70"
            >
              #{t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm font-bold text-ink/70">
          <span>⏱ {quest.minutes}分</span>
          <span>💰 {quest.cost === 0 ? "0円" : `〜${quest.cost}円`}</span>
          <span className={difficultyLabel[quest.difficulty].tone}>
            {difficultyLabel[quest.difficulty].label}
          </span>
        </div>
      </div>
    </div>
  );
}
