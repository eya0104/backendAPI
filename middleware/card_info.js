const { body, validationResult } = require('express-validator');
const CardInfo = require('../models/card_info');
const cardInfoService = require('../services/card_info.service');

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
};

const validateCardInfo = [
  body('cardNumber').isLength({ min: 16, max: 16 }).withMessage('Card number must be 16 digits'),
  body('type').isIn(['Visa', 'MasterCard', 'Amex']).withMessage('Invalid card type'),
  body('expirationDate').matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).withMessage('Invalid expiration date'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const getAllCardInfo = async (req, res, next) => {
  try {
    const cardInfo = await cardInfoService.getAllCardInfo();
    res.json(cardInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCardInfoById = async (req, res, next) => {
  try {
    const cardInfo = await cardInfoService.getCardInfoById(req.params.id);
    if (cardInfo) {
      res.json(cardInfo);
    } else {
      res.status(404).json({ message: 'Card info not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCardInfoById = async (req, res, next) => {
  try {
    const updatedCardInfo = await cardInfoService.updateCardInfoById(req.params.id, req.body, { new: true });
    if (updatedCardInfo) {
      res.json(updatedCardInfo);
    } else {
      res.status(404).json({ message: 'Card info not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCardInfoById = async (req, res, next) => {
  try {
    const deletedCardInfo = await cardInfoService.deleteCardInfoById(req.params.id);
    if (deletedCardInfo) {
      res.json({ message: 'Card info deleted successfully' });
    } else {
      res.status(404).json({ message: 'Card info not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  logger,
  errorHandler,
  validateCardInfo,
  getAllCardInfo,
  getCardInfoById,
  updateCardInfoById,
  deleteCardInfoById
};
