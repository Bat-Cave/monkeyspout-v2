CREATE TABLE `Flag` (
  `flagId` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `questionId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `resolved` tinyint(1) NOT NULL,
  PRIMARY KEY (`flagId`),
  KEY `Flag_questionId_idx` (`questionId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
