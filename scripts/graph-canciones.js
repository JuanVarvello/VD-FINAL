var artistaSeleccionado = 'TINI'
let dataJuan = [];
let dataAgus = [];
let ChartData = [];
let maxValue = 0;

if(artistaSeleccionado =='TINI'){
    createChart()
}

function botonSeleccionado(nombreArtista) {
    //Recibimos el value del boton por parámetro y como los elementos del html tienen el mismo
    //valor en el ID podemos tener el artista seleccionado
    artistaSeleccionado = document.getElementById(nombreArtista).value;
    createChart()
}
  
function createChart() {
    Promise.all([d3.csv("./data/Data-Juan.csv", d3.autoType), d3.csv("./data/Data-Agus.csv", d3.autoType)])
        .then(([dataJuan, dataAgus]) => {
            dataJuanFiltrada = dataJuan.filter(d => d.artistName == artistaSeleccionado)
            dataAgusFiltrada = dataAgus.filter(d => d.artistName == artistaSeleccionado)

            ChartData = dataAgusFiltrada.concat(dataJuanFiltrada)

            ChartData.forEach(d => {
                let date = new Date(d3.timeParse("%Y-%m-%d %H:%M")(d['endTime']));
                d['date'] = new Date(date.getFullYear(),date.getMonth()); 
 
            })
    
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

                style:{
                    fontSize: 15,
                },

                x:{
                    label: null,
                    tickFormat: d3.utcFormat('%b %Y'),
                    
                },
    
                y:{
                    ticks: false,
                    label: null,
                },

                
                marginBottom: 50,
                width: 1100,
                height: 500,
            });

            

            // Agregar el gráfico al contenedor
            d3.select('#grafico1 svg').remove()
            d3.select('#grafico1').append(() => chart)

        });
}