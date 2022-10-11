console.log("Hello word");

const btn_refresh = document.querySelector('#refreshpage');
function reload(){
    reload = location.reload();
}
btn_refresh.addEventListener("click", reload, false);

const API_URL = 'https://api.thecatapi.com/v1/images/search';


async function reload(){
    const res = await fetch(API_URL);
    const data = await res.json();

    const img = document.querySelector('img');
    img.src = data[0].url
}
reload();