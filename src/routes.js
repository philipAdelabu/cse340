import express from 'express';
import { body } from 'express-validator';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage,
     showNewOrganizationForm, processEditOrganizationForm,
     processNewOrganizationForm, showEditOrganizationForm,
     organizationValidation } from './controllers/organizations.js';
import { showProjectsPage,

      showProjectDetailsPage, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm, projectValidation } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, 
      showAssignCategoriesForm, processAssignCategoriesForm , 
       showNewCategoryForm, processNewCategoryform, showEditCategoryForm, processEditCategoryForm} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', [ 
      
], showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', showEditOrganizationForm); // Route to display the edit organization form
router.post('/edit-organization/:id',
              organizationValidation, 
              processEditOrganizationForm); // Route to handle the edit organization form submission

// Route for new project page
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Routes for editing a project would go here (not implemented in this snippet)     
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Routes for category 
router.get('/new-category', showNewCategoryForm);

router.post('/new-category',  [
      body('name').trim().notEmpty().isLength({min: 3, max: 100}),
      ], processNewCategoryform);

router.get('/edit-category/:id', showEditCategoryForm);

router.post('/edit-category/:id', [body('name').trim().notEmpty().isLength({min: 3, max: 100})],
     processEditCategoryForm );




// error-handling routes
router.get('/test-error', testErrorPage);



export default router; 
