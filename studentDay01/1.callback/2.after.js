 // lodash debounce (延迟,防抖)  throttle (节流)

 function after(times, callback) {
     return function() {
         if(--times === 0) {
             callback()
         }
     }
 }
 let newFn = after(3, function(){
     console.log('哈哈哈')
 })
 newFn()
 newFn()
 newFn()