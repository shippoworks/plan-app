import { useAppStore, progressToNext } from "../lib/store";
import { MOCK_BADGES } from "../lib/mockData";

export function MyPage() {
  const { records, totalDone, level, xp, unlockedBadges } = useAppStore();
  const p = progressToNext(xp, level);
  const fmt = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="px-5 pt-5">
        <h1 className="text-xl font-extrabold">あなたの物語</h1>
      </header>

      <section className="mx-5 mt-4 rounded-card bg-gradient-to-br from-primary to-lav p-6 text-white shadow-card">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold opacity-80">Level</div>
            <div className="font-mono text-5xl font-bold">{level}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold opacity-80">累計</div>
            <div className="font-mono text-3xl font-bold">{totalDone}</div>
            <div className="text-xs opacity-80">回やった</div>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full rounded-full bg-white transition-all"
            style={{ width: `${Math.round(p * 100)}%` }}
          />
        </div>
        <div className="mt-1 text-right text-[10px] opacity-80">
          次のレベルまで {Math.round((1 - p) * 100)}%
        </div>
      </section>

      <section className="px-5 pt-7">
        <h2 className="text-lg font-extrabold">
          🏅 バッジ ({unlockedBadges.length}/{MOCK_BADGES.length})
        </h2>
        <div className="mt-3 grid grid-cols-5 gap-3">
          {MOCK_BADGES.map((b) => {
            const got = unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`flex aspect-square flex-col items-center justify-center rounded-2xl text-3xl transition ${
                  got ? "bg-white shadow-card" : "bg-ink/5 grayscale"
                }`}
                title={`${b.name} - ${b.description}`}
              >
                <span className={got ? "" : "opacity-30"}>{b.emoji}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-5 pt-7 pb-10">
        <h2 className="text-lg font-extrabold">📖 やった履歴</h2>
        {records.length === 0 ? (
          <div className="mt-4 rounded-2xl bg-white p-6 text-center text-sm text-ink/50 shadow-card">
            まだ記録がありません。
            <br />
            ホームでカードをめくってみよう。
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {records.map((r) => (
              <div
                key={r.id}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card"
              >
                <span className="text-3xl">{r.questEmoji}</span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-ink/50">{fmt(r.createdAt)}</div>
                  <div className="font-bold">{r.questTitle}</div>
                  {r.note && (
                    <div className="mt-1 text-sm text-ink/70">"{r.note}"</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
