import{a as L,S as w,i}from"./assets/vendor-CVWx-W0A.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();async function f(s,o=1){return(await L.get("https://pixabay.com/api/",{params:{key:"56333257-5e55ad218ba23a27bfc212fa1",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}const y=document.querySelector(".gallery"),m=document.querySelector(".loader"),b=new w(".gallery a",{captionsData:"alt",captionDelay:250});function v(){y.innerHTML=""}function h(s){const o=s.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}">
          <img
            src="${t.webformatURL}"
            alt="${t.tags}"
          />
        </a>

        <div>
          <p>Likes: ${t.likes}</p>
          <p>Views: ${t.views}</p>
          <p>Comments: ${t.comments}</p>
          <p>Downloads: ${t.downloads}</p>
        </div>
      </li>
    `).join("");y.insertAdjacentHTML("beforeend",o),b.refresh()}function p(){m.style.display="block"}function g(){m.style.display="none"}const u=document.querySelector(".form"),l=document.querySelector(".load-more");let n=1,c="";u.addEventListener("submit",async s=>{if(s.preventDefault(),c=u.elements["search-text"].value.trim(),!!c){n=1,v(),l.classList.add("is-hidden"),p();try{const o=await f(c,n),{hits:t,totalHits:a}=o;if(t.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}h(t);const e=Math.ceil(a/15);n<e?l.classList.remove("is-hidden"):i.info({message:"We're sorry, but you've reached the end of search results."})}catch{i.error({message:"Something went wrong. Try again!"})}finally{g()}}});l.addEventListener("click",async()=>{n+=1,p();try{const s=await f(c,n),{hits:o,totalHits:t}=s;h(o);const a=document.querySelector(".gallery-item");if(!a)return;const e=a.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"});const r=Math.ceil(t/15);n>=r&&(l.classList.add("is-hidden"),i.info({message:"We're sorry, but you've reached the end of search results."}))}catch{i.error({message:"Something went wrong. Try again!"})}finally{g()}});
//# sourceMappingURL=index.js.map
