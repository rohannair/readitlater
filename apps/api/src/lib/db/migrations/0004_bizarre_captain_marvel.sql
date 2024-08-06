CREATE INDEX IF NOT EXISTS "search_index" ON "links" USING gin ((
          setweight(to_tsvector('english', "title"), 'A') ||
          setweight(to_tsvector('english', "cleaned"), 'B')
      ));