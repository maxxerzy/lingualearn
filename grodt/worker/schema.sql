-- GRODT D1-Schema. Anwenden mit:
--   npx wrangler d1 execute grodt --remote --file worker/schema.sql
-- (lokal: --local statt --remote)

CREATE TABLE IF NOT EXISTS users (
  code       TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  last_seen  INTEGER NOT NULL
);

-- Ein JSON-Dokument je (Sync-Code, Collection) mit Revisionszähler für
-- Compare-and-Swap-Schreibzugriffe.
CREATE TABLE IF NOT EXISTS blobs (
  code       TEXT NOT NULL,
  collection TEXT NOT NULL,
  rev        INTEGER NOT NULL DEFAULT 0,
  data       TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (code, collection)
);

CREATE TABLE IF NOT EXISTS push_subs (
  endpoint   TEXT PRIMARY KEY,
  code       TEXT NOT NULL,
  sub        TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_subs_code ON push_subs (code);

-- Cron-Zustand getrennt von den Nutzer-Blobs, damit reine Prüf-Läufe keine
-- Sync-Revisionen hochzählen.
CREATE TABLE IF NOT EXISTS alert_state (
  code             TEXT NOT NULL,
  alert_id         TEXT NOT NULL,
  triggered_at     INTEGER,
  last_notified_at INTEGER,
  PRIMARY KEY (code, alert_id)
);

-- Key-Value-Ablage für Worker-Interna (Yahoo-Crumb, Stale-Fundamentals …).
CREATE TABLE IF NOT EXISTS meta (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
