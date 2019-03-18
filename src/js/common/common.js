 var $baseUrl="http://localhost:8080/";
 
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
 
 