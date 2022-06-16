//-----------滑鼠軌跡--------------------
let ball_x = 0; //球
let ball_y = 0;
let mouse_x = 0; //滑鼠
let mouse_y = 0;
let vel_x = 0; //光圈
let vel_y = 0;
const docStyle = document.documentElement.style; //簡化

const strength = 0.055; //球的速度
const drag = 0.055; //光圈的速度

document.addEventListener("mousemove" , (e) =>{
    mouse_x = e.clientX;
    mouse_y = e.clientY;
});

function delayMotion (){
    let distance_x = mouse_x - ball_x;  // X兩者距離
    vel_x *= drag; // X乘上數度 軌跡
    vel_x += distance_x; // X跟著速度
    ball_x += vel_x; 

    let distance_y = mouse_y - ball_y; // Y兩者距離
    vel_y *= drag; // X乘上數度 軌跡
    vel_y += distance_y; // X跟著速度
    ball_y += vel_y;


    // ball_x = mouse_x;
    // ball_y = mouse_y;
    // document.documentElement.style.setProperty("--mouse-x",ball_x); 下面的是縮寫
    docStyle.setProperty("--mouse-x",ball_x);
    docStyle.setProperty("--mouse-y",ball_y);
    docStyle.setProperty("--scale",(vel_x + vel_y)* strength); //光圈 最後加上去的
    requestAnimationFrame(delayMotion); //重複執行 
}
delayMotion();
//-----------滑鼠軌跡--------------------
// ---------------猜123---------------
    // document.getElementById("myButton") 也可以這樣寫
    function h123(){
        let x = Math.random();
        // console.log(x);
        x = x * 4;
        x = Math.floor(x);
        // console.log(x);
        if(x == document.querySelector("#myInput").value){
            alert("恭喜!猜對!恭喜!猜對");
        }else{
            alert("猜錯!猜錯!");
        }
    }

// ---------------猜123---------------

//-----------反應時間--------------------
let createdTime ; //創立圖片的時間
let clickTime ; //點擊圖片時間
let reactionTime ; //反應時間

//設定一個RGBA的亂數形成的顏色
function grtRandomColor(){
    let max = 200;
    let min = 50;
    let green = Math.floor(Math.random() * (max-min+1))+min;
    let color = "rgba(255," + green +", 100, 1)";
    return color
}


//亂數時間*2000毫秒 產生一個方格
function makeBox(){
    let time = Math.random();
    time = time * 2000;
    //setTimeout(第一個是函式,第二個式時間)
    setTimeout(function(){
        //1:先取決圓形或方形
        if (Math.random() >= 0.5){
            document.querySelector("div#box").style.borderRadius = "50%"; // width = 100px /2 = 50px 50%就會都是圓角
        }else{
            document.querySelector("div#box").style.borderRadius = "0px";
        }
        //設定亂數位置
        // console.log(window.innerWidth);
        // console.log(window.innerHeight);

        // console.log(document.documentElement.clientWidth);
        // console.log(document.documentElement.clientHeight);

        let min = 0 ;
        let max = window.innerHeight-280;
        let top = Math.floor(Math.random() * (max-min+1))+min;

        min = 0 ;
        max = window.innerWidth-140;
        
        // CSS變數 重點20220616 替換CSS裡面的值
        let dynamicBound;
        if(Window.innerWidth > window.innerHeight){
            dynamicBound = window.innerWidth / 10; //除越大 圖越小
        }else{
            dynamicBound = window.innerHeight / 10; //除越大 圖越小
        }
        dynamicBound = dynamicBound + "px";
        document.documentElement.style.setProperty("--bound",dynamicBound);

        let left = Math.floor(Math.random() * (max-min+1))+min;
        document.querySelector("div#box").style.top = top + "px"
        document.querySelector("div#box").style.left = left + "px"
        console.log(top);//測試上面位置
        console.log(left);//測試左邊位置
        // 2:在顯示圖片時 先給顏色
        document.querySelector("div#box").style.backgroundColor = grtRandomColor();
        // 顯示圖片
        document.querySelector("div#box").style.display = "block";
        createdTime = Date.now();
    },time);
    console.log(createdTime);//測試秒數
}
document.querySelector("div#box").onclick = function() {
    this.style.display = "none";
    clickTime = Date.now();
    console.log(clickTime);//測試秒數
reactionTime = (clickTime - createdTime) / 1000;
console.log(typeof reactionTime,reactionTime);//測試型別跟秒數
document.querySelector("span#time").innerHTML = reactionTime;
    
makeBox();
}
makeBox();
//-----------反應時間--------------------

