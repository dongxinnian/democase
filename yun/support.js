

function getAll(id,parents)
 {
    if(!parents)
    {
        var parents = [];
    }
    var parent = findParent(id);
    if (parent) 
        {
            parents.push(parent);
            if (parent.parentId != 0) 
                {
                    getAll(parent.id,parents);
                }
        }
        return parents;
 }

    //通过id查找所有子集与本身

    function getALLChildById(id,children)
    {
        if (!children) 
            {
                var children = [];
            }
       for (var i = 0; i < dataList.length; i++) 
       {
              if(dataList[i].id == id)
            {
               children.push(dataList[i]);
               var childs = getChildById(dataList[i].id);
               if (childs) 
                {
                    childs.forEach(function(value,index){
                        getALLChildById(value.id,children);
                    })
                };
            }
        }
        return children;
    }

    function getALLCloneChildById(id,children)
    {
        if (!children) 
            {
                var children = [];
            }

       for (var i = 0; i < dataList.length; i++) 
       {
            var j = 0; 
              if(dataList[i].id == id)
            {
                for(var key in dataList[i])
                {
                    children[j] = children[j] || {};
                    children[j][key] = dataList[i][key];
                }
                j++;
               var childs = getChildById(dataList[i].id);
               if (childs) 
                {
                    childs.forEach(function(value,index){
                        getALLChildById(value.id,children);
                    })
                };
            }
        }
        return children;
    }


    //通过currentParentId查找父级
    function findParent(id)
    {
        var data = findId(id);
        if(data)
        {
            return findId(data.parentId);
        }

    }
    function findId(id)
    {
        for (var i = 0; i < dataList.length; i++) 
        {
          
            if(dataList[i].id == id)
            {     
                
                return dataList[i];              
            } 
        }
         
    }

        /*
    * 根据指定的id查找父级
    * */
    // function getParent(id) {
    //     var data = getById(id);
    //     if (data) {
    //         return getById(data.parentId);
    //     }
    // }

    
    // // * 根据指定id获取元素
    // // * 
    // function getById(id) {
    //     for (var i=0; i<dataList.length; i++) {
    //         if (dataList[i].id == id ) {
    //             return dataList[i];
    //         }
    //     }
    // }

 



    //鼠标上移设置雪碧图的位置
    function iconActive(obj,x,y)
    {
        obj.style.backgroundPosition = x+"px"+" "+y+"px"
        
    }
    //点击icon改变透明度
    function iconmd()
    {
        this.style.opacity = 0.7;
    }

    function iconup()
    {
        this.style.opacity = 1;
    }

    //根据父级id查找子集数据
    function getChildById(parentId)
    {
        var data = [];
        dataList.forEach(function(value,index){
            if(value.parentId == parentId)
            {
                data.push(value);
            }
        });
        return data;
    }
            /*
     * 获取最大的id值
     * */
    function getMaxId() {
        var maxId = dataList[0].id;
        dataList.forEach(function(v, k) {
            if ( v.id > maxId ) {
                maxId = v.id;
            }
        })
        //考虑到删除的情况，不能使用长度
      // var maxId = dataList.length+1;
      // console.log(maxId);
        return maxId;
    }


    //从选中的页面元素找出数据对应的元素并返回
    function getDataById(ele)
    {
        for (var i = 0; i < dataList.length; i++) {
            if(dataList[i].id == ele.Id)
            {
                return dataList[i];
            }
        }
    }



     function getCloneChildById(objList,parentId)
    {
        console.log(objList);
        var data = [];
        var j = 0;
        objList.forEach(function(value,index){
            if(value.parentId == parentId)
            {
                data[j] = data[j] || {};
                data[j][key] = value[key];       
            }
            j++;
        });
        console.log(data);
        return data;
    }
