void setup() {
  size(800, 600, P3D);  
}

void draw() {
  background(30);
  lights();  

  
  float t = frameCount * 0.02;

  
  translate(width/2, height/2, 0);

  
  pushMatrix();

  
  float x = 200 * sin(t);
  translate(x, 0, 0);

  // Rotaciones
  rotateX(t);
  rotateY(t * 1.2);

  // Escala cíclica
  float s = 1 + 0.5 * sin(t * 2);
  scale(s);

  // Dibujar cubo
  fill(0, 150, 255);
  box(120);

  popMatrix();
}
