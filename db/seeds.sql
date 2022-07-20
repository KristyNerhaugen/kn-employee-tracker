INSERT INTO department (name)
VALUES
('Customer Service'),
('Engineering'),
('Human Resources'),
('Legal'),
('Finance'),
('Managers');

INSERT INTO role (title, salary, department_id)
VALUES
('Customer Service Rep', 50000, 1),
('Engineer', 80000, 2),
('HR Rep', 50000, 3),
('Manager', 70000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, null),
('Jane', 'Doe', 3, 1);