import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardStack } from "../components/CardStack";
import { StatusBar } from "../components/StatusBar";
import { fetchQuests } from "../lib/api";
import type { Quest } from "../types";

export function Home() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [shuffleKey, setShuffleKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuests().then((qs) => {
      setQuests(qs);
      setLoading(false);
    });
  }, []);

  const top = quests[0];

  const onShuffle = () => {
    setQuests((qs) => [...qs].sort(() => Math.random() - 0.5));
    setShuffleKey((k) => k + 1);
  };

  return (
    <div className="flex flex-1 flex-col">
      <StatusBar />

      <div className="flex items-center justify-between px-5 pb-2">
        <div>
          <div className="text-xs font-bold text-ink/50">きょうの一枚</div>
          <div className="text-lg font-extrabold">どれにする?</div>
        </div>
        <button
          onClick={onShuffle}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-card active:scale-95"
          aria-label="シャッフル"
        >
          🎲
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5">
        {loading ? (
          <div className="text-ink/40">読み込み中...</div>
        ) : (
          <>
            <CardStack key={shuffleKey} quests={quests} />
            <div className="flex flex-col items-center gap-2">
              <button
                className="btn-primary"
                onClick={() => top && navigate(`/quest/${top.id}`)}
              >
                ▶ やってみる
              </button>
              <p className="text-xs text-ink/40">↑↓→← スワイプで次のカード</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
