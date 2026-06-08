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


import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, showDashboard, viewUsers} from './controllers/users.js';
import { requireLogin, requireRole } from './middleware/index.js';

import { volunteerForProjectController, removeVolunteerFromProjectController } from './controllers/volunteers.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', [ 
      
], showCategoryDetailsPage);

router.get('/new-organization',requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization',requireRole('admin'), organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm); // Route to display the edit organization form
router.post('/edit-organization/:id',
              requireRole('admin'),
              organizationValidation, 
              processEditOrganizationForm); // Route to handle the edit organization form submission

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Routes for editing a project would go here (not implemented in this snippet)     
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Routes for category 
router.get('/new-category', requireRole('admin'), showNewCategoryForm);

router.post('/new-category', requireRole('admin'), [
      body('name').trim().notEmpty().isLength({min: 3, max: 100}),
      ], processNewCategoryform);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

router.post('/edit-category/:id', requireRole('admin'), [body('name').trim().notEmpty().isLength({min: 3, max: 100})], 
     processEditCategoryForm );


     // User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);


// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

router.get('/users', requireRole('admin'), viewUsers); // Route to view all users (admin only)


router.get('/volunteer/:projectId', requireLogin, volunteerForProjectController);
router.get('/remove-volunteer/:projectId/:volunteerId', requireLogin, removeVolunteerFromProjectController);

// error-handling routes
router.get('/test-error', testErrorPage);



export default router; 
