//var urlservice = "http://nujessie.mugeno.org/ngh/pashacafe/waiter/";
var cat = localStorage.getItem('cat');
var oid = localStorage.getItem('order_id');
$("document").ready(function(){

	
	$('#cat').html(cat.toUpperCase());
	
	$.getJSON(urlservice+'menuList.php?cat='+cat,function(menus){
		$.each(menus,function(index,menu){
			var stok = parseInt(menu.stok);
			if(stok >=10 ){ var stk='10+'; }else{ var stk=menu.stok; }
			$('#menuList').append(
			"<li class='menu-list'>"+menu.nama+" [ "+stk+" ]"+
			"<span class='menu-qty'>"+
	        "<a href='#' onClick=setOrderQty('"+menu.mid+"')>Pick</a>"+
			"</span>"+
			"</li> "
			);
		});
	});
	
	$("#done").click(function(){
		/*
		var menu = {};
		menu.dipilih = [];
		menu.qty=[];

		$("input:checkbox").each(function() {
			if ($(this).is(":checked")) {
				menu.dipilih.push($(this).attr("id"));
				var menuid = $(this).attr("id");
				var menuqty = $("#"+menuid+'-qty').val();
				menu.qty.push(menuqty);
			} 
		});
		//		console.log("Menu Id: ",menu.dipilih);
		//		console.log("Menu Qt: ",menu.qty);
		$.post(urlservice+'orderMenu.php',{
			oid: oid,
			mid: menu.dipilih,
			qty: menu.qty
			},
			function(result){
			$("#yrOrder").html(result);
		});
		*/	
		window.location="order.html";
				
	});
			
	$('#ulang').click(function(){
		$('input[type=checkbox]').prop('checked',false);
		$('input[type=number]').val('');
		$('#yrOrder').html('');
	});
	
	$('#mdOrder').on('shown.bs.modal',function(){
		$("#fqty").focus();
	})
	
	$('#orderQty').submit(function(){
		var mid=$('#fmid').val();
		var qty=$('#fqty').val();
		//$('#mdOrder').modal('hide');
		//alert("order "+oid+" pesan "+mid+" sebanyak "+qty);
		$.post(urlservice+'orderMenu.php',{
			oid : oid,
			mid : mid,
			qty : qty
		},function(result){
			$('#yrOrder').html(result);
		});
	});
});
		
function checkMe(cbid){
  $('#'+cbid).prop('checked',true);
}

function setOrderQty(mid){
	$("#mdOrder").modal('show');
	$("#foid").val(oid);
	$("#fmid").val(mid);
	$("#fqty").val('');
	$("#yrOrder").html('');
}
