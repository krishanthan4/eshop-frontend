-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.39-0ubuntu0.22.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for befit-2
CREATE DATABASE IF NOT EXISTS `befit-2_backup` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `befit-2_backup`;

-- Dumping structure for table befit-2.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `vcode` varchar(20) DEFAULT NULL,
  `adminImg` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.admin: ~0 rows (approximately)
INSERT INTO `admin` (`fname`, `lname`, `email`, `vcode`, `adminImg`) VALUES
	('adminFname', 'adminLname', 'hacktf.academy@gmail.com', '667e784737e20', '../resources/profile_images/adminFname_667e4c74b9d02.jpeg');

-- Dumping structure for table befit-2.brand
CREATE TABLE IF NOT EXISTS `brand` (
  `brandId` int NOT NULL AUTO_INCREMENT,
  `brandName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`brandId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.brand: ~27 rows (approximately)
INSERT INTO `brand` (`brandId`, `brandName`) VALUES
	(1, 'Yonex'),
	(2, 'Wish'),
	(3, 'Wilson'),
	(4, 'Protech'),
	(5, 'Kawasaki'),
	(6, 'Yang Yang'),
	(7, 'Adidas'),
	(8, 'Speedo'),
	(9, 'Jade Swim'),
	(10, 'Nike'),
	(11, 'Arena'),
	(12, 'Life Fitness'),
	(13, 'FitLine'),
	(14, 'Reebok'),
	(15, 'Cybex'),
	(16, 'Viva Fitness'),
	(17, 'ThenX'),
	(18, 'Alien Workshop'),
	(19, 'BOOM'),
	(20, 'Zoo York'),
	(21, 'GAN'),
	(22, 'Moyu'),
	(23, 'Rubiks'),
	(24, 'Gravity Fitness'),
	(25, 'Iron Company'),
	(26, 'Pullup & Dip'),
	(27, 'Street Gains');

-- Dumping structure for table befit-2.cart
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `qty` int DEFAULT NULL,
  `userEmail` varchar(100) NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user1_idx` (`userEmail`),
  KEY `fk_cart_product1_idx` (`productId`),
  CONSTRAINT `fk_cart_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_cart_user1` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.cart: ~10 rows (approximately)
INSERT INTO `cart` (`cart_id`, `qty`, `userEmail`, `productId`) VALUES
	(88, 1, 'lifaso6961@devncie.com', 105),
	(89, 1, 'yolixac932@joeroc.com', 5),
	(90, 1, 'yolixac932@joeroc.com', 112),
	(91, 1, 'yilib46895@cutxsew.com', 111),
	(92, 1, 'feroj41049@devncie.com', 25),
	(93, 1, 'feroj41049@devncie.com', 6),
	(95, 1, 'feroj41049@devncie.com', 105),
	(96, 1, 'feroj41049@devncie.com', 113),
	(97, 1, 'sarathmunasinghe07@gmail.com', 13),
	(98, 1, 'sarathmunasinghe07@gmail.com', 30);

-- Dumping structure for table befit-2.category
CREATE TABLE IF NOT EXISTS `category` (
  `catId` int NOT NULL AUTO_INCREMENT,
  `catName` varchar(50) DEFAULT NULL,
  `catImg` text,
  `catIcon` tinytext NOT NULL,
  PRIMARY KEY (`catId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.category: ~6 rows (approximately)
INSERT INTO `category` (`catId`, `catName`, `catImg`, `catIcon`) VALUES
	(1, 'Calisthenics', './resources/category1.jpeg', 'public/images/sort_icons/calisthenics.svg'),
	(2, 'Weight Training', './resources/category2.jpeg', 'public/images/sort_icons/gym.svg'),
	(3, 'Swimming', './resources/category3.jpg', 'public/images/sort_icons/swimming.svg'),
	(4, 'Badminton', './resources/category4.jpg', 'public/images/sort_icons/badminton.svg'),
	(5, 'Skateboard', './resources/category5.jpeg', 'public/images/sort_icons/skateboard.svg'),
	(6, 'Rubik Cubes', './resources/category6.jpg', 'public/images/sort_icons/rubik.svg');

-- Dumping structure for table befit-2.categoryHasBrand
CREATE TABLE IF NOT EXISTS `categoryHasBrand` (
  `categoryCatId` int NOT NULL,
  `brand_brandId` int NOT NULL,
  PRIMARY KEY (`categoryCatId`,`brand_brandId`),
  KEY `fk_categoryHasBrand_brand1_idx` (`brand_brandId`),
  KEY `fk_categoryHasBrand_category1_idx` (`categoryCatId`),
  CONSTRAINT `fk_categoryHasBrand_brand1` FOREIGN KEY (`brand_brandId`) REFERENCES `brand` (`brandId`),
  CONSTRAINT `fk_categoryHasBrand_category1` FOREIGN KEY (`categoryCatId`) REFERENCES `category` (`catId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.categoryHasBrand: ~23 rows (approximately)
INSERT INTO `categoryHasBrand` (`categoryCatId`, `brand_brandId`) VALUES
	(4, 1),
	(4, 2),
	(3, 7),
	(3, 8),
	(3, 9),
	(3, 10),
	(3, 11),
	(2, 12),
	(2, 13),
	(2, 14),
	(2, 15),
	(2, 16),
	(1, 17),
	(5, 18),
	(5, 19),
	(5, 20),
	(6, 21),
	(6, 22),
	(6, 23),
	(1, 24),
	(1, 25),
	(1, 26),
	(1, 27);

-- Dumping structure for table befit-2.city
CREATE TABLE IF NOT EXISTS `city` (
  `cityId` int NOT NULL AUTO_INCREMENT,
  `cityName` varchar(45) DEFAULT NULL,
  `districtDistrictId` int NOT NULL,
  PRIMARY KEY (`cityId`),
  KEY `fk_city_district1_idx` (`districtDistrictId`),
  CONSTRAINT `fk_city_district1` FOREIGN KEY (`districtDistrictId`) REFERENCES `district` (`districtId`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.city: ~127 rows (approximately)
INSERT INTO `city` (`cityId`, `cityName`, `districtDistrictId`) VALUES
	(1, 'Colombo', 28),
	(2, 'Dehiwala-Mount Lavinia', 28),
	(3, 'Sri Jayawardenepura Kotte', 28),
	(4, 'Moratuwa', 28),
	(5, 'Negombo', 28),
	(6, 'Peliyagoda', 28),
	(7, 'Kelaniya', 28),
	(8, 'Gampaha', 29),
	(9, 'Negombo', 29),
	(10, 'Kelaniya', 29),
	(11, 'Ja-Ela', 29),
	(12, 'Wattala', 29),
	(13, 'Minuwangoda', 29),
	(14, 'Attanagalla', 29),
	(15, 'Kalutara', 30),
	(16, 'Panadura', 30),
	(17, 'Horana', 30),
	(18, 'Beruwala', 30),
	(19, 'Matugama', 30),
	(20, 'Bandaragama', 30),
	(21, 'Aluthgama', 30),
	(22, 'Kandy', 1),
	(23, 'Peradeniya', 1),
	(24, 'Katugastota', 1),
	(25, 'Gampola', 1),
	(26, 'Akurana', 1),
	(27, 'Digana', 1),
	(28, 'Nawalapitiya', 1),
	(29, 'Matale', 2),
	(30, 'Dambulla', 2),
	(31, 'Rattota', 2),
	(32, 'Galewela', 2),
	(33, 'Palapathwela', 2),
	(34, 'Ukuwela', 2),
	(35, 'Nuwara Eliya', 8),
	(36, 'Hatton', 8),
	(37, 'Talawakele', 8),
	(38, 'Ginigathhena', 8),
	(39, 'Ragala', 8),
	(40, 'Lindula', 8),
	(41, 'Galle', 23),
	(42, 'Ambalangoda', 23),
	(43, 'Hikkaduwa', 23),
	(44, 'Karapitiya', 23),
	(45, 'Elpitiya', 23),
	(46, 'Baddegama', 23),
	(47, 'Matara', 25),
	(48, 'Weligama', 25),
	(49, 'Kamburugamuwa', 25),
	(50, 'Hakmana', 25),
	(51, 'Akuressa', 25),
	(52, 'Devinuwara', 25),
	(53, 'Hambantota', 24),
	(54, 'Ambalantota', 24),
	(55, 'Tangalle', 24),
	(56, 'Tissamaharama', 24),
	(57, 'Walasmulla', 24),
	(58, 'Weeraketiya', 24),
	(59, 'Jaffna', 14),
	(60, 'Point Pedro', 14),
	(61, 'Chavakachcheri', 14),
	(62, 'Nallur', 14),
	(63, 'Kilinochchi', 14),
	(64, 'Mannar', 16),
	(65, 'Talaimannar', 16),
	(66, 'Erukkulampiddi', 16),
	(67, 'Vavuniya', 18),
	(68, 'Vavuniya South', 18),
	(69, 'Omanthai', 18),
	(70, 'Mullaitivu', 17),
	(71, 'Puthukkudiyiruppu', 17),
	(72, 'Oddusuddan', 17),
	(73, 'Kilinochchi', 15),
	(74, 'Paranthan', 15),
	(75, 'Pooneryn', 15),
	(76, 'Batticaloa', 10),
	(77, 'Kattankudy', 10),
	(78, 'Valaichchenai', 10),
	(79, 'Eravur', 10),
	(80, 'Chenkalady', 10),
	(81, 'Ampara', 9),
	(82, 'Akkaraipattu', 9),
	(83, 'Kalmunai', 9),
	(84, 'Sammanthurai', 9),
	(85, 'Pottuvil', 9),
	(86, 'Trincomalee', 11),
	(87, 'Kinniya', 11),
	(88, 'Gomarankadawala', 11),
	(89, 'Nilaveli', 11),
	(90, 'Kurunegala', 19),
	(91, 'Kuliyapitiya', 19),
	(92, 'Nikaweratiya', 19),
	(93, 'Polgahawela', 19),
	(94, 'Chilaw', 19),
	(95, 'Puttalam', 20),
	(96, 'Anamaduwa', 20),
	(97, 'Chilaw', 20),
	(98, 'Wennappuwa', 20),
	(99, 'Anuradhapura', 12),
	(100, 'Medawachchiya', 12),
	(101, 'Talawa', 12),
	(102, 'Kekirawa', 12),
	(103, 'Kebithigollewa', 12),
	(104, 'Polonnaruwa', 13),
	(105, 'Kaduruwela', 13),
	(106, 'Hingurakgoda', 13),
	(107, 'Dimbulagala', 13),
	(108, 'Badulla', 26),
	(109, 'Bandarawela', 26),
	(110, 'Haputale', 26),
	(111, 'Diyatalawa', 26),
	(112, 'Ella', 26),
	(113, 'Monaragala', 27),
	(114, 'Wellawaya', 27),
	(115, 'Bibile', 27),
	(116, 'Buttala', 27),
	(117, 'Kataragama', 27),
	(118, 'Ratnapura', 22),
	(119, 'Embilipitiya', 22),
	(120, 'Balangoda', 22),
	(121, 'Kuruwita', 22),
	(122, 'Eheliyagoda', 22),
	(123, 'Kegalle', 21),
	(124, 'Mawanella', 21),
	(125, 'Deraniyagala', 21),
	(126, 'Ruwanwella', 21),
	(127, 'Dehiowita', 21);

-- Dumping structure for table befit-2.color
CREATE TABLE IF NOT EXISTS `color` (
  `clrId` int NOT NULL AUTO_INCREMENT,
  `clrName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`clrId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.color: ~9 rows (approximately)
INSERT INTO `color` (`clrId`, `clrName`) VALUES
	(1, 'red'),
	(2, 'green'),
	(3, 'gray'),
	(4, 'black'),
	(9, 'purple'),
	(10, 'yellow'),
	(11, 'pink'),
	(12, 'orange'),
	(21, 'tan');

-- Dumping structure for table befit-2.condition
CREATE TABLE IF NOT EXISTS `condition` (
  `conditionId` int NOT NULL AUTO_INCREMENT,
  `conditionName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`conditionId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.condition: ~2 rows (approximately)
INSERT INTO `condition` (`conditionId`, `conditionName`) VALUES
	(1, 'Brand New'),
	(2, 'Used');

-- Dumping structure for table befit-2.district
CREATE TABLE IF NOT EXISTS `district` (
  `districtId` int NOT NULL AUTO_INCREMENT,
  `districtName` varchar(45) DEFAULT NULL,
  `provinceProvinceId` int NOT NULL,
  PRIMARY KEY (`districtId`),
  KEY `fk_district_province1_idx` (`provinceProvinceId`),
  CONSTRAINT `fk_district_province1` FOREIGN KEY (`provinceProvinceId`) REFERENCES `province` (`provinceId`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.district: ~25 rows (approximately)
INSERT INTO `district` (`districtId`, `districtName`, `provinceProvinceId`) VALUES
	(1, 'Kandy', 3),
	(2, 'Matale', 3),
	(8, 'Nuwara Eliya', 3),
	(9, 'Ampara', 4),
	(10, 'Batticaloa', 4),
	(11, 'Trincomalee', 4),
	(12, 'Anuradhapura', 5),
	(13, 'Polonnaruwa', 5),
	(14, 'Jaffna', 6),
	(15, 'Kilinochchi', 6),
	(16, 'Mannar', 6),
	(17, 'Mullaitivu', 6),
	(18, 'Vavuniya', 6),
	(19, 'Kurunegala', 7),
	(20, 'Puttalam', 7),
	(21, 'Kegalle', 8),
	(22, 'Ratnapura', 8),
	(23, 'Galle', 9),
	(24, 'Hambantota', 9),
	(25, 'Matara', 9),
	(26, 'Badulla', 10),
	(27, 'Monaragala', 10),
	(28, 'Colombo', 11),
	(29, 'Gampaha', 11),
	(30, 'Kalutara', 11);

-- Dumping structure for table befit-2.feedback
CREATE TABLE IF NOT EXISTS `feedback` (
  `feedId` int NOT NULL AUTO_INCREMENT,
  `stars` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `feed` varchar(250) DEFAULT NULL,
  `productId` int NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  PRIMARY KEY (`feedId`),
  KEY `fk_feedback_product1_idx` (`productId`),
  KEY `fk_feedback_user1_idx` (`userEmail`),
  CONSTRAINT `fk_feedback_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_feedback_user1` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.feedback: ~4 rows (approximately)
INSERT INTO `feedback` (`feedId`, `stars`, `date`, `feed`, `productId`, `userEmail`) VALUES
	(32, 4, '2024-06-27 15:01:52', 'Good Product', 2, 'krishanthan2022.4.4@gmail.com'),
	(33, 4, '2024-06-28 11:10:52', 'Not Bad. Good Material', 113, 'feroj41049@devncie.com'),
	(34, 1, '2024-06-28 11:44:10', 'waste of money', 25, 'feroj41049@devncie.com'),
	(35, 3, '2024-06-28 11:44:36', 'OK', 6, 'feroj41049@devncie.com');

-- Dumping structure for table befit-2.gender
CREATE TABLE IF NOT EXISTS `gender` (
  `genderId` int NOT NULL AUTO_INCREMENT,
  `genderName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`genderId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.gender: ~2 rows (approximately)
INSERT INTO `gender` (`genderId`, `genderName`) VALUES
	(1, 'Male'),
	(2, 'Female');

-- Dumping structure for table befit-2.invoice
CREATE TABLE IF NOT EXISTS `invoice` (
  `invoiceId` int NOT NULL AUTO_INCREMENT,
  `orderId` varchar(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `total` double DEFAULT NULL,
  `userEmail` varchar(100) NOT NULL,
  PRIMARY KEY (`invoiceId`),
  KEY `fk_invoice_user1_idx` (`userEmail`),
  CONSTRAINT `fk_invoice_user1` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.invoice: ~5 rows (approximately)
INSERT INTO `invoice` (`invoiceId`, `orderId`, `date`, `total`, `userEmail`) VALUES
	(33, '667d20e1064da', '2024-06-27 01:51:17', 11705, 'krishanthan2022.4.4@gmail.com'),
	(34, '667e2728d338a', '2024-06-28 08:30:33', 3911, 'yolixac932@joeroc.com'),
	(35, '667e4bfa93725', '2024-06-28 11:07:42', 13331, 'feroj41049@devncie.com'),
	(36, '667e4cffab6e9', '2024-06-28 11:11:47', 2210, 'feroj41049@devncie.com'),
	(37, '667e77dcc1413', '2024-06-28 02:14:43', 6728, 'sarathmunasinghe07@gmail.com');

-- Dumping structure for table befit-2.invoice_has_products
CREATE TABLE IF NOT EXISTS `invoiceHasProducts` (
  `invoiceId` int NOT NULL,
  `productId` int NOT NULL,
  `boughtQty` int NOT NULL,
  `orderStatus` int NOT NULL,
  PRIMARY KEY (`invoiceId`,`productId`),
  KEY `productId` (`productId`),
  KEY `fk_invoice_has_products_orderStatus1_idx` (`orderStatus`),
  CONSTRAINT `fk_invoice_has_products_orderStatus1` FOREIGN KEY (`orderStatus`) REFERENCES `orderStatus` (`orderStatusId`),
  CONSTRAINT `invoice_has_products_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoice` (`invoiceId`),
  CONSTRAINT `invoice_has_products_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.invoice_has_products: ~11 rows (approximately)
INSERT INTO `invoiceHasProducts` (`invoiceId`, `productId`, `boughtQty`, `orderStatus`) VALUES
	(33, 2, 1, 4),
	(33, 4, 1, 1),
	(33, 5, 1, 1),
	(34, 5, 1, 1),
	(34, 112, 1, 1),
	(35, 6, 1, 4),
	(35, 25, 1, 4),
	(35, 113, 1, 4),
	(36, 105, 1, 1),
	(37, 13, 1, 1),
	(37, 30, 1, 1);

-- Dumping structure for table befit-2.model
CREATE TABLE IF NOT EXISTS `model` (
  `modelId` int NOT NULL AUTO_INCREMENT,
  `modelName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.model: ~44 rows (approximately)
INSERT INTO `model` (`modelId`, `modelName`) VALUES
	(1, 'Parallettes Pro'),
	(2, 'Pull-Up Bar Elite'),
	(3, 'Gymnastic Rigs'),
	(4, 'Dip Station'),
	(5, 'Resistance Bands Set'),
	(6, 'Adjustable Kettlebell'),
	(7, 'Ab Roler'),
	(8, 'Push-Up Bars'),
	(9, 'Battle Ropes'),
	(10, 'Speedo Fastskin LZR Racer X'),
	(11, 'Speedo Hydrosense Flowback Swimsuit'),
	(12, 'Speedo Vanquisher 2.0 Goggles'),
	(13, 'Speedo Nemesis Contour Paddle'),
	(14, 'Speedo Teamster Backpack'),
	(15, 'Alien Workshop Spectrum Skateboard'),
	(16, 'Alien Workshop Abduction Complete Skateboard'),
	(17, 'Alien Workshop Visitor Deck'),
	(18, 'Alien Workshop Spectrum Complete'),
	(19, 'Alien Workshop Logo Fade Skateboard'),
	(20, 'Yonex Astrox 99 Pro'),
	(21, 'Yonex Duora 10'),
	(22, 'Yonex Voltric Z-Force II'),
	(23, 'Yonex Nanoray 900'),
	(24, 'Yonex Arcsaber 11'),
	(25, 'Wish Carbon Pro 98'),
	(26, 'Wilson Blade BLX'),
	(27, 'Protech MaxPower'),
	(28, 'Kawasaki Super Light 6800'),
	(29, 'Yang Yang Nano Sensation 700'),
	(30, 'GAN 356 XS'),
	(31, 'Moyu Weilong GTS3'),
	(32, 'Rubik\'s Speed Cube Pro Pack'),
	(33, 'YJ MGC Elite'),
	(34, 'QiYi Valk 3 Elite M'),
	(35, 'MoYu AoLong GT'),
	(36, 'Gan 11 M Pro'),
	(37, 'X-Man Tornado V2'),
	(38, 'Yuxin Little Magic'),
	(39, 'QiYi Warrior W'),
	(40, 'Life Fitness Hammer Strength Power Rack'),
	(41, 'Life Fitness G7 Home Gym'),
	(42, 'FitLine Adjustable Dumbbells'),
	(43, 'Protech Olympic Barbell'),
	(44, 'Cybex Plate Loaded Leg Press');

-- Dumping structure for table befit-2.model_has_brand
CREATE TABLE IF NOT EXISTS `modelHasBrand` (
  `modelModelId` int NOT NULL,
  `brandBrandId` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_model_has_brand_brand1_idx` (`brandBrandId`),
  KEY `fk_model_has_brand_model1_idx` (`modelModelId`),
  CONSTRAINT `fk_model_has_brand_brand1` FOREIGN KEY (`brandBrandId`) REFERENCES `brand` (`brandId`),
  CONSTRAINT `fk_model_has_brand_model1` FOREIGN KEY (`modelModelId`) REFERENCES `model` (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.model_has_brand: ~11 rows (approximately)
INSERT INTO `modelHasBrand` (`modelModelId`, `brandBrandId`, `id`) VALUES
	(7, 24, 1),
	(6, 16, 3),
	(1, 1, 5),
	(1, 2, 6),
	(2, 2, 7),
	(3, 1, 8),
	(1, 4, 9),
	(18, 19, 10),
	(19, 20, 11),
	(6, 24, 12),
	(11, 9, 13);

-- Dumping structure for table befit-2.orderStatus
CREATE TABLE IF NOT EXISTS `orderStatus` (
  `orderStatusId` int NOT NULL AUTO_INCREMENT,
  `orderStatusName` varchar(25) NOT NULL,
  PRIMARY KEY (`orderStatusId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.orderStatus: ~4 rows (approximately)
INSERT INTO `orderStatus` (`orderStatusId`, `orderStatusName`) VALUES
	(1, 'order placed'),
	(2, 'order success'),
	(3, 'shipped'),
	(4, 'delivery success');

-- Dumping structure for table befit-2.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` double DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `description` text,
  `title` varchar(100) DEFAULT NULL,
  `datetimeAdded` datetime DEFAULT NULL,
  `deliveryFeeColombo` double DEFAULT NULL,
  `deliveryFeeOther` double DEFAULT NULL,
  `categoryCatId` int NOT NULL,
  `modelHasBrandId` int NOT NULL,
  `conditionConditionId` int NOT NULL,
  `statusStatusId` int NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_category1_idx` (`categoryCatId`),
  KEY `fk_product_model_has_brand1_idx` (`modelHasBrandId`),
  KEY `fk_product_condition1_idx` (`conditionConditionId`),
  KEY `fk_product_status1_idx` (`statusStatusId`),
  KEY `fk_product_user1_idx` (`userEmail`),
  CONSTRAINT `fk_product_category1` FOREIGN KEY (`categoryCatId`) REFERENCES `category` (`catId`),
  CONSTRAINT `fk_product_condition1` FOREIGN KEY (`conditionConditionId`) REFERENCES `condition` (`conditionId`),
  CONSTRAINT `fk_product_model_has_brand1` FOREIGN KEY (`modelHasBrandId`) REFERENCES `modelHasBrand` (`id`),
  CONSTRAINT `fk_product_status1` FOREIGN KEY (`statusStatusId`) REFERENCES `status` (`statusId`),
  CONSTRAINT `fk_product_user1` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.product: ~34 rows (approximately)
INSERT INTO `product` (`id`, `price`, `qty`, `description`, `title`, `datetimeAdded`, `deliveryFeeColombo`, `deliveryFeeOther`, `categoryCatId`, `modelHasBrandId`, `conditionConditionId`, `statusStatusId`, `userEmail`) VALUES
	(1, 2598, 8, 'dskjddskjdsk ljdkljdkjldfkj ldsflkjsdlkjsdlkjdslkjd slkjdlkjdslkjdsdkl jdfffffffffgfd lkjlfjlkdjgl kjgelrjrteroreojt gkldjldfjflkgj dfldfjlkjflkflgk jdfklfdjdfjflkjfg jfjgkfjglkfdjlkg jdfkgjfkertoretre toriutotureoitureoitr uotiuroi', 'Purple Resistance Band', '2024-02-24 11:20:23', 189, 254, 1, 1, 2, 2, 'sarathmunasinghe07@gmail.com'),
	(2, 3999, 497, 'A versatile tool for bodyweight exercises and resistance training, suitable for all fitness levels.', 'Resistance Bands Set', '2024-04-07 09:00:00', 500, 876, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(3, 4999, 29, 'Take your calisthenics training to the next level with our very own 18 inch long wooden parallettes. ', 'Parallettes', '2024-04-07 09:05:00', 500, 345, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(4, 2999, 17, 'HIGHLY FLEXIBLE, DURABLE TO USE AND WITH REMOVABLE WEIGHTS TO SCALE TO YOUR TRAINING LEVELS AND GOALS. AVAILABLE IN 35LB AND 28LB.', 'Weight Vest', '2024-04-07 09:10:00', 500, 456, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(5, 2499, 36, 'Perfect for improving core strength and stability, suitable for a variety of exercises.', 'Suspension Trainer Kit', '2024-04-07 09:15:00', 500, 876, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(6, 3499, 24, 'Great for upper body workouts, helps tone and strengthen arms, chest, and shoulders.', 'Push-Up Bars', '2024-04-07 09:20:00', 500, 376, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(7, 1999, 35, 'Designed for enhancing grip strength and forearm muscles, suitable for pull-up and hanging exercises.', 'Pull-Up Bars', '2024-04-07 09:25:00', 500, 476, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(8, 5999, 15, 'A versatile tool for bodyweight exercises and resistance training, helps improve overall fitness.', 'Dip Bar', '2024-04-07 09:30:00', 500, 345, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(9, 4499, 10, 'Perfect for core strengthening exercises, helps improve balance and stability.', 'Exercise Ball', '2024-04-07 09:35:00', 143, 353, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(10, 3999, 5, 'A versatile tool for bodyweight exercises and resistance training, suitable for home and gym use.', 'Multi-Grip Pull-Up Bar', '2024-04-07 09:40:00', 500, 767, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(11, 6999, 8, 'Designed for strengthening upper body muscles, suitable for various pulling exercises.', 'Doorway Pull-Up Bar', '2024-04-07 09:45:00', 500, 234, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(12, 6999, 8, 'Push up Stand Parallel Bars Parallettes 12x24 inch Non-Slip with Integrated Knurling Grip - Supports Strength HIIT Yoga ROM Gymnastics Body Conditioning Exercise Workouts', 'Push up Stand Parallel Bars', '2024-04-07 09:45:00', 500, 276, 1, 1, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(13, 3999, 3, 'Amazon Basics Rubber Encased Exercise & Fitness Hex Dumbbell, Single, Hand Weight For Strength Training', 'Hex Dumbbell', '2024-02-24 11:20:23', 189, 654, 2, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(14, 2359, 5, 'Amazon Basics Rubber Encased Exercise & Fitness Hex Dumbbell, Single, Hand Weight For Strength Training', 'Dumbbells Rack', '2024-02-24 11:20:23', 139, 354, 2, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(15, 5479, 6, 'Amazon Basics Rubber Encased Exercise & Fitness Hex Dumbbell, Single, Hand Weight For Strength Training', 'Adjustable Dumbles Set', '2024-02-24 11:20:23', 100, 231, 2, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(16, 5469, 6, 'Adjustable Weight Bench, Bench Press Rack with Squat Rack, Leg Exercises Preacher Curl Rack for Home Gym Full Body Workout', 'Bench Press Rack with Squat Rack', '2024-02-24 11:20:23', 150, 456, 2, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(17, 2139, 10, 'Adjustable Soft Wrist Support Bracers Weight Lifting Gym Sports Wristband Carpal Protector Breathable Wrap Wristbands Band Strap', 'Wristband Band Strap', '2024-02-24 11:20:23', 109, 567, 2, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(18, 3258, 10, 'Adjustable Soft Wrist Support Bracers Weight Lifting Gym Sports Wristband Carpal Protector Breathable Wrap Wristbands Band Strap', 'Wrist Support Strap', '2024-02-24 11:20:23', 100, 454, 2, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(19, 2001, 10, 'Magnetic/Water Rowing Machines for Home, Compact and Saves Space - Vertical/Folding Storage, 350 LB Weight Capacity with Bluetooth App Supported, Tablet Holder and Comfortable Seat Cushion', 'Magnetic/Water Rowing machine', '2024-02-24 11:20:23', 189, 234, 2, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(20, 4359, 10, 'Battle Rope Battle Ropes for Exercise Workout Rope Exercise Rope Battle Ropes for Home Gym Heavy Ropes for Exercise Training Ropes for Working Out Weighted Workout Rope Exercise Workout Equipment', 'Battle Rope', '2024-02-24 11:20:23', 150, 678, 2, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(21, 3249, 10, 'Textured EVA foam creates a non-slick surface Side finger scallops promote proper hand position Underside finger grooves for easy-gripping', 'Speedo Swim Training Kickboard Adult', '2024-02-24 11:20:23', 189, 764, 3, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(22, 2159, 0, 'Inner micro grid texture provides more comfort and stretchy silicone won\'t snag or pull hair Contoured shape reduces drag for outstanding hydrodynamic performance', 'Speedo Swim Cap Silicone Elastomeric', '2024-02-24 11:20:23', 128, 265, 3, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(23, 599, 0, 'High quality adult goggles for swimming lovers. Elastic nose bridge for perfect adaptability to a large number of facial proﬁles. Slightly inclined lenses to increase field of view. Lenses are shatterproof, anti-fog treated and offer UV ray protection.', 'Swimming Goggles', '2024-02-24 11:20:23', 129, 376, 3, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(24, 2359, 10, 'Badminton Rackets Set of 6 for Outdoor Backyard Games, Including 6 Rackets, 6 Nylon Badminton Shuttlecocks, Lightweight Badminton Racquets', 'Badminton Racquets', '2024-02-24 11:20:23', 199, 564, 1, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(25, 7659, 8, 'Badminton Birdies Shuttlecocks Goose Feather Nylon Pack of 12, Stable and Sturdy High Speed Shuttles for Indoor and Outdoor Training Sports', 'Badminton Shuttlecock', '2024-02-24 11:20:23', 200, 576, 1, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(26, 3459, 10, 'WhiteFang Skateboards for Beginners, Complete Skateboard 31 x 7.88, 7 Layer Canadian Maple Double Kick Concave Standard and Tricks Skateboards ', 'Whitefang Skateboards', '2024-02-24 11:20:23', 289, 467, 5, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(27, 2999, 10, 'Minecraft 31 inch Skateboard, 9-ply Maple Deck Skate Board for Cruising, Carving, Tricks and Downhill', 'Minecraft 31 inch Skateboard', '2024-02-24 11:20:23', 180, 163, 5, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(28, 1999, 10, 'Magneto Complete Skateboard | 27.5" x 7.5" | 6-Layer Canadian Maple Double Kick Concave Deck | Kids Skateboard Cruiser Skateboard | Skateboard for Beginners, Teens & Adults', 'Magneto Skateboard', '2024-02-24 11:20:23', 250, 123, 5, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(29, 2500, 44, 'Speed Cube 3x3x3 Stickerless with Cube Tutorial - Turning Speedly Smoothly Magic Cubes 3x3 Puzzle Game Brain Toy for Kids and Adult', 'Rubik Cube 3x3', '2024-02-24 11:20:23', 250, 340, 6, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(30, 1599, 9, 'Speed Cube 4x4x4 Stickerless with Cube Tutorial - Turning Speedly Smoothly Magic Cubes 4x4 Puzzle Game Brain Toy for Kids and Adult', 'Rubik Cube 4x4', '2024-02-24 11:20:23', 189, 476, 6, 1, 2, 1, 'sarathmunasinghe07@gmail.com'),
	(105, 2000, 99, 'GOTRAX Gotrax Edge Hoverboard for Kids Adults, 6.5" Tires 6.2mph & 2.5 Miles Self Balancing ', 'Hoverboard Black', '2024-06-24 14:54:46', 200, 210, 5, 10, 1, 1, 'sarathmunasinghe07@gmail.com'),
	(111, 2339, 10, 'product details1', 'Product1', '2024-06-28 08:17:38', 202, 201, 5, 11, 1, 1, 'lifaso6961@devncie.com'),
	(112, 334, 19, 'Product Details 4', 'KettleBell New Model (Rubber)', '2024-06-28 08:25:22', 202, 202, 2, 12, 2, 1, 'yolixac932@joeroc.com'),
	(113, 1019, 19, 'product Details 5', 'Swimming Shirt', '2024-06-28 08:35:28', 210, 202, 3, 13, 1, 1, 'yilib46895@cutxsew.com');

-- Dumping structure for table befit-2.product_has_color
CREATE TABLE IF NOT EXISTS `productHasColor` (
  `productId` int NOT NULL,
  `colorClrId` int NOT NULL,
  KEY `fk_product_has_color_color1_idx` (`colorClrId`),
  KEY `fk_product_has_color_product1_idx` (`productId`),
  CONSTRAINT `fk_product_has_color_color1` FOREIGN KEY (`colorClrId`) REFERENCES `color` (`clrId`),
  CONSTRAINT `fk_product_has_color_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.product_has_color: ~34 rows (approximately)
INSERT INTO `productHasColor` (`productId`, `colorClrId`) VALUES
	(1, 4),
	(2, 4),
	(26, 4),
	(27, 4),
	(28, 4),
	(29, 4),
	(30, 4),
	(3, 4),
	(4, 3),
	(5, 4),
	(6, 4),
	(7, 4),
	(8, 4),
	(9, 4),
	(10, 4),
	(11, 4),
	(12, 4),
	(13, 4),
	(14, 4),
	(15, 4),
	(16, 4),
	(17, 4),
	(18, 4),
	(19, 4),
	(20, 4),
	(21, 4),
	(22, 4),
	(23, 4),
	(24, 4),
	(25, 4),
	(105, 4),
	(111, 1),
	(112, 10),
	(113, 4);

-- Dumping structure for table befit-2.product_img
CREATE TABLE IF NOT EXISTS `productImg` (
  `imgPath` varchar(100) NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`imgPath`),
  KEY `fk_product_img_product1_idx` (`productId`),
  CONSTRAINT `fk_product_img_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.product_img: ~36 rows (approximately)
INSERT INTO `productImg` (`imgPath`, `productId`) VALUES
	('./public/images/product_images/product1.jpeg', 1),
	('./public/images/product_images/product2.jpeg', 2),
	('./public/images/product_images/product3.jpeg', 3),
	('./public/images/product_images/product4.jpeg', 4),
	('./public/images/product_images/product5.jpeg', 5),
	('./public/images/product_images/product6.jpeg', 6),
	('./public/images/product_images/product7.jpeg', 7),
	('./public/images/product_images/product8.jpeg', 8),
	('./public/images/product_images/product9.jpeg', 9),
	('./public/images/product_images/product10.jpeg', 10),
	('./public/images/product_images/product11.jpeg', 11),
	('./public/images/product_images/product12.jpeg', 12),
	('./public/images/product_images/product13.jpeg', 13),
	('./public/images/product_images/product14.jpeg', 14),
	('./public/images/product_images/product15.jpeg', 15),
	('./public/images/product_images/product16.jpeg', 16),
	('./public/images/product_images/product17.jpeg', 17),
	('./public/images/product_images/product18.jpeg', 18),
	('./public/images/product_images/product19.jpeg', 19),
	('./public/images/product_images/product20.jpeg', 20),
	('./public/images/product_images/product21.jpeg', 21),
	('./public/images/product_images/product22.jpeg', 22),
	('./public/images/product_images/product23.jpeg', 23),
	('./public/images/product_images/product24.jpeg', 24),
	('./public/images/product_images/product25.jpeg', 25),
	('./public/images/product_images/product26.jpeg', 26),
	('./public/images/product_images/product27.jpeg', 27),
	('./public/images/product_images/product28.jpeg', 28),
	('./public/images/product_images/product29.jpeg', 29),
	('./public/images/product_images/product30.jpeg', 30),
	('../public/images/product_images/Hoverboard Black066793b5e2363d.jpeg', 105),
	('../public/images/product_images/Hoverboard Black166793b5e2537d.jpeg', 105),
	('../public/images/product_images/Hoverboard Black266793b5e26548.jpeg', 105),
	('../public/images/product_images/Product10667e244a71558.jpeg', 111),
	('../public/images/product_images/KettleBell New Model (Rubber)0667e261a5a3d8.jpeg', 112),
	('../public/images/product_images/Swimming Shirt0667e2878a813f.jpeg', 113);

-- Dumping structure for table befit-2.profile_img
CREATE TABLE IF NOT EXISTS `profileImg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(100) DEFAULT NULL,
  `userEmail` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_profile_img_user1_idx` (`userEmail`),
  CONSTRAINT `fk_profile_img_user1` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.profile_img: ~2 rows (approximately)
INSERT INTO `profileImg` (`id`, `path`, `userEmail`) VALUES
	(3, '../resources/profile_images/Sarathf_667e5b9caf806.jpeg', 'sarathmunasinghe07@gmail.com'),
	(7, '../resources/profile_images/UserFirstName_66793bd5555b2.jpeg', 'email@fkdlk.com');

-- Dumping structure for table befit-2.province
CREATE TABLE IF NOT EXISTS `province` (
  `provinceId` int NOT NULL AUTO_INCREMENT,
  `provinceName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`provinceId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.province: ~9 rows (approximately)
INSERT INTO `province` (`provinceId`, `provinceName`) VALUES
	(3, 'Central Province'),
	(4, 'Eastern Province'),
	(5, 'North Central Province'),
	(6, 'Northern Province'),
	(7, 'North Western Province'),
	(8, 'Sabaragamuwa Province'),
	(9, 'Southern Province'),
	(10, 'Uva Province'),
	(11, 'Western Province');

-- Dumping structure for table befit-2.recent
CREATE TABLE IF NOT EXISTS `recent` (
  `rId` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  PRIMARY KEY (`rId`),
  KEY `fk_recent_product1_idx` (`productId`),
  KEY `fk_recent_user1_idx` (`userEmail`),
  CONSTRAINT `fk_recent_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_recent_user1` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.recent: ~0 rows (approximately)

-- Dumping structure for table befit-2.status
CREATE TABLE IF NOT EXISTS `status` (
  `statusId` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`statusId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.status: ~2 rows (approximately)
INSERT INTO `status` (`statusId`, `status`) VALUES
	(1, 'Active'),
	(2, 'Inactive');

-- Dumping structure for table befit-2.user
CREATE TABLE IF NOT EXISTS `user` (
  `fname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `lname` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `mobile` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `joinedDate` datetime NOT NULL,
  `verificationCode` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `genderGenderId` int DEFAULT NULL,
  `statusStatusId` int NOT NULL,
  PRIMARY KEY (`email`),
  KEY `fk_user_genderIdx` (`genderGenderId`) USING BTREE,
  KEY `fk_user_status1_idx` (`statusStatusId`) USING BTREE,
  CONSTRAINT `fk_user_gender` FOREIGN KEY (`genderGenderId`) REFERENCES `gender` (`genderId`),
  CONSTRAINT `fk_user_status1` FOREIGN KEY (`statusStatusId`) REFERENCES `status` (`statusId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.user: ~8 rows (approximately)
INSERT INTO `user` (`fname`, `lname`, `email`, `password`, `mobile`, `joinedDate`, `verificationCode`, `genderGenderId`, `statusStatusId`) VALUES
	(NULL, NULL, 'cohicis586@coloruz.com', 'Abcd!234', NULL, '2024-09-08 19:09:35', '8098klj', NULL, 1),
	('fkdir', 'dir', 'email@fkdlk.com', 'Abcd!234', '', '2024-02-05 14:52:12', 'verified', 1, 1),
	('UserFirstName4', 'UserLastName4', 'feroj41049@devncie.com', 'Abcd!234', '0758233606', '2024-06-28 10:49:33', NULL, 1, 1),
	('UserFirstName', 'UserSecondName', 'krishanthan2022.4.4@gmail.com', 'Abcd!234@', '0758233603', '2024-01-24 10:50:40', '667d457878d6c', 1, 1),
	('UserFirstName1', 'UserSecondName2', 'lifaso6961@devncie.com', 'Abcd!234', '0758233604', '2024-03-28 07:58:08', NULL, 1, 1),
	('Sarathf', 'Munasinghe', 'sarathmunasinghe07@gmail.com', 'Abcd!234', '0715780902', '2024-04-22 22:24:04', '6678fbc4976ab', 1, 1),
	(NULL, NULL, 'wohiga2963@joeroc.com', 'Abcd!234', NULL, '2024-06-28 12:03:42', NULL, NULL, 1),
	(NULL, NULL, 'yilib46895@cutxsew.com', 'Abcd!234', NULL, '2024-06-28 08:32:04', NULL, NULL, 1),
	('UserFirstName3', 'UserFirstName3', 'yolixac932@joeroc.com', 'Abcd!234!', '0758233604', '2024-05-28 08:20:22', '667e24f75656f', 1, 1);

-- Dumping structure for table befit-2.userHasAddress
CREATE TABLE IF NOT EXISTS `userHasAddress` (
  `userEmail` varchar(100) NOT NULL,
  `cityCityId` int NOT NULL,
  `addressId` int NOT NULL AUTO_INCREMENT,
  `line1` text,
  `line2` text,
  `postalCode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`addressId`),
  KEY `fk_user_has_city_city1_idx` (`cityCityId`),
  KEY `fk_user_has_city_user1_idx` (`userEmail`),
  CONSTRAINT `fk_user_has_city_city1` FOREIGN KEY (`cityCityId`) REFERENCES `city` (`cityId`),
  CONSTRAINT `fk_user_has_city_user1` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.userHasAddress: ~7 rows (approximately)
INSERT INTO `userHasAddress` (`userEmail`, `cityCityId`, `addressId`, `line1`, `line2`, `postalCode`) VALUES
	('email@fkdlk.com', 1, 3, 'Temple Street', 'Main Road', '445'),
	('sarathmunasinghe07@gmail.com', 23, 4, 'mahasen mawatha', 'Ihalayagoda,Imbulgoda', '12321'),
	('email@fkdlk.com', 105, 6, 'AddressLine1', 'AddressLine2', '1102'),
	('krishanthan2022.4.4@gmail.com', 8, 7, 'AddressLine1', 'AddressLine2', '1101'),
	('lifaso6961@devncie.com', 100, 8, 'AddressLine2', 'AddressLine2', '1103'),
	('yolixac932@joeroc.com', 126, 9, 'AddressLine3', 'AddressLine3', '2001'),
	('feroj41049@devncie.com', 74, 10, 'AddressLine4', 'AddressLine4', '1103');

-- Dumping structure for table befit-2.wishlist
CREATE TABLE IF NOT EXISTS `wishlist` (
  `wId` int NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(100) NOT NULL,
  `productId` int NOT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`wId`) USING BTREE,
  KEY `fk_watchlist_user1_idx` (`userEmail`),
  KEY `fk_watchlist_product1_idx` (`productId`),
  CONSTRAINT `fk_watchlist_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_watchlist_user1` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table befit-2.wishlist: ~8 rows (approximately)
INSERT INTO `wishlist` (`wId`, `userEmail`, `productId`, `qty`) VALUES
	(74, 'krishanthan2022.4.4@gmail.com', 3, 1),
	(75, 'krishanthan2022.4.4@gmail.com', 4, 1),
	(76, 'krishanthan2022.4.4@gmail.com', 5, 1),
	(77, 'lifaso6961@devncie.com', 105, 1),
	(78, 'yolixac932@joeroc.com', 5, 1),
	(79, 'yolixac932@joeroc.com', 112, 1),
	(80, 'yilib46895@cutxsew.com', 111, 1),
	(81, 'feroj41049@devncie.com', 113, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
