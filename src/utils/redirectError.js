import { validationResult } from 'express-validator';



const redirectError  =  (req, res, redirectPage) => {
     const validation = validationResult(req);
    if(!validation.isEmpty()){
            validation.array().forEach((error) => {
                   req.flash('error', error.msg);
            });
            res.redirect(redirectPage);
          }
    }
 
 
 
 export  { redirectError }