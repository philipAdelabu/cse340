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

const getCategoryByProjectId = async (projectId) => {
    const query = ` select c.* from categories c 
    JOIN project_category pc ON c.category_id = pc.category_id
     WHERE pc.project_id = $1; `;
    const result = await db.query(query, [projectId]);
    return result.rows;
}


const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING category_id;
    `;
    const result = await db.query(query, [name]);
    if(result.rows.length === 0) {
        throw new Error('Failed to create category');
    } ;  
    return result.rows[0].category_id;
}

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;
    const result = await db.query(query, [name, categoryId]);    
    if(result.rows.length === 0) {
        throw new Error('Failed to update category');
    } 
    return result.rows[0].category_id;
}


export { 
        getAllCategories,
        getCategoryById,
        getProjectsByCategoryId, 
        getCategoryByProjectId,
        assignCategoryToProject, 
        updateCategoryAssignments,
        updateCategory,
        createCategory,
     };
