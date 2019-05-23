import Db from '../db/db';
import totalAmountdetail from '../helpers/Totalamount';

class LoanModel {
  constructor(payload = null) {
    this.payload = payload;
    this.result = null;
  }
  static async requestLoan({
        requestedloan,
        tenor,
				firstname,
				lastname,
				email,
				dateRequested
  }) {
    const amount = parseFloat(requestedloan,10);
    const loanTenor = parseFloat(tenor, 10);
    const calculateTotalamount = totalAmountdetail.totalAmountdata(amount, loanTenor);
    const sqlInsert = 'INSERT INTO loans (usermail,firstname,lastname, requestedOn, status, repaid, tenor, principalAmount, paymentInstallment, totalAmounttopay, intrestRate) VALUES($1, $2, $3, $4, $5 ,$6 ,$7 ,$8 ,$9, $10, $11)  returning *;';
    const values = [email, firstname, lastname, dateRequested, 'pending', false, calculateTotalamount.tenor, amount, calculateTotalamount.installmentAmount, calculateTotalamount.totalamounttoPay, calculateTotalamount.interestRate];
    const {rows} = await Db.query(sqlInsert, values);
    this.result = rows;
    return true;
  }

  static async findMail(usermail) {
    const sql = `SELECT * FROM loans WHERE usermail='${usermail}'`;
    const {rows}  = await Db.query(sql);
    if (rows.length === 0) {
      return false;
    }
    const result = rows[0];
    return result;
  }

  static async allLoanapplications() {
    const {
      rows
    } = await Db.query('SELECT * FROM loans');
    if (rows.length == 0) {
      return false;
    }
    return true
  }
  
  static async loanAccepted(status, loanid){
    const rowData = 'UPDATE loans SET status = ($1) WHERE loanid = ($2) returning *;';
    const valuesUpdate = [status, loanid];
    const { rows } = await Db.query(rowData, valuesUpdate);
    return true;
  }

}
export default LoanModel;
