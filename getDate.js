#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

const now = new Date();

// Функция для форматирования даты в ISO
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Функция для получения текущей даты и времени
function getCurrentDate() {
    if (argv.year || argv.y) {
        return now.getFullYear();
    } else if (argv.month || argv.m) {
        return now.getMonth() + 1; // Месяцы начинаются с 0
    } else if (argv.date || argv.d) {
        return now.getDate();
    } else {
        return now.toISOString();
    }
}

// Функция для добавления или вычитания времени
function calculateDate(operation, value, unit) {
    const date = new Date(now);
    switch (unit) {
        case 'day':
        case 'days':
            operation === 'add' ? date.setDate(date.getDate() + value) : date.setDate(date.getDate() - value);
            break;
        case 'month':
        case 'months':
            operation === 'add' ? date.setMonth(date.getMonth() + value) : date.setMonth(date.getMonth() - value);
            break;
        case 'year':
        case 'years':
            operation === 'add' ? date.setFullYear(date.getFullYear() + value) : date.setFullYear(date.getFullYear() - value);
            break;
        default:
            throw new Error('Неверная единица времени');
    }
    return date.toISOString();
}

// Основная логика
if (argv._.includes('current')) {
    console.log(getCurrentDate());
} else if (argv._.includes('add')) {
    const value = argv.days || argv.d || argv.months || argv.m || argv.years || argv.y;
    const unit = argv.days ? 'days' : argv.d ? 'days' : argv.months ? 'months' : argv.m ? 'months' : argv.years ? 'years' : argv.y ? 'years' : null;
    if (!value || !unit) {
        console.error('Необходимо указать значение и единицу времени (дни, месяцы или годы)');
        process.exit(1);
    }
    console.log(calculateDate('add', value, unit));
} else if (argv._.includes('sub')) {
    const value = argv.days || argv.d || argv.months || argv.m || argv.years || argv.y;
    const unit = argv.days ? 'days' : argv.d ? 'days' : argv.months ? 'months' : argv.m ? 'months' : argv.years ? 'years' : argv.y ? 'years' : null;
    if (!value || !unit) {
        console.error('Необходимо указать значение и единицу времени (дни, месяцы или годы)');
        process.exit(1);
    }
    console.log(calculateDate('sub', value, unit));
} else {
    console.log('Используйте команды: current, add, sub');
}