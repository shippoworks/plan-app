import { useAppStore, progressToNext } from "../lib/store";

export function StatusBar() {
  const { level, xp, totalDone } = useAppStore();
  const p = progressToNext(xp, level);
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <div className="font-mono text-2xl font-bold tracking-tight">Yatta!</div>
        <div className="text-xs font-bold text-ink/50">ちいさな"やった"を重ねる</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-[10px] font-bold text-ink/50">Lv.{level}</div>
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${Math.round(p * 100)}%` }}
            />
          </div>
          <div className="mt-0.5 text-[10px] font-bold text-ink/50">{totalDone}回</div>
        </div>
      </div>
    </div>
  );
}
