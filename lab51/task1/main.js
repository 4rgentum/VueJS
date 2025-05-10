const app = new PIXI.Application({resizeTo: window, backgroundColor: 0xbbbbbb});

document.body.appendChild(app.view);
const rectangle = new PIXI.Graphics();
rectangle.beginFill(0x000000);
rectangle.drawRect(-50, -25, 100, 50);
rectangle.endFill();
rectangle.x = window.innerWidth / 2;
rectangle.y = window.innerHeight / 2;
app.stage.addChild(rectangle);

app.ticker.add(() => {rectangle.rotation += 1;});

window.addEventListener('resize', () => {
    rectangle.x = window.innerWidth / 2;
    rectangle.y = window.innerHeight / 2;
});