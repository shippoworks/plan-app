import { json, type Env } from "../_lib/quest";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = (await request.json()) as {
    questId: string;
    note?: string;
    photoUrl?: string;
  };
  if (!body.questId) return json({ error: "questId required" }, { status: 400 });

  const id = "r-" + crypto.randomUUID().slice(0, 8);
  await env.DB.prepare(
    `INSERT INTO records (id, quest_id, note, photo_url) VALUES (?,?,?,?)`,
  )
    .bind(id, body.questId, body.note ?? null, body.photoUrl ?? null)
    .run();

  await env.DB.prepare(
    `UPDATE quests SET done_count = done_count + 1 WHERE id = ?`,
  )
    .bind(body.questId)
    .run();

  return json({ id });
};
