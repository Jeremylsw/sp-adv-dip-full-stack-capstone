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
-- Table structure for table `travel_listing_archive`
--

DROP TABLE IF EXISTS `travel_listing_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_listing_archive` (
  `travelID` int NOT NULL AUTO_INCREMENT,
  `dateArchived` varchar(100) NOT NULL,
  `adminID` int NOT NULL,
  `adminName` varchar(100) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` int NOT NULL,
  `country` varchar(100) NOT NULL,
  `travelPeriod` varchar(20) NOT NULL,
  `ImageURL` varchar(400) NOT NULL,
  PRIMARY KEY (`travelID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_listing_archive`
--

LOCK TABLES `travel_listing_archive` WRITE;
/*!40000 ALTER TABLE `travel_listing_archive` DISABLE KEYS */;
INSERT INTO `travel_listing_archive` VALUES (1,'25/12/2023_20:3:40',1,'Jeremy','5D3N Japan','Japan Trip',3000,'Japan','Jan 2023','https://www.istockphoto.com/photo/fuji-japan-in-spring-gm876560704-244648857'),(2,'25/12/2023_20:3:52',1,'Jeremy','5D3N Japan','Japan Trip',5000,'Japan','Jan 2023','https://www.istockphoto.com/photo/fuji-japan-in-spring-gm876560704-244648857'),(3,'25/12/2023_21:0:24',2,'admin','1D1N Egypt','Egypt Tour',9000,'Egypt Tour','Apr 2023','www.eg.com'),(4,'25/12/2023_21:0:38',2,'admin','1D1N Egypt','Egypt Tour latest upodate',9000,'Egypt Tour','Apr 2023','www.eg.com'),(5,'25/12/2023_21:1:6',2,'admin','1D1N Egypt','Egypt Tour latest upodate',9000,'Egypt Tour','Aug 2025','www.eg.com'),(6,'25/12/2023_21:4:22',2,'admin','1D1N Egypt','Egypt New NEW',9000,'Egypt Tour','Feb 2025','www.eg.com'),(7,'25/12/2023_21:5:27',2,'admin','1D1N Egypt','Egypt New NEW',9000,'Egypt Tour','Feb 2025','www.eg.com'),(8,'25/12/2023_21:5:39',2,'admin','1D1N Egypt','Egypt New NEW2',9000,'Egypt Tour','Feb 2025','www.eg.com'),(9,'25/12/2023_21:5:59',2,'admin','1D1N Egypt','Egypt New NEW3',9000,'Egypt Tour','Feb 2025','www.eg.com'),(10,'25/12/2023_21:6:49',2,'admin','1D1N Egypt','Egypt New NEW4',9000,'Egypt Tour','Jan 2025','www.eg.com');
/*!40000 ALTER TABLE `travel_listing_archive` ENABLE KEYS */;
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
