    //记录当前显示的文件列表的父级id
    var currentParentId = 0;
     //全选
    var onOff = false;
    window.onload = function()
{   //遮罩层
    var oHide = document.getElementById("hide"),
        oRenamehide = document.getElementById("renamehide"),
        oMovehide = document.getElementById("movehide"),

        oWarning = document.getElementById("warning"),
    //功能键
        oAddfile = document.querySelectorAll("#content .newbutton")[0],
        addfileSpan = oAddfile.getElementsByTagName("span")[0],
        oDelete = document.querySelector(".g-button3"),
        oDeleteSpan = oDelete.getElementsByTagName("span")[0],
        oRename = document.querySelector(".g-button5"),
        oMoveto = document.querySelector(".g-button7"),
        oCloneto = document.querySelector(".g-button6"),
    //左边栏
        oTasklist = document.querySelector("#task .tasklist"),
        oTaskLi = oTasklist.getElementsByTagName("li"),
        task1 = oTasklist.querySelector(".atask1 span"),
        task2 = oTasklist.querySelector(".atask2 span"),
        task3 = oTasklist.querySelector(".atask3 span"),
        task4 = oTasklist.querySelector(".atask4 span"),
        task5 = oTasklist.querySelector(".atask5 span"),
        task6 = oTasklist.querySelector(".atask6 span"),
        task7 = oTasklist.querySelector(".atask7 span"),
   

    //dom结构页
        oshowDom = document.getElementById("dom"), 

        oSelectall = document.querySelector(".selectall"),

        oShowDomList = document.getElementById("showdom"),
        showDomAll = document.querySelector(".domstyle"),
        dombutton1 = document.querySelector(".dombutton-1"),
        dombutton2 = document.querySelector(".dombutton-2"),
    //全选按钮
        oCheckicon = document.querySelector(".check-icon"),
    
    //已选中n个文件
        oSelectedFile = document.querySelectorAll(".list-header-operatorarea span")[0],

        oListheader = document.querySelector(".list-header-operatorarea"),

        oUl = oListheader.getElementsByTagName("ul")[0],
        oLi = oUl.getElementsByTagName("li"),

        addArea = document.getElementById("show"),

        oContent = document.getElementById("content"),

        ocrumbs = document.querySelectorAll("#content .showsum div")[0],

        oShowsum = document.querySelector(".showsum"),
        oBtn = document.querySelectorAll(".showsum a");

    
    console.dir(oBtn);
    //初始化文件夹
    showList( getChildById( currentParentId ) );

    oDelete.onmouseover = function()
    {
        iconActive(oDeleteSpan,-270,0);
    }
    oDelete.onmouseout = function()
    {
        iconActive(oDeleteSpan,-210,0);
    }
    oAddfile.onmouseover = function()
    {
        iconActive(addfileSpan,-180,-2);
    }
    oAddfile.onmouseout = function()
    {
        iconActive(addfileSpan,-150,-2);
    }
    oTaskLi[0].onmouseover = function()
    {
        iconActive(task1,-23,0);
    }
    oTaskLi[0].onmouseout = function()
    {
        iconActive(task1,0,0);
    }
    oTaskLi[1].onmouseover = function()
    {
        iconActive(task2,-23,-21);
    }
    oTaskLi[1].onmouseout = function()
    {
        iconActive(task2,0,-21);
    }
    oTaskLi[2].onmouseover = function()
    {
        iconActive(task3,-23,-42);
    }
    oTaskLi[2].onmouseout = function()
    {
        iconActive(task3,0,-42);
    }
    oTaskLi[3].onmouseover = function()
    {
        iconActive(task4,-23,-88);
    }
    oTaskLi[3].onmouseout = function()
    {
        iconActive(task4,0,-88);
    }
    oTaskLi[4].onmouseover = function()
    {
        iconActive(task5,-23,-201);
    }
    oTaskLi[4].onmouseout = function()
    {
        iconActive(task5,0,-201);
    }
    oTaskLi[5].onmouseover = function()
    {
        iconActive(task6,-23,-66);
    }
    oTaskLi[5].onmouseout = function()
    {
        iconActive(task6,0,-66);
    }
    oTaskLi[6].onmouseover = function()
    {
        iconActive(task7,-23,-176);
    }
    oTaskLi[6].onmouseout = function()
    {
        iconActive(task7,0,-176);
    }


    for (var i = 0; i < oLi.length; i++) 
    {
        oLi[i].onmouseover = function()
        {
            this.style.color = "#282828";
            this.style.backgroundColor  = "#fff";
        }
        oLi[i].onmouseout = function()
        {
           this.style.color = "#666";
           this.style.backgroundColor  = "";
        }
    }

     //点击icon时候
    oAddfile.onmousedown = iconmd;
    oAddfile.onmouseup = iconup;
    oDelete.onmousedown = iconmd;
    oDelete.onmouseup = iconup;
    oRename.onmousedown = iconmd;
    oRename.onmouseup = iconup;




    //创建文件夹
    oAddfile.onclick = function(){
        var name = "新建文件夹";

        if (name) 
            {
                dataList.push({
                    parentId:currentParentId,
                    id:getMaxId()+1,
                    name:name
                });
            };
        showList(getChildById(currentParentId));
        var ele = document.querySelectorAll("#show .grid-view-item");
        for (var i = 0; i < ele.length; i++) {
            if(ele[i].Id == getMaxId())
            {

                rename(ele[i]);

            }

        };
    }
    //重命名
    function rename(ele)
    {
        oHide.style.display = "block";
        
        //对选中个数进行处理
        var eleName = ele.children[1];
        eleName.onmouseover = function(ev)
        {
            var e = ev || event;
            e.stopPropagation();
        }
        eleName.onclick = function(ev)
        {
            var e = ev || event;
            e.stopPropagation();
        }
        eleName.children[0].style.display = "none";
        eleName.children[1].style.display = "inline-block";
        eleName.children[1].focus();
        eleName.children[2].style.display = "inline-block";
        eleName.children[3].style.display = "inline-block";
        eleName.children[1].style.zIndex = 102;
        eleName.children[2].style.zIndex = 102;
        eleName.children[3].style.zIndex = 102;

        eleName.children[1].onmousedown = function(ev)
        {
            var e = ev || event;
            e.stopPropagation();
        }

        //取消
        var str = eleName.children[0].innerHTML;
        eleName.children[3].onmousedown = function(ev)
        {
            var e = ev || event;
            e.stopPropagation();
        }
        eleName.children[3].onclick = function()
        {
            oHide.style.display = "none";
            eleName.children[0].innerHTML = str;
            eleName.children[1].value = str;
            eleName.children[0].style.display = "inline-block";
            eleName.children[1].style.display = "none";
            eleName.children[2].style.display = "none";
            eleName.children[3].style.display = "none";
            eleName.children[1].style.zIndex = "auto";
            eleName.children[2].style.zIndex = "auto"
            eleName.children[3].style.zIndex = "auto"
            setTimeout(function(){
                eleName.onmouseover = null;
                eleName.onclick = null;   
            },100);
       
        }
        //确定
        eleName.children[2].onmousedown = function(ev)
        {
            var e = ev || event;
            e.stopPropagation();
        }
        eleName.children[2].onclick = function()
        {
            oHide.style.display = "none";
            console.log(oHide.style.display);
            eleName.children[0].innerHTML = eleName.children[1].value;
            findId(ele.Id).name = eleName.children[1].value;
            eleName.children[0].style.display = "inline-block";
            eleName.children[1].style.display = "none";
            eleName.children[2].style.display = "none";
            eleName.children[3].style.display = "none";
            eleName.children[1].style.zIndex = "auto";
            eleName.children[2].style.zIndex = "auto"
            eleName.children[3].style.zIndex = "auto"
            setTimeout(function(){
                eleName.onmouseover = null;
                eleName.onclick = null;   
            },100);
       
        }
    }

    //删除文件夹
    oDelete.onclick = function(ev)
    {
        //currentParentId不变
        //判断有无选中
        var of = confirm("确定删除吗？");
        if (of)
        {
            var ele = document.querySelectorAll("#show .grid-view-item");
            
            for (var i = 0; i < ele.length; i++) 
            {
                if (ele[i].isSelected)
                {
                    var children = getALLChildById(ele[i].Id);
                    console.log(children);
                    for (var j = 0; j < children.length; j++)
                        for (var k = 0; k < dataList.length; k++) 
                        {
                            if (children[j].id == dataList[k].id)
                            {
                                dataList.splice(k,1);

                            }
                        }
                    
                }
            }
            showList(getChildById(currentParentId));
            if (!getChildById(currentParentId).length) 
                {
                    iconActive(oCheckicon,-9,-12);
                }
        }
    }


    // var oShowDomList = document.getElementById("showdom");
    // var showDomAll = document.querySelector(".domstyle");
    // oShowDomList.onclick = function()
    // {
    //     if (showDomAll.style.display != "block") 
    //         {
                
    //             showDomAll.style.display = "block";
    //         }
    //         else
    //         {
    //             showDomAll.style.display = "none";
    //         }
    //         showDom(0);
        
    // }

    /*
        选中后点击移动到弹出选则页面，获取当前页面结构的所有文件DIV,获取DOM树的所有DIV。
        for循环得到选中的需要移动的文件(isSelected为true)(简称子),for循环获得DOM树当前选中的
        文件夹,即将要移动到的文件(isSelected为true)(简称父),匹配子文件id与数据中的id,
            将匹配到的数据根据id获得全部子集（包括自身），存进一个数组，之后进行
    */
    oCloneto.onclick = function()
    {
        showDomAll.style.display = "block";
        oHide.style.display = "block";
        showDom(); 
        dombutton1.onclick = function()
        {
            var ele = document.querySelectorAll("#show .grid-view-item");
            var domEle = document.querySelectorAll("#dom div");
            var elearr = [];
            var domele;
            for (var i = 0; i < domEle.length; i++) 
            {
                if (domEle[i].isSelected)
                {
                    domele = getDataById(domEle[i]);
                } 
            }

            for (var i = 0; i < ele.length; i++) 
            {
                if (ele[i].isSelected)
                {
                    ele[i].isSelected = false;
                    elearr.push(getDataById(ele[i]));
                    
                }
            }
            console.log("elearr:"+elearr);
            //当没有选择dom树种的文件,
            if (!domele) 
            {
                if (elearr[0].parentId == 0) 
                    {
                        oHide.style.display = "none";
                        clearisSelected();
                        showDomAll.style.display = "none";
                        return;
                    }

                var obj = {};
    
                for (var i = 0; i < elearr.length; i++) 
                {   
                    var num = 0
                    obj["arr"+i] = getALLCloneChildById(elearr[i].id,num);
                    
                }
                for (var j = 0; j < elearr.length; j++) 
                {
                    //obj["arr"+i]为需要复制的一堆json，elearr[i]为最上级的元素
                    var num = 0;
                    clone(obj["arr"+i],obj["arr"+i][0],num);
                    obj["arr"+i][0].parentId = 0;
                    dataList.concat(obj["arr"+i]);
                }
            }
            else
            {
                //判断移动位置是否为自身或者自身子集
                for (var i = 0; i < elearr.length; i++) 
                {
                    var children = getALLChildById(elearr[i].id)
                    for (var j = 0; j < children.length; j++) 
                    {
                        if(children[j].id == domele.id)
                        {
                            clearisSelected();
                            showDomAll.style.display = "none";
                            oWarning.style.display = "block";
                            oHide.style.display = "none";
                            setTimeout(function(){
                                oWarning.style.display = "none";
                            },4000);
                            return;
                        }
                    }
                }
                var obj = {};
    
                for (var i = 0; i < elearr.length; i++) 
                {     var num = 0
                     obj["arr"+i] = getALLCloneChildById(elearr[i].id,num);
         
                    
                }
                for (var i = 0; i < elearr.length; i++) 
                {
                    //obj["arr"+i]为需要复制的一堆json，elearr[i]为最上级的元素
                    var num = 0;
                    console.log(dataList);
                    clone(obj["arr"+i],obj["arr"+i][0],num);
                    obj["arr"+i][0].parentId = domele.id;
                    console.log(obj["arr"+i]);
                    dataList = dataList.concat(obj["arr"+i]);
                    console.log(dataList);
                }
            }
            oHide.style.display = "none";
            showList(getChildById(currentParentId));
            showDomAll.style.display = "none";

        }
        dombutton2.onclick = function()
        {
            oHide.style.display = "none";
            clearisSelected();
            showDomAll.style.display = "none";
        }

    }


    

    /*
        选中后点击移动到弹出选则页面，获取当前页面结构的所有文件DIV,获取DOM树的所有DIV。
        for循环得到选中的需要移动的文件(isSelected为true)(简称子),for循环获得DOM树当前选中的
        文件夹,即将要移动到的文件(isSelected为true)(简称父),匹配子文件id与数据中的id,
        将匹配到的数据中的元素的parentId指向即将要移动到的文件的id
        隐藏DOM树选择框,渲染页面,处理页面与DOM选中的元素，重置样式以及属性。
    */

    //移动到
    
    oMoveto.onclick = function()
    {
        showDomAll.style.display = "block";
        oHide.style.display = "block";
        showDom(); 
        dombutton1.onclick = function()
        {
            var ele = document.querySelectorAll("#show .grid-view-item");
            var domEle = document.querySelectorAll("#dom div");
            var elearr = [];
            var domele;
            for (var i = 0; i < domEle.length; i++) 
            {
                if (domEle[i].isSelected)
                {
                    domele = getDataById(domEle[i]);
                } 
            }
            //当没有选择dom树种的文件

            for (var i = 0; i < ele.length; i++) 
            {
                if (ele[i].isSelected)
                {
                    ele[i].isSelected = false;
                    elearr.push(getDataById(ele[i]));
                    
                }
            }
            if (!domele) 
                {
                    elearr.forEach(function(value,index){
                        value.parentId = 0;
                    });
                }
            else
            {
                //判断移动位置是否为自身或者自身子集
                for (var i = 0; i < elearr.length; i++) 
                {
                    var children = getALLChildById(elearr[i].id)
                    console.log(children);
                    for (var j = 0; j < children.length; j++) 
                    {
                        if(children[j].id == domele.id)
                        {
                            clearisSelected();
                            showDomAll.style.display = "none";
                            oWarning.style.display = "block";
                            oHide.style.display = "none";
                            setTimeout(function(){
                                oWarning.style.display = "none";
                            },4000);
                            return;
                        }
                    }
                }
                elearr.forEach(function(value,index){
                    value.parentId = domele.id;
                });
            }
            oHide.style.display = "none";
            showList(getChildById(currentParentId));
            showDomAll.style.display = "none";

        }
        dombutton2.onclick = function()
        {
            oHide.style.display = "none";
            clearisSelected();
            showDomAll.style.display = "none";
        }

    }
    
   
    oCheckicon.onclick = function(ev)
    {
        var e = ev || event;
        e.preventDefault();


        var childs = getChildById(currentParentId);
        
        if (!childs.length) 
            {
                return false;
            };
        var ele = document.querySelectorAll("#show .grid-view-item");
        var elec1 = document.querySelectorAll(".fileicon");
        var eleSpan = document.querySelectorAll("#show .fileicon span");

        num = 0;
        if (!onOff)
        {
            iconActive(oCheckicon,-41,-12);
            
            for (var i = 0; i < childs.length; i++) 
                for (var j = 0; j < ele.length; j++) 
                {
                    if (childs[i].id == ele[j].Id) 
                        {
                            ele[j].isSelected = true;
                            elec1[j].style.border = "2px solid #2e80dc";
                            eleSpan[j].className = "fileicon-active";
                            num++;
                        }
                }
                oRenamehide.style.display = "block";
                oRename.style.opacity = 0.2;
        }
        else
        {
            for (var i = 0; i < ele.length; i++) 
            {
                ele[i].isSelected =false;
                elec1[i].style.border = "";
                eleSpan[i].className = "";
            };
            iconActive(oCheckicon,-9,-12);
            oRenamehide.style.display = "none";
            oRename.style.opacity = 1;
        }
        onOff = !onOff;
        isShow(num);
        oSelectedFile.innerHTML = "已选中"+num+"个文件/文件夹";

    }

    //重命名
    oRename.onclick = fnRename;
    function fnRename()
    {
        var ele = document.querySelectorAll("#show .grid-view-item");
            
            for (var i = 0; i < ele.length; i++) 
            {
                if (ele[i].isSelected)
                {
                    //对工具栏以及元素选中属性样式进行处理
                    ele[i].isSelected = false;
                    num--;
                    isShow(num);
                    oSelectedFile.innerHTML = "已选中"+num+"个文件/文件夹";
                    ele[i].children[0].style.border = "";
                    ele[i].children[0].children[0].className="";
                    rename(ele[i]);
                    
                }
            }
    }

    //返回上一级
    oBtn[0].onclick = fnBack;
    function fnBack()
    {
        var parent = findParent(currentParentId);
        if (!parent) 
            {
                currentParentId = 0;
            }
            else
            {
                currentParentId = parent.id;
            }
        
        showList(getChildById(currentParentId));
    }

    //回退到全部文件
    oBtn[1].onclick = backHome;
    function backHome()
    {
        currentParentId = 0;
        showList(getChildById(currentParentId));
    }


    //拖拽区域
    addArea.onmousedown = function(ev)
    {
        areaDrag(ev);
    }
    function areaDrag(ev)
    {
        clearisSelected();
        var e = ev || event,
            target = e.target,
            movefiles = document.querySelectorAll("#show .grid-view-item"),
            startX = e.pageX,
            startY = e.pageY,
            startCX = e.clientX,
            startCY = e.clientY,
            dragDiv = createArea();
        e.stopPropagation();
        e.preventDefault();
        
        if (target != addArea) 
            {
                return;
            }
        
        


        

        document.onmousemove = function(ev)
        {
            var e = ev || event,
                areaLeft,
                areaTop,
                endX = e.pageX,
                endY = e.pageY,
                width = Math.abs(endX - startX),
                height = Math.abs(endY - startY),
                moveEle;
            if (endX - startX > 0) 
                {
                    areaLeft = startX;
                }
                else
                {
                    areaLeft = endX;
                }
            if (endY - startY > 0) 
                {
                    areaTop = startY;
                }
                else
                {
                    areaTop = endY;
                }
                dragDiv.style.left = areaLeft + "px";
                dragDiv.style.top = areaTop + "px";
                dragDiv.style.width = width + "px";
                dragDiv.style.height = height + "px";
        
            for (var i = 0; i < movefiles.length; i++) 
            {
                var eleDir = movefiles[i].getBoundingClientRect();
                if(areaLeft < eleDir.right && (areaLeft+width) > eleDir.left && areaTop < eleDir.bottom && (areaTop+height) > eleDir.top)
                {   
                    var elec1span = movefiles[i].children[0].children[0];
                    movefiles[i].isSelected = true;
                    movefiles[i].children[0].style.border = "2px solid #2e80dc";
                    elec1span.className = "fileicon-active";
                    movefiles[i].onmousedown = function(ev)
                    {
                        var e = ev || event;
                        isDrag(e,moveEle,movefiles);
                    }
                    
                }
                else
                {
                    var elec1span = movefiles[i].children[0].children[0];
                    movefiles[i].isSelected = false;
                    movefiles[i].children[0].style.border = "";
                    elec1span.className = "";
                    movefiles[i].onmousedown = null;
                }
            }
        }

        document.onmouseup = function(ev)
        {
            // console.log("addAreaup");
            // var endTime = new Date().getTime();
            // if (endTime - startTime < 400) 
            //     {
            //         addArea.removeChild(dragDiv);
            //         document.onmousemove = null;
            //         document.onmouseup = null;
            //         return;
            //     }
            var e = ev || event;
            var len = getChildById(currentParentId).length;
            for (var i = 0; i < movefiles.length; i++) 
            {
                if (movefiles[i].isSelected) 
                    {
                        num++;
                    }
            }
            if (num == len && num != 0) 
            {
                iconActive(oCheckicon,-41,-12);
                onOff = true;
            }
            else
            {
                iconActive(oCheckicon,-9,-12);
                onOff = false;
            }
            //判断num数是否可以重命名
            if(num > 1)
            {
                oRenamehide.style.display = "block";
                oRename.style.opacity = 0.2;
            }
            else
            {
                oRenamehide.style.display = "none";
                oRename.style.opacity = 1;
            }
            //是否显示列表选项，当有勾选的文件时显示
            isShow(num);
            oSelectedFile.innerHTML = "已选中"+num+"个文件/文件夹";
            addArea.removeChild(dragDiv);
            document.onmousemove = null;
            document.onmouseup = null;
            return;
        }


    }

    function createArea()
    {
        var ele = document.createElement("div");
        // ele.style.display = "none";
        ele.className = "dragArea"
       //注意。。
        addArea.appendChild(ele);
        return ele;
    }
  






    //--------------------------------------
    var num = 0;
    function newFile(data)
    {
        var ele = document.createElement("div");
        ele.className = "grid-view-item";
        ele.isSelected = false;
        ele.Id = data.id;

        var elec1 = document.createElement("div");
        elec1.className = "fileicon";
        var elec1span = document.createElement("span");
        elec1.appendChild(elec1span);
        ele.onmouseover = function()
        {
            if(!ele.isSelected)
            {
                elec1span.className = "fileiconmouse";
                elec1.style.border = "2px solid #2e80dc";
            }
        }
        ele.onmouseout = function()
        {
            if (!ele.isSelected)
            {
                elec1span.className = "";
                elec1.style.border = "";
            }
        }
        elec1span.onclick = function(ev)
        {
            selected(ev,ele,elec1span);
        }

        elec1span.onmousedown = function(ev)
        {
            var e = ev || event;
            e.stopPropagation();
            e.preventDefault();
        }            
        
        
        //点击进入子集文件
        ele.onclick = function(ev)
        {   
            var e = ev || event;
            e.stopPropagation();
            //获取当前文件id为父id
            currentParentId = this.Id;
            //获取父id的子集页面并渲染
            showList(getChildById(currentParentId));
            //清空已选中文件
            num = 0;
            oSelectedFile.innerHTML = "已选中"+num+"个文件/文件夹";
        }

        var elec2 = document.createElement("div");
        elec2.className = "filename";


        var elec2a = document.createElement("a");
        elec2a.setAttribute("href","javascript:void(0)");
        elec2a.innerHTML = data.name;
    
        var elec2text = document.createElement("input");
        elec2text.setAttribute("type","text");
        elec2text.value = data.name;
        elec2text.className = "rename";
        elec2text.style.display = "none";

        var elec2span1= document.createElement("span");
        elec2span1.className = "span1active";
        elec2span1.style.display = "none"
        var elec2span2 = document.createElement("span");
        elec2span2.className = "span2active";
        elec2span2.style.display = "none"

        elec2.appendChild(elec2a);
        elec2.appendChild(elec2text);
        elec2.appendChild(elec2span1);
        elec2.appendChild(elec2span2);

        ele.appendChild(elec1);
        ele.appendChild(elec2);
        addArea.appendChild(ele);
        elec1span.style.display = "block";
    }


    function selected (e,ele,elec1span)
    {
        //获取当前页面显示的文件个数，以此来判断是否应该勾上全选
        var len = getChildById(currentParentId).length;
        //阻止冒泡
        
        e.stopPropagation();
        e.preventDefault();
        //选中改变样式num++,取消则num--
        if (!ele.isSelected) 
            {
                elec1span.className = "fileicon-active";
                ele.isSelected = true;
                num++;
                //给选中的文件夹添加拖拽事件
                var moveEle;
                //添加拖拽
              
                ele.onmousedown = function(ev)
                {
                    var e = e || event;

                    // if (e.target != ele) {
                    //     return;
                    // };
                    var movefiles = document.querySelectorAll("#show .grid-view-item");
                    isDrag(ev,moveEle,movefiles);
                }
                                 
            }
            else
            {
                ele.onmousedown = null;
                elec1span.className = "fileiconmouse";
                num--;
                ele.isSelected = false;
            }
        //判断是否全选，以及样式的改变
        if (num == len) 
            {
                iconActive(oCheckicon,-41,-12);
                onOff = true;
            }
            else
            {
                iconActive(oCheckicon,-9,-12);
                onOff = false;
            }
            //判断num数是否可以重命名
            if(num > 1)
            {
                oRenamehide.style.display = "block";
                oRename.style.opacity = 0.2;
            }
            else
            {
                oRenamehide.style.display = "none";
                oRename.style.opacity = 1;
            }
            //是否显示列表选项，当有勾选的文件时显示
            isShow(num);
            oSelectedFile.innerHTML = "已选中"+num+"个文件/文件夹";
            
    }
    
    //为选中文件添加拖拽事件
    function isDrag(ev,moveEle,movefiles)
    {
        console.log("drag");
        var e = ev || event;
        e.preventDefault();
        e.stopPropagation();
        //点击生成元素
        moveEle = createElement(e.pageX,e.pageY,num);
        //取得选中文件相对应得数据并存在数组
        var elearr = [];
        for (var i = 0; i < movefiles.length; i++) 
        {
            if (movefiles[i].isSelected)
            {
                elearr.push(getDataById(movefiles[i]));
            } 
        }
        //为生成的移动元素添加onmousemove事件
        document.onmousemove = function(ev)
        {
            console.log("isDragmove");
            setTimeout(function(){
                moveEle.style.display = "block";
                
            },200);
            
            var e = ev || event;
            var target = e.target || e.srcElement;

            //拖拽鼠标在正确的位置
            var mouseX = e.pageX;
            var mouseY = e.pageY;

            moveEle.style.left = mouseX + "px";
            moveEle.style.top = mouseY + "px";
        }

        //为移动元素添加mouseup事件
        document.onmouseup = function(ev)
        {
            console.log("isDragup");
            var e = ev || event;
            var target = e.target || e.srcElement;
            
            for (var i = 0; i < movefiles.length; i++) 
            {
                var eleDir = movefiles[i].getBoundingClientRect();
                if(e.clientX > eleDir.left && e.clientX < eleDir.right && e.clientY < eleDir.bottom && e.clientY > eleDir.top)
                {   var movefile = movefiles[i];

                    for (var i = 0; i < elearr.length; i++) 
                    {
                        if(elearr[i].id == movefile.Id)
                        {
                            addArea.removeChild(moveEle);
                            document.onmousemove = null;
                            document.onmouseup = null;
                            return;
                        }
                    }
                    elearr.forEach(function(value,index){
               
                            value.parentId = movefile.Id;
                    });
                    addArea.removeChild(moveEle);
                    showList(getChildById(currentParentId));
                    document.onmousemove = null;
                    document.onmouseup = null;
                    return;
                }
            }
            addArea.removeChild(moveEle);
            document.onmousemove = null;
            document.onmouseup = null;
            return;
        }
    }       


    //创建拖拽生成的小文件图标
    function createElement(offsetLeft,offsetTop,index)
    {
        var ele = document.createElement("div");
        ele.style.display = "none";
        ele.className = "moveitem"//注意。。
        ele.style.left = offsetLeft + "px";
        ele.style.top = offsetTop + "px";
        ele.innerHTML = index;
        addArea.appendChild(ele);
        return ele;
    }


   

    //判断是否显示选择列表
    function isShow(num)
    {
        if (num >= 1) 
        {
            oListheader.style.display = "inline-block";
            oSelectall.style.background = "#F2F6FF";
        }
        else
        {
            oListheader.style.display = "none";
            oSelectall.style.background = "#f7f7f7";
        }
    }

    //通过对应的当前页面数据的数组找到对应的DOM
    function getDomByData(id)
    {
        var view = [];
        var data = getChildById(id);
    }


    //渲染页面
    function showList(data)
    {
        
        addArea.innerHTML = "";

        data.forEach(function(value,index){
            newFile(value);
        });
        var data = getAll(currentParentId).reverse();
        
        if (data) 
            {
                showcrumbs(data);
            };


        //每次刷新页面把选中的都清0,每次渲染都重新创建移动到的DOM树
        clearisSelected();

        

        //判断可否移动到
        if (currentParentId==0 && getChildById(currentParentId).length <= 1) 
            {
                oMovehide.style.display = "block";
                oMoveto.style.opacity = 0.2;
            }
            else
            {
                oMovehide.style.display = "none";
                oMoveto.style.opacity = 1;
            }

    }

    function clearisSelected()
    {
        var ele = document.querySelectorAll("#show .grid-view-item");
        for (var i = 0; i < ele.length; i++) {
            ele[i].isSelected = false;
            ele[i].children[0].style.border  = "";
            ele[i].children[0].children[0].className = "";
            ele[i].onmousedown = null;
        };
        num = 0;
        onOff = false;
        iconActive(oCheckicon,-9,-12);
        isShow(num);

        //每次渲染都重新创建移动到的DOM树
        oshowDom.innerHTML = "";
        createDOM(0,1);
    }

    //创建DOM树
    function createDOM(id,level)
    {
        
        var children = getChildById(id);
        var space = 0;
        for (var i = 0; i < level; i++) 
        {
            space += 15;    
        }
        if (id == 0) 
            {
                var ele = createSmallFile(findId(id),0,space);
                ele.style.display = "block";
                oshowDom.appendChild(ele);

            }
        if (children.length) 
            {
                for (var i = 0; i < children.length; i++) {
                    // oshowDom.innerHTML += space+"<a href='javascript:void(0);' level = '"+level+"'>"+children[i].name+"</a></br>";
                    var ele = createSmallFile(children[i],level,space);
                    oshowDom.appendChild(ele);

                    createDOM(children[i].id,level+1);
                };
            };
    }
    
    //渲染DOM树
    function showDom(id)
    {
        if(!id && id !== 0)
        {
            return;
        }
        var childs = getChildById(id);
        var showDomDiv = oshowDom.getElementsByTagName("div");
                      
        for(var j = 0; j<childs.length;j++)
        for (var i = 0; i < showDomDiv.length; i++)           
        {
            if(childs[j].id == showDomDiv[i].Id)
            {
                if (!showDomDiv[i].onOff)
                {
                    showDomDiv[i].style.display = "block";
                    showDomDiv[i].onOff = true;                   
                }
                else
                {
                    var allchilds = getALLChildById(showDomDiv[i].Id);
                    for (var x = 0; x < allchilds.length; x++)
                    { 
                        for (var y = 0; y < showDomDiv.length; y++) 
                        {
                            if (showDomDiv[y].Id == allchilds[x].id)
                            {
                                showDomDiv[y].style.display = "none";
                                showDomDiv[y].onOff = false;
                                showDomDiv[y].isOpen = false;
                                if (getChildById(showDomDiv[y].Id).length) 
                                    {
                                        showDomDiv[y].children[0].className = "firstactive";
                                        showDomDiv[y].children[1].className = "domfilestyle";
                                    }           
                            }
                        }
                    }
                }
            }
        }
    }


    //创建DOM结构的小文件
    function createSmallFile(children,level,space)
    {
       
        var ele = document.createElement("div");
        ele.style.paddingLeft = space;
        ele.Id = children.id;
        ele.level = level;
        ele.style.marginBottom = 10+"px";
        ele.style.display = "none";
        //控制元素显示和隐藏
        ele.onOff = false;
        //控制元素的样式
        ele.isOpen = false;
        //是否被选中
        ele.isSelected = false;
        var elespan1 = document.createElement("span");
        var elespan2 = document.createElement("span");
        elespan2.className = "domfilestyle";
        var elea = document.createElement("a");
        elea.setAttribute("href","javascript:void(0)");
        elea.innerHTML = children.name;
        elea.className = "aactive";

        
        var childs = getChildById(ele.Id);
        //有子元素显示加号
        if (childs.length) 
            {
                elespan1.className = "firstactive";
            }
        elea.onclick = function()
        {
            var oDiv = document.querySelectorAll("#dom div");
            for (var i = 0; i < oDiv.length; i++) 
            {
                oDiv[i].isSelected = false;
                oDiv[i].className = "";

            }
            elea.parentNode.className = "domdivactive";
            elea.parentNode.isSelected = true;
            //点击对设置样式取反
            ele.isOpen = !ele.isOpen;
            if (childs.length) 
                {
                    showDom(ele.Id);
                    if (ele.isOpen) 
                        {
                            elespan1.className = "fileopen";
                            elespan2.className = "domfileopenstyle";
                        }
                        else
                        {
                            elespan1.className = "firstactive";
                            elespan2.className = "domfilestyle";
                        }
                };
        }

        ele.appendChild(elespan1);
        ele.appendChild(elespan2);
        ele.appendChild(elea);
        return ele;
    }

    //面包屑导航
    function showcrumbs(data)
    {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            if (!data[i].id) 
                {
                    continue;
                }
            html += "><a href='javascript:void(0);' folderId = '"+data[i].id+"'>"+data[i].name+"</a>";
        };
        
 
        var nowPage = findId(currentParentId);

        if (nowPage) 
            {

                html += "><a href='javascript:void(0);' folderId = '"+nowPage.id+"'>"+nowPage.name+"</a>";
            };
        ocrumbs.innerHTML = html;

        var oA = ocrumbs.getElementsByTagName("a");
        for (var i = 0; i < oA.length; i++) 
        {
            oA[i].onclick =function()
            {
                currentParentId = this.getAttribute("folderId");
                showList(getChildById(currentParentId));
            } 
        };


    }

    //通过currentParentId查找所有父级

// 1.return 0
//     2.return 1 = 1 + 0
//         3.return 4 = 4 + 1 + 0
//             4.return 9 + 4

    // var num = 0;
 // function findAllParent(id)
 //    {   
 //        var parents = [];
 //        var parent = findParent(id);
 //        if (parent) 
 //            {
 //                parents.push(parent);
 //                if (parent.parentId != 0) 
 //                    {               
 //                        var p = findAllParent(parent.id);
 //                        parents = parents.concat(p);
 //                    }
 //            }           
 //            return parents;
 //    }


 }