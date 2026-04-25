import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchQuest, fetchQuests } from "../lib/api";
import { MOCK_RECENT_PHOTOS } from "../lib/mockData";
import type { Quest } from "../types";
import { CARD_COLORS } from "../types";

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [related, setRelated] = useState<Quest[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchQuest(id).then(setQuest);
    fetchQuests().then((qs) =>
      setRelated(qs.filter((q) => q.id !== id).slice(0, 3)),
    );
  }, [id]);

  if (!quest) {
    return <div className="flex flex-1 items-center justify-center text-ink/40">読み込み中...</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center px-3 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card active:scale-95"
        >
          ←
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-32">
        <div className={`${CARD_COLORS[quest.color]} rounded-card p-7 shadow-card`}>
          <div className="text-7xl">{quest.emoji}</div>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight">{quest.title}</h1>
          {quest.oneLiner && (
            <p className="mt-3 text-base text-ink/70">{quest.oneLiner}</p>
          )}
          <div className="mt-5 flex items-center gap-4 text-sm font-bold text-ink/70">
            <span>⏱ {quest.minutes}分</span>
            <span>💰 {quest.cost === 0 ? "0円" : `〜${quest.cost}円`}</span>
            <span>🟢 {quest.difficulty}</span>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-extrabold">📝 やり方</h2>
          <ol className="mt-3 space-y-3">
            {quest.steps.map((s, i) => (
              <li key={i} className="flex gap-3 rounded-2xl bg-white p-4 shadow-card">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm font-semibold text-ink">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-extrabold">🌟 みんなのやった ({quest.doneCount ?? 0})</h2>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
            {MOCK_RECENT_PHOTOS.map((src) => (
              <img
                key={src}
                src={src}
                className="h-24 w-24 shrink-0 rounded-2xl object-cover shadow-card"
                alt=""
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-extrabold">🔗 関連</h2>
          <div className="mt-3 space-y-2">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/quest/${r.id}`}
                className={`${CARD_COLORS[r.color]} flex items-center gap-3 rounded-2xl p-4 shadow-card active:scale-[0.98]`}
              >
                <span className="text-3xl">{r.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold">{r.title}</div>
                  <div className="text-xs text-ink/60">⏱ {r.minutes}分</div>
                </div>
                <span className="text-ink/40">›</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-md justify-center bg-gradient-to-t from-cream to-cream/0 px-5 pb-[max(env(safe-area-inset-bottom),16px)] pt-6">
        <button
          className="btn-primary w-full"
          onClick={() => navigate(`/quest/${quest.id}/run`)}
        >
          ▶ やってみる
        </button>
      </div>
    </div>
  );
}
