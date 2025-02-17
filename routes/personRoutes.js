const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body //assuming the request body the person data

        //createa new person document using mongoose model

        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save()
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }
})


//Get method to get the person

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }
})

router.get('/:WorkType', async (req, res) => {
    try {
        const workType = req.params.WorkType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {

            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new :true,
            runValidators:true,
        })


        if (!response) {
            return res.status(404).json({ error: 'Person is not found' });
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }
})



router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extract the person's ID from the URL parameter

        //Assuming you have a parson model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person is not found' });

        }
        console.log('data delete');
        res.status(200).json({ error: 'Person Deleted Successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal serve error' })
    }

})

module.exports = router;
