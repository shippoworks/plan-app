import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postQuest } from "../lib/api";

const MINUTES = [3, 5, 10, 30];
const COSTS = [
  { v: 0, label: "0円" },
  { v: 500, label: "〜500" },
  { v: 2000, label: "〜2000" },
  { v: 9999, label: "それ以上" },
];
const DIFFS: Array<{ v: "easy" | "normal" | "hard"; label: string }> = [
  { v: "easy", label: "🟢 かんたん" },
  { v: "normal", label: "🟡 ふつう" },
  { v: "hard", label: "🔥 チャレンジ" },
];
const SUGGESTED_TAGS = ["散歩", "5分", "自然", "食", "創作", "発見", "朝", "ひとり時間"];

export function Post() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [minutes, setMinutes] = useState<number | null>(null);
  const [cost, setCost] = useState<number | null>(null);
  const [diff, setDiff] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleTag = (t: string) =>
    setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const onSubmit = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await postQuest({
        title: title.trim(),
        oneLiner: oneLiner.trim() || undefined,
        minutes: minutes ?? 5,
        cost: cost ?? 0,
        difficulty: (diff as "easy" | "normal" | "hard") ?? "easy",
        tags,
      });
      navigate("/", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-5 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card"
        >
          ✕
        </button>
        <button
          disabled={!title.trim() || submitting}
          onClick={onSubmit}
          className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-card disabled:opacity-40"
        >
          {submitting ? "..." : "投稿する"}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-10">
        <h1 className="text-2xl font-extrabold">どんな"やった"?</h1>

        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例: 駅までの新ルート"
          className="mt-4 w-full rounded-2xl bg-white px-4 py-4 text-base font-semibold shadow-card outline-none placeholder:text-ink/40"
        />

        <textarea
          rows={3}
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
          placeholder="ひとこと(任意)"
          className="mt-3 w-full resize-none rounded-2xl bg-white p-4 text-sm shadow-card outline-none placeholder:text-ink/40"
        />

        <div className="mt-6">
          <div className="text-xs font-bold text-ink/50">📷 写真(任意)</div>
          <button className="mt-2 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-ink/20 bg-white text-3xl text-ink/30">
            +
          </button>
        </div>

        <div className="mt-8 border-t border-ink/5 pt-6">
          <div className="text-xs font-bold text-ink/50">⏱ 所要時間</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {MINUTES.map((m) => (
              <button
                key={m}
                onClick={() => setMinutes(m)}
                className={`chip ${minutes === m ? "chip-active" : ""}`}
              >
                {m}分
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-bold text-ink/50">💰 費用</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {COSTS.map((c) => (
              <button
                key={c.v}
                onClick={() => setCost(c.v)}
                className={`chip ${cost === c.v ? "chip-active" : ""}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-bold text-ink/50">🎯 ハードル</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {DIFFS.map((d) => (
              <button
                key={d.v}
                onClick={() => setDiff(d.v)}
                className={`chip ${diff === d.v ? "chip-active" : ""}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-bold text-ink/50">🏷 タグ</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGGESTED_TAGS.map((t) => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`chip ${tags.includes(t) ? "chip-active" : ""}`}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
