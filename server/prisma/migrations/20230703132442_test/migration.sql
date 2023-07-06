/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DeletedFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `File` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id` to the `DeletedFile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_childs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_childs_A_fkey" FOREIGN KEY ("A") REFERENCES "File" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_childs_B_fkey" FOREIGN KEY ("B") REFERENCES "File" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "userId" INTEGER NOT NULL,
    CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_File" ("extension", "file_id", "name", "size", "type", "userId") SELECT "extension", "file_id", "name", "size", "type", "userId" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_file_id_key" ON "File"("file_id");
CREATE TABLE "new_DeletedFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT,
    "size" INTEGER NOT NULL,
    "type" TEXT,
    "expires" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "DeletedFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DeletedFile" ("expires", "extension", "file_id", "name", "size", "type", "userId") SELECT "expires", "extension", "file_id", "name", "size", "type", "userId" FROM "DeletedFile";
DROP TABLE "DeletedFile";
ALTER TABLE "new_DeletedFile" RENAME TO "DeletedFile";
CREATE UNIQUE INDEX "DeletedFile_file_id_key" ON "DeletedFile"("file_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_childs_AB_unique" ON "_childs"("A", "B");

-- CreateIndex
CREATE INDEX "_childs_B_index" ON "_childs"("B");
