let items: Array<number> = [1, 2, 3]
type IteratorFunc = (item: number, index?: number, arr?: number[]) => void
let iteratorFunc: IteratorFunc = function (item: number) {
    console.log(item)
}
items.forEach(iteratorFunc) 