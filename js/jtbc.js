;(function($){

    var brando = {     

        init: function(){
            this.navFn();
            this.section1Fn();
            this.section2Fn();
            this.section3Fn();
            this.footerFn();
            this.goTopFn();
        },


        scrollEventFn:function(){
          
        },
      
        navFn:function(){

        },


        section1Fn:function(){

          var $win     = $(window);
          var $section1= $('#section1');
          var $video   = $('.video-box .main-video');           

          var $winW    = $(window).innerWidth();     
          var $winH    = $(window).innerHeight();    
          var $videoW  = $video.innerWidth();       
          var $videoH  = $video.innerHeight();      
          var marginL  = ($winW-$videoW)/2;
          var marginT  = ($winH-$videoH)/2;

               function resizeFn(){
                   $winW    = $(window).innerWidth();
                   $winH    = $(window).innerHeight();
                   $videoW  = $video.innerWidth();
                   $videoH  = $video.innerHeight();
                   marginL  = ($winW-$videoW)/2;
                   marginT  = ($winH-$videoH)/2;


                   if( $winW > $videoW ){
                       $video.css({ width:$winW, height:'auto' });                                           
                   }
                   if( $winH > $videoH ){
                       $video.css({ width:'auto', height:$winH });
                   }
                   $video.css({ marginLeft:marginL, marginTop:marginT });   
                   $section1.css({ width:$winW, height:$winH });
                   
               }                    
               setTimeout(resizeFn,1000);

              $win.resize(function(){
                   setTimeout(resizeFn,1000);
              });

                var $hover = $('.hover-box');
                var $angle = $('.cover-angle');

                $angle.on({
                  mouseenter:function(){
                    $hover.css({opacity:0});
                  }
                })
                $angle.on({
                  mouseleave:function(){
                    $hover.css({opacity:1});
                  }
                })
                                  

              
        },

        section2Fn:function(){
             // 페럴록스
             var $imgWrap1 = $('#section2 .history1 .history1-gap ul li .img-box');
             var $textWrap1 = $('#section2 .history1 .history1-gap ul li .text-box');
             var $history1 = $('#section2 .history1').offset().top;

             var $imgWrap2 = $('#section2 .history2 .history2-gap ul li .img-box');
             var $textWrap2 = $('#section2 .history2 .history2-gap ul li .text-box');
             var $history2 = $('#section2 .history2').offset().top;
             
             var $textWrap3 = $('#section2 .history3 .history3-gap ul li .text-box');
             var $history3 = $('#section2 .history3').offset().top;

             var $imgWrap4 = $('#section2 .history4 .history4-gap ul li .img-box');
             var $textWrap4 = $('#section2 .history4 .history4-gap ul li .text-box');
             var $history4 = $('#section2 .history4').offset().top;

             var $imgWrap5 = $('#section2 .history5 .history5-gap ul li .img-box');
             var $textWrap5 = $('#section2 .history5 .history5-gap ul li .text-box');
             var $history5 = $('#section2 .history5').offset().top;

             var $imgWrap6 = $('#section2 .history6 .history6-gap ul li .img-box');
             var $textWrap6 = $('#section2 .history6 .history6-gap ul li .text-box');
             var $history6 = $('#section2 .history6').offset().top;
 
             var $imgWrap7 = $('#section2 .history7 .history7-gap ul li .img-box');
             var $textWrap7 = $('#section2 .history7 .history7-gap ul li .text-box');
             var $history7 = $('#section2 .history7').offset().top;

             var $textWrap8 = $('#section2 .history8 .history8-gap ul li .text-box');
             var $history8 = $('#section2 .history8').offset().top;

             var $textWrap9 = $('#section2 .history9 .history9-gap ul li .text-box');
             var $history9 = $('#section2 .history9').offset().top;

             var $textWrap10 = $('#section2 .history10 .history10-gap ul li .text-box');
             var $history10 = $('#section2 .history10').offset().top;
             var t = 0;
 

 
 
             $(window).scroll(function(){
               if($(this).scrollTop() == 0 ){
                 t=0;
                 $imgWrap1.removeClass('addMove');
                 $textWrap1.removeClass('addMove');

                 $imgWrap2.removeClass('addMove');
                 $textWrap2.removeClass('addMove');

                 $textWrap3.removeClass('addMove');

                 $imgWrap4.removeClass('addMove');
                 $textWrap4.removeClass('addMove');
                 
                 $imgWrap5.removeClass('addMove');
                 $textWrap5.removeClass('addMove');

                 $imgWrap6.removeClass('addMove');
                 $textWrap6.removeClass('addMove');

                 $imgWrap7.removeClass('addMove');
                 $textWrap7.removeClass('addMove');

                 $textWrap8.removeClass('addMove');
                 
                 $textWrap9.removeClass('addMove');

                 $textWrap10.removeClass('addMove');
 
               }
               if($(this).scrollTop() >= $history1){
                 if( t==0 ){
                   t=1;
                   $imgWrap1.addClass('addMove');
                   $textWrap1.addClass('addMove');
                 }
               }
               if($(this).scrollTop() >= $history2){
                  $imgWrap2.addClass('addMove');
                  $textWrap2.addClass('addMove');
               }
               if($(this).scrollTop() >= $history3){
                $textWrap3.addClass('addMove');
              }
              if($(this).scrollTop() >= $history4){
                $imgWrap4.addClass('addMove');
                $textWrap4.addClass('addMove');
              }
              if($(this).scrollTop() >= $history5){
                  $imgWrap5.addClass('addMove');
                  $textWrap5.addClass('addMove');
              }
              if($(this).scrollTop() >= $history6){
                $imgWrap6.addClass('addMove');
                $textWrap6.addClass('addMove');
              }
              if($(this).scrollTop() >= $history7){
                $imgWrap7.addClass('addMove');
                $textWrap7.addClass('addMove');
              }
              if($(this).scrollTop() >= $history8){
                $textWrap8.addClass('addMove');
              }
              if($(this).scrollTop() >= $history9){
                $textWrap9.addClass('addMove');
              }
              if($(this).scrollTop() >= $history10){
                $textWrap10.addClass('addMove');
              }
             });
             
        },

        section3Fn:function(){

          var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = { 
          center: new kakao.maps.LatLng(37.57707214410386, 126.89005314504179), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
          };
      
          // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
          var map = new kakao.maps.Map(mapContainer, mapOption); 

          var markerPosition  = new kakao.maps.LatLng(37.57707214410386, 126.89005314504179); 

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
              position: markerPosition
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);
        },

        footerFn:function(){
          var $familyButton = $('.family-button');

          $familyButton.on({
            click:function(){
              $familyButton.toggleClass('onRotate');
            }
          })
        },

        goTopFn:function(){
          var smoothBtn = $('.smoothBtn');
          var $goTopBox = $('#wrap #goTop');
          var t = 0

          smoothBtn.on({
            click:function(e){
              e.preventDefault();
              var url = $(this).attr('href');
              $('html,body').stop().animate({scrollTop: $( url ).offset().top},600);
            }
          });

          $(window).scroll(function(){
            if( $(this).scrollTop()>=1200){
              if(t==0){
                t=1;
                $goTopBox.addClass('addShow');
              }
            }
            else{
              if(t==1){
                t=0;
                $goTopBox.removeClass('addShow');
              }
            }
          });
        }
    } //객체 끝


    brando.init();

})(jQuery);