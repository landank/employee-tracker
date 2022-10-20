use employees;

INSERT INTO department
    (department_name)
VALUES
    ('Unicicle Rider'),
    ('Elephant Wrestler'),
    ('Lego Architect'),
    ('Starcraft 2 Pro'),
    ('Dyslexic Mathmatician');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Villager', 65000, 1),
    ('Minecraft Building', 55000, 2),
    ('Theorycrafting', 60000, 3),
    ('Calvin Ball Athelete', 97000, 4),
    ('Trader Joes Cashier', 75000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Wick', 'John', 1, NULL),
    ('Connor', 'Sarah', 2, NULL),
    ('The Barbarian', 'Conan', 3, 3),
    ('Nukem', 'Duke', 4, NULL),
    ('Overwatch', 'Winston', 5, 5),
    ('Jones', 'Indiana', 1, NULL);
