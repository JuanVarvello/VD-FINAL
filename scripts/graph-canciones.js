var artistaSeleccionado = 'TINI'
let dataJuan = [];
let dataAgus = [];
let ChartData = [];
let maxValue = 0;

function CambiarTexto(nombreArtista) {
    let descripcion = document.getElementById("descripcion");

    if (nombreArtista == 'TINI') {

        let texto = "TINI, cuyo nombre real es Martina Stoessel, es una cantante, actriz y bailarina argentina. Ganó reconocimiento internacional por su papel protagónico en la exitosa serie de Disney Channel 'Violetta'. Como cantante solista, ha lanzado varios álbumes y sus canciones combinan diferentes géneros como el pop, el reggaetón y la música latina.";
        descripcion.innerHTML = texto;

    }else if (nombreArtista == 'Rihanna') {

        let texto = "Rihanna es una cantante, actriz y empresaria de origen barbadense. Ha alcanzado fama mundial con su versatilidad musical y su carisma en el escenario. A lo largo de su carrera, ha experimentado con diversos géneros como el pop, R&B, dancehall y reggae. También es reconocida por su estilo icónico y su éxito en el mundo de la moda y la belleza.";
        descripcion.innerHTML = texto;

    }else if (nombreArtista == 'Tiago PZK') {

        let texto = "Tiago PZK es un cantante de trap y reggaetón argentino. Es reconocido por su estilo fresco y sus ritmos contagiosos. Sus letras a menudo abordan temas relacionados con el amor, las fiestas y la vida urbana. Ha logrado cautivar a un amplio público joven en Argentina y más allá.";
        descripcion.innerHTML = texto;

    }else if (nombreArtista == 'Bad Bunny') {

        let texto = "Bad Bunny es un cantante y compositor puertorriqueño reconocido por su influencia en la música urbana y el trap latino. Ha logrado éxitos en las listas de popularidad a nivel mundial y es conocido por su estilo único y letras provocativas. Su música ha trascendido barreras lingüísticas y ha colaborado con artistas internacionales.";
        descripcion.innerHTML = texto;
    }else{}
}

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
                                strokeWidth: 6,
                                opacity: 1,
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

                marginLeft: -55,
                marginRight: 35,
                width: 1000,
                height: 500,
            
            });

            

            // Agregar el gráfico al contenedor
            d3.select('#grafico1 svg').remove()
            d3.select('#grafico1').append(() => chart)

        });
}