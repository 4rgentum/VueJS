const output = document.getElementById('output');

// Задание 1: Счетчик загрузок страницы
function task1() {
    let count = localStorage.getItem('pageLoadCount') || 0;
    count++;
    localStorage.setItem('pageLoadCount', count);
    alert(`Вы загрузили/обновили эту страницу ${count} раз(а).`);
}

// Задание 2: Загрузка картинок с сохранением порядка
function task2() {
    const input = prompt("Введите 5 ссылок на картинки через запятую:");
    const imageUrls = input.split(',').map(url => url.trim()); // Разделяем ссылки и убираем лишние пробелы

    const newWindow = window.open();
    newWindow.document.write('<html><head><title>Результаты задания 2</title><style>body { font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; } img { width: 100%; max-width: 100%; margin: 10px 0; } p { color: red; }</style></head><body>');
    newWindow.document.write('<div id="images-container"></div>'); // Контейнер для картинок
    newWindow.document.write('</body></html>');

    const container = newWindow.document.getElementById('images-container');

    // Создаем массив для хранения элементов (картинок или сообщений об ошибках)
    const elements = new Array(imageUrls.length);

    imageUrls.forEach((url, index) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const imgElement = newWindow.document.createElement('img');
            imgElement.src = url;
            imgElement.alt = `Картинка ${index + 1}`;
            elements[index] = imgElement; // Сохраняем элемент в массиве
            checkAndAppendElements(); // Проверяем, можно ли добавить элементы в DOM
        };
        img.onerror = () => {
            const pElement = newWindow.document.createElement('p');
            pElement.textContent = `Can’t load image: ${url}`;
            elements[index] = pElement; // Сохраняем элемент в массиве
            checkAndAppendElements(); // Проверяем, можно ли добавить элементы в DOM
        };
    });

    function checkAndAppendElements() {
        // Проверяем, все ли элементы готовы
        if (elements.every(element => element !== undefined)) {
            // Добавляем элементы в DOM в правильном порядке
            elements.forEach(element => container.appendChild(element));
        }
    }
}

// Задание 3: Загрузка картинок без сохранения порядка
function task3() {
    const input = prompt("Введите 5 ссылок на картинки через запятую:");
    const imageUrls = input.split(',').map(url => url.trim()); // Разделяем ссылки и убираем лишние пробелы

    const newWindow = window.open();
    newWindow.document.write('<html><head><title>Результаты задания 3</title><style>body { font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; } img { width: 100%; max-width: 100%; margin: 10px 0; } p { color: red; }</style></head><body>');
    newWindow.document.write('<div id="images-container"></div>'); // Контейнер для картинок
    newWindow.document.write('</body></html>');

    const container = newWindow.document.getElementById('images-container');

    imageUrls.map(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const imgElement = newWindow.document.createElement('img');
            imgElement.src = url;
            imgElement.alt = "Картинка";
            container.appendChild(imgElement); // Добавляем картинку в контейнер
        };
        img.onerror = () => {
            const pElement = newWindow.document.createElement('p');
            pElement.textContent = `Can’t load image: ${url}`;
            container.appendChild(pElement); // Добавляем сообщение об ошибке в контейнер
        };
    });
}

// Задание 4: Загрузка картинок с использованием async/await
async function task4() {
    const input = prompt("Введите 5 ссылок на картинки через запятую:");
    const imageUrls = input.split(',').map(url => url.trim()); // Разделяем ссылки и убираем лишние пробелы

    const newWindow = window.open();
    newWindow.document.write('<html><head><title>Результаты задания 4</title><style>body { font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; } img { width: 100%; max-width: 100%; margin: 10px 0; } p { color: red; }</style></head><body>');
    newWindow.document.write('<div id="images-container"></div>'); // Контейнер для картинок
    newWindow.document.write('</body></html>');

    const container = newWindow.document.getElementById('images-container');

    const promises = imageUrls.map(async url => {
        try {
            const img = await loadImage(url);
            const imgElement = newWindow.document.createElement('img');
            imgElement.src = url;
            imgElement.alt = "Картинка";
            container.appendChild(imgElement); // Добавляем картинку в контейнер
        } catch {
            const pElement = newWindow.document.createElement('p');
            pElement.textContent = `Can’t load image: ${url}`;
            container.appendChild(pElement); // Добавляем сообщение об ошибке в контейнер
        }
    });

    await Promise.all(promises); // Ждем завершения всех загрузок
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject();
    });
}

// Задание 5: Проверка IP-адресов с использованием ip-api.com
async function task5() {
    // Список запрещенных стран (полные названия)
    const restrictedCountries = ['Russia', 'Belarus', 'Afghanistan', 'China', 'Venezuela', 'Iran'];
    const ipAddresses = [];

    // Запрашиваем 5 IP-адресов у пользователя
    for (let i = 0; i < 5; i++) {
        const ip = prompt(`Введите IP-адрес ${i + 1}:`);
        if (ip) {
            ipAddresses.push(ip);
        } else {
            alert("Вы не ввели IP-адрес. Пожалуйста, попробуйте снова.");
            return;
        }
    }

    try {
        // Запрашиваем информацию о странах для каждого IP-адреса
        const results = await Promise.all(ipAddresses.map(async ip => {
            try {
                const response = await fetch(`http://ip-api.com/json/${ip}`);
                if (!response.ok) {
                    throw new Error(`Ошибка при запросе данных для IP: ${ip}`);
                }
                const data = await response.json();

                // Если статус ответа "success", возвращаем страну
                if (data.status === "success") {
                    return data.country; // Полное название страны
                } else {
                    console.warn(`Не удалось определить страну для IP: ${ip}`);
                    return null;
                }
            } catch (error) {
                console.error(`Ошибка при обработке IP: ${ip}`, error);
                return null;
            }
        }));

        // Проверяем, есть ли IP-адреса из запрещенных стран
        const isRestricted = results.some(country => country && restrictedCountries.includes(country));

        // Выводим результат
        if (isRestricted) {
            alert("Our services are not available in your country");
        } else {
            alert("Welcome to our website!");
        }
    } catch (error) {
        console.error("Ошибка при запросе данных:", error);
        alert("Произошла ошибка при проверке IP-адресов. Пожалуйста, попробуйте снова.");
    }
}