//Fonctions similaires random
function randomTop() {
  var min = (window.innerHeight*2)/100;
  var max = window.innerHeight-((window.innerHeight*2)/100)-200;
  //console.log(Math.floor(Math.random() * (max - min)) + min);
  return Math.floor(Math.random() * (max - min)) + min;
}
function randomLeft() {
  var min = (window.innerWidth*2)/100;
  var max = (window.innerWidth*50)/100;
  //console.log(Math.floor(Math.random() * (max - min)) + min);
  return Math.floor(Math.random() * (max - min)) + min;
}

//fonctions qui scanne la requete ajax de Rahul Patel
function openFile(file) {
        var extension = file.substr( (file.lastIndexOf('.') +1) );
        switch(extension) {
            case 'jpg':
            case 'png':
            case 'txt':
                return true;
                break;
            default:
                return false;
        }
    };

//---------------------les joies de la query AJAX
$(".clickable").click(function(){
  console.log("ijahjjz");
  var link = this.dataset.ref;
  $.get( this.dataset.ref, function( data ) {
    //honteusement copié collé de Rahul Patel
    var fileNames = new Array();
    $(data).find("td > a").each(function(){
           if(openFile($(this).attr("href"))){
               fileNames.push($(this).attr("href"));
           }
    });
    console.log(fileNames);
    $(fileNames).each(function(){
      if(imgOrTxt(this) == "image"){
        var fullpath = link + '\\' + this;
        //var fullpathbis = link + "/"+this;
        //console.log(link);
        //console.log(fullpath);
        //console.log("path" + fullpath);
        createDivImage(fullpath);
      }
      else{
        var patht = link + '\\' + this;
        createDivTexte(patht);
      }
    });
  });
});
// GET IMAGE SOURCE credit yotam omer

//-------- if pour les classes
function chooseClass(imagepath){
  var imgLoader = new Image(); // create a new image object
 imgLoader.src = imagepath; // set the image source
  var height = imgLoader.height;
  var width = imgLoader.width;
  console.log(height);

  if(height>width){
    return "image-portrait";
  }
  else{
    return "image-paysage";
  }
}

//-------- texte ou image
function imgOrTxt(filepath){
  var ext = filepath.substr((filepath.lastIndexOf('.')+1));
  switch(ext){
    case 'jpg':
    case 'png':
      return "image";
    case 'txt':
      return "texte";
    break;
    default:
      return false;
  }
}

//---------- calculer la longueur du texte ?
function longueur(text){//text=texte récup avec get ds le .txt
  console.log("textlength :"+text.length);
  if(text.length>800){//classe spacetext smol
    return "small-size";
  }
  else if(text.length>500 && text.length<800){//classe spacetext med
    return "medium-size";
  }
  else if(text.length<260 && text.length>150){//classe ort smol
    return "medium-ort-size";
  }
  else if(text.length<150){//classe ort big
    return "big-size";
  }
}
//faire une fonction qui return width et height + url de l'image

// ---------------------------------- créer la div
var index =3;

function createDivImage(path){
  //d'abord il faut get la taille de l'image qu'on chargera en AJAX
  // var class = chooseClass(h,w);
	var newDiv = document.createElement("img");
	//le width et height sont mis en place dans la classe
  newDiv.className = chooseClass(path);
  newDiv.style.zIndex = index;
  //newDiv.content = "url("+path+")";
  //console.log("url("+path+")");
  $(newDiv).attr('src',path);
  newDiv.style.top = randomTop()+"px";
  console.log("top "+newDiv.top);
  newDiv.style.left = randomLeft()+"px";
  document.querySelector(".content-img").appendChild(newDiv);
  index++;
}

function createDivTexte(path){
  var newDiv = document.createElement("p");
  //newDiv.className = longueur(blbllbbllb);
  $.get(path, function(data) {
    newDiv.className = longueur(data);

    $(newDiv).html("<span>"+data+"</span>");
    });

  document.querySelector(".content-text").appendChild(newDiv);
}
//clear
$(".clear").click(function(){
  $(".content-text").html(" ");
  $(".content-img").html(" ");
});

//infinite scroll fait maison
$(".listeleft").scroll(function(){
  var sc = $(".listeleft").scrollTop();
  var aa = window.innerHeight;
  var ahah = sc/aa;
  scrollLand(ahah);
});

var truc = false;
function scrollLand(scroll){
  console.log(scroll);

  if(truc == false){
  if(scroll>0.35){
    //on utilise jquery pour clone car sinon ça tue les évènements liés
    $('.liste:first').clone(true).appendTo('.listeleft')
    truc=true;
    console.log("done!");
  }
}
else{}
  if(scroll>1.7){
    //on supprime le premier enfant pour éviter d'avoir trop de clones (4 max)
    var ouf = document.querySelector(".listeleft");
    ouf.removeChild(ouf.childNodes[0]);
    $("listeleft").scrollTop(0);
    truc=false;
  }
}
