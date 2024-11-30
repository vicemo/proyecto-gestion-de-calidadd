-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2024 a las 05:25:45
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_calidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casos_pruebas`
--

CREATE TABLE `casos_pruebas` (
  `id_caso` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `resultado` varchar(50) DEFAULT 'No ejecutado',
  `evidencia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `casos_pruebas`
--

INSERT INTO `casos_pruebas` (`id_caso`, `id_proyecto`, `nombre`, `descripcion`, `resultado`, `evidencia`) VALUES
(1, 11, 'prueba unitaria 5', 'verificar que el programa python funcione', 'mejorable', 'pendiente'),
(2, 8, 'hola', 'vamos a proceder con este esta en buenas condiciones', 'mejorable', 'dsfd'),
(4, 3, 'otra prueba', 'na', 'excelente', 'nada editado'),
(5, 3, 'PRUEBA DE FRONTED', 'Tiene que estar hecho con React JS', 'excelente', 'na');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `defectos`
--

CREATE TABLE `defectos` (
  `id_defecto` int(11) NOT NULL,
  `id_caso` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `severidad` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'Abierto',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `defectos`
--

INSERT INTO `defectos` (`id_defecto`, `id_caso`, `descripcion`, `severidad`, `estado`, `fecha_creacion`, `id_usuario`) VALUES
(1, 5, 'naa', 'alta', 'Abierto', '2024-11-26 04:03:59', 26),
(2, 1, 'matematicas', 'baja', 'pendiente', '2024-11-06 06:00:00', 27),
(3, 1, 'matematicas', 'baja', 'pendiente', '2024-11-06 06:00:00', 27),
(4, 1, 'matematicas', 'baja', 'pendiente', '2024-11-06 06:00:00', 27),
(5, 5, 'analisis de datos', 'alta', 'resuelto', '2024-10-29 05:00:00', 15),
(6, 2, 'creacion de nuevos etls para la carga de datos y transformacion a la base de datos', 'baja', 'resuelto', '2024-10-29 05:00:00', 10),
(7, 1, 'nuevo defecto encontrado pero se puede mejorar', 'baja', 'cerrado', '2024-10-29 05:00:00', 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_login` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id_proyecto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'En progreso',
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id_proyecto`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `estado`, `id_usuario`) VALUES
(2, 'nuevo proyecto editado', 'analisis', '2024-11-18', '2024-11-20', 'finalizado', 1),
(3, 'python program', 'programacion de nuevo sistema de gestion de calidad', '2024-10-29', '2024-12-11', 'asignado', 10),
(4, 'seguridad', 'crud para mostrar informacion importante de los agentes de seguridad', '2024-10-30', '2025-01-14', 'en_progreso', 15),
(5, 'alexa', 'arreglo de bugs', '2024-11-09', '2024-11-30', 'en_progreso', 26),
(6, 'new', 'esto tambien esta editado', '2024-11-04', '2024-11-18', 'asignado', 27),
(8, 'ETL DE SSIS', 'creacion de nuevos etls para la carga de datos y transformacion a la base de datos', '2024-11-18', '2024-11-28', 'finalizado', 28),
(9, 'proyecto de software nuevo', 'analisis de datos', '2024-07-24', '2025-08-25', 'asignado', 10),
(10, 'proyecto de revision', 'etl en el servidor', '2024-04-04', '2024-12-02', 'asignado', 26),
(11, 'nuevo hoy', 'proyecto bueno', '2024-11-22', '2024-11-30', 'finalizado', 27),
(12, 'marlon vicente', 'software', '2024-11-05', '2024-11-23', 'en_progreso', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id_reporte` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `fecha_reporte` timestamp NOT NULL DEFAULT current_timestamp(),
  `cobertura_pruebas` decimal(5,2) DEFAULT NULL,
  `tasa_defectos` decimal(5,2) DEFAULT NULL,
  `tiempo_promedio_resolucion` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `clave` int(50) NOT NULL,
  `rol` varchar(50) DEFAULT 'tester'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `correo`, `clave`, `rol`) VALUES
(1, 'marlon vicente', 'marlon@gmail.com', 123, 'tester'),
(10, 'norlin', 'fer@gmail.com', 89, 'tester 3'),
(13, 'marlon vicente m', 'marlon5@gmail.com', 123, 'tester 25'),
(15, 'marlon vicente', 'marlon785@gmail.com', 12378, 'administrador'),
(24, 'secondr4', 'secondr7@gmail.com', 456, 'tester 3'),
(25, 'WE', 'marlonWE@gmail.com', 123, 'administrador'),
(26, 'Adrian Vicente Ramos', 'adrianramos@hotmail.com', 8989, 'tester'),
(27, 'iqvia', 'marlon@iqvia.com', 788, 'administrador'),
(28, 'm', 'marlon4@gmail.com', 123, 'administrador'),
(29, 'vicente', 'vicente@gmail.com', 456, 'tester'),
(30, 'Dino', 'villanueva@gmail.com', 0, 'tester');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `casos_pruebas`
--
ALTER TABLE `casos_pruebas`
  ADD PRIMARY KEY (`id_caso`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `defectos`
--
ALTER TABLE `defectos`
  ADD PRIMARY KEY (`id_defecto`),
  ADD KEY `id_caso` (`id_caso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id_reporte`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `casos_pruebas`
--
ALTER TABLE `casos_pruebas`
  MODIFY `id_caso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `defectos`
--
ALTER TABLE `defectos`
  MODIFY `id_defecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id_reporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `casos_pruebas`
--
ALTER TABLE `casos_pruebas`
  ADD CONSTRAINT `casos_pruebas_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `defectos`
--
ALTER TABLE `defectos`
  ADD CONSTRAINT `defectos_ibfk_1` FOREIGN KEY (`id_caso`) REFERENCES `casos_pruebas` (`id_caso`) ON DELETE SET NULL,
  ADD CONSTRAINT `defectos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL;

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL;

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `reportes_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
