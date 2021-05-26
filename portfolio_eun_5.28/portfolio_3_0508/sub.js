'use strict'
// window.onload = loading;
let moveTop = $(window).scrollTop(); // scrollTop() 이 jQuery에서 제공하는 메소드이기 때문에 이와 같이 작성?
let lastTop = $(".content:last")
    .offset()
    .top - 100;
// 스크롤의 위치 값을 담는 전역변수 선언 (함수를 이용해 스크롤 발생 시 마다 초기화)
let scrollCount = Math.ceil(window.scrollY);

// window.onload = scrolling;
window.onload = function () {
    // setTimeout(function(){ }); $(window).scrollTop(); scrollTo(0,
    // document.querySelector("body").offsetTop);
    bghandler();
    scrolling();
    console.log("onload 이벤트");
    scrollTo(0, 0);
};
//
// $(".aboutme__mypic img").click(()=>{   window.location.reload(); })
// window.onload = scrolling; 스크롤 발생 시 이벤트 구현
window.onscroll = () => {
    scrollCount = Math.ceil(window.scrollY);
    $(".scrollNumCheck").text(scrollCount);
    // console.log(scrollCount);
};

// css: onload 시 배경화면 뿌옇게 했다가 어두워지면서 z-index 낮아지도록
function bghandler() {
    $(".bg__img").addClass('blurrr');
};

// $(document).ready = function(){   setTimeout(function(){     scrollTo(0,0);
// },0); }; $(window).on('beforeunload', function(){   $(this).scrollTop(0); });
console.log(lastTop);
// a 태그의 '링크이동 기능' 막기 $(".navbar ul li a").on('click', (e) => {
// e.preventDefault();     console.log(); }); $(".navbar ul
// li").each(function(index){   console.log(index);   $(".navbar ul
// li").on('click', ()=>{     let name_attr = $(".navbar ul
// li").eq(index).children().attr("name");     console.log(name_attr);   }); });
// main navbar의 a태그 클릭 시 화면이동(링크이동) 구현 $(".navbar ul li a").on('click', (e) => {
// let name_attr = "#" + $(e.target).attr("name");     moveTop = $(name_attr)
// .offset()         .top;     moveScreen(); });

$(".navbar ul li").on('click', () => {});

// navbar의 메뉴 클릭시 화면이동 구현 window.onload = () =>{   let imsi = $(".navbar
// li").children().each(function(index){     $(".navbar
// li").eq(index).attr("name");   });   console.log(imsi); }; $(".navbar
// a").each(function(index){          .eq(index)         $(this).eq(index)
// .on('click', (ev) => {             ev.preventDefault();
// console.log($(this).eq(index).attr("name"));
// console.log($("a[name='skills']").text());         }) }); $(".navbar ul
// li").on('click', (e) => {}); .each('click', (ev) => { ev.preventDefault(); })
// .parent("li") .on('click', () => { console.log("클릭");;     const whereToGo =
// $(this).attr("href"); console.log(whereToGo); $(".content").each((index) => {
// var elmSelector = $(this).eq(index); if(elmSelector.attr('id') == )     });
// });

function scrolling() {
    $(".navbar > ul").hide();
    let elm = ".content";
    $(elm).each(function (index) {
        // 개별적으로 Wheel 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            // console.log(event.detail);   0 console.log("deltaY ===> " + event.deltaY);
            // console.log("wheelDelta ===> " + event.wheelDelta);
            e.preventDefault(); // 스크롤 발생 시 브라우저는 페이지를 움직이는데, 그 활동(default action)을 즉시 차단한다.
            let delta = 0;
            // e가 아닌 event를 쓰는 이유는 mousewheel 이벤트(e)가 아닌 window의 event를 가져오기 위함인가?
            if (!event) // event에 대한 null 체크
                event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120; // 어차피 부호만 사용하는 것 같은데 120으로 나누는 이유는?
                //
                // if (window.opera)     delta = -delta;
            }
            // else if (event.detail)  evevnt.detail의 값이 0이므로 false로 인식되어 패스된다.     delta =
            // -event.detail / 3; 스크롤 바의 수직 위치를 가져옴 (스크롤 바의 맨 윗부분 위치를 가져오는 듯) 현재 .content에
            // 의해 집합이 선택되어 있기 때문에 단일 객체만 담는 작업을 해준다.
            var elmSelecter = $(elm).eq(index);
            if (delta < 0) { // 휠을 아래로 내리면 wheelDelta 곧, delta는 음수
                if ($(elmSelecter).next() != undefined) { // 다음 요소가 있다면(존재한다면)...
                    console.log("마우스 내려요~");
                    try {
                        moveTop = $(elmSelecter) // 현재 요소의
                            .next() // 다음 요소의
                            .offset() // 현재 위치(position)의 -- top과 left를 반환
                            .top; // top(위에서 부터의 위치)을 가져와라.
                    } catch (e) {}
                }
            } else { // 휠을 위로 올리면 wheelDelta 곧, delta는 양수
                if ($(elmSelecter).prev() != undefined) {
                    console.log("마우스 올려요~");
                    try {
                        moveTop = $(elmSelecter)
                            .prev()
                            .offset()
                            .top;
                    } catch (e) {}
                }
            }
            moveScreen();
        });
    });
}

