
var count = 0;

var cells;
var score = 0;//scoreを用意した。

// ブロックのパターン
var blocks = {
  i: {
    class: "i",
    pattern: [
      [1, 1, 1, 1]
    ]
  },
  o: {
    class: "o",
    pattern: [
      [1, 1],
      [1, 1]
    ]
  },
  t: {
    class: "t",
    pattern: [
      [0, 1, 0],
      [1, 1, 1]
    ]
  },
  s: {
    class: "s",
    pattern: [
      [0, 1, 1],
      [1, 1, 0]
    ]
  },
  z: {
    class: "z",
    pattern: [
      [1, 1, 0],
      [0, 1, 1]
    ]
  },
  j: {
    class: "j",
    pattern: [
      [1, 0, 0],
      [1, 1, 1]
    ]
  },
  l: {
    class: "l",
    pattern: [
      [0, 0, 1],
      [1, 1, 1]
    ]
  }
};

// キーボードイベントを監視する
document.addEventListener("keydown", onKeyDown);
// キー入力によってそれぞれの関数を呼び出す
function onKeyDown(event) {
  if(hasFallingBlock()){
    if (event.keyCode === 37) {
      moveLeft();
    } else if (event.keyCode === 38){//ブロックの回転
      rotate_block();
    } else if (event.keyCode === 39) {//右に動かす
      moveRight();
    } else if (event.keyCode === 40){//下に一つ下げる
      fallBlocks();
    }
  }
}

//仮で用意したsleep関数
// function sleep(second){
//   const d1 = new Date();
//   while (true) {
//     const d2 = new Date();
//     if (d2 - d1 > second*1000) {
//       break;
//     }
//   }
// }

//最初の画面(canvas)の表示
window.onload = function(){
  draw();
}

loadTable();
setInterval(function () {
  count++;
  document.getElementById("hello").textContent = "テトリス　Score: " + String(score);
  // ブロックが積み上がり切っていないかのチェック
  for (var row = 0; row<2; row++) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].className !== "" && cells[row][col].blockNum !== fallingBlockNum) {
        if(confirm("ゲームオーバーです。ただいまのスコアは" + score + "です。リプレイします。")){
          location.reload();//OKが押されたら、ウィンドウをリロード
      }else{
        console.log("キャンセルが選択");//未実装
      }
    }
  }
}

  if (hasFallingBlock()) { // 落下中のブロックがあるか確認する
    fallBlocks();// あればブロックを落とす
  } else { // なければ
    deleteRow();// そろっている行を消す
    generateBlock();// ランダムにブロックを作成する
  }
}, 1000);

/* ------ ここから下は関数の宣言部分 ------ */

function loadTable() {
  cells = [];
    var td_array = document.getElementsByTagName("td");
    var index = 0;
    for (var row = 0; row < 20; row++) {
      cells[row] = [];
      for (var col = 0; col < 10; col++) {
        cells[row][col] = td_array[index];
        index++;
      }
    }
}


function fallBlocks() {
  // 1. 底についていないか？
  for (var col = 0; col < 10; col++) {
    if (cells[19][col].blockNum === fallingBlockNum) {
      isFalling = false;
      return; // 一番下の行にブロックがいるので落とさない
    }
  }
  // 2. 1マス下に別のブロックがないか？
  for (var row = 18; row >= 0; row--) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].blockNum === fallingBlockNum) {
        if (cells[row + 1][col].className !== "" && cells[row + 1][col].blockNum !== fallingBlockNum){
          isFalling = false;
          return; // 一つ下のマスにブロックがいるので落とさない
        }
      }
    }
  }
  // 下から二番目の行から繰り返しクラスを下げていく
  for (var row = 18; row >= 0; row--) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].blockNum === fallingBlockNum) {
        cells[row + 1][col].className = cells[row][col].className;
        cells[row + 1][col].blockNum = cells[row][col].blockNum;
        cells[row][col].className = "";
        cells[row][col].blockNum = null;
      }
    }
  }
}

var isFalling = false;
function hasFallingBlock() {
  // 落下中のブロックがあるか確認する
  return isFalling;
}

function deleteRow() {
  // そろっている行を消す
  var del_num = 0;//消した行数を記録
  for (var row = 0; row < 20; row++) {
    var canDelete = true;
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].className === "") {
        canDelete = false;
      }
    }
    if (canDelete) {
      // 1行消す
      for (var col = 0; col < 10; col++) {
        cells[row][col].className = "";
      }
      // 上の行のブロックをすべて1マス落とす
      for (var downRow = row - 1; downRow >= 0; downRow--) {
        for (var col = 0; col < 10; col++) {
          cells[downRow + 1][col].className = cells[downRow][col].className;
          cells[downRow + 1][col].blockNum = cells[downRow][col].blockNum;
          cells[downRow][col].className = "";
          cells[downRow][col].blockNum = null;
        }
      }
      del_num += 1;//行数をカウント
    }
  }
  score += 100*del_num*del_num;//スコアは、消した行数の二乗
  document.getElementById("hello").textContent = "テトリス　Score: " + String(score);//スコアをリアルタイムで表示
}


var fallingBlockNum = 0;
function generateBlock() {
  // ランダムにブロックを生成する
  // 1. ブロックパターンからランダムに一つパターンを選ぶ
  var keys = Object.keys(blocks);
  var nextBlockKey = keys[Math.floor(Math.random() * keys.length)];
  var nextBlock = blocks[nextBlockKey];
  var nextFallingBlockNum = fallingBlockNum + 1;
  // 2. 選んだパターンをもとにブロックを配置する
  var pattern = nextBlock.pattern;
  for (var row = 0; row < pattern.length; row++) {
    for (var col = 0; col < pattern[row].length; col++) {
      if (pattern[row][col]) {
        cells[row][col + 3].className = nextBlock.class;
        cells[row][col + 3].blockNum = nextFallingBlockNum;
      }
    }
  }
  // 3. 落下中のブロックがあるとする
  isFalling = true;
  fallingBlockNum = nextFallingBlockNum;
}

