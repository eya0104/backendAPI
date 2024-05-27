const express = require('express');
const router = express.Router();
const cardInfoController = require('../controllers/card_info');
const CardInfo = require('../models/card_info');
const middleware = require('../middleware/card_info')



// Middleware example
router.use(middleware.validateCardInfo);


//create new card info
router.post('/create', async (req, res) => {
  try {
    const cardInfo = new CardInfo({
      cardNumber: req.body.cardNumber,
      type: req.body.type,
      expirationDate: req.body.expirationDate,
    });

    await cardInfo.save();
    res.status(201).json({ message: 'Card info created successfully', cardInfo });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create card info', error });
  }
});


//get card info
router.get('/get', async (req, res) => {
  try {
    const cardInfos = await CardInfo.find();
    res.status(200).json(cardInfos);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch card info', error });
  }
});


//get by id card info
router.get('/getOne/:id', async (req, res) => {
  try {
    const cardInfo = await CardInfo.findById(req.params.id);
    res.status(200).json(cardInfo);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch card info', error });
  }
});


//update by id card info
router.patch('/update/:id', async (req, res) => {
  try {
    const cardInfo = await CardInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Card info updated successfully', cardInfo });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update card info', error });
  }
});


//delete card info
router.delete('/delete/:id', async (req, res) => {
  try {
    await CardInfo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Card info deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete card info', error });
  }
});

module.exports = router;

