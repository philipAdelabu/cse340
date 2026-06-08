import { db } from './db.js';

const volunteerForProject = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteers (user_id, project_id) 
        VALUES ($1, $2) 
        RETURNING volunteer_id
    `;
    const queryParams = [userId, projectId];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to volunteer for project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log(`User ${userId} volunteered for project ${projectId} with volunteer ID:`, result.rows[0].volunteer_id);
    }

    return result.rows[0].volunteer_id;
};



const removeVolunteerFromProject = async (volunteerId) => {
    const query = `
        DELETE FROM volunteers 
        WHERE volunteer_id = $1
    `;
    const queryParams = [volunteerId];
    
    await db.query(query, queryParams);
};

const getProjectsVolunteeredByUser = async (userId) => {
    const query = `
        SELECT p.project_id, p.title, v.volunteered_at, v.volunteer_id, v.user_id
        FROM volunteers v
        JOIN projects p ON v.project_id = p.project_id
        WHERE v.user_id = $1
    `;
    const queryParams = [userId];
    
    const result = await db.query(query, queryParams);
    if(result.rows.length === 0) {
        return []
    } 
    return result.rows; // Return an array of projects the user has volunteered for
};

const getProjectVoluneer = async (projectId, userId) => {
    const query = `
        SELECT u.user_id, u.name, u.email, v.volunteered_at, v.volunteer_id
        FROM volunteers v
        JOIN users u ON v.user_id = u.user_id
        WHERE v.project_id = $1 AND v.user_id = $2
    `;
    const queryParams = [projectId, userId];
    
    const result = await db.query(query, queryParams);

    return result.rows[0]; // Return an array of volunteers for the project
};

export { volunteerForProject, removeVolunteerFromProject, getProjectsVolunteeredByUser, getProjectVoluneer };