function moveRight() {
  // ブロックを右に移動させる
  var canMove = true;//右に動かせるかどうか
  for (var row=0; row<20;row++){//一番右端にブロックが存在するときは、右に動かせないので、canMoveをfalseに
    if (cells[row][9].blockNum === fallingBlockNum){
      canMove = false;
      break;
    }
    for (var col=0; col<10;col++){
        if (cells[row][col].blockNum === fallingBlockNum){//いずれかのブロックの右側に他のブロックがあるかどうか
          if (cells[row][col + 1].className !== "" && cells[row][col + 1].blockNum !== fallingBlockNum){
            canMove = false;
          }
        }
      }
    }

  if (canMove){
    for (var row = 0; row < 20; row++) {
      for (var col = 9; col >= 0; col--) {
        if (cells[row][col].blockNum === fallingBlockNum) {
          cells[row][col + 1].className = cells[row][col].className;
          cells[row][col + 1].blockNum = cells[row][col].blockNum;
          cells[row][col].className = "";
          cells[row][col].blockNum = null;
        }
      }
    }
  }
}

function moveLeft() {
  // ブロックを左に移動させる
  //moveRightと、処理は同様
  var canMove = true;
  for (var row=0; row<20;row++){
    if (cells[row][0].blockNum === fallingBlockNum){
      canMove = false;
      break;
    }
    for (var col=0; col<10;col++){
        if (cells[row][col].blockNum === fallingBlockNum){
          if (cells[row][col - 1].className !== "" && cells[row][col - 1].blockNum !== fallingBlockNum){
            canMove = false;
          }
        }
      }
    }

  if (canMove){
    for (var col = 0; col < 10; col++) {
      for (var row = 0; row < 20; row++) {
        if (cells[row][col].blockNum === fallingBlockNum) {
          cells[row][col - 1].className = cells[row][col].className;
          cells[row][col - 1].blockNum = cells[row][col].blockNum;
          cells[row][col].className = "";
          cells[row][col].blockNum = null;
        }
      }
    }
  }
}

function rotate_block(){
  //まず、現在のブロックの座標を取得する。
  //次に、最初に見つけたブロックを基準とし、基準以外のブロックに対して相対ベクトルを求める。
  //そのために、基準が(0,0)になるように、各ブロックの座標から基準の座標を引く。
  //回転のため、その相対ベクトルを右に90度回転させる。(x,y) -> (y, -x)
  //最後に、移動先で他ブロックや、フィールド外に出てしまうかを判定し、回転を実行する。
  var origin_pos = [0,0];//基準ブロックの座標
  var positions = [];//相対ベクトルを格納する配列
  for (var col = 0; col < 10; col++) {
    for (var row = 0; row < 20; row++) {
      if (cells[row][col].blockNum === fallingBlockNum){
        positions.push([row, col]);//とりあえず、positionsに元の相対ベクトルを格納
      }
    }
  }
  //一つ目に発見した座標を基準点とする。
  origin_pos[0] = positions[0][0];
  origin_pos[1] = positions[0][1];
  //基準が(0,0)になるように平行移動
  for (var i = 0;i<4; i++) {
    positions[i][0] -= origin_pos[0];
    positions[i][1] -= origin_pos[1];
  }
  //回転処理
  for (var i = 0;i<4;i++){
    var tmp = positions[i][0];
    positions[i][0] = positions[i][1];
    positions[i][1] = -1 * tmp;
  }

  tmp_className = "";
  var canRotate = true;
  //移動先の判定
  for (var p = 0; p < positions.length; p++) {
    for (var j = 0; j < 2; j++) {
      if (origin_pos[0] + positions[p][0] < 20){
        if(cells[origin_pos[0] + positions[p][0]][origin_pos[1] + positions[p][1] + 1] === undefined){//枠外に出ると、cell[][]はundefinedを返す
            canRotate = false;
            console.log("枠を出る")
          }else if(cells[origin_pos[0] + positions[p][0]][origin_pos[1] + positions[p][1] + 1].className !== "" && cells[origin_pos[0] + positions[p][0]][origin_pos[1] + positions[p][1] + 1].blockNum !== fallingBlockNum){
            canRotate = false;//移動先にブロックがあれば、回転しない
            console.log("ブロックが重なる")
          }
      }else{//なぜか、回転後フィールドの下側に出てしまう時にundefinedでは判定できなかったので、下に出てしまうときはインデックスで判断
        canRotate = false;
        console.log("枠を出る");
      }
    }
  }

  if (canRotate){
    console.log("回転した")
    //フィールドのクリア
    for (var row = 0; row < 20; row++) {
      for (var col = 9; col >= 0; col--) {
        if (cells[row][col].blockNum === fallingBlockNum) {
          tmp_className = cells[row][col].className;
          cells[row][col].className = "";
          cells[row][col].blockNum = null;
        }
      }
    }
    //フィールドに回転後のブロックを描写
    for (var p = 0; p < positions.length; p++) {
      for (var j = 0; j < 2; j++) {
        cells[origin_pos[0] + positions[p][0]][origin_pos[1] + positions[p][1] + 1].className = tmp_className;
        cells[origin_pos[0] + positions[p][0]][origin_pos[1] + positions[p][1] + 1].blockNum = fallingBlockNum;
      }
    }
  }

}
