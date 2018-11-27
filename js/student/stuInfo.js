$(document).ready(function(){
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/student/self" ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log("test"+JSON.stringify(data.result));
            $('#stuId').val(data.result[0].stuId);
            $('#stuName').val(data.result[0].stuName);
            $('#sex').val(data.result[0].sex);
            $('#graName').val(data.result[0].graName);
            $('#acaName').val(data.result[0].acaName);
            $('#proClass').val(data.result[0].proName+data.result[0].claName);
            $('#phone').val(data.result[0].phone);
            $('#createDate').val(data.result[0].createDate);
        },
        error: function (data) {
            //请求失败函数内容
            console.log("test"+JSON.stringify(data.result));
        }
    });

});
