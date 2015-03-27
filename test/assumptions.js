describe('Assumptions', function() {
  it('Chai validates valid promised array', function() {
    return new Promise(function(r) {
      setImmediate(function(){
        r([2,3,4]);
      });
    }).should.eventually.eql([2,3,4]);
  });
  it('Chai validates wrong promised array', function() {
    return new Promise(function(r) {
      setImmediate(function(){
        r([2,3,4]);
      });
    }).should.eventually.not.eql([2,3,5]);
  });
  it('Chai validates a valid promised object', function() {
    return new Promise(function(r) {
      setImmediate(function(){
        r({a:2,b:3});
      });
    }).should.eventually.eql({a:2,b:3});
  });
  it('Chai validates a wrong promised object', function() {
    return new Promise(function(r) {
      setImmediate(function(){
        r({a:2,b:3});
      });
    }).should.eventually.not.eql({a:2,b:4});
  });
  it('Chai validates rejections', function() {
    return new Promise(function(s,e) {
      setImmediate(function(){
        e(new Error('nope'));
      });
    }).should.eventually.be.rejectedWith(Error);
  });
});
