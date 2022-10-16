const btn_refresh = document.querySelector("#btn-refreshpage");
const btn_clean = document.querySelector("#btn-clean");
const contenedorprin = document.querySelector("#cont-content");
const spanError = document.querySelector('#error');

btn_refresh.addEventListener("click", loadRandomMichis, false);
btn_clean.addEventListener("click", cleancontainer, false);

//URL Base
async function loadRandomMichis() {
  let cantidadgatos = document.querySelector("#input-num").value

  const res = await fetch('https://api.thecatapi.com/v1/images/search?limit='+cantidadgatos+'&api_key=live_Y011HAuLgyQFPeUMLJ193i0XxMEp2bE6LT5MKfAtpc9lX1p7e8O59jO28cAdIdnX');
  const data = await res.json();
  
  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: "+res.status+data.message;
  }else{
    for (let index = 0; index < cantidadgatos; index++) {
      const inimagen = document.createElement("img");
      const contenedorBtnImg = document.createElement("div");
      const btnFavourite = document.createElement("button","Guardar");
      
      // agrega imagen
      inimagen.src = data[index].url;

      //el boton tiene el id de la imagen
      btnFavourite.setAttribute("id",data[index].id);
       
      //atributos extras para la imagen, boton y el contenedor
      inimagen.setAttribute("class","foto");
      contenedorBtnImg.setAttribute("class","cont-img-btn")
      btnFavourite.setAttribute("class","btn-fav");
      btnFavourite.type='button';
      btnFavourite.innerHTML='Guardar';
      

      //En dado caso de onClick se manda el id de la imagen
      btnFavourite.setAttribute("onClick",`saveFavoriteMichis('${btnFavourite.id}')`);
     
      //agregamoos todo al contenedor principal
      contenedorBtnImg.append(inimagen);
      contenedorBtnImg.append(btnFavourite);
      contenedorprin.append(contenedorBtnImg);
    }
  }


  
}

async function loadFavoritesMichis() {
  console.log("favoritos");

  const res = await fetch('https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_Y011HAuLgyQFPeUMLJ193i0XxMEp2bE6LT5MKfAtpc9lX1p7e8O59jO28cAdIdnX');
  const data = await res.json();
  console.log(data);
  // for (let index = 0; index < cantidadgatos; index++) {
  //   const inimagen = document.createElement("img");
  //   const contenedorBtnImg = document.createElement("div");
  //   const btnFavorito = document.createElement("button","Guardar");
  
  //   inimagen.setAttribute("class","foto");
  //   contenedorBtnImg.setAttribute("class","cont-img-btn")
  //   btnFavorito.setAttribute("class","btn-fav");
  //   btnFavorito.type='button';
  //   btnFavorito.innerHTML='Guardar';
    
  //   inimagen.src = data[index].url;
  
  //   contenedorBtnImg.append(inimagen);
  //   contenedorBtnImg.append(btnFavorito);
  //   contenedorprin.append(contenedorBtnImg);
  // }
  
}

function cleancontainer() {
  const elementosaeliminar = document.querySelectorAll('.cont-img-btn');

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: "+res.status;
  }else{
    for(let elemento of elementosaeliminar){
      contenedorprin.removeChild(elemento);
    }
  }
}


async function saveFavoriteMichis(cat_id){
  const res = await fetch("https://api.thecatapi.com/v1/favourites?api_key=live_Y011HAuLgyQFPeUMLJ193i0XxMEp2bE6LT5MKfAtpc9lX1p7e8O59jO28cAdIdnX",{
    method  : 'POST',
    headers:{
      'Content-Type':'application/json',      
    },
    body : JSON.stringify({
      image_id:cat_id
    })
  });


  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: "+res.status+data.message
  }{
    alert(`gato_id: ${cat_id} guardado existosamente`);
  }
  
}


