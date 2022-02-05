import './sass/_currency.scss';
import axios from 'axios';
const refs = {
    form: document.querySelector('.form'),
    inputBuy: document.querySelector('.buy'),
    dropBtn: document.querySelector('.dropbtn'),
    dropDownBtn: document.querySelector('.drop-down-btn'),
    inputSale: document.querySelector('.sale'),
    btnSee: document.querySelector('.btn'),
    dropContent: document.querySelector('.dropdown-content'),
    dropContentSec: document.querySelector('.dropdown-content-second'),
    renderList: document.querySelector('.render-list'),
    renderListSec: document.querySelector('.render-list-second'),
    filterOne: document.querySelector('.filter-input-one'),
    filterSec: document.querySelector('.filter-input-sec')
}

const KEY = '56d8da064067b29f9a03';

async function fetchApi() {
    return await axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${KEY}`).then(response => {
      return response.data.results;
       
    }).then(result => {
        const currency = Object.values(result).map(({ id }) => {
            Arr.push(id)
            return `<li class='render-item'><button name='qwe' type='button' class='render-btn'>${id}</button></li>`
        })
        refs.renderList.insertAdjacentHTML('beforeend', currency.join(''))
        refs.renderListSec.insertAdjacentHTML('beforeend', currency.join(''))
    }).catch(error => {
        console.log(error)
    })
}

fetchApi();
const Arr = [];
refs.form.addEventListener('submit', mathValue)
refs.dropContent.addEventListener('click', changeValue)
refs.dropContentSec.addEventListener('click', changeValue2)

function changeValue(e) {
    refs.dropBtn.textContent = e.target.textContent;
}

function changeValue2(e) {
    refs.dropDownBtn.textContent = e.target.textContent;
}

 function mathValue(e) {
    e.preventDefault();
    const nameCurrencyBuy = e.currentTarget.elements.drop.textContent;
    const nameCurrencySale = e.currentTarget.elements.dropBtn.textContent;
    const valueBuy = e.currentTarget.elements.buy.value;
 fetchChangeApi(nameCurrencyBuy, nameCurrencySale, valueBuy)
}

async function fetchChangeApi(nameCurrencyBuy, nameCurrencySale, valueBuy) {
   await axios.get(`https://free.currconv.com/api/v7/convert?q=${nameCurrencyBuy}_${nameCurrencySale}&compact=ultra&apiKey=${KEY}`)
        .then(response => {
            const value = Number(Object.values(response.data).join('')).toFixed(1);
            const result = value * valueBuy
            refs.inputSale.textContent = result.toFixed(3)
            refs.form.reset();
            
    })
}

refs.filterOne.addEventListener('input', filterCurrencyOne)
refs.filterSec.addEventListener('input', filterCurrencySec)


function filterCurrencyOne() {
     Arr.filter((element => {
        if (element === refs.filterOne.value) {
            refs.renderList.insertAdjacentHTML('afterbegin', `<li class='render-item'><button type='button' class='render-btn'>${element}</button></li>`)
        }
    }))
}

function filterCurrencySec() {
    Arr.filter((element => {
        if (element === refs.filterSec.value) {
            refs.renderListSec.insertAdjacentHTML('afterbegin', `<li class='render-item'><button type='button' class='render-btn'>${element}</button></li>`)
        }
    }))
    
}

