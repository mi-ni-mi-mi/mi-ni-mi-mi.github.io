const tableLeft = document.getElementById("tableLeft");
const tableRight = document.getElementById("tableRight");
const tbodyLeft = document.getElementById("tbodyLeft");
const tbodyRight = document.getElementById("tbodyRight");
const input1 = document.getElementById("input1");
const checkbox1 = document.getElementById("checkbox1");
const textarea1 = document.getElementById("textarea1");
const textarea2 = document.getElementById("textarea2");
const div1 = document.getElementById("div1");

// テーブルの幅の調整
const resizeObserver1 = new ResizeObserver((e) => {
    tableLeft.rows[1].cells[2].style.width = e[0].contentRect.width;
    tableRight.rows[1].cells[2].style.width = e[0].contentRect.width;
    tableLeft.rows[0].cells[2].children[0].style.height = e[0].contentRect.height;
    tableRight.rows[0].cells[0].children[0].style.height = e[0].contentRect.height;
});
const resizeObserver2 = new ResizeObserver((e) => {
    tableLeft.rows[1].cells[3].style.width = e[0].contentRect.width;
    tableRight.rows[1].cells[3].style.width = e[0].contentRect.width;
    tableLeft.rows[0].cells[1].children[0].style.height = e[0].contentRect.height;
    tableRight.rows[0].cells[0].children[0].style.height = e[0].contentRect.height;
});
resizeObserver1.observe(textarea1);
resizeObserver2.observe(textarea2);


// チェックボックスにイベントリスナーを付与
checkbox1.addEventListener('change', (e) => {
    setText(e);
});

// はじめに10行追加
let rowNum = input1.value;
for (let i = 1; i < rowNum; i++) {
    addNewRow(i);
}

function addNewRow(i) {
    // 左側のテーブル
    let trsNum = tbodyLeft.children.length;
    let trLeft = tbodyLeft.children[trsNum - 1].cloneNode(true);
    trLeft.children[1].children[0].textContent = i + 1;
    trLeft.children[0].children[0].addEventListener('change',
        (e) => { setText(e); }); // チェックボックスにイベントリスナーを付与
    tbodyLeft.appendChild(trLeft);

    // 右側のテーブル
    let trRight = tbodyRight.children[trsNum - 1].cloneNode(true);
    trRight.children[1].children[0].textContent = i + 1;
    tbodyRight.appendChild(trRight);
}

function removeRows(num) {
    for (let i = 0; i < num; i++) {
        tbodyLeft.lastChild.remove();
        tbodyRight.lastChild.remove();
    }
}

// 行追加・行削除
let inputRowNum = 10;
input1.addEventListener('input', function (e) {
    inputRowNum = Number(e.target.value);
    if (Number.isInteger(inputRowNum) && inputRowNum > 0) { // 非負の整数なら
        if (rowNum < inputRowNum) { // 多いなら行追加
            for (let i = rowNum; i < inputRowNum; i++) {
                addNewRow(Number(i));
            }
        } else if (rowNum > inputRowNum) { // 少ないなら行削除
            removeRows(rowNum - inputRowNum);
        }
        rowNum = inputRowNum;
    }
});

// 値をセットする関数
function setText(e) {
    let trLeft = e.target.parentNode.parentNode.parentNode;
    let values = [ // 左テーブルの値
        trLeft.children[2].children[0].children[0].value,
        trLeft.children[2].children[2].children[0].value,
        trLeft.children[3].children[0].children[0].value
    ];
    let divs = [ // 右テーブルの値を入れるdiv達
        tableRight.rows[trLeft.rowIndex].cells[2].children[0],
        tableRight.rows[trLeft.rowIndex].cells[2].children[2],
        tableRight.rows[trLeft.rowIndex].cells[3].children[0]
    ];
    let divHeight = div1.getBoundingClientRect().height;


    if (e.target.checked) { // チェックが入れられたら値をセットする
        const n = 5; // 上下それぞれ、n回の紙めくり
        const x = divHeight / 2; // 1回の紙めくりのフレーム数はx
        const dt = 10;
        let cnt = 0;
        const timer = setInterval(() => {
            cnt++;
            cntMod = cnt % (x * 2);
            if (cntMod == 0) cntMod = n * x;
            // 上の紙に値をセットする
            if (cnt == 2 * (n - 1) * x + 1) {
                divs[0].children[0].textContent = values[0];
            }
            // 下の紙に値をセットする
            if (cnt == 2 * (n - 1) * x + (x + 1)) {
                divs[1].children[0].textContent = values[1];
                divs[2].children[0].textContent = values[2];
            }
            // 上の紙のアニメーション
            if (cntMod <= x) {
                divs[0].children[1].style.top = divHeight * (cntMod / x) + "px";
            }
            // 下の紙のアニメーション
            if (x < cntMod && cntMod <= n * x) {
                divs[1].children[1].style.top = divHeight * ((cntMod - x) / x) + "px";
            }
            // 終了
            if (cnt == x * 2 * n) {
                clearInterval(timer);
            }
            /*
            n = 3, x = 20 の場合
            cnt++; // 1~20,21~40,41~60,61~80,81~100,101~120
            if (cnt == 81) 上の紙に値をセット;
            if (cnt == 101) 下の紙に値をセット;
            if ( 1 <= cnt <= 20 || 41 <= cnt <= 60 || ~省略~ || ~省略~) 上の紙のアニメーション;
            if (21 <= cnt <= 40 || 61 <= cnt <= 80 || ~省略~ || ~省略~) 下の紙のアニメーション;
            if (cnt == 80) exit;
            */
        }, dt);
    } else { // チェックが外されたら値をリセットする
        for (let i = 0; i < divs.length; i++) {
            divs[i].children[0].textContent = "";
        }
    }
}
