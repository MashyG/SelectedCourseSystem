$(document).ready(function () {
    var storage = window.localStorage;
    //$('#xxxName').html(storage["user"]);
});
/* function showMyInfo(){
    $('#myInfo').css("display","inline-flex");
}
function hideMyInfo(){
    $('#myInfo').css("display","none");
} */
//修改学生个人信息(电话号码)
function editInfo(){
    $('#phone').removeAttr("readonly");
    $('#phone').focus();
}
function saveInfo(){
    let studentPhone = $('#phone').val();
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;     //联系号码的正则表达式
    if(reg.test(studentPhone)) {
        $.ajax({
            //请求方式
            type: 'PUT',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/student/self/modifyPhone?phone=" + $('#phone').val(),
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
            },
            error: function (data) {
                //请求失败函数内容
                alert('修改失败!!');
                console.log(data.result);
            }
        });
    }
    else{
        alert("联系号码有误，请重新输入");
    }
}