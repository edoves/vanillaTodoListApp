'use strict'

let todaysDay = document.getElementById('todaysDay')
let todaysDate = document.getElementById('todaysDate')

let date = new Date()
const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

todaysDay.textContent = daysArr[date.getDay()]
todaysDate.textContent = `${monthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
