import type { Quest } from "../types";
import { MOCK_QUESTS } from "./mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export async function fetchQuests(): Promise<Quest[]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 100));
    return MOCK_QUESTS;
  }
  const res = await fetch("/api/quests");
  if (!res.ok) throw new Error("failed to fetch quests");
  return (await res.json()) as Quest[];
}

export async function fetchQuest(id: string): Promise<Quest | null> {
  if (USE_MOCK) {
    return MOCK_QUESTS.find((q) => q.id === id) ?? null;
  }
  const res = await fetch(`/api/quests/${id}`);
  if (!res.ok) return null;
  return (await res.json()) as Quest;
}

export async function postQuest(payload: Partial<Quest>): Promise<{ id: string }> {
  if (USE_MOCK) {
    return { id: "local-" + Math.random().toString(36).slice(2, 8) };
  }
  const res = await fetch("/api/quests", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("failed to post");
  return (await res.json()) as { id: string };
}
