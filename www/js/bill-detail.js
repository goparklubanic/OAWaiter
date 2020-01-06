$('document').ready(function(){
	// cekSession();
    
    oid = localStorage.getItem('oid');
    $('#oid').text(oid);

    $.ajax({
        url : urlservice + 'billing-detail.php?oid=' + oid,
        dataType: "json",
        mimeType: "textPlain",
        success: function(tagihan){
            $("#bd tr").remove();
            $.each(tagihan.data, function(i,data){
                $('#bd').append(`
                <tr>
                <td>${data.nama}</td>
                <td>${data.qty}</td>
                <td align='right'>${data.harga.toLocaleString('id-ID')}</td>
                </tr>
                `)
            });

            $('#totag').text(tagihan.total.toLocaleString('id-ID'));
        }
    });

	$('#btnOrdLst').click(function(){
		window.location="bill-active.html";
	});

	$("#Logout").click( function(){
		alert("yakin?");
		localStorage.setItem('waiter',null);
		window.location="login.html";
	})
});