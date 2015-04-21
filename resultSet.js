/**
 * Promise to resolve once collection of promises has resolve or rejected.
 *
 * Loosely, based on promised-io/promise .allKeys, however:
 *   - Expects global Promise (es6-promise).
 *   - 
 *
 * @param {object|array} collection
 *   The collection of promises to wait for.
 * @return Promise<object|array>
 *   Resolved with a collection of results.
 *   Rejects with a keyed object with collection of results & rejections.
 */
module.exports = function promiseResultSets (collection) {
  return new Promise(function(resolve, reject) {
    var array = Object.keys(collection);
    var length = array.length;
    var resolved = 0;
    var rejected = 0;
    var results = {
      resolved: Array.isArray(collection) ? new Array(length) : {},
      rejected: Array.isArray(collection) ? new Array(length) : {}
    };
    if (length === 0) resolve(results);
    else array.forEach(function checkIn (key) {
      if (collection[key] && typeof collection[key].then === 'function')
        collection[key].then(resolveKey, rejectKey);
      else
        resolveKey(collection[key]);

      function resolveKey(value) {
        results.resolved[key] = value;
        resolved++;
        if (resolved === length) {
          resolve(results.resolved);
        }
        else if (resolved + rejected === length) {
          reject(results);
        }
      }
      function rejectKey(value) {
        results.rejected[key] = value;
        rejected++;
        if (resolved + rejected === length) {
          reject(results);
        }
      }
    });
  });
};
