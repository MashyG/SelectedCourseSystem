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
            str = 'studentPage/student.html?';
        else if($('input:radio:checked').val() == 'teacher')//教务员页面
            str = 'teacherPage/teacher.html?';
        else if($('input:radio:checked').val() == 'manager')//管理员页面
            str = 'managerPage/manager.html?';

        let userName =  $('#userName').val();
        let passWord = $('#password').val();

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
                url: 'http://39.108.57.12:8080/CourseSystem/user/login' ,
                //url: 'http://192.168.191.2:8080/CourseSystem/user/login' ,
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
                    console.log(responseText.result);
                    if (responseText.result == 'success'){
                        alert('登录成功！');
                        self.location.href = str + 'username=' + userName + '&password=';
                    }
                    else{
                        alert('用户名或密码错误，请重新输入');
                    }
                },
                error:function(){
                    //请求失败函数内容
                    alert('POST 请求失败！');
                }
            });
        }
    });

});


