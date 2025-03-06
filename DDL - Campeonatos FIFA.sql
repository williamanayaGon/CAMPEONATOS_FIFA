--Ejecutar primero
DROP DATABASE CampeonatosFIFA WITH (FORCE);
--Ejecutar segundo
CREATE DATABASE CampeonatosFIFA; 


--Para las siguientes instrucciones, se debe cambiar la conexión

--Crear la tabla PAIS
CREATE TABLE Pais(
	Id SERIAL PRIMARY KEY,
	Pais VARCHAR(50) NOT NULL,
	Entidad VARCHAR(100) NOT NULL,
	Bandera bytea NULL,
	LogoEntidad bytea NULL
	);

--Definir indice unico de PAIS
CREATE UNIQUE INDEX ixPais_Pais
	ON Pais(Pais);

--Crear la tabla FASE
CREATE TABLE Fase(
	Id SERIAL PRIMARY KEY,
	Fase VARCHAR(50) NOT NULL
	);
	
--Definir indice unico de FASE
CREATE UNIQUE INDEX ixFase_Fase
	ON Fase(Fase);

--Crear tabla CIUDAD
CREATE TABLE Ciudad(
	Id SERIAL PRIMARY KEY,
	Ciudad VARCHAR(50) NOT NULL,
	IdPais int NOT NULL,
	CONSTRAINT fkCiudad_IdPais FOREIGN KEY (IdPais) REFERENCES Pais(Id)
	);

--Definir indice unico de CIUDAD
CREATE UNIQUE INDEX ixCiudad_Ciudad
	ON Ciudad(IdPais, Ciudad);

--Crear tabla ESTADIO
CREATE TABLE Estadio(
	Id SERIAL PRIMARY KEY, 
	Estadio VARCHAR(50) NOT NULL, 
	IdCiudad int NOT NULL, 
	CONSTRAINT fkEstadio_IdCiudad FOREIGN KEY (IdCiudad) REFERENCES Ciudad (Id),
	Capacidad int NOT NULL,
	Foto bytea NULL
	);

--Definir indice unico de ESTADIO
CREATE UNIQUE INDEX ixEstadio_Estadio
	ON Estadio(Estadio);

--Crear tabla CAMPEONATO
CREATE TABLE Campeonato(
	Id SERIAL PRIMARY KEY, 
	Campeonato VARCHAR(50) NOT NULL, 
	IdPais int NOT NULL, 
	CONSTRAINT fkCampeonato_IdPais FOREIGN KEY (IdPais) REFERENCES Pais (Id),
	Año int NOT NULL,
	Logo bytea NULL
	);

--Definir indice unico de CAMPEONATO
CREATE UNIQUE INDEX ixCampeonato_Campeonato
	ON Campeonato(Campeonato);

--Crear tabla GRUPO
CREATE TABLE Grupo(
	Id SERIAL PRIMARY KEY, 
	Grupo VARCHAR(5) NOT NULL, 
	IdCampeonato int NOT NULL, 
	CONSTRAINT fkGrupo_IdCampeonato FOREIGN KEY (IdCampeonato) REFERENCES Campeonato (Id)
	);

--Definir indice unico de GRUPO
CREATE UNIQUE INDEX ixGrupo_Grupo
	ON Grupo(IdCampeonato, Grupo);

--Crear tabla GRUPOPAIS
CREATE TABLE GrupoPais (
	IdGrupo int NOT NULL,
	IdPais int NOT NULL,
	CONSTRAINT pkGrupoPais PRIMARY KEY (IdGrupo, IdPais),
	CONSTRAINT fkGrupoPais_IdGrupo FOREIGN KEY (IdGrupo) REFERENCES Grupo (Id),
	CONSTRAINT fkGrupoPais_IdPais FOREIGN KEY (IdPais) REFERENCES Pais (Id)
	);

--Crear tabla ENCUENTRO
CREATE TABLE Encuentro(
	Id SERIAL PRIMARY KEY, 
	IdPais1 int NOT NULL, 
	CONSTRAINT fkEncuentro_IdPais1 FOREIGN KEY (IdPais1) REFERENCES Pais (Id),
	IdPais2 int NOT NULL, 
	CONSTRAINT fkEncuentro_IdPais2 FOREIGN KEY (IdPais2) REFERENCES Pais (Id),
	IdFase int NOT NULL, 
	CONSTRAINT fkEncuentro_IdFase FOREIGN KEY (IdFase) REFERENCES Fase (Id),
	IdCampeonato int NOT NULL, 
	CONSTRAINT fkEncuentro_IdCampeonato FOREIGN KEY (IdCampeonato) REFERENCES Campeonato (Id),
	IdEstadio int NOT NULL, 
	CONSTRAINT fkEncuentro_IdEstadio FOREIGN KEY (IdEstadio) REFERENCES Estadio (Id),
	Fecha DATE NULL, 
	Goles1 int NULL, 
	Goles2 int NULL,
	Penales1 int NULL, 
	Penales2 int NULL
	);

--Definir indice unico de ENCUENTRO
CREATE UNIQUE INDEX ixEncuentro_Encuentro
	ON Encuentro(IdCampeonato, IdFase, IdPais1, IdPais2);


--Crear vistas
/*
CREATE VIEW vGrupo
AS
	SELECT G.Id, G.Grupo, G.IdCampeonato, C.Campeonato
		FROM Grupo G
			JOIN Campeonato C ON G.IdCampeonato=C.Id;

CREATE VIEW vEncuentro
AS
	SELECT E.Fecha, E.IdPais1, P1.Pais Pais1, E.Goles1, E.IdPais2, P2.Pais Pais2, E.Goles2,
        C.Campeonato, E.IdCampeonato, E.IdFase, F.Fase, ES.Estadio, E.IdEStadio
		FROM Encuentro E
			JOIN Pais P1 ON E.IdPais1=P1.Id
			JOIN Pais P2 ON E.IdPais2=P2.Id
			JOIN Campeonato C ON E.IdCampeonato=C.Id
            JOIN Estadio ES ON E.IdEstadio=ES.Id
            JOIN Fase F ON E.IdFase=F.Id;
			

CREATE VIEW vGrupoPais
AS
    SELECT GP.IdGrupo, GP.IdPais, P.Pais
        FROM GrupoPais GP
            JOIN Pais P
                ON GP.IdPais=P.Id
*/