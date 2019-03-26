class Subject {
    constructor() {
        this.state = '开心'
        this.arr = []
    }
    attach(ob) {
        this.arr.push(ob)
    }
    setState(newState) {
        this.state = newState
        this.arr.forEach(ob => ob.update(newState))
    }
}
class Observer {
    constructor(who) {
        this.who = who
    }
    update(newState) {
        console.log(this.who + newState)
    }
}
let subject = new Subject()
let my1 = new Observer('老公发现');
let my2 = new Observer('老婆发现');
subject.attach(my1)
subject.attach(my2)
subject.setState('小宝宝哭了')


