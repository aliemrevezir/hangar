-- AlterTable
ALTER TABLE "Dealer" ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'classic';

-- CreateIndex
CREATE INDEX "Dealer_plan_idx" ON "Dealer"("plan");
