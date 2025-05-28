const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const registerController = async(req , res)=>{
    const {name , email , password} = req.body
    const user = await User.findOne({email})
   try{ if(user){
        return res.status(400).json({message : "User already exists" })
    }
   
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save()
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

const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });

    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)

        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });

  } catch (error) {
    console.log(error);

    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });

  }
};

module.exports = {
    registerController,
    loginController
}