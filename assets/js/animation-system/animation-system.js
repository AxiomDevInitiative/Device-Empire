/* Device Empire — centralized intro/outro and button feedback */
(()=> {
  const duration=190;
  let active=null;
  let token=0;
  function transition(target,options={}){
    const screens=(options.screens||[]).map(id=>document.getElementById(id)).filter(Boolean);
    const next=document.getElementById(target);
    if(!next)return;
    const current=screens.find(el=>!el.classList.contains("hidden"));
    if(current===next){options.onChange?.(target);return;}
    const run=++token;
    if(active) active.classList.remove("anim-exit","anim-enter");
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
      window.setTimeout(()=>{if(run===token)next.classList.remove("anim-enter")},360);
    };
    if(current&&!current.classList.contains("hidden")){
      current.classList.remove("anim-enter");
      current.classList.add("anim-exit");
      window.setTimeout(finish,duration);
    }else finish();
  }
  document.addEventListener("pointerdown",event=>{
    const button=event.target.closest("button");
    if(!button||button.disabled)return;
    button.classList.remove("tap-pop");
    void button.offsetWidth;
    button.classList.add("tap-pop");
    window.setTimeout(()=>button.classList.remove("tap-pop"),180);
  },{passive:true});
  window.AnimationSystem={transition};
})();