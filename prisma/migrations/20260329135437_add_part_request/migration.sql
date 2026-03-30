-- CreateTable
CREATE TABLE "PartRequest" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT,
    "year" INTEGER,
    "partType" TEXT NOT NULL,
    "partDetail" TEXT NOT NULL,
    "city" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PartRequest_status_idx" ON "PartRequest"("status");

-- CreateIndex
CREATE INDEX "PartRequest_brand_idx" ON "PartRequest"("brand");

-- CreateIndex
CREATE INDEX "PartRequest_createdAt_idx" ON "PartRequest"("createdAt");
