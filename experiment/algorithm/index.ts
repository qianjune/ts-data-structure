import ArrayStack from "./ArrayStack";
import { LinkedListR } from "./LinkedListR";

// const arrayStack = new ArrayStack()
// arrayStack.push(1)

// console.log(arrayStack)

const head = new LinkedListR<number>()
head.addFirst(1)
console.log(head.toString())
head.addFirst(2)
console.log(head.toString())
head.addFirst(3)
console.log(head.toString())
head.addFirst(4)
console.log(head.toString())
const res = head.remove(1)
console.log(`remove : ${res}`)
console.log(head.toString())
head.removeElement(2)
console.log(head.toString())