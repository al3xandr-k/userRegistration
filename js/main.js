'use strict'

const title = document.querySelector('#username'),
      registrBtn = document.querySelector('#registr_user'),
      login = document.querySelector('#login'),
      wrapper = document.querySelector('#list'),
      months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
      myDate = new Date();

let zero = function(a) {
    if (a < 10) {
        return '0' + a;
    }
    return a;
};

let date = zero(myDate.getDate())+ ' ' + months[myDate.getMonth()] + ' ' + myDate.getFullYear() + ' г., ' + zero(myDate.getHours()) + ':' + zero(myDate.getMinutes()) + ':' + zero(myDate.getSeconds());

let arr = [];

let jsonSave = function() {
    let a = JSON.stringify(arr);
    localStorage.toDo = a;
};

let jsonDisplay = function() {
    if (localStorage.toDo) {
        arr = JSON.parse(localStorage.toDo);
    }
};

const render = function() {
    wrapper.innerHTML = '';
    arr.forEach(function(item, i) {
        const li = document.createElement('li');
        li.innerHTML = `<div> Имя: ${item.firstName}, Фамилия: ${item.lastName}, зарегистрирован ${item.regDate} </div> <button class="delete_user">&#10008;</button>`;
        wrapper.append(li);

        const btnRemove = li.querySelector('.delete_user');
        btnRemove.addEventListener('click', function() {
            arr.splice(i, 1);
            jsonSave();
            jsonDisplay();
            render();
        });
    });
};

registrBtn.addEventListener('click', function() {
    let name;

    do {
        name = prompt('Введите через пробел Имя и Фамилию пользователя');
    } while (name.split(/\s+/).length === 1 || name.split(/\s+/).length > 2 || name.trim() === '');

    let log = prompt('Введите Логин'),
        pass = prompt('Введите пароль');

    console.log(name);

    const newUser = {
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        login: log,
        pasword: pass,
        regDate: date
    };

    arr.push(newUser);
    jsonSave();
    render();
});

login.addEventListener('click', function() {
    let a = prompt('Введите Логин'),
        b,
        c,
        d;

    arr.find(function(item) {
        if (a === item.login) {
            b = item.login;
        }
    });

    if (a !== b) {
        alert('Пользователя с таким логином не найдено');
    } else {
        c = prompt('Введите пароль');
        arr.find(function(item) {
            if (a === item.login && c === item.pasword) {
                d = item.pasword;
            }
        });
        if (a === b && c === d) {
            title.innerHTML = b;
            
        } else {
            alert('Неверный пароль');
        } 
    }
});

jsonDisplay();
render();