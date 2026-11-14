/* Device Empire — centralized Android/browser back navigation */
(()=> {
  const stack=[];
  let onNavigate=()=>{};
  let initialized=false;
  function pushState(page){
    history.pushState({deviceEmpire:true,page}, "", location.href);
  }
  function trimTo(page){
    const index=stack.lastIndexOf(page);
    if(index>=0) stack.splice(index+1);
    else stack.push(page);
    return page;
  }
  function navigate(page){
    if(!page) return;
    if(stack[stack.length-1]===page) return;
    stack.push(page);
    pushState(page);
  }
  function backTo(page){
    if(!page || stack[stack.length-1]===page) return;
    const index=stack.lastIndexOf(page);
    if(index<0){navigate(page);onNavigate(page);return;}
    const distance=stack.length-1-index;
    history.go(-distance);
  }
  function init(options={}){
    if(initialized) return;
    initialized=true;
    onNavigate=typeof options.onNavigate==="function"?options.onNavigate:onNavigate;
    const initial=options.initialPage||"home";
    stack.push(initial);
    history.replaceState({deviceEmpire:true,page:initial}, "", location.href);
    pushState(initial); // Guard entry: Back at the root stays inside the game.
    window.addEventListener("popstate",event=>{
      if(stack.length<=1){
        pushState(stack[0]||initial);
        return;
      }
      const target=event.state&&event.state.deviceEmpire&&event.state.page
        ? event.state.page
        : stack[stack.length-2];
      trimTo(target);
      onNavigate(target);
    });
  }
  window.BackSystem={init,navigate,backTo,getCurrentPage:()=>stack[stack.length-1]||null};
})();