//var urlservice = "http://nujessie.mugeno.org/ngh/pashacafe/waiter/";
var cat = localStorage.getItem('cat');
var oid = localStorage.getItem('order_id');
$("document").ready(function(){


	$('#cat').html(cat.toUpperCase());

	$.getJSON(urlservice+'menuList.php?cat='+cat,function(menus){
		// console.log(menus);
		$.each(menus,function(index,menu){
			var stok = parseInt(menu.stok);
			if(stok >=10 ){ var stk='10+'; }else{ var stk=menu.stok; }
			$('#menuList').append(
			"<li class='menu-list'>"+menu.nama+
			"<span class='menu-qty'>"+
	        "<input type='number' class='menuId' id='"+menu.mid+"' size='4' min=0 value=0 max="+menu.stok+">"+
			"<!-- a href='#' onClick=sendOrder('"+menu.mid+"')>"+
			"<img src='./img/cekmark.png' height='18px'/></a-->"+
			"</span>"+
			"</li> "
			);
		});
	});

	$("#done").click(function(){
		let mid = jQuery("#menuList input.menuId");
		let orderSet = [] , orderData = {};
		mid.each(function(){
			let menuId = $(this).prop('id');
			let qntity = $(this).val();
			if( qntity > 0 ){
				orderData = {'mid':menuId , 'qty':qntity };
				orderSet.push(orderData);
			}
		})
		sendOrder(orderSet);
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

function sendOrder(mid){
	
		$.post(urlservice+'orderMenu.php',{
			oid : oid,
			set : mid
		},function(result){
			$('#yrOrder').html(result);
			setTimeout(function(){ window.location.href="order.html"; }, 2000);
		});
}
