"use strict";
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}
// Функция для создания пользователя
function createUser() {
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const user = new User(name, age);
    const userInfoDiv = document.getElementById("user-info");
    userInfoDiv.innerHTML = `Hi! My name is ${user.name}. And I am ${user.age} years old.`;
}
class UserAlias {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}
// Функция для создания пользователя с псевдонимом типа
function createUserWithAlias() {
    const name = "Bob";
    const age = 25;
    const user = new UserAlias(name, age);
    const userAliasInfoDiv = document.getElementById("user-alias-info");
    userAliasInfoDiv.innerHTML = `Hi! My name is ${user.name}. And I am ${user.age} years old.`;
}
function distance(a, b, c, d) {
    let x1, y1, x2, y2;
    if (typeof a === "object" && typeof b === "object") {
        x1 = a.x;
        y1 = a.y;
        x2 = b.x;
        y2 = b.y;
    }
    else if (typeof a === "number" && typeof b === "number" &&
        typeof c === "number" && typeof d === "number") {
        x1 = a;
        y1 = b;
        x2 = c;
        y2 = d;
    }
    else {
        throw new Error("Invalid arguments");
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.hypot(dx, dy);
}
// Функция для вычисления расстояния
function calculateDistance() {
    const x1 = parseInt(document.getElementById("x1").value);
    const y1 = parseInt(document.getElementById("y1").value);
    const x2 = parseInt(document.getElementById("x2").value);
    const y2 = parseInt(document.getElementById("y2").value);
    const dist = distance(x1, y1, x2, y2);
    const resultDiv = document.getElementById("distance-result");
    resultDiv.innerHTML = `Расстояние между точками: ${dist}`;
}
// Пункт 5: Бинарное дерево
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        this.root = this._insert(this.root, value);
    }
    _insert(node, value) {
        if (node === null) {
            return new TreeNode(value);
        }
        if (value < node.value) {
            node.left = this._insert(node.left, value);
        }
        else {
            node.right = this._insert(node.right, value);
        }
        return node;
    }
    search(value) {
        return this._search(this.root, value);
    }
    _search(node, value) {
        if (node === null)
            return false;
        if (node.value === value)
            return true;
        if (value < node.value)
            return this._search(node.left, value);
        return this._search(node.right, value);
    }
    height() {
        return this._height(this.root);
    }
    _height(node) {
        if (node === null)
            return 0;
        return 1 + Math.max(this._height(node.left), this._height(node.right));
    }
}
// Функция для работы с бинарным деревом
const tree = new BinaryTree();
function insertTreeValue() {
    const value = parseInt(document.getElementById("tree-value").value);
    tree.insert(value);
    alert(`Значение ${value} вставлено в дерево`);
}
function searchTreeValue() {
    const value = parseInt(document.getElementById("tree-value").value);
    const found = tree.search(value);
    alert(`Значение ${value} найдено: ${found}`);
}
function getTreeHeight() {
    const height = tree.height();
    alert(`Высота дерева: ${height}`);
}
class BubbleSort {
    sort(data) {
        let arr = [...data];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
}
class QuickSort {
    sort(data) {
        if (data.length <= 1)
            return data;
        const pivot = data[0];
        const left = data.slice(1).filter(x => x < pivot);
        const right = data.slice(1).filter(x => x >= pivot);
        return [...this.sort(left), pivot, ...this.sort(right)];
    }
}
class Sorter {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    sort(data) {
        return this.strategy.sort(data);
    }
}
function testStrategyPattern() {
    const sorter = new Sorter(new BubbleSort());
    const data = [5, 3, 8, 4, 2];
    const bubbleSorted = sorter.sort(data);
    sorter.setStrategy(new QuickSort());
    const quickSorted = sorter.sort(data);
    document.getElementById("pattern-result").innerHTML =
        `<b>Strategy Pattern:</b><br>` +
            `BubbleSort: [${bubbleSorted.join(", ")}]<br>` +
            `QuickSort: [${quickSorted.join(", ")}]`;
}
class ConcreteObserver {
    constructor(name) {
        this.name = name;
    }
    update(message) {
        const el = document.getElementById("pattern-result");
        el.innerHTML += `${this.name} получил сообщение: ${message}<br>`;
    }
}
class Subject {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify(message) {
        this.observers.forEach(observer => observer.update(message));
    }
}
function testObserverPattern() {
    const subject = new Subject();
    const observer1 = new ConcreteObserver("Наблюдатель 1");
    const observer2 = new ConcreteObserver("Наблюдатель 2");
    subject.attach(observer1);
    subject.attach(observer2);
    document.getElementById("pattern-result").innerHTML = `<b>Observer Pattern:</b><br>`;
    subject.notify("Событие №1");
}
// ---------- Adapter ----------
class OldPrinter {
    printText(text) {
        const el = document.getElementById("pattern-result");
        el.innerHTML += `OldPrinter: ${text}<br>`;
    }
}
class PrinterAdapter {
    constructor(oldPrinter) {
        this.oldPrinter = oldPrinter;
    }
    print(text) {
        this.oldPrinter.printText(text);
    }
}
function testAdapterPattern() {
    const oldPrinter = new OldPrinter();
    const adapter = new PrinterAdapter(oldPrinter);
    document.getElementById("pattern-result").innerHTML = `<b>Adapter Pattern:</b><br>`;
    adapter.print("Текст через адаптер");
}
