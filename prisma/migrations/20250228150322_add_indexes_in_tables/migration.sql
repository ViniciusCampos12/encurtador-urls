-- DropIndex
DROP INDEX `shortned_urls_deletedAt_idx` ON `shortned_urls`;

-- CreateIndex
CREATE INDEX `shortned_urls_shortCode_deletedAt_idx` ON `shortned_urls`(`shortCode`, `deletedAt`);

-- CreateIndex
CREATE INDEX `shortned_urls_id_deletedAt_idx` ON `shortned_urls`(`id`, `deletedAt`);

-- CreateIndex
CREATE INDEX `shortned_urls_userId_deletedAt_idx` ON `shortned_urls`(`userId`, `deletedAt`);

-- CreateIndex
CREATE INDEX `shortned_urls_userId_id_deletedAt_idx` ON `shortned_urls`(`userId`, `id`, `deletedAt`);

-- CreateIndex
CREATE INDEX `users_email_idx` ON `users`(`email`);
