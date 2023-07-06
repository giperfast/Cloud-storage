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
    "childId" INTEGER,
    "parentId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "File_childId_fkey" FOREIGN KEY ("childId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_File" ("childId", "extension", "file_id", "id", "name", "parentId", "path", "size", "type", "userId") SELECT "childId", "extension", "file_id", "id", "name", "parentId", "path", "size", "type", "userId" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_file_id_key" ON "File"("file_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
