$('document').ready(function(){
	// cekSession();
    
    let oid = localStorage.getItem('oid');
    let pay = $('#dibayar').val();
    let chg = 0;
    let bil = 0;
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
            bil = parseInt(tagihan.total);
            $('#totag').text(tagihan.total.toLocaleString('id-ID'));
            chg = pay - bil;
            $('#kembali').val(chg);
        }
    });

    $('#dibayar').keyup(function(){
        pay = $(this).val();
        chg = pay - bil;
        $('#kembali').val(chg);
    });

	$('#btnOrdLst').click(function(){
		window.location="bill-active.html";
	});

	$("#Logout").click( function(){
		alert("yakin?");
		localStorage.setItem('waiter',null);
		window.location="login.html";
    })
    
    $('.appFooter p').click( function(){
        localStorage.setItem('bayar' , $('#dibayar').val() );
        localStorage.setItem('susuk' , $('#kembali').val() );
        window.location.href='bill-cetak.html';
    })


});