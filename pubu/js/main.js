function waterfall(parent,sclass){
	var oParent = document.getElementById(parent);
	var oBox = document.getElementsByClassName(sclass)
	var boxwidth = oBox[0].offsetWidth;
	oParent.style.width = boxwidth*4 + 'px';
	var mainwidth = oParent.offsetWidth;
	var cnum = Math.floor(mainwidth/boxwidth);
	var oBoxHeight = [];
	for(var i=0; i<oBox.length; i++){
		if(i<cnum){
			oBox[i].style.top = '0';
			oBox[i].style.left = boxwidth*i +'px';
			oBoxHeight.push(oBox[i].offsetHeight);
		}else{
			var minHeight = Math.min.apply(null,oBoxHeight);//158
			var minIndex = getIndex(oBoxHeight,minHeight);//2
			oBox[i].style.top = minHeight + 'px';
			oBox[i].style.left = oBox[minIndex].offsetLeft+'px';
			oBoxHeight[minIndex]+=oBox[i].offsetHeight;
		}
	}
}
function getIndex(arr,value){
	for(var i in arr){
		if(arr[i]==value){
			return i;
		}
	}
}
window.onload = function(){
	waterfall('main','box');
}

function checkScrollside(sClass){
	var aBox = document.getElementsByClassName(sClass);
	var lastBox = aBox[aBox.length-1].offsetTop+Math.floor(aBox[aBox.length-1].offsetHeight/2);
	var documentHeight = document.documentElement.clientHeight||document.body.clientHeight;
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
	if(lastBox<documentHeight+scrollTop){
		crenteEle();
	}
}
window.onscroll = function(){
	checkScrollside('box');
}

function crenteEle(){
	var omain = document.getElementById('main');
	for(var i=0; i<dataInit.data.length; i++){
		var oBox = document.createElement('div');
		oBox.className = 'box';
		var oPic = document.createElement('div');
		oPic.className = 'pic';
		var oImg = document.createElement('img');
		oImg.src = dataInit.data[i].src;
		oPic.appendChild(oImg);
		oBox.appendChild(oPic);
		omain.appendChild(oBox);
	}
	waterfall('main','box');
}
