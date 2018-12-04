def bubbleSort(input):
    length = len(input)
    swapped = True
    while swapped:
        swapped = False
        for i in range(1,length):
            if input[i - 1] > input[i]:
                input[i], input[i - 1] = input[i - 1], input[i]
                swapped = True
for i in range(1000000):
    toBeSorted = [1, 3, 2, 4, 8, 6, 7, 2, 3, 0]
    bubbleSort(toBeSorted)