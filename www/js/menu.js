//var urlservice = "http://nujessie.mugeno.org/ngh/pashacafe/waiter/";
$("document").ready(function(){
	var cat = localStorage.getItem('cat');
	var oid = localStorage.getItem('order_id');
	
	$('#cat').html(cat.toUpperCase());
	
	$.getJSON(urlservice+'menuList.php?cat='+cat,function(menus){
		$.each(menus,function(index,menu){
			var stok = parseInt(menu.stok);
			if(stok >=10 ){ var stk='10+'; }else{ var stk=menu.stok; }
			$('#menuList').append(
			"<li class='menu-list'>"+
			"<span class='menu-check'>"+
	        "<input type='checkbox' id='menu-"+menu.mid+"'> "+menu.nama+
			" [ "+stk+" ]</span>"+
			"<span class='menu-qty'>"+
	        "<input type='number' size='4' id='menu-"+menu.mid+"-qty' onFocus=checkMe('menu-"+menu.mid+"') />"+
			"</span>"+
			"</li> "
			);
		});
	});
	
	$("#done").click(function(){
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
				
		window.location="order.html";
				
	});
			
	$('#ulang').click(function(){
		$('input[type=checkbox]').prop('checked',false);
		$('input[type=number]').val('');
		$('#yrOrder').html('');
	});
	
});
		
function checkMe(cbid){
  $('#'+cbid).prop('checked',true);
}
