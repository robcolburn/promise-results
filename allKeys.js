/**
 * Promise to resolve once collection of promises has resolve or rejected.
 *
 * Loosely, based on promised-io/promise .allKeys, however:
 *   - Expects global Promise (es6-promise).
 *
 * @param {object|array} collection
 *   The collection of promises to wait for.
 * @return Promise<object|array>
 *   Resolved with a collection of results/rejections.
 *   By convention, rejections should be instances of are Errors.
 */
module.exports = function promiseAllKeys (collection) {
  return new Promise(function(resolve, reject) {
    var array = Object.keys(collection);
    var length = array.length;
    var checkedOut = 0;
    var results = Array.isArray(collection) ? [] : {};
    if (length === 0) resolve(results);
    else array.forEach(function checkIn (key) {
      if (collection[key] && typeof collection[key].then === 'function')
        collection[key].then(checkOut, reject);
      else
        checkOut(collection[key]);

      function checkOut(value) {
        results[key] = value;
        checkedOut++;
        if (checkedOut === length) {
          resolve(results);
        }
      }
    });
  });
};
