import { MOCK_BADGES } from "../lib/mockData";
import { useAppStore } from "../lib/store";

export function Badges() {
  const unlocked = useAppStore((s) => s.unlockedBadges);

  return (
    <div className="flex flex-1 flex-col">
      <header className="px-5 pt-5">
        <h1 className="text-xl font-extrabold">図鑑</h1>
        <div className="text-xs font-bold text-ink/50">
          {unlocked.length} / {MOCK_BADGES.length} 集めた
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 px-5 pb-10 pt-5">
        {MOCK_BADGES.map((b) => {
          const got = unlocked.includes(b.id);
          return (
            <div
              key={b.id}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl p-3 text-center transition ${
                got ? "bg-white shadow-card" : "bg-ink/5"
              }`}
            >
              <span className={`text-4xl ${got ? "" : "opacity-30 grayscale"}`}>
                {b.emoji}
              </span>
              <div className={`text-[11px] font-bold ${got ? "text-ink" : "text-ink/40"}`}>
                {got ? b.name : "???"}
              </div>
              <div className="text-[9px] text-ink/50">
                {got ? b.description : "ヒミツ"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
