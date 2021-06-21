const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Position must have owner'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: ['Stock', 'Equity', 'Bond', 'Metals', 'Futures', 'ETFs'],
    required: [
      true,
      'Position must have a type: Stock, Equity, Bond, Metals, Futures or ETFs',
    ],
  },
  currentAmt: {
    type: Number,
  },
  usdCourse: {
    type: Number,
    default: 27,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  buyPrice: {
    type: Number,
    required: [true, 'Position must have buyPrice'],
  },
  originalAmt: {
    type: Number,
    required: [true, 'Position must have originalAmt'],
  },
  header: {
    type: String,
    required: [true, 'Position must have header'],
    maxLength: 200,
    minlength: 3,
  },
});

positionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'owner',
    select: '-__v -passwordChangedAt -positions',
  });
  next();
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
