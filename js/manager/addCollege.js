$(document).ready(function(){
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
})

function addCollege(){
    $.ajax({
        //请求方式
        type: 'POST',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/superManager/team',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        //数据
        data: JSON.stringify({  //解决错误码400
            'graName': $('#graName').val(),
            'acaName': $('#acaName').val(),
            'proName': $('#proName').val(),
            'claName': $('#claName').val(),
            'createDate': $('#createDate').val()
        }),
        contentType: 'application/json;charset=UTF-8',//解决错误码415
        //服务器返回的数据类型
        dataType: 'json',
        success: function (response) {
            //请求成功函数内容
            if (response.result == 'success') {
                alert('录入成功!');
                $('div.all_info').load("collegeRollForm.html");
            }
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('POST 请求失败!!');
        }
    });
}