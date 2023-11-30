
//Variables
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

//Inputs

//addEventListener
window.addEventListener("load", ()=>{
    formulario.addEventListener("submit", buscarClima);
});


// 1)Hacer variables, añadir addEventListener al submit
// 2)Hacer función para mostrar el mensaje
// 3)Consultar API
// 4) Mostrar información de la API en el HTML


//Funciones
function buscarClima(e) {
    e.preventDefault();

    //Validar los campos
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if(ciudad === "" || pais === ""){
        mostrarError("Ambos campos son necesarios");
        return;
    }

    //Consultar a la API
    consultarAPI(ciudad, pais); //Le mandamos a la API los values del form
}


function mostrarError(mensaje) {
    const alerta = document.querySelector(".bg-red-100");

    if(!alerta){ //No va a agregar multiples alertas
        //Crea una alerta
        const alerta = document.createElement("div");
        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded","max-w-md", "mt-6", "text-center", "mx-auto");
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);

        //Se elimina la alerta después de 5 seg
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) { //Le mandamos a la API los values del form
    const appId = "e7962f70bad66bc1d2af2c3ba767d600"; //API key
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`; //Cargamos los datos

    spinner(); //Lo llamamos porque aquí empieza a llamar al servidor
    
    fetch(url)
        .then( respuesta => respuesta.json()) //Le pedimos a la API los datos
        .then( datos => { //Ya tenemos los datos

            limpiarHTML(); //Antes de tener la respuesta limpiamos el HTML

            if(datos.cod === "404"){
                mostrarError("Ciudad no encontrada")
                return;
            }
            //Imprime respuesta en el HTMl
            mostrarClima(datos);
        }); 


}

function mostrarClima(datos) {
    const { name, main: {temp, temp_max, temp_min}} = datos;

    const centigrados = gradosKelvin(temp);
    const max = gradosKelvin(temp_max);
    const min = gradosKelvin(temp_min);

    const nombreCiudad = document.createElement("p");
    nombreCiudad.innerHTML = `Clima en ${name}`;
    nombreCiudad.classList.add("font-bold","text-2xl", "text-center");
    

    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451`; //Añadimos HTML porque usaremos template strings
    actual.classList.add("font-bold", "text-6xl");

    const tempMaxima = document.createElement("p");
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add("text-xl", "text-white", "text-center");
    
    const tempMinima = document.createElement("p");
    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add("text-xl", "text-white", "text-center");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center","text-white");
    resultadoDiv.appendChild(actual);
    resultado.appendChild(nombreCiudad);
    resultado.appendChild(resultadoDiv);
    resultado.appendChild(tempMaxima);
    resultado.appendChild(tempMinima);
    
}

function gradosKelvin(temp) {
    return Math.round(temp - 273.15);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {

    limpiarHTML();
    const divSpinenr = document.createElement("div");
    divSpinenr.classList.add("sk-fading-circle", "sk-circle");
    divSpinenr.innerHTML = `
    
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>

    `

    resultado.appendChild(divSpinenr);
}
