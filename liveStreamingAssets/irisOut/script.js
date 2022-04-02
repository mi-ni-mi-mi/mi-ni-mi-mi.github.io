const parameter = document.getElementById('parameter');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const param = { size: 5, speed1: 5, speed2: 5 };
let p = { x: 0, y: 0 }
let modAnim = -1;
let modParam = -1;

window.onload = function () {
    resizeCanvas();
    showParameter();
}

// ウィンドウサイズの変更
window.addEventListener('resize', () => {
    resizeCanvas();
});

// キャンバスサイズの調整
function resizeCanvas() {
    canvas.width = document.documentElement.offsetWidth;
    canvas.height = document.documentElement.offsetHeight;
}

// 設定の表示・非表示
function showParameter() {
    modParam = (modParam + 1) % 2;
    if (modParam == 0) parameter.style.display = 'block';
    else if (modParam == 1) parameter.style.display = 'none';
    else return;
}

// キー入力
window.addEventListener('keydown', (event) => {
    if (event.code === 'KeyS') showParameter();
    else return;
});

// 設定値の更新
document.getElementById('inputSize').addEventListener('input', (event) => {
    param.size = event.target.value;
    document.getElementById('spanSize').textContent = param.size;
});
document.getElementById('inputSpeed1').addEventListener('input', (event) => {
    param.speed1 = event.target.value;
    document.getElementById('spanSpeed1').textContent = param.speed1;
});
document.getElementById('inputSpeed2').addEventListener('input', (event) => {
    param.speed2 = event.target.value;
    document.getElementById('spanSpeed2').textContent = param.speed2;
});

// アニメーションの順番
canvas.addEventListener("click", (event) => {
    modAnim = (modAnim + 1) % 3;
    if (modAnim == 0) circleClosing1(event);
    else if (modAnim == 1) circleClosing2();
    else if (modAnim == 2) context.clearRect(0, 0, canvas.width, canvas.height)
    else return;
});

// 円の収縮
function circleClosing1(event) {
    // 円の中心座標をクリック位置に更新
    p.x = event.pageX;
    p.y = event.pageY;
    let n = 0;
    let num = 320 / param.speed1;
    const intervalId = setInterval(() => {
        blackOut();
        let r1 = canvas.width;
        let r2 = canvas.width * param.size / 40;
        let radius = r1 - (r1 - r2) * (n / num);
        context.beginPath();
        context.fillStyle = 'rgb(0, 255, 0)';
        context.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        context.fill();
        if (++n > num) clearInterval(intervalId);
    }, 10);
}

// 円の閉塞
function circleClosing2() {
    let n = 0;
    let num = 160 / param.speed2;
    const intervalId = setInterval(() => {
        blackOut();
        let r1 = canvas.width * param.size / 40;
        let r2 = 0;
        let radius = r1 - (r1 - r2) * (n / num);
        context.beginPath();
        context.fillStyle = 'rgb(0, 255, 0)';
        context.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        context.fill();
        if (++n > num) {
            blackOut();
            clearInterval(intervalId);
        }
    }, 10);
}

// キャンバスを黒で塗りつぶす
function blackOut() {
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}