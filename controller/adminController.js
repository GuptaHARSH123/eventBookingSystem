const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const registerAdminController = async(req , res)=>{
    const {name , email , password} = req.body
    const admin = await Admin.findOne({email})
   try{ if(admin){
        return res.status(400).json({message : "Admin already exists" })
    }
   
    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashPassword });
    await newAdmin.save()
    res.status(201).send(
        {
            message : "User created successfully",
            sucess :true
        }
    )

   }
   catch(err){
    res.status(400).send({
        message : "Error creating user",
        sucess : false
    })

   }

}

const loginAdminController = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });

    }
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!isMatch) {
      return res
        .status(200)

        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });

  } catch (error) {
    console.log(error);

    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });

  }
};

module.exports = {
    registerAdminController,
    loginAdminController
}