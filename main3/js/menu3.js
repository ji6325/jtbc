;(function($){

    var jtbc = {     

        init: function(){
            this.section1Fn();
            this.section2Fn();
            this.section3Fn();
            this.footerFn();
        },
        section1Fn:function(){
          var $win     = $(window);
          var $section1= $('#section1');
          var $video   = $('#section1 .video-box .main-video');           
          var $playBtn   = $('#section1 .play-btn');           
          var $pauseBtn   = $('#section1 .pause-btn');           
          var $coverIcon   = $('#section1 .cover-icon');           

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

              $playBtn.on({
                click:function(){
                  $(this).addClass('on');
                  $pauseBtn.addClass('on');
                  $coverIcon.addClass('on');
                  playHz();
                }
              })
              $pauseBtn.on({
                click:function(){
                  $(this).removeClass('on');
                  $playBtn.removeClass('on');
                  $coverIcon.removeClass('on');
                  pauseHz();
                }
              })
              
              function playHz() { 
                $video.get(0).play(); 
              } 

              function pauseHz() { 

                $video.get(0).pause(); 
              
              } 

        },

        section2Fn:function(){
          var $slideWrap = $('#section2 .slide-wrap');
          var $slideW    = 300; 
          var n          = $('#section2 .slide').length-4;
          var cnt        = 0;
          var $slideView = $('#section2 .slide-view');
          var $span = $('#section2 .wrap .gap .container .slide-bar span');


          function mainSlideFn(){
            $slideWrap.stop().animate({left:-$slideW*cnt},600, function(){
              if(cnt>n){
                cnt=18;
              }
              if(cnt<0){
                cnt=0;
              }
            });
          }

          //2. next 카운트 함수
          function nextCountFn(){
            cnt++;
            mainSlideFn();
          }
          //2. prev 카운트 함수
          function prevCountFn(){
            cnt--;
            mainSlideFn();
          }

          var touchStart = 0;
          var touchEnd = 0;
          var mouseDown = 0;
               
               $slideView.on({                
                 mousedown: function(e){
                   mouseDown = 1;
                   e.preventDefault();
                     
                     touchStart = e.clientX; //e.pageX                                
                 },
                 touchstart: function(e){
                   mouseDown = 1;
                   e.preventDefault();
                     
                     touchStart = e.originalEvent.changedTouches[0].clientX; //e.pageX 
                 },
                 mouseup: function(e){
                   mouseDown = 0;
                   e.preventDefault();
 
                     touchEnd = e.clientX;
                     touchSwipeFn();
                 },                      
                 touchend: function(e){
                   mouseDown = 0;
                   e.preventDefault();
 
                     touchEnd = e.originalEvent.changedTouches[0].clientX; //e.pageX ;
                     touchSwipeFn();
                 },                      
                 mouseleave: function(e){
                   e.preventDefault();                        
                   if( mouseDown==1 ){
                       mouseDown = 0;
                       touchEnd = e.clientX;
                       touchSwipeFn();
                   }
                 }
               });
 
               function touchSwipeFn(){
 
                   if( (touchStart-touchEnd) > 0 ){                      
                       if(!$slideWrap.is(':animated')){
                         nextCountFn();
                       }  
                   }
                   if( (touchStart-touchEnd) < 0 ){
                       if(!$slideWrap.is(':animated')){
                         prevCountFn();
                       }  
                   } 
               }
        },

        section3Fn:function(){
          var $contentWrap = $('#section3 .content-wrap');
          var $nav = $('#section3 #nav');
          var $li = $('#section3 #nav li');
          var t=0;

          // 페럴럭스 
          $(window).scroll(function(){

            if( $(window).scrollTop() >= $('.content-wrap').offset().top-800  ){               
              $contentWrap.eq(0).removeClass('on');
              $nav.removeClass('on');
              $li.removeClass('on');
              }  
            if( $(window).scrollTop() >= $('.content-wrap1').offset().top-400  ){               
                $contentWrap.eq(0).addClass('on');
                $contentWrap.eq(1).removeClass('on');
                $li.eq(0).addClass('on');
                $li.eq(1).removeClass('on');
                $nav.addClass('on');
                }        
            if( $(window).scrollTop() >= $('.content-wrap2').offset().top-400  ){               
                $contentWrap.eq(1).addClass('on');
                $contentWrap.eq(0).removeClass('on');
                $contentWrap.eq(2).removeClass('on');
                $li.eq(1).addClass('on');
                $li.eq(0).removeClass('on');
                $li.eq(2).removeClass('on');                   
                }        
            if( $(window).scrollTop() >= $('.content-wrap3').offset().top-400  ){               
                $contentWrap.eq(2).addClass('on');    
                $contentWrap.eq(1).removeClass('on');
                $contentWrap.eq(3).removeClass('on');                
                $li.eq(2).addClass('on');    
                $li.eq(1).removeClass('on');
                $li.eq(3).removeClass('on');                
                }        
            if( $(window).scrollTop() >= $('.content-wrap4').offset().top-400  ){               
                $contentWrap.eq(3).addClass('on');
                $contentWrap.eq(2).removeClass('on');
                $contentWrap.eq(4).removeClass('on');                    
                $li.eq(3).addClass('on');
                $li.eq(2).removeClass('on');
                $li.eq(4).removeClass('on');                    
                }        
            if( $(window).scrollTop() >= $('.content-wrap5').offset().top-400  ){               
                $contentWrap.eq(4).addClass('on');
                $contentWrap.eq(3).removeClass('on');
                $contentWrap.eq(5).removeClass('on');                    
                $li.eq(4).addClass('on');
                $li.eq(3).removeClass('on');
                $li.eq(5).removeClass('on');                    
                }        
            if( $(window).scrollTop() >= $('.content-wrap6').offset().top-400  ){               
                $contentWrap.eq(5).addClass('on');
                $contentWrap.eq(4).removeClass('on');
                $contentWrap.eq(6).removeClass('on');
                $li.eq(5).addClass('on');
                $li.eq(4).removeClass('on');
                $li.eq(6).removeClass('on');
                                    
                }        
            if( $(window).scrollTop() >= $('.content-wrap7').offset().top-400  ){               
                $contentWrap.eq(6).addClass('on');
                $contentWrap.eq(5).removeClass('on');                  
                $li.eq(6).addClass('on');
                $li.eq(5).removeClass('on');                  
                }
              // else{
              //   $contentWrap.removeClass('on');
              // }        
            });  
        },

        footerFn:function(){
          var $familyButton = $('.family-button');

          $familyButton.on({
            click:function(){
              $familyButton.toggleClass('onRotate');
            }
          })
        }
    } //객체 끝


    jtbc.init();

})(jQuery);