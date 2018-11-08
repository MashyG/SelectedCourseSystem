$(document).ready(function () {
//修改密码
    $('#modifyPassword_roll').click(function () {
        if($('#newPWD1').val() == $('#newPWD2').val()){
            $.ajax({
                //请求方式
                type: 'PUT',
                //发送请求的地址
                url: "http://39.108.57.12:8080/CourseSystem/user/modifyPassword?password=" + $('#newPWD1').val() ,
                xhrFields:{
                    withCredentials:true
                },
                crossDomain:true,
                //服务器返回的数据类型
                dataType: 'json',
                success:function(data) {
                    //请求成功函数内容
                    //alert('请求成功!');
                    console.log(data.result);
                    if(data.result == 'success'){
                        alert('修改成功！');
                        $('div.all_info').load("../modifyPasswordRollForm.html");
                    }
                },
                error:function(jqXHR){
                    //请求失败函数内容
                    alert('修改失败!!');
                }
            });
        }
        else{
            alert('两次输入密码不正确，请重新输入新密码！');
        }
    });

});

//用户退出时返回登陆页面
function logout() {
    $.ajax({
        type: 'GET',
        url: 'http://39.108.57.12:8080/CourseSystem/user/logout',
        //url: 'http://192.168.137.1:8080/CourseSystem/user/logout',
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        success: function (responseText) {
            //请求成功函数内容
            if (responseText.result == 'success') {
                alert('退出成功！');
                self.location.href = '../login.html';
            }
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('GET 请求失败！');
        }
    });
}

//修改密码
function modifyPassword(){
    $('div.all_info').load("../modifyPasswordRollForm.html");
}