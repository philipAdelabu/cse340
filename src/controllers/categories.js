// Import any needed model functions
import { createCategory, updateCategory, getAllCategories ,
     getCategoryById, getProjectsByCategoryId, getCategoryByProjectId, updateCategoryAssignments} from '../models/categories.js';
import { getProjectDetailsById } from '../models/projects.js';
import { redirectError } from '../utils/redirectError.js';
import { validationResult } from 'express-validator';



// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
}; 



const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Details category';

    res.render('category', { title, category, projects });
}

const showAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetailsById(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoryByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = async (req, res) => {
     const title = "Add a new category";
     res.render('new-category', {title});
}

const processNewCategoryform = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        validation.array().forEach( (error) => {
            req.flash('error', error.msg);
        });
        res.redirect('new-category');
    }
    const { name } = req.body;

    const categoryId = await createCategory(name);
    if(!categoryId){
        req.flash('error', 'Failed to create a new project category.');
         res.redirect('/new-category');
    }
    req.flash('success', 'New project category successfully created.')
    res.redirect(`/category/${categoryId}`);
   
}

const showEditCategoryForm = async (req, res) => {
  
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    
    if(!category){
      return   res.status(404).send('Category not found');
    }

    const title = "Edit project category";
    res.render('edit-category', {title, category});
}


const processEditCategoryForm = async (req, res) => {
       redirectError(req, res, `/edit-category/${req.params.id}`);

       const categoryId = req.params.id;
       const { name } = req.body;

       const result = await updateCategory(categoryId, name);
       if(!result){
          res.redirect(`/edit-category/${categoryId}`);
       }
       req.flash('success', 'The category was successfully updated.');
       res.redirect(`/category/${categoryId}`);
}

// Export any controller functions
export { 
    showCategoriesPage, 
    showCategoryDetailsPage ,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm, 
    processNewCategoryform,
    showEditCategoryForm, 
    processEditCategoryForm,
};