/*
  Warnings:

  - You are about to drop the column `childId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeletedFile" ADD COLUMN "date" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT,
    "date" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_File" ("extension", "file_id", "id", "name", "path", "size", "type", "userId") SELECT "extension", "file_id", "id", "name", "path", "size", "type", "userId" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_file_id_key" ON "File"("file_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
