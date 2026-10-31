/* Mount recovered Nintendo templates. No replacement layouts or localization. */
(function(){'use strict';var bank=window.GEISHA_TEMPLATES||{},file=location.pathname.split('/').pop();var rootURL=new URL('.',document.currentScript.src);
var util={each:function(a,f){if(Array.isArray(a))a.forEach(f);else if(a)Object.keys(a).forEach(function(k){f(a[k],k)})},contains:function(a,v){return a.indexOf(v)>=0}};
function escape(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function render(name,id,context){var source=bank[name]&&bank[name][id];if(source===undefined)throw Error('Missing original template '+name+'#'+id);var rx=/{{([\s\S]*?)}}/g,m,pos=0,body='var out="";with(context){';while((m=rx.exec(source))){body+='out+='+JSON.stringify(source.slice(pos,m.index))+';';var part=m[1].trim();body+=part[0]==='='?'out+=('+part.slice(1)+');':part[0]==='-'?'out+=escape('+part.slice(1)+');':part;pos=rx.lastIndex;}body+='out+='+JSON.stringify(source.slice(pos))+';}return out;';return new Function('context','_','escape',body)(context||{},util,escape)}
function mount(selector,name,id,context,append){var target=document.querySelector(selector);if(!target)return;if(!append)target.innerHTML='';target.insertAdjacentHTML('beforeend',render(name,id,context));target.dataset.originalTemplate=name+'#'+id;}
window.GeishaOriginalTemplates={render:render,mount:mount};
var emptyMenu={data:{mii:{},wish:null,is_address_available:true,is_lang_selectable:true,is_owned_coupon_available:false,is_club_available:true}};
if(file==='always02_01.html')mount('#always_02_01','search','main',{});
if(file==='always01_01.html'){mount('#wrap','mymenu','main',emptyMenu,true);var rec=document.querySelector('#main-menu .recommend');if(rec)rec.innerHTML=render('mymenu','recommend',{data:{votable:null}});}
if(file==='data03_01.html'||file==='data03_01_redeem.html')mount('#data03_01','aoc_list','wrapper',{is_aoc_purchase:file==='data03_01.html',legal_message_required:false,title_id:''});
if(file==='money06_01.html')mount('#wrap, #wrapper','nfc','money06_01',{max_amount:''},true);
if(file==='money07_01.html')mount('#wrap, #wrapper','nfc','money07_01_01',{transaction_id:'',date:''},true);
// Index controllers originally select these templates by hash route.
if(file==='index.html'){
 var wrap=document.getElementById('wrapper'),top=wrap?wrap.innerHTML:'';
 function route(){var hash=location.hash.slice(1).split('?')[0]||'top';if(!wrap)return;wrap.innerHTML=top;
  if(hash==='top')return;
  if(hash==='redeem')mount('#wrapper','redeem','main',{});
  else if(hash==='news')mount('#wrapper','news','main',{});
  else if(hash==='title')mount('#wrapper','title','main',{});
  else if(hash==='shelf')mount('#wrapper','shelf','main',{});
  else if(hash==='menu')mount('#wrapper','mymenu','main',emptyMenu);
  else return;
  document.dispatchEvent(new Event('geisha:template-mounted'));
 }
 addEventListener('hashchange',route);route();
}
function on(selector,event,fn){document.querySelectorAll(selector).forEach(function(el){if(el.dataset.geishaHook===event)return;el.dataset.geishaHook=event;el.addEventListener(event,fn)})}
function bind(){
 // The following state changes follow Wood.View.Search and Wood.View.Mymenu hooks.
 on('#evt_show_all','click',function(e){e.preventDefault();var ul=document.querySelector('#main-menu .setting > ul');if(ul)ul.style.display='';this.style.display='none'});
 on('#js-help','click',function(e){e.preventDefault();var parent=document.getElementById('wrap')||document.getElementById('wrapper');var view=document.getElementById('main-help');if(!view){parent.insertAdjacentHTML('beforeend',render('mymenu','help',{is_inquiry_available:false}));view=document.getElementById('main-help')}document.getElementById('main-menu').hidden=true;var h=document.getElementById('header-menu');if(h)h.hidden=true;view.hidden=false});
 on('#show-genre,#show-publisher','click',function(e){e.preventDefault();var id=this.id==='show-genre'?'genre_dialog':'publisher_dialog';var main=document.getElementById('always_02_wrapper');if(main)main.hidden=true;document.getElementById(id).style.display='block'});
 on('.dialog-submit','click',function(e){e.preventDefault();document.querySelectorAll('.search-dialog').forEach(function(d){d.style.display='none'});var main=document.getElementById('always_02_wrapper');if(main)main.hidden=false});
 on('input[name="searchType"]','change',function(){var movie=document.getElementById('serach-movie'),title=document.getElementById('search-title');if(movie)movie.style.display=this.value==='movie'?'':'none';if(title)title.style.display=this.value==='movie'?'none':''});
 on('.reset-price','click',function(e){e.preventDefault();document.querySelectorAll('input[name="price_min"],input[name="price_max"]').forEach(function(i){i.value=''})});
 on('.reset-all','click',function(e){e.preventDefault();document.querySelectorAll('#always_02_01 input').forEach(function(i){if(i.type==='checkbox')i.checked=i.value==='0';else if(i.type==='radio')i.checked=i.value==='title';else i.value=''});var m=document.getElementById('serach-movie');if(m)m.style.display='none';var t=document.getElementById('search-title');if(t)t.style.display=''});
 on('.search-submit','click',function(e){e.preventDefault();var params=new URLSearchParams();document.querySelectorAll('#always_02_01 input').forEach(function(i){if(i.name&&((i.type!=='radio'&&i.type!=='checkbox')||i.checked)&&i.value)params.append(i.name,i.value)});location.href='index.html#shelf?'+params.toString()});
 on('#sel_keyword','keydown',function(e){if(e.key==='Enter'){e.preventDefault();location.href='index.html#shelf?freeword='+encodeURIComponent(this.value)}});
 var input=document.getElementById('sel_keyword');if(input)input.disabled=false;
 on('input[name="redeem_num"]','input',function(){var next=document.getElementById('sel_redeem_next');if(next)next.style.display=this.value.length===16?'':'none'});
}
document.addEventListener('geisha:template-mounted',bind);bind();
var back=document.querySelector('#top_link_05 > div');if(back)back.addEventListener('click',function(e){var active=document.querySelector('.search-dialog[style*="display: block"]');var help=document.getElementById('main-help');if(active){e.stopImmediatePropagation();e.preventDefault();document.querySelectorAll('.search-dialog').forEach(function(d){d.style.display='none'});var main=document.getElementById('always_02_wrapper');if(main)main.hidden=false;}else if(help&&!help.hidden){e.stopImmediatePropagation();e.preventDefault();help.hidden=true;var menu=document.getElementById('main-menu'),header=document.getElementById('header-menu');if(menu)menu.hidden=false;if(header)header.hidden=false;}},true);
document.addEventListener('click',function(e){var a=e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href');if(!h||/^(https?:|#)/.test(h))return;var resolved=new URL(h,location.href);var path=decodeURIComponent(resolved.pathname.slice(rootURL.pathname.length));if(resolved.pathname.indexOf(rootURL.pathname)===0&&path.endsWith('.html')&&window.GEISHA_AVAILABLE_PAGES&&window.GEISHA_AVAILABLE_PAGES.indexOf(path)<0){e.preventDefault();a.setAttribute('aria-disabled','true');a.title='Original file not yet recovered: '+path;console.warn('Original Geisha destination is missing:',path);}},true);
})();
