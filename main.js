const btn_refresh = document.querySelector("#btn-refreshpage");
const btn_clean = document.querySelector("#btn-clean");
const btn_favorite = document.querySelector("#btn-favorite");
const btn_uploadcat = document.querySelector('#btn-loadcat');
const contenedorprin = document.querySelector("#cont-content");
const spanError = document.querySelector("#error");

btn_refresh.addEventListener("click", loadRandomMichis, false);
btn_clean.addEventListener("click", cleancontainer, false);
btn_favorite.addEventListener("click", loadFavoriteMichis, false);
btn_uploadcat.addEventListener("click", createElementsLoad,false);

//URL Base
const URL_RANDOM = "https://api.thecatapi.com/v1/images/search?";
const URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const API_KEY =
  "live_Y011HAuLgyQFPeUMLJ193i0XxMEp2bE6LT5MKfAtpc9lX1p7e8O59jO28cAdIdnX";
const URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";

//--
//--------Funcitions
//--
async function loadRandomMichis() {
  cleancontainer();
  let cantidadgatos = document.querySelector("#input-num").value;

  const res = await fetch(`${URL_RANDOM}limit=${cantidadgatos}&${API_KEY}`);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    for (let index = 0; index < cantidadgatos; index++) {
      const inimagen = document.createElement("img");
      const contenedorBtnImg = document.createElement("div");
      const btnAddFav = document.createElement("button");

      // agrega imagen
      inimagen.src = data[index].url;

      //atributos extras para la imagen, boton y el contenedor
      inimagen.setAttribute("class", "foto");
      contenedorBtnImg.setAttribute("class", "cont-img-btn");
      btnAddFav.setAttribute("class", "btn-img");
      btnAddFav.type = "button";
      btnAddFav.innerHTML = "Guardar";

      //En dado caso de onClick se manda el id de la imagen
      btnAddFav.setAttribute(
        "onClick",
        `saveFavoriteMichis('${data[index].id}')`
      );

      //agregamoos todo al contenedor principal
      contenedorBtnImg.append(inimagen);
      contenedorBtnImg.append(btnAddFav);
      contenedorprin.append(contenedorBtnImg);
    }
  }
}
async function loadFavoriteMichis() {
  cleancontainer();
  const res = await fetch(`${URL_FAVORITES}`, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    data.forEach((michi) => {
      const inimagen = document.createElement("img");
      const contenedorBtnImg = document.createElement("div");
      const btnDeleteFav = document.createElement("button");

      // agrega imagen
      inimagen.src = michi.image.url;

      //atributos extras para la imagen, boton y el contenedor
      inimagen.setAttribute("class", "foto");
      contenedorBtnImg.setAttribute("class", "cont-img-btn");
      btnDeleteFav.setAttribute("class", "btn-img");
      btnDeleteFav.type = "button";
      btnDeleteFav.innerHTML = "Quitar";

      // En dado caso de onClick se manda el id de la imagen
      btnDeleteFav.setAttribute(
        "onClick",
        `deleteFavoritesMichis('${michi.id}')`
      );

      //agregamoos todo al contenedor principal
      contenedorBtnImg.append(inimagen);
      contenedorBtnImg.append(btnDeleteFav);
      contenedorprin.append(contenedorBtnImg);
    });
  }
}
async function saveFavoriteMichis(cat_id) {
  const res = await fetch(`${URL_FAVORITES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify({
      image_id: cat_id,
    }),
  });

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
  {
    alert(`gato_id: ${cat_id} guardado existosamente`);
  }
}
async function deleteFavoritesMichis(cat_id) {
  const res = await fetch(`${URL_FAVORITES}/${cat_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "text/plain",
      "X-API-KEY": API_KEY,
    },
  });

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
  {
    alert(`gato_id: ${cat_id} eliminado existosamente`);
    loadFavoriteMichis();
  }
}
async function uploadPhoto() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);
  console.log(formData.get("file"));

  const res = await fetch(URL_UPLOAD, {
    method: "POST",
    headers: {
      "X-API-KEY": API_KEY,
    },

    body: formData,
  });
  const data = await res.json();
  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`;
  } else {
    saveFavoriteMichis(data.id);
    uploadPhoto();
    alert(`gato_id: ${cat_id} subido existosamente puede verlo en favoritos`);

  }
}
//--
//-----Clean the container
//--
function cleancontainer() {
  const elementosaeliminar = document.querySelectorAll(".cont-img-btn");
  for (let elemento of elementosaeliminar) {
    contenedorprin.removeChild(elemento);
  }
}
function createElementsLoad(){
  cleancontainer();
  const sectionUpLoad = document.createElement("section");
  sectionUpLoad.setAttribute("id","uploadingMichi");

  const h2UpLoad = document.createElement("h2");
  h2UpLoad.setAttribute("id","title-load-cat");
  h2UpLoad.innerText ="Selecciona una foto en tu maquina";

  const formUpLoad = document.createElement("form");
  formUpLoad.setAttribute("id","uploadingForm");

  const inputUpLoad = document.createElement("input");
  inputUpLoad.setAttribute("type","file");
  inputUpLoad.setAttribute("name","file");

  const buttonUpLoad = document.createElement("button");
  buttonUpLoad.type="button";
  buttonUpLoad.setAttribute("onClick","uploadPhoto()");
  buttonUpLoad.innerHTML="Subir";
  buttonUpLoad.setAttribute("class","load-item");

  sectionUpLoad.append(h2UpLoad);
  formUpLoad.append(inputUpLoad);
  formUpLoad.append(buttonUpLoad);
  sectionUpLoad.append(formUpLoad);
  document.body.appendChild(sectionUpLoad);
}

