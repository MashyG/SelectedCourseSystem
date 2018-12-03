$(document).ready(function(){
    var storage = window.localStorage;
    $('#xxxName').html(storage["user"]);
})
function showMyInfo(){
    $('#myInfo').css("display","block");
}
function hideMyInfo(){
    $('#myInfo').css("display","none");
}