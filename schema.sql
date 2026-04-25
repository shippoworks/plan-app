-- Yatta! schema for Cloudflare D1

DROP TABLE IF EXISTS records;
DROP TABLE IF EXISTS quest_tags;
DROP TABLE IF EXISTS quests;

CREATE TABLE quests (
  id          TEXT PRIMARY KEY,
  emoji       TEXT NOT NULL,
  title       TEXT NOT NULL,
  one_liner   TEXT,
  steps_json  TEXT NOT NULL DEFAULT '[]',
  minutes     INTEGER NOT NULL DEFAULT 5,
  cost        INTEGER NOT NULL DEFAULT 0,
  difficulty  TEXT NOT NULL DEFAULT 'easy',
  color       TEXT NOT NULL DEFAULT 'pink',
  done_count  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE quest_tags (
  quest_id TEXT NOT NULL,
  tag      TEXT NOT NULL,
  PRIMARY KEY (quest_id, tag),
  FOREIGN KEY (quest_id) REFERENCES quests(id) ON DELETE CASCADE
);

CREATE INDEX idx_quest_tags_tag ON quest_tags(tag);

CREATE TABLE records (
  id          TEXT PRIMARY KEY,
  quest_id    TEXT NOT NULL,
  note        TEXT,
  photo_url   TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (quest_id) REFERENCES quests(id)
);

CREATE INDEX idx_records_created ON records(created_at DESC);
