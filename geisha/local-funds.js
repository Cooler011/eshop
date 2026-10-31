/* Offline funds demonstration. Payment fields never leave this document or enter storage. */
(function(){'use strict';
var file=location.pathname.split('/').pop(),store;try{store=GeishaStore}catch(e){}function get(k,d){try{return store.getItem('demo_'+k)||d}catch(e){return d}}function set(k,v){try{store.setItem('demo_'+k,v)}catch(e){}}
var carry=new URLSearchParams(location.search);['amount','balance','last_added','card_type'].forEach(function(k){if(get(k,null)===null&&carry.has('demo_'+k))set(k,carry.get('demo_'+k))});
var amount=Number(get('amount','10')),balance=Number(get('balance','0'));function money(n){return '$'+n.toFixed(2)}function go(s){location.href=new URL(s,location.href).href}function text(id,s){var e=document.getElementById(id);if(e){e.removeAttribute('data-message');e.textContent=s}}function click(sel,fn){document.addEventListener('click',function(e){if(e.target.closest(sel)){e.preventDefault();e.stopImmediatePropagation();fn(e.target.closest(sel))}},true)}function button(parent,id,label,fn){if(!parent)return;var p=document.createElement('p');p.className='btn_c';var a=document.createElement('a');a.className='btn_002 se';a.href='#';a.id=id;a.textContent=label;p.appendChild(a);parent.appendChild(p);click('#'+id,fn)}function panel(id){['money04_01','money04_02','money04_03','money04_05','money04_06'].forEach(function(k){var e=document.getElementById(k);if(e){e.hidden=k!==id;e.style.display=k===id?'':'none'}})}
text('balance',money(balance));document.addEventListener('click',function(e){var a=e.target.closest('#ft_navi [data-local-link]');if(!a)return;var h=a.getAttribute('data-local-link')||a.getAttribute('href');if(!h||h==='#'||/^(https?:|javascript:)/.test(h))return;e.preventDefault();e.stopImmediatePropagation();go(h)},true);
if(file==='money03_01.html'||file==='money06_01.html'){
 var ul=document.getElementById('sel_amount');[10,20,50,100].forEach(function(n){var li=document.createElement('li'),a=document.createElement('a');a.className='btn_002 se';a.href='#';a.textContent=money(n);if(balance+n>200){a.classList.add('btn_not_buy');a.setAttribute('aria-disabled','true')}a.onclick=function(e){e.preventDefault();if(balance+n>200)return;set('amount',n);go('money04_01.html')};li.appendChild(a);ul.appendChild(li)});text('sel_replace','You cannot add an amount that would cause your balance to exceed $200.00.');
}
if(file==='money04_01.html'){
 click('#money04_ul a',function(a){set('card_type',a.dataset.cardType);go('money04_01.html?screen=money04_02')});
 var adult=document.querySelector('#money04_01 > .g_note');if(adult)adult.remove();
 var type=get('card_type','VISA').toLowerCase();if(type==='master')type='master';var logo=document.getElementById('sel_img_'+type);if(logo)logo.style.display='';
 document.querySelectorAll('iframe').forEach(function(e){e.remove()});
 var rows=document.querySelectorAll('#money04_02_dl dd');
 rows.forEach(function(dd,i){dd.style.position='relative';var input=document.createElement('input');input.type='text';input.autocomplete='off';input.className='textbox';input.setAttribute('aria-label',['Dummy card number','Dummy expiration date','Dummy security code'][i]);input.style.cssText='width:'+(i===0?'320':'130')+'px;height:42px;font-size:25px;box-sizing:border-box';dd.appendChild(input);if(i===1){input.style.width='70px';input.setAttribute('aria-label','Expiration month');var sep=document.createElement('span');sep.textContent=' /20 ';dd.appendChild(sep);var year=input.cloneNode();year.setAttribute('aria-label','Expiration year');dd.appendChild(year)}});
 var help=document.querySelector('#money04_02_dl .btn_wrapper');if(help){var a=document.createElement('a');a.className='btn_002 se';a.href='legal06_01.html';a.textContent='Credit-Card Security Statement';help.appendChild(a)}
 click('#evt_reg_card',function(){go('money04_01.html?screen=postal')});
 if(new URLSearchParams(location.search).get('screen')==='postal'){
 panel('money04_02');var host=document.getElementById('money04_02');host.classList.add('demo-postal');text(document.querySelector('#header_common h1')?.id||'nonexistent','');var heading=document.querySelector('#header_common h1');if(heading){heading.removeAttribute('data-message');heading.textContent='Credit-Card-Address Settings'}host.innerHTML='<div id="simple_box"><p class="lf bd_l">To verify your credit-card information, please enter the zip code of the card&#39;s billing address.</p></div><input class="textbox" aria-label="Dummy ZIP code" placeholder="Enter your zip code." autocomplete="off">';button(host,'demo_zip_ok','OK',function(){go('money04_01.html?screen=money04_05')});
 }
 click('#evt_pass_no',function(){go('money03_02.html?screen=money03_04')});
 click('#evt_pass_yes',function(){set('card_saved','1');go('money04_01.html?screen=money04_06')});
 button(document.getElementById('money04_06'),'demo_pass_ok','OK',function(){go('money03_02.html?screen=money03_04')});
}
if(file==='money03_02.html'){
 document.querySelectorAll('iframe').forEach(function(e){e.remove()});text('sel_adding_amount',money(amount));
 click('#evt_add',function(){var current=Number(get('balance','0'));if(current+amount>200)return;set('last_added',amount);set('balance',Math.round((current+amount)*100)/100);go('money03_05.html')});
}
if(file==='money03_05.html'){
 var added=Number(get('last_added','0'));text('sel_replace','Added '+money(added)+'.');text('sel_add_amount',money(added));text('sel_post_balance',money(balance));click('#evt_ok',function(){go('money01_01.html')});click('#sel_receipt',function(){go('history05_01.html?demo=1')});
}
if(file==='history05_01.html'&&new URLSearchParams(location.search).has('demo')){
 var host=document.getElementById('contents_common');if(host){host.innerHTML='<h2>View Receipt</h2><dl id="flow_dl" class="clearfix"><dt>Funds Added:</dt><dd>'+money(Number(get('last_added','0')))+'</dd><dt>Balance:</dt><dd>'+money(balance)+'</dd></dl>';button(host,'demo_receipt_ok','OK',function(){history.back()})}
}
})();

