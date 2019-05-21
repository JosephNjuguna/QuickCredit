import Usermodel from '../models/Users';
import EncryptData from '../helpers/Encrypt';
import userDate from '../helpers/Date';
import reqResponses from '../helpers/Responses';
import Token from '../helpers/Jwt';

const signedupDate = userDate.date();
class Users {
  static async signup(req, res) {
    try {
      const {
        firstname,
        lastname,
        address,
        email,
        password
      } = req.body;
      const hashedPassword = EncryptData.generateHash(password);
      const addUser = await new Usermodel({
        email,
        firstname,
        lastname,
        password: hashedPassword,
        address,
        status: 'unverified',
        isAdmin: false,
        signedupDate
      });
      if (!addUser.signup()) {
        reqResponses.handleError(409, 'Email already in use', res);
      }
      const token = Token.generateToken(email, firstname, lastname, address);
      return reqResponses.handleSignupsuccess(201, 'successfully created account', token, addUser.result, res);
    } catch (error) {
      reqResponses.handleError(500, error.toString(), res);
    }
  }

  static async login(req, res) {
    try {
      const incomingEmail = req.body.email;
      const { password } = req.body;
      const addUser = await Usermodel.login(incomingEmail);
      const { email, firstname, lastname, address} = addUser;
      if (EncryptData.validPassword(password, addUser.userpassword)) {
        const token = Token.generateToken(email, firstname, lastname, address);
        reqResponses.handleSignupsuccess(200, `welcome ${firstname}`, token, addUser, res);
      } else {
        reqResponses.handleError(401, 'Incorrect password', res);
      }
    } catch (error) {
      reqResponses.handleError(500, error.toString(), res);
    }
  }
}
export default Users;
