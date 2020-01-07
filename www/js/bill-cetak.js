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
            $('#bayar').text( parseInt(localStorage.getItem('bayar')).toLocaleString('id-ID') );
            $('#susuk').text( parseInt(localStorage.getItem('susuk')).toLocaleString('id-ID') );
        }
    });

    $('#cetak').click( function(){
        window.print();
    })
});