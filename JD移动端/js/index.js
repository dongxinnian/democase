window.onload = function(){
	var seckill_time = document.getElementById('seckill_time');
	var time_span = seckill_time.getElementsByTagName('span');
	var h = new Date().getHours()-6;
	var m = new Date().getMinutes();
	var s = new Date().getSeconds();
	var time = setTime(h)+':'+setTime(m)+':'+setTime(s);
	function setTime(n){
		if(n<10){
			return '0'+n; 
		}else{
			return n;
		}
	}
	function addtime(s){
		for(var i=0; i<time_span.length; i++){
			if(time_span[i].innerHTML != ':'){
				time_span[i].innerHTML = s.charAt(i);
			}
		}
	}
	addtime(time)
	setInterval(function(){

		if(s>0){
			s--;
		}else if(s <= 0&&m>0){
			m--;
		}else if(s<=0&&m<=0&&h>0){
			h--;
		}

		time = setTime(h)+':'+setTime(m)+':'+setTime(s);
		addtime(time)
	},1000)
	
	
	
	
	
	
	
	
}
