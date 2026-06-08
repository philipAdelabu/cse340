create table if not exists organizations (
    organization_id serial primary key,
    name varchar(255) unique not null,
    description text,
    contact_email varchar(255),
    logo_filename varchar(255)
);



-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

create table if not exists projects (
    project_id serial primary key,
    organization_id int references organizations(organization_id) on delete cascade,
    title varchar(255) not null,
    description text,
    location varchar(255),
    date date
);

insert into projects (organization_id, title, description, location, date) values
(1, 'Community Garden', 'Help us build and maintain a community garden to provide fresh produce for local families.', '123 Green St, Springfield', '2026-09-15'),
(1, 'After-School Tutoring', 'Volunteer to tutor students in math and reading at our after-school program.', '456 Elm St, Springfield', '2026-10-01'),
(2, 'Park Cleanup', 'Join us for a day of cleaning up our local park and making it a better place for everyone.', '789 Oak St, Springfield', '2026-09-20'),
(2, 'Food Drive', 'Help us collect and distribute food to families in need during our annual food drive.', '321 Maple St, Springfield', '2026-11-05'),
(3, 'Senior Center Activities', 'Volunteer to lead activities and provide companionship at our local senior center.', '654 Pine St, Springfield', '2026-10-10'),
(3, 'Homeless Shelter Support', 'Assist with meal preparation and distribution at our homeless shelter.', '987 Cedar St, Springfield', '2026-09-30'),
(1, 'Community Art Project', 'Help us create a community mural to brighten up our neighborhood.', '123 Green St, Springfield', '2026-10-15'),
(2, 'Youth Sports Coaching', 'Volunteer to coach youth sports teams and promote physical activity among kids.', '456 Elm St, Springfield', '2026-09-25'),
(3, 'Environmental Education', 'Lead educational workshops on sustainability and environmental conservation.', '789 Oak St, Springfield', '2026-11-01'),
(1, 'Community Health Fair', 'Assist with organizing and running a health fair to provide free screenings and resources to the community.', '321 Maple St, Springfield', '2026-10-20'),
(2, 'Neighborhood Watch Program', 'Join our neighborhood watch program to help keep our community safe.', '654 Pine St, Springfield', '2026-09-28'),
(3, 'Animal Shelter Volunteering', 'Help care for animals and assist with adoption events at our local animal shelter.', '987 Cedar St, Springfield', '2026-10-05'),
(1, 'Community Music Festival', 'Volunteer to help organize and run our annual community music festival.', '123 Green St, Springfield', '2026-11-10'),
(2, 'Literacy Program', 'Assist with running a literacy program to help adults improve their reading skills.', '456 Elm St, Springfield', '2026-10-30'),
(3, 'Community Recycling Initiative', 'Join us in promoting recycling and sustainability in our community.', '789 Oak St, Springfield', '2026-09-22'),
(1, 'Senior Tech Support', 'Volunteer to help seniors with technology and digital literacy.', '321 Maple St, Springfield', '2026-10-25'),
(2, 'Community Theater Production', 'Help us produce a community theater play to bring people together through the arts.', '654 Pine St, Springfield', '2026-11-15'),
(3, 'Youth Mentorship Program', 'Become a mentor to local youth and help guide them towards a bright future.', '987 Cedar St, Springfield', '2026-09-18'),
(1, 'Community Fitness Classes', 'Lead fitness classes in the park to promote health and wellness in our community.', '123 Green St, Springfield', '2026-10-05'),
(2, 'Neighborhood Beautification', 'Join us in beautifying our neighborhood through planting flowers and cleaning up public spaces.', '456 Elm St, Springfield', '2026-09-30'),
(3, 'Community Book Club', 'Help organize and run a community book club to encourage reading and discussion among residents.', '789 Oak St, Springfield', '2026-11-20');


create table if not exists categories (
    category_id serial primary key,
    name varchar(255) unique not null,
    created_at date default now()
);

create table if not exists project_category (
    project_id INTEGER,
    category_id INTEGER,
    primary key (project_id, category_id), -- composite key --
    foreign key (project_id) references projects(project_id),
    foreign key (category_id) references categories(category_id)
);

insert into categories (name) 
values ('Environmental'), ('Educational'),  ('Community Service'), ('Health and Wellness');

insert into project_category (project_id, category_id) 
values (1, 2), (2, 1), (3, 3), (2, 4);


CREATE TABLE IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- Verify the data was inserted
SELECT * FROM roles;


CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Insert a test user
INSERT INTO users (name, email, password_hash, role_id) 
VALUES ('testuser', 'test@example.com', 'placeholder_hash', 1);

-- Join users and roles to see complete information
SELECT u.user_id, u.name, u.email, r.role_name, r.role_description
FROM users u
JOIN roles r ON u.role_id = r.role_id;

-- Delete the test user
DELETE FROM users WHERE email = 'test@example.com';


UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE email = 'admin@example.com';



CREATE TABLE IF NOT EXISTS volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE,
    volunteered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);