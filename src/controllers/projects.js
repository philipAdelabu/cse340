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
    
export { showProjectsPage, showProjectDetailsPage };