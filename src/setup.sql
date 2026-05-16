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
(3, 'Homeless Shelter Support', 'Assist with meal preparation and distribution at our homeless shelter.', '987 Cedar St, Springfield', '2024-09-30'),
(1, 'Community Art Project', 'Help us create a community mural to brighten up our neighborhood.', '123 Green St, Springfield', '2024-10-15'),
(2, 'Youth Sports Coaching', 'Volunteer to coach youth sports teams and promote physical activity among kids.', '456 Elm St, Springfield', '2024-09-25'),
(3, 'Environmental Education', 'Lead educational workshops on sustainability and environmental conservation.', '789 Oak St, Springfield', '2024-11-01'),
(1, 'Community Health Fair', 'Assist with organizing and running a health fair to provide free screenings and resources to the community.', '321 Maple St, Springfield', '2024-10-20'),
(2, 'Neighborhood Watch Program', 'Join our neighborhood watch program to help keep our community safe.', '654 Pine St, Springfield', '2024-09-28'),
(3, 'Animal Shelter Volunteering', 'Help care for animals and assist with adoption events at our local animal shelter.', '987 Cedar St, Springfield', '2024-10-05'),
(1, 'Community Music Festival', 'Volunteer to help organize and run our annual community music festival.', '123 Green St, Springfield', '2024-11-10'),
(2, 'Literacy Program', 'Assist with running a literacy program to help adults improve their reading skills.', '456 Elm St, Springfield', '2024-10-30'),
(3, 'Community Recycling Initiative', 'Join us in promoting recycling and sustainability in our community.', '789 Oak St, Springfield', '2024-09-22'),
(1, 'Senior Tech Support', 'Volunteer to help seniors with technology and digital literacy.', '321 Maple St, Springfield', '2024-10-25'),
(2, 'Community Theater Production', 'Help us produce a community theater play to bring people together through the arts.', '654 Pine St, Springfield', '2024-11-15'),
(3, 'Youth Mentorship Program', 'Become a mentor to local youth and help guide them towards a bright future.', '987 Cedar St, Springfield', '2024-09-18'),
(1, 'Community Fitness Classes', 'Lead fitness classes in the park to promote health and wellness in our community.', '123 Green St, Springfield', '2024-10-05'),
(2, 'Neighborhood Beautification', 'Join us in beautifying our neighborhood through planting flowers and cleaning up public spaces.', '456 Elm St, Springfield', '2024-09-30'),
(3, 'Community Book Club', 'Help organize and run a community book club to encourage reading and discussion among residents.', '789 Oak St, Springfield', '2024-11-20');
