const jwt = require('jsonwebtoken');
const config = require('../../config/development.json');
const User = require('../models/employee.model');
const Member = require('../models/member.model')

module.exports = {
  checkLogin: async (req, res, next) => {
    try {
      let token = req.header('Authorization');
      // let token = req.body.access_token;
      // console.log("Token are:", token);
      if (token) {
        token = token.split(" ")[1].trim();
        const decode = await jwt.verify(
          token,
          config.jwt.jwt_secret
        );
        // console.log("decode are:", decode)
        const { id, admin, designation, role } = decode;
        // console.log("Id from token:", id)
        // console.log("Admin from token:", admin)
        req.id = id;
        req.admin = admin;
        req.designation = designation;

        //edited by Fahim
        req.role = role
        next();
      } else {
        res.status(402).json({
          status: 402,
          success: false,
          message: 'Token unavailable',
          isLogin: false,
        });
      }
    } catch (error) {
      res.status(401).json({
        status: 401,
        success: false,
        message: error.message,
        body: null,
      });
    }
  },

  checkIsAdmin: (req, res, next) => {
    try {
      if (req.admin == true) {
        next();
      } else {
        next('Authentication failure!!!');
      }
    } catch {
      next('Authentication failure!!!');
    }
  },

  checkRole: async (req, res, next) => {
    try {

      let token = req.header('Authorization');
 
        token = token.split(" ")[1].trim();
        const decode = await jwt.verify(
          token,
          config.jwt.jwt_secret
        );
        console.log(decode)
        
        const { id, admin, designation } = decode;
        req.id = id;
        req.admin = admin;
        req.designation = designation;



          console.log("Id is "+ req.id)
         
      const member = await Member.findOne({employee:req.id});
      console.log("The member name role is ", member)
      // const member = "6450c6911b4da201fbe619de"
  
      if (!member) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (member.role !== 'Leader' && member.role !== 'Sub Leader' &&  member.role !== 'Tech Manager'&&  member.role !== 'Software Engineer') {
        return res.status(403).json({ 
          status:403,
          message: 'Access denied' 
        });
      }
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error'});
    }
  }

};
