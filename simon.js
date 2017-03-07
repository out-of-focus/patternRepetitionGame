 var arrSequence = [],
   playerSeq = [],
   playerKeyStr = 0,
   strict = false,
   correct = true;
 var sound0 = new Audio('picsSnds/FCC_simon_b-a1_sound0.mp3');
 var sound1 = new Audio("picsSnds/FCC_simon_b-b0_sound1.mp3");
 var sound2 = new Audio("picsSnds/FCC_simon_b-g0_sound2.mp3");
 var sound3 = new Audio("picsSnds/FCC_simon_b-f0_sound3.mp3");
 var soundWrong = new Audio("picsSnds/FCC_simon_wrong.mp3");
 var soundWin = new Audio("picsSnds/FCC_simon_fanfare-short-edit.mp3");

 $(document).ready(function() {

   function playOne(num) {
     var div, snd;
     switch (num) {
       case 0:
         div = "#div0";
         lightColor = "#fef340";
         baseColor = "#ffbd17";
         glow = "#glow0";
         snd = sound0;
         break;
       case 1:
         div = "#div1";
         lightColor = "#00ff00";
         baseColor = "#009e67";
         glow = "#glow1";
         snd = sound1;
         break;
       case 2:
         div = "#div2";
         lightColor = "#00c8ff";
         baseColor = "#2c2c6b";
         glow = "#glow2";
         snd = sound2;
         break;
       case 3:
         div = "#div3";
         lightColor = "#ff0000";
         baseColor = "#a50a1f";
         glow = "#glow3";
         snd = sound3;
         break;
     }
     $(div).animate({
       backgroundColor: lightColor
     }, 250, function() {
       $(div).animate({
         backgroundColor: baseColor
       }, 250);
     });
     $(glow).animate({
       opacity: "1"
     }, 250, function() {
       $(glow).animate({
         opacity: "0"
       }, 250);
     });
     snd.play();
   }

   function getNext() {
     var a = Math.floor(Math.random() * 4);
     arrSequence.push(a);
   };

   function youWon() {
     var countInterval = 0;
     var blink = setInterval(function() {
       countInterval++;
       if (countInterval < 4) {
         $("#div0").animate({backgroundColor: "#fef340"}, 200, function() {
           $("#div0").animate({backgroundColor: "#ffbd17"}, 200);});
         $("#glow0").animate({opacity: "1"}, 200, function() {
           $("#glow0").animate({opacity: "0"}, 200);});
         $("#div1").animate({backgroundColor: "#00ff00"}, 200, function() {
           $("#div1").animate({backgroundColor: "#009e67"}, 200);});
         $("#glow1").animate({opacity: "1"}, 200, function() {
           $("#glow1").animate({opacity: "0"}, 200);});
         $("#div2").animate({backgroundColor: "#00c8ff"}, 200, function() {
           $("#div2").animate({backgroundColor: "#2c2c6b"}, 200);});
         $("#glow2").animate({opacity: "1"}, 200, function() {
           $("#glow2").animate({opacity: "0"}, 200);});
         $("#div3").animate({backgroundColor: "#ff0000"}, 200, function() {
           $("#div3").animate({backgroundColor: "#a50a1f"}, 200);});
         $("#glow3").animate({opacity: "1"}, 200, function() {
           $("#glow3").animate({opacity: "0"}, 200);});
         $("#counter").animate({color: "yellow", backgroundColor: "#c3b743"}, 200, function() {
           $("#counter").animate({color: "#ffbd17", backgroundColor: "#545454"}, 200);});
       } else {
         clearInterval(blink);
       }
     }, 405);

     soundWin.play();
     arrSequence =[];
     playerSeq=[];
     setTimeout(function(){
       document.getElementById("start").innerText = "Start";
       document.getElementById("counter").innerText = "--";
     }, 1900);
   }

   function makeKeystroke(key) {
     return function() {
       playOne(key);
       if (arrSequence[playerKeyStr] === key) {
         playerSeq.push(key);
         playerKeyStr += 1;
        if (arrSequence.length === playerSeq.length && arrSequence.length===20){
           setTimeout(function(){
             youWon()},500);
         }
         else if (arrSequence.length === playerSeq.length) {
           correct = true;
           setTimeout(function() {
             playback();
           }, 1300);
         }
       } else {
         soundWrong.play();
         if (strict == true) {
           document.getElementById("div0").removeEventListener("click", keystroke0);
           document.getElementById("div1").removeEventListener("click", keystroke1);
           document.getElementById("div2").removeEventListener("click", keystroke2);
           document.getElementById("div3").removeEventListener("click", keystroke3);
           arrSequence = [];
           playerSeq = [];
           correct = true;
           playback();
         } else {
           correct = false;
           playback()
         }
       }
     }
   };
   var keystroke0 = makeKeystroke(0);
   var keystroke1 = makeKeystroke(1);
   var keystroke2 = makeKeystroke(2);
   var keystroke3 = makeKeystroke(3);

   function playerTurn() {
     $('#div0').addClass('mouseActive');
     $('#div1').addClass('mouseActive');
     $('#div2').addClass('mouseActive');
     $('#div3').addClass('mouseActive');

     document.getElementById("div0").addEventListener("click", keystroke0, false);
     document.getElementById("div1").addEventListener("click", keystroke1, false);
     document.getElementById("div2").addEventListener("click", keystroke2);
     document.getElementById("div3").addEventListener("click", keystroke3);

   }

   function playback() {
     if (arrSequence.length > 0) {
       document.getElementById("div0").removeEventListener("click", keystroke0);
       document.getElementById("div1").removeEventListener("click", keystroke1);
       document.getElementById("div2").removeEventListener("click", keystroke2);
       document.getElementById("div3").removeEventListener("click", keystroke3);
     }
     if (correct) {
       getNext();
       correct = false
     }
     $('#div0').removeClass('mouseActive');
     $('#div1').removeClass('mouseActive');
     $('#div2').removeClass('mouseActive');
     $('#div3').removeClass('mouseActive');
     playerSeq = [];
     playerKeyStr = 0;
     var count = 0,
       current = 0;
     setTimeout(function() {
       document.getElementById("counter").innerHTML = arrSequence.length
     }, 500);
     var animation = setInterval(animate, 900);

     function animate() {
       if (count < arrSequence.length) {
         current = arrSequence[count];
         playOne(current);
         count++;
       } else {
         count = 0;
         clearInterval(animation);
         playerTurn();
       }
     }
   }

   document.getElementById("start").onclick = function() {
     arrSequence = [];
     correct=true;
     this.innerText = "Restart";
     playback();
   };

   document.getElementById("modeBtn").onclick = function() {
     if (strict) {
       strict = false;
       document.getElementById("modeDisp").innerHTML = "Relaxed";
       document.getElementById("start").innerHTML = "Start";
       document.getElementById("counter").innerHTML = "--";
       arrSequence = [];
       playerSeq = [];
     } else {
       strict = true;
       document.getElementById("modeDisp").innerHTML = "Strict";
       document.getElementById("start").innerHTML = "Start";
       document.getElementById("counter").innerHTML = "--";
       arrSequence = [];
       playerSeq = [];
     }
   };
 })