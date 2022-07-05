let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1
console.log(x)

x = '23'

interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
                        
    case "square":
      return shape.sideLength ** 2;
              
  }
}