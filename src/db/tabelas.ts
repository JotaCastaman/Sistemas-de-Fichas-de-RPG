import { banco } from "./conexao.ts";

banco.exec(`CREATE TABLE IF NOT EXISTS personagens (    
    id integer primary key autoincrement not null,    
    nome varchar(45) not null,    
    especie varchar(45) not null,    
    classe varchar(45) not null    
    )`);


banco.exec(`CREATE TABLE IF NOT EXISTS atributos (    
    id integer primary key autoincrement not null,    
    nome varchar(45) not null unique  
    )`);


banco.exec(`CREATE TABLE IF NOT EXISTS personagem_atributos (    
    id integer primary key autoincrement not null,  
    personagem_id integer not null,
    atributo_id integer not null,
    valor integer not null,
    FOREIGN KEY (personagem_id) REFERENCES personagens(id),
    FOREIGN KEY (atributo_id) REFERENCES atributos(id)
    )`);


banco.exec(`CREATE TABLE IF NOT EXISTS pericias (    
    id integer primary key autoincrement not null,    
    nome varchar(45) not null unique,
    atributo_id integer not null,
    FOREIGN KEY (atributo_id) REFERENCES atributos(id)
    )`);


banco.exec(`CREATE TABLE IF NOT EXISTS personagem_pericias (    
    id integer primary key autoincrement not null,  
    personagem_id integer not null,
    pericia_id integer not null,
    valor integer not null,
    FOREIGN KEY (personagem_id) REFERENCES personagens(id),
    FOREIGN KEY (pericia_id) REFERENCES pericias(id)
    )`);
