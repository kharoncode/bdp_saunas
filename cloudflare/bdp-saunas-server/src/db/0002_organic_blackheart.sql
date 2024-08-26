ALTER TABLE `users` RENAME COLUMN `login` TO `username`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_login_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);