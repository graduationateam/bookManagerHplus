var v_modal = new Vue({
	el:"#adressModal",
	data:{
		address:[]
	}
})


function operateFormatter(value, row, index) {//赋予的参数
    return [
        '<a class="btn btn-primary" href="#">删除</a>'
        
    ].join('');
}

var $table;
  
//初始化bootstrap-table的内容
function InitMainTable () {
//记录页面bootstrap-table全局变量$table，方便应用
var queryUrl = sysUtils.baseUrl+'Manager/orderModule/getList';
 $('#orderListTable').bootstrapTable({
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
    detailView: true,                  //是否显示父子表
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
        field: 'orderNumber',
        title: '订单编号',
        sortable: true
    }, {
        field: 'seller',
        title: '卖家',
        sortable: true,
    },
    {
        field: 'buyer',
        title: '买家',
        sortable: true
    }, 
    {
        field: 'orderAmount',
        title: '订单金额',
        sortable: true
    }, 
    {
        field: 'state',
        title: '订单状态',
         formatter: function(value, row, i){
			 if(row.state==1){
				 return "已支付"
			 }
			  if(row.state==2){
			 	return "已发货"
			 }
			  if(row.state==1){
			 	return "已收货"
			 }
		 }
    }, 
    {
        field: 'time',
        title: '下单时间',
        sortable: true
    }/* , 
    {
        field:'id',
        title: '操作',
        width: 120,
        align: 'center',
        valign: 'middle',
        formatter: operateFormatter
    } */],
	onExpandRow: function (index, row, $detail) {
	    InitSubTable(index, row, $detail);
	},
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

/**
 * 初始化子table，用于查看字典值
 */
function InitSubTable(index, row, $detail) {
	var parentid = row.id;
	var cur_table = $detail.html('<table></table>').find('table');
	var queryUrl = sysUtils.baseUrl+'Manager/orderModule/getDetail/'+row.id;
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
			{field: 'publishId',title: '书名', width: 60, align: 'center'},
			{field: 'price',title: '单价', width: 60, align: 'center'},
			{field: 'quantity',title: '数量', width: 60, align: 'center'},
            {field: 'totalprice',title: '总价', width: 60, align: 'center'},
            {field: 'id', title: '主要操作', width: 40, align: 'center', 
			formatter: function(value, row, index) {
				//JSON.stringify(row);
				return "<div class='float-e-margins'>"+
							"<a class='btn btn-xs btn-info' href='#'  onclick='seeAddressInfo("+row.addressInfoId+ ")'>查看收货信息</a>&nbsp;"+
						"</div>";
                }}
        ],
		responseHandler:function(res){
		//在ajax获取到数据，渲染表格之前，修改数据源
			var t_data=[];
			console.log(res);
			if(res.code==1){
				t_data = {total:res.data.total,rows:res.data.list};
			}
			else{
				t_data = {total:0,rows:[]};
				console.log("res");
			}
			return t_data;
		}
	});
};
 function seeAddressInfo(id){
	 let url=sysUtils.baseUrl+"address/getAddress";
	 sysUtils.ajaxPost(url,{"id":id},function(res){
		 console.log(res);
		 v_modal.address = res.data[0];
		 $("#adressModal").modal("show");
	 })
 }