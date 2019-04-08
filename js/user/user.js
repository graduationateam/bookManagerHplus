
function operateFormatter(value, row, index) {//赋予的参数
		return [
			'<a class="btn btn-default" href="#">删除</a>'
			
		].join('');
}
	
var $table;
	  
//初始化bootstrap-table的内容
function InitMainTable () {
	//记录页面bootstrap-table全局变量$table，方便应用
	var queryUrl = 'http://localhost:8080/Manager/userModule/toList';
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
		columns: [{
			checkbox: true,  
			visible: true                  //是否显示复选框  
		}, {
			field: 'userName',
			title: '用户名',
			sortable: true
		}, {
			field: 'phone',
			title: '手机',
			sortable: true
		}, {
			field: 'email',
			title: '邮箱',
			sortable: true,
			//formatter: emailFormatter
		},
		{
			field: 'gender',
			title: '性别',
			sortable: true
		}, {
			field:'id',
			title: '操作',
			width: 120,
			align: 'center',
			valign: 'middle',
			formatter: operateFormatter
		}, ],
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
};

 $('#userListTable').on('all.bs.table', function(e, name, args) {
        console.log('Event:', name, ', data:', args);
      })
      .on('click-row.bs.table', function(e, row, $element) {
        //console.log('Event: click-row.bs.table');
      })
      .on('dbl-click-row.bs.table', function(e, row, $element) {
        //console.log('Event: dbl-click-row.bs.table');
      })
      .on('sort.bs.table', function(e, name, order) {
        //console.log('Event: sort.bs.table');
      })
      .on('check.bs.table', function(e, row) {
       //console.log('Event: check.bs.table');
	   alert(row.id);
      })
      .on('uncheck.bs.table', function(e, row) {
       // console.log('Event: uncheck.bs.table');
	   alert(row.id);
      })
      .on('check-all.bs.table', function(e) {
       // console.log('Event: check-all.bs.table');
	   
      })
      .on('uncheck-all.bs.table', function(e) {
       // console.log('Event: uncheck-all.bs.table');
      })
      .on('load-success.bs.table', function(e, data) {
       // console.log('Event: load-success.bs.table');
      })
      .on('load-error.bs.table', function(e, status) {
       // console.log('Event: load-error.bs.table');
      })
      .on('column-switch.bs.table', function(e, field, checked) {
       // console.log('Event: column-switch.bs.table');
      })
      .on('page-change.bs.table', function(e, size, number) {
      // console.log('Event: page-change.bs.table');
      })
      .on('search.bs.table', function(e, text) {
        //console.log('Event: search.bs.table');
      });
		
		