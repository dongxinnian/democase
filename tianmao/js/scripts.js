$(function () {
    winResize();
    $('.right-nav-lists').mouseover(function () {
        $('.right-nav-lists').css('right', 0);
    });
    $('.right-nav-lists').mouseout(function () {
        if (icr < 0) {
            $('.right-nav-lists').css('right', '-' + $('.rn-list').width() + 'px');
        }
    });

    var indicator = -1;
    $('.carousel-indicator li').click(function () {
        indicator = $('.carousel-indicator li').index($(this));
        carouselMove(indicator);
    });
    var timer = setInterval(function () {
        indicator++;
        if (indicator == 6) {
            indicator = 0;
        }
        carouselMove(indicator);
    }, 2000);

    $('#myCarousel').mouseover(function () {
        clearInterval(timer);
    });
    $('#myCarousel').mouseout(function () {
        timer = setInterval(function () {
            indicator++;
            if (indicator == 6) {
                indicator = 0;
            }
            carouselMove(indicator);
        }, 2000);
    });

    function carouselMove(i) {
        $('.carousel-img img').css('opacity', '0');
        $('.carousel-img img').eq(i).css('opacity', '1');
        $('.carousel-indicator li').css('background', 'url(images/c1.png)');
        $('.carousel-indicator li').eq(i).css('background', 'url(images/c2.png)');
        switch (i) {
        case 0:
            $('#Carousel').css('background', 'rgb(213, 49, 0)');
            break;
        case 5:
            $('#Carousel').css('background', 'rgb(1, 150, 128)');
            break;
        default:
            $('#Carousel').css('background', 'rgb(232, 232, 232)');
            break;
        }
    }
    $(document).scroll(function () {
        var ist = parseInt($(document).scrollTop());
        var imo = parseInt($('.myown').offset().top);
        var icr1 = parseInt($('#cr-1').offset().top);
        var icr2 = parseInt($('#cr-2').offset().top);
        var icr3 = parseInt($('#cr-3').offset().top);
        var icr4 = parseInt($('#cr-4').offset().top);
        var icr5 = parseInt($('#cr-5').offset().top);
        var icr6 = parseInt($('#cr-6').offset().top);
        var icr7 = parseInt($('#cr-7').offset().top);
        var icr8 = parseInt($('#cr-8').offset().top);
        if (ist >= imo) {
            $('.top-searchbox').css('top', '0');
        } else {
            $('.top-searchbox').css('top', '-50px');
            $('.top-searchbox .search-result-lists').hide();
        }
        $('.cr-nav li').css('background', 'rgba(0, 0, 0, 0.6)');
        $('.cr-nav li').eq(0).css('background', '#DD2727');
        $('.cr-nav li').eq(9).css('background', 'rgba(0, 0, 0, 0.3)');
        if (ist >= icr1 - 1000) {
            $('.cr-nav').css({
                'width': '36px',
                'height': '378px'
            });
        } else {
            $('.cr-nav').css({
                'width': '0',
                'height': '0'
            });
        }
        console.log($('.cr-nav').css('left'));
        if (ist >= icr1 - 400 && ist < icr2 - 400) {
            $('.cr-nav li').eq(1).css('background', 'rgb(100, 195, 51)');
        }
        if (ist >= icr2 - 400 && ist < icr3 - 400) {
            $('.cr-nav li').eq(2).css('background', '#0AA6E8');
        }
        if (ist >= icr3 - 400 && ist < icr4 - 400) {
            $('.cr-nav li').eq(3).css('background', '#EA5F8D');
        }
        if (ist >= icr4 - 400 && ist < icr5 - 400) {
            $('.cr-nav li').eq(4).css('background', '#F15453');
        }
        if (ist >= icr5 - 400 && ist < icr6 - 400) {
            $('.cr-nav li').eq(5).css('background', '#19C8A9');
        }
        if (ist >= icr6 - 400 && ist < icr7 - 400) {
            $('.cr-nav li').eq(6).css('background', '#F7A945');
        }
        if (ist >= icr7 - 400 && ist < icr8 - 400) {
            $('.cr-nav li').eq(7).css('background', 'black');
        }
        if (ist >= icr8 - 400) {
            $('.cr-nav li').eq(8).css('background', 'black');
        }
    });

    $('.cr-nav a').click(function () {
        var index = $('.cr-nav a').index($(this));
        var st = 0;
        if (index < 8) {
            st = $('.cr').eq(index).offset().top - 50;;
        }
        //        console.log($(window).scrollTop());
        //        console.log($(document).scrollTop());
        //        console.log($(document.documentElement).scrollTop());
        //        console.log($(document.body).scrollTop());
        var db = document.documentElement.scrollTop ? document.documentElement : document.body;
        $(db).animate({
            scrollTop: st
        }, 400);
    });

    $('.search-input input').bind('keyup keydown focus', function () {
        var searchText = $(this).val();
        $('.search-input input').val(searchText);
        var that = this;
        if (searchText == '') {
            $('.search-result-lists').hide();
        } else {
            $(this).parent().find('.search-result-lists').show();
        }
        $('.search-input').attr('action', 'https://list.tmall.com/search_product.htm? ');

        $.ajax({
            type: 'GET',
            url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + searchText + '&callback=cb&area=b2c',
            dataType: "jsonp",
            //            jsonp: 'cb',
            success: function (data) {
                var data = data.result;
                for (var i = 0; i < data.length; i++) {
                    $(that).parent().find('a').eq(i).attr('href', 'https://list.tmall.com/search_product.htm?q=' + data[i][0]);
                    data[i][0] = data[i][0].substr(searchText.length);
                    $(that).parent().find('.input-keyword').eq(i).html(searchText);
                    $(that).parent().find('.search-suggest').eq(i).html(data[i][0]);
                    $(that).parent().find('a').eq(i).find('span').eq(2).html('约' + data[i][1] + '条搜索结果');
                }
                $(that).parent().find('a').eq(10).find('span').eq(0).html('找' + '“' + searchText + '”' + '相关' + '<b>店铺<b>');
            },
        });
    });
    $('.fb-cs-upper').hover(function () {
        $('.fb-cs-upper img').css('opacity', 0);
        $(this).find('img').css('opacity', 1);
        var index = $('.fb-cs-upper').index($(this));
        $('.fb-cm').css('left', '-' + $('.fb-cm-upper').width() * index + 'px');
    });
    $('.fb-cs-left').click(function () {
        $('.fb-cs-left').css('display', 'none');
        $('.fb-cs-right').css('display', 'block');
        $('.fb-cs').css('left', 0);
    });
    $('.fb-cs-right').click(function () {
        $('.fb-cs-right').css('display', 'none');
        $('.fb-cs-left').css('display', 'block');
        $('.fb-cs').css('left', '-' + $('.fb-carousel-slideshow').width() + 'px');
    });

    function Osl(i) {
        this.iNum = -1;
        this.i = i;
    }
    var osl0 = new Osl(0);
    var osl1 = new Osl(1);
    var osl2 = new Osl(2);
    var osl3 = new Osl(3);
    var osl4 = new Osl(4);
    var osl5 = new Osl(5);
    setInterval(function () {
        scrollList(osl0);
        scrollList(osl1);
        scrollList(osl2);
        scrollList(osl3);
        scrollList(osl4);
        scrollList(osl5);
    }, 2000);

    function scrollList(obj) {
        var lih = parseInt($('.fb-cf-lists').eq(obj.i).find('li').css('height'));
        obj.iNum++;
        console.log(obj.iNum);
        if (obj.iNum == $('.fb-cf-lists').eq(obj.i).find('li').length) {
            $('.fb-cf-lists').eq(obj.i).find('ul').css('top', 0);
            obj.iNum = 0;
        }
        $('.fb-cf-lists').eq(obj.i).find('ul').css('top', '-' + obj.iNum * lih + 'px');
    }
});

$(window).resize(winResize);

var icr = 0;

function winResize() {
    if ($(window).width() <= $('.container').width()) {
        $('.container-fluid').css('width', $('.container').css('width'));
    } else {
        $('.container-fluid').css('width', $(window).width() + 'px');
    }
    $('.rn-ul').css('height', $(window).height());
    var irn = parseInt($(window).height()) - 450;
    $('.rn-lists-bottom').css('marginTop', irn * 0.5 + 'px');
    $('.rn-ul').css('paddingTop', irn * 0.5 + 'px');
    icr = ($(window).width() - $('.container').width()) / 2 - $('.cr-nav li').width() - 8;
    console.log(icr);
    if (icr >= 0) {
        $('.cr-nav').css('left', 0.9 * icr + 'px');
        $('.right-nav-lists').css('right', 0);
    } else {
        $('.cr-nav').css('left', '-' + $('.cr-nav li').outerWidth() + 'px');
        $('.right-nav-lists').css('right', '-' + $('.rn-list').width() + 'px');

    }
}

