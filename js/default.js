/* 
    Created on : Aug 8, 2020, 1:50:39 AM
    Author     : ISDO Web & Yazılım
*/

$(document).ready(function(){
    
    // Sidenav Init
    $('.sidenav').sidenav();

    //Parallax
    $('.parallax').parallax();

	//tabs
	$('.tabs').tabs();

    //slider-sliderMobile
    sliderMobile();

    // Slider Function init
    $('#ana-slide').owlCarousel({
         animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav : true, 
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        items : 1,
        loop:true,
        lazy:true,
        autoplay:true,
        autoplayTimeout:5000,
        navText: ["<img class='left-arrow' src='images/left-arrow-1.png' alt='Magna Basım'>","<img class='right-arrow' src='images/right-arrow-1.png' alt='Magna Basım'>"] 
    });

    //Ürün Alt Slider
    $('#urun-slide').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
    
    //E-Bülten
    $('#ebultenaboneformuonay').click(function () {

        var email = $("#emailbulten").val();
 
        if (isEmail(email)) {
 
            $("#ebultenaboneformuonay").attr("disabled", true);
            $("#ebultenaboneformuonay").text();
            var data = new FormData($("#ebultenaboneformu")[0]);
            var ajaxRequest = $.ajax({
            type: "POST",
            url: "/ajax/all_methods.asp?method=ebultenaboneformuonay",
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
 
              $("#ebultenaboneformuonay").attr("disabled", false);
              $("#ebultenaboneformuonay").text('Gönder');
 
 
         if (data.indexOf("error") >= 0) {
                    var res = data.split(':');
                    var hata = res[1];
                    M.toast({html:hata}, 4000);
          }
         else if (data.indexOf("success") >= 0) {
                    var res = data.split(':');
                    var sonuc = res[1];
                    $("#ebultenaboneformu")[0].reset();
                    M.toast({html:"E-Bülten Aboneliğiniz Onaylandı."}, 4000);
          }
        }
            });
        }
        else{
            M.toast({html:"Geçersiz bir E-Posta Girdiniz !"}, 4000);
        }
 
    });

    // İletişim Formu
    $('#iletisimFormuOnay').click(function () {
        var isim_soyisim = $("#isim_soyisim").val();
        var email = $("#email").val();
        var mesaj = $("#mesaj").val();
        if (isEmail(email) && isim_soyisim!="" && mesaj!="") {
            $("#iletisimFormuOnay").attr("disabled", true);
            $("#iletisimFormuOnay").text('GÃ¶nderiliyor...');
            var data = new FormData($("#iletisimformu")[0]);
            var ajaxRequest = $.ajax({
            type: "POST",
            url: "/ajax/all_methods.asp?method=iletisimformuonay",
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                $("#iletisimFormuOnay").attr("disabled", false);
                $("#iletisimFormuOnay").text('GÃ¶nder');

                    if (data.indexOf("error") >= 0) {
                    var res = data.split(':');
                    var hata = res[1];
                    M.toast({html:hata}, 4000);
                    }
                    else if (data.indexOf("success") >= 0) {
                    var res = data.split(':');
                    var sonuc = res[1];
                    $("#iletisimformu")[0].reset();
                    M.toast({html:"MesajÄ±nÄ±z ilgili birime iletilmiÅŸtir. En kÄ±sa sÃ¼rede cevaplanacaktÄ±r."}, 4000);
                    }
                }
            });
        }
        else{
            if(!isEmail(email)) {M.toast({html:"Geçerli bir e-mail adresi girmediniz!"}, 4000);}
            if(isim_soyisim=="" ) {M.toast({html:"Geçerli bir isim soyisim adresi girmediniz!"}, 4000);}
            if(mesaj=="" ) {M.toast({html:"Lütfen mesajınızı giriniz..."}, 4000);}
        }
    }); 
});

function isEmail(value) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? true : false;
}


function sliderMobile(){
  var ScreenWidth = $( window ).width();
  if(ScreenWidth <= 601){
      $( "#ana-slide .item img" ).each(function( index, element ) {
          var elementData=$(element).attr("data-resim");
          $(element).attr("src",elementData);
      });
  }

  $('.slides-href').click(function(){
    $(".slides").hide();
    var dataId = $(this).attr("data-id");
    console.log(dataId)
    $(".slides[data-id='"+dataId+"']").show();
});
}
//Back To Top
mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}