window.onload = function () {
    //播放器  播放暂停部分
    var playsong = document.getElementById("playsong");
    var audio = document.getElementsByTagName("audio");
    var playBtn=document.getElementById("playbtn");
    var playTime=document.getElementById("playtime");
    var j_player=document.getElementById("j_player");
    var timer=null;
    playsong.onclick = function () {
        clearInterval(timer);
        if (audio[0].paused) {
            audio[0].play();
            audio[0].loop=true;  //单曲循环
            playsong.style.backgroundPosition = "-2px -167px";
            timeLine(audio[0]);
            timer=setInterval(currentTime,1000);
        } else {
            audio[0].pause();
            clearInterval(timer);
            clearInterval(audio[0].timer);
            playsong.style.backgroundPosition = "-2px -206px";
        }
    }

  

    /**
     *    播放时间条自动走动函数
     */
    function timeLine(song){
        clearInterval(song.timer);
        song.timer=setInterval(function () {
            console.log(song.currentTime);
            playBtn.style.left=493/song.duration*song.currentTime-7+"px";
            console.log(playBtn.offsetLeft);
        },1000);
    }
    console.log(audio[0].duration);
    console.log(audio[0].paused);






    //播放时间条旁边的时间
    function currentTime(){
        var currentMinute=document.getElementById("currentminute");
        var currentSecond=document.getElementById("currentsecond");
        currentMinute.innerText="0"+parseInt(audio[0].currentTime/60);
        if(parseInt(audio[0].currentTime)%60<10){
            currentSecond.innerText="0"+parseInt(audio[0].currentTime)%60;
        }else{
            currentSecond.innerText=parseInt(audio[0].currentTime)%60;
        }
    }

    //歌曲总时间
    var durrentMinute=document.getElementById("durrentminute");
    var durrentSecond=document.getElementById("durrentsecond");
    timer=setInterval(currentTime,1000);
    durrentMinute.innerText="0"+parseInt(audio[0].duration/60);
    durrentSecond.innerText=parseInt(audio[0].duration%60);



    //歌单点击 播放音乐  （有问题）
    var play2 = document.getElementById("play2");
    play2.onclick = function () {
        audio[1].play();
        audio[0].load();
    }

    var play1 = document.getElementById("play1");
    play1.onclick = function () {
        audio[0].play();
        audio[1].load();
    }

    //音量控制显示消失
    var voice = document.getElementById("voice");
    var voiceline = document.getElementById("voiceline");
    var redline = document.getElementById("redline");
    var volBtn = document.getElementById("volbtn")
    var show = true;
    voice.onclick = function () {
        if (show) {
            voiceline.style.display = "block";
            show = false;
        } else {
            voiceline.style.display = "none";
            show = true;
        }
    }


    //音量小圆点控制音量
    volBtn.onmousedown = function (event) {
        var pageY = event.pageY;
        var innerY = pageY - volBtn.offsetTop;
        document.onmousemove = function (event) {
            var pageY = event.pageY;
            var volY = pageY - innerY;
            if (volY < 4) {
                volY = 4;
                audio[0].volume = 1;
            } else if (volY > 88) {
                volY = 88;
                audio[0].volume = 0;
                voice.style.backgroundPosition="-107px -69px"
            }else{
                voice.style.backgroundPosition="-5px -248px"
            }
            volBtn.style.top = volY + "px";
            redline.style.height = 88 - volY + "px";
            audio[0].volume = (88 - volY) / 100;
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }

    volBtn.onmouseup = function () {
        document.onmousemove = null;
    }


    //锁住固定底边播放器
    var playBox = document.getElementById("playbox");
    var lock = document.getElementById("lock");
    var lock_in = document.getElementById("lock-in");//小锁锁住
    playBox.onmouseover = function () {
        animate(playBox, {"bottom": 0});
    }
    playBox.onmouseout = function () {
        animate(playBox, {"bottom": -46});
    }
    var flag = true;
    lock_in.onclick = function () {
        if (flag) {
            lock_in.style.backgroundPosition = "-100px -380px";
            playBox.onmouseout = null;
            flag = false;//锁住
        } else {
            lock_in.style.backgroundPosition = "-80px -380px";
            playBox.onmouseout = function () {
                animate(playBox, {"bottom": -46});
            }
            flag = true;
        }
    }


    //登录部分
    var login = document.getElementById("login");
    var log_in = document.getElementById("log_in");
    var logHead = document.getElementById("logh");
    var close = document.getElementById("close");
    var inner = document.getElementById("inner");

    logHead.onmousedown = function (event) {
        var event = event || window.event;
        var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
        var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
        var innerX = pageX - log_in.offsetLeft;
        var innerY = pageY - log_in.offsetTop;
        document.onmousemove = function (event) {
            var event = event || window.event;
            var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
            log_in.style.left = pageX - innerX + "px";
            log_in.style.top = pageY - innerY + "px";
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }
    logHead.onmouseup = function () {
        document.onmousemove = null;
    }
    login.onclick = function () {
        log_in.style.display = "block";
    }
    login.onmouseover = function () {
        inner.style.display = "block";
    }
    login.onmouseout = function () {
        inner.style.display = "none";
    }
    close.onclick = function () {
        log_in.style.display = "none";
    }


    //轮播图
    var slider = document.getElementById("slider");
    var img = document.getElementById("img")
    var li = slider.children[0];
    var clone = li.cloneNode(true);
    slider.appendChild(clone);
    var ulLis = slider.children;

    var index = 0;
    setInterval(function () {
        if (index == ulLis.length - 1) {
            index = 0;
            slider.style.left = 0;
        }
        index++;
        animate(slider, {"left": -index * img.offsetWidth});
    }, 2000);


    //back
    var back=document.getElementById("back");
    window.onscroll= function () {
        if(scroll().top>100){
            back.style.display="block"
        }else{
            back.style.display="none"
        }
    }
    function scroll() {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        };
    }

    //加载MV
    var mask=document.getElementById("mask");
    var closeMV=document.getElementById("closemv");
    var outMV=document.getElementById("outmv");
    var showMV=document.getElementById("showmv");
    var MV=document.getElementById("mv")
    MV.onclick= function () {
        mask.style.display="block";
        showMV.style.display="block";
        audio[0].pause();
        playsong.style.backgroundPosition = "-2px -206px";
    }
    closeMV.onclick= function () {
        mask.style.display="none";
        showMV.style.display="none";
        outMV.load();
    }


}
