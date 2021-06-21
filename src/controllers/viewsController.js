const catchAsync = require('../utils/catchAsync');

//Business logic for counting user's positions sum
const checkSum = function (pos) {
  // Count user total money
  let sumBuy = 0;
  let sumBuyDollars = 0;
  pos.forEach((p) => {
    sumBuy += p.buyPrice * p.quantity * p.usdCourse;
    sumBuyDollars += p.buyPrice * p.quantity;
  });
  sumBuy = Math.round(sumBuy * 10000) / 10000;
  sumBuyDollars = Math.round(sumBuyDollars * 10000) / 10000;

  let sumCurrent = 0;
  try {
    pos.forEach((p) => {
      if (p.currentAmt == null) {
        sumCurrent = NaN;
      } else {
        sumCurrent += p.currentAmt;
      }
    });
    sumCurrent = Math.round(sumCurrent * 10000) / 10000;
  } catch (e) {
    sumCurrent = '--';
  }

  let change;
  if (Number.isNaN(sumCurrent)) {
    sumCurrent = '--';
    change = '--';
  } else {
    change = Math.round((sumCurrent / sumBuy - 1) * 10000) / 100;
  }
  return { sumBuy, sumCurrent, change, sumBuyDollars };
};

exports.getError = catchAsync(async (req, res, next) => {
  res.status(404).render('404', {});
});

exports.getHome = catchAsync(async (req, res, next) => {
  const { user } = req;
  const pos = user.positions;
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const types = [
    'Stock',
    'Equity',
    'Bond',
    'Metals',
    'Futures',
    'ETFs',
  ];

  const { sumBuy, sumCurrent, change, sumBuyDollars } = checkSum(pos);

  res.status(200).render('index', {
    user,
    sumBuy,
    sumCurrent,
    sumBuyDollars,
    change,
    months,
    types,
  });
});

exports.getSign = catchAsync(async (req, res, next) => {
  res.status(200).render('sign', {});
});

exports.getMain = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt) {
    res.status(200).render('sign', {});
  } else {
    res.redirect('/home');
  }
});
