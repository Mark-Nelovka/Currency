import axios from 'axios';
import './sass/_actyalCur.scss'

const refs = {
    renderListBuy: document.querySelector('.render-list'),
    renderListSale: document.querySelector('.render-list-sec'),
    contantBtn: document.querySelector('.dropbtn'),
    contantDropBtn: document.querySelector('.drop-down-btn'),
    dropContent: document.querySelector('.dropdown-content'),
    dropContentSec: document.querySelector('.dropdown-content-second'),
    btnSub: document.querySelector('.btn'),
    spanValue: document.querySelector('.span-value'),
    form: document.querySelector('.form'),
    filterSec: document.querySelector('.filter-input-sec'),
    filterOne: document.querySelector('.filter-input-one')
}

const KEY = '56d8da064067b29f9a03';

async function fetchApi() {
    return await axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${KEY}`).then(response => {
        return response.data.results;
       
    }).then(result => {
        const cur = Object.values(result).map(({ id }) => {
            Arr.push(id)
            return `<li class='render-item'><button type='button' class='render-btn'>${id}</button></li>`
        })
        refs.renderListBuy.insertAdjacentHTML('beforeend', cur.join(''))
        refs.renderListSale.insertAdjacentHTML('beforeend', cur.join(''))
    }).catch(error => {
        console.log(error)
    })
}

fetchApi();
let Arr = [];

refs.dropContent.addEventListener('click', textContentValueBtn)
refs.dropContentSec.addEventListener('click', textContentValueBtnSec)
refs.form.addEventListener('submit', submit)

function textContentValueBtn(e) {
    
    refs.contantBtn.textContent = e.target.textContent;
}

function textContentValueBtnSec(e) {
    refs.contantDropBtn.textContent = e.target.textContent;
}

function submit(e) {
        e.preventDefault();
    const nameCurrency = e.currentTarget.elements.drop.textContent;
    const nameCurrencySec = e.currentTarget.elements.dropBtn.textContent;
    
fetchChange(nameCurrency, nameCurrencySec)
}

function fetchChange(nameCurrency, nameCurrencySec) {
        axios.get(`https://free.currconv.com/api/v7/convert?q=${nameCurrency}_${nameCurrencySec}&compact=ultra&apiKey=${KEY}`)
        .then(response => {
            const value = Number(Object.values(response.data).join('')).toFixed(3);
            refs.spanValue.textContent = value;
            refs.form.reset();
        }).catch(error => {
        console.log(error)
    })
}

refs.filterSec.addEventListener('input', filterCurrencySec)
refs.filterOne.addEventListener('input', filterCurrencyOne)

function filterCurrencySec() {
    Arr.filter((element => {
        if (element === refs.filterSec.value) {
            refs.renderListSale.insertAdjacentHTML('afterbegin', `<li class='render-item'><button type='button' class='render-btn'>${element}</button></li>`)
        }
    }))
    
}

function filterCurrencyOne() {
     Arr.filter((element => {
        if (element === refs.filterOne.value) {
            refs.renderListBuy.insertAdjacentHTML('afterbegin', `<li class='render-item'><button type='button' class='render-btn'>${element}</button></li>`)
        }
    }))
}
