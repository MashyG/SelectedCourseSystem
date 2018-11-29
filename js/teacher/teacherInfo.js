$(document).ready(function(){
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
    $('#myInfo').children(":first").css('cursor', 'not-allow');
    $('#myInfo').children(":first").css('pointerEvents','none');
    
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/manager/self",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log("teacherInfo----" + data.result);
            $('#manId').val(data.result[0].manId);
            $('#manName').val(data.result[0].manName);
            $('#sex').val(data.result[0].sex);
            $('#graName').val(data.result[0].graName);
            $('#acaName').val(data.result[0].job);
            $('#phone').val(data.result[0].phone);
            $('#createDate').val(data.result[0].createDate);
        },
        error: function (data) {
            //请求失败函数内容
            alert('查询失败!!');
            console.log(data.result);
        }
    });
})