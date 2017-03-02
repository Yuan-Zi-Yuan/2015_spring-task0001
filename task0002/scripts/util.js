/**
 * Created by Administrator on 2016/12/14.
 */
//判断是否为数组
function isArray(arr){
    return (arr instanceof Array);
}

//判断是否为函数
function isFunction(fn){
    return (typeof(fn));
}

//深度克隆
function cloneObject(src){
    var result,
        //判断src的类型
        oClass=isClass(src);
    if(oClass==="Object"){
        result={};
    }
    else if(oClass==="Array"){
        result= [];
    }
    else{
        return src;
    }
    for(var key in src){
        var copy=src[key];
        if(isClass(copy)==="Object"){
            //递归调用
            result[key]=arguments.callee(copy);
        }
        else if(isClass(copy)==="Array"){
            result[key]=arguments.callee(copy);
        }
        else{
            result[key]=copy;
        }
    }
    return result;
}
//返回cla的类 ：object  或array 或 基本类型
function isClass(cla){
    if(cla===null){
        return null;
    }
    else if(cla===undefined){
        return undefined;
    }
    else{
        return Object.prototype.toString.call(cla).slice(8,-1);
    }
}

//数组去重
function uniqArray(arr){
    //去重数组变量temp
    var temp=[];
    //每个数组值都与之前的数组值作比较，是否重复
    for(var i=0,l=arr.length;i<l;i++){
        var j=0;
        while(arr[i]!=arr[j]){
            if(j<i){
                j++;
            }
        }
        //不重复，将值push进 去重数组
        if(j==i){
            temp.push(arr[j]);
        }
    }
    return temp;
}

//去除字符串头尾的空格、tab、全角半角空格
function trim(str){
    var regex=/^\s*/;
    var regex2=/\s*$/;
    return str.replace(regex,'').replace(regex2,'');
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i= 0,l=arr.length;i<l;i++){
        fn(i,arr[i]);
    }
}
function fn(idx,item){
    item=idx+1;
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var j=0;
    for(var i in obj){
        j++;
    }
    return j;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var re=/\w+@\w+.com/;
    return re.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var re=/\d{11}/;
    return (re.test(phone));
}

//为element增加一个样式名为newClassName的新样式
function addClass(element,newClassName){
    var oldClassName=element.className;
    element.className=oldClassName+' '+newClassName;
}

//删除element一个样式名为oldClassName的旧样式
function removeClass(element,oldClassName){
    element.className=element.className.replace(oldClassName,'');
    return element;
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(siblingNode,element){
    return (siblingNode.parentNode===element.parentNode);
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var top=element.offsetTop,
        left=element.offsetLeft;
    while(element.offsetParent){
        element=element.offsetParent;
        top+=element.offsetTop;
        left+=element.offsetLeft;
    }
    return {'x':left,'y':top}
}

// 实现一个简单的Query
function $(selector) {
    var char=selector.charAt(0),
        element,
        idx;
    switch (char){
        //通过id获取dom元素
        case '#':
            idx=selector.indexOf('.');
            if(idx==(-1)){
                var idName=selector.slice(1);
                element=document.getElementById(idName);
                return element;
            }
            //通过id和classname获得dom元素
            else{
                var className=selector.slice(idx+1) ;
                idName=selector.slice(1,idx-1);//id和classname之间要用一个宫格隔开
                element=document.getElementById(idName);
                element=element.getElementsByTagName('*');
                for(var i= 0,l=element.length;i<l;i++){
                    className=element[i].className.split(' ');
                    for(var m= 0,n=className.length;m<n;m++){
                        if(className[m]==className){
                            return element[i];
                        }
                    }
                }
            }
            break;
        //通过classname获得dom元素
        case '.':
            selector=selector.slice(1);
            element=document.getElementsByTagName('*');
            for(var i= 0,l=element.length;i<l;i++){
                if(element[i].className) {
                    className = element[i].className.split(' ');
                    for (var m = 0, n = className.length; m < n; m++) {
                        if (className[m] == className) {
                            return element[i];
                        }
                    }
                }
            }
            break;
        //通过属性名和相对应的属性值获得dom元素
        case '[':
            var attName,
                value;
            idx=selector.indexOf('=');
            element=document.getElementsByTagName('*');
            if(idx==(-1)){
                attName=selector.slice(1,-1);
            }
            else{
                attName=selector.slice(1,idx);
                value=selector.slice(idx+1,-1);
            }
            for(var i= 0,l=element.length;i<l;i++){
                if(element[i].hasAttribute(attName)){
                    if(idx!=(-1)){
                        if(element[i].getAttribute(attName)==value){
                            return element[i];
                        }
                        return false;
                    }
                    return element[i];
                }
            }
            break;
        //默认通过标签名获得dom元素
        default :
            return document.getElementsByTagName(selector);
    }
}

// 使用事件冒泡Bubble给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element,event,listener){
    if(addEventListener){
        element.addEventListener(event,listener,false);
    }
    else if(attachEvent){
        element.attachEvent(event,listener);
    }
    else{
        element['on'+event]=listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(removeEventListener){
        element.removeEventListener(event,listener,false);
    }
    else if(detachEvent){
        element.detachEvent(event,listener);
    }
    else{
        element['on'+event]=null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,'keyup', function (e) {
        e=e||window.event;
        if(e.keyCode==13){
            listener;
        }
    });
}

//用事件冒泡给一个element绑定一个针对eventName事件的响应，响应函数为listener
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element,eventName, function (e) {
        e=e||window.event;
        var target= e.srcElement?e.srcElement: e.target;
        orginX= target.style.left;
        orginY= target.style.top;
        if(target.nodeName===tag.toUpperCase()){
            listener(target,e,orginX,orginY);
        }
    });
}


