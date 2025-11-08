-- CreateEnum
CREATE TYPE "PageCategory" AS ENUM ('RIJSCHOOL_AUTO', 'RIJSCHOOL_MOTOR', 'RIJSCHOOL_TAXI', 'RIJSCHOOL_AUTOMAAT', 'THEORIE', 'BLOG', 'CONTACT', 'ABOUT', 'GENERAL');

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "wordpressId" INTEGER,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "category" "PageCategory" NOT NULL DEFAULT 'GENERAL',
    "locationId" INTEGER,
    "featuredImage" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "originalUrl" TEXT,
    "publishedAt" TIMESTAMP(3),
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_slug_key" ON "Location"("slug");

-- CreateIndex
CREATE INDEX "Location_slug_idx" ON "Location"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Page_wordpressId_key" ON "Page"("wordpressId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_slug_idx" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_category_idx" ON "Page"("category");

-- CreateIndex
CREATE INDEX "Page_locationId_idx" ON "Page"("locationId");

-- CreateIndex
CREATE INDEX "Page_category_locationId_idx" ON "Page"("category", "locationId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
