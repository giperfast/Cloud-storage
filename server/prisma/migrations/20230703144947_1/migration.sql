/*
  Warnings:

  - You are about to drop the `_childs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `childId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_childs_B_index";

-- DropIndex
DROP INDEX "_childs_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_childs";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "File_childId_fkey" FOREIGN KEY ("childId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "File_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_File" ("extension", "file_id", "id", "name", "parentId", "path", "size", "type", "userId") SELECT "extension", "file_id", "id", "name", "parentId", "path", "size", "type", "userId" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_file_id_key" ON "File"("file_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
