var results = require('../promise-results');
describe('Promise Results', function() {
  it('Resolves a valid array', function() {
    return results([2,34]).should.eventually.eql([2,34]);
  });
  it('Resolves not accept a wrong array', function() {
    return results([2,35]).should.eventually.not.eql([2,34]);
  });
  it('Resolves a valid object', function() {
    return results({a:2,b:4}).should.eventually.eql({a:2,b:4});
  });
  it('Resolves a Promises array', function() {
    return results([
      Promise.resolve(2),
      Promise.resolve(34)
    ]).should.eventually.eql([2,34]);
  });
  it('Resolves for Promises/A compliant promises', function() {
    return results([
      Promise.resolve(2),
      {then: function (s) {
        s(34);
      }},
    ]).should.eventually.eql([2,34]);
  });
  it('Resolves a Promises array with rejections', function() {
    return results([
      Promise.resolve(2),
      Promise.reject(3),
      Promise.reject(4),
    ]).should.eventually.eql([2,3,4]);
  });
  it('Resolves a Promises object', function() {
    return results({
      a:Promise.resolve(2),
      b:Promise.resolve(4),
    }).should.eventually.eql({a:2,b:4});
  });
  it('Resolves a Promises object with rejections', function() {
    return results({
      a:Promise.resolve(2),
      b:Promise.reject(4),
    }).should.eventually.eql({a:2,b:4});
  });
  it('Resolve complex a Promises object', function() {
    var a = Promise.resolve(2);
    var b = a.then(function (r) {
      return r + 1;
    }).then(function (r) {
      return r + 1;
    });
    return results({a:a,b:b}).should.eventually.eql({a:2,b:4});
  });
  it('Resolve mixed a Promise object', function() {
    var a = Promise.resolve(2);
    var b = a.then(function (r) {
      return r + 1;
    }).then(function (r) {
      return r + 1;
    });
    var c = 4;
    return results({a:a,b:b,c:c}).should.eventually.eql({a:2,b:4,c:4});
  });
  it('Resolve mixed a Promise object with rejections', function() {
    var a = Promise.resolve(2);
    var b = a.then(function (r) {
      return r + 1;
    }).then(function (r) {
      return r + 1;
    });
    var c = Promise.reject(20);
    return results({a:a,b:b,c:c}).should.eventually.eql({a:2,b:4,c:20});
  });
  it('Resolve, not acccept, mixed an invalid Promise object with rejections', function() {
    var a = Promise.resolve(2);
    var b = a.then(function (r) {
      return r + 1;
    }).then(function (r) {
      return r + 1;
    });
    var c = Promise.reject(25);
    return results({a:a,b:b,c:c}).should.eventually.not.eql({a:2,b:4,c:20});
  });
});
