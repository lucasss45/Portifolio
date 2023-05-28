//variáveis da bolinha
let xbola = 300;
let ybola = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadexbola = 6;
let velocidadeybola = 6;


//variáveis da barra
let xbarra = 5;
let ybarra = 150;
let barracomprimento = 10;
let barraaltura = 90;
let colide = false;

//variaveis do inimigo
let xinimigo = 585;
let yinimigo = 150;
let velocidadexinimigo = 10;
let velocidadeyinimigo = 90;

//pontos
let meuspontos = 0;
let pontosinimigo = 0;

//trilha sonora
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}
function draw() {
  background(0);
  mostrabola();
  movimentabola();
  colisaoborda();
  mostrabarra(xbarra, ybarra);
  mostrabarra(xinimigo, yinimigo);
  movimentabarra();
  colisaobiblioteca(xbarra, ybarra);
  colisaobiblioteca(xinimigo, yinimigo);
  movimentainimigo();
  placar();
  marca();
}

function mostrabola(){
  ellipse(xbola, ybola, diametro);
}

function movimentabola(){
  xbola += velocidadexbola;
  ybola += velocidadeybola;
}

function colisaoborda(){
  if (xbola + raio> width ||
     xbola - raio< 0){
    velocidadexbola *= -1;
  }
  if (ybola  + raio> height ||
     ybola - raio < 0){
    velocidadeybola *= -1;
  }
}

function mostrabarra(x, y){
  rect(x, y, barracomprimento, 
      barraaltura);
}

function mostrainimigo(){
  rect(xinimigo, yinimigo, barracomprimento, 
      barraaltura);
}

function movimentabarra(){
  if (keyIsDown(UP_ARROW)){
    ybarra -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    ybarra += 10;
  }
}

function movimentainimigo(){
  velocidadeyinimigo = ybola - yinimigo - barracomprimento / 2 -30;
  yinimigo += velocidadeyinimigo
}

//function colisaobarra(x, y){
 //   colide = collideRectCircle(xbarra, ybarra, barracomprimento, barraaltura, xbola, //ybola, raio);
 // if(colide){
 //  velocidadexbola *= -1;
 //  raquetada.play();
//  }
//}




function colisaobiblioteca(x, y){
     colide = collideRectCircle(x, y, barracomprimento, barraaltura, xbola, ybola, raio);
  if(colide){
   velocidadexbola *= -1;
    raquetada.play();
 }
}

function placar(){
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meuspontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosinimigo, 470, 26);
  

}
function marca(){
  if(xbola > 592){
    meuspontos += 1;
    ponto.play();
  }
  if(xbola < 8){
    pontosinimigo += 1;
    ponto.play();
  }
}
  
  
  
p5.prototype.collideRectCircle = function (rx, ry, rw, rh, cx, cy, diameter) {
  //2d
  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx){         testX = rx       // left edge
  }else if (cx > rx+rw){ testX = rx+rw  }   // right edge

  if (cy < ry){         testY = ry       // top edge
  }else if (cy > ry+rh){ testY = ry+rh }   // bottom edge

  // // get distance from closest edges
  var distance = this.dist(cx,cy,testX,testY)

  // if the distance is less than the radius, collision!
  if (distance <= diameter/2) {
    return true;
  }
  return false;
}