-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 18, 2017 at 05:39 PM
-- Server version: 5.7.13
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_authors`
--

CREATE TABLE IF NOT EXISTS `bookshop_authors` (
  `id` int(11) NOT NULL,
  `authorsName` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_authors`
--

INSERT INTO `bookshop_authors` (`id`, `authorsName`) VALUES
(3, 'Bob Lang'),
(2, 'Gadre Rao'),
(1, 'Jen Wilde'),
(4, 'Jessica Gray'),
(5, 'Kristin Hannah'),
(6, 'Mark Martin'),
(18, 'New R'),
(0, 'No author'),
(12, 'Papa Karlo'),
(7, 'Pratibha Nath'),
(8, 'Sandy Carey'),
(9, 'Thomas Hobbes'),
(10, 'Vikas Bhushan'),
(11, 'William Martin');

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_books`
--

CREATE TABLE IF NOT EXISTS `bookshop_books` (
  `id` int(11) NOT NULL,
  `booksName` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `pubyear` int(4) NOT NULL,
  `price` int(10) NOT NULL,
  `id_discount` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_books`
--

INSERT INTO `bookshop_books` (`id`, `booksName`, `description`, `pubyear`, `price`, `id_discount`) VALUES
(1, 'Book1', 'Fuul desc1', 1900, 200, 4),
(2, 'Book2', 'Full desc2', 1990, 250, 1),
(3, 'Book3', 'Full desc3', 2000, 300, 5),
(4, 'Book4', 'Full desc4', 2010, 350, 3),
(5, 'Book5', 'Full desc5', 2015, 150, 1),
(6, 'Book6', 'Full desc6', 2020, 50, 1),
(7, 'AllinAll', 'Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! ', 1800, 600, 5),
(8, 'New Book Name', 'Post description', 1999, 999, 1),
(9, 'Post Book trans', 'Post description trans', 2001, 888, 1),
(10, 'Post Book trans', 'Post description trans', 2002, 888, 1),
(11, 'Post Book trans', 'Post description trans', 2003, 888, 1),
(12, 'Another Post Book 2', 'pumpurum description', 2002, 666, 5);

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_books_history`
--

CREATE TABLE IF NOT EXISTS `bookshop_books_history` (
  `id_book` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `authors` varchar(200) NOT NULL,
  `genres` varchar(200) NOT NULL,
  `pubyear` int(4) NOT NULL,
  `description` text NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_books_to_authors`
--

