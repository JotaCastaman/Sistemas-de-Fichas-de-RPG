import { banco } from "./conexao.ts";

banco.exec(`INSERT OR IGNORE INTO Atributos ( nome ) VALUES
    ('Força'),
    ('Destreza'),
    ('Constituição'),
    ('Inteligência'),
    ('Sabedoria'),
    ('Carisma');
    `);

banco.exec(`INSERT OR IGNORE INTO Perícias ( nome, atributo_id ) VALUES
    ('Atletismo', 1),
    ('Luta', 1),
    ('Furtividade', 2),
    ('Acrobacia', 2),
    ('Resistência', 3),
    ('Vigor', 3),
    ('Investigação', 4),
    ('Conhecimento', 4),
    ('Percepção', 5),
    ('Intuição', 5),
    ('Persuasão', 6),
    ('Intimidação', 6);
    `);
