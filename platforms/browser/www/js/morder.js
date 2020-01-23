//var urlservice='http://nujessie.mugeno.org/ngh/pashacafe/waiter/';
$('document').ready(function(){
	//pick order number from server
	$.ajax({url:urlservice+'order.php',success:function(oid){
		$('#nmOrder').val(oid);
	}});
	
	//make sure table number and customer are filled
	$('#pemesan').keyup(function(){
		var nmMeja=$('#nmMeja').val();
		if(nmMeja.length >0){
			$('#btnChMenu').show();
		}
	});
	
	$('#btnChMenu').click(function(){
		
		var order_id = $("#nmMeja").val()+'-'+$("#nmOrder").val();
		localStorage.setItem('order_id',order_id);
		localStorage.setItem('customer',$("#pemesan").val());
		$.post(urlservice+'norder.php',
			{
				oid: order_id,
				cus: $("#pemesan").val()
			}, function(result){
				window.location='order.html';
			}
		);
		
	});
});

