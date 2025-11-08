-- Solution 1: Create a lightweight view for Railway GUI
-- This view excludes the heavy 'content' column

DROP VIEW IF EXISTS "PageLight";

CREATE VIEW "PageLight" AS
SELECT
  id,
  "wordpressId",
  slug,
  title,
  LEFT(content, 200) as content_preview,  -- Only first 200 chars
  LENGTH(content) as content_length,      -- Show size instead
  excerpt,
  category,
  "locationId",
  "featuredImage",
  "seoTitle",
  "seoDescription",
  "seoKeywords",
  "originalUrl",
  "publishedAt",
  "parentId",
  "createdAt",
  "updatedAt"
FROM "Page"
ORDER BY id;

-- Now in Railway GUI, use: SELECT * FROM "PageLight";
-- This will load instantly without timeouts!
