import { db } from './db.js';

const getAllCategories = async() => {
    const query = ` select * FROM categories; `;
    const result = await db.query(query);
    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = ` select * FROM categories WHERE category_id = $1; `;
    const result = await db.query(query, [categoryId]);
    return result.rows[0];
}

const getProjectsByCategoryId = async (categoryId) => {
    const query = ` select p.* 
         from categories c JOIN  project_category pc
        on c.category_id = pc.category_id
        LEFT JOIN projects p on p.project_id = pc.project_id 
        WHERE c.category_id = $1; `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
}

export { getAllCategories, getCategoryById, getProjectsByCategoryId };
