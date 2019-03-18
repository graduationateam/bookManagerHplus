/**
 * 初始化字典列表
 */
function TableInit (){
	$('#dictList').bootstrapTable({
		url: $baseUrl+"Manager/dictionaryModule/toList",                      //请求后台的URL（*）
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
		detailView: true,                  //是否显示父子表
		contentType: 'application/x-www-form-urlencoded',
		//得到查询的参数
		queryParams : function (params) {
			//console.log(params);
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var temp = {   
				limit: params.limit,                         //页面大小
				page: (params.offset / params.limit) + 1,   //页码
			  
			};
			console.log(temp);
			return temp;
		},
		//queryParamsType:'',
		columns: [{
		 		checkbox: true,  
		 		visible: true                  //是否显示复选框  
		 	}, {
		 		field: 'dictCode',
		 		title: '字典代码',
		 		sortable: true
		 	}, {
		 		field: 'dictName',
		 		title: '字典名称',
		 		sortable: true
		 	}, {
		 		field:'id',
		 		title: '操作',
		 		//width: 120,
		 		align: 'center',
		 		valign: 'middle',
		 		formatter: function(value, row, index){
					return [
						'<a class="btn btn-primary" href="#" onclick="openAddDictDataModel(\'' +value + '\')" >添加字典值</a>',
						'<a class="btn btn-primary" href="#" onclick="editDict(\'' +value + '\')">编辑</a>',
						'<a class="btn btn-primary" href="#" onclick="deleteDict(\'' +value + '\')">删除</a>'
					].join('');
				}
		 	}],
		onLoadSuccess: function () {
		},
		onLoadError: function () {
			showTips("数据加载失败！");
		},
		onDblClickRow: function (row, $element) {
			var id = row.id;
			console.log(id);
			//EditViewById(id, 'view');
		}, 
		onExpandRow: function (index, row, $detail) {
	       InitSubTable(index, row, $detail);
	   },
		responseHandler:function(res){
		//在ajax获取到数据，渲染表格之前，修改数据源
		//console.log(res);
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
	 
}

/**
 * 初始化子table，用于查看字典值
 */
function InitSubTable(index, row, $detail) {
	var parentid = row.id;
	var cur_table = $detail.html('<table></table>').find('table');
	var queryUrl = $baseUrl+'Manager/dictionaryModule/toDetail/'+row.id;
	$(cur_table).bootstrapTable({
		url: queryUrl,
		method: 'post',
		//async: false,
		//queryParams: { strParentID: parentid },
		//ajaxOptions: { strParentID: parentid },
		clickToSelect: true,
		//detailView: true,//父子表
		uniqueId: "id",
		sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
		detailView: false,//父子表
		pageSize: 10,
		pageList: [10, 25],
		columns: [{
			checkbox: true
		}, {
			field: 'id',
			title: 'ID'
		}, {
			field: 'dictId',
			title: '父级代码'
		}, {
			field: 'dictValue',
			title: '值'
		}, {
			field: 'id',
			title: '操作',
			formatter:function(value, row, index){
				return [
					'<a class="btn btn-primary" href="#" onclick="editDict(\'' +value + '\')">编辑</a>',
					'<a class="btn btn-primary" href="#" onclick="deleteDictData(\'' +value + '\')">删除</a>'
				].join('');
			}
		}],
		responseHandler:function(res){
		//在ajax获取到数据，渲染表格之前，修改数据源
			var t_data=[];
			if(res.code==1){
				//console.log(res);
				t_data = {total:res.data.total,rows:res.data.list};
			}
			else{
				t_data = {total:0,rows:[]};
				console.log("res");
			}
			console.log(t_data);
			return t_data;
		}
		//无线循环取子表，直到子表里面没有记录
		/* onExpandRow: function (index, row, $Subdetail) {
			oInit.InitSubTable(index, row, $Subdetail);
		} */
		
	});
};
 
 
 /**
  * 添加字典
  */
 function addDict(){
	var dictionary = $('#addDictForm').serialize();
	console.log(dictionary);
	var url = $baseUrl+"Manager/dictionaryModule/addDictionary";
	console.log(url);
	$.ajax(url,{
		data:$('#addDictForm').serialize(),
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		success:function(result){
			$('#addDictModal').modal('hide');//关闭 添加model
			if(result.code == 1){
				$alertSucc("添加成功！");
				$('#dictList').bootstrapTable('refresh');
			}else{
				$('#addDictDataModal').modal('hide');
				$alertFail("添加失败！");
			}
			
		},
		error:function(xhr,type,errorThrown){
			$('#addDictDataModal').modal('hide');
			$alertFail("添加失败！");
		}
	});
 }
 
/**
 * 打开添加字典值的model
 */
function openAddDictDataModel(id){
	$('#addDictDataModal').modal('show');
	$("input[name='dictId']").val(id);
	console.log(id);
}

/**
 * 添加字典值
 */
function addDictData(){
	var dictionary = $('#addDictDataForm').serialize();
	console.log(dictionary);
	var url = $baseUrl+"Manager/dictionaryModule/addDictionaryData";
	$.ajax(url,{
		data:$('#addDictDataForm').serialize(),
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		success:function(result){
			$('#addDictDataModal').modal('hide');//关闭 添加model
			if(result.code == 1){
				$alertSucc("添加成功！");
				$('#dictList').bootstrapTable('refresh')
			}else{
				$('#addDictModal').modal('hide');
				$alertFail("添加失败！");
			}
			
		},
		error:function(xhr,type,errorThrown){
			$('#addDictModal').modal('hide');
			$alertFail("添加失败！");
		}
	});
}

/**
 * 删除字典
 */
function deleteDict(id){
	if(confirm("确定删除吗？")){
		console.log(id);
		// Manager/dictionaryModule/deleteDictionaryData/{dictId}
		var url = $baseUrl+"Manager/dictionaryModule/delete/"+id;
		
		$DelAjax(url,id);
	}
}
/**
 * 删除字典值
 */
function deleteDictData(id){
	if(confirm("确定删除吗？")){
		console.log(id);
		// Manager/dictionaryModule/deleteDictionaryData/{dictId}
		var url = $baseUrl+"Manager/dictionaryModule/deleteDictionaryData/"+id;
		
		$DelAjax(url,id);
	}
}


function $DelAjax(url,id){
	$.ajax(url,{
		data:{id:id},
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		success:function(result){
			if(result.code == 1){
				$alertSucc("删除成功！");
			}else{
				$alertFail("删除失败！");
			}
		},
		error:function(xhr,type,errorThrown){
			$alertFail("删除失败！");
		}
	});
	$('#dictList').bootstrapTable('refresh');
}