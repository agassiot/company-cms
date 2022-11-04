
INSERT INTO corporate_db.department (name)
VALUES ('Da Board');
INSERT INTO corporate_db.department (name)
VALUES ('Mayhem');
INSERT INTO corporate_db.department (name)
VALUES ('Murders & Acquistions');
INSERT INTO corporate_db.department (name)
VALUES ('Gofers');
INSERT INTO corporate_db.department (name)
VALUES ('Wheelmen');
INSERT INTO corporate_db.department (name)
VALUES ('CleanUp');




INSERT INTO corporate_db.role (title, salary, department_id)
VALUES 
('President', 100000000, 1 ),
('ArmsDealer', 65000,2),
('Sniper', 55000, 3 ),
('BloodsplatAnalyst', 50000, 4),
('Driver', 75000, 5), 
('CoffeeGuy', 300000, 6);

INSERT INTO corporate_db.employee (first_name, last_name, role_id, manager_id)
VALUES 
('Andy', 'Smith', '1',  NULL ),
('Patrick', 'Bateman', '2', '1'),
('Sandy', 'Undersmith', '2', '1' ),
('Mandy', 'Underhill', '3', '1' ),
('Candy', 'Thorn', '3', '1' ),
('Sara', 'Thornhill', '3', '1'),
('Dexter', 'Underthornhill', '4', '1'),
('Fara', 'Hillsmith', '5', '1'),
('Zara', 'Hillthorn', '5', '1'),
('Tara', 'Hornsmith', '6', '1');