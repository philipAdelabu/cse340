import { db } from './db.js';

export const getAllCategories = async() => {
    const query = ` select c.*, p.title, p.description 
         from categories c JOIN  project_category pc
        on c.category_id = pc.category_id 
        LEFT JOIN projects p on p.project_id = pc.project_id; `;
    const result = await db.query(query);
    return result.rows;
}
