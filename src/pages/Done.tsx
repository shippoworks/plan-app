import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Confetti } from "../components/Confetti";
import { fetchQuest } from "../lib/api";
import { useAppStore } from "../lib/store";
import type { Quest } from "../types";

export function Done() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [note, setNote] = useState("");
  const [leveledUp, setLeveledUp] = useState(false);
  const addRecord = useAppStore((s) => s.addRecord);
  const level = useAppStore((s) => s.level);

  useEffect(() => {
    if (!id) return;
    fetchQuest(id).then(setQuest);
  }, [id]);

  if (!quest) return null;

  const onSave = (skip = false) => {
    const result = addRecord({
      id: "r-" + Date.now(),
      questId: quest.id,
      questTitle: quest.title,
      questEmoji: quest.emoji,
      note: skip ? undefined : note || undefined,
      createdAt: new Date().toISOString(),
    });
    setLeveledUp(result.leveledUp);
    setTimeout(() => navigate("/me"), 600);
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-between p-6">
      <Confetti />

      <div />

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="flex flex-col items-center text-center"
      >
        <div className="text-7xl">{quest.emoji}</div>
        <div className="mt-4 text-3xl font-extrabold">🎉 やった!</div>
        <div className="mt-2 text-base text-ink/60">{quest.title}</div>
        {leveledUp && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-card"
          >
            ✨ Lv.{level} に上がった!
          </motion.div>
        )}
      </motion.div>

      <div className="w-full max-w-xs space-y-3">
        <textarea
          rows={3}
          placeholder="ひとこと(任意)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full resize-none rounded-2xl bg-white p-4 text-sm shadow-card outline-none placeholder:text-ink/40"
        />
        <button className="btn-primary w-full" onClick={() => onSave(false)}>
          保存する
        </button>
        <button className="btn-ghost w-full" onClick={() => onSave(true)}>
          スキップ
        </button>
      </div>
    </div>
  );
}
