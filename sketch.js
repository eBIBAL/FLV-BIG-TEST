let video;
let drawingLayer; 
let brushSizeSlider; 
let colors = ['#000000', '#FFFFFF', '#35AAAA', '#3C61AB', '#FFFF00']; 
let currentColor = '#000000'; 

function setup() {
  createCanvas(400, 700);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Cache l'affichage par défaut de la vidéo

  // Créer un calque de dessin séparé
  drawingLayer = createGraphics(width, height);

  // Ajouter un curseur pour ajuster la taille du pinceau
  brushSizeSlider = createSlider(1, 50, 5); // Taille du pinceau entre 1 et 50
  brushSizeSlider.position(10, height - 100); // Positionner le curseur en bas à gauche
}

function draw() {
  background(220);
  
  // Récupérer les dimensions naturelles de la vidéo pour garder son ratio d'aspect
  let videoRatio = video.width / video.height;
  let canvasRatio = width / height;
  
  let videoWidth, videoHeight;

  // Ajuster la vidéo pour qu'elle garde son ratio sans déformation
  if (videoRatio > canvasRatio) {
    videoWidth = width;
    videoHeight = width / videoRatio;
  } else {
    videoHeight = height;
    videoWidth = height * videoRatio;
  }

  // Appliquer une opacité de 50% à la vidéo
  tint(255, 127); // 127 sur 255 = 50% d'opacité

  // Afficher la vidéo en miroir (effet selfie)
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, videoWidth, videoHeight);
  pop();

  // Afficher la couche de dessin
  drawingLayer.noTint(); 
  image(drawingLayer, 0, 0);

  // Afficher la taille actuelle du pinceau
  textSize(16);
  fill(0);
  text("Taille du pinceau: " + brushSizeSlider.value(), 10, height - 110);

  // Vérifier si les boutons de couleurs sont visibles et interactifs
  let colorWidth = 40;
  for (let i = 0; i < colors.length; i++) {
    let x = i * (colorWidth + 5) + 10;
    let y = height - 70;
    fill(colors[i]);
    rect(x, y, colorWidth, 40);
  }
}

// ✅ Corrected touchMoved function
function touchMoved() {
  // Vérifier si un bouton de couleur a été cliqué
  for (let i = 0; i < colors.length; i++) {
    let x = i * (40 + 5) + 10;
    let y = height - 70;
    if (mouseX > x && mouseX < x + 40 && mouseY > y && mouseY < y + 40) {
      currentColor = colors[i];
    }
  }

  drawOnLayer(mouseX, mouseY, pmouseX, pmouseY);
  return false;
}

// ✅ Ensure drawOnLayer is correctly placed
function drawOnLayer(x, y, px, py) {
  drawingLayer.stroke(currentColor);
  drawingLayer.strokeWeight(brushSizeSlider.value());
  drawingLayer.line(px, py, x, y); 
}

// ✅ Function to clear drawing
function keyPressed() {
  if (key === 'c') {
    drawingLayer.clear();
  }
}

  
