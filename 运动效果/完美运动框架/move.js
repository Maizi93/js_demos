function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

function startMove(obj,json,fn){
	var flag=true;   //假设所有的运动都达到了目标值
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
    	for(var attr in json){
    	    //获取当前值
    	    var icur=0;
    	    if(attr=='opacity'){
    		    icur=Math.round(parseFloat(getStyle(obj,attr))*100);
    	    }else{
    		    icur=parseInt(getStyle(obj,attr));
    	    }

    	    //计算速度
    	    var speed=(json[attr]-icur)/8;
    	    speed=speed>0?Math.ceil(speed):Math.floor(speed);

    	    //停止检测
    	    if(icur!=json[attr]){
    	    	flag=false;
    	    }
            if(attr=='opacity'){
    		    obj.style.filter='alpha(opacity:'+icur+speed+')';
    			obj.style.opacity=(icur+speed)/100;
    		}else{
    			obj.style[attr]=icur+speed+'px';
    		}
    		if(flag==true){
    			clearInterval(obj.timer);
    			if(fn){
    				fn();
    			}
    		}
        }
    },30);
}