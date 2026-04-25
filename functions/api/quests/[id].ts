import { rowToQuest, json, type Env, type QuestRow } from "../../_lib/quest";

export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const id = params.id as string;
  const row = await env.DB.prepare("SELECT * FROM quests WHERE id = ?")
    .bind(id)
    .first<QuestRow>();
  if (!row) return json({ error: "not found" }, { status: 404 });

  const tagRows = await env.DB.prepare(
    "SELECT tag FROM quest_tags WHERE quest_id = ?",
  )
    .bind(id)
    .all<{ tag: string }>();

  return json(rowToQuest(row, (tagRows.results ?? []).map((t) => t.tag)));
};
