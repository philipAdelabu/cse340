import { db } from './db.js';

const getAllProjects = async() => {
    const query = `
        SELECT o.organization_id, o.name as organization_name, o.description as organization_description, o.contact_email, o.logo_filename, 
        p.project_id, p.title, p.description as project_description, p.date, p.location
      FROM organizations o LEFT JOIN projects  p ON o.organization_id = p.organization_id;
    `;
    const result = await db.query(query);
    return result.rows;
}



const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM projects
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getProjectDetailsById = async (projectId) => {
    const query = ` select p.* , o.name as organization_name, o.organization_id
    FROM projects p LEFT JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1; `;
    const result = await db.query(query, [projectId]);
    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = ` select c.* from categories c 
    JOIN project_category pc ON c.category_id = pc.category_id
     WHERE pc.project_id = $1; `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT prj.project_id, org.organization_id , title,
         prj.description, location, date, org.name as organization_name  
        FROM projects prj
        LEFT JOIN organizations org ON prj.organization_id = org.organization_id
        WHERE date >= CURRENT_DATE
        ORDER BY date
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO projects (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, title, description, location, date, organizationId) => {
    const query = `
      UPDATE projects
      SET title = $1, description = $2, location = $3, date = $4, organization_id = $5
      WHERE project_id = $6 RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId, projectId];
    const result = await db.query(query, queryParams);

    if(result.rows.length === 0) {
        throw new Error('Failed to update project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }
 };

 

export { 
    getAllProjects, 
    getProjectsByOrganizationId, 
    getProjectDetailsById, 
    getUpcomingProjects, 
    getCategoriesByProjectId, 
    createProject,
    updateProject, 
};
