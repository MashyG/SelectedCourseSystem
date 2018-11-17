$(document).ready(function () {

    $('.login_er input').click(function () {
        if (!$('.login_er input:checked+label').hasClass('changeColor')) {
            $('.login_er input:checked+label').addClass('changeColor').siblings().removeClass('changeColor');
        }
        $(this).attr('checked', 'checked')
            .siblings().attr('checked', false);
    });

    //登陆
    $("#send").click(function(){
        let str;

        if($('input:radio:checked').val() == 'student')//学生页面
            str = 'student/studentIndex.html?';
            //str = 'studentPage/student.html?';
        else if($('input:radio:checked').val() == 'teacher')//教务员页面
            str = 'teacher/teacher.html?';
            // str = 'teacherPage/teacher.html?';
        else if($('input:radio:checked').val() == 'manager')//管理员页面
            // str = 'managerPage/manager.html?';
            str = 'manager/managerIndex.html?';

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
                    if (responseText.result == 'success'){
                        alert('登录成功！');
                        self.location.href = str + 'username=' + userName + '&password=';
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


