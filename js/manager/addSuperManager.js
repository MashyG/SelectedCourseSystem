$(document).ready(function () {
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
})

function addSupMan(){
    $.ajax({
        //请求方式
        type: 'POST',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/self',
        //url: 'http://192.168.137.1:8080/CourseSystem/superManager/self',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //数据
        data: {
            "supName": $('#supName').val(),
            "sex": $('#sex').val(),
            "phone": $('#phone').val()
        },
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            if (data.result == 'success') {
                alert('录入成功!');
                $('div.all_info').load("managerRollForm.html");
            }
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('POST 请求失败!!');
        }
    });
}