function moveScreen() {
    // 화면 이동 0.3초(300)
    $("html,body")
    // .stop()
        .animate({
        scrollTop: moveTop + 'px'
    }, {
        duration: 0,
        complete: function () {}
    });
    // 마지막 페이지에서는 스크롤 아이콘 및 메세지가 바뀌어야 함
    if (moveTop > lastTop) {
        let scrollIcon = $(".i__scroll i");
        console.log("마지막 페이지입니다.");
        $(".i__scroll p").text("맨 위로 올라가기");
        scrollIcon.attr("class", "fas fa-angle-double-up");
        // $(".i__scroll__child").css("color", "rgb(37, 37, 37)");
        // 무한 반짝임 구현 function loop(){   scrollIcon     .animate({opacity:0}, 400)
        // .animate({opacity:1}, 400, loop); }; loop();
    } else {
        $(".i__scroll p").text("아래로 스크롤");
        $(".i__scroll i").attr("class", "fas fa-angle-down");
        // $(".i__scroll__child").css("color", "whitesmoke");
    }
}

// Etc.(마지막 페이지) 클릭 시 스크롤 아이콘 및 메세지 변경 $('a:contains("Etc.")').on('click', ()=>{
// alert($(this).text());   if($(this).val() == "Etc."){     alert("Etc. 클릭"); }
// });
$('a:contains("Etc")').on('click', () => {
    let scrollIcon = $(".i__scroll i");
    console.log("마지막 페이지입니다.");
    $(".i__scroll p").text("맨 위로 올라가기");
    scrollIcon.attr("class", "fas fa-angle-double-up");
    // alert($('a:contains("Etc")').text());
});

$(".i__scroll__child").on('mouseout', () => {
    console.log("마우스 나가요");
    if ($(".i__scroll__child p").text() == "맨 위로 올라가기") {
      $(".i__scroll__child").css("color", "rgb(37, 37, 37)");
    } else {
      $(".i__scroll__child").css("color", "whitesmoke");    
    }
});

$(".i__scroll__child").on('mouseover', () => {
    if ($(".i__scroll__child p").text() == "맨 위로 올라가기") {
        // 이미 i__scroll이라는 클래스 이름을 가지고 있지만 클래스 이름을 더 추가할 수 있다. 이렇게하면 공백으로 분리되어
        // class="i__scroll gotoUp"이 되고 css 속성을 추가로 가질 수 있게 됨.
        $(".i__scroll__child")
            .addClass("gotoUp")
            .css("color", "rgb(206, 0, 144)");
        $(".i__scroll__child")
            .css("transition", "0.3s ease-in")
            .css("transitionProperty", "color");
        console.log($(".i__scroll__child").attr("class"));
        // $(".i__scroll").css("cursor", "pointer");
        $(".i__scroll__child").on('click', () => {
            moveTop = 0;
            moveScreen();
        });
    } else {
        $(".i__scroll__child")
        // gotoUp css속성클래스 제거
            .removeClass("gotoUp")
            // 클릭이벤트에 해당하는 이벤트리스너 제거
            .off('click')
            .css("color", "whitesmoke");
    }
});

let logo__clickCount = 0;
$(".home__logo").on('click', () => {
    if (logo__clickCount % 2 == 0) {
        $(".navbar > ul").slideDown(); //slideDown은 제이쿼리에서 제공하는 메소드임
    } else {
        $(".navbar > ul").slideUp();
    }
    logo__clickCount++;
    console.log("클릭");
});

// 화면 로드 시 이벤트 function loading(){    $(".home__logo > img").fadeIn(1000);
// $(".home__logo > img").css("fadeInUp"); }; 'KIM EUNYOUNG' 로고 클릭 시 메뉴바 나오도록 구현
// alert($(".content:last").attr("class")); 버튼을 누르면 텍스트가 클립보드에 복사되도록 구현
// $(".contact button").each(function(index){   console.log(index);
// $(this).on("click mouseover", () => {     $(this).attr("style", "cursor:
// pointer;");     console.log($(this).text()+"출력완");   });
// $(this).trigger('click');   console.log($(this)); }); $(".contact
// button").on("click", () => { }); $(".contact button").each(function(index){
// console.log($(this).on("click", () => { console.log($(this).next().text());
// copyToClipboard($(this).next().text());     document.execCommand('copy');
// alert( '클립보드에 복사 되었습니다.' );   })); }); function copyToClipboard(element) {
// $(element).next().text().   document.execCommand("copy");    $temp.remove();
// } 버튼을 누르면 클립보드에 복사하기 구현
$('.contact button').on('click', function (e) {
    // a의 텍스트값을 가져옴
    let text = $(this)
        .next()
        .html();
    // 숨겨진 input박스 value값으로 text 변수 넣어줌.
    $('#copytextbox').val(text);
    // input박스 value를 선택
    $('#copytextbox').select();
    document.execCommand('copy');
    alert("클립보드에 복사되었습니다.");
});

