/**
 * 初始化字典列表
 */
function TableInit (){
	$('#bookList-grid').bootstrapTable({
		url: $baseUrl+"Manager/bookModule/getList",                      //请求后台的URL（*）
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
			//console.log(params);
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var temp = {   
				limit: params.limit,                         //页面大小
				page: (params.offset / params.limit) + 1,   //页码
			  
			};
			return temp;
		},
		//queryParamsType:'',
		columns: [/* {
		 		field: 'isbn',
		 		title: 'ISBN号',
		 		sortable: true
		 	}, */ {
		 		field: 'name',
		 		title: '书名',
		 		sortable: true
		 	}, {
		 		field: 'author',
		 		title: '作者',
		 		sortable: true
		 	},{
		 		field: 'publishHouse',
		 		title: '出版社',
		 		sortable: true
		 	},{
		 		field: 'pictureUrl',
		 		title: '书籍封面图片url',
		 		sortable: true
		 	},{
		 		field: 'originalPrice',
		 		title: '原价',
		 		sortable: true
		 	},{
		 		field: 'price',
		 		title: '售价',
		 		sortable: true
		 	},{
		 		field: 'quantity',
		 		title: '数量',
		 		sortable: true
		 	},{
		 		field: 'bookOldState',
		 		title: '新旧程度',//1:九成新,2:八成新,3:七成新,4：六成新及以下
		 		sortable: true
		 	},{
		 		field: 'classificationId',
		 		title: '分类id',
		 		sortable: true
		 	},{
		 		field: 'type',
		 		title: '类型',//1：求购 2：出售  3:出售
		 		sortable: true
		 	},{
		 		field: 'remark',
		 		title: '发布人说',
		 		sortable: true
		 	},{
		 		field: 'status',
		 		title: '状态',// 1:待审核，2：审核通过
		 		sortable: true
		 	},{
		 		field: 'isDrop',
		 		title: 'isDrop',//1:已下架 ，0:未下架
		 		sortable: true
		 	},{
		 		field: 'onshelfTime',
		 		title: '上架时间',
		 		sortable: true
		 	},{
		 		field: 'dropshelfTime',
		 		title: '下架时间',
		 		sortable: true
		 	},{
		 		field: 'description',
		 		title: '描述',
		 		sortable: true
		 	},{
		 		field: 'createTime',
		 		title: '创建时间',
		 		sortable: true
		 	},{
		 		field: 'updateTime',
		 		title: '最后更新时间',
		 		sortable: true
		 	}, {
		 		field:'id',
		 		title: '操作',
		 		//width: 120,
		 		align: 'center',
		 		valign: 'middle',
		 		formatter: function(value, row, index){
					
					if(row.isDrop==1){
						//已经上架了，显示下架操作
					}
					
					return [
						'<a class="btn btn-primary" href="#" onclick="openAddDictDataModel(\'' +value + '\')" >下架</a>',
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
