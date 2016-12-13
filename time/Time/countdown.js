
	var endTime = new Date();
	endTime.setTime(endTime.getTime()+3600*1000);
	var curShowTimeSeconds = 0;

	var balls = [];

	const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];


	window.onload = function  () 
	{
// 		有时候需要取页面的底部, 就会用到document.body.clientHeight , 在HTML 标准中(这一句就能取到整个页面的高度, 不论body 的实际内容到底有多高, 例如, 1074*768 的分辨率, 页面最大化时, 这个高度约为720 , 即使页面上只有一句"hello world" , 也仍然取到720.
// 可是在XHTML中, 如果body 体中只有一行, 则document.body.clientHeight 只能取到那一行的高度, 约20px, 这时如何还想取到整个页面的高度, 就要用document.documentElement.clientHeight 来获取了.
// 原因是: 在HTML 中, body 是整个DOM 的根, 而在XHTML 中, document 才是根, body 不再是根, 所以取body 的属性时, 不能再取到整个页面的值.



// 总结:
// XHTML中用 document.documentElement.clientHeight  代替
// document.body.clientHeight




		WINDOW_WIDTH = document.documentElement.clientWidth;
		WINDOW_HEIGHT = document.documentElement.clientHeight;//
		MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
		RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
		MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);


		var canvas = document.getElementById("canvas");


		console.log(WINDOW_HEIGHT);

		canvas.width = WINDOW_WIDTH;
		canvas.height = WINDOW_HEIGHT;


		var context = canvas.getContext("2d");

		curShowTimeSeconds = getCurrentShowTimeSeconds();
		setInterval(
			function()
		{
			render(context); 
			update();
		},50);
			
	}

	function update ()
	{
		var nextShowTimeSeconds = getCurrentShowTimeSeconds();
		var nextHours = parseInt(nextShowTimeSeconds / 3600);
		var nextMinutes = parseInt((nextShowTimeSeconds - nextHours *3600)/60);
		var nextSeconds = nextShowTimeSeconds % 60;

		var curHours = parseInt(curShowTimeSeconds / 3600);
		var curMinutes = parseInt((curShowTimeSeconds - curHours *3600)/60);
		var curSeconds = curShowTimeSeconds % 60;

		if (nextSeconds != curSeconds) 
			{
				if(parseInt(curHours/10) != parseInt(nextHours/10))
				{
					addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
				}
				if(parseInt(curHours%10) != parseInt(nextHours%10))
				{
					addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
				}
				if(parseInt(curMinutes/10) != parseInt(nextMinutes/10))
				{
					addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
				}
				if(parseInt(curMinutes%10) != parseInt(nextMinutes%10))
				{
					addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
				}
				if(parseInt(curSeconds/10) != parseInt(nextSeconds/10))
				{
					addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
				}
				if(parseInt(curSeconds%10) != parseInt(nextSeconds%10))
				{
					addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
				}


				curShowTimeSeconds = nextShowTimeSeconds;
			}

			updateBalls();

	}

	function updateBalls()
	{
		for (var i = 0; i < balls.length; i++) 
		{
			balls[i].x += balls[i].vx;
			balls[i].vy += balls[i].g;
			var Y = balls[i].y + balls[i].vy;

			if (Y >= WINDOW_HEIGHT - RADIUS ) 
				{
					Y = WINDOW_HEIGHT - RADIUS;
					balls[i].vy = -0.75 * balls[i].vy; 	 
 
				}

				balls[i].y = Y;
		}
		var cnt = 0;
		for (var i = 0; i < balls.length; i++) 
		{
			if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
				balls[cnt++] = balls[i];
		}

		while(balls.length > Math.min(300,cnt))
		{
			balls.pop();
		}
	}

	function addBalls(x,y,index)
	{
		for (var i = 0; i < arr[index].length; i++) 
			{

				for (var j = 0;j < arr[index][i].length; j++) 
				{

					if(arr[index][i][j])
					{ 
						var aBall = 
						{
							x:x+j*2*(RADIUS+1)+(RADIUS+1),
							y:y+i*2*(RADIUS+1)+(RADIUS+1),
							g:1.5+Math.random(),
							vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
							vy:-5,
							color:colors[Math.floor(Math.random()*colors.length)]
						}
						balls.push(aBall);
			
					}
				}
			}
	}

	function getCurrentShowTimeSeconds ()
	{
		var curTime = new Date();
		var ret = endTime.getTime() - curTime.getTime();
		ret = Math.round(ret/1000);

		return ret>=0? ret:0;
	}

	function render(cxt)
	{
		cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//进行屏幕刷新，不然每次绘制都会叠加

		var hours = parseInt(curShowTimeSeconds / 3600);
		var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
		var seconds = curShowTimeSeconds % 60; //parseInt(getCurShowTimeSeconds-hours*3600-minutes*60);

		renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
		renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
		renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
		renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
		renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
		renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
		renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
		renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);


		for (var i = 0; i < balls.length; i++) 
		{
			cxt.fillStyle = balls[i].color;

			cxt.beginPath();

			cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
			cxt.closePath();

			cxt.fill();
		}

	}

	function renderDigit(x,y,index,cxt)
	{
		cxt.fillStyle = "rgb(0,102,153)";
		for (var i = 0; i < arr[index].length; i++) 
			{

				for (var j = 0;j < arr[index][i].length; j++) 
				{

					if(arr[index][i][j])
					{ 

						cxt.beginPath();
						cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
						cxt.fill();
					}
				}
			}

	}