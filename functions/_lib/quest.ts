export type QuestRow = {
  id: string;
  emoji: string;
  title: string;
  one_liner: string | null;
  steps_json: string;
  minutes: number;
  cost: number;
  difficulty: string;
  color: string;
  done_count: number;
};

export function rowToQuest(row: QuestRow, tags: string[]) {
  return {
    id: row.id,
    emoji: row.emoji,
    title: row.title,
    oneLiner: row.one_liner ?? undefined,
    steps: JSON.parse(row.steps_json) as string[],
    minutes: row.minutes,
    cost: row.cost,
    difficulty: row.difficulty,
    color: row.color,
    doneCount: row.done_count,
    tags,
  };
}

export const json = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json; charset=utf-8" },
    ...init,
  });

export type Env = {
  DB: D1Database;
};
