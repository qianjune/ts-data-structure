/**
 * @description console样式类
 */

class ConsoleBox {
    static info(msg: string): void {
        const len = msg && msg.length
        const decorator = Array.from({ length: len * 2 }, _ => '-').join('')
        console.log(decorator)
        console.log(msg)
        console.log(decorator)
    }
}

export default ConsoleBox