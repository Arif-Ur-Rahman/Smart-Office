const Member = require('../models/member.model');
const User = require('../models/employee.model');

const checkRole =  async (req, res, next) => {
  const memberId =  req.admin; 
  console.log(memberId)

  try {

    let token = req.header('Authorization');

      token = token.split(" ")[1].trim();
      const decode = await jwt.verify(
        token,
        config.jwt.jwt_secret
      );
      
      const { id, admin, designation, role } = decode;
      req.id = id;
      req.admin = admin;
      req.designation = designation;



        console.log("Id is"+ req.id)

    const member = await Member.findById("6451e5bfbb1f1d90085509d7");
    console.log(member)
    // const member = "6450c6911b4da201fbe619de"

    // if (!member) {
    //   return res.status(401).json({ message: 'Unauthorized d' });
    // }

    if (member.role !== 'Sub Leader' || member.role !== 'Tech Manager') {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error'});
  }
}

module.exports = {
    checkRole
}