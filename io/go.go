package main

import (
  "bufio"
  "os"
  "strconv"
)

func main() {
  file, _ := os.Create("io/go")
  b := bufio.NewWriter(file)
  for c := 0; c < 1000000; c++ {
    num := strconv.Itoa(c)
    b.WriteString(num)
  }
  file.Close()
}