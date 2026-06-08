import {  getUpcomingProjects, 
    getProjectDetailsById, 
    getCategoriesByProjectId, updateProject } from '../models/projects.js';
    import { updateCategoryAssignments } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
import { getAllCategories } from '../models/categories.js';
import { getCategoryByProjectId } from '../models/categories.js';
import { createProject } from '../models/projects.js';
import { validationResult, body } from 'express-validator';
import { redirectError } from '../utils/redirectError.js';
import { getProjectVoluneer } from '../models/volunteers.js';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Project title must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ min: 3, max: 500 })
        .withMessage('Project description must be between 3 and 500 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required'),
    body('date')
        .notEmpty()
        .withMessage('Project date is required')
        .isISO8601()
        .withMessage('Please provide a valid date'),
    body('organizationId')
        .notEmpty()
        .withMessage('Organization selection is required')  

];


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
    
    if(req.session.user) {
        const volunteer = await getProjectVoluneer(projectId, req.session.user.user_id);
        if (volunteer) {
            project.isUserVolunteer = true;
            project.volunteer_id = volunteer.volunteer_id;
        } else {
            project.isUserVolunteer = false;
        }
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
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        validation.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect('/new-project');
    }

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

 const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetailsById(projectId);
    if (!project) {
        return res.status(404).send('Project not found');
    }
    const organizations = await getAllOrganizations();
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    const title = `Edit Project: ${project.title}`;

    res.render('edit-project', { title, project, organizations, categories, assignedCategories });
}

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const { title, description, location, date, organizationId, categoryIds } = req.body;

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        validation.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/edit-project/${projectId}`);
    }

    try {
        await updateProject(projectId, title, description, location, date, organizationId);
       
        req.flash('success', 'Project updated successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error updating project:', error);
        req.flash('error', 'There was an error updating the project.');
        res.redirect(`/edit-project/${projectId}`);
    };
};
    
export { 
        showProjectsPage, 
        showProjectDetailsPage,
       processNewProjectForm,
       showNewProjectForm,
        showEditProjectForm,
        processEditProjectForm,
        projectValidation,
     };