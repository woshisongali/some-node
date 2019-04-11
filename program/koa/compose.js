/**
 * Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象
 */
let promise1 = Promise.resolve(123)
promise1.then(function (value) {
  console.log(value)
})

Promise.reject('testing static reject').then(function (reson) {
}, function (reson) {
  console.log(reson)
})

function compose (middleware) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('middleware must be a array')
  }
  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('middleware must be composed')
    }
  }

  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i 
      let fn = middleware[i]
      if (i === middleware.length) fn = next 
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch(err) {
        return Promise.reject(err)
      }
    }
  }
}

function fun1 (context, next) {
  console.log(context)
  console.log('first')
  next()
}

function fun2 (context, next) {
  console.log('second')
}

let compTest = compose([fun1, fun2])
compTest({name: 'alli', age: 18}, null).then(function () {
  console.log('to pass')
}, function (err) {
  console.log(err)
})