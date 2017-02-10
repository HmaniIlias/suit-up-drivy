/*eslint-disable space-unary-ops*/
'use strict';

var DRIVY = DRIVY || {};

DRIVY = (function namespace () {
  var MS_PER_DAY = 1000 * 60 * 60 * 24;

    /**
   * Display Cars
   *
   * @return {Object}
   */
   var displayCar = function displayCar (){
      var car = [{
      'id': 'p306',
      'name': 'Peugeot 306',
      'img': '../public/images/peugeot-306.jpg',
      'pricePerDay': 20,
      'pricePerKm': 0.10
    }, {
      'id': 'rr-sport',
      'name': 'Renault r.s',
      'img': '../public/images/r-sport.jpg',
      'pricePerDay': 60,
      'pricePerKm': 0.30
    }, {
      'id': 'p-boxster',
      'name': 'Peugeot box',
      'img': '../public/images/p-boxter.jpg',
      'pricePerDay': 100,
      'pricePerKm': 0.45
    }];

    return car;
   };

  /**
   * Get car information
   *
   * @return {Object}
   */
  var getCar = function getCar (id) {
    var cars = displayCar();
    var index = 0;

    for (var i = 0; i <= cars.lentgh; i++) {
      if (id == cars[i].id) {
        index = i;
      };
    };

    return {
      'model': cars[index].name,
      'pricePerDay': cars[index].pricePerDay,
      'pricePerKm': cars[index].pricePerKm
    };
  };

  /**
   * Number of rental days from begin and end date
   *
   * @param  {Date} begin
   * @param  {Date} end
   * @return {Integer}
   */
  var getDays = function getDays (begin, end) {
    begin = new Date(begin).getTime();
    end = new Date(end).getTime();

    return Math.floor((end - begin) / MS_PER_DAY) + 1;
  };

  /**
   * Get discount percent according days
   *
   * @param  {Number} days
   * @return {Number}
   */
  var discount = function discount (days) {
    if (days > 10) {
      return 0.5;
    }

    if (days > 4) {
      return 0.3;
    }

    if (days > 1) {
      return 0.1;
    }

    return 0;
  };

  /**
   * Compute commission
   *
   * @param  {Number} price
   * @param  {Number} days
   * @return {Object}
   */
  var rantalCommission = function rantalCommission (price, days) {
    var value = ~~(price * 0.3).toFixed(2);
    var insurance = ~~(value * 0.5).toFixed(2);
    var assistance = 1 * days;

    return {
      'value': value,
      'insurance': insurance,
      'assistance': assistance,
      'drivy': ~~(value - insurance - assistance).toFixed(2)
    };
  };

  /**
   * Compute the rental price
   *
   * @param  {Object} car
   * @param  {Date} begin
   * @param  {Date} end
   * @param  {String} distance
   * @return {String} price
   */
  var rentalPrice = function rentalPrice (car, days, distance) {
    var percent = discount(days);
    var pricePerDay = car.pricePerDay - car.pricePerDay * percent;

    return ~~(days * pricePerDay + distance * car.pricePerKm).toFixed(2);
  };

  /**
   * Pay each actors
   *
   * @param  {Object} car
   * @param  {Date} begin
   * @param  {Dare} end
   * @param  {String} distance
   * @param  {Boolean} option
   * @return {Object}
   */
  var payActors = function payActors (car, begin, end, distance, option) {
    option = option || false;

    var days = getDays(begin, end);
    var price = rentalPrice(car, days, distance);
    var commission = rantalCommission(price, days);
    var deductibleOption = option ? 4 * days : 0;

    var actors = [{
      'who': 'driver',
      'isDriver': true,
      'type': 'debit',
      'amount': price + deductibleOption
    }, {
      'who': 'owner',
      'type': 'credit',
      'amount': price - commission.value
    }, {
      'who': 'insurance',
      'type': 'credit',
      'amount': commission.insurance
    }, {
      'who': 'assistance',
      'type': 'credit',
      'amount': commission.assistance
    }, {
      'who': 'drivy',
      'type': 'credit',
      'amount': commission.drivy + deductibleOption
    }];

    return actors;
  };

  return {
    'getCar': getCar,
    'payActors': payActors,
    'displayCar': displayCar
  };
}());
