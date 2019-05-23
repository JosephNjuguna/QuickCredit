import express from 'express';
import loans from '../controllers/Loans';
import validation from '../middleware/validations';
import checkAuth from '../middleware/auth';

const route = express.Router();

route.post('/requestloan', checkAuth.checkUser, validation.validateLoan, validation.validateexistingloanrequest, loans.requestLoan);
route.get('/loans', checkAuth.checkAdmin, loans.allLoanapplications);
route.get('/loans', checkAuth.checkAdmin, loans.loanRepaidstatus);
route.get('/loan/:loan_id', checkAuth.checkAdmin,  validation.validateID, loans.oneLoanapplication);
route.get('/viewloanrequest', checkAuth.checkUser, loans.userloanStatus);
route.patch('/loan/:loan_id', checkAuth.checkAdmin, loans.acceptloanapplication);

export default route;
