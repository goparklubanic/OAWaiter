let keys = [
    'f78afc5d4920e8336046a655996fcfa6a1596c46d35e27da8bbb71f8f4baa989',
    '8a55f6682fc1b56bf70e5e8e1b70694c351ecb946dd4e3d4fd9dc471bd0c615e',
    '72a663f0b2142b9de479e10413c863bc9f1a3fba8169e46577b5a67e750f9d59'
];

let waiter = ['Waiter A','Waiter B','Waiter C'];
$(document).ready( function(){
    $("#login").click( function(e){
        e.preventDefault();
        let logindata = $("#username").val() + '$$$' + $("#password").val();
        let hash = SHA256(logindata);
        // console.log(hash);
        // console.log(keys);
        let indx = keys.indexOf(hash);
        let loginwaiter = waiter[indx];
        // console.log(indx);
        if(indx >= 0){
            console.log('login berhasil');
            localStorage.setItem('waiter',loginwaiter);
            window.location.href = 'index.html';
        }
    })
})