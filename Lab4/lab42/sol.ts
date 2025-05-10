// Пункт 2: Класс User с интерфейсом
interface IUser {
    name: string;
    age: number;
    hello(): void;
}

class User implements IUser {
    constructor(public name: string, public age: number) {}

    hello(): void {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

// Функция для создания пользователя
function createUser(): void {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const age = parseInt((document.getElementById("age") as HTMLInputElement).value);

    const user = new User(name, age);
    const userInfoDiv = document.getElementById("user-info")!;
    userInfoDiv.innerHTML = `Hi! My name is ${user.name}. And I am ${user.age} years old.`;
}

// Пункт 3: Типизация через псевдонимы типов
type TUser = {
    name: string;
    age: number;
    hello(): void;
};

class UserAlias implements TUser {
    constructor(public name: string, public age: number) {}

    hello(): void {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

// Функция для создания пользователя с псевдонимом типа
function createUserWithAlias(): void {
    const name = "Bob";
    const age = 25;
    const user = new UserAlias(name, age);
    const userAliasInfoDiv = document.getElementById("user-alias-info")!;
    userAliasInfoDiv.innerHTML = `Hi! My name is ${user.name}. And I am ${user.age} years old.`;
}

// Пункт 4: Перегруженная функция distance
type Point = { x: number; y: number };

function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(p1: Point, p2: Point): number;

function distance(
    a: number | Point,
    b: number | Point,
    c?: number,
    d?: number
): number {
    let x1: number, y1: number, x2: number, y2: number;

    if (typeof a === "object" && typeof b === "object") {
        x1 = a.x;
        y1 = a.y;
        x2 = b.x;
        y2 = b.y;
    } else if (
        typeof a === "number" && typeof b === "number" &&
        typeof c === "number" && typeof d === "number"
    ) {
        x1 = a;
        y1 = b;
        x2 = c;
        y2 = d;
    } else {
        throw new Error("Invalid arguments");
    }

    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.hypot(dx, dy);
}

// Функция для вычисления расстояния
function calculateDistance(): void {
    const x1 = parseInt((document.getElementById("x1") as HTMLInputElement).value);
    const y1 = parseInt((document.getElementById("y1") as HTMLInputElement).value);
    const x2 = parseInt((document.getElementById("x2") as HTMLInputElement).value);
    const y2 = parseInt((document.getElementById("y2") as HTMLInputElement).value);

    const dist = distance(x1, y1, x2, y2);
    const resultDiv = document.getElementById("distance-result")!;
    resultDiv.innerHTML = `Расстояние между точками: ${dist}`;
}

// Пункт 5: Бинарное дерево
class TreeNode<T> {
    public left: TreeNode<T> | null = null;
    public right: TreeNode<T> | null = null;

    constructor(public value: T) {}
}

class BinaryTree<T> {
    private root: TreeNode<T> | null = null;

    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
        if (node === null) {
            return new TreeNode(value);
        }
        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else {
            node.right = this._insert(node.right, value);
        }
        return node;
    }

    search(value: T): boolean {
        return this._search(this.root, value);
    }

    private _search(node: TreeNode<T> | null, value: T): boolean {
        if (node === null) return false;
        if (node.value === value) return true;
        if (value < node.value) return this._search(node.left, value);
        return this._search(node.right, value);
    }

    height(): number {
        return this._height(this.root);
    }

    private _height(node: TreeNode<T> | null): number {
        if (node === null) return 0;
        return 1 + Math.max(this._height(node.left), this._height(node.right));
    }
}

// Функция для работы с бинарным деревом
const tree = new BinaryTree<number>();

function insertTreeValue(): void {
    const value = parseInt((document.getElementById("tree-value") as HTMLInputElement).value);
    tree.insert(value);
    alert(`Значение ${value} вставлено в дерево`);
}

function searchTreeValue(): void {
    const value = parseInt((document.getElementById("tree-value") as HTMLInputElement).value);
    const found = tree.search(value);
    alert(`Значение ${value} найдено: ${found}`);
}

function getTreeHeight(): void {
    const height = tree.height();
    alert(`Высота дерева: ${height}`);
}

// Пункт 6: Паттерны
// ---------- Strategy ----------
interface SortStrategy {
    sort(data: number[]): number[];
}

class BubbleSort implements SortStrategy {
    sort(data: number[]): number[] {
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

class QuickSort implements SortStrategy {
    sort(data: number[]): number[] {
        if (data.length <= 1) return data;
        const pivot = data[0];
        const left = data.slice(1).filter(x => x < pivot);
        const right = data.slice(1).filter(x => x >= pivot);
        return [...this.sort(left), pivot, ...this.sort(right)];
    }
}

class Sorter {
    constructor(private strategy: SortStrategy) {}

    setStrategy(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    sort(data: number[]): number[] {
        return this.strategy.sort(data);
    }
}

function testStrategyPattern(): void {
    const sorter = new Sorter(new BubbleSort());
    const data = [5, 3, 8, 4, 2];
    const bubbleSorted = sorter.sort(data);

    sorter.setStrategy(new QuickSort());
    const quickSorted = sorter.sort(data);

    document.getElementById("pattern-result")!.innerHTML =
        `<b>Strategy Pattern:</b><br>` +
        `BubbleSort: [${bubbleSorted.join(", ")}]<br>` +
        `QuickSort: [${quickSorted.join(", ")}]`;
}

// ---------- Observer ----------
interface Observer {
    update(message: string): void;
}

class ConcreteObserver implements Observer {
    constructor(private name: string) {}

    update(message: string): void {
        const el = document.getElementById("pattern-result")!;
        el.innerHTML += `${this.name} получил сообщение: ${message}<br>`;
    }
}

class Subject {
    private observers: Observer[] = [];

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(message: string): void {
        this.observers.forEach(observer => observer.update(message));
    }
}

function testObserverPattern(): void {
    const subject = new Subject();
    const observer1 = new ConcreteObserver("Наблюдатель 1");
    const observer2 = new ConcreteObserver("Наблюдатель 2");

    subject.attach(observer1);
    subject.attach(observer2);

    document.getElementById("pattern-result")!.innerHTML = `<b>Observer Pattern:</b><br>`;
    subject.notify("Событие №1");
}

// ---------- Adapter ----------
class OldPrinter {
    printText(text: string): void {
        const el = document.getElementById("pattern-result")!;
        el.innerHTML += `OldPrinter: ${text}<br>`;
    }
}

interface NewPrinter {
    print(text: string): void;
}

class PrinterAdapter implements NewPrinter {
    constructor(private oldPrinter: OldPrinter) {}

    print(text: string): void {
        this.oldPrinter.printText(text);
    }
}

function testAdapterPattern(): void {
    const oldPrinter = new OldPrinter();
    const adapter = new PrinterAdapter(oldPrinter);

    document.getElementById("pattern-result")!.innerHTML = `<b>Adapter Pattern:</b><br>`;
    adapter.print("Текст через адаптер");
}