var artistaSeleccionado = 'TINI'
let dataJuan = [];
let dataAgus = [];
let ChartData = [];

if(artistaSeleccionado =='TINI'){
    createChart()
}

function botonSeleccionado(nombreArtista) {
    //Recibimos el value del boton por parámetro y como los elementos del html tienen el mismo
    //valor en el ID podemos tener el artista seleccionado
    artistaSeleccionado = document.getElementById(nombreArtista).value;
    createChart()
}


const meses = {
    'Jan': 0,
    'Feb': 1,
    'Mar': 2,
    'Apr': 3,
    'May': 4,
    'Jun': 5,
    'Jul': 6,
    'Aug': 7,
    'Sep': 8,
    'Oct': 9,
    'Nov': 10,
    'Dec': 11
  };


  function compararFechas(fecha1, fecha2) {
    const [mes1, anio1] = fecha1.split(' ');
    const [mes2, anio2] = fecha2.split(' ');
    
    if (anio1 !== anio2) {
      return anio1.localeCompare(anio2);
    } else {
      return meses[mes1] - meses[mes2];
    }
  }
  
function createChart() {
    Promise.all([d3.csv("./data/Data-Juan.csv", d3.autoType), d3.csv("./data/Data-Agus.csv", d3.autoType)])
        .then(([dataJuan, dataAgus]) => {
            dataJuanFiltrada = dataJuan.filter(d => d.artistName == artistaSeleccionado)
            dataAgusFiltrada = dataAgus.filter(d => d.artistName == artistaSeleccionado)

            ChartData = dataAgusFiltrada.concat(dataJuanFiltrada)

            ChartData.forEach(d => {
                let date = d3.timeParse("%Y-%m-%d %H:%M")(d['endTime']);
                d['date'] = d3.timeFormat("%b %Y")(date);  // Obtener el nombre del mes completo
            });
    
            let chart = Plot.plot({
                //Acá tienen que cambiar el gráfico.
                marks: [
                    Plot.line(ChartData,
                        Plot.groupX(
                            { y: 'count'},
                            {
                                x: 'date',
                                strokeWidth: 5,
                                opacity: 0.8,
                                stroke: d => d.artistName == "TINI" ? '#E49AD3' : d.artistName === 'Rihanna' ? '#62009E': d.artistName === "Tiago PZK" ? '#A3BFA3' : d.artistName === 'Bad Bunny' ? '#F5C974':'#0000FF',
                            },

                        ),
                    ),

                ],

                x:{
                    label: null,
                    //tickFormat: d3.utcFormat('%b %Y'),
    
                },
    
                y:{
                    ticks: false,
                    label: null,
                },
            

                width: 1100,
                height: 400,
            });

            

            // Agregar el gráfico al contenedor
            d3.select('#grafico svg').remove()
            d3.select('#grafico').append(() => chart)

        });
}