因为想了解大概的性能情况，所以有了这个比较，并不比较各个语言的优缺点。

比较一下 Go，Node，Python 分别执行的时间比较。
  1. 十亿次的循环运算（FOR）
  2. 遍历一百万个数字并将其写入一个文件（IO）
  3. 将含有十个元素的数组排序一千万次（SORT）

## 零、总结

从`性能`上讲，整体上 `Go` 性能是最高的。
从`代码简洁`上讲， `Python` 是最简洁的。

虽然结果这样，但我选择 `Node`。

### 性能

大概跑了一下，性能最高的是Go。

分别执行了十亿次的循环运算（FOR），遍历一百万个数字并将其写入一个文件（IO），将含有十个元素的数组排序一千万次（SORT）。

#### GO, Node,Python, Pypy
![](https://i.loli.net/2018/12/04/5c05f743cb9a0.png)

#### 去掉Python3 的时间
![](https://i.loli.net/2018/12/04/5c05f71249b60.png)

>图由，https://antv.alipay.com/zh-cn/g2/3.x/demo/column/column12.html 这个生成。

## 一、运行环境

**运行代码的环境配置如下：**

| name        | 配置                             |
| ----------- | -------------------------------- |
| MacBook Pro | (Retina, 13-inch, Early 2015)    |
| Processor   | 2.7 GHz Intel Core i5            |
| Memory      | 8 GB 1867 MHz DDR3               |
| Graphics    | Intel Iris Graphics 6100 1536 MB |

---

```bash
# 安装环境
brew install go 
brew install node 
brew install python
brew install pypy
```



**语言版本**
Python 3.5.2

NodeJs v10.13.0

go version go1.10.2 darwin/amd64

Python 2.7.13 (0e7ea4fe15e82d5124e805e2e4a37cae1a402d4b, Mar 22 2018, 12:32:13)
[PyPy 5.10.0 with GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.39.2)]




## 二、比较类型
```
time命令

含义: time — 执行命令并计时

命令行执行结束时在标准输出中打印执行该命令行的时间统计结果，其统计结果包含以下数据：
1. 实际时间(real time): 从command命令行开始执行到运行终止的消逝时间；
2. 用户CPU时间(user CPU time): 命令执行完成花费的用户CPU时间，即命令在用户态中执行时间总和；
3. 系统CPU时间(system CPU time): 命令执行完成花费的系统CPU时间，即命令在核心态中执行时间总和。
```

> go run 会把编译时间算进去， 因此如果先 go build ， 在执行，还会提升一些速度。
> 因为就算go run 速度已经是非常非常快了，因此就没有先构建，在执行了。

### 1. 循环/算术 
迭代十亿项并把它们相加：

```js
// nodejs
var r = 0
for (var c = 0; c < 1000000000; c++) {
  r += c
}
```

```go
// go 
package main
func main() {
  var r int
  for c := 0; c < 1000000000; c++ {
        r += c
  }
}
```

```python
# python
sum(range(1000000000))
```

**Result**
```bash
# sh for.sh
# exec => time node for/node.js && time go run for/go.go && time pypy for/python.py && time python3 for/python.py 
# node
╰─➤  sh for.sh                      
# node
real	0m1.109s
user	0m1.075s
sys	0m0.028s

# go 
real	0m0.489s
user	0m0.418s
sys	0m0.083s

# pypy
real	0m1.067s
user	0m1.025s
sys	0m0.036s

# python3
real	0m25.518s
user	0m25.299s
sys	0m0.108s
```

> go > node == pypy >> python3

> pypy可以大大提升python的性能,因此多加一个pypy的运行时间

PyPy 是 python 的一个解释器。

```bash
# mac 系统安装python
brew install pypy
```

### 2. I/O 操作 
遍历一百万个数字并将其写入一个文件

```js
// nodejs
var fs = require('fs')
var wstream = fs.createWriteStream('io/node')

for (var c = 0; c < 1000000; ++c) {
  wstream.write(c.toString())
}
wstream.end()

```

```go
// go 
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
```

```python
# python
with open("io/python", "a") as text_file:
  for i in range(1000000):
      text_file.write(str(i))

```

**Result**
```bash
# node
real	0m1.513s
user	0m1.744s
sys	0m0.324s

# go
real	0m0.561s
user	0m0.240s
sys	0m0.250s

# pypy
real	0m0.329s
user	0m0.144s
sys	0m0.079s

# python3
real	0m0.633s
user	0m0.563s
sys	0m0.038s
```

> 有评论说：go加了buffer ，python和node都没加buffer，后面俩加了buffer，io那项至少再快一半

> pypy > go > python3 >> node

### 3.  冒泡排序

将含有十个元素的数组排序一千万次。

```js
// nodejs
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
```

```go
// go 
package main
var toBeSorted [10]int = [10]int{1, 3, 2, 4, 8, 6, 7, 2, 3, 0}
func bubbleSort(input [10]int) {
    n := len(input)
    swapped := true
    for swapped {
        swapped = false
        for i := 1; i < n; i++ {
            if input[i-1] > input[i] {
                input[i], input[i-1] = input[i-1], input[i]
                swapped = true
            }
        }
    }
}
func main() {
    for c := 0; c < 1000000; c++ {
        bubbleSort(toBeSorted)
    }
}

```

```python
# python
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
```


**Result**
```bash
# sh sort.sh
# exec => time node sort/node.js && time go run sort/go.go && time pypy sort/python.py && time python3 sort/python.py 
# node
real	0m2.857s
user	0m2.816s
sys	0m0.033s

# go
real	0m0.303s
user	0m0.207s
sys	0m0.111s

# pypy
real	0m0.592s
user	0m0.554s
sys	0m0.032s

# python
real	0m17.504s
user	0m17.174s
sys	0m0.094s
```

> go > pypy > node >> python


## 三、参考文章
1. [《从 Node,Go,Python：一个粗略的比较》](https://zhuanlan.zhihu.com/p/29847628)
