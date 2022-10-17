const btn_refresh = document.querySelector("#btn-refreshpage");
const btn_clean = document.querySelector("#btn-clean");
const btn_favorite = document.querySelector("#btn-favorite");
const contenedorprin = document.querySelector("#cont-content");
const spanError = document.querySelector("#error");

btn_refresh.addEventListener("click", loadRandomMichis, false);
btn_clean.addEventListener("click", cleancontainer, false);
btn_favorite.addEventListener("click",loadFavoriteMichis, false)


//URL Base
const URL_RANDOM = "https://api.thecatapi.com/v1/images/search?";
const URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?";
const API_KEY =
  "api_key=live_Y011HAuLgyQFPeUMLJ193i0XxMEp2bE6LT5MKfAtpc9lX1p7e8O59jO28cAdIdnX";

//--
//--------Funcitions
//--
async function loadRandomMichis() {
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

      //el boton tiene el id de la imagen
      btnAddFav.setAttribute("id", data[index].id);

      //atributos extras para la imagen, boton y el contenedor
      inimagen.setAttribute("class", "foto");
      contenedorBtnImg.setAttribute("class", "cont-img-btn");
      btnAddFav.setAttribute("class", "btn-fav");
      btnAddFav.type = "button";
      btnAddFav.innerHTML = "Guardar";

      //En dado caso de onClick se manda el id de la imagen
      btnAddFav.setAttribute(
        "onClick",
        `saveFavoriteMichis('${btnAddFav.id}')`
      );

      //agregamoos todo al contenedor principal
      contenedorBtnImg.append(inimagen);
      contenedorBtnImg.append(btnAddFav);
      contenedorprin.append(contenedorBtnImg);
    }
  }
}

async function loadFavoriteMichis() {
  const res = await fetch(`${URL_FAVORITES}&${API_KEY}`);
  const data = await res.json();
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    data.forEach(michi => {
      const inimagen = document.createElement("img");
      const contenedorBtnImg = document.createElement("div");
      const btnDeleteFav = document.createElement("button");

      // agrega imagen
      inimagen.src = michi.image.url;

      //el boton tiene el id de la imagen
      btnDeleteFav.setAttribute("id", michi.image.url);

      //atributos extras para la imagen, boton y el contenedor
      inimagen.setAttribute("class", "foto");
      contenedorBtnImg.setAttribute("class", "cont-img-btn");
      btnDeleteFav.setAttribute("class", "btn-fav");
      btnDeleteFav.type = "button";
      btnDeleteFav.innerHTML = "Quitar";

      //En dado caso de onClick se manda el id de la imagen
      btnDeleteFav.setAttribute(
        "onClick",
        `saveFavoriteMichis('${btnDeleteFav.id}')`
      );

      //agregamoos todo al contenedor principal
      contenedorBtnImg.append(inimagen);
      contenedorBtnImg.append(btnDeleteFav);
      contenedorprin.append(contenedorBtnImg);
    });
  }
}

async function saveFavoriteMichis(cat_id) {
  const res = await fetch(`${URL_FAVORITES}${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

//--
//-----Clean the container
//--
function cleancontainer() {
  const elementosaeliminar = document.querySelectorAll(".cont-img-btn");
  for (let elemento of elementosaeliminar) {
    contenedorprin.removeChild(elemento);
  }
}


