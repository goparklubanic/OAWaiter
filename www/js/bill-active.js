$('document').ready(function(){
	// cekSession();
    
    $.ajax({
        url : urlservice + 'billing-active.php',
        dataType: "json",
        mimeType: "textPlain",
        success: function(tagihan){
            $("#ab tr").remove();
            $.each(tagihan, function(i,data){
                $('#ab').append(`
                <tr>
                <td><span class='oid'>${data.order_id}</span><br>${data.customer}</td>
                <td align='right'>${data.tagihan.toLocaleString('id-ID')}</td>
                </tr>
                `)
            })
        }
    });
    
    $('#ab').on('click' , 'tr > td > span.oid' , function(){
        let oid = $(this).text();
        localStorage.setItem('oid',oid);
        window.location='bill-detail.html';
    })

	$('#btnOrdLst').click(function(){
		window.location="bill-active.html";
	});

	$("#Logout").click( function(){
		alert("yakin?");
		localStorage.setItem('waiter',null);
		window.location="login.html";
	})
});