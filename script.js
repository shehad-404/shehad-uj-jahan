(function(){
var r=document.documentElement,t="dark";
try{t=localStorage.getItem("theme")||"dark"}catch(e){}
r.setAttribute("data-theme",t);
document.getElementById("theme").onclick=function(){
t=r.getAttribute("data-theme")==="dark"?"light":"dark";
r.setAttribute("data-theme",t);
try{localStorage.setItem("theme",t)}catch(e){}
};
document.getElementById("yr").textContent=new Date().getFullYear();
function v(i){return document.getElementById(i).value}
function mail(s,b){location.href="mailto:b190305010@cse.jnu.ac.bd?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(b)}
document.getElementById("fmsg").onsubmit=function(e){e.preventDefault();mail(v("ms")||"Message from your portfolio",v("mm")+"\n\n— "+v("mn")+" ("+v("me")+")")};
document.getElementById("fmeet").onsubmit=function(e){e.preventDefault();mail("Meeting request: "+v("tn"),"Hello Shehad,\n\nI would like to schedule a "+v("tl")+" meeting.\n\nPreferred date: "+v("td")+"\nPreferred time: "+v("tt")+" ("+v("tz")+")\nPlatform: "+v("tp")+"\n\nTopic: "+(v("tm")||"-")+"\n\n— "+v("tn")+" ("+v("te")+")")};
document.getElementById("td").min=new Date().toISOString().slice(0,10);
})();
document.querySelectorAll(".shot img").forEach(function(i){function ok(){if(i.naturalWidth)i.parentNode.classList.add("has")}if(i.complete)ok();else i.addEventListener("load",ok)});

(function(){var el=document.getElementById("tw");if(!el)return;
var L=["Hi, I\u2019m Md. Shehad Uj Jahan","Skills: Linux \u00b7 HPC \u00b7 PyTorch \u00b7 Forecasting","Skills: React \u00b7 Node.js \u00b7 MongoDB \u00b7 Docker","Interested in work? Let\u2019s talk."];
if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches){el.textContent=L[0];return}
var i=0,j=0,del=false;
function tick(){var s=L[i];el.textContent=s.slice(0,j);var d=del?28:60;
if(!del&&j===s.length){del=true;d=1700}else if(del&&j===0){del=false;i=(i+1)%L.length;d=350}else{j+=del?-1:1}
setTimeout(tick,d)}
tick()})();