window.onscroll = () => {
    moveTop = $(window).scrollTop();
    // 전체 document 상에서 해당 객체의 top 값(top 라인의 위치값)을 반환 스크롤이 내려가면서 about 영역에 진입했을 경우.
    let aboutTop = $("#aboutme")
        .offset()
        .top;
    let skillsTop = $("#skills")
    .offset()
    .top;
    let worksTop = $("#works")
    .offset()
    .top;
    let etcTop = $("#etc")
    .offset()
    .top;
    // top 값 출력해보기
    // console.log("aboutTop: "+aboutTop+", skillsTop: "+skillsTop+", worksTop: "+worksTop+", etcTop: "+etcTop)
    $(".i__scroll__child").css("color","whitesmoke");
    console.log("moveTop: " + moveTop + ", aboutTop: " + aboutTop);
    if (moveTop >= aboutTop && moveTop < skillsTop) {
        console.log("aboutme 창 진입");
        doVisible($(".aboutme__navbar li"));
        doVisible($(".aboutme__mypic"));
        doVisible($(".aboutme__text"));
        doVisible($(".aboutme_history"));
        doVisible($(".aboutme__body h1"));

        $(".aboutme__navbar li").css("animation", "fadeInUp 1s ease");
        $(".aboutme__mypic").css("animation", "fadeInLeft 1s ease");
        $(".aboutme__text").css("animation", "fadeInRight 1s ease");
        $(".aboutme_history").css("animation", "fadeIn 1s ease");
        // $(".i__scroll__child").css("color","whitesmoke");
        // colorChange($(".i__scroll__child"), "whitesmoke");
    }
    if(moveTop>=skillsTop-100 && moveTop < worksTop){
      fillGauge();
    }
    if(moveTop >= worksTop-100 && moveTop < etcTop){
      console.log("Works창 진입");
      doVisible($(".works__gallery"));
      $(".works__gallery").css("animation", "fadeInUp 1s ease");
    }
    if (moveTop >= etcTop+60){
      console.log("마지막 페이지");
      $(".i__scroll__child").css("color","rgb(37, 37, 37");
    }
};

function doHidden(tag) {
    // $(tag).css("visibility", "hidden"); $(tag).css("opacity", 0);
    // $(tag).css("transition", "1s ease"); $(tag).css("transitionProperty",
    // "visibility, opacity");
    tag.css("visibility", "hidden");
    tag.css("opacity", 0);
    tag.css("transition", "1s ease");
    tag.css("transitionProperty", "visibility, opacity");
};
function doVisible(tag) {
    // $(tag).css("visibility", "visible"); $(tag).css("opacity", 1);
    // $(tag).css("transition", "1s ease"); $(tag).css("transitionProperty",
    // "visibility, opacity");
    tag.css("visibility", "visible");
    tag.css("opacity", 1);
    tag.css("transition", "1s ease");
    tag.css("transitionProperty", "visibility, opacity");
};

function colorChange(tag, color) {
    tag.css("transition", "3s ease");
    tag.css("transitionProperty", "color");
    tag.css("color", color);
};


// percent만큼 게이지가 올라가도록 이벤트 구현하는 함수
function fillGauge(){
      $(".percent").each((index)=>{
        // console.log(index+$(".percent").eq(index).text());
        // console.log($(".percent").eq(index).text().includes(prcnt));
        // console.log(Number($(".percent").eq(index).text().substr(0,2)));
        // 제이쿼리 객체의 텍스트 노드에 입력된 숫자를 읽어와 그만큼 게이지를 채우도록 구현
        let percent = Number($(".percent").eq(index).text().substr(0,2));
        let degree = percent/200;
        // console.log(degree);
        let str = "rotate("+degree+"turn)";
        // console.log("percent===> "+percent+", degree===> "+degree+", str===> "+str);
        $(".gauge__c").eq(index).css("transform", str);
        // $(".gauge__c").eq(index).css("transform", "rotate(30deg)");
        // $(".gauge__c").eq(index).css("transform", "rotate(0.5turn)");
      });
}

// 프로젝트 이미지에 마우스 오버 시(hover) 이벤트 구현
$(".project__hover").each(function(index){
  $(".project__hover").eq(index).on('mouseover', ()=>{
    // console.log("마우스 오버"+$(".project__hover p").eq(index).text());
    doVisible($(".project__hover p").eq(index));
  });
  $(".project__hover").eq(index).on('mouseout', ()=>{
    doHidden($(".project__hover p").eq(index));
  });
});