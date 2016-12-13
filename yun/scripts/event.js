function clone (arr,ele,num) 
{
    num++;

    //获取一层子集
    var children = getCloneChildById(arr,ele.id);
    ele.id = getMaxId()+num;

    for (var i = 0; i < children.length; i++) 
    {
        //改变一层子集的父id指向
        children[i].parentId = ele.id;
        //如果可以获取子元素，继续循环
        if (getCloneChildById(arr,children[i].id).length) 
        {   
            clone(arr,children[i],num);
        }
        else
        {
            num++;
            children[i].id = getMaxId()+num;
        }
    }
}