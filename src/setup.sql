create table if not exists organizations (
    organization_id serial primary key,
    name varchar(255) not null,
    description text,
    contact_email varchar(255),
    logo_filename varchar(255)
);

create table if not exists projects (
    project_id serial primary key,
    organization_id int references organizations(organization_id) on delete cascade,
    title varchar(255) not null,
    description text,
    location varchar(255),
    date date
);

insert into projects (organization_id, title, description, location, date) values
(1, 'Community Garden', 'Help us build and maintain a community garden to provide fresh produce for local families.', '123 Green St, Springfield', '2024-09-15'),
(1, 'After-School Tutoring', 'Volunteer to tutor students in math and reading at our after-school program.', '456 Elm St, Springfield', '2024-10-01'),
(2, 'Park Cleanup', 'Join us for a day of cleaning up our local park and making it a better place for everyone.', '789 Oak St, Springfield', '2024-09-20'),
(2, 'Food Drive', 'Help us collect and distribute food to families in need during our annual food drive.', '321 Maple St, Springfield', '2024-11-05'),
(3, 'Senior Center Activities', 'Volunteer to lead activities and provide companionship at our local senior center.', '654 Pine St, Springfield', '2024-10-10'),
(3, 'Homeless Shelter Support', 'Assist with meal preparation and distribution at our homeless shelter.', '987 Cedar St, Springfield', '2024-09-30');