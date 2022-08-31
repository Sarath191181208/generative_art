

const getCanvasSize = (canvas) => {
    return (canvas.width < canvas.height) ? canvas.width * 0.3 : canvas.height * 0.3;
}

const getRandColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`;

window.addEventListener('load', () => {
    const canvas = document.getElementById("generative-canvas");
    const ctx = canvas.getContext("2d");
    initCanvas(canvas, ctx)

    const maxLevel = 5;
    const branches = 2;

    let size = getCanvasSize(canvas);
    let color = getRandColor();
    let lineWidth = 10;
    let sides = 5;
    let spread = 0.5;
    let scale = 0.5;

    // controls
    const randBtn = document.getElementById("randomize-btn");
    const spreadSlider = document.getElementById("spread");
    const spreadLabel = document.querySelector('[for="spread"]');

    const sidesSlider = document.getElementById("sides");
    const sidesLabel = document.querySelector('[for="sides"]');

    spreadSlider.addEventListener('input', (e) => {
        spread = e.target.value;
        drawFractal();
        updateSliders();
    });

    sidesSlider.addEventListener('input', (e) => {
        sides = e.target.value;
        drawFractal();
        updateSliders();
    })

    function drawBranch(level) {
        if (level <= 0) return;
        level--;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();

        for (let i = 0; i < branches; i++) {

            ctx.save();
            ctx.translate(size - (size/branches) * i, 0);
            ctx.scale(scale, scale);

                ctx.save();
                ctx.rotate(spread);
                drawBranch(level);
                ctx.restore();

                ctx.save();
                ctx.rotate(-spread);
                drawBranch(level);
                ctx.restore();

            ctx.restore();
        }

    }

    function drawFractal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.translate(canvas.width / 2, canvas.height / 2);
            for (let i = 0; i < sides; i++) {
                drawBranch(maxLevel)
                ctx.rotate(((Math.PI) * 2)/sides)
            }
        ctx.restore();
    }

    function drawRandomFractal() {
        lineWidth = Math.floor(Math.random()*10 + 2)
        sides = Math.floor(Math.random()*7 + 2);
        scale = Math.random() * 0.2 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        color = getRandColor();

        updateSliders();
        drawFractal();
    }


    randBtn.addEventListener('click', () => {
        drawRandomFractal();
    });

    function updateSliders() {
        spreadSlider.value = spread;
        spreadLabel.innerText = `Spread:${Number(spread).toFixed(1)}`

        sidesSlider.value = sides;
        sidesLabel.innerText = `Sides:${sides}`
    }

    
    drawRandomFractal();

    

})

function initCanvas(canvas, ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
}