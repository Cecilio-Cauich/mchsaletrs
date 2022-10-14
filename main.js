console.log("Hello word");

const btn_refresh = document.querySelector("#btn-refreshpage");
const btn_clean = document.querySelector("#btn-clean");
const contenedorprin = document.querySelector(".main-containter");


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
    inimagen.src = data[index].url;
    inimagen.setAttribute("class","foto");
    contenedorprin.append(inimagen);

  }
}

function cleancontainer() {
  const elementosaeliminar = document.querySelectorAll('.foto');
  for(let elemento of elementosaeliminar){
    contenedorprin.removeChild(elemento);
  }
}

