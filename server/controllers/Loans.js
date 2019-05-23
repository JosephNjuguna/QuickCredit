import jwt from 'jsonwebtoken';
import Models from '../models/Loans';
import userDate from '../helpers/Date';
import reqResponses from '../helpers/Responses';

const requestedDate = userDate.date();

class Loans {

	static async requestLoan(req, res) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_KEY);
			req.userData = decoded;
			const requestedloan = req.body.amount;
			const tenor = req.body.tenor;			
			const { firstname, lastname, email } = req.userData;
			const dateRequested = requestedDate;
			
			const loanModel = await Models.requestLoan({
				requestedloan,
				tenor,
				firstname,
				lastname,
				email,
				dateRequested
			});
			return reqResponses.handleSuccess(200, 'Loan request successful', loanModel, res);
		} catch (error) {
			reqResponses.handleError(500, error.toString(), res);
		}
	}

	static async loanRepaidstatus(req, res) {
		try {
			const { status,repaid } = req.query;
			const loanstatus = await Models.loanRepaidstatus(status, repaid);
			if (!loanstatus) {
				return reqResponses.handleError(404, 'No loans records found', res);
			}
			reqResponses.handleSuccess(200, 'loan status', loanstatus.result, res);
		} catch (error) {
			console.log(error);
			reqResponses.handleError(500, error.toString(), res);
		}
	}

	
}

export default Loans;
