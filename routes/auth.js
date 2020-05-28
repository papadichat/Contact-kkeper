const express = require('express');
const router =express.Router();
const User =require('../models/User')
const jwt =require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcryptjs');
const auth=require('../middelware/auth')
const { check, validationResult } = require('express-validator');


router.get('/',auth, async (req,res) =>{
    try {
        const user= await User.findById(req.user.id).select('-password');
        res.json(user);

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')  
    }
});

router.post('/',[
    check('email','Give a valid email').isEmail(),
    check('password','Provide password').isLength({min:6})
], async (req,res) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:'invalid credentials'});   
        }

        const payload={
            user:{
                id:user.id
            }
        };

        jwt.sign(payload,config.get("jwtSecret"),{
            expiresIn:360000
        },(err,token) =>{
            if(err) throw err;
            res.json({token});
        })


    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')

    }
    
});


module.exports = router;