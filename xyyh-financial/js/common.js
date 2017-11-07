var msUrl = 'http://develop.mmmee.cn/xingye_pay';
$(function() {
    FastClick.attach(document.body);
    $(".normalform input[type='checkbox']").click(function(){
    	var _this=$(this)
    	if(_this.is(":checked")){
    		$(this).val("1")
    	}else{
    		$(this).val("2")
    	}
    })
  });

//获取验证码
function getCode(obj){
	var phone = $("#mobile").val();
	if(phone == ''){
		layer.msg('手机号码不能为空', {
			  icon: 7,
			  time: 1600, //2秒关闭（如果不配置，默认是3秒）
		});	
		return;
	}
	
	if(!mobileFlag){
		layer.msg('手机号码不正确', {
			  icon: 2,
			  time: 1600, //2秒关闭（如果不配置，默认是3秒）
		});	
		return;
	}
	getVerCode(phone);
	var count=60;
	var countDown=setInterval(function(){
			count--;
			$(obj).html('<span style="font-size:12px">'+count+'</span><span style="font-size:12px">秒后重新获取</span>');
			if(count == 0) { 
				clearInterval(countDown)
				$(obj).html("重新发送");
				$(obj).attr("onclick","getCode(this);")//重新添加a标签中的onclick事件
			}else{
				$(obj).removeAttr('onclick');//去掉a标签中的onclick事件
			}	
		},1000)

	
		
}


function getVerCode(phone){
	var ajaxUrl =  msUrl+ "/jinrong/bank.php/home/dreamcard/mobile_message";
		jQuery.support.cors = true;
	 //通过Ajax提交后台
		  $.ajax({
			 url:ajaxUrl,
		     type:"POST",
		     dataType:"json",
		     timeout:"2000",
		     async: "false",
		     data:	{ mobile :  phone
		     				,pcode:"xymall**#$"     
					},
		     success:function(result){		    	
		       			alert(12)            
		     },
		     complete : function(msg){		
					
		     }
		  }); 
}

var mobileFlag = true;
function checkMobile(phone){	    		
	if(!/^(13[0-9]|14[0-9]|17[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phone)){
		//$("#showcheckcode").removeAttr('onclick');//去掉a标签中的onclick事件	
		mobileFlag = false
	}else{	
		//$("#showcheckcode").attr("onclick","getCode(this);");//添加a标签中的onclick事件
		mobileFlag = true
	}
	
}