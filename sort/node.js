function bubbleSort(input) {
  var n = input.length
  var swapped = true
  while (swapped) {
    swapped = false
    for (var i = 0; i < n; i++) {
      if (input[i - 1] > input[i]) {
        ;[input[i], input[i - 1]] = [input[i - 1], input[i]]
        swapped = true
      }
    }
  }
}
for (var c = 0; c < 1000000; c++) {
  const toBeSorted = [1, 3, 2, 4, 8, 6, 7, 2, 3, 0]
  bubbleSort(toBeSorted)
}
