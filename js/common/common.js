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
 
 function ajaxDeleteById(url,id,callback){
	 layer.confirm('是否删除？', {
	   btn: ['是','否'] //按钮
	 }, function(){
	   
		  $.ajax(url,{
			data:{id:id},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			async:false,
			success:function(result){
				callback(result);
			},
			error:function(xhr,type,errorThrown){
				sysUtils.errMessage("网络出错！");
			}
	 });
		 
	 }, function(){
	   
	 });
	
 }
 

