-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 27 2017 г., 14:51
-- Версия сервера: 5.7.13
-- Версия PHP: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test_book_shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_authors`
--

CREATE TABLE IF NOT EXISTS `bookshop_authors` (
  `id` int(11) NOT NULL,
  `authorsName` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_authors`
--

INSERT INTO `bookshop_authors` (`id`, `authorsName`) VALUES
(3, 'Bob Lang'),
(2, 'Gadre Rao'),
(20, 'Gadre Raos'),
(1, 'Jen Wilde'),
(4, 'Jessica Gray'),
(19, 'John Lenon'),
(5, 'Kristin Hannak'),
(6, 'Mark Martin'),
(0, 'No author'),
(12, 'Papa Karlo'),
(7, 'Pratibha Nath'),
(8, 'Sandy Carey'),
(9, 'Thomas Hobbes'),
(10, 'Vikas Bhushan'),
(11, 'William Martin');

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_books`
--

CREATE TABLE IF NOT EXISTS `bookshop_books` (
  `id` int(11) NOT NULL,
  `booksName` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `pubyear` int(4) NOT NULL,
  `price` int(10) NOT NULL,
  `id_discount` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_books`
--

INSERT INTO `bookshop_books` (`id`, `booksName`, `description`, `pubyear`, `price`, `id_discount`) VALUES
(1, 'Abracadabra Test 2', 'Test description', 1111, 1111, 1),
(2, 'Book2', 'Full desc2', 1990, 250, 1),
(3, 'Book3', 'Full desc3', 2000, 300, 5),
(4, 'Book4', 'Full desc4', 2010, 350, 4),
(5, 'Book5', 'Full desc5', 2015, 150, 1),
(6, 'Book55', 'Full desc6', 2020, 50, 4),
(7, 'AllinAll', 'Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! Full desc! ', 1800, 600, 5),
(8, 'New Book Name', 'Post description', 1999, 999, 1),
(9, 'Post Book trans1', 'Post description trans', 2001, 888, 3),
(10, 'Post Book trans123', 'Post description trans', 2002, 888, 1),
(11, 'Post Book trans', 'Post description trans', 2003, 888, 1),
(12, 'Another Post Book 2', 'pumpurum description', 2002, 666, 5),
(15, 'AnotherOne', 'dassasaddaw', 1111, 1111, 3),
(17, 'Test another', 'adsa', 1111, 1111, 4),
(18, 'OneOne', 'adsa', 1111, 1111, 3),
(20, 'strlen magic', 'adsa', 1111, 1111, 1),
(21, 'New Transaction', 'dasdawd', 2222, 2222, 1),
(22, 'Cool Transaction', 'COOL', 3333, 3333, 4),
(23, 'Another Cool', 'ADWADA', 2222, 3333, 1),
(24, 'ALILUYA1', 'pumpurum description', 2002, 666, 5),
(25, 'SomeBooK', 'adsadwa', 1111, 1111, 4),
(26, 'OLOLO', 'adsadawdadw', 1111, 1111, 3),
(27, 'OPAPA', 'sdsdfsfw', 1111, 1111, 5),
(28, 'Abracadabra', 'Test description', 1111, 1111, 1),
(29, 'Abracadabra', 'Test description', 1111, 1111, 1),
(30, 'Abracadabra', 'Test description', 1111, 1111, 1),
(31, 'Abracadabra', 'Test description', 1111, 1111, 1),
(32, 'Abracadabra', 'Test description', 1111, 1111, 1),
(33, 'Abracadabra', 'Test description', 1111, 1111, 1),
(34, 'Abracadabra', 'Test description', 1111, 1111, 1),
(35, 'Abracadabra', 'Test description', 1111, 1111, 1),
(36, 'Abracadabra', 'Test description', 1111, 1111, 1),
(37, 'Abracadabra', 'Test description', 1111, 1111, 1),
(38, 'Abracadabra', 'Test description', 1111, 1111, 1),
(39, 'Abracadabra', 'Test description', 1111, 1111, 1),
(40, 'Abracadabra', 'Test description', 1111, 1111, 1),
(41, 'Abracadabra', 'Test description', 1111, 1111, 1),
(42, 'Abracadabra', 'Test description', 1111, 1111, 1),
(43, 'Abracadabra', 'Test description', 1111, 1111, 1),
(44, 'Abracadabra', 'Test description', 1111, 1111, 1),
(45, 'Abracadabra', 'Test description', 1111, 1111, 1),
(46, 'Abracadabra', 'Test description', 1111, 1111, 1),
(47, 'Abracadabra', 'Test description', 1111, 1111, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_books_history`
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
-- Структура таблицы `bookshop_books_to_authors`
--

CREATE TABLE IF NOT EXISTS `bookshop_books_to_authors` (
  `id_book` int(11) NOT NULL,
  `id_author` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_books_to_authors`
--

INSERT INTO `bookshop_books_to_authors` (`id_book`, `id_author`) VALUES
(2, 1),
(3, 4),
(5, 7),
(5, 8),
(5, 9),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(11, 3),
(11, 4),
(12, 3),
(12, 1),
(17, 3),
(20, 2),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(15, 10),
(15, 11),
(15, 12),
(15, 20),
(9, 2),
(9, 3),
(9, 4),
(21, 2),
(21, 5),
(22, 5),
(23, 2),
(23, 3),
(23, 4),
(24, 2),
(24, 1),
(24, 3),
(10, 3),
(10, 4),
(10, 5),
(25, 12),
(25, 19),
(4, 5),
(4, 6),
(4, 7),
(26, 2),
(26, 3),
(26, 4),
(6, 9),
(6, 10),
(6, 11),
(27, 10),
(27, 11),
(27, 12),
(28, 1),
(28, 2),
(29, 1),
(29, 2),
(30, 1),
(30, 2),
(31, 1),
(31, 2),
(32, 1),
(32, 2),
(33, 1),
(33, 2),
(34, 1),
(34, 2),
(35, 1),
(35, 2),
(36, 1),
(36, 2),
(37, 1),
(37, 2),
(38, 1),
(38, 2),
(39, 1),
(39, 2),
(40, 1),
(40, 2),
(41, 1),
(41, 2),
(42, 1),
(42, 2),
(43, 1),
(43, 2),
(44, 1),
(44, 2),
(45, 1),
(45, 2),
(46, 1),
(46, 2),
(47, 1),
(47, 2),
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_books_to_genres`
--

CREATE TABLE IF NOT EXISTS `bookshop_books_to_genres` (
  `id_book` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_books_to_genres`
--

INSERT INTO `bookshop_books_to_genres` (`id_book`, `id_genre`) VALUES
(2, 1),
(3, 8),
(5, 4),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(8, 3),
(8, 4),
(8, 2),
(11, 3),
(11, 2),
(12, 3),
(12, 2),
(17, 2),
(17, 5),
(20, 3),
(18, 5),
(18, 6),
(18, 7),
(15, 2),
(15, 3),
(15, 4),
(9, 2),
(9, 3),
(9, 5),
(9, 6),
(21, 2),
(21, 5),
(22, 4),
(23, 1),
(23, 2),
(23, 3),
(24, 1),
(24, 2),
(24, 4),
(10, 2),
(10, 3),
(25, 1),
(25, 3),
(4, 6),
(4, 7),
(4, 8),
(26, 4),
(26, 5),
(6, 4),
(6, 5),
(27, 2),
(27, 3),
(28, 1),
(28, 2),
(29, 1),
(29, 2),
(30, 1),
(30, 2),
(31, 1),
(31, 2),
(32, 1),
(32, 2),
(33, 1),
(33, 2),
(34, 1),
(34, 2),
(35, 1),
(35, 2),
(36, 1),
(36, 2),
(37, 1),
(37, 2),
(38, 1),
(38, 2),
(39, 1),
(39, 2),
(40, 1),
(40, 2),
(41, 1),
(41, 2),
(42, 1),
(42, 2),
(43, 1),
(43, 2),
(44, 1),
(44, 2),
(45, 1),
(45, 2),
(46, 1),
(46, 2),
(47, 1),
(47, 2),
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_cart`
--

CREATE TABLE IF NOT EXISTS `bookshop_cart` (
  `id_user` int(11) NOT NULL,
  `id_book` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_cart`
--

INSERT INTO `bookshop_cart` (`id_user`, `id_book`, `count`) VALUES
(3, 2, 4),
(3, 3, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_discounts`
--

CREATE TABLE IF NOT EXISTS `bookshop_discounts` (
  `id` int(11) NOT NULL,
  `discountsName` varchar(20) NOT NULL,
  `percent` int(3) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_discounts`
--

INSERT INTO `bookshop_discounts` (`id`, `discountsName`, `percent`) VALUES
(1, 'Empty', 0),
(3, 'The third part', 30),
(4, 'Ten', 10),
(5, 'Half', 50);

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_genres`
--

CREATE TABLE IF NOT EXISTS `bookshop_genres` (
  `id` int(11) NOT NULL,
  `genresName` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_genres`
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
-- Структура таблицы `bookshop_info_order`
--

CREATE TABLE IF NOT EXISTS `bookshop_info_order` (
  `id_order` int(11) NOT NULL,
  `id_book` int(11) NOT NULL,
  `bookDiscount` int(3) NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL,
  `bookTotalPrice` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_info_order`
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
(9, 3, 50, 24, 3600),
(10, 5, 0, 1, 150),
(10, 6, 0, 1, 50),
(10, 8, 0, 1, 999),
(10, 4, 30, 1, 245),
(10, 1, 10, 4, 720),
(10, 7, 50, 1, 300),
(11, 5, 0, 10, 1500),
(11, 1, 10, 4, 720),
(11, 3, 50, 8, 1200),
(12, 5, 0, 1, 150),
(12, 8, 0, 4, 3996),
(12, 1, 10, 4, 720),
(12, 3, 50, 8, 1200),
(13, 2, 0, 2, 500),
(13, 1, 10, 3, 540),
(13, 3, 50, 2, 300),
(14, 6, 0, 6, 300),
(14, 5, 0, 4, 600),
(14, 2, 0, 8, 2000),
(15, 11, 0, 2, 1776),
(15, 10, 0, 3, 2664),
(15, 8, 0, 4, 3996),
(15, 9, 30, 5, 3108),
(16, 2, 0, 5, 1250),
(16, 4, 30, 3, 735),
(17, 2, 0, 2, 500),
(17, 5, 0, 2, 300),
(18, 6, 0, 8, 400),
(18, 11, 0, 7, 6216),
(18, 2, 0, 2, 500),
(19, 6, 0, 10, 500),
(20, 6, 0, 4, 200),
(21, 6, 0, 5, 250),
(21, 5, 0, 5, 750),
(22, 5, 0, 4, 600),
(22, 6, 0, 4, 200),
(23, 2, 0, 1, 250),
(23, 6, 0, 2, 100),
(23, 10, 0, 1, 888),
(24, 5, 0, 8, 1200),
(24, 6, 0, 6, 300),
(25, 10, 0, 6, 5328),
(25, 5, 0, 6, 900),
(25, 6, 0, 5, 250),
(25, 2, 0, 3, 750),
(26, 6, 0, 1, 50),
(26, 5, 0, 2, 300),
(27, 5, 0, 5, 750),
(27, 6, 0, 5, 250),
(28, 23, 0, 6, 19998),
(28, 18, 30, 5, 3889),
(28, 25, 10, 6, 5999),
(29, 2, 0, 7, 1750),
(29, 8, 0, 4, 3996),
(30, 8, 0, 5, 4995),
(30, 2, 0, 2, 500),
(31, 2, 0, 8, 2000),
(31, 5, 0, 5, 750),
(32, 5, 0, 5, 750),
(32, 1, 10, 10, 1800),
(33, 1, 10, 10, 1800),
(34, 2, 0, 10, 2500),
(34, 1, 10, 10, 1800),
(35, 2, 0, 10, 2500),
(35, 1, 10, 10, 1800),
(36, 1, 10, 10, 1800),
(37, 1, 10, 10, 1800),
(38, 1, 10, 10, 1800),
(39, 1, 10, 10, 1800),
(40, 1, 10, 10, 1800),
(41, 1, 10, 10, 1800),
(42, 1, 10, 10, 1800),
(43, 1, 10, 10, 1800),
(44, 1, 10, 10, 1800),
(45, 1, 10, 10, 1800),
(46, 1, 10, 10, 1800),
(47, 1, 10, 10, 1800),
(48, 1, 10, 10, 1800),
(49, 1, 10, 10, 1800),
(50, 1, 10, 10, 1800),
(51, 1, 10, 10, 1800),
(52, 1, 10, 10, 1800),
(53, 1, 10, 10, 1800),
(54, 1, 10, 10, 1800),
(55, 1, 10, 10, 1800),
(56, 1, 10, 10, 1800),
(57, 1, 10, 10, 1800),
(58, 1, 10, 10, 1800),
(59, 1, 10, 10, 1800),
(60, 1, 10, 10, 1800),
(61, 1, 10, 10, 1800),
(62, 1, 10, 10, 1800),
(63, 1, 10, 10, 1800),
(64, 1, 10, 10, 1800),
(65, 1, 10, 10, 1800),
(66, 1, 10, 10, 1800),
(67, 1, 10, 10, 1800),
(68, 1, 10, 10, 1800),
(69, 1, 10, 10, 1800),
(70, 1, 10, 10, 1800),
(71, 1, 10, 10, 1800),
(72, 1, 10, 10, 1800),
(73, 1, 10, 10, 1800),
(74, 1, 10, 10, 1800),
(75, 1, 10, 10, 1800),
(76, 1, 10, 10, 1800),
(77, 1, 10, 10, 1800),
(78, 1, 10, 10, 1800),
(79, 1, 10, 10, 1800),
(80, 1, 10, 10, 1800),
(81, 1, 0, 10, 11110),
(82, 1, 0, 10, 11110),
(83, 1, 0, 10, 11110),
(84, 1, 0, 10, 11110),
(85, 1, 0, 10, 11110),
(86, 1, 0, 10, 11110),
(87, 1, 0, 10, 11110),
(88, 1, 0, 10, 11110),
(89, 1, 0, 10, 11110),
(90, 1, 0, 10, 11110),
(91, 1, 0, 10, 11110),
(92, 1, 0, 10, 11110),
(93, 1, 0, 10, 11110),
(94, 1, 0, 10, 11110),
(95, 1, 0, 10, 11110),
(96, 1, 0, 10, 11110),
(97, 1, 0, 10, 11110);

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_orders`
--

CREATE TABLE IF NOT EXISTS `bookshop_orders` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `clientDiscount` int(3) NOT NULL DEFAULT '0',
  `id_payment` int(11) NOT NULL,
  `orderTotalPrice` int(10) NOT NULL,
  `time` int(11) NOT NULL,
  `id_status` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_orders`
--

INSERT INTO `bookshop_orders` (`id`, `id_user`, `clientDiscount`, `id_payment`, `orderTotalPrice`, `time`, `id_status`) VALUES
(1, 1, 10, 3, 1548, 1507801276, 1),
(2, 1, 10, 3, 1548, 1507801317, 4),
(3, 1, 10, 3, 1548, 1507801346, 4),
(4, 1, 10, 3, 1548, 1507802047, 4),
(5, 1, 10, 3, 1548, 1507802318, 4),
(6, 1, 10, 3, 1548, 1507802888, 5),
(7, 1, 10, 3, 1548, 1507802942, 1),
(8, 1, 10, 3, 3947, 1507806668, 5),
(9, 1, 10, 3, 13928, 1507807133, 4),
(10, 1, 10, 2, 2218, 1508417971, 1),
(11, 1, 10, 1, 3078, 1508418043, 4),
(12, 3, 0, 3, 6066, 1508489969, 4),
(13, 3, 0, 3, 1340, 1508490208, 4),
(14, 1, 50, 2, 1450, 1508758628, 5),
(15, 1, 50, 1, 5772, 1508758699, 4),
(16, 1, 50, 3, 993, 1508758807, 5),
(17, 1, 50, 2, 400, 1508759391, 4),
(18, 1, 50, 2, 3558, 1508916728, 4),
(19, 4, 30, 2, 350, 1508926320, 4),
(20, 4, 30, 1, 140, 1508926818, 4),
(21, 4, 30, 3, 700, 1508926844, 4),
(22, 4, 30, 3, 560, 1508926918, 4),
(23, 4, 30, 3, 867, 1508926938, 4),
(24, 4, 30, 3, 1050, 1508927255, 4),
(25, 1, 50, 2, 3614, 1508991296, 4),
(26, 1, 50, 3, 175, 1508991379, 4),
(27, 1, 50, 2, 500, 1508991945, 4),
(28, 1, 50, 2, 14943, 1509001063, 4),
(29, 1, 50, 2, 2873, 1509020528, 4),
(30, 1, 50, 2, 2748, 1509024614, 4),
(31, 1, 50, 3, 1375, 1509024903, 4),
(32, 1, 50, 1, 1275, 1509038405, 4),
(33, 1, 50, 1, 900, 1509038409, 4),
(34, 1, 50, 1, 2150, 1509038541, 4),
(35, 1, 50, 1, 2150, 1509038855, 4),
(36, 1, 50, 1, 900, 1509039247, 4),
(37, 1, 50, 1, 900, 1509039251, 4),
(38, 1, 50, 1, 900, 1509039738, 4),
(39, 1, 50, 1, 900, 1509039832, 4),
(40, 1, 50, 1, 900, 1509039852, 4),
(41, 1, 50, 1, 900, 1509039932, 4),
(42, 1, 50, 1, 900, 1509040002, 4),
(43, 1, 50, 1, 900, 1509040066, 4),
(44, 1, 50, 1, 900, 1509040885, 4),
(45, 1, 50, 1, 900, 1509040993, 4),
(46, 1, 50, 1, 900, 1509041049, 4),
(47, 1, 50, 1, 900, 1509041095, 4),
(48, 1, 50, 1, 900, 1509041170, 4),
(49, 1, 50, 1, 900, 1509041238, 4),
(50, 1, 50, 1, 900, 1509041586, 4),
(51, 1, 50, 1, 900, 1509042071, 4),
(52, 1, 50, 1, 900, 1509042158, 4),
(53, 1, 50, 1, 900, 1509042177, 4),
(54, 1, 50, 1, 900, 1509047305, 4),
(55, 1, 50, 1, 900, 1509047572, 4),
(56, 1, 50, 1, 900, 1509047816, 4),
(57, 1, 50, 1, 900, 1509047930, 4),
(58, 1, 50, 1, 900, 1509048562, 4),
(59, 1, 50, 1, 900, 1509087828, 4),
(60, 1, 50, 1, 900, 1509087847, 4),
(61, 1, 50, 1, 900, 1509087927, 4),
(62, 1, 50, 1, 900, 1509088028, 4),
(63, 1, 50, 1, 900, 1509088049, 4),
(64, 1, 50, 1, 900, 1509088104, 4),
(65, 1, 50, 1, 900, 1509088194, 4),
(66, 1, 50, 1, 900, 1509089348, 4),
(67, 1, 50, 1, 900, 1509089427, 4),
(68, 1, 50, 1, 900, 1509089949, 4),
(69, 1, 50, 1, 900, 1509090705, 4),
(70, 1, 50, 1, 900, 1509090740, 4),
(71, 1, 50, 1, 900, 1509090795, 4),
(72, 1, 50, 1, 900, 1509090959, 4),
(73, 1, 50, 1, 900, 1509090962, 4),
(74, 1, 50, 1, 900, 1509091166, 4),
(75, 1, 50, 1, 900, 1509091533, 4),
(76, 1, 50, 1, 900, 1509091540, 4),
(77, 1, 50, 1, 900, 1509091551, 4),
(78, 1, 50, 1, 900, 1509091743, 4),
(79, 1, 50, 1, 900, 1509092670, 4),
(80, 1, 50, 1, 900, 1509092899, 4),
(81, 1, 50, 1, 5555, 1509093048, 4),
(82, 1, 50, 1, 5555, 1509093117, 4),
(83, 1, 50, 1, 5555, 1509093349, 4),
(84, 1, 50, 1, 5555, 1509093669, 4),
(85, 1, 50, 1, 5555, 1509094035, 4),
(86, 1, 50, 1, 5555, 1509094040, 4),
(87, 1, 50, 1, 5555, 1509094075, 4),
(88, 1, 50, 1, 5555, 1509095563, 4),
(89, 1, 50, 1, 5555, 1509095573, 4),
(90, 1, 50, 1, 5555, 1509096207, 4),
(91, 1, 50, 1, 5555, 1509096689, 4),
(92, 1, 50, 1, 5555, 1509096725, 4),
(93, 1, 50, 1, 5555, 1509096742, 4),
(94, 1, 50, 1, 5555, 1509096756, 4),
(95, 1, 50, 1, 5555, 1509097120, 4),
(96, 1, 50, 1, 5555, 1509097447, 4),
(97, 1, 50, 1, 5555, 1509097614, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_payment`
--

CREATE TABLE IF NOT EXISTS `bookshop_payment` (
  `id` int(11) NOT NULL,
  `paymentName` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_payment`
--

INSERT INTO `bookshop_payment` (`id`, `paymentName`) VALUES
(2, 'Card'),
(3, 'Cash'),
(1, 'PayPal');

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_status`
--

CREATE TABLE IF NOT EXISTS `bookshop_status` (
  `id` int(11) NOT NULL,
  `statusName` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_status`
--

INSERT INTO `bookshop_status` (`id`, `statusName`) VALUES
(1, 'Done'),
(5, 'In process'),
(4, 'Not ready');

-- --------------------------------------------------------

--
-- Структура таблицы `bookshop_users`
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
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `bookshop_users`
--

INSERT INTO `bookshop_users` (`id`, `login`, `password`, `phone`, `id_discount`, `hash`, `lifetime`, `admin`, `active`) VALUES
(1, 'Lambur', 'b3084c0c110ebdb50d3308725fb29f3e', 973289702, 5, 'f82468c5e5e449cdce6f4595aef3cd78', '1509041622', 1, 1),
(3, 'lama', 'b3084c0c110ebdb50d3308725fb29f3e', 973289702, 1, '2ab4bad34b38557cca3d8f246ab85d5c', '1509097614', 0, 1),
(4, 'Donka', 'b3084c0c110ebdb50d3308725fb29f3e', 132342145, 3, '892b0238de149b97443e8238565fab8e', '1508926986', 0, 1),
(5, 'Lola', 'b3084c0c110ebdb50d3308725fb29f3e', 123214124, 5, '97c7a754209eb4f0e59feaa573c5514e', '1508615107', 1, 1),
(6, 'Arture', 'b3084c0c110ebdb50d3308725fb29f3e', 5665454, 3, '7dea82031913be0dd50738832787a47f', '1508615318', 0, 0),
(7, 'Ololo', 'b3084c0c110ebdb50d3308725fb29f3e', 234321423, 5, '382176bd34c8bd20e1b69edd672de9d2', '1508998716', 1, 1),
(8, 'Alewka', '3be33bd03f352c596a5a5c62a7b095d1', 111111, 5, '362d4b12d92d776e72d998ec7ed9ea19', '1509024832', 1, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bookshop_authors`
--
ALTER TABLE `bookshop_authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`authorsName`);

--
-- Индексы таблицы `bookshop_books`
--
ALTER TABLE `bookshop_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookshop_books_fk0` (`id_discount`);

--
-- Индексы таблицы `bookshop_books_to_authors`
--
ALTER TABLE `bookshop_books_to_authors`
  ADD KEY `bookshop_books_to_authors_fk0` (`id_book`),
  ADD KEY `bookshop_books_to_authors_fk1` (`id_author`);

--
-- Индексы таблицы `bookshop_books_to_genres`
--
ALTER TABLE `bookshop_books_to_genres`
  ADD KEY `bookshop_books_to_genres_fk0` (`id_book`),
  ADD KEY `bookshop_books_to_genres_fk1` (`id_genre`);

--
-- Индексы таблицы `bookshop_cart`
--
ALTER TABLE `bookshop_cart`
  ADD KEY `bookshop_cart_fk0` (`id_user`),
  ADD KEY `bookshop_cart_fk1` (`id_book`);

--
-- Индексы таблицы `bookshop_discounts`
--
ALTER TABLE `bookshop_discounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`discountsName`);

--
-- Индексы таблицы `bookshop_genres`
--
ALTER TABLE `bookshop_genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`genresName`);

--
-- Индексы таблицы `bookshop_info_order`
--
ALTER TABLE `bookshop_info_order`
  ADD KEY `bookshop_info_order_fk0` (`id_order`),
  ADD KEY `bookshop_info_order_fk1` (`id_book`);

--
-- Индексы таблицы `bookshop_orders`
--
ALTER TABLE `bookshop_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookshop_orders_fk0` (`id_user`),
  ADD KEY `bookshop_orders_fk1` (`id_payment`),
  ADD KEY `bookshop_orders_fk2` (`id_status`);

--
-- Индексы таблицы `bookshop_payment`
--
ALTER TABLE `bookshop_payment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`paymentName`);

--
-- Индексы таблицы `bookshop_status`
--
ALTER TABLE `bookshop_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`statusName`);

--
-- Индексы таблицы `bookshop_users`
--
ALTER TABLE `bookshop_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `bookshop_users_fk0` (`id_discount`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bookshop_authors`
--
ALTER TABLE `bookshop_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=111;
--
-- AUTO_INCREMENT для таблицы `bookshop_books`
--
ALTER TABLE `bookshop_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT для таблицы `bookshop_discounts`
--
ALTER TABLE `bookshop_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `bookshop_genres`
--
ALTER TABLE `bookshop_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT для таблицы `bookshop_orders`
--
ALTER TABLE `bookshop_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=98;
--
-- AUTO_INCREMENT для таблицы `bookshop_payment`
--
ALTER TABLE `bookshop_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `bookshop_status`
--
ALTER TABLE `bookshop_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `bookshop_users`
--
ALTER TABLE `bookshop_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=102;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
