/**
 * Created by zhida.wen on 2016/9/13.
 */
class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};

var greeter = new Greeter("Hello, world!");

document.body.innerHTML = greeter.greet();