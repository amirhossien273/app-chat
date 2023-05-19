const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {

    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
};

const registerUser = async (req, res) => {

    const {name, email, password} = req.body;
    console.log(req.body);

   try {

       if(!name || !email || !password) return res.status(400).json("All filds are required");
 
        let user = await userModel.findOne({email});
    
        if(user) return res.status(400).json("User with the given email aleardy exist...");
        
       if(validator.isEmail(email)) return res.status(400).json("Email must be a varid email...");
        
       if(validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password...");
        
        user = new userModel({name, email, password});
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
    
        const token = createToken(user._id);
    
        return res.status(200).json({_id: user._id, name, email, token});

   }catch(error) {

       return res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {

    const {email, password} = req.body;

    try {

        if(!email || !password) return res.status(400).json("All filds are required");

        let user = await userModel.findOne({email});
    
        if(!user) return res.status(400).json("Invalid eamil or password...");
        
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) return res.status(400).json("Invalid eamil or password...");

        const token = createToken(user._id);

        return res.status(200).json({_id: user._id, name: user.name, email, token});

    }catch(error) {

        return res.status(500).json(error);
     }
};

const findUser = async (req, res) => {

    const userId = req.params.userId;

    try{

        let user = await userModel.findById(userId);

        if(!user) return res.status(400).json("not found user");

        return res.status(200).json(user);

    }catch(error) {

        return res.status(500).json(error);
     }
};

const getUsers = async (req, res) => {

    try{

        let users = await userModel.find();

        return res.status(200).json(users);

    }catch(error) {

        return res.status(500).json(error);
     }
};

module.exports = {registerUser, loginUser, findUser, getUsers};