import './sass/main.scss';
import axios from 'axios';
const refs = {
    form: document.querySelector('.form'),
    inputBuy: document.querySelector('.buy'),
    dropBtn: document.querySelector('.dropbtn'),
    dropDownBtn: document.querySelector('.drop-down-btn'),
    inputSale: document.querySelector('.sale'),
    btnSee: document.querySelector('.btn'),
    ul: document.querySelector('.ul-list'),
    ulSale: document.querySelector('.ul-list-sale'),
    divCur: document.querySelector('.dropdown-content'),
    divCur2: document.querySelector('.dropdown-content-second'),
    renderList: document.querySelector('.render-list'),
    renderListSec: document.querySelector('.render-list-second')
}

const KEY = '56d8da064067b29f9a03';
console.log(refs.divCur)


function fetchApi() {
    return axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${KEY}`).then(response => {
      
        return response.data.results;
       
    }).then(result => {
        const cur = Object.values(result).map(({id}) => {
            return `<li class='render-item'><button class='render-btn'>${id}</button></li>`
        })
        refs.renderList.insertAdjacentHTML('beforeend', cur.join(''))
        refs.renderListSec.insertAdjacentHTML('beforeend', cur.join(''))
    })
}

fetchApi();
refs.form.addEventListener('submit', mathValue)
refs.divCur.addEventListener('click', changeValue)
refs.divCur2.addEventListener('click', changeValue2)

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
    const valueSale = e.currentTarget.elements.sale.value
    
fetchChangeApi(nameCurrencyBuy, nameCurrencySale, valueBuy)
}

function fetchChangeApi(nameCurrencyBuy, nameCurrencySale, valueBuy) {
    axios.get(`https://free.currconv.com/api/v7/convert?q=${nameCurrencyBuy}_${nameCurrencySale}&compact=ultra&apiKey=${KEY}`)
        .then(response => {
            const value = Number(Object.values(response.data).join('')).toFixed(1);
            const result = valueBuy * value;
            console.log(result)
    })
}