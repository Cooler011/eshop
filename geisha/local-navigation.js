/* Browser navigation adapter. Document layouts and assets are Nintendo's recovered originals. */
(function(){'use strict';var file=location.pathname.split('/').pop(),q=new URLSearchParams(location.search);
function bind(selector,action){document.querySelectorAll(selector).forEach(function(e){if(typeof action==='string'){e.setAttribute('data-local-link',action);if(e.tagName==='A')e.href=action}e.addEventListener('click',function(ev){ev.preventDefault();if(typeof action==='function')action(e);else location.href=action})})}
function go(url){location.href=url}
function back(){if(history.length>1)history.back();else go('index.html#top')}
function panels(ids,chosen){ids.forEach(function(id){var el=document.getElementById(id);if(el){el.hidden=id!==chosen;el.style.display=id===chosen?'':'none'}})}
function current(ids,initial){var selected=q.get('screen');return ids.indexOf(selected)>=0?selected:initial}
function screen(id){var p=new URLSearchParams(location.search);p.set('screen',id);go(file+'?'+p.toString())}
// Destinations follow the archived MenuBar and controller scripts.
bind('#top_link_01:not(.on) > div','index.html#top');bind('#top_link_02:not(.on):not(.off) > div','always01_01.html');bind('#top_link_03:not(.on):not(.off) > div','money01_01.html');bind('#top_link_04:not(.on):not(.off) > div','always02_01.html');bind('#top_link_05 > div',back);
bind('#evt_prepaid','money02_01.html');bind('#evt_card','money03_01.html');bind('#evt_ic_card','money06_01.html');
if(file==='money01_01.html'){var n=document.getElementById('ywc_not');if(n)n.hidden=true;}
if(file==='money02_01.html'){var list=['money02_01','money02_04','money02_02','money02_03','money02_09'];panels(list,current(list,'money02_01'));var img=document.getElementById('sel_img_eu');if(img)img.style.display='';}
if(file==='money03_02.html'){var list=['money03_02','money03_03','money03_04','money03_05'];panels(list,current(list,q.get('seq')==='pass'?'money03_03':'money03_02'));bind('#evt_other','money04_01.html');bind('#evt_use',function(){screen('money03_03')})}
if(file==='money04_01.html'){var ids=['money04_01','money04_02','money04_03','money04_05','money04_06'];var initial=q.get('seq')==='pass'?'money04_06':q.get('seq')==='pass_back'||q.get('seq')==='postal'?'money04_05':'money04_01';panels(ids,current(ids,initial));bind('#money04_ul a',function(el){var type=el.getAttribute('data-card-type');try{sessionStorage.setItem('geisha_card_type',type)}catch(e){}screen('money04_02')});bind('#evt_sec_code',function(){screen('money04_03')});bind('#evt_pass_no','money03_02.html');bind('#evt_pass_yes','money03_02.html');}
if(file==='set04_01.html'){bind('#evt_register','money04_01.html');bind('#evt_update','money04_01.html');var yes=document.getElementById('data_exist'),no=document.getElementById('data_none');if(yes)yes.hidden=true;if(no)no.style.display='';}
if(file==='history04_01.html'){var yes=document.getElementById('data_exist'),no=document.getElementById('data_none');if(yes)yes.hidden=true;if(no)no.style.display='';}
bind('#evt_settlement_law a,#evt_settlement_law','legal04_01.html');bind('#evt_trade_law a,#evt_trade_law','legal03_01.html');bind('#evt_pcard a','money01_01.html'+location.search);bind('#evt_ccard a','money03_01.html'+location.search);bind('#evt_iccard a','money06_01.html'+location.search);bind('#evt_disagree',back);

// Original secondary screen switching, without inventing account responses.
if(file==='set07_01.html')panels(['set07_01','set07_03'],'set07_01');
if(file==='history03_02.html'||file==='history03_03.html'){
 function historyTab(id){panels(['his03_tab01','his03_tab02'],id);}
 historyTab('his03_tab01');
 bind('#his03_li01 p:first-child',function(){historyTab('his03_tab01')});
 bind('#his03_li02 p:first-child',function(){historyTab('his03_tab02')});
}

// Keep original links and hash routes, never substitute reconstructed screens.
document.querySelectorAll('a').forEach(function(a){var h=a.getAttribute('href')||'';if(h.indexOf('./#')===0)a.href='index.html'+h.slice(2);if(!h&&!a.hasAttribute('data-local-link'))a.addEventListener('click',function(e){e.preventDefault()})});
// Existing native form fields stay in place. Submitting needs unavailable service responses.
document.querySelectorAll('form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault()})});
// Source data-message identifiers are retained for the later localization pass.
document.querySelectorAll('[data-message]').forEach(function(e){if(!e.getAttribute('aria-label'))e.setAttribute('aria-label',e.getAttribute('data-message'))});
function fit(){document.body.style.zoom=Math.min(innerWidth/1280,innerHeight/720)}addEventListener('resize',fit);fit();
})();
