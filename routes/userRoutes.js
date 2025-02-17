const express = require('express');
const router = express.Router();
const user = require('./../models/user');
const { route } = require('./userRoutes');

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newUser = new user(data);
        const response = await newUser.save();

        console.log('data seved');
        res.status(200).json(response);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }
})

router.get('/', async (req, res) => {
    try {
        const getData = await user.find();
        console.log('data fetched');
        res.status(200).json(getData);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }

})

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateUserData = req.body;
        const response = await user.findByIdAndUpdate(userId, updateUserData, {
            new: true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error:'User is not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }
})
router.delete('/:id', async (req , res)=>{
    try{
        const userId = req.params.id;
        const response = await user.findByIdAndDelete(userId);
        if(!response) {
            return res.status(404).json({ error: 'Person is not found' });
        }
        console.log('data delete');
        res.status(200).json({ error: 'User Deleted Successfully' })
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }
})
module.exports = router;