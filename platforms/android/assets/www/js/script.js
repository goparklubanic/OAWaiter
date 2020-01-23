// Code goes here
var keySize = 256;
var ivSize = 128;
var iterations = 100;

var message = "Bebek goreng H Slamet";
var password = "KulonSuperAyam";

// data user
let passkey = [
    'eeeeb73bc0656a4ba47bc715ed47b91271e6ee714eb8dda4da731dca64a2d3e0XSuo5075YMmSIGSUicIWKw==',
    '7f32f58382cf253255b3bb507c912b572c4b080a208936e0e6258fd50183378eZ8hoyGevfHz/r2ORBZuQLw==',
    '089515ded8aec1a3ab4688f6384dd097742785ce9075abb87e75bb342c730b84TAelDbIDKBCZCF+q4MtwPQ=='
];

function encrypt (msg, pass) {
  var salt = CryptoJS.lib.WordArray.random(128/8);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var iv = CryptoJS.lib.WordArray.random(128/8);
  
  var encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  });
  
  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
  return transitmessage;
}

function decrypt (transitmessage, pass) {
  var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
  var encrypted = transitmessage.substring(64);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  return decrypted;
}

// var encrypted = encrypt(message, password);
// var decrypted = decrypt(encrypted, password);

// $('#encrypted').text("Encrypted: "+encrypted);
// $('#decrypted').text("Decrypted: "+ decrypted.toString(CryptoJS.enc.Utf8) );

$(document).ready( function(){

    // $("#bungkus").click( function(){
    //     let message = $("#usepas").val();
    //     let bungkusan = encrypt(message,password);
    //     $("#terbungkus").html(bungkusan);
    // })

    // $("#bongkar").click( function(){
    //     let bungkusan = $("#terbungkus").html();
    //     let bongkaran = decrypt(bungkusan,password);
    //     let terbongkar = bongkaran.toString(CryptoJS.enc.Utf8);
    //     $("#terbongkar").html(terbongkar);
    // });

    $("#login").click( function(e){
      e.preventDefault();
      let data = $("#username").val() + "$$$" +$("#password").val();
      //console.log(data);
      let bungkus=encrypt(data,password);
      console.log(bungkus);
      let uid = passkey.indexOf(bungkus);
      // $("#terbungkus").html(bungkus);
      //alert(uid);
      console.log(uid);
      // let id = $("#username").val();
      // let userindex = parseInt(id);
      // let usersdata = passkey[userindex];
      // let logindata = decrypt(usersdata,password);
      // console.log(logindata.toString(CryptoJS.enc.Utf8));
    })
})

// user: batura , batire, batiri, pass bek90r