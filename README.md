# CRUD FULLSTACK



## Installation
### Paso 1
en la carpena madre podemos encontrar un archivo TXT donde tendremos la ejecucion de nuestra base de datos

```sql
CREATE SCHEMA IF NOT EXISTS crudfull DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE crudfull ;


CREATE TABLE IF NOT EXISTS crudfull.tarea (
  tra_id INT NOT NULL AUTO_INCREMENT,
  tra_titulo VARCHAR(100) NOT NULL,
  PRIMARY KEY (tra_id))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS crudfull.subtarea (
  subtra_id INT NOT NULL AUTO_INCREMENT,
  subtra_titulo VARCHAR(100) NOT NULL,
  subtra_echo BOOLEAN NOT NULL,
  tarea_tra_id INT NOT NULL,
  PRIMARY KEY (subtra_id),
  INDEX fk_subtarea_tarea_idx (tarea_tra_id ASC) VISIBLE,
  CONSTRAINT fk_subtarea_tarea
    FOREIGN KEY (tarea_tra_id)
    REFERENCES crudfull.tarea (tra_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

```
### Paso 2

Agregamos nuestro Password del root
```java
# Configuración inicial para evitar el error de que no se ha configurado una base de datos
# spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
# Configuración del puerto que usará nuestra aplicación, por defecto es 8080
# server.port = 9090
# Habilitación del LiveReload cuando sea posible
spring.devtools.livereload.enabled = true
# -------------------- Configuración de conexión a MySQL --------------------
# Configuración para MySQL 8
spring.datasource.url = jdbc:mysql://localhost/crudfull?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrival=true 
# Usuario de base de datos
spring.datasource.username = root
# Contraseña para el usuario de la base de datos
spring.datasource.password = PASSWORD
# Clase a usar para conectar con la base de datos
spring.datasource.driver-class-name = com.mysql.cj.jdbc.Driver
# Dialecto a usar de SQL, en este caso MySQL8
spring.jpa.database-platform = org.hibernate.dialect.MySQL8Dialect
# -------------------- Mostrar en consola el SQL que se está ejecutando --------------------
# Formatear salida del SQL en consola
spring.jpa.properties.hibernate.format_sql = true
# Hacer que se muestre en consola el SQL ejecutado
logging.level.org.hibernate.SQL = DEBUG
# Hacer que se muestre en consola los valores que se inyectan a la sent
```


