-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: travel_assignment1
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `travel_listing`
--

DROP TABLE IF EXISTS `travel_listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_listing` (
  `travelID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` int NOT NULL,
  `country` varchar(100) NOT NULL,
  `travelPeriod` varchar(20) NOT NULL,
  `ImageURL` varchar(400) NOT NULL,
  `DateInserted` varchar(100) NOT NULL,
  PRIMARY KEY (`travelID`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_listing`
--

LOCK TABLES `travel_listing` WRITE;
/*!40000 ALTER TABLE `travel_listing` DISABLE KEYS */;
INSERT INTO `travel_listing` VALUES (1,'5D3N Japan','Japan Trip',5000,'Japan','Jan 2023','https://www.istockphoto.com/photo/fuji-japan-in-spring-gm876560704-244648857','25/12/2023_20:3:52'),(5,'3D3N Japan','Japan Trip substring1',3000,'Japan','Feb 2023','SP.edu.sg','25/12/2023_0:57:31'),(7,'8D7N Turkey','Turkey substring23',8000,'Turkey','Feb 2023','www.turkey.com','25/12/2023_13:57:20'),(8,'8D7N Korea','Korea',1000,'Korea','Feb 2023','www.korea.com','25/12/2023_14:15:57'),(9,'8D7N Taiwan','Taiwan ',8000,'Taiwan','Feb 2023','www.taiwan.com','25/12/2023_14:16:16'),(10,'9D7D Hong Kong','Hong Kong',8000,'Hong Kong','Mar 2023','www.hk.com','25/12/2023_20:43:21'),(13,'1D1N Egypt','Egypt Final',9000,'Egypt Tour','Jan 2024','www.eg.com','25/12/2023_21:6:49');
/*!40000 ALTER TABLE `travel_listing` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-25 21:09:54
