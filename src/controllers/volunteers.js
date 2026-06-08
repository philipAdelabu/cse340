import { volunteerForProject, removeVolunteerFromProject, getProjectsVolunteeredByUser } from "../models/volunteers.js";


const volunteerForProjectController = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    try {
        await volunteerForProject(userId, projectId);
        req.flash('success', 'You have successfully volunteered for this project!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error volunteering for project:', error);
        req.flash('error', 'An error occurred while volunteering. Please try again.');
        res.redirect(`/project/${projectId}`);
    }
};

const removeVolunteerFromProjectController = async (req, res) => {
    const volunteerId = req.params.volunteerId;
    const projectId = req.params.projectId; // Assuming projectId is passed as a query parameter
 
    try {
        await removeVolunteerFromProject(volunteerId);
        req.flash('success', 'You have successfully removed yourself from this project.');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error removing volunteer from project:', error);
        req.flash('error', 'An error occurred while removing yourself from the project. Please try again.');
        res.redirect(`/project/${projectId}`);
    }
};

const getProjectsVolunteeredByUserId = async (userId) => {
    try {
        const projects = await getProjectsVolunteeredByUser(userId);
        return projects;
    } catch (error) {
        console.error('Error fetching projects volunteered by user:', error);
        return [];
    }
};

export { volunteerForProjectController, removeVolunteerFromProjectController, getProjectsVolunteeredByUserId };