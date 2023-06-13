var artistaSeleccionado
let dataJuan = [];
let dataAgus = [];
let ChartData = [];
var subConjunto = [];

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
                let date = d3.timeParse("%Y-%m-%d %H:%M")(d['endTime']);
                d['month'] = d3.timeFormat("%b")(date);  // Obtener el nombre del mes completo
                d['year'] = d3.timeFormat("%Y")(date);  // Obtener el año con cuatro dígitos
            });

            console.log(ChartData)
            let chart = Plot.plot({
                //Acá tienen que cambiar el gráfico.
                marks: [
                    Plot.line(ChartData,
                        Plot.groupX(
                            { y: 'count'},
                            {
                                x: d => `${d.month} ${d.year}`,
                                curve: 'natural',
                                strokeWidth: 3,
                                opacity: 0.8,
                                stroke: d => d.artistName == "TINI" ? '#E49AD3' : d.artistName === 'Rihanna' ? '#62009E': d.artistName === "Tiago PZK" ? '#A3BFA3' : d.artistName === 'Bad Bunny' ? '#F5C974':'#0000FF',
                            },
                        ),
                    ),

                    Plot.axisX({
                        label: null,
                        fontSize: '15',
                    }),

                    Plot.axisY({
                        label: null,
                       
                      }),
                ],
                width: 1200,
                height: 400,
            });

            // Agregar el gráfico al contenedor
            d3.select('#grafico svg').remove()
            d3.select('#grafico').append(() => chart)

        });
}