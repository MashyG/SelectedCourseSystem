$(document).ready(function () {
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
})
function showMyInfo(){
    $('#myInfo').css("display","inline-flex");
}
function hideMyInfo(){
    $('#myInfo').css("display","none");
}
function studentInfo(){
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
            console.log(data.result);
            $.each(data.result, function (i, n) {
                let tbody = '';
                tbody += "<tr><th>学号</th> <td>" + n.stuId + "</td></tr>" +
                    "<tr><th>姓名</th> <td>" + n.stuName + "</td></tr>" +
                    "<tr><th>性别</th> <td>" + n.sex + "</td></tr>" +
                    "<tr><th>年级</th> <td>" + n.graName + "</td></tr>" +
                    "<tr><th>学院</th> <td>" + n.acaName + "</td></tr>" +
                    "<tr><th>专业</th> <td>" + n.proName + "</td></tr>" +
                    "<tr><th>班级</th> <td>" + n.claName + "</td></tr>" +
                    "<tr><th>联系号码</th> <td>" + n.phone + "</td></tr>" +
                    "<tr><th>创建时间</th> <td>" + n.createDate + "</td></tr>";
                $('#table').append(tbody);
            })
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

function editInfo(){
    $('#phone').removeAttr("readonly");
    $('#phone').focus();
}

function saveInfo(){
    $.ajax({
        //请求方式
        type: 'PUT',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/student/self/modifyPhone?phone=" + $('#phone').val() ,
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
                window.close();
            }
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}