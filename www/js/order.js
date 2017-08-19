//var urlservice='http://nujessie.mugeno.org/ngh/pashacafe/waiter/';
$('document').ready(function(){
	var order_id = localStorage.getItem('order_id');
	var customer = localStorage.getItem('customer');
	getBilling('Makanan',order_id,'#listMakanan');
	getBilling('Minuman',order_id,'#listMinuman');
	getBilling('Camilan',order_id,'#listCamilan');
	
	$('#orderId').val(order_id);
	$('#pemesan').val(customer);
	
	$('#orderMakanan').click(function(){
		localStorage.setItem('cat','Makanan');
		window.location='menuList.html';
	});
	
	$('#orderMinuman').click(function(){
		localStorage.setItem('cat','Minuman');
		window.location='menuList.html';
	});
	
	$('#orderCamilan').click(function(){
		localStorage.setItem('cat','Camilan');
		window.location='menuList.html';
	});
	
	$.ajax({url:urlservice+'billing.php?cat=all&oid='+order_id,
			success:function(billing){
				$('#grandTotal').html(billing);
			}
	});
	
	$("#done").click(function(){
		window.location="index.html";
	});
});

function getBilling(cat,oid,holder){
	$.getJSON(urlservice+'billing.php?cat='+cat+'&oid='+oid,
		function(tagihan){
			$.each(tagihan,function(i,bill){
				$(holder).append("<li>"+bill.qty+" x "+bill.nama+
				" <span class='price'>"+bill.harga+
				"&nbsp;&nbsp;&nbsp;"+
				"<span class='delOrder' onClick=delOrder('"+bill.oid+"')>"+
				"X</span></span></li>");
			});
	});
}

function delOrder(moid){
	var ro = confirm("Yakin membatalkan menu ?");
	if( ro == true ){
		$.post(urlservice+'delOrder.php',{
			moid: moid
		},function(result){
			alert('Menu Telah Dibatalkan');
			location.reload();
		});
	}
}

