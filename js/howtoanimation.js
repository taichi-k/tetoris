//最初のボタンの説明画面をcanvasタグで描写する。
//とりあえず、キーと機能を表示

function draw(){
  //canvasエレメントの取得
  var canvas = document.getElementById("howtoanimation");
  var ctx = canvas.getContext("2d");
  //ブラウザのウィンドウサイズを取得
  const WINDOW_WIDTH = window.innerWidth;
  const WINDOW_HEIGHT = window.innerHeight;
  //ブラウザのウィンドウの中心点
  const center = [WINDOW_WIDTH/2, WINDOW_HEIGHT/2]
  //canvasのサイズをウィンドウいっぱいにする
  canvas.setAttribute("width",WINDOW_WIDTH);
  canvas.setAttribute("height",WINDOW_HEIGHT);

  //キーを描くため、始点（キーを表す正方形の左上）の座標をstartX, startYで用意
  var startX = 0;
  var startY = 0;
  var len = 100;//キーの正方形の辺の長さ
  var gap = 10;//キー同士の隙間
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

  //文字の表示（各座標の値は、最適化できていないがうまく表示される値に設定している）
  ctx.fillStyle = "black";
  ctx.font = "21px serif";
  ctx.fillText("Move Left", center[0] - 3*len, center[1] + len - 3*gap);
  ctx.fillText("Move Right", center[0] + 2*len, center[1] + len - 3*gap);
  ctx.fillText("Rotate a Block", center[0] - 0.7*len, center[1] - 1.5*len);
  ctx.fillText("Next Step", center[0] - 0.45*len, center[1] + 1.5*len + gap);

  //キーの絵を描く
  startX = center[0] - len/2;
  startY = center[1] - len - gap;
  ctx.lineWidth = 3;
  ctx.moveTo(startX,startY);
  ctx.lineTo(startX+len,startY);
  ctx.lineTo(startX+len,startY+len);
  ctx.lineTo(startX,startY+len);
  ctx.lineTo(startX,startY);
  //2番目のmoveToからstroke()までは、矢印の描写
  ctx.moveTo(startX+0.5*len, startY+0.7*len);
  ctx.lineTo(startX+0.5*len, startY+0.3*len);
  ctx.moveTo(startX+0.4*len, startY+0.4*len);
  ctx.lineTo(startX+0.5*len, startY+0.3*len);
  ctx.lineTo(startX+0.6*len, startY+0.4*len);
  ctx.stroke();
  startX = center[0] - 1.5*len - 2*gap;
  startY = center[1] + gap;
  ctx.moveTo(startX,startY);
  ctx.lineTo(startX+len,startY);
  ctx.lineTo(startX+len,startY+len);
  ctx.lineTo(startX,startY+len);
  ctx.lineTo(startX,startY);
  ctx.moveTo(startX+0.7*len, startY+0.5*len);
  ctx.lineTo(startX+0.3*len, startY+0.5*len);
  ctx.moveTo(startX+0.4*len, startY+0.4*len);
  ctx.lineTo(startX+0.3*len, startY+0.5*len);
  ctx.lineTo(startX+0.4*len, startY+0.6*len);
  ctx.stroke();
  startX = center[0] - 0.5*len;
  startY = center[1] + gap;
  ctx.moveTo(startX,startY);
  ctx.lineTo(startX+len,startY);
  ctx.lineTo(startX+len,startY+len);
  ctx.lineTo(startX,startY+len);
  ctx.lineTo(startX,startY);
  ctx.moveTo(startX+0.5*len, startY+0.3*len);
  ctx.lineTo(startX+0.5*len, startY+0.7*len);
  ctx.moveTo(startX+0.4*len, startY+0.6*len);
  ctx.lineTo(startX+0.5*len, startY+0.7*len);
  ctx.lineTo(startX+0.6*len, startY+0.6*len);
  ctx.stroke();
  startX = center[0] + .5*len + 2*gap;
  startY = center[1] + gap;
  ctx.moveTo(startX,startY);
  ctx.lineTo(startX+len,startY);
  ctx.lineTo(startX+len,startY+len);
  ctx.lineTo(startX,startY+len);
  ctx.lineTo(startX,startY);
  ctx.moveTo(startX+0.3*len, startY+0.5*len);
  ctx.lineTo(startX+0.7*len, startY+0.5*len);
  ctx.moveTo(startX+0.6*len, startY+0.4*len);
  ctx.lineTo(startX+0.7*len, startY+0.5*len);
  ctx.lineTo(startX+0.6*len, startY+0.6*len);
  ctx.stroke();
}
