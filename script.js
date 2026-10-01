const data={articles:[
{cat:"Rugby",title:"Mes articles sur Rugbyrama",desc:"Retrouvez mes articles, analyses et sujets consacrés au rugby.",media:"Rugbyrama",date:"Articles",url:"https://www.rugbyrama.fr/recherche?q=jules%20bousquet"},
{cat:"NBA",title:"Mes articles sur TrashTalk",desc:"Mes articles, analyses et contenus consacrés à la NBA.",media:"TrashTalk",date:"Articles",url:"https://trashtalk.co/author/julesbousquet/"},
{cat:"NBA",title:"Mes articles sur The Daily Dunk",desc:"Mes articles et analyses autour de l'actualité NBA.",media:"The Daily Dunk",date:"Articles",url:"https://nba.thedailydunk.co/author/julesbousquet/"}
],
enquetes:[
{cat:"Enquête",title:"IME dépassés : quand l’urgence devient la norme",desc:"Une enquête sur un système médico-social saturé",media:"Enquête",date:"PDF",url:"Enquete IME.pdf"},
{cat:"Reportage",title:"La professionnalisation du rugby féminin : un combat encore inachevé",desc:"Un reportage sur des sportives de haut niveau dans un environnement en manque de moyens",media:"BD Reportage",date:"PDF",url:"BD Reportage Rugby Feminin Pearl et Jules.docx (2).pdf"}
],
radio:[
{cat:"Reportage sonore",title:"Reportage — Jules",desc:"Reportage radio.",media:"Radio",date:"Son",url:"reportage - jules - .mp3",audio:true},
{cat:"Reportage sonore",title:"Reportage 2 — Jules",desc:"Reportage radio.",media:"Radio",date:"Son",url:"reportage 2 - jules - .mp3",audio:true},
{cat:"Reportage sonore",title:"Reportage 3 — Jules",desc:"Reportage radio.",media:"Radio",date:"Son",url:"reportage 3 - jules - .mp3",audio:true},
{cat:"Podcast",title:"Plaquages Invisibles — bande-annonce",desc:"Bande-annonce du podcast Plaquages Invisibles.",media:"Podcast",date:"Son",url:"bande annonce plaquage invisible - podcast --.mp3",audio:true},
{cat:"Vidéo",title:"Vidéo — 1",desc:"Vidéo YouTube.",media:"YouTube",date:"Vidéo",url:"https://youtu.be/2jX_oNe7Wrg?si=qvb_IXDqAULRJNU3",youtube:true},
{cat:"Vidéo",title:"Vidéo — 2",desc:"Vidéo YouTube.",media:"YouTube",date:"Vidéo",url:"https://youtu.be/JYpOF9M8z8s",youtube:true}
],
video:[{cat:"Reportage",title:"Ton reportage vidéo",desc:"Présente ici le sujet et ton rôle.",media:"Vidéo",date:"2026",url:"#"}]};

function youtubeEmbed(url){
  try{
    const u=new URL(url);
    let id="";
    if(u.hostname==="youtu.be") id=u.pathname.slice(1);
    else id=u.searchParams.get("v")||"";
    return id ? "https://www.youtube.com/embed/"+encodeURIComponent(id) : url;
  }catch(e){return url;}
}

function cards(a,id){
  const el=document.getElementById(id);
  if(!el)return;
  el.innerHTML=a.map((x,i)=>{
    let media="";
    if(x.audio){
      media='<audio class="radio-audio" controls preload="metadata" src="'+x.url+'"></audio>';
    }else if(x.youtube){
      media='<div class="radio-video"><iframe src="'+youtubeEmbed(x.url)+'" title="'+x.title+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>';
    }
    return '<article class="card'+((x.audio||x.youtube)?' radio-media-card':'')+'" role="link" tabindex="0" data-url="'+x.url+'"><img class="card-logo" src="'+(x.logo||"")+'" alt="'+x.media+'" loading="lazy" onerror="this.style.display=\'none\'"><div><small>'+String(i+1).padStart(2,'0')+' — '+x.cat+'</small><h3>'+((x.audio||x.youtube)?x.title+' ↗':'<a href="'+x.url+'" target="_blank" rel="noopener noreferrer">'+x.title+' ↗</a>')+'</h3><p>'+x.desc+'</p>'+media+'</div></article>';
  }).join('');
  el.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('click',e=>{
      if(e.target.closest('audio,iframe'))return;
      if(!e.target.closest('a') && c.dataset.url && c.dataset.url!=="#")window.open(c.dataset.url,'_blank','noopener,noreferrer');
    });
    c.addEventListener('keydown',e=>{
      if((e.key==='Enter'||e.key===' ')&&!e.target.closest('audio')){
        e.preventDefault();
        if(c.dataset.url&&c.dataset.url!=="#")window.open(c.dataset.url,'_blank','noopener,noreferrer');
      }
    });
  });
}
cards(data.articles,'articles-grid');cards(data.enquetes,'enquetes-grid');cards(data.radio,'radio-grid');cards(data.video,'video-grid');
const menu=document.getElementById('menu');const nav=document.querySelector('.site-nav');if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));}
