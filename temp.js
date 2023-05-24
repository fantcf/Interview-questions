function sayHi() {
    console.log('hi', this.name);
}
const person = {
    name: 'aaa',
    sayHi: sayHi
}
var name = 'bbb'
const hi = person.sayHi
hi()