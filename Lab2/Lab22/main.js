// 1. Класс User с полями name, age и методом hello()
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    hello() {
        return `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
    }
}

document.getElementById('task1').addEventListener('click', () => {
    const userName = prompt("Enter your name:");
    const userAge = parseInt(prompt("Enter your age:"), 10);
    const user = new User(userName, userAge);
    document.getElementById('result1').textContent = user.hello();
});

// 2. Класс User, реализованный через функцию-конструктор
function UserFunction(name, age) {
    //Для возможности наследования, нужен прототип для методов
    this.name = name;
    this.age = age;

    this.hello = function() {
        return `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
    };
}

document.getElementById('task2').addEventListener('click', () => {
    const userName = prompt("Enter your name (Function Constructor):");
    const userAge = parseInt(prompt("Enter your age (Function Constructor):"), 10);
    const userFunc = new UserFunction(userName, userAge);
    document.getElementById('result2').textContent = userFunc.hello();
});

// 3. Класс User с полем tel (геттер и сеттер)
class UserWithTel {
    //выкинуть из коснтруктора опредедление полей, нужны геттеры и сеттеры
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this._tel = '';
    }

    get tel() {
        return this._tel;
    }

    set tel(value) {
        const phoneRegex = /^\+7\d{10}$/;
        if (phoneRegex.test(value)) {
            this._tel = value;
        } else {
            alert('Invalid phone number format. Expected format: +7xxxxxxxxxx');
        }
    }

    hello() {
        return `Hi! My name is ${this.name}. And I am ${this.age} years old. My phone number is ${this.tel}.`;
    }
}

document.getElementById('task3').addEventListener('click', () => {
    const userName = prompt("Enter your name (with Tel):");
    const userAge = parseInt(prompt("Enter your age (with Tel):"), 10);
    const userTel = new UserWithTel(userName, userAge);
    const userPhone = prompt("Enter your phone number (+7xxxxxxxxxx):");
    userTel.tel = userPhone;
    document.getElementById('result3').textContent = userTel.hello();
});

// 4. Класс User с валидацией возраста (геттер и сеттер)
class UserWithAgeValidation {
    //изменение нап private поля в конструкторе
    
    #age;

    constructor(name, age) {
        this.name = name;
        this.age = age; 
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        if (Number.isInteger(value) && value >= 1 && value <= 100) {
            this.#age = value;
        } else {
            alert('Age must be an integer between 1 and 100.');
        }
    }

    hello() {
        return `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
    }
}

document.getElementById('task4').addEventListener('click', () => {
    const userName = prompt("Enter your name (with Age Validation):");
    const userAge = parseInt(prompt("Enter your age (with Age Validation):"), 10);
    const userAgeValid = new UserWithAgeValidation(userName, userAge);
    document.getElementById('result4').textContent = userAgeValid.hello();
});

// 5. Класс Student, наследующий User
class Student extends User {
    #knowledge = 0

    constructor(name, age) {
        super(name, age);
    }

    get knowledge() {
        return this.#knowledge;
    }

    learn() {
        this.#knowledge += 1;
        return `${this.name} learned something new! Knowledge is now ${this.#knowledge}.`;
    }

    hello() {
        return `Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`;
    }
}

document.getElementById('task5').addEventListener('click', () => {
    const studentName = prompt("Enter your name (Student):");
    const studentAge = parseInt(prompt("Enter your age (Student):"), 10);
    const student = new Student(studentName, studentAge);
    document.getElementById('result5').textContent = student.hello();
    const learnConfirm = confirm("Do you want to learn something?");
    if (learnConfirm) {
        document.getElementById('result5').textContent += "\n" + student.learn();
    }
});

// 6. Переопределение метода reverse() для массивов
Array.prototype.reverse = function() {
    const originalArray = this.slice();
    const duplicatedArray = originalArray.concat(originalArray);
    return `Duplicated array: ${duplicatedArray}`;
};

document.getElementById('task6').addEventListener('click', () => {
    const arrayInput = prompt("Enter numbers separated by commas (e.g., 1,2,3):");
    const array = arrayInput.split(',').map(Number);
    document.getElementById('result6').textContent = `Original array: ${array}\n${array.reverse()}`;
});