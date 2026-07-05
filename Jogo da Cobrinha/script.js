const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tamanho = 20
let cobra = [
    {x: 200, y: 200}
];
let direcao = {x: 0, y: 0}
let comida = {x: Math.floor(Math.random() * (canvas.width / tamanho)) *
    tamanho, y: Math.floor(Math.random() * (canvas.height / tamanho)) *
    tamanho
}
let pontuacao = 0;


function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = `red`
    ctx.fillRect(comida.x, comida.y, tamanho, tamanho)

    ctx.fillStyle = `green`;
    cobra.forEach(parte => {
        ctx.fillRect(parte.x, parte.y, tamanho, tamanho)
    })
}

function mover() {
    if (direcao.x === 0 && direcao.y === 0) return;

    const cabeca = {x: cobra[0].x + direcao.x, y: cobra[0].y + direcao.y };
    cobra.unshift(cabeca);
    const bateuEmSi = cobra.slice(1).some(parte => parte.x === cabeca.x && parte.y === cabeca.y); 

    


    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        pontuacao++
        document.getElementById('pontuacao').textContent = `Pontuação: ` + pontuacao;
        comida = {
            x: Math.floor(Math.random() * (canvas.width / tamanho)) * tamanho, 
            y: Math.floor(Math.random() * (canvas.height / tamanho)) * tamanho

        }
    } else {
        cobra.pop();
    }

    if (cabeca.x < 0 || cabeca.x >= canvas.width || cabeca.y < 0 || cabeca.y >= canvas.height) {
        clearInterval(loop)
        alert('Game Over');
        location.reload();
    } else if (bateuEmSi) {
        clearInterval(loop)
        alert('Game Over');
        location.reload();
    }     
}   
         

const loop = setInterval(() => {
    mover();
    desenhar();

}, 200);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direcao.y !== tamanho) direcao = {x: 0, y: -tamanho};
            break;
        case 'ArrowDown':
            if (direcao.y !== -tamanho) direcao = {x: 0, y: tamanho};
            break;
        case 'ArrowLeft':
            if (direcao.x !== tamanho) direcao = {x: -tamanho, y: 0};
            break;  
        case 'ArrowRight':
            if (direcao.x !== -tamanho) direcao = {x: tamanho, y: 0};
            break;
    }   
})
