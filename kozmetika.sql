-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2025 at 12:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `proizvodi`;
DROP TABLE IF EXISTS `korisnik`;
DROP TABLE IF EXISTS `porudzbina`;
DROP TABLE IF EXISTS `stavka`;

CREATE TABLE `proizvodi` (
  `id` int(11) NOT NULL,
  `naziv` varchar(100) NOT NULL,
  `opis` text DEFAULT NULL,
  `slika` varchar(255) DEFAULT NULL,
  `cena` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `proizvodi` (`id`, `naziv`, `opis`, `slika`, `cena`) VALUES
(1, 'Krema od meda', 'Prirodna krema za hidrataciju kože', 'https://example.com/krema_od_meda.jpg', 1200.00),
(2, 'Balzam za usne', 'Balzam sa pčelinjim voskom', 'https://example.com/balzam_za_usne.jpg', 450.00),
(3, 'Losion za telo', 'Losion sa ekstraktom meda i lavande', 'https://example.com/losion_za_telo.jpg', 850.00);

CREATE TABLE `korisnik` (
  `id` int(11) NOT NULL,
  `ime` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `lozinka` varchar(255) NOT NULL,
  `uloga` enum('kupac','admin') DEFAULT 'kupac'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `korisnik` (`id`, `ime`, `email`, `lozinka`, `uloga`) VALUES
(1, 'Test1', 'test1@gmail.com', 'test1', 'kupac');

CREATE TABLE `porudzbina` (
  `id` int(11) NOT NULL,
  `korisnikid` int(11) DEFAULT NULL,
  `datum` datetime DEFAULT current_timestamp(),
  `status` enum('na čekanju','odobrena','otkazana') DEFAULT 'na čekanju'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `stavka` (
  `id` int(11) NOT NULL,
  `porudzbina_id` int(11) NOT NULL,
  `proizvod_id` int(11) NOT NULL,
  `kolicina` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `proizvodi` ADD PRIMARY KEY (`id`);
ALTER TABLE `korisnik` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`);
ALTER TABLE `porudzbina` ADD PRIMARY KEY (`id`), ADD KEY `korisnikid` (`korisnikid`);
ALTER TABLE `stavka` ADD PRIMARY KEY (`id`), ADD KEY `porudzbina_id` (`porudzbina_id`), ADD KEY `proizvod_id` (`proizvod_id`);

ALTER TABLE `proizvodi` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `korisnik` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `porudzbina` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `stavka` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `porudzbina`
  ADD CONSTRAINT `porudzbina_ibfk_1` FOREIGN KEY (`korisnikid`) REFERENCES `korisnik` (`id`);

ALTER TABLE `stavka`
  ADD CONSTRAINT `stavka_ibfk_1` FOREIGN KEY (`porudzbina_id`) REFERENCES `porudzbina` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `stavka_ibfk_2` FOREIGN KEY (`proizvod_id`) REFERENCES `proizvodi` (`id`) ON DELETE CASCADE;

COMMIT;
id