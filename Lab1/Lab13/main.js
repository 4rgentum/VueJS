// Задание 1: Сортировка списка натуральных чисел
function task1() {
    const input = prompt("Введите список натуральных чисел, разделенных запятыми:");
    if (!input || input.trim() === "") {
        alert("Некорректный ввод! Введите хотя бы одно число.");
        return;
    }

    // Проверка на наличие пробелов или других символов
    if (!/^[\d,]+$/.test(input)) {
        alert("Ошибка! В строке должны быть только числа и запятые.");
        return;
    }

    const numbers = input.split(",").map(Number).filter(n => !isNaN(n) && n > 0);
    if (numbers.length === 0) {
        alert("Ошибка! Введите хотя бы одно натуральное число.");
        return;
    }

    const sortedNumbers = numbers.sort((a, b) => a - b);
    document.getElementById("output1").textContent = `Отсортированный список: ${sortedNumbers.join(", ")}`;
}

// Задание 2: Остатки от деления на 5
function task2() {
    const input = prompt("Введите массив натуральных чисел, разделенных запятыми:");
    if (!input || input.trim() === "") {
        alert("Некорректный ввод! Введите хотя бы одно число.");
        return;
    }

    // Проверка на наличие пробелов или других символов
    if (!/^[\d,]+$/.test(input)) {
        alert("Ошибка! В строке должны быть только числа и запятые.");
        return;
    }

    const numbers = input.split(",").map(Number).filter(n => !isNaN(n) && n > 0);
    if (numbers.length === 0) {
        alert("Ошибка! Введите хотя бы одно натуральное число.");
        return;
    }

    const remainders = numbers.map(n => n % 5);
    document.getElementById("output2").textContent = `Остатки от деления на 5: ${remainders.join(", ")}`;
}

// Задание 3: Медиана произвольного количества числовых аргументов
function task3() {
    function median(...numbers) {
        numbers.sort((a, b) => a - b);
        const mid = Math.floor(numbers.length / 2);
        return numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
    }

    const choice = prompt("Выберите вариант:\n1. Ввод чисел через запятую\n2. Использовать отсортированный массив из задания 1");
    if (choice === "1") {
        const input = prompt("Введите числа через запятую:");
        if (!input || input.trim() === "") {
            alert("Некорректный ввод! Введите хотя бы одно число.");
            return;
        }

        // Проверка на наличие пробелов или других символов
        if (!/^[\d,]+$/.test(input)) {
            alert("Ошибка! В строке должны быть только числа и запятые.");
            return;
        }

        const numbers = input.split(",").map(Number).filter(n => !isNaN(n));
        if (numbers.length === 0) {
            alert("Ошибка! Введите хотя бы одно число.");
            return;
        }

        const med = median(...numbers);
        document.getElementById("output3").textContent = `Медиана: ${med}`;
    } else if (choice === "2") {
        const output1 = document.getElementById("output1").textContent;
        if (!output1 || !output1.includes("Отсортированный список:")) {
            alert("Ошибка! Сначала выполните задание 1.");
            return;
        }

        const numbers = output1
            .replace("Отсортированный список: ", "")
            .split(", ")
            .map(Number);

        const med = median(...numbers);
        document.getElementById("output3").textContent = `Медиана (из задания 1): ${med}`;
    } else {
        alert("Ошибка! Выберите 1 или 2.");
    }
}

// Задание 4: Проверка правильности скобочной строки
function task4() {
    const input = prompt("Введите строку из скобок:");
    if (!input || input.trim() === "") {
        alert("Некорректный ввод! Введите строку.");
        return;
    }

    // Проверка на наличие других символов, кроме скобок
    if (!/^[()]+$/.test(input)) {
        alert("Ошибка! В строке должны быть только скобки '(' и ')'.");
        return;
    }

    let stack = [];
    for (let char of input) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.length === 0) {
                document.getElementById("output4").textContent = "Неправильная";
                return;
            }
            stack.pop();
        }
    }
    document.getElementById("output4").textContent = stack.length === 0 ? "Правильная" : "Неправильная";
}

// Задание 5: Глубокая копия объекта
function task5() {
    // Подсказка в модальном окне
    const input = prompt("Введите объект в формате, например: { a: 1, b: { c: 2 }, d: [3, 4] }");

    // Если ввод пустой, выводим ошибку
    if (!input || input.trim() === "") {
        alert("Ошибка! Ввод не может быть пустым.");
        return;
    }

    // Парсинг ввода в объект
    let obj;
    try {
        obj = new Function(`return ${input}`)();
    } catch (e) {
        alert("Ошибка! Невозможно преобразовать ввод в объект. Убедитесь, что формат правильный.");
        return;
    }

    // Глубокая копия
    const copied = deepCopy(obj);

    // Проверка на корректность копирования
    const isCorrectCopy = obj !== copied && JSON.stringify(obj) === JSON.stringify(copied);
    const output = `
        Оригинал: ${JSON.stringify(obj)}
        Копия: ${JSON.stringify(copied)}
        Проверка на глубокую копию: ${isCorrectCopy ? "Успешна" : "Не удалась"}
    `;

    document.getElementById("output5").textContent = output;
}

// Функция глубокого копирования
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const arrCopy = [];
        for (let i = 0; i < obj.length; i++) {
            arrCopy[i] = deepCopy(obj[i]);
        }
        return arrCopy;
    }

    const objCopy = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            objCopy[key] = deepCopy(obj[key]);
        }
    }
    return objCopy;
}