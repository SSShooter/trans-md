＃类继承，超级

class 可以 extends 自另一个 class。这是一个不错的语法，技术上基于原型继承。

要继承一个对象，需要在 `{..}` 前指定 `"extends"` 和父对象。


这里`Rabbit`继承自`Animal`：

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stopped.`);
  }

}

*!*
// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}
*/!*

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

`extend`关键字实际上将``[Prototype]]`引用从`Rabbit.prototype`添加到`Animal.prototype`，就像您期望的一样，正如我们以前所见。

！[]（动物兔extends.png）

所以现在`rabbit`既可以访问它自己的方法，也可以访问`Animal`的方法。

类语法允许不仅指定一个类，而且指定`extends'之后的任何表达式。

例如，一个生成父类的函数调用：

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}

*!*
class User extends f("Hello") {}
*/!*

new User().sayHi(); // Hello
```
这里`class User`从f（“Hello”）的结果继承。

对于高级编程模式，当我们使用函数根据许多条件生成类并可以从中继承时，这可能会很有用。

##重写一个方法

现在让我们继续前进并重写一个方法。到目前为止，`Rabbit`继承了`stop`方法，该方法从`Animal`设置`this.speed = 0`。

如果我们在`Rabbit`中指定了自己的`stop`，那么它将被用来代替：

```js
class Rabbit extends Animal {
  stop() {
    // ...this will be used for rabbit.stop()
  }
}
```


