# promise-results
Promise all results of a collection of promises whether they are resolved OR rejected.

Often we want to accomplish several asyncrounous tasks at once. Usually,
`Promise.all` does what we want, but it has a couple limitations:

1. Rejections only provide rejection reason.
Sometimes you want the data from Promises that did resolve, or you want to
know specifically which items failed and which succeeded.
2. Requires a numerically indexed array.
It's often more conveniant to label our parralel jobs with object keys than a
flat index.  `promise-results` will handle keyed objects or arrays.

## Example
```js
var resultsOf = require('promise-results');
var pack = {};
pack.a = Promise.resolve(2);
pack.b = a.then(function (r) {
  return new Promise(funciton (resolve, reject) {
    setTimeout(function() {
      resolve(r + 1);
    }, 10);
  })
});
pack.c = 42
pack.d = new Promise(function (resolve, reject) {
	setTimeout(function() {
	  reject(new Error('Some random failure'));
	}, 10);
});

resultsOf(pack).then(function (results) {
  assert(results.a === 2);
  assert(results.b === 3);
  assert(results.c === 42);
  assert(results.d instanceof Error);
});
```

# `allKeys`

If you just want to use objects, but want to keep `Promise.all` single
rejection pattern, you can use the `allKeys` function instead.

## Example

```js
var allKeys = require('promise-results/allKeys');
var pack = {};
pack.a = Promise.resolve(2);
pack.b = a.then(function (r) {
  return new Promise(funciton (resolve, reject) {
    setTimeout(function() {
      resolve(r + 1);
    }, 10);
  })
});
pack.c = 42
pack.d = new Promise(function (resolve, reject) {
	setTimeout(function() {
	  reject(new Error('Some random failure'));
	}, 10);
});

allKeys(pack).catch(function (err) {
  assert(err instanceof Error);
});
```

# `resultSet`

If you like having a defined reject route, but still want access to
your partial results and rejections. You can use `resultSet`.

## Example

```js
var results = require('promise-results/resultSet');
var pack = {};
pack.a = Promise.resolve(2);
pack.b = a.then(function (r) {
  return new Promise(funciton (resolve, reject) {
    setTimeout(function() {
      resolve(r + 1);
    }, 10);
  })
});
pack.c = 42
pack.d = new Promise(function (resolve, reject) {
  setTimeout(function() {
    reject(new Error('Some random failure'));
  }, 10);
});

results(pack).catch(function (result) {
  assert(result.d instanceof Error);
});
```
