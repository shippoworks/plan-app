import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Quest } from "../types";
import { QuestCard } from "./QuestCard";

type Props = {
  quests: Quest[];
};

export function CardStack({ quests }: Props) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(
    [x, y] as never,
    ([latestX, latestY]: number[]) =>
      1 - Math.min(1, (Math.abs(latestX) + Math.abs(latestY)) / 400),
  );

  const top = quests[index % quests.length];
  const next = quests[(index + 1) % quests.length];
  const nextNext = quests[(index + 2) % quests.length];

  const advance = () => {
    setIndex((i) => i + 1);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative mx-auto h-[480px] w-[320px] sm:h-[520px] sm:w-[340px]">
      {/* Bottom layer (peek) */}
      {nextNext && (
        <div
          className="absolute inset-0 origin-bottom"
          style={{ transform: "scale(0.9) translateY(24px)", opacity: 0.5 }}
        >
          <QuestCard quest={nextNext} />
        </div>
      )}
      {/* Middle layer */}
      {next && (
        <div
          className="absolute inset-0 origin-bottom"
          style={{ transform: "scale(0.95) translateY(12px)", opacity: 0.85 }}
        >
          <QuestCard quest={next} />
        </div>
      )}
      {/* Top draggable */}
      <AnimatePresence>
        {top && (
          <motion.div
            key={top.id + "-" + index}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ x, y, rotate, opacity }}
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_e, info) => {
              const dx = info.offset.x;
              const dy = info.offset.y;
              if (Math.abs(dx) > 120 || Math.abs(dy) > 120) {
                advance();
              }
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: 600, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <QuestCard quest={top} onTap={() => navigate(`/quest/${top.id}`)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
