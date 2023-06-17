var artistaSeleccionado = 'TINI'

var ondas = {

    //TINI
    "Mienteme": "data/ondas/TINI-Mienteme.png",
    "Cupido": "data/ondas/TINI-Cupido.png",
    "La Triple T": "data/ondas/TINI-LaTripleT.png",
    "La Loto": "data/ondas/TINI-LaLoto.png",
    "Muñecas": "data/ondas/TINI-Muñecas.png",

    //Bad Bunny
    "Me Porto Bonito": "data/ondas/BadBunny-MePortoBonito.png",
    "DAKITI": "data/ondas/BadBunny-DAKITI.png",
    "Titi me Pregunto": "data/ondas/BadBunny-TitiMePregunto.png",
    "Moscow Mule": "data/ondas/BadBunny-MoscowMule.png",
    "Ojitos Lindos": "data/ondas/BadBunny-OjitosLindos.png",

    //Rihanna
    "Umbrella": "data/ondas/Rihanna-Umbrella.png",
    "Don't Stop the Music": "data/ondas/Rihanna-DontStopTheMusic.png",
    "Disturbia": "data/ondas/Rihanna-Disturbia.png",
    "Only Girl (In the World)": "data/ondas/Rihanna-OnlyGirlInTheWorld.png",
    "S&M": "data/ondas/Rihanna-S&M.png",

    //Tiago PZK
    "Entre Nosotros": "data/ondas/TiagoPZK-EntreNosotros.png",
    "Salimos de Noche": "data/ondas/TiagoPZK-SalimosDeNoche.png",
    "Nos Comemos (feat. Ozuna)": "data/ondas/TiagoPZK-NosComemos.png",
    "Traductor": "data/ondas/TiagoPZK-Traductor.png",
    "Sex & Love": "data/ondas/TiagoPZK-Sex&Love.png",
  };

//default
if(artistaSeleccionado === 'TINI'){
    añadirOpcion("Muñecas")
    añadirOpcion("La Loto")
    añadirOpcion("La Triple T")
    añadirOpcion("Cupido")
    añadirOpcion("Mienteme")
    document.onda.src = ondas["Muñecas"]
}

//Funcion para agregar opciones al selector de canciones
function añadirOpcion(cancion){
    var SelectorCanciones = document.getElementById("SelectorCanciones");
    var option = document.createElement("option");
    option.text = cancion;
    SelectorCanciones.add(option);
    }

function botonSeleccionado2(nombreArtista) {

    //Recibimos el value del boton por parámetro y como los elementos del html tienen el mismo
    artistaSeleccionado = document.getElementById(nombreArtista).value;

    //Vacio las opciones viejas
    var SelectorCanciones = document.getElementById("SelectorCanciones");
    SelectorCanciones.innerHTML = "";

    console.log(artistaSeleccionado)

    //Agrego las opciones nuevas dependiendo del artista seleccionado
    if (artistaSeleccionado === "TINI") {

        añadirOpcion("Muñecas")
        añadirOpcion("La Loto")
        añadirOpcion("La Triple T")
        añadirOpcion("Cupido")
        añadirOpcion("Mienteme")

    }else if (artistaSeleccionado === "Bad Bunny") {
        
        añadirOpcion("Me Porto Bonito")
        añadirOpcion("DAKITI")
        añadirOpcion("Titi me Pregunto")
        añadirOpcion("Moscow Mule")
        añadirOpcion("Ojitos Lindos")

    }else if (artistaSeleccionado === "Rihanna") {

        añadirOpcion("Umbrella")
        añadirOpcion("Don't Stop the Music")
        añadirOpcion("Disturbia")
        añadirOpcion("Only Girl (In the World)")
        añadirOpcion("S&M")
    
    }else if (artistaSeleccionado === "Tiago PZK") {

        añadirOpcion("Entre Nosotros")
        añadirOpcion("Salimos de Noche")
        añadirOpcion("Nos Comemos (feat. Ozuna)")
        añadirOpcion("Traductor")
        añadirOpcion("Sex & Love")

    }else{}

}  


function cambiarImagen(lista) {
    //Obtenemos el valor del select(la ciudad)
    var nombreCancion = lista.SelectorCanciones.value;
    
    //buscamos en el objeto la foto segun el nombre de la cancion
    document.onda.src = ondas[nombreCancion];
  
  }

function defaultOnda(nombreArtista){

    if(nombreArtista === "TINI"){
        document.onda.src = ondas["Muñecas"];
    }
    else if(nombreArtista === "Bad Bunny"){
        document.onda.src = ondas["Me Porto Bonito"];

    }else if(nombreArtista === "Rihanna"){
        document.onda.src = ondas["Umbrella"];

    }else if(nombreArtista === "Tiago PZK"){
        document.onda.src = ondas["Entre Nosotros"];
        
    }else{}
}
