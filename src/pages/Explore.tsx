import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchQuests } from "../lib/api";
import type { Quest } from "../types";
import { CARD_COLORS } from "../types";

export function Explore() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    fetchQuests().then(setQuests);
  }, []);

  const allTags = Array.from(new Set(quests.flatMap((q) => q.tags)));
  const filtered = tag ? quests.filter((q) => q.tags.includes(tag)) : quests;

  return (
    <div className="flex flex-1 flex-col">
      <header className="px-5 pt-5">
        <h1 className="text-xl font-extrabold">さがす</h1>
      </header>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-5">
        <button
          onClick={() => setTag(null)}
          className={`chip whitespace-nowrap ${tag === null ? "chip-active" : ""}`}
        >
          すべて
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`chip whitespace-nowrap ${tag === t ? "chip-active" : ""}`}
          >
            #{t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pb-10 pt-4">
        {filtered.map((q) => (
          <Link
            key={q.id}
            to={`/quest/${q.id}`}
            className={`${CARD_COLORS[q.color]} flex aspect-[3/4] flex-col justify-between rounded-2xl p-4 shadow-card active:scale-[0.98]`}
          >
            <div className="text-4xl">{q.emoji}</div>
            <div>
              <div className="line-clamp-2 text-sm font-extrabold leading-snug">
                {q.title}
              </div>
              <div className="mt-1 text-[10px] font-bold text-ink/60">
                ⏱ {q.minutes}分
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