// 使用事件捕获Capture给一个element绑定一个针对event事件的响应，响应函数为listener  为focus而生
function addEventCaptureFocus(element,event,listener){
    if(addEventListener){
        element.addEventListener(event,listener,true);
    }
    else{
        element.addEventListener(event+'in',listener,false);
    }
}

// 使用事件捕获Capture给一个element绑定一个针对event事件的响应，响应函数为listener  为blur而生
function addEventCaptureBlur(element,event,listener){
    if(addEventListener){
        element.addEventListener(event,listener,true);
    }
    else{
        element.addEventListener(event+'out',listener,false);
    }
}

//focus、blur、load、unload不支持事件冒泡
//使用事件捕获Capture给一个element绑定一个针对eventName事件的响应，响应函数为listener
function delegateEvent2(element, tag, eventName, listener) {
    addEventCaptureFocus(element,eventName,function (e) {
        e=e||window.event;
        var target= e.srcElement?e.srcElement: e.target;
        if(target.nodeName===tag.toUpperCase()){
            console.log(target.value);
            listener();
        }
    });
}

//使用事件捕获Capture给一个element绑定一个针对eventName事件的响应，响应函数为listener
function delegateEvent3(element, tag, eventName, listener) {
    addEventCaptureBlur(element,eventName,function (e) {
        e=e||window.event;
        var target= e.srcElement?e.srcElement: e.target;
        if(target.nodeName===tag.toUpperCase()){
            listener();
        }
    });
}

//将addEvent,removeEvent,addClickEvent,addEnterEvent变成$对象的一些方法
$.on=addEvent;
$.un=removeEvent;
$.click=addClickEvent;
$.enter=addEnterEvent;
$.delegat=delegateEvent;

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    return document.documentMode||false;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText=encodeURIComponent(cookieName)+'='+encodeURIComponent(cookieValue);
    var exDate=new Date();
    exDate.setDate(exDate.getDate()+expiredays);
        cookieText+=';expires='+exDate.toUTCString();
    document.cookie=cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    cookieName=encodeURIComponent(cookieName);
    var start=document.cookie.indexOf(cookieName),
        cookieValue=null;
    if(start!=-1){
        var end=document.cookie.indexOf(';');
        if(end==-1){
               end=document.cookie.length;
        }
        cookieValue=encodeURIComponent(document.cookie.substring(start+1+cookieName.length,end));
    }
    return cookieValue;
}

//封装一个Ajax方法
function ajax(url, options) {
    // your implement
var xhr=createXHR();
    var type,
        data,
        successFn,
        failFn;
    if(typeof (options)=='object'){
        type=options.type.toUpperCase();
        data=options.data||null;
        successFn=options.successFn||'undefined';
        failFn=options.onfail||'undefined';
    }
    if(typeof (data)=='object'){
        var str='';
        for(var key in data){
            str+=key+'='+data[key]+'&';
        }
        data=str.replace(/&$/,'');
        str=null;
    }
    xhr.onreadystatechange= function () {
        if(xhr.readyState==4){
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                successFn(xhr.responseText);
            }
            else{
                if(failFn){
                    failFn(xhr.status);
                }
                else{
                    console.error('Unsuccessful:\t'+xhr.status);
                }
            }
        }
    };
    switch (type){
        case 'GET':
            xhr.open('GET',url+'?'+data,true);
            xhr.send();
            break;
        case 'POST':
            xhr.open('POST',url,true);
            break;
    }
}
function createXHR(){
    var xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }
    else{
        xhr=new  ActiveXObject('Microsoft.XMLHTTP');
    }
    return xhr;
}
//ajax('test.php',{type:'GET',successFn:function(){console.log("i am success");}});
