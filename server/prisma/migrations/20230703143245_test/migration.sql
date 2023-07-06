-- CreateTable
CREATE TABLE "DeletedFile" (
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

-- CreateIndex
CREATE UNIQUE INDEX "DeletedFile_file_id_key" ON "DeletedFile"("file_id");
