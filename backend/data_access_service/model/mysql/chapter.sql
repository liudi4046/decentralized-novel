CREATE TABLE `chapter` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', 
    `hash` varchar(255) NOT NULL, 
    `content` text NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci