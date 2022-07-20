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
('Customer Service Rep', 50,000, 1),
('Engineer', 80,000, 2),
('HR Rep', 50,000, 3),
('Manager', 70,000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, 2),
('Jane', 'Doe', 3, 2);