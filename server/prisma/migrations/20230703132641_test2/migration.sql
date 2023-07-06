/*
  Warnings:

  - You are about to drop the `DeletedFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DeletedFile";
PRAGMA foreign_keys=on;
