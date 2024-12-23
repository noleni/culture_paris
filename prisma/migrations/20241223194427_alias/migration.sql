-- RedefineIndex
DROP INDEX "Rating_userId_eventId_key";
CREATE UNIQUE INDEX "event_user_unique" ON "Rating"("userId", "eventId");
