const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  merchant: {
    type: String,
    required: false
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    index: true,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Expense', expenseSchema)
