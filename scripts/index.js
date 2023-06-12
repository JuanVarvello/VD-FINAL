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

//Defino la informacion del dataset de Juan
d3.csv("./data/Data-Juan.csv", d3.autoType).then(function (data) {
  DataJuan = data;
  // kick things off
  init();
});

//Defino la informacion del dataset de Agus
d3.csv("./data/Data-Agus.csv", d3.autoType).then(function (data) {
  DataAgus = data;
  // kick things off
  init();
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

  
  //me fijo si el step tiene el atributo data-step
  $step.classed("is-active", true);
  console.count("classed");
  // }

  //Creo el grafico segun el atributo pasado en el data-step
  const key = $step.attr("data-step");

  if(key == "artistName1") {
    createChart1(key);


  }else if(key == "artistName2") {
    createChart2(key);

  }else{
    console.log("No hay grafico para este atributo");
  }
}

function handleStepProgress(response) {
  // console.log(response);
  //$figure.style("opacity", response.progress);
  $step = d3.select(response.element);
  // console.log($step.attr("data-step"));
  $step.select(".progress").text(d3.format(".1%")(response.progress));
}

function init() {
  // 1. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 2. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      debug: false,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);
}

/* DataViz */
function createChart1(key) {
  console.log(key);

  //Agrupo por artista y cuento cuantas veces aparece
  let countByArtist = DataJuan.reduce((count, data) => {
    const artistName1 = data.artistName1;
    count[artistName1] = (count[artistName1] || 0) + 1;
    return count;
  }, {});

  //Busco los artistas que se repitan mas de 150 veces
  let filteredCountByArtist = Object.entries(countByArtist).filter(([artistName1, count]) => count > 150);

  //Me quedo con los nombres de los artistas
  let artistas = [];
  for (const x in filteredCountByArtist) {
    let artista = filteredCountByArtist[x][0];
    filteredCountByArtist[x].push("../data/artistas/" + filteredCountByArtist[x][0] + ".png");
    artistas.push(filteredCountByArtist[x][0]);
  }

  //Filtro los datos por los artistas que se repiten mas de 150 veces
  DataJuan = DataJuan.filter((d) => artistas.includes(d.artistName1));
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
        DataJuan,
        Plot.groupX(
          { y: 'count' },
          {
            x: key, 
            fill: d => d.artistName1 === 'Billie Eilish' ? '#009D23' : d.artistName1 === 'Bizarrap' ? '#669BF1' : d.artistName1 === "Maria Becerra" ? '#906D93' : d.artistName1 === "Tiago PZK" ? '#A3BFA3' : d.artistName1 === 'Bad Bunny' ? '#F5C974': d.artistName1 === 'Tate McRae' ? '#C56B6E': d.artistName1 === 'Emilia' ? '#0A4297': d.artistName1 === 'Sickick' ? '#787878': d.artistName1 === 'TINI' ? '#E49AD3' : '#000000',
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
        y: d => d[1] + 80,
        x: d => d[0],
     
        fontSize: 20,
        align: 'center',
        baseline: 'middle',
      }),
    ],
    
    width: 800,
    height: 500,
    marginBottom: 100,
    nice: true,
    color: true,
  });

  d3.select("#scrolly figure svg").remove();
  d3.select("#scrolly figure").append(() => chart);
}


//Grafico Agus
function createChart2(key) {
  console.log(key);

  //Agrupo por artista y cuento cuantas veces aparece
  let countByArtist = DataAgus.reduce((count, data) => {
    const artistName2 = data.artistName2;
    count[artistName2] = (count[artistName2] || 0) + 1;
    return count;
  }, {});

  //Busco los artistas que se repitan mas de 150 veces
  let filteredCountByArtist = Object.entries(countByArtist).filter(([artistName2, count]) => count > 240);

  //Me quedo con los nombres de los artistas
  let artistas = [];
  for (const x in filteredCountByArtist) {
    filteredCountByArtist[x].push("../data/artistas/" + filteredCountByArtist[x][0] + ".png");
    artistas.push(filteredCountByArtist[x][0]);
  }

  //Filtro los datos por los artistas que se repiten mas de 150 veces
  DataAgus = DataAgus.filter((d) => artistas.includes(d.artistName2));
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

        tickFormat: d => d === "Red Hot Chili Peppers" ? "Red Hot" : d,
        label: null,
        tickRotate:-45,
        fontSize: '15',
      }),
      
      Plot.barY(
        DataAgus,
        Plot.groupX(
          { y: 'count' },
          {
            x: key, 
            fill: d => d.artistName2 === 'Billie Eilish' ? '#009D23' : d.artistName2 === 'Rihanna' ? '#62009E' : d.artistName2 === "Maria Becerra" ? '#906D93' : d.artistName2 === "Zoe Gotusso" ? '#FDC4B8' : d.artistName2 === 'Bad Bunny' ? '#F5C974': d.artistName2 === 'Doja Cat' ? '#BB819A': d.artistName2 === 'Miley Cyrus' ? '#D13A71': d.artistName2 === 'Dua Lipa' ? '#75ACCB': d.artistName2 === 'Alessia Cara' ? '#BAC5C8' : '#000000', 
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
        y: d => d[1] + 200,
        x: d => d[0],
     
        fontSize: 20,
        align: 'center',
        baseline: 'middle',
      }),
    ],
    
    width: 800,
    height: 500,
    marginBottom: 100,
    nice: true,
    color: true,
  });

  d3.select("#scrolly figure svg").remove();
  d3.select("#scrolly figure").append(() => chart);
}
