import { rowToQuest, json, type Env, type QuestRow } from "../../_lib/quest";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const quests = await env.DB.prepare(
    "SELECT * FROM quests ORDER BY created_at DESC LIMIT 50",
  ).all<QuestRow>();
  const tagRows = await env.DB.prepare(
    "SELECT quest_id, tag FROM quest_tags",
  ).all<{ quest_id: string; tag: string }>();

  const tagsByQuest = new Map<string, string[]>();
  for (const t of tagRows.results ?? []) {
    const arr = tagsByQuest.get(t.quest_id) ?? [];
    arr.push(t.tag);
    tagsByQuest.set(t.quest_id, arr);
  }

  return json(
    (quests.results ?? []).map((row) => rowToQuest(row, tagsByQuest.get(row.id) ?? [])),
  );
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = (await request.json()) as {
    title: string;
    oneLiner?: string;
    minutes?: number;
    cost?: number;
    difficulty?: string;
    color?: string;
    emoji?: string;
    steps?: string[];
    tags?: string[];
  };
  if (!body.title) return json({ error: "title required" }, { status: 400 });

  const id = "u-" + crypto.randomUUID().slice(0, 8);
  await env.DB.prepare(
    `INSERT INTO quests (id, emoji, title, one_liner, steps_json, minutes, cost, difficulty, color)
     VALUES (?,?,?,?,?,?,?,?,?)`,
  )
    .bind(
      id,
      body.emoji ?? "✨",
      body.title,
      body.oneLiner ?? null,
      JSON.stringify(body.steps ?? []),
      body.minutes ?? 5,
      body.cost ?? 0,
      body.difficulty ?? "easy",
      body.color ?? "pink",
    )
    .run();

  for (const tag of body.tags ?? []) {
    await env.DB.prepare(
      "INSERT OR IGNORE INTO quest_tags (quest_id, tag) VALUES (?, ?)",
    )
      .bind(id, tag)
      .run();
  }

  return json({ id });
};
