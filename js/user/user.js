
function operateFormatter(value, row, index) {//赋予的参数
		//JSON.stringify(row);
		if(row.isDelete==0){
			 return "<div class='float-e-margins'>"+
						"<a class='btn btn-xs btn-danger' href='#' onclick='changeState("+JSON.stringify(row)+ ")'>冻结</a>&nbsp;"+
					"</div>";
		}
		else{
			return "<div class='float-e-margins'>"+
						"<a class='btn btn-xs btn-success' href='#' onclick='changeState("+JSON.stringify(row)+ ")'>解冻</a>&nbsp;"+
					"</div>";
		}
}
	  
//初始化bootstrap-table的内容
function InitMainTable () {
	$('#userListTable').bootstrapTable('destroy');
	var queryUrl = sysUtils.baseUrl+'Manager/userModule/toList';
	 $('#userListTable').bootstrapTable({
		url: queryUrl,                      //请求后台的URL（*）
		dataType:"json",
		method: 'post',                      //请求方式（*）
		//toolbar: '#toolbar',              //工具按钮用哪个容器
		striped: true,                      //是否显示行间隔色
		cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true,                   //是否显示分页（*）
		sortable: true,                     //是否启用排序
		sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
		pageSize: 10,                     //每页的记录行数（*）
		pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
		search: false,                      //是否显示表格搜索
		strictSearch: true,
		showColumns: true,                  //是否显示所有的列（选择显示的列）
		showRefresh: true,                  //是否显示刷新按钮
		minimumCountColumns: 2,             //最少允许的列数
		clickToSelect: true,                //是否启用点击选中行
		//height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: "id",                     //每一行的唯一标识，一般为主键列
		showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
		cardView: false,                    //是否显示详细视图
		detailView: false,                  //是否显示父子表
		contentType: 'application/x-www-form-urlencoded',
		//得到查询的参数
		queryParams : function (params) {
			console.log(params);
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var temp = {   
				limit: params.limit,                         //页面大小
				page: (params.offset / params.limit) + 1,   //页码
			  
			};
			console.log(temp);
			return temp;
		},
		//queryParamsType:'',
		columns: [ {
			field: 'userName',
			title: '用户名',
		}, {
			field: 'phone',
			title: '手机',
		}, {
			field: 'email',
			title: '邮箱',
		},
		{
			field: 'gender',
			title: '性别',
		}, {
			field:'id',
			title: '操作',
			width: 120,
			align: 'center',
			valign: 'middle',
			formatter: operateFormatter
		}],
		responseHandler:function(res){
		//在ajax获取到数据，渲染表格之前，修改数据源
		console.log(res);
		var t_data=[];
		if(res.code==1){
			t_data = {total:res.data.total,rows:res.data.list};
		}
		else{
			t_data = {total:0,rows:[]};
		}
		//console.log(t_data);
		return t_data;
		} 
	});
};

function changeState(user) {
	let url = sysUtils.baseUrl+"Manager/userModule/update/"+user.id;
	let oldState = user.isDelete;
	console.log(oldState);
	if(oldState==0){
		user.isDelete=1;
	}else if(oldState==1){
		user.isDelete=0;
	}
	$.ajax(url,{
		data:user,
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		success:function(result){
			
			if(result.code == 1){
				sysUtils.message("修改成功！");
				InitMainTable ();
			}else{
				sysUtils.errMessage("修改失败！");
			}
		},
		error:function(xhr,type,errorThrown){
			sysUtils.errMessage("网络出错！");
		}
	}); 
}