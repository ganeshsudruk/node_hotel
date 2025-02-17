const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.post('/', async (req, res) => {
  try {
    const item = req.body;
    const newMenuItem = new MenuItem(item);

    const response = await newMenuItem.save()

    console.log('data seved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal serve error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const item = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(item);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'internal serve error' })
  }
})



router.get('/:WorkType', async (req, res) => {
  try {
    const workType = req.params.WorkType;
    if (workType == 'Sweet' || workType == 'Spicy' || workType == 'Sour') {

      const response = await MenuItem.find({ taste: workType });
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
      const menuItemId = req.params.id;
      const updatedMenuData = req.body;

      const response = await MenuItem.findByIdAndUpdate(menuItemId,updatedMenuData ,{
        new:true,
        runValidators:true,
      })

      if (!response) {
          return res.status(404).json({ error: 'Menu is not found' });
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
      const menuItemId = req.params.id; //Extract the person's ID from the URL parameter

      //Assuming you have a parson model
      const response = await MenuItem.findByIdAndDelete(menuItemId);
      if (!response) {
          return res.status(404).json({ error: 'Menu is not found' });

      }
      console.log('data delete');
      res.status(200).json({ error: 'Menu Deleted Successfully' })
  } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'internal serve error' })
  }

})

module.exports = router;