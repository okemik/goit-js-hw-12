import{S as y,i as n,a as b}from"./assets/vendor-BLPZKqeQ.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const u=document.querySelector(".search-form"),m=document.querySelector(".gallery"),c=document.getElementById("load-more-btn"),L=document.querySelector(".loader");let d="",a=1;const f=20;let p=0;const v=new y(".gallery a",{captionsData:"alt",captionDelay:250});u.addEventListener("submit",async t=>{if(t.preventDefault(),d=u.elements.searchQuery.value.trim(),a=1,m.innerHTML="",c.classList.add("hidden"),!d)return n.warning({message:"Please enter a search term.",position:"topRight"});await g()});c.addEventListener("click",async()=>{a++,await g()});async function g(){try{h(!0);const t=await b.get("https://pixabay.com/api/",{params:{key:"50752157-0e570532136d69fa984569dbb",q:d,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:f}}),{hits:s,totalHits:o}=t.data;if(p=o,s.length===0&&a===1){n.error({message:"No images found. Try another search.",position:"topRight"});return}w(s),v.refresh();const i=Math.ceil(p/f);a>=i?(c.classList.add("hidden"),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):c.classList.remove("hidden"),a>1&&P()}catch{n.error({message:"Failed to fetch images.",position:"topRight"})}finally{h(!1)}}function w(t){const s=t.map(o=>`
      <div class="photo-card">
        <a href="${o.largeImageURL}">
          <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${o.likes}</p>
          <p><b>Views:</b> ${o.views}</p>
          <p><b>Comments:</b> ${o.comments}</p>
          <p><b>Downloads:</b> ${o.downloads}</p>
        </div>
      </div>
    `).join("");m.insertAdjacentHTML("beforeend",s)}function h(t){L.classList.toggle("hidden",!t)}function P(){const t=document.querySelector(".gallery .photo-card");if(t){const s=t.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
