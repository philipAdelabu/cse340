import {  getUpcomingProjects, getProjectDetailsById, getCategoriesByProjectId } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const  NUMBER_OF_UPCOMING_PROJECTS = 5;
    const projects = await getUpcomingProjects( NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', {title, projects});
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetailsById(projectId);
    if (!project) {
        return res.status(404).send('Project not found');
    }
    const categories = await getCategoriesByProjectId(projectId);
    const title = project.title;
    res.render('project', {title, project, categories});
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    // Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
}
    
export { showProjectsPage, 
     showProjectDetailsPage,
     processNewProjectForm,
     showNewProjectForm,
     };