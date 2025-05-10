// Задание 2: Определение названия месяца
function task2() {
    const monthNumber = parseInt(prompt("Введите номер месяца (от 1 до 12):")); //number

    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    if (monthNumber >= 1 && monthNumber <= 12 && Number.isInteger(monthNumber)) {
        document.getElementById("output2").textContent = `${months[monthNumber - 1]}`;
    } else {
        //document.getElementById("output2").textContent = "Некорректный номер месяца";
        alert("Некорректный номер месяца! Введите число от 1 до 12.");
    }
}

// Задание 3: Генерация списка простых чисел
function task3() {
    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    function generatePrimes(n) {
        const primes = [];
        let num = 2;
        while (primes.length < n) {
            if (isPrime(num)) {
                primes.push(num);
            }
            num++;
        }
        return primes.join(" ");
    }

    const n = parseInt(prompt("Введите количество простых чисел:"));
    if (isNaN(n) || n <= 0) {
        alert("Некорректный ввод! Введите положительное число.");
        document.getElementById("output3").textContent = "";
    } else {
        document.getElementById("output3").textContent = `${generatePrimes(n)}`;
    }

}

// Глобальный объект Counter
let Counter = {
    count: 0,
    add(value) {
        this.count += value;
    },
    sub(value) {
        this.count -= value;
    }
};

//Counter.add(5);

// Задание 4: Счетчик
function task4() {
    // Запрашиваем операцию
    const operation = prompt("Выберите операцию: введите '+' для добавления или '-' для вычитания:");

    // Проверяем, что введена корректная операция
    if (operation !== "+" && operation !== "-") {
        alert("Некорректная операция! Введите '+' или '-'.");
        return;
    }

    // Запрашиваем значение
    const value = parseFloat(prompt("Введите число:"));

    // Проверяем, что введено корректное число
    if (isNaN(value)) {
        alert("Некорректное число!");
        return;
    }

    // Выполняем операцию
    if (operation === "+") {
        Counter.add(value);
    } else if (operation === "-") {
        Counter.sub(value);
    }

    // Обновляем вывод на странице
    document.getElementById("output4").textContent = `Текущее значение count: ${Counter.count}`;
}

// Задание 5: Форматирование списка слов
function task5() {
    const inputWords = prompt("Введите список слов, разделенных запятыми:");
    if (!inputWords || inputWords.trim() === "") {
        alert("Некорректный ввод! Введите хотя бы одно слово.");
        document.getElementById("output5").textContent = "";
    } else {
        const words = inputWords.split(",");
        const formattedWords = words.join(".");
        document.getElementById("output5").textContent = `${formattedWords}`;
    }
}

// Задание 6: Проверка на палиндром
function task6() {
    function isPalindrome(str) {
        const cleanedStr = str.replace(/[^a-zA-Zа-яА-Я]/g, "").toLowerCase();
        return cleanedStr === cleanedStr.split("").reverse().join("");
    }

    const inputString = prompt("Введите строку для проверки на палиндром:");
    if (!inputString || inputString.trim() === "") {
        alert("Некорректный ввод! Введите строку для проверки.");
        document.getElementById("output6").textContent = "";
    } else {
        document.getElementById("output6").textContent = isPalindrome(inputString) ? "Да" : "Нет";
    }
}