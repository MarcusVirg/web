CREATE TABLE comments (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	blog_id TEXT NOT NULL CHECK (length(blog_id) BETWEEN 1 AND 200),
	author TEXT NOT NULL CHECK (length(author) BETWEEN 1 AND 50),
	comment TEXT NOT NULL CHECK (length(comment) BETWEEN 1 AND 3000),
	created_at TEXT NOT NULL,
	deleted_at TEXT
);

CREATE INDEX comments_by_blog_and_date
	ON comments (blog_id, created_at DESC, id DESC)
	WHERE deleted_at IS NULL;

CREATE TABLE feature_flags (
	key TEXT PRIMARY KEY,
	enabled INTEGER NOT NULL CHECK (enabled IN (0, 1))
);

INSERT INTO feature_flags (key, enabled) VALUES ('add-comment', 1);

CREATE TABLE rate_limits (
	identifier TEXT NOT NULL,
	window_start INTEGER NOT NULL,
	request_count INTEGER NOT NULL CHECK (request_count > 0),
	PRIMARY KEY (identifier, window_start)
);
