//选修课程
var selectedCourseName = [];
function selectedCourse(couId) {
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/student/choose?couName=' + selectedCourseName[couId] ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('选修成功!');
            }
            else if(data.result == 'fail'){
                alert('未到选课时间!!');
            }

        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}