$(document).ready(function () {

    $('.login_er input').click(function () {
        if (!$('.login_er input:checked+label').hasClass('changeColor')) {
            $('.login_er input:checked+label').addClass('changeColor').siblings().removeClass('changeColor');
        }
        $(this).attr('checked', 'checked')
            .siblings().attr('checked', false);
    });

    document.onkeydown = function(e){
        let ev = document.all ? window.event : e;
        if(ev.keyCode==13)
            $('#send').click();
    };

    //登陆
    $("#send").click(function(){
        let str;

        if($('input:radio:checked').val() == 'student')//学生页面
            str = 'student';
        else if($('input:radio:checked').val() == 'teacher')//教务员页面
            str = 'teacher';
        else if($('input:radio:checked').val() == 'manager')//管理员页面
            str = 'manager';

        var userName =  $('#userName').val();
        var passWord = $('#password').val();

        if(userName == '' && passWord == ''){
            alert('学号不能为空！');
            alert('密码不能为空！');
        }
        else if(userName != '' && passWord == ''){
            alert('密码不能为空！');
        }
        else if(passWord != '' && userName == ''){
            alert('学号不能为空！');
        }
        else{
            $.ajax({
                //请求方式
                type:'POST',
                //发送请求的地址
                url: 'http://39.108.57.12:8080/CourseSystem/user/login',
                xhrFields:{
                    withCredentials:true
                },
                crossDomain:true,
                data : {
                    username : userName,
                    password : passWord
                },
                success:function(responseText) {
                    //请求成功函数内容
                    console.log("test----" + JSON.stringify(responseText));
                    var storage = window.localStorage;
                    localStorage.setItem("user", userName);
                    console.log("test----session:" + JSON.stringify(storage["user"]));
                    if (responseText.msg == "student" && str == 'student'){
                        alert('登录成功！');
                        self.location.href = 'student/studentIndex.html?'+ 'username=' + userName + '&password=';
                    }  
                    else if (responseText.msg == "manager" && str == 'teacher'){
                        alert('登录成功！');
                        self.location.href = 'teacher/teacherIndex.html?'+ 'username=' + userName + '&password=';
                    }
                    else if (responseText.msg == "superManager" && str == 'manager'){
                        alert('登录成功！');
                        self.location.href = 'manager/managerIndex.html?'+ 'username=' + userName + '&password=';
                    }
                    else{
                        alert('用户或密码错误，请重新输入！');
                    } 
                },
                error:function(e){
                    console.log("error---" + JSON.stringify((e)));
                    //请求失败函数内容
                    alert('POST 请求失败！');
                }
            });
        }
    });

});


