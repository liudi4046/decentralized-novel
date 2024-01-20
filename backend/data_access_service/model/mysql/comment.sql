CREATE TABLE `comment` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', 
    `chapter_hash` varchar(255) NOT NULL, 
    `wallet_address` varchar(255) NOT NULL, 
    `comment` varchar(255) NOT NULL, 
    `timestamp` varchar(255) NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci