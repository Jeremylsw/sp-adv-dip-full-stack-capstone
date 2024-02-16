-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: mydatabase.cxacgmocie5o.us-east-1.rds.amazonaws.com    Database: travel_assignment1
-- ------------------------------------------------------
-- Server version	8.0.35

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_listing_archive`
--

LOCK TABLES `travel_listing_archive` WRITE;
/*!40000 ALTER TABLE `travel_listing_archive` DISABLE KEYS */;
INSERT INTO `travel_listing_archive` VALUES (1,'25/12/2023_20:3:40',1,'Jeremy','5D3N Japan','Japan Trip',3000,'Japan','Jan 2023','https://www.istockphoto.com/photo/fuji-japan-in-spring-gm876560704-244648857'),(2,'25/12/2023_20:3:52',1,'Jeremy','5D3N Japan','Japan Trip',5000,'Japan','Jan 2023','https://www.istockphoto.com/photo/fuji-japan-in-spring-gm876560704-244648857'),(3,'25/12/2023_21:0:24',2,'admin','1D1N Egypt','Egypt Tour',9000,'Egypt Tour','Apr 2023','www.eg.com'),(4,'25/12/2023_21:0:38',2,'admin','1D1N Egypt','Egypt Tour latest upodate',9000,'Egypt Tour','Apr 2023','www.eg.com'),(5,'25/12/2023_21:1:6',2,'admin','1D1N Egypt','Egypt Tour latest upodate',9000,'Egypt Tour','Aug 2025','www.eg.com'),(6,'25/12/2023_21:4:22',2,'admin','1D1N Egypt','Egypt New NEW',9000,'Egypt Tour','Feb 2025','www.eg.com'),(7,'25/12/2023_21:5:27',2,'admin','1D1N Egypt','Egypt New NEW',9000,'Egypt Tour','Feb 2025','www.eg.com'),(8,'25/12/2023_21:5:39',2,'admin','1D1N Egypt','Egypt New NEW2',9000,'Egypt Tour','Feb 2025','www.eg.com'),(9,'25/12/2023_21:5:59',2,'admin','1D1N Egypt','Egypt New NEW3',9000,'Egypt Tour','Feb 2025','www.eg.com'),(10,'25/12/2023_21:6:49',2,'admin','1D1N Egypt','Egypt New NEW4',9000,'Egypt Tour','Jan 2025','www.eg.com'),(11,'2/1/2024_18:53:32',2,'admin','10D10N Singapore','Singapore Tour',1234,'Singapore','Apr 2023','www.eg.com'),(12,'29/1/2024_0:58:44',2,'admin','10D10N Singapore','This is a modified update',4321,'Singapore','Apr 2023','www.eg.com'),(13,'29/1/2024_0:59:13',2,'admin','10D10N Singapore','This is a modified update',4321,'Singapore','Apr 2023','www.eg.com'),(14,'1/2/2024_10:43:41',2,'admin','10D10N CLOUD2','CLOUD2',100002,'CLOUD2','CLOUD 20232','CLOUD.COM2'),(15,'4/2/2024_16:22:6',1,'Jeremy','a','a',0,'a','a','a'),(16,'4/2/2024_16:22:52',1,'Jeremy','a','a',0,'a','a','a'),(17,'4/2/2024_16:37:19',1,'Jeremy','t','t',0,'t','t','t'),(18,'8/2/2024_8:46:36',1,'Jeremy','ddds','ddds',0,'ddds','ddds','ddds'),(19,'8/2/2024_12:38:34',1,'Jeremy','3D3N Japan','Japan Trip substring1',3000,'Japan','Feb 2023','SP.edu.sg'),(20,'8/2/2024_12:39:32',1,'Jeremy','3D3N Japan','vvv',0,'vvv','vvv','vvv'),(21,'8/2/2024_12:40:15',1,'Jeremy','3D3N Japan','aaa',0,'aaa','aaa','aaa'),(22,'8/2/2024_12:47:32',1,'Jeremy','3D3N Japan','sss',0,'sss','sss','sss'),(23,'8/2/2024_12:50:15',1,'Jeremy','3D3N Japan','zzz',0,'zzz','zzz','zzz'),(24,'8/2/2024_12:50:27',1,'Jeremy','3D3N Japan','aaa',0,'aaa','aaa','aaa'),(25,'8/2/2024_12:50:52',1,'Jeremy','3D3N Japan','s',0,'s','s','s'),(26,'8/2/2024_12:52:59',1,'Jeremy','3D3N Japan','a',0,'a','a','a'),(27,'8/2/2024_12:53:49',1,'Jeremy','3D3N Japan','z',0,'z','z','z'),(28,'8/2/2024_12:54:24',1,'Jeremy','3D3N Japan','a',0,'a','a','a'),(29,'8/2/2024_12:58:39',1,'Jeremy','3D3N Japan','v',2000,'v','v','v'),(30,'8/2/2024_13:0:12',1,'Jeremy','3D3N Japan','a',0,'a','a','a'),(31,'8/2/2024_13:0:25',1,'Jeremy','3D3N Japan','b',0,'b','b','b'),(32,'8/2/2024_13:31:32',1,'Jeremy','3D3N Japan','c',3000,'c','c','c'),(33,'8/2/2024_16:34:41',1,'Jeremy','10D10N CLOUD','CLOUD',10000,'CLOUD','CLOUD 2023','CLOUD.COM'),(34,'9/2/2024_9:20:52',1,'Jeremy','c','c',0,'c','c','c'),(35,'9/2/2024_9:41:45',1,'Jeremy','a','a',0,'a','a','a'),(36,'9/2/2024_9:41:48',1,'Jeremy','a','b',0,'b','b','b'),(37,'9/2/2024_10:1:54',1,'Jeremy','c','c',0,'c','c','c'),(38,'9/2/2024_12:26:49',1,'Jeremy','a','a',0,'a','a','a'),(39,'16/2/2024_10:7:40',1,'Jeremy','test','test',3000,'test','test','test'),(40,'16/2/2024_12:25:9',2,'admin','a','a',0,'a','a','a'),(41,'16/2/2024_12:48:26',1,'Jeremy','demo','demo',3000,'demo','demo','demo');
/*!40000 ALTER TABLE `travel_listing_archive` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 23:12:18
