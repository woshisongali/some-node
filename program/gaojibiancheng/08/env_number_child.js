var number = process.env.number 
console.log(number)
console.log(typeof(number))
number = parseInt(number, 10)
console.group(typeof(number))