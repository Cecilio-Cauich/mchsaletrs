console.log("Hello word");

const btn_refresh = document.querySelector("#btn-refreshpage");
const btn_clean = document.querySelector("#btn-clean");
const contenedorprin = document.querySelector("#cont-content");


function reload() {
  reload = location.reload();
}

btn_refresh.addEventListener("click", reload, false);
btn_clean.addEventListener("click", cleancontainer, false);

async function reload() {
  let cantidadgatos = document.querySelector("#input-num").value

  const res = await fetch('https://api.thecatapi.com/v1/images/search?limit='+cantidadgatos+'&api_key=live_Y011HAuLgyQFPeUMLJ193i0XxMEp2bE6LT5MKfAtpc9lX1p7e8O59jO28cAdIdnX');
  const data = await res.json();
  for (let index = 0; index < cantidadgatos; index++) {
    const inimagen = document.createElement("img");
    const contenedorBtnImg = document.createElement("div");
    const btnFavorito = document.createElement("button","Guardar");
  
    inimagen.setAttribute("class","foto");
    contenedorBtnImg.setAttribute("class","cont-img-btn")
    btnFavorito.setAttribute("class","btn-fav");
    btnFavorito.type='button';
    btnFavorito.innerHTML='Guardar';
    
    inimagen.src = data[index].url;
  
    contenedorBtnImg.append(inimagen);
    contenedorBtnImg.append(btnFavorito);
    contenedorprin.append(contenedorBtnImg);
  }
  
}

function cleancontainer() {
  const elementosaeliminar = document.querySelectorAll('.cont-img-btn');
  for(let elemento of elementosaeliminar){
    contenedorprin.removeChild(elemento);
  }
}

