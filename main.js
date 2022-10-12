console.log("Hello word");

const btn_refresh = document.querySelector("#btn-refreshpage");
function reload() {
  reload = location.reload();
}

const btn_clean = document.querySelector("#btn-clean");

btn_refresh.addEventListener("click", reload, false);
btn_clean.addEventListener("click", cleancontainer, false);

const contenedorprin = document.querySelector(".main-containter");


async function reload() {
  let cantidadgatos = document.querySelector("#input-num").value
  const res = await fetch("https://api.thecatapi.com/v1/images/search?limit="+cantidadgatos);
  const data = await res.json();
   
  console.log("Después del await"+data)
  for (let index = 0; index < cantidadgatos; index++) {
    const inimagen = document.createElement("img");
    inimagen.src = data[index].url;
    console.log(data[index].url)
    inimagen.setAttribute("class", "foto");
    contenedorprin.append(inimagen);
  }
}

function cleancontainer() {
  const elementosaeliminar = document.querySelectorAll('.foto');
  for(let elemento of elementosaeliminar){
    contenedorprin.removeChild(elemento);
  }
}

