/* Device Empire — lightweight screen transitions and button feedback */
(()=>{
  const exitDuration=140;
  let token=0;
  let active=null;
  function transition(target,options={}){
    const screens=(options.screens||[]).map(id=>document.getElementById(id)).filter(Boolean);
    const next=document.getElementById(target);
    if(!next)return;
    const current=screens.find(el=>!el.classList.contains("hidden"));
    if(current===next){options.onChange?.(target);return;}
    const run=++token;
    const finish=()=>{
      if(run!==token)return;
      screens.forEach(el=>{
        el.classList.add("hidden");
        el.classList.remove("anim-enter","anim-exit");
      });
      next.classList.remove("hidden");
      next.classList.add("anim-enter");
      active=next;
      options.onChange?.(target);
      next.addEventListener("animationend",()=>{
        if(run===token)next.classList.remove("anim-enter");
      },{once:true});
    };
    if(current){
      current.classList.remove("anim-enter");
      current.classList.add("anim-exit");
      current.addEventListener("animationend",()=>{
        if(run===token)finish();
      },{once:true});
      window.setTimeout(finish,exitDuration+40);
    }else finish();
  }
  window.AnimationSystem={transition};
})();