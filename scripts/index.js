// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
let wChart = 1200
let hChart = wChart * 0.5;
let DataJuan = [];
let DataAgus = [];
let $step;

//Inicializo scrollama
let scroller = scrollama();

//Defino la informacion del DataJuanset de Juan
d3.csv("./data/Data-Juan.csv", d3.autoType).then(function (data) {
  DataJuan = data;
  // kick things off
  init();
});

//Defino la informacion del DataJuanset de Agus
d3.csv("./data/Data-Agus.csv", d3.autoType).then(function (data) {
  DataAgus = data;
  // kick things off
  //
});

function handleStepExit(response) {
  // if ($step) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
  // }
}

// scrollama event handlers
function handleStepEnter(response) {
  // console.log(response);
  $step = d3.select(response.element);

  
  //me fijo si el step tiene el atributo DataJuan-step
  $step.classed("is-active", true);
  console.count("classed");
  // }

  //Creo el grafico segun el atributo pasado en el DataJuan-step
  const key = $step.attr("data-step");

  if(key === "juan") {
    chart_Juan();


  }else if(key === "agus") {
    chart_Agus();

  }else{
    console.log("No hay grafico para este atributo");
  }
}

function handleStepProgress(response) {
  // console.log(response);
  $figure.style("opacity", response.progress);
  $step = d3.select(response.element);
  // console.log($step.attr("DataJuan-step"));
}

function init() {
  // 1. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 2. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset:1,
      debug: false,

    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);
}

/* DataJuanViz */
function chart_Juan() {

  //Agrupo por artista y cuento cuantas veces aparece
  let countByArtist = DataJuan.reduce((count, DataJuan) => {
    const artistName = DataJuan.artistName;
    count[artistName] = (count[artistName] || 0) + 1;
    return count;
  }, {});

  //Busco los artistas que se repitan mas de 150 veces
  let filteredCountByArtist = Object.entries(countByArtist).filter(([artistName, count]) => count > 150);

  //Me quedo con los nombres de los artistas
  let artistas = [];
  for (const x in filteredCountByArtist) {
    filteredCountByArtist[x].push("../data/artistas/" + filteredCountByArtist[x][0] + ".png");
    artistas.push(filteredCountByArtist[x][0]);
  }

  //Filtro los datos por los artistas que se repiten mas de mincount veces
  DataJuan = DataJuan.filter((d) => artistas.includes(d.artistName));

  let chart = Plot.plot({

    marks: [

      Plot.axisY({
        label: null,
        ticks:0,
      }),


      Plot.axisX({
        label: null,
        tickRotate:-45,
        fontSize: '15',
      }),
      
      Plot.barY(
        DataJuan,
        Plot.groupX(
          { y: 'count' },
          {
            x: 'artistName', 
            fill: d => d.artistName === 'Billie Eilish' ? '#009D23' : d.artistName === 'Bizarrap' ? '#669BF1' : d.artistName === "Maria Becerra" ? '#906D93' : d.artistName === "Tiago PZK" ? '#A3BFA3' : d.artistName === 'Bad Bunny' ? '#F5C974': d.artistName === 'Tate McRae' ? '#C56B6E': d.artistName === 'Emilia' ? '#0A4297': d.artistName === 'Sickick' ? '#787878': d.artistName === 'TINI' ? '#E49AD3': d.artistName === 'Alessia Cara' ? '#BAC5C8': d.artistName === 'Dua Lipa' ? '#75ACCB' : d.artistName === 'Miley Cyrus' ? '#D13A71': d.artistName === "Zoe Gotusso" ? '#FDC4B8' : d.artistName === 'Rihanna' ? '#62009E': '#000000',   
            opacity: 0.5,
            sort: { x: 'y', reverse: true },
          },
        ),
      ),

      Plot.image(filteredCountByArtist,{
        src: d=> d[2],
        y: d => d[1] + 10,
        x: d => d[0],
        width: 115,
        height: 115,
      }),

      Plot.text(filteredCountByArtist,{
        text: d => d[1],
        y: d => d[1] + 60,
        x: d => d[0],
  
      }),
    ],
    
    width: 800,
    height: 700,
    marginBottom: 100,
    nice: true,
    color: true,
  });

  d3.select("#scrolly figure svg").remove();
  d3.select("#scrolly figure").append(() => chart);
}

function chart_Agus() {

  //Agrupo por artista y cuento cuantas veces aparece
  let countByArtist = DataAgus.reduce((count, DataAgus) => {
    const artistName = DataAgus.artistName;
    count[artistName] = (count[artistName] || 0) + 1;
    return count;
  }, {});

  //Busco los artistas que se repitan mas de 150 veces
  let filteredCountByArtist = Object.entries(countByArtist).filter(([artistName, count]) => count > 240);

  //Me quedo con los nombres de los artistas
  let artistas = [];
  for (const x in filteredCountByArtist) {
    filteredCountByArtist[x].push("../data/artistas/" + filteredCountByArtist[x][0] + ".png");
    artistas.push(filteredCountByArtist[x][0]);
  }

  //Filtro los datos por los artistas que se repiten mas de 150 veces
  DataAgus = DataAgus.filter((d) => artistas.includes(d.artistName));
  console.log(filteredCountByArtist);

  let chart = Plot.plot({
    style: {
      fontSize: 10,
    },

    marks: [

      Plot.axisY({
        label: null,
        ticks:0,
      }),


      Plot.axisX({

        label: null,
        tickRotate:-45,
        fontSize: '15',
      }),
      
      Plot.barY(
        DataAgus,
        Plot.groupX(
          { y: 'count' },
          {
            x: 'artistName', 
            fill: d => d.artistName === 'Billie Eilish' ? '#009D23' : d.artistName === 'Rihanna' ? '#62009E' : d.artistName === "Maria Becerra" ? '#906D93' : d.artistName === "Zoe Gotusso" ? '#FDC4B8' : d.artistName === 'Bad Bunny' ? '#F5C974': d.artistName === 'Doja Cat' ? '#BB819A': d.artistName === 'Miley Cyrus' ? '#D13A71': d.artistName === 'Dua Lipa' ? '#75ACCB': d.artistName === 'Alessia Cara' ? '#BAC5C8' : '#000000', 
            sort: { x: 'y', reverse: true },
            opacity: 0.5,
          },
        ),
      ),

      Plot.image(filteredCountByArtist,{
        src: d=> d[2],
        y: d => d[1] + 10,
        x: d => d[0],
        width: 115,
        height: 115,
      }),

      Plot.text(filteredCountByArtist,{
        text: d => d[1],
        y: d => d[1] + 150,
        x: d => d[0],
     

      }),
    ],
    
    width: 800,
    height: 700,
    marginBottom: 100,
    nice: true,
    color: true,
  });

  d3.select("#scrolly figure svg").remove();
  d3.select("#scrolly figure").append(() => chart);
}