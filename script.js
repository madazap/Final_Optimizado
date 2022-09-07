
const cryptoA = [
  { id: "BTC", nombre: "Bitcoin", valor: 32400,},
  { id: "ETH", nombre: "Ethereum", valor: 3200 },
  { id: "XRP", nombre: "XRP", valor: 415 },
  { id: "BNC", nombre: "Binance Coin", valor: 15 },
  { id: "SLN", nombre: "Solana", valor: 11 },
  { id: "UCO", nombre: "USD Coin", valor: 415 }];


const cambio = [
  { id: "USD", valor: 1 },
  { id: "COP", valor: 4200 },
  { id: "GBP", valor: 1.4 },
  { id: "EUR", valor: 1.2 },
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

    getValor(){
        let resultado;
        switch (valor_consulta.criptomoneda) {
            // calculamos el nuevo valor de la crypto y pasamos la varianza
            
            case "BTC":
            // Destructuring
            const [mon1]=cryptoA;
            resultado=this.variable(mon1.valor);
            
            break;
          
            case "ETH":
           const [,mon2] = cryptoA;
           resultado = this.variable(mon2.valor);
            
            break;
            case "XRP":
            const [, , mon3] = cryptoA;
            resultado = this.variable(mon3.valor);
            break;

            case "BNC":
            const [, , , mon4] = cryptoA;
            resultado = this.variable(mon4.valor);
            break;
          
            case "SLN":
            const [, , , , mon5] = cryptoA;
            resultado = this.variable(mon5.valor);
            break;
          
            case "UCO":
            const [, , , , ,mon6] = cryptoA;
            resultado = this.variable(mon6.valor);
            break;

        }
        
        this.mostrarHTML(resultado);
         
        //document.getElementById(`resultado`).innerHTML=resultado;

    }

    evaluaOpc(){
            
            const uno= (this.moneda==="") ? true :false;
            const dos= (this.crypto==="") ? true: false;

        if(uno && dos){
            // no se ha seleccionado una opcion valida
           const mensaje=document.createElement(`div`);
           mensaje.classList.add(`error`);
           mensaje.textContent="Selecciona una opcion valida";
           formulario.appendChild(mensaje);
            setTimeout(()=>{
                mensaje.remove();
            },4000);
            return false;
        }
        else{
            return true;
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
        let pre, vari;
        let actualizaHora=DateTime.now();
        //Objeto hora de actualizacion, para parecer que estamos haciendo una colsulta modofico la hora unos minutos
        //en este caso resto 8 min a la hora real.
        let horaImp=actualizaHora.minus({minutes:8});
        
        [pre,vari]=resultado;
        const parrafoR=document.createElement(`p`);
        parrafoR.classList.add(`precio`);
        parrafoR.innerHTML= `El precio actual es: <span>${pre}</span>`;
       
        const parrafoV = document.createElement(`p`);        
        parrafoV.innerHTML = `Hubo una varianza porcentual de: <span>${vari}  </span>`;

        
        const parrafoH = document.createElement(`p`);
        parrafoH.innerHTML = `Ultima actualizacion Hoy <span>${horaImp.toLocaleString(DateTime.TIME_WITH_SECONDS)}  </span>`;


         hmtlResultado.appendChild(parrafoR);
         hmtlResultado.appendChild(parrafoV);
         hmtlResultado.appendChild(parrafoH);

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
  valor.evaluaOpc() && valor.getValor();
}

function leoValor(e){
    valor_consulta[e.target.name]=e.target.value;
    console.log(valor_consulta);
}