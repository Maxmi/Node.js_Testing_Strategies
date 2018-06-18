var assert = require('assert');
var MembershipApplication = require('../../../lib/membership_application');

describe("Membership application requirements", () => {
  var validApp;
  
  before(function() {
    //arrange the data here 
    validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });
  });
  
  describe('Application valid if ...', function() {
    it('all validators successful', function() {
      assert(validApp.isValid(), 'Not valid');
    });
    it('email is 4 or more chars and contains @', function() {
      assert(validApp.emailIsValid());
    });
    it('height is between 60 and 75 inches', function() {
      assert(validApp.heightIsValid());
    });
    it('age is between 15 and 100', function() {
      assert(validApp.ageIsValid());
    });
    it('weight is between 100 and 300', function() {
      assert(validApp.weightIsValid());
    });
    it('first and last name are provided', function() {
      assert(validApp.nameIsValid());
    });
  });
  
  describe('Application invalid if ...', () => {
    it('email is 4 chars or less', function() {
      var app = new MembershipApplication({
        email: "dd"
      });
      assert(!app.emailIsValid());
    });
    it('email does not contain an @', function () {
      var app = new MembershipApplication({
        email: "thing:thing.com"
      });
      assert(!app.emailIsValid());
    });
    it('email is omitted', function () {
      var app = new MembershipApplication({});
      assert(!app.emailIsValid());
    });
    it('height is less than 60 inches', function () {
      var app = new MembershipApplication({
        height: 10
      });
      assert(!app.heightIsValid());
    });
    it('height is more than 75 inches', function () {
      var app = new MembershipApplication({
        height: 80
      });
      assert(!app.heightIsValid());
    });
  
  });
  
});