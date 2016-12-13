define(['jquery'],function($){
	function Widget(){
		this.boundingBox = null;
	}

	Widget.prototype = {
		on:function(events,handler){
			this.handlers[events] = this.handlers[events] || [];
			this.handlers[events].push(handler);
			return this;
		},
		fire:function(events,data){
			if(this.handlers[events] instanceof Array){
				var handlers = this.handlers[events];
				handlers.forEach(function(value,index){
					value(data);
				});
			}
			// for(var key in this.handlers){
			// 	this.handlers[key] = [];
			// }
		},
		off:function(events,handler){
			var handlers = this.handlers[events];
			for (var i = 0; i < handlers.length; i++) {
				if(handlers[i] === handler){
					handlers.splice(i,1);
				}
			}
			return this;
		},
		render:function(container){
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},
		destory:function(){
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		},
		//四个接口
		renderUI:function(){},
		bindUI:function(){},
		syncUI:function(){},
		destructor:function(){}
	}
	return{
		Widget:Widget
	};
})