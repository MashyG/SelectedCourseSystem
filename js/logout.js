
//用户退出时返回登陆页面
function logout() {
    let r = confirm("是否退出？");
    if(r == true) {
        $.ajax({
            type: 'GET',
            url: 'http://39.108.57.12:8080/CourseSystem/user/logout',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (responseText) {
                //请求成功函数内容
                if (responseText.result == 'success') {
                    alert('退出成功！');
                    self.location.href = '../login.html';
                }
            },
            error: function () {
                //请求失败函数内容
                alert('退出失败');
            }
        });
    }
}

//修改密码
function modifyPassword(){
    /* // alert("test");
    if ($('#lastPWD').val() == '') {
        alert("原密码不能为空！");
        return;
    } */
        
    if ($('#newPWD1').val() == '') {
        alert("请输入新密码！");
        return;
    } 
    if ($('#newPWD2').val() == ''){
        alert("请确认新密码！");
        return;
    }
    
    if ($('#newPWD1').val() != $('#newPWD2').val()) {
        alert("两次输入的新密码不一样，请重新输入！");
        return;
    }
        
    else {
        $.ajax({
            //请求方式
            type: 'PUT',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/user/modifyPassword?password=" + $('#newPWD1').val(),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            //服务器返回的数据类型
            dataType: 'json',
            success: function (data) {
                //请求成功函数内容
                //alert('请求成功!');
                console.log(data.result);
                if (data.result == 'success') {
                    alert('修改成功！');
                    window.close();
                }
                else {
                    alert(data.msg);
                }
            },
            error: function () {
                //请求失败函数内容
                console.log(data);
                alert('修改失败!!');
            }
        });
    }
}