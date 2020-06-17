episodas = function(data){
    var mousedown = false;
    var curdiv = null; // letじゃ駄目
    var buttons = []
    
    let browserWidth = () => {
	if(window.innerWidth){ return window.innerWidth; }  
	else if(document.body){ return document.body.clientWidth; }  
	return 0;  
    };
    
    var browserHeight = function(){  
	if(window.innerHeight){ return window.innerHeight; }  
	else if(document.body){ return document.body.clientHeight; }  
	return 0;  
    };
    
    var showQA = function(){ // n番目の問題と答リストを設定
	let len = selected.length;
	if(len < qas.length){
            let question = qas[len].question;
            $('#question').text(question);
            let answers = qas[len].answers;
            for(var i=0;i<answers.length;i++){
		$('#id'+i).text(answers[i]);
            }
	}

	for(var i=0;i<answers.length;i++){
	    div = $('#id'+i)
	    let o = {}
	    o.x = div.offset().left;
            o.y = div.offset().top;
            o.w = div.width();
            o.h = div.height();
	    buttons[i] = o
	}
    };

    function finish(){ // DASパタン入力終了
        const { ipcRenderer } = window.native; // preload.js 経由で渡されるデータ

        ipcRenderer.send('secret', secretstr())
    }
    
    secretstr = function() {
	var j, ref, results;
	return (function() {
            results = [];
            for (var j = 0, ref = qas.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
            return results;
	}).apply(this).map(function(i) {
            return qas[i].question + qas[i]['answers'][selected[i]];
	}).join('');
    };
    
    function initsize(){
	if($('#contents')[0] == undefined){
	    width = browserWidth();
	}
	else {
	    width = $('#contents').width();
	}
	height = browserHeight();
	for(var i=0;i<answers.length;i++){
            div = $('#id'+i);
            div.css('background-color','#fff');
            div.css('width',width / 7);
            div.css('height',height / 10);
            div.css('font-size',width * 0.03);
	    div.css('color','#000');
	    
            // FlexBoxでセンタリング
            div.css('display','flex');
            div.css('justify-content','center');
            div.css('align-items','center');
	    
            div.css('margin',width / 100);
            div.css('padding',width / 100);
	    div.css('border-style','solid');
            div.css('border-radius',width*0.01);
            div.css('border-color','#000');
	    div.css('border-width','1px');
	}

	$('#question').css('font-size',width * 0.05);
	$('#question').css('margin-top','10px');
    }

    //
    // ClickまたはDragで選択する工夫
    // mouseenterイベントとかがあまり信用できないので自力でやる
    // dasmaker.jsと共通化したいのだが
    //
    function mouseenter(div){
	curdiv = div;
	if(mousedown){
            // curdiv.css('background-color','#f3f3f3');
	    curdiv.css('background-image','url("noise.gif")')
	    w = curdiv.css('width')
	    h = curdiv.css('height')
	    curdiv.css('background-size',`${w} ${h}`)
	    selected.push(curdiv.attr('id').replace(/id/,''))
	}
    }
    
    function mouseleave(div){
	if(mousedown){
            curdiv.css('background-color','#fff');
	    curdiv.css('background-image','');
	    showQA();

	    if(selected.length == qas.length){ // DAS入力終了
		finish();
            }
	}
	curdiv = null;
    }
    
    function mousemove(e){
	if($('#id0')[0] == undefined) return;
	if(! mousedown) return;

	var mousex = (e.pageX ? e.pageX : e.originalEvent.touches[0].pageX);
	var mousey = (e.pageY ? e.pageY : e.originalEvent.touches[0].pageY);

	// これがちょっと遅いかもしれないので改良したい
	//for(var i=0;i<answers.length;i++){
        //    let buttondiv = $('#id'+i);
        //    buttonx = buttondiv.offset().left;
        //    buttony = buttondiv.offset().top;
        //    buttonw = buttondiv.width();
        //    buttonh = buttondiv.height();
        //    if(buttonx < mousex && buttonx+buttonw > mousex &&
        //       buttony < mousey && buttony+buttonh > mousey){
	//	if(!curdiv || (curdiv.attr('id') != buttondiv.attr('id'))){
        //            if(curdiv){
	//		mouseleave(curdiv);
        //            }
        //            mouseenter(buttondiv);
        //            curdiv = buttondiv;
	//	}
	//	return;
        //    }
	//}
	// こんなので速度は変わらない気もする... 無意味かも
	for(var i=0;i<answers.length;i++){
            if(buttons[i].x < mousex && buttons[i].x+buttons[i].w > mousex &&
               buttons[i].y < mousey && buttons[i].y+buttons[i].h > mousey){
		if(!curdiv || (curdiv.attr('id') != ("id"+i))){
                    if(curdiv){
			mouseleave(curdiv);
                    }
		    buttondiv = $('#id'+i);
                    mouseenter(buttondiv);
                    curdiv = buttondiv;
		}
		return;
            }
	}

	if(curdiv){
            mouseleave(curdiv);
	}
    }
    
    var init = function(){
	const s = location.search.replace(/^\?qa=/,'')
	const data = JSON.parse(decodeURIComponent(s))
	
	qas = data['qas'];
	
	curdiv = null;
	mousedown = false;
	selected = [];
	
	$(window).on('resize',initsize);
	
	$('#das').children().remove()
	if(typeof(editor) != 'undefined'){
	    lib.lib.show('#das')
	}

	var center = $('<center>');
	$('#das').append(center);
	$('#das').on('mousemove',mousemove);
	$('#das').on('touchmove',mousemove);
	
	// 問題領域
	var qdiv = $('<div>');
	qdiv.attr('height',100);
	qdiv.css('display','flex');
	qdiv.css('justify-content','center');
	qdiv.css('align-items','center');
	qdiv.attr('id','question');
	center.append(qdiv);

	if(typeof(editor) != 'undefined'){
	    let comment = $('<span>');
	    comment.text('DASパタンを押すかなぞって確認して下さい')
	    center.append(comment)
	}
	
	center.append($('<p>'));

	// 回答領域
	answers = qas[0].answers; // 回答の数は同じということを仮定

	for(var i=0;i<answers.length;i++){
            var div = $('<div>');
            div.css('float','left');
            div.attr('id','id'+i);
            center.append(div);
	    
            div.on('mousedown',function(e){
                e.preventDefault();
                mousedown = true;
                curdiv = null;
                mousemove(e);
            });
            div.on('touchstart',function(e){
                e.preventDefault();
                mousedown = true;
                curdiv = null;
                mousemove(e);
            });
            div.on('mouseup',function(e){
                if(curdiv) mouseleave(curdiv);
                mousedown = false;
                curdiv = null;
            });
            div.on('touchend',function(e){
                if(curdiv) mouseleave(curdiv);
                mousedown = false;
                curdiv = null;
            });
	}
	
	initsize();
	showQA();
    }

    init();

    // ファイル名を サービス名_アカウント と解釈
    //  e.g. Amazon_masui@pitecan.com
    // 拡張機能から参照できるように <body> の属性として登録する
    let m = location.href.match(/\/(\w+_[\w\.@]+)\.html$/)
    if(m){
	data['name'] = m[1]
	$('body').attr('episodata',JSON.stringify(data));
	// console.log($('body').attr('episodata'))
    }
};

exports.episodas = episodas;
