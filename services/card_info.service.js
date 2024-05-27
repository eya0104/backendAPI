const CardInfo = require('../models/card_info');

const createCardInfo = async (cardInfo) => {
  return await cardInfo.save();
};

const getAllCardInfo = async () => {
  return await CardInfo.find();
};

const getCardInfoById = async (id) => {
  return await CardInfo.findById(id);
};

const updateCardInfoById = async (id, updateData) => {
  return await CardInfo.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCardInfoById = async (id) => {
  return await CardInfo.findByIdAndDelete(id);
};

module.exports = {
  createCardInfo,
  getAllCardInfo,
  getCardInfoById,
  updateCardInfoById,
  deleteCardInfoById
};
