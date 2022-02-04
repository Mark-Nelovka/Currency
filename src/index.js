import axios from 'axios';
import './sass/_example.scss';

const refs = {
    ul: document.querySelector('.ul-list'),
    li: document.querySelector('.class')
}
refs.li;

// const KEY = '56d8da064067b29f9a03';

function fetchApi() {
    return axios.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`).then(response => {
      
        return response.data;
       
    }).then(result => {
        const Actual = result.map(({ccy, buy, sale}) => {
            console.log(result)
            return `<li data-action='${ccy}' class='class'>${ccy}: Покупка: ${buy} Продажа: ${sale}</li>`
        })
        refs.ul.insertAdjacentHTML('beforeend', Actual.join(''))
    })
}

fetchApi();
// https://free.currconv.com/api/v7/currencies?q=USD&apiKey=${KEY}

// refs.ul.addEventListener('click', qwe)

// function qwe(e) {
//     if (e.target.nodeName === 'LI') {
//         if (e.target.dataset.action === 'USD') {
            
//         }
//     }
    
// }