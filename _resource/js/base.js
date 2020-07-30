// console.log('read');

/*======================================================
初期化
======================================================*/
$(window).load(function() {

	var host = location.hostname;
	// base_url = "https://www.modern-blue.com/ec/cmHeaderSearchProduct/doSearchProduct/cmHeader/%20/%20/1/%20?wd=";

	if (host.indexOf("modern-blue.com") != -1) {
		base_url = "https://shop.modern-blue.com";
		shop = "mb";
	} else if (host.indexOf("rakuten.ne.jp") != -1) {
		base_url = "https://item.rakuten.co.jp/mb/";
		shop = "rk";
	} else if (host.indexOf("shopping.geocities.jp") != -1) {
		base_url = "https://shopping.geocities.jp/mb-y/yh/";
		shop = "yh";
	} else if (host.indexOf("localhost") != -1) {
		base_url = "https://shop.modern-blue.com";
		shop = "mb";
	} else {
		base_url = "https://item.rakuten.co.jp/mb/";
		shop = "rk";
	}

	$(".shop__url").attr("href", base_url);

	// GAタグの読み込み
	if (shop == "mb") {
		// console.log("本店");
		/*$.ajax({
			url: 'assets/js/ga.min.js',
			dataType: 'script',
			cache: false
		});*/
	} else {
		// console.log("その他");
	};
	// SNSボタンの表示
	if (shop == "mb") {
		$(".sns").show();
	};

});

/*======================================================
ナビゲーションによるスクロール
======================================================*/
$(function() {
	// $('a').click(function() {
	$('a[href^="#"]').click(function() {

		var speed = 500;
		var href= $(this).attr("href");//移動先を取得
		var target = $(href == "#" || href == "" ? "html" : href);
		var adjust = 80;

		// Colorbox inline HTML表示用
		if (href == '#inline_content') {
			return true;
		}

		if ($('.header__cont[data-cat=pc]').is(':hidden') && $('.menu').is(':visible')) {
			$('.menu').slideToggle();
			$('.toggle').removeClass('active');
			adjust -= 40;
		}

		var position = target.offset().top - adjust;//移動先を数値で取得、メニューの高さ分を差し引く
		$("body, html").animate({scrollTop:position}, speed, "swing");

		return false;
	});
});

/*======================================================
トップに戻るボタン
======================================================*/
$(function(){
	var topBtn = $("#totop");
	$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			topBtn.fadeIn('fast');
		} else {
			topBtn.fadeOut('fast');
		}
	});
});

/*======================================================
スライダー
======================================================*/
$(function() {
	$('.list__wrap').slick({
		infinite: true,
		slidesToShow: 1,
 		slidesToScroll: 1,
		arrows: true,
		dots: false,
		adaptiveHeight: true,//高さを自動可変
		//vertical: true,//縦スクロールにするか
		asNavFor: '.tabs',
		responsive: [{
			breakpoint: 415,//width:415px以下(SM)
				settings: {
					// variableWidth: false,
					arrows: false,
					// dots:true,
				}
			}/*,
			{
			breakpoint: 415,//width:415px以下(SP)
				settings: {
					variableWidth: false,
				}
			}*/
		]
	});
	$('.tabs').slick({
		infinite: false,
		slidesToShow: 2,//表示するカテゴリーの数に合わせて変更
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.list__wrap',
		dots: false,
		// centerMode: true,
		focusOnSelect: true
	});
});

/*======================================================
フィルタリング
======================================================*/
$(function() {
	$('#tags .tag:not(.a)').hide();// 初期表示はイニシャルAのみを表示

	$("#btns .btn.active").click(function() {
		// console.log(this);
		var initial = this.children[0].className;
		// console.log(initial);
		$('#tags .tag').hide();
		if (initial == "all") {
			$('#tags .tag').fadeIn();
		} else {
			$('#tags .' + initial).fadeIn();
		}
	});
});

/*======================================================
メニューの表示/非表示
======================================================*/
$(function(){
	$('.toggle').click(function(){
		$('.header__menu').slideToggle("fast");
		$(this).toggleClass('active');
	});
});

/*======================================================
検索
======================================================*/
$('.onSearch').on('click', function(e){
	// var search_wd = encodeURIComponent('2019年秋冬新作 ' + $(this).siblings().val());

// console.log(shop);

	if (shop == "mb") {
		var unicodeText = '20年秋冬 ' + $(this).siblings().val();
		var unicodeArray = str2Array(unicodeText);
		function str2Array(str) {
			var array = [], i, il = str.length;
			for (i = 0; i < il ; i++) {
				array.push(str.charCodeAt(i));
			}
			return array;
		}

		var sjisArray = Encoding.convert(unicodeArray, 'SJIS', 'UNICODE');
		var search_wd = Encoding.urlEncode(sjisArray);
	} else {
		var search_wd = encodeURIComponent('2020年秋冬新作 ' + $(this).siblings().val());
	}

	if (shop == "mb") {
		var open_url = "https://shop.modern-blue.com/view/search?search_keyword=" + search_wd;
	} else if (shop == "rk") {
		var open_url = "https://search.rakuten.co.jp/search/mall/" + search_wd + "/?sid=195888";
	} else if (shop == "yh") {
		var open_url = "https://store.shopping.yahoo.co.jp/mb-y/search.html?p=" + search_wd + "#CentSrchFilter1";
	}

	// window.location.href = base_url + wd;
	// open(base_url + search_wd, '_blank');
	open(open_url, '_blank');
});

/*======================================================
クリックして電話をPCで無効
======================================================*/
var ua = navigator.userAgent.toLowerCase();
var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);

if (!isMobile) {
    $('a[href^="tel:"]').on('click', function(e) {
        e.preventDefault();
    });
}
