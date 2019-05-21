import EncryptData from '../helpers/Encrypt';
import dotenv from 'dotenv';

dotenv.config();

const hashedPassword = EncryptData.generateHash(process.env.password);

const users = {
  user1: {
    email: 'test2@mail.com',
    firstname: '',
    lastname: 'testlastname',
    password: hashedPassword,
    address: 'nairobi',
  },
  user2: {
    email: 'test2@mail.com',
    firstname: 'testfirstname',
    lastname: '',
    password: hashedPassword,
    address: 'nairobi',
  },
  user3: {
    email: '',
    firstname: 'testfirstname',
    lastname: 'testlastname',
    password: hashedPassword,
    address: 'nairobi',
  },
  user4: {
    email: 'test2@mail.com',
    firstname: 'testfirstname',
    lastname: 'testlastname',
    password: '',
    address: 'nairobi',
  },
  user5: {
    email: 'test2@mail.com',
    firstname: 'testfirstname',
    lastname: 'testlastname',
    password: hashedPassword,
    address: 'nairobi',
  },
};

export default users;
