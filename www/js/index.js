$('document').ready(function(){
	cekSession();
	$('#btnMOrder').click(function(){
		window.location="mOrder.html";
	});
	
	$('#btnUnpaid').click(function(){
		window.location="unpaidList.html";
	});
	
	$('#btnOrdLst').click(function(){
		window.location="unpaidList.html";
	});

	$('#btnOrdLst').click(function(){
		window.location="unpaidList.html";
	});

	$('#btnAtBill').click(function(){
		window.location="bill-active.html";
	});

	$("#Logout").click( function(){
		alert("yakin?");
		localStorage.setItem('waiter',null);
		window.location="login.html";
	})
});
 
function cekSession(){
	let waiter = localStorage.getItem('waiter');
	if( waiter == null || waiter == ''){
		console.log('Belum Login');
		window.location.href='login.html';
	}else{
		console.log(waiter);
		$("#lowa").html(waiter);
	}
}