/*
* 定义main模块
//自己模拟的弹窗，本质上就是一些DOM操作，所以我们的弹窗不可避免的要使用一些DOM操作
*/
// require.config({
//     paths: {
//         jquery: 'jquery-1.11.1.min'
//     }
// });
// //在应用层不显式的再写一次就很难在这里用到Jquery
// //虽然在window.js和main.js都将jquery引入，但是require.js只会将jquery加载一次
// require(['jquery','window'],function($,win){
// 	$("#a").click(function(){
// 		new win.Window().alert('Welcome');
// 	});
	
// 
require.config({
	paths:{
		jquery:'jquery-1.11.1.min',
		jqueryUI:'jquery-ui'
	}
});
require(['jquery','window'],function($,w){
	$('#a').click(function(){
				var win = new w.Window();	
					win.alert({
					title:'提示',
					// content:'啦啦啦啦啦啦',
					handle4AlertBtn:function(){
						alert('you click yes');
					},
					handle4CloseBtn:function(){
						alert('you click close');
					},
					y:50,
					hasCloseBtn:true,
					skinClassName:'window_skin_a',
					alertText:"这是啥玩意？",
					dragHandle:".window_header"
				}).on('alert',function(){
					alert('the third alert handler');
				}).on('close',function(){
					alert('the second close handler');
				});
	
				win.on('alert',function(){
					alert('the third alert handler');
				});
				
		});
	$('#b').click(function(){
				var win = new w.Window();	
					win.confirm({
					title:'系统消息',
					// content:'啦啦啦啦啦啦',
					handle4ConfirmBtn:function(){
						alert('Are you OK?');
					},
					handle4CancleBtn:function(){
						alert('!!!!!');
					},
					y:50,
					hasCloseBtn:true,
					skinClassName:'window_skin_a',
					confirmBtnText:"晕菜？",
					dragHandle:".window_header"
				}).on('confirm',function(){
					alert('I am OK!');
				}).on('cancle',function(){
					alert('man');
				}).on('close',function(){
					alert('the  close handler');
				});
				
		});
	});