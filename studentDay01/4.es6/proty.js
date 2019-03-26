function update() {
    console.log('视图已经更新')
}
let arr = [1, 2, 3, 4];
let proxy = new Proxy(arr, {
    set(target, key, value) {
        if (key === 'length') return true;
        update()
        return Reflect.set(target, key, value)
        // update()
        // target[key] = value
    },
    get(target, key) {
        // return target[key]
        return Reflect.get(target, key)
    }
});
// proxy[0] = 100;
// proxy.pop()
proxy.push(5)
// proxy.push(123)
console.log(proxy)

var arr = [1,2,3,4]
let newArr = arr.pop()
console.log(newArr, arr)