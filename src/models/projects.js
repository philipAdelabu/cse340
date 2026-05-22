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

const getProjectDetails = async (projectId) => {
    const projects = await getAllProjects();
    return projects.find(p => p.project_id === parseInt(projectId));
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

export { getAllProjects, getProjectsByOrganizationId, getProjectDetails, getUpcomingProjects };
