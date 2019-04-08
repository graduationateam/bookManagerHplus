$('#addDictModal').on('hide.bs.modal', function () {
	//当关闭modal时
    document.getElementById("addDictForm").reset();//表单重置

    $("#dictId").val("");
});
$('#dictItemModal').on('hide.bs.modal', function () {
	//当关闭modal时
    document.getElementById("dictItemForm").reset();//表单重置

    $("#dictItemId").val("");
    $("#dictItem-dictId").val("");
});

/**
 * 初始化字典列表
 */
function TableInit (){
	$('#dictList').bootstrapTable('destroy');
	$('#dictList').bootstrapTable({
		url: sysUtils.baseUrl+"dictionary/toList",                      //请求后台的URL（*）
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
			    keyword: params.searchText,
			};
			//console.log(temp);
			return temp;
		},
		//queryParamsType:'',
		columns: [{field: 'dictCode',title: '字典代码',},
				  {field: 'dictName',title: '字典名称'}, 
				  {field:'id', title: '操作',
		 		  //width: 120,
					align: 'center',
					valign: 'middle',
					formatter: function(value, row, index){
						//JSON.stringify(row);
						return "<div class='float-e-margins'>"+
									"<a class='btn btn-xs btn-primary' href='#' onclick='beforeAddDictItem("+value+ ")'>添加字典值</a>&nbsp;"+
									"<a class='btn btn-xs btn-info' href='#'  onclick='beforeEditDict("+JSON.stringify(row)+ ")'>编辑</a>&nbsp;"+
									"<a class='btn btn-xs btn-danger' href='#' onclick='deleteDict("+value+ ")'>删除</a>&nbsp;"+
								"</div>";
						/* return [
							'<a class="btn btn-xs btn-primary" href="#" onclick="openAddDictDataModel(\'' +value + '\')" >添加字典值</a>&nbsp;',
							'<a class="btn btn-xs btn-info" href="#" onclick="beforeEditDict(\'' +JSON.stringify(row) + '\')">编辑</a>&nbsp;',
							'<a class="btn btn-xs btn-danger" href="#" onclick="deleteDict(\'' +value + '\')">删除</a>'
						].join(''); */
					}
				}],
		onLoadError: function () {
			sysUtils.message("数据加载失败！");
		}, 
		onExpandRow: function (index, row, $detail) {
	       InitSubTable(index, row, $detail);
	   },
		responseHandler:function(res){
		//在ajax获取到数据，渲染表格之前，修改数据源
		//console.log(res);
		var t_data=[];
		if(res.code==1){
			t_data = {total:res.data.total,rows:res.data.rows};
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
	var queryUrl = sysUtils.baseUrl+'/dictionary/toDetail/'+row.id;
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
		columns:  [
            {field: 'itemName',title: '字典项目名', width: 60, align: 'center'},
            {field: 'itemValue',title: '字典项目值', width: 60, align: 'center'},
            {field: 'id', title: '主要操作', width: 40, align: 'center', 
			formatter: function(value, row, index) {
				//JSON.stringify(row);
				return "<div class='float-e-margins'>"+
							"<a class='btn btn-xs btn-info' href='#'  onclick='beforeEditDictItem("+JSON.stringify(row)+ ")'>编辑</a>&nbsp;"+
							"<a class='btn btn-xs btn-danger' href='#' onclick='deleteDictItem("+value+ ")'>删除</a>&nbsp;"+
						"</div>";
                }}
        ],
		responseHandler:function(res){
		//在ajax获取到数据，渲染表格之前，修改数据源
			var t_data=[];
			console.log(res);
			if(res.code==1){
				t_data = {total:res.data.total,rows:res.data.rows};
			}
			else{
				t_data = {total:0,rows:[]};
				console.log("res");
			}
			return t_data;
		}
	});
};
 
 
 /**
  * 添加字典
  */
 function saveDict(){
	 
	//是添加还是修改
	var url = "";
	if(sysUtils.isNull($("#dictId").val())){
		url = sysUtils.baseUrl+"dictionary/addDictionary";
	}
	else{
		url = sysUtils.baseUrl+"dictionary/updateDictionary";
	}
	
	var dictionary = new FormData($('#addDictForm')[0]);
	
	 $.ajax(url,{
		data:dictionary,
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		cache: false,                      // 不缓存
		processData: false,                // jQuery不要去处理发送的数据
		contentType: false,                // jQuery不要去设置Content-Type请求头
		success:function(result){
			//关闭 modal
			$('#addDictModal').modal('hide');
			
			if(result.code == 1){
				sysUtils.message("操作成功！");
				TableInit ();
			}else{
				sysUtils.errMessage("操作失败！");
			}
			
		},
		error:function(xhr,type,errorThrown){
			$('#addDictDataModal').modal('hide');
			sysUtils.errMessage("网络出错！");
		}
	}); 
 }

/* 修改字典前的操作 */
function beforeEditDict(dict){
	$("#dictId").attr("value",dict.id);
	$("input[name='dictCode']").val(dict.dictCode);
	$("input[name='dictName']").val(dict.dictName);
	
	$('#addDictModal').modal('show');
	
}

/**
 * 添加字典项前的操作
 */
function beforeAddDictItem(id){
	$('#dictItemModal').modal('show');
	$("#dictItem-dictId").attr("value",id);
	console.log(id);
}
/* 修改字典项前的操作 */
function beforeEditDictItem(dictItem){
	$("#dictItemId").attr("value",dictItem.id);
	$("#dictItem-dictId").attr("value",dictItem.dictId);
	$("input[name='itemName']").val(dictItem.itemName);
	$("input[name='itemValue']").val(dictItem.itemValue);
	
	$('#dictItemModal').modal('show');
	
}
/**
 * 添加字典值
 */
function saveDictItem(){
	
	//是添加还是修改
	var url = "";
	if(sysUtils.isNull($("#dictItemId").val())){
		url = sysUtils.baseUrl+"dictionary/addDictionaryItem";
	}
	else{
		url = sysUtils.baseUrl+"dictionary/updateDictionaryItem";
	}
	
	var dictionary = new FormData($('#dictItemForm')[0]);
	
	 $.ajax(url,{
		data:dictionary,
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		cache: false,                      // 不缓存
		processData: false,                // jQuery不要去处理发送的数据
		contentType: false,                // jQuery不要去设置Content-Type请求头
		success:function(result){
			//关闭 modal
			$('#dictItemModal').modal('hide');
			
			if(result.code == 1){
				sysUtils.message("操作成功！");
				TableInit ();
			}else{
				sysUtils.errMessage("操作失败！");
			}
			
		},
		error:function(xhr,type,errorThrown){
			$('#dictItemModal').modal('hide');
			sysUtils.errMessage("网络出错！");
		}
	}); 
}

/**
 * 删除字典
 */
function deleteDict(id){
  var url = sysUtils.baseUrl+"dictionary/delete/"+id;
  ajaxDeleteById(url,id,function(result){
	  if(result.code == 1){
	  	sysUtils.message("删除成功！");
	  	TableInit ();
	  }else{
	  	sysUtils.errMessage("删除失败！");
	  }
  });
}

/**
 * 删除字典值
 */
function deleteDictItem(id){
	var url = sysUtils.baseUrl+"dictionary/deleteDictionaryItem/"+id;
	ajaxDeleteById(url,id,function(result){
		  if(result.code == 1){
		  	sysUtils.message("删除成功！");
		  	TableInit ();
		  }else{
		  	sysUtils.errMessage("删除失败！");
		  }
	});
}
