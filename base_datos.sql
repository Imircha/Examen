CREATE DATABASE monitoreo_especies;

USE monitoreo_especies;

CREATE TABLE usuario (
    cedula INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE especie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_comun VARCHAR(100),
    nombre_cientifico VARCHAR(100),
    imagen_url VARCHAR(255),
    descripcion TEXT
);

CREATE TABLE avistamiento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    ubicacion VARCHAR(100),
    especie_id INT,
    usuario_cedula INT,
    FOREIGN KEY (especie_id) REFERENCES especie(id),
    FOREIGN KEY (usuario_cedula) REFERENCES usuario(cedula)
);

-- Insertar las 5 especies predefinidas
INSERT INTO especie (nombre_comun, nombre_cientifico, imagen_url, descripcion) VALUES
('Tortuga Carey', 'Eretmochelys imbricata', 'https://www.larepublica.net/storage/images/2023/06/16/20230616114436.tortuga-2.x2.jpg', 'Especie de tortuga marina críticamente amenazada.'),
('Rinoceronte de Java', 'Rhinoceros sondaicus', 'https://t2.ea.ltmcdn.com/es/razas/7/0/8/rinoceronte-de-java_807_0_orig.jpg', 'Uno de los mamíferos más amenazados del mundo.'),
('Vaquita Marina', 'Phocoena sinus', 'https://www.ngenespanol.com/wp-content/uploads/2022/09/vaquita-marina-la-marsopa-mexicana-que-sobrevive-en-el-mar-de-cortes-770x431.jpg', 'Mamífero marino endémico del Golfo de California, en peligro crítico.'),
('Tigre de Sumatra', 'Panthera tigris sumatrae', 'https://tigers-world.com/wp-content/uploads/Tigre_de_Sumatra.jpg', 'El más pequeño de los tigres, en grave peligro de extinción.'),
('Lince Ibérico', 'Lynx pardinus', 'https://www.masquedonana.com/wp-content/uploads/2016/12/masquedonana-lince-iberico-parque-nacional-donana.jpg', 'Felino endémico de la península ibérica, en peligro crítico.');


/*Usa estos comandos luego de crear la tabla*/

CREATE USER 'nuevo_usuario'@'localhost' IDENTIFIED BY 'contraseña_segura';

GRANT ALL PRIVILEGES ON boletas TO 'tu_usuario'@'localhost';
FLUSH PRIVILEGES;

ALTER USER 'tu_usuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tu_contraseña';
FLUSH PRIVILEGES;

  

