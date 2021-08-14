module.exports = function (originalArray, n) {
  const newArr = []
  if (n >= originalArray.length) {
    return originalArray
  }
  for (let i = 0; i < n; i++) {
    let newElem = originalArray[Math.floor(Math.random() * originalArray.length)]
    while (newArr.includes(newElem)) {
      newElem = originalArray[Math.floor(Math.random() * originalArray.length)]
    }
    newArr.push(newElem)
  }
  return newArr
}
