/*
* 定义window模块
* //requireJs默认将文件名和模块名有一个对应关系；在底下会自动去找jquery.js这个文件,然后动态把它加载进来
* //有时候我们下载的jquery会带着版本号等，它不是直接的jquery.js,它带版本号和压缩等，我们不需要在define上写一个带一大串版本号的文件，不存在直接的映射关系
* //如果没有可以指明，默认是模块名和文件名刚好对应
* //手动的指定映射关系，require.config
* 把jquery
*/

// define(['jquery'],function($){

// 	function Window(){
	
// 	};
	
// 	Window.prototype = {
// 		alert  : function(content){
// 			var boundingBox = $('<div class="window_boundingBox"></div>');
// 			boundingBox.appendTo("body");
// 			boundingBox.html(content);
// 		},
// 		confirm: function(){},
// 		prompt : function(){}
// 	};
	
// 	return {Window : Window};
// });

define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	function Window(){
		this.config = {
			width:500,
			height:300,
			title:"系统消息",
			content:"系统提示框",
			alertBtnText:"确定",
			confirmBtnText:"确定",
			confirmCancleBtn:"取消",
			hasMask:true,
			hasCloseBtn:false,
			isDraggable:true,
			dragHandle:true,
			handle4AlertBtn:null,
			handle4CloseBtn:null,
			handle4ConfirmBtn:null,
			handle4CancleBtn:null,
			skinClassName:null
		}

	}

	Window.prototype = $.extend({},new widget.Widget(),{
		constructor:Window,
		renderUI: function(){
			var footerContent = '';
			switch(this.config.winType){
				case 'alert':
					footerContent = '<input class="window_alertBtn" type="button" value="'
					+this.config.alertBtnText+'">';
					break;
				case 'confirm':
					footerContent = '<input class="window_confirmBtn" type="button" value="'
					+this.config.confirmBtnText+'"><input class="window_cancleBtn" type="button" value="'
					+this.config.confirmCancleBtn+'">';
					break;
			}
			this.boundingBox = $(
				'<div class="window_boundingBox">'+
				'<header class="window_header">' + this.config.title + '</header>' +
				'<div class="window_body">' + this.config.content + '</div>'+
				'<footer class="window_footer">'+footerContent+'</footer>' + 
				'</div>');
			if(this.config.hasMask){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo('body');
			}
			if (this.config.hasCloseBtn) {
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			}
			this.boundingBox.appendTo(document.body);
		},
		bindUI:function(){
			var that = this;
			this.boundingBox.delegate('.window_alertBtn','click',function(){
				that.fire('alert');
				that.destory();
			}).delegate('.window_closeBtn','click',function(){
				that.fire('close');
				that.destory();
			}).delegate('.window_confirmBtn','click',function(){
				that.fire('confirm');
				that.destory();
			}).delegate('.window_cancleBtn','click',function(){
				that.fire('cancle');
				that.destory();
			})
			if(this.config.handle4AlertBtn){
				this.on('alert',this.config.handle4AlertBtn);
			}
			if(this.config.handle4CloseBtn){
				this.on('close',this.config.handle4CloseBtn);
			}
			if(this.config.handle4ConfirmBtn){
				this.on('confirm',this.config.handle4ConfirmBtn);
			}
			if(this.config.handle4CancleBtn){
				this.on('cancle',this.config.handle4CancleBtn);
			}

		},
		syncUI:function(){
			this.boundingBox.css({
				width : this.config.width + 'px',
				height : this.config.height + 'px',
				left : (this.config.x || (window.innerWidth-this.config.width)/2) + 'px',
				top : (this.config.y || (window.innerHeight-this.config.height)/2) + 'px'
			});
			if(this.config.skinClassName){
				this.boundingBox.addClass(this.config.skinClassName);
			}
			if(this.config.isDraggable){
				if(this.config.dragHandle){
					this.boundingBox.draggable({handle:this.config.dragHandle});
				} else {
					this.boundingBox.draggable();
				}
			}

		},
		destructor:function(){
			this._mask && this._mask.remove();
		},
		alert:function(config){
			$.extend(this.config,config,{winType:'alert'});
			this.render();
			return this;
		},
		confirm:function(config){
			$.extend(this.config,config,{winType:'confirm'});
			this.render();
			return this;
		},
		prompt:function(){}
	});

	return {Window:Window};
});


