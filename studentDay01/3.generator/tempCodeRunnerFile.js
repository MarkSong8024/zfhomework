function* read () {
    let a = yield 1
    console.log(a)
    let b = yield 2
    console.log(b)
}
const it = read()
console.log(it.next())
console.log(it.next(100))