CREATE TABLE IF NOT EXISTS `bookshop_books_to_authors` (
  `id_book` int(11) NOT NULL,
  `id_author` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_books_to_authors`
--

INSERT INTO `bookshop_books_to_authors` (`id_book`, `id_author`) VALUES
(1, 3),
(1, 2),
(2, 1),
(3, 4),
(4, 5),
(4, 6),
(5, 7),
(5, 8),
(5, 9),
(6, 10),
(6, 11),
(6, 0),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(9, 3),
(9, 4),
(10, 3),
(10, 4),
(11, 3),
(11, 4),
(12, 3),
(12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_books_to_genres`
--

CREATE TABLE IF NOT EXISTS `bookshop_books_to_genres` (
  `id_book` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_books_to_genres`
--

INSERT INTO `bookshop_books_to_genres` (`id_book`, `id_genre`) VALUES
(1, 2),
(2, 1),
(3, 8),
(4, 7),
(5, 4),
(6, 5),
(6, 0),
(1, 3),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(8, 3),
(8, 4),
(8, 2),
(9, 3),
(9, 2),
(10, 3),
(10, 2),
(11, 3),
(11, 2),
(12, 3),
(12, 2);

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_cart`
--

CREATE TABLE IF NOT EXISTS `bookshop_cart` (
  `id_user` int(11) NOT NULL,
  `id_book` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_cart`
--

INSERT INTO `bookshop_cart` (`id_user`, `id_book`, `count`) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(1, 4, 8),
(1, 5, 1),
(1, 6, 1),
(1, 8, 2),
(1, 9, 2),
(1, 11, 3),
(1, 10, 6),
(1, 7, 6);

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_discounts`
--

CREATE TABLE IF NOT EXISTS `bookshop_discounts` (
  `id` int(11) NOT NULL,
  `discountsName` varchar(20) NOT NULL,
  `percent` int(3) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_discounts`
--

INSERT INTO `bookshop_discounts` (`id`, `discountsName`, `percent`) VALUES
(1, 'Empty', 0),
(3, 'The third part', 30),
(4, 'Ten', 10),
(5, 'Half', 50);

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_genres`
--

CREATE TABLE IF NOT EXISTS `bookshop_genres` (
  `id` int(11) NOT NULL,
  `genresName` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_genres`
--

INSERT INTO `bookshop_genres` (`id`, `genresName`) VALUES
(2, 'Adventure'),
(1, 'Drama'),
(8, 'Fantasy'),
(7, 'History'),
(4, 'Mystery'),
(0, 'No genre'),
(3, 'Romance'),
(6, 'Science'),
(5, 'Travel');

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_info_order`
--

CREATE TABLE IF NOT EXISTS `bookshop_info_order` (
  `id_order` int(11) NOT NULL,
  `id_book` int(11) NOT NULL,
  `bookDiscount` int(3) NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL,
  `bookTotalPrice` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_info_order`
--

INSERT INTO `bookshop_info_order` (`id_order`, `id_book`, `bookDiscount`, `count`, `bookTotalPrice`) VALUES
(4, 1, 10, 1, 180),
(4, 2, 0, 1, 250),
(4, 4, 30, 2, 490),
(4, 5, 0, 5, 750),
(4, 6, 0, 1, 50),
(5, 1, 10, 1, 180),
(5, 2, 0, 1, 250),
(5, 4, 30, 2, 490),
(5, 5, 0, 5, 750),
(5, 6, 0, 1, 50),
(6, 1, 10, 1, 180),
(6, 2, 0, 1, 250),
(6, 4, 30, 2, 490),
(6, 5, 0, 5, 750),
(6, 6, 0, 1, 50),
(7, 1, 10, 1, 180),
(7, 2, 0, 1, 250),
(7, 4, 30, 2, 490),
(7, 5, 0, 5, 750),
(7, 6, 0, 1, 50),
(8, 2, 0, 1, 250),
(8, 6, 0, 23, 1150),
(8, 4, 30, 3, 735),
(8, 3, 50, 15, 2250),
(9, 2, 0, 23, 5750),
(9, 4, 30, 25, 6125),
(9, 3, 50, 24, 3600);

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_orders`
--

CREATE TABLE IF NOT EXISTS `bookshop_orders` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `clientDiscount` int(3) NOT NULL DEFAULT '0',
  `id_payment` int(11) NOT NULL,
  `orderTotalPrice` int(10) NOT NULL,
  `time` int(11) NOT NULL,
  `id_status` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_orders`
--

INSERT INTO `bookshop_orders` (`id`, `id_user`, `clientDiscount`, `id_payment`, `orderTotalPrice`, `time`, `id_status`) VALUES
(1, 1, 10, 3, 1548, 1507801276, 1),
(2, 1, 10, 3, 1548, 1507801317, 4),
(3, 1, 10, 3, 1548, 1507801346, 4),
(4, 1, 10, 3, 1548, 1507802047, 4),
(5, 1, 10, 3, 1548, 1507802318, 4),
(6, 1, 10, 3, 1548, 1507802888, 4),
(7, 1, 10, 3, 1548, 1507802942, 4),
(8, 1, 10, 3, 3947, 1507806668, 4),
(9, 1, 10, 3, 13928, 1507807133, 4);

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_payment`
--

CREATE TABLE IF NOT EXISTS `bookshop_payment` (
  `id` int(11) NOT NULL,
  `paymentName` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_payment`
--

INSERT INTO `bookshop_payment` (`id`, `paymentName`) VALUES
(2, 'Card'),
(3, 'Cash'),
(1, 'PayPal');

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_status`
--

CREATE TABLE IF NOT EXISTS `bookshop_status` (
  `id` int(11) NOT NULL,
  `statusName` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_status`
--

INSERT INTO `bookshop_status` (`id`, `statusName`) VALUES
(1, 'Done'),
(5, 'In process'),
(4, 'Not ready');

-- --------------------------------------------------------

--
-- Table structure for table `bookshop_users`
--

CREATE TABLE IF NOT EXISTS `bookshop_users` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `phone` int(20) NOT NULL,
  `id_discount` int(11) DEFAULT NULL,
  `hash` varchar(32) NOT NULL DEFAULT '0',
  `lifetime` varchar(11) NOT NULL DEFAULT '0',
  `admin` int(1) NOT NULL DEFAULT '0',
  `active` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookshop_users`
--

INSERT INTO `bookshop_users` (`id`, `login`, `password`, `phone`, `id_discount`, `hash`, `lifetime`, `admin`, `active`) VALUES
(1, 'Lambur', '144aa3c5d69a3db8c6b236ea29f0d176', 973289702, 4, '32cd2766b48049029bd8846a1f6e795a', '1508337469', 1, 1),
(2, 'Newuser', '144aa3c5d69a3db8c6b236ea29f0d176', 973289702, 3, 'b2136296e206669afd1689255c4090c5', '1507980840', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookshop_authors`
--
ALTER TABLE `bookshop_authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`authorsName`);

--
-- Indexes for table `bookshop_books`
--
ALTER TABLE `bookshop_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookshop_books_fk0` (`id_discount`);

--
-- Indexes for table `bookshop_books_to_authors`
--
ALTER TABLE `bookshop_books_to_authors`
  ADD KEY `bookshop_books_to_authors_fk0` (`id_book`),
  ADD KEY `bookshop_books_to_authors_fk1` (`id_author`);

--
-- Indexes for table `bookshop_books_to_genres`
--
ALTER TABLE `bookshop_books_to_genres`
  ADD KEY `bookshop_books_to_genres_fk0` (`id_book`),
  ADD KEY `bookshop_books_to_genres_fk1` (`id_genre`);

--
-- Indexes for table `bookshop_cart`
--
ALTER TABLE `bookshop_cart`
  ADD KEY `bookshop_cart_fk0` (`id_user`),
  ADD KEY `bookshop_cart_fk1` (`id_book`);

--
-- Indexes for table `bookshop_discounts`
--
ALTER TABLE `bookshop_discounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`discountsName`);

--
-- Indexes for table `bookshop_genres`
--
ALTER TABLE `bookshop_genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`genresName`);

--
-- Indexes for table `bookshop_info_order`
--
ALTER TABLE `bookshop_info_order`
  ADD KEY `bookshop_info_order_fk0` (`id_order`),
  ADD KEY `bookshop_info_order_fk1` (`id_book`);

--
-- Indexes for table `bookshop_orders`
--
ALTER TABLE `bookshop_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookshop_orders_fk0` (`id_user`),
  ADD KEY `bookshop_orders_fk1` (`id_payment`),
  ADD KEY `bookshop_orders_fk2` (`id_status`);

--
-- Indexes for table `bookshop_payment`
--
ALTER TABLE `bookshop_payment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`paymentName`);

--
-- Indexes for table `bookshop_status`
--
ALTER TABLE `bookshop_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`statusName`);

--
-- Indexes for table `bookshop_users`
--
ALTER TABLE `bookshop_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `bookshop_users_fk0` (`id_discount`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookshop_authors`
--
ALTER TABLE `bookshop_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `bookshop_books`
--
ALTER TABLE `bookshop_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `bookshop_discounts`
--
ALTER TABLE `bookshop_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `bookshop_genres`
--
ALTER TABLE `bookshop_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `bookshop_orders`
--
ALTER TABLE `bookshop_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `bookshop_payment`
--
ALTER TABLE `bookshop_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `bookshop_status`
--
ALTER TABLE `bookshop_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `bookshop_users`
--
ALTER TABLE `bookshop_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookshop_books`
--
ALTER TABLE `bookshop_books`
  ADD CONSTRAINT `bookshop_books_fk0` FOREIGN KEY (`id_discount`) REFERENCES `bookshop_discounts` (`id`);

--
-- Constraints for table `bookshop_books_to_authors`
--
ALTER TABLE `bookshop_books_to_authors`
  ADD CONSTRAINT `bookshop_books_to_authors_fk0` FOREIGN KEY (`id_book`) REFERENCES `bookshop_books` (`id`),
  ADD CONSTRAINT `bookshop_books_to_authors_fk1` FOREIGN KEY (`id_author`) REFERENCES `bookshop_authors` (`id`);

--
-- Constraints for table `bookshop_books_to_genres`
--
ALTER TABLE `bookshop_books_to_genres`
  ADD CONSTRAINT `bookshop_books_to_genres_fk0` FOREIGN KEY (`id_book`) REFERENCES `bookshop_books` (`id`),
  ADD CONSTRAINT `bookshop_books_to_genres_fk1` FOREIGN KEY (`id_genre`) REFERENCES `bookshop_genres` (`id`);

--
-- Constraints for table `bookshop_cart`
--
ALTER TABLE `bookshop_cart`
  ADD CONSTRAINT `bookshop_cart_fk0` FOREIGN KEY (`id_user`) REFERENCES `bookshop_users` (`id`),
  ADD CONSTRAINT `bookshop_cart_fk1` FOREIGN KEY (`id_book`) REFERENCES `bookshop_books` (`id`);

--
-- Constraints for table `bookshop_info_order`
--
ALTER TABLE `bookshop_info_order`
  ADD CONSTRAINT `bookshop_info_order_fk0` FOREIGN KEY (`id_order`) REFERENCES `bookshop_orders` (`id`),
  ADD CONSTRAINT `bookshop_info_order_fk1` FOREIGN KEY (`id_book`) REFERENCES `bookshop_books` (`id`);

--
-- Constraints for table `bookshop_orders`
--
ALTER TABLE `bookshop_orders`
  ADD CONSTRAINT `bookshop_orders_fk0` FOREIGN KEY (`id_user`) REFERENCES `bookshop_users` (`id`),
  ADD CONSTRAINT `bookshop_orders_fk1` FOREIGN KEY (`id_payment`) REFERENCES `bookshop_payment` (`id`),
  ADD CONSTRAINT `bookshop_orders_fk2` FOREIGN KEY (`id_status`) REFERENCES `bookshop_status` (`id`);

--
-- Constraints for table `bookshop_users`
--
ALTER TABLE `bookshop_users`
  ADD CONSTRAINT `bookshop_users_fk0` FOREIGN KEY (`id_discount`) REFERENCES `bookshop_discounts` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
