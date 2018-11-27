const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];
fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data));

document.addEventListener('DOMContentLoaded', () =>{
    inputSearch.focus();
    inputSearch.classList.add('progress');
});

// Create Match Function
function findMatches(word, cities) {
    return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regx = new RegExp(word, 'gi');
        return place.city.match(regx) || place.state.match(regx);
    });
}

// Create Function To diplay data what You Need
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const regex = new RegExp(this.value, 'gi');
    const html = matchArray.map(place => {
    const cityName = place.city.replace(regex, `<span class="name">${this.value}</span>`)
        return `<li>
                    <span>
                      ${cityName}
                    </span>,
                      ${place.state}
                <li>`;
    }).join('');
    Suggistions.innerHTML = html;
}
const inputSearch = document.querySelector('.search');
const Suggistions = document.querySelector('.suggestions');
const Progress = document.querySelector('.progress');

// Add Events For Input Field
inputSearch.addEventListener('change', displayMatches);
inputSearch.addEventListener('keyup', displayMatches);
