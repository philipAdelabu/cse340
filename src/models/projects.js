import { db } from './db.js';

export const getAllProjects = async() => {
    const query = `
        SELECT o.organization_id, o.name, o.description, o.contact_email, o.logo_filename, 
        p.project_id, p.title, p.description AS project_description, P.date, p.location
      FROM organizations o LEFT JOIN projects  p ON o.organization_id = p.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}