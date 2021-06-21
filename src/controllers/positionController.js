const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const Position = require('../models/positionModel');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createPosition = catchAsync(async (req, res, next) => {
  const token = req.body.token || req.cookies.jwt;
  if (!token) {
    next(new AppError('You are not logged in!', 403));
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  req.body.owner = decoded.id;
  req.body.originalAmt =
    req.body.quantity * req.body.buyPrice * req.body.usdCourse;

  const doc = await Position.create(req.body);
  await User.findByIdAndUpdate(req.body.owner, {
    $push: { positions: doc._id },
  });
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getPosition = factory.getOne(Position);
exports.getAllPositions = factory.getAll(Position);
exports.updatePosition = factory.updateOne(Position);
exports.deletePosition = catchAsync(async (req, res, next) => {
  const doc = await Position.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  if (doc.owner) {
    await User.findByIdAndUpdate(doc.owner, {
      $pull: { positions: doc._id },
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