(function(){var style=document.createElement('style');style.textContent=`
#sel_amount.btn_2p{display:grid!important;grid-template-columns:1fr 1fr;gap:20px;margin:30px 0;padding:0;width:100%}
#sel_amount.btn_2p>li{float:none!important;width:auto!important;margin:0!important;list-style:none}
#sel_amount.btn_2p>li>a{display:flex!important;align-items:center;justify-content:center;width:100%!important;box-sizing:border-box;height:78px}
#money03_01 #sel_replace{max-width:650px;margin:20px auto;text-align:center}
#money04_05 .btn_2p{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0;margin-top:48px}
#money04_05 .btn_2p>li{float:none!important;width:auto!important;margin:0!important;list-style:none}
#money04_05 .btn_2p a{width:100%!important;box-sizing:border-box;min-height:150px;display:flex;align-items:center;justify-content:center}
#money04_02_dl .btn_wrapper{display:flex;gap:16px;clear:both;padding-top:18px}
#money04_02_dl .btn_wrapper>a{width:50%!important;box-sizing:border-box;font-size:24px;padding:0 8px;display:flex;align-items:center;justify-content:center;min-height:78px}
#money04_02_dl dd{display:flex;align-items:center;justify-content:flex-end;gap:5px}
#money04_02.demo-postal>.textbox{display:block;width:92%!important;height:74px!important;margin:100px auto 28px!important;box-sizing:border-box;font-size:28px!important;padding:12px 22px;text-align:left}
#money04_02.demo-postal #simple_box{display:block!important;height:auto!important;min-height:0!important;width:auto!important;box-sizing:border-box;padding:140px 30px 0!important;margin:0!important}
#money04_02.demo-postal #simple_box p{margin:0!important}
#money04_02.demo-postal>.btn_c{margin-top:0!important}
#money04_06>.textbox{position:relative;top:-24px;margin-bottom:0!important}
#money04_06>.btn_c{margin-top:0!important}
`;document.head.appendChild(style)})();
