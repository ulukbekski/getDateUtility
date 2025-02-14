#!/usr/bin/env mode

import readline from 'readline'

//Создаем интерфейс для работы с вводом пользователья
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


// Загадываемое случайное число в диапазоне от min до max
const min = 0;
const max = 100;
const secretNumber = Math.floor(Math.random() * (max - min + 1)) - min

console.log(`Загадано число в диапазоне от ${min} до ${max}`);


// Функция для обработки ввода пользователья 
const askGuess = () => {
    rl.question('Ваш вариант: ', (input) => {
        const guess = parseInt(input, 10);
        
        if(isNaN(guess)){
            console.log("Вводи только числа далбоеб!")
            askGuess();
            return;
        }

        if(guess < secretNumber){
            console.log("Больше");
            askGuess();
        }else if(guess > secretNumber){
            console.log("Меньше");
            askGuess();
        }else {
            console.log(`Отгаданно число ${secretNumber}`)
            rl.close()
        }
    });
};

// Поехали нах
askGuess();