!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),o=null,c=function(){return t.style.backgroundColor="".concat("#".concat(Math.floor(16777215*Math.random()).toString(16)))};e.addEventListener("click",(function(){o=setInterval(c,1e3),e.disabled=!0})),n.addEventListener("click",(function(){clearInterval(o),e.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.c972437a.js.map
