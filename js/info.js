$(document).ready(function(){
    $("#table").bootstrapTable({ // 对应table标签的id
        url: "../studentRoll/data.json", // 获取表格数据的url
        cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
        striped: true,  //表格显示条纹，默认为false
        pagination: true, // 在表格底部显示分页组件，默认false
        pageSize: 6, // 页面数据条数
        pageNumber: 1, // 首页页码
        sortName: 'id', // 要排序的字段
        sortOrder: 'desc', // 排序规则
        columns: [
            {
                field: '学号', // 返回json数据中的name
                title: '学号', // 表格表头显示文字
                align: 'center', // 左右居中
                valign: 'middle' // 上下居中
            },
            {
                field: '姓名',
                title: '姓名',
                align: 'center',
                valign: 'middle'
            },
            {
                field: '专业班级',
                title: '专业班级',
                align: 'center',
                valign: 'middle',
            }
        ],
        onLoadSuccess: function () {  //加载成功时执行
            console.info("加载成功");
        },
        onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
        }

    })
});




