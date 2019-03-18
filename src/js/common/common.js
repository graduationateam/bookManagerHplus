 var $baseUrl="http://localhost:8080/";
 
 function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
/* 
赤色：class="layui-bg-red"
橙色：class="layui-bg-orange"
墨绿：class="layui-bg-green"
藏青：class="layui-bg-cyan"
蓝色：class="layui-bg-blue"
雅黑：class="layui-bg-black"
银灰：class="layui-bg-gray"
 */

function showTips(msg){
 layer.alert(msg, {
	 skin: 'layui-bg-green' //样式类名 layui-bg-red
	 ,closeBtn: 0
 });
}
function showTips(msg,color){
	if(isEmpty(color)){
		color = 'layui-bg-green';
	}
  layer.alert(msg, {
	  skin: color //样式类名 layui-bg-red
	  ,closeBtn: 0
  });
}
 function $alertSucc(msg){
	 layer.alert(msg, {
	   skin: 'layui-layer-molv' //样式类名 layui-bg-red
	   ,closeBtn: 0
	 });
 }
  function $alertFail(msg){
 	 layer.alert(msg, {
 	   skin: 'layui-bg-red' //样式类名 layui-bg-red
 	   ,closeBtn: 0
 	 });
 }
 
