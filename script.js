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
{cat:"Reportage sonore",title:"Le COVID dans le médico-social",desc:"Reportage radio.",media:"Radio",date:"Son",url:"reportage - jules - .mp3",audio:true},
{cat:"Reportage sonore",title:"Élections américaines 2024 - réactions",desc:"Reportage radio.",media:"Radio",date:"Son",url:"reportage 2 - jules - .mp3",audio:true},
{cat:"Reportage sonore",title:"La folie des fêtes de Noël",desc:"Reportage radio.",media:"Radio",date:"Son",url:"reportage 3 - jules - .mp3",audio:true},
{cat:"Podcast",title:"Bande annonce du podcast : <i>Plaquages Invisibles</i>",desc:"Projet de podcast personnel et original",media:"Podcast",date:"Son",url:"bande annonce plaquage invisible - podcast --.mp3",audio:true,podcast:true},
{cat:"Émission radio",title:"<i>Addictions</i>",desc:"Replay d’une émission en présence de chroniqueurs, journalistes et invités. Présentation et gestion de la régie.",media:"YouTube",date:"Émission",url:"https://youtu.be/2jX_oNe7Wrg?si=qvb_IXDqAULRJNU3",youtube:true},
{cat:"Émission radio",title:"<i>Vers l’infini et au delà</i>",desc:"Replay d’une émission en présence de chroniqueurs, journalistes et invités. Présentation et gestion de la régie.",media:"YouTube",date:"Émission",url:"https://youtu.be/JYpOF9M8z8s",youtube:true},
{cat:"Narration",title:"Narration — 1",desc:"Je narre un texte sur un sujet qui me tient à cœur.",media:"Instagram",date:"Reel",url:"https://www.instagram.com/reel/C3abCABN8ZX/?utm_source=ig_web_copy_link&stkn",instagram:true},
{cat:"Narration",title:"Narration — 2",desc:"Je narre un texte sur un sujet qui me tient à cœur.",media:"Instagram",date:"Reel",url:"https://www.instagram.com/reel/C3D0Skwi_Zv/?utm_source=ig_web_copy_link&stkn=",instagram:true}
],
video:[
{cat:"Vidéo",title:"Séquence 01",desc:"Vidéo.",media:"Vidéo",date:"MP4",url:"Séquence 01.mp4",video:true},
{cat:"Vidéo",title:"received_3287063024788488",desc:"Vidéo.",media:"Vidéo",date:"MP4",url:"received_3287063024788488.mp4",video:true},
{cat:"Vidéo",title:"Vidéo YouTube — 1",desc:"Vidéo YouTube.",media:"YouTube",date:"Vidéo",url:"https://youtu.be/hv1vBZK2mQU?si=yh_ZlQWFNtijvx-a",youtube:true},
{cat:"Vidéo",title:"Vidéo Instagram — 1",desc:"Vidéo Instagram.",media:"Instagram",date:"Reel",url:"https://www.instagram.com/reel/DCFQv_vObfv/?utm_source=ig_web_copy_link&stkn=",instagram:true},
{cat:"Vidéo",title:"Vidéo YouTube — 2",desc:"Vidéo YouTube.",media:"YouTube",date:"Vidéo",url:"https://youtu.be/4VHMBrfpQUc?si=0qI-iTrc8zvhcI9z",youtube:true}
]};

function youtubeEmbed(url){
  try{
    const u=new URL(url);
    let id="";
    if(u.hostname==="youtu.be") id=u.pathname.slice(1);
    else id=u.searchParams.get("v")||"";
    return id ? "https://www.youtube.com/embed/"+encodeURIComponent(id) : url;
  }catch(e){return url;}
}

function instagramEmbed(url){
  try{
    const u=new URL(url);
    const match=u.pathname.match(/\/reel\/([^/]+)/i);
    return match ? "https://www.instagram.com/reel/"+encodeURIComponent(match[1])+"/embed" : url;
  }catch(e){return url;}
}

function cards(a,id){
  const el=document.getElementById(id);
  if(!el)return;
  el.innerHTML=a.map((x,i)=>{
    let media="";
    if(x.audio){
      media='<audio class="radio-audio" controls preload="metadata" src="'+x.url+'"></audio>';
    }else if(x.video){
      media='<video class="portfolio-video" controls preload="metadata" playsinline src="'+x.url+'"></video>';
    }else if(x.youtube){
      media='<div class="radio-video"><iframe src="'+youtubeEmbed(x.url)+'" title="'+x.title+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>';
    }else if(x.instagram){
      media='<div class="radio-video instagram-video"><iframe src="'+instagramEmbed(x.url)+'" title="'+x.title+'" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></div>';
    }
    const isMedia=!!(x.audio||x.video||x.youtube||x.instagram);
    return '<article class="card'+(isMedia?' radio-media-card':'')+(x.podcast?' podcast-card':'')+'" role="link" tabindex="0" data-url="'+x.url+'"><img class="card-logo" src="'+(x.logo||"")+'" alt="'+x.media+'" loading="lazy" onerror="this.style.display=\'none\'"><div><small>'+String(i+1).padStart(2,'0')+' — '+x.cat+'</small><h3>'+(!isMedia?'<a href="'+x.url+'" target="_blank" rel="noopener noreferrer">'+x.title+' ↗</a>':x.title)+'</h3><p>'+x.desc+'</p>'+media+'</div></article>';
  }).join('');
  el.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('click',e=>{
      if(e.target.closest('audio,video,iframe'))return;
      if(!e.target.closest('a') && c.dataset.url && c.dataset.url!=="#")window.open(c.dataset.url,'_blank','noopener,noreferrer');
    });
    c.querySelectorAll('audio').forEach(audio=>{
      audio.addEventListener('click',e=>e.stopPropagation());
    });
    c.addEventListener('keydown',e=>{
      if((e.key==='Enter'||e.key===' ')&&!e.target.closest('audio,video')){
        e.preventDefault();
        if(c.dataset.url&&c.dataset.url!=="#")window.open(c.dataset.url,'_blank','noopener,noreferrer');
      }
    });
  });
}
cards(data.articles,'articles-grid');cards(data.enquetes,'enquetes-grid');cards(data.radio.slice(0,4),'radio-sounds-grid');cards(data.radio.slice(4,6),'radio-emissions-grid');cards(data.radio.slice(6,8),'radio-narrations-grid');cards(data.video,'video-grid');
const menu=document.getElementById('menu');const nav=document.querySelector('.site-nav');if(menu&&nav){
  let menuCloseTimer;
  const openMenu=()=>{clearTimeout(menuCloseTimer);nav.classList.add('open');};
  const closeMenu=()=>{clearTimeout(menuCloseTimer);menuCloseTimer=setTimeout(()=>nav.classList.remove('open'),120);};
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  menu.addEventListener('mouseenter',openMenu);
  menu.addEventListener('mouseleave',closeMenu);
  nav.addEventListener('mouseenter',openMenu);
  nav.addEventListener('mouseleave',closeMenu);
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}
