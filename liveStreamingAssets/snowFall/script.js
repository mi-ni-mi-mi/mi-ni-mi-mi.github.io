/*
# メモ
雪片の数は固定である
雪片のサイズが大きいほど、数は少なくなる
*/

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const dataArr = [];
const typeNum = 10 // 切片の種類

window.onload = function () {
    resizeCanvas();
    generateSnowflakes();
    blackOut();
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

// 雪片の生成
const generateSnowflakes = function () {
    for (let i = 0; i < typeNum; i++) {
        let tmpArr = [];
        let snowflakesNum = (i + 1) * (i + 1) * 3;
        for (let j = 0; j < snowflakesNum; j++) {
            tmpArr.push({
                x: canvas.width * Math.random(),
                y: canvas.height / snowflakesNum * j
            });
        }
        dataArr.push(tmpArr);
    }
}

// 描画
const draw = function () {
    for (let i = 0; i < dataArr.length; i++) {
        for (let j = 0; j < dataArr[i].length; j++) {
            context.beginPath();
            context.fillStyle = setColor(i);
            context.arc(
                dataArr[i][j].x, //x座標
                dataArr[i][j].y, //y座標
                10 / (i + 1), //半径
                0, 2 * Math.PI //円弧の始まりの角度, 円弧の終わりの角度
            );
            context.fill();
        }
    }
}

// 色
const setColor = function (j) {
    let text = "rgb(";
    let num = 255 - 10 * (typeNum - j);
    text = text + num + "," + num + "," + num + ")";
    return text;
}

// 落下
const intervalId = setInterval(() => {
    blackOut();
    for (let i = 0; i < dataArr.length; i++) {
        for (let j = 0; j < dataArr[i].length; j++) {
            // x座標
            let x = dataArr[i][j].x;
            // y座標
            let y = dataArr[i][j].y;
            y = y + 1 / (i + 1);
            if (y > canvas.height) {
                x = canvas.width * Math.random();
                y = 0;
            }
            dataArr[i][j].x = x;
            dataArr[i][j].y = y;
        }
    }
    draw();
}, 10);

// キャンバスを黒で塗りつぶす
const blackOut = function () {
    context.fillStyle = 'rgb(0, 255, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}