import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Db from '../db/db';
import total from '../helpers/Totalamount';
import assert, { equal } from 'assert';
import dotenv from 'dotenv';

dotenv.config();

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let userToken, adminToken;
const wrongId = 1232;

describe('/LOAN', () => {

  before('generate JWT', (done) => {
    adminToken = jwt.sign({
      email: 'admin123@gmail.com',
      firstname: 'main',
      lastname: 'admin',
      address: 'database',
    },
    process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    userToken = jwt.sign({
      email: 'test1@mail.com',
      firstname: 'Joseph',
      lastname: 'Njuguna',
      address: 'Kenya',
    },
    process.env.JWT_KEY, {
      expiresIn: '1h',
    });
    done();
  });

  after('after all test', (done) => {
    Db.query('DELETE FROM loans');
    done();
  });

  describe('/POST user request loan', () => {

    it('should check loan field is not entered', (done) => {
      chai.request(app)
        .post('/api/v2/requestloan')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          '': 10000,
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should check loan amount is not entered', (done) => {
      chai.request(app)
        .post('/api/v2/requestloan')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          amount: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          if (err) return done();
          done();
        });
    });

    it('should check successful loan request', (done) => {
      chai.request(app)
        .post('/api/v2/requestloan')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          amount: 2000
        })
        .end((err, res) => {
          res.should.have.status(200);
          if (err) return done();
          done();
        });
    });

    it('should check user has loan request available', (done) => {
      chai.request(app)
        .post('/api/v2/requestloan')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          amount: 10000,
        })
        .end((err, res) => {
          res.should.have.status(409);
          if (err) return done();
          done();
        });
    });

  });
  describe('/CALCULATE TOTAL AMOUNT',(done)=>{
    it('should calculate the Total amount payable when user enters loan request', () => {
      assert.equal(2300, total.totalAmountdata(2000).totalamounttoPay);
      expect(total.totalAmountdata(2000)).to.be.an('Object');
    });
  });
  
})