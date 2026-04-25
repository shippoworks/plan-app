import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuest } from "../lib/api";
import type { Quest } from "../types";

export function Run() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!id) return;
    fetchQuest(id).then(setQuest);
  }, [id]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  if (!quest) return null;

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex flex-1 flex-col items-center justify-between p-6">
      <div className="mt-6 text-xs font-bold tracking-widest text-ink/40">
        やってみる中...
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-8xl">{quest.emoji}</div>
        <h1 className="text-2xl font-extrabold">{quest.title}</h1>
        <div className="font-mono text-5xl font-bold tabular-nums text-primary">
          {mm}:{ss}
        </div>

        <div className="mt-4 w-full max-w-xs space-y-2">
          {quest.steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
              className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-card transition active:scale-[0.98] ${
                checked[i] ? "bg-lime/20 line-through" : "bg-white"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${
                  checked[i] ? "border-lime bg-lime text-white" : "border-ink/20"
                }`}
              >
                {checked[i] ? "✓" : ""}
              </span>
              <span className="text-sm font-semibold">{s}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <button
          className="btn-primary w-full"
          onClick={() => navigate(`/quest/${quest.id}/done`)}
        >
          🎉 やった!
        </button>
        <button
          className="btn-ghost w-full"
          onClick={() => navigate(-1)}
        >
          やめる
        </button>
      </div>
    </div>
  );
}
