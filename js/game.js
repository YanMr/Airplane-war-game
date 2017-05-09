function $(id){
  return document.getElementById(id);
}

window.onload=function(){
  var imglist=new Array();
	var gaw=-900;
	function bgagme(){
        if(gaw>-131){
        	gaw=-900;
        }else {
        	gaw+=1;
        }
         $("gamebg").style.backgroundPositionY=gaw+"px";
    }
 document.onkeydown=function(e){
  	var even=e||window.event;
  	var code=even.keyCode;
  	switch(code){
  		case 38: //上
  		    up();
  		 break;
  		case 39: //右
  		    right();
  		  break;
  		case 40: //下
  		   bottom();
  		  break;
  		case 37: //左
  		     left()
  		  break;
      case 32: //子弹
           var x=$("meplan").offsetLeft+53;
           var y=$("meplan").offsetTop;
           spank(x,y);
        break;
  		 default:
  		  break;

  	}
  };
    function up(){
            $("meplan").style.top= Math.max(0,($("meplan").offsetTop-15))+"px"
    };
       function right(){
            $("meplan").style.left= Math.min(406,($("meplan").offsetLeft+15))+"px"
    };

      function bottom(){
            $("meplan").style.top= Math.min(524,($("meplan").offsetTop+15))+"px"
    };
       function left(){
            $("meplan").style.left= Math.max(0,($("meplan").offsetLeft-15))+"px"
    };
  //发射炮弹
  function spank(x,y){
         for(var i=0;i<10;i++){
              var eshot = $("bullet"+i);
              if(eshot.style.display=="none"){
                eshot.style.left=x+"px";
                eshot.style.top=y+"px";
                eshot.style.display="block";
                return
              }

     }
 };
  //游戏主线程
  function gameRunning(){
          for(var i=0;i<10;i++){
             var eshot = $("bullet"+i);
             if(eshot.style.display=='block'){
                eshot.style.top=(eshot.offsetTop-5)+'px';
                collsion(eshot)
             }
             
             if(eshot.offsetTop<=0){
              eshot.style.display="none"
             }
          }
        for(var i=0;i<imglist.length;i++){
          imglist[i].num++;
          if( imglist[i].num>10){
            imglist[i].style.display="none";
            imglist.splice(i)
          }

        }
   };
  //获取敌机
  function  doplane(){
         var i=Math.ceil((Math.random()*3))-1;
          var plane=$('plane'+i);
           if(plane.style.display=="none"){
            plane.style.top=-74+"px";
            plane.style.left=Math.ceil(Math.random()*420)+"px";
            plane.style.display="block";
          }

 }
//敌机跑动和敌机回收
 function doshow(){
        for(var i=0;i<3;i++){
             var plane=$('plane'+i);
              if( plane.style.display=="block"){
                plane.style.top=(plane.offsetTop+2)+'px';
                mecoslls(plane)
              }
              if(plane.offsetTop>600){
                plane.style.display="none"
              }
          }
 }
//子弹碰撞检测
 function collsion(eshot){
        for(var i=0;i<3;i++){
             var plane=$('plane'+i);
              if(plane.style.display=="block"){
                var x=eshot.offsetLeft;
                var y=eshot.offsetTop;
                var px=plane.offsetLeft;
                var py=plane.offsetTop;
               if((x>px) && (x<px+104) && (y<74+py) && (y>py)){
                eshot.style.display="none";
                plane.style.display="none";
                var img=document.createElement("img")
                img.src="./images/boom.gif";
                img.style.position="absolute";
                 img.style.left=(px-130)+"px";
                 img.style.top=(py-190)+"px";
                 img.num=0;
                 console.log(img.num);
                 imglist.push(img);
                 $("gamebg").appendChild(img);

               }
              }
          };
 }
//飞机碰撞检测
function mecoslls(plane){
                var mx=$("meplan").offsetLeft;
                var my=$("meplan").offsetTop;
                if(plane.style.display=="block" && $("meplan").style.display!="none"){
                   var mx=$("meplan").offsetLeft;
                    var my=$("meplan").offsetTop;
                       var px=plane.offsetLeft;
                var py=plane.offsetTop;
                  if(((mx>px) && (mx<px+90) && (my<50+py) && (my>py))||((mx+90>px) && (mx+90<px+90) && (my<50+py) && (my>py))){
                     for(var i=0;i<3;i++){
                       var pl=$('plane'+i);
                       if(pl.style.display=="block"){
                         pl.style.display="none";
                       }

                     }
                   plane.style.display="none";
                   meplan.style.display="none";   
                   
                 var img =document.createElement("img");
                 img.src="./images/boom.gif";
                 img.style.position="absolute";
                 img.style.left=(px-110)+"px";
                 img.style.top=(py-100)+"px";
                 $("gamebg").appendChild(img);
                 setTimeout(function(){
                        img.remove()
                   $("over").style.display="block";
                 }, 1000)
               }
             }
 }
var time0= setInterval(doshow, 10);
var time1=setInterval(doplane, 500);
var time2=setInterval(gameRunning, 10);
var time3=setInterval(bgagme,10);
//重新开始和结束
$("yes").onclick=start;
function start(e){
    $("meplan").style.display="block";
    $("meplan").style.top="524"+'px';
    $("meplan").style.left="206"+'px'
    $("over").style.display="none";
} 
$("no").onclick=over;
function over(e){
    $("over").innerHTML="<span style=\"line-Height:150px; font-Size:48px\">游戏结束!</span>"
      clearInterval(time0)
      clearInterval(time1)
      clearInterval(time2)
      clearInterval(time3)
} 
}

