let totalAmount = document.querySelector('#totalAmount')
const costList = document.querySelectorAll('.expense.number')
let count = 0

costList.forEach((cost) => {
  count += Number(cost.innerText)
})
totalAmount.innerText = count
