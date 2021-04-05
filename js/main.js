document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const registrationBtn = document.getElementById('registerUser');
  const output = document.getElementById('list');
  const username = document.getElementById('username');
  const login = document.getElementById('login');

  let userData = [];

  if (localStorage.getItem('users')) {
    userData = JSON.parse(localStorage.getItem('users'));
  };

  const render = () => {
    output.textContent = '';

    userData.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('user__item');

      li.innerHTML = `Имя: ${item.userName}, фамилия: ${item.userSurname}, зарегистрирован: ${item.regDate} <button class="remove__btn">Удалить</button>`;

      output.append(li);

      const removeBtn = li.querySelector('.remove__btn');

      removeBtn.addEventListener('click', () => {
        userData.splice(index, 1);
        render();
      });
    });

    localStorage.setItem('users', JSON.stringify(userData));
  };

  registrationBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let userName = prompt('Введите через пробел Имя и Фамилию пользователя!');
    userName = userName.split(' ');

    if (userName.join('').trim() !== '' && userName.length > 1 && userName[1] !== '') {
      const newUsers = {
        userName: userName[0],
        userSurname: userName[1],
        login: prompt('Введите логин!'),
        password: prompt('Введите пароль!'),
        regDate: '',
        regDateApp: () => {
          let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

          let date = new Date();
          let currentDay = date.getDate();
          let year = date.getFullYear();
          let month = date.getMonth();
          let hours = date.getHours();
          let minutes = date.getMinutes();
          let seconds = date.getSeconds();

          let checkTime = time => {
            if (time < 10) {
              time = "0" + time;
            };
            return time;
          };

          newUsers.regDate = `${currentDay} ${months[month]} ${year} г., ${checkTime(hours)}:${checkTime(minutes)}:${checkTime(seconds)}`;
        }
      };
      newUsers.regDateApp();
      userData.push(newUsers);
    } else {
      alert('Введите корректные данные!!!');
    };

    render();
  });

  login.addEventListener('click', (event) => {
    event.preventDefault();

    const userLogin = prompt('Введите логин!');
    const userPassword = prompt('Введите пароль!');

    userData.find(item => {
      if (item.login === userLogin && item.password === userPassword) {
        username.textContent = item.userName;
      } else if (item.login !== userLogin && item.password !== userPassword) {
        username.textContent = 'Аноним';
        alert('Введите правильные данные!');
        window.location.reload();
      };
    });
  });

  render();
});
