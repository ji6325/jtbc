;(function($){

    var jtbc = {     

        init: function(){
            this.section1Fn();
            this.section2Fn();
            this.section3Fn();
            this.footerFn();
        },
        section1Fn:function(){
          var $slide     = $('#section1 .slide');
          var $window    = $(window);
          var $winW      = $(window).width();
          var $winH      = $(window).height();
          var $slideWrap = $('#section1 .slide-wrap');
          var $nextBtn = $('#section1 .next-btn');
          var $prevBtn = $('#section1 .prev-btn');
          var $pauseBtn = $('#section1 .pause-btn');
          var $section1  = $('#section1');    
          var cnt        = 0;
          var n          = $('#section1 .slide').length;
          var setId      = null;
          var setId2     = null;
          var $textC     = $('.textC');
          

          function resizeFn(){
            $winW = $(window).width();                                
            $slide.css({width:$winW});
            $winH = $(window).height();

            $section1.css({width:$winW, height:$winH});
          }

          resizeFn();
          setTimeout(resizeFn, 100);

          $window.resize(function(){                
            setTimeout(resizeFn,100);
          });

          function mainNextSlideFn(){
            $slide.css({ zIndex:1 });
            // 현재 첫번째 슬라이드(0)이면 이전슬라이드는 마지막 슬라이드(2)
            $slide.eq( cnt==0 ? n-1 : cnt-1 ).css({ zIndex:2 }); //이전슬라이드 cnt-1
            $slide.eq(cnt).css({ zIndex:3 }).stop().animate({opacity:0},0).animate({opacity:1},2000);   //현재슬라이드 cnt
            $textC.html('0' + (cnt+1));
          }

          function mainPrevSlideFn(){
            $slide          .css({ zIndex:1 }).animate({opacity:1});;
            $slide.eq(cnt)  .css({ zIndex:2 });
            $slide.eq(cnt==2?0:cnt+1).css({ zIndex:3 }).stop().animate({opacity:1},0).animate({opacity:0},2000);;
            console.log(cnt);
          }

          function nextSlidCountFn(){
            cnt++;
            if(cnt>8){
              cnt=0;
            }
            mainNextSlideFn();
        }
        
        function prevSlidCountFn(){
            cnt--;
            if(cnt<0){
              cnt=8;
            }
            mainPrevSlideFn(); //메인 이전 슬라이드 함수 호출
        }
        $section1.swipe({
          swipeLeft:function(e){ //오른쪽에서 왼쪽으로 터치
            e.preventDefault();
            puaseTimerFn();
            if( !$slideWrap.is(':animated')){
              nextSlidCountFn();
            }
          },
          swipeRight:function(e){ //왼쪽에서 오른쪽으로 터치
            e.preventDefault();
            puaseTimerFn();
            if( !$slideWrap.is(':animated')){
              prevSlidCountFn();
            }
          }
        });

        function autoTimerFn(){
          setId = setInterval(nextSlidCountFn, 4000);
          
        }

        autoTimerFn();

        //7. 슬라이드에서 이벤트(터치, 클릭) 발생 시 자동 타이머를 일시중지
        function puaseTimerFn(){
          var t = 0;
          clearInterval(setId);
          clearInterval(setId2); //초기화
          // 5초동안 아무 이벤트 없으면 다시 자동 타이머 실행
          setId2 = setInterval(function(){
            t++;
            if( t>=5 ){   
              t = 0;                 
              clearInterval(setId2);   
              clearInterval(setId);  
              nextSlidCountFn();               
              autoTimerFn();
            }
          }, 1000);
        }

        $nextBtn.on({
          click:function(){
            puaseTimerFn();
            if( !$slideWrap.is(':animated')){
              nextSlidCountFn();
            }
          }
        });
        $prevBtn.on({
          click:function(){
            puaseTimerFn();
            if( !$slideWrap.is(':animated')){
              prevSlidCountFn();
            }
          }
        });

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
                cnt=10;
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