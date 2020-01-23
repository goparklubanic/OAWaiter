//var urlservice='http://nujessie.mugeno.org/ngh/pashacafe/waiter/';
$('document').ready(function(){
	$.getJSON(urlservice+'unpaidList.php',function(orders){
		$.each(orders,function(i,order){
			$("#unpaidList").append(
			"<li class='menu-list'>ID: "+order.order_id+
			", Customer: "+order.name+
			"<a class='addOrder' onClick=addMenu('"+order.order_id+"','"+order.name+"')>[ + Menu ]</li>");
		});
	});
});
 
 function addMenu(oid,name){
	 localStorage.setItem('order_id',oid);
	 localStorage.setItem('customer',name);
	 window.location="order.html";
 }
