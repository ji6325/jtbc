;(function($){

    var jtbc = {     

        init: function(){
            this.section1Fn();
            this.footerFn();
        },
        section1Fn:function(){
            var $tbody = $('tbody');
            var $pageNumberBox = $('.page-number-box ul');
            var $prevBtn = $('.prev-btn');
            var $nextBtn = $('.next-btn');



            var totalPageNum = 63;
            var total = 313;
            var pageNumList = 10;
            var startNum = 0;
            var endNum = list;
            var pageGroupNum = Math.ceil(totalPageNum / pageNumList);


            var groupCnt = 0;  //그룹페이지 다음화살 클릭시 1씩 증가 카운트 변수
            var groupStartNum = groupCnt * pageNumList;  //그룹 시작번호 0
            var groupEndNum = groupStartNum + pageNumList;  //그룹 끝번호 10  

            var a = [];
            var list = 5;
            var txt = '';

            function ajaxRunFn(){
                $.ajax({
                    url:'./data/board.json',
                    dataType:'JSON',
                    success:function(result){
                        $.each(result.notice,function(idx,obj){
                            a[idx] = [];

                            a[idx][0] = obj.NO
                            a[idx][1] = obj.제목
                            a[idx][2] = obj.날짜
                            a[idx][3] = obj.조회수
                        });

                        function listOutputFn(){
                            txt = '';       //초기화
                            $tbody.empty(); //테이블 내용 삭제

                            for(var i=startNum; i<endNum; i++){
                                txt += '<tr>';
                                for(var j=0; j<=3; j++){
                                    txt += '<td>' + a[i][j] + '</td>';
                                }
                                txt += '</tr>';
                            }
                            $tbody.html(txt);

                            txt = '';
                            totalPageNum = Math.ceil( total / list);
                            pageGroupNum = Math.ceil(totalPageNum / pageNumList); 
                        }

                        listOutputFn();




                        function pageNation(){
                                    
                            $pageNumberBox.html('');
                            txt = '';

                            groupStartNum = groupCnt * pageNumList; //그룹시작번호 = 6 * 10 
                            groupEndNum = groupStartNum + pageNumList; //그룹끝번호 = 60 + 10

                            if( groupEndNum > totalPageNum ){ //그룹의 끝번호가 전체페이지번호보다 크면
                              groupEndNum = totalPageNum;  //끝번호를 전체페이지번호 설정
                            }



                            for(var i=groupStartNum; i<groupEndNum; i++){ //1 ~ 10 페이지번호가 출력
                              if(i % pageNumList == 0){
                                txt += '<li><a href="#" class="page-btn addPage">'+ (i+1) +'</a></li>'
                              }
                              else{
                                txt += '<li><a href="#" class="page-btn">'+ (i+1) +'</a></li>'
                              }                                  
                            }
                            


                            //웹페이지에 로드
                            $pageNumberBox.html( txt );
                            // $pageNumberBox.append( txt );
                            $pageBtn = $('.page-btn');



                            //다음화살버튼/이전화살버튼 클릭시 
                            //그룹 페이지 첫번째 버튼의 페이지번호
                            //가져와서 목록 출력하기
                            startNum = (parseInt($pageBtn.eq(0).text())-1) * list; //(10-1)*5 = 45 시작번호 = 45    
                            endNum = startNum + list; // 45+5 = 50  끝번호 = 50
                            //끝번호가 전체 레코드 갯수 보다 크면
                            if( endNum > total ){
                                endNum = total; //313 전체 갯수
                            }                                            

                            //출력함수 호출 : 페이지 단위로 출력
                            listOutputFn();

                        }
                       
                        setTimeout(pageNation, 10);
                        
                        




                        //좌우 화살 그룹 버튼 클릭 이벤트
                        $prevBtn.on({
                            click:function(event){
                              event.preventDefault();

                              groupCnt--; 
                              if(groupCnt<0){
                                groupCnt=0;
                              }   
                              //그룹 페이지 호출
                              pageNation();

                            }
                        });

                        $nextBtn.on({
                            click:function(event){
                              event.preventDefault();

                              groupCnt++;
                              if(groupCnt>pageGroupNum-1){ //6
                                groupCnt=pageGroupNum-1; //6 화살버튼으로 우측 이동시 7(0~6)
                                return; //마지막 페이지 우측 끝에서 버튼 클릭 취소
                              }   
                            
                              pageNation();                                    
                            }
                        });
                

                        
                        //도큐먼트 로드 클릭 이벤트
                        //버튼을 객체 배열처리 each()
                        $(document).on('mouseenter', '.page-btn', function(){
                            $pageBtn.each(function(idx){
                                $(this).on({
                                  click: function(event){
                                      event.preventDefault();

                                      $pageBtn.removeClass('addPage');
                                      $(this).addClass('addPage');

                                      startNum = (parseInt($(this).text())-1) * list; //(10-1)*5 = 45 시작번호 = 45    
                                      endNum = startNum + list; // 45+5 = 50  끝번호 = 50
                                      //끝번호가 전체 레코드 갯수 보다 크면
                                      if( endNum > total ){
                                          endNum = total; //313 전체 갯수
                                      }                                            

                                      //출력함수 호출 : 페이지 단위로 출력
                                      listOutputFn();

                                  }
                                });
                            });
                        });
                    },
                    error:function(){
                        alert('접속실패')
                    }
                })
            }
            setTimeout(ajaxRunFn, 100);
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