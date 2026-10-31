/* Populate source data-message slots with Nintendo's original English XML values. */
(function(){'use strict';var all=window.GEISHA_ORIGINAL_MESSAGES||{},manual=location.pathname.indexOf('/manual/')>=0;var strings=manual?all.manual:all.interface;if(!strings)return;var translated=new WeakMap(),scheduled=false;
function apply(){scheduled=false;document.querySelectorAll('[data-message]').forEach(function(el){var key=el.getAttribute('data-message');if(Object.prototype.hasOwnProperty.call(strings,key)&&translated.get(el)!==key){translated.set(el,key);el.innerHTML=strings[key];if(el.getAttribute("aria-label")===key)el.removeAttribute("aria-label")}});
var keyword=document.getElementById('sel_keyword');if(keyword&&!keyword.placeholder)keyword.placeholder=strings.top01_01_002||'';
var free=document.querySelector('#always_02_01 input[name="freeword"]');if(free&&!free.placeholder)free.placeholder=strings.always02_01_003||'';
var min=document.querySelector('input[name="price_min"]'),max=document.querySelector('input[name="price_max"]');if(min&&!min.placeholder)min.placeholder=strings.always02_01_015||'';if(max&&!max.placeholder)max.placeholder=strings.always02_01_016||'';
var redeem=document.querySelector('input[name="redeem_num"]');if(redeem&&!redeem.placeholder)redeem.placeholder=strings.top03_01_007||'';
}
apply();new MutationObserver(function(){if(!scheduled){scheduled=true;Promise.resolve().then(apply)}}).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener('geisha:template-mounted',apply);
})();
