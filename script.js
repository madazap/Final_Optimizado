
const cryptoA = [
  { id: "BTC", nombre: "Bitcoin", valor: 32400 },
  { id: "ETH", nombre: "Ethereum", valor: 3200 },
  { id: "XRP", nombre: "XRP", valor: 415 },
  { id: "BNB", nombre: "Binance Coin", valor: 15 },
  { id: "USDT", nombre: "Tether", valor: 11 },
  { id: "USDC", nombre: "USD Coin", valor: 415 },
  { id: "SOL", nombre: "Solana", valor: 415 },
  { id: "DOGE", nombre: "Dodge Coin", valor: 415 },
];


const cambio = [
  { id: "USD", valor: 1 },
  { id: "COP", valor: 4200 },
  { id: "GBP", valor: 1.4 },
  { id: "EUR", valor: 1.2 },
  { id: "RUB", valor: 1.2 },
];

const DateTime =luxon.DateTime;

let valor_consulta={ moneda:"", criptomoneda:"",};

const lista0=document.getElementById("moneda");
const lista1 = document.getElementById("criptomonedas");
const formulario = document.getElementById("formulario");
const hmtlResultado=document.getElementById("resultado");

// pasar el arreglo de nombres de crypto como opcion de la lista
cryptoA.forEach(function(mon){
    //console.log(mon.nombre)
    const opcion=document.createElement(`option`);
    opcion.value=mon.id;
    opcion.textContent=mon.nombre;
    lista1.appendChild(opcion);
})


class cotizar {
    constructor(moneda, crypto) {
        this.moneda = moneda;
        this.crypto = crypto;
    }


    evaluaOpc(){
            
            const existeE=document.querySelector('.error');
            const uno= (this.moneda=="") ? false :true;
            const dos= (this.crypto=="") ? false: true;
            console.log(uno + " variables antes de evaluar " + dos);
        
         //  se ha seleccionado una opcion valida
        if(uno && dos){
           
           return true; 
           
        }
        else{
            if (!existeE) {
              //impedir que se ejecute el div de error varias veces

              const mensaje = document.createElement(`div`);
              mensaje.classList.add(`error`);
              mensaje.textContent = "Selecciona una opcion valida";
              formulario.appendChild(mensaje);
              setTimeout(() => {
                mensaje.remove();
              }, 4000);
              return false;
            }
        }

    }
    
    variable(total){
      //calcula la varianza de la moneda dado el valor iniciar y la varianza aleatoria
      // Esta funcion genera un valor aleatorio del valor de la criptomoneda, el ideal es qie sea reemplazada despues por una llamada
      // a BD o a una API que tenga esta informacion en tiempo real.
      let valorFinal = parseInt(total);
      let varianza = Math.floor(Math.random() * 201) - 100;
      valorFinal=valorFinal+(valorFinal*(varianza/100));
      let valorF=[valorFinal, varianza];
      return valorF;
    }

    mostrarHTML(resultado){
        
        const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR}=resultado;
        
        this.limpiarHTML();
       
        let actualizaHora=DateTime.now();
        //Objeto hora de actualizacion, para parecer que estamos haciendo una colsulta modofico la hora unos minutos
        //en este caso resto 8 min a la hora real.
        let horaImp=actualizaHora.minus({minutes:8});
        
        const ExisteP=document.querySelector(`.precio`);

            if(!ExisteP){
                    const parrafoR = document.createElement(`p`);
                    parrafoR.classList.add(`precio`);
                    parrafoR.innerHTML = `El precio actual es: <span>${PRICE}</span>`;

                    const parrafoV = document.createElement(`p`);
                    parrafoV.innerHTML = `Hubo una varianza de: <span>${CHANGEPCT24HOUR} % </span>`;

                    const parrafoH = document.createElement(`p`);
                    parrafoH.innerHTML = `Ultima actualizacion <span>${horaImp.toLocaleString(
                      DateTime.TIME_WITH_SECONDS
                    )}  </span>`;

                    const parrafoBajo = document.createElement(`p`);
                    parrafoBajo.innerHTML = `Precio mas bajo de hoy <span>${LOWDAY}  </span>`;

                    const parrafoAlto = document.createElement(`p`);
                    parrafoAlto.innerHTML = `Precio mas alto de hoy <span>${HIGHDAY}  </span>`;

                    hmtlResultado.appendChild(parrafoR);
                    hmtlResultado.appendChild(parrafoV);
                    hmtlResultado.appendChild(parrafoH);
                    hmtlResultado.appendChild(parrafoBajo);
                    hmtlResultado.appendChild(parrafoAlto);
            }

            else{
                return;
            }

        


    }

    consultasApi(){

            const { moneda, criptomoneda } = valor_consulta;
            console.log(moneda + " valores del fecth  " + criptomoneda);
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

            fetch(url)
              .then((respuesta) => respuesta.json())
              .then((cotizacion) => {
                //console.log(cotizacion.DISPLAY[criptomoneda][moneda]);
                this.mostrarHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
              });

    }

   limpiarHTML(){
       while(hmtlResultado.firstChild){
           hmtlResultado.removeChild(hmtlResultado.firstChild);
       }
   }

}
formulario.addEventListener(`change`, leoValor);
formulario.addEventListener(`submit`, validar);


function validar(e){
  e.preventDefault();
 
  // operador logico para definir si hay opcion valida voy a deconstruir el objeto
  const { moneda, criptomoneda } = valor_consulta;
  const valor = new cotizar(moneda, criptomoneda);
  //creado desde los campos para usar las funciones que se piden en el desafio

  valor.evaluaOpc() && valor.consultasApi();
  
}

function leoValor(e){
    valor_consulta[e.target.name]=e.target.value;
    console.log(valor_consulta);
}

