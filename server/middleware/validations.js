import reqResponses from '../helpers/Responses';
import Usermodel from '../models/Users';

class Validations {
  
  static validatesignup(req, res, next) {
    try {
      const {
        firstname,
        lastname,
        address,
        email,
        password
      } = req.body;

      let re;

      if (!firstname || !lastname || !address || !email || !password) {
        return reqResponses.handleError(400, 'Ensure you have: Firstname, Lastname, address, email and password fields filled', res);
      }
      if (firstname) {
        re = /[a-zA-Z]{3,}/;
        if (!re.test(firstname)) reqResponses.handleError(400, 'enter valid firstname', res);
      }
      if (lastname) {
        re = /[a-zA-Z]{3,}/;
        if (!re.test(lastname)) reqResponses.handleError(400, 'enter valid lastname', res);
      }
      if (address) {
        re = /[a-zA-Z]{3,}_*[0-9_]*[a-zA-Z]*_*/;
        if (!re.test(address)) reqResponses.handleError(400, 'address validation failed', res);
      }
      if (email) {
        re = /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/;
        if (!re.test(email)) reqResponses.handleError(400, 'enter valid email e.g user@gmail.com', res);
      }
      if (password) {
        re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{7,}$/;
        if (!re.test(password)) reqResponses.handleError(400, 'enter valid password. should be 7 character and more and contain letters and numbers', res);
      }
      next();
    } catch (error) {
      return reqResponses.handleError(error.toString(), 500, res);
    }
  }

  static async validatenewEmail(req, res, next) {
    try {
      const { email } = req.body;
      const checkEmail = await Usermodel.findByEmail(email);
      if (checkEmail) {
        return reqResponses.handleError(409, 'Users email already exist', res);
      }
      next();
    } catch (error) {
      reqResponses.handleError(500, error.toString(), res);
    }
  }

}
export default Validations;
