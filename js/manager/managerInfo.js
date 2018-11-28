$(document).ready(function(){
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
    $.ajax({
        type: 'GET',
        url: "http://39.108.57.12:8080/CourseSystem/superManager/self" ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        dataType: 'json',
        success:function(data) {
            console.log("manager---" + JSON.stringify(data));
            $('#supId').val(data.result[0].supId);
            $('#supName').val(data.result[0].supName);
            $('#sex').val(data.result[0].sex);
            $('#phone').val(data.result[0].phone);
            $('#createBy').val(data.result[0].createBy);
            $('#createDate').val(data.result[0].createDate);
        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
})
