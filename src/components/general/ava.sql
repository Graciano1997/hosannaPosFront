-- DDL ------------------------------------
CREATE TABLE IF NOT EXISTS departamentos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS  funcionarios(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    salario DECIMAL(10,2),
    departamento_id INT NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- DML -----------------

INSERT INTO departamentos(nome) VALUES
('RH'),('PRODUÇÃO'),('TESTE');

INSERT INTO funcionarios(nome,salario,departamento_id) VALUES
('Graciano Henrique',2000,2),
('Maria Prata',2000,1),
('Gilberto Alexandre',2000,3),
('Mario',2500,2),
('Adilson Henrique',2500,1),


SELECT * FROM funcionarios
WHERE salario > 2000 ORDER BY salario DESC;


SELECT departamento_id, AVG(salario) AS salario_medio
FROM funcionarios
GROUP BY departamento_id
HAVING AVG(salario) > 2500
ORDER BY salario_medio DESC;


SELECT f.nome AS funcionario, d.nome AS departamento 
FROM funcionarios f INNER JOIN 
departamentos d 
ON f.departamento_id=d.id;

CREATE USER 'teste_sql'@'localhost';

GRANT SELECT ON `funcionarios` TO 'teste_sql'@'localhost';

REVOKE UPDATE,INSERT ON `funcionarios` FROM 'teste_sql'@'localhost';


START TRANSACTION;

UPDATE funcionarios
SET salario = salario + 500
WHERE id = id_funcionario_joao
  AND departamento_id IN (
      SELECT departamento_id
      FROM funcionarios
      GROUP BY departamento_id
      HAVING AVG(salario) < 3000
);

COMMIT;

DELIMITER $
CREATE TRIGGER tg_funcionario_insert
BEFORE INSERT ON funcionarios
FOR EACH ROW
BEGIN
    IF NEW.salario < 100 THEN
    SET New.salario = 1000;
    END IF
END$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE pro_departament_resume(IN departamento INT)
BEGIN
SELECT COUNT(*) AS total_funcionarios,
        AVG(salario) AS salario_medio,
        MAX(salario) AS maior_salario
    FROM funcionarios WHERE departamento_id = departamento;
END$$

DELIMITER ;

🔟 Teoria

Explique brevemente (1-2 frases cada):


Diferença entre DML e DQL
DML contem o conjunto de operacoes agrupadas que nos ajudam a manipular as informacoes isto (Insercao, atualizacao, remocao e selecao) enquanto o DQL foca se apenas na quering isto e o SELECT

Função do COMMIT em uma transação
Commit tem como funcao confirmacao para que tudo seja salvo na BD .

Quando usar SAVEPOINT

Um ponto intermediario que podemos usar para posteriormente fazermos o restauro com o ROllBack to Savespoint,
 muito uitil e importante.