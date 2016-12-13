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
            }
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