-- CreateTable
CREATE TABLE "File" (
    "file_id" TEXT NOT NULL PRIMARY KEY,
    "name" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "File_file_id_key" ON "File"("file_id");
