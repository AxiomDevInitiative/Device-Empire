/* Device Empire — dashboard presentation and device action menu */
(()=>{
  const $=id=>document.getElementById(id);
  function formatMoney(value){return "NC "+Number(value||0).toLocaleString("en-US")}
  function render(data){
    if(!data)return;
    $("dashLogo").textContent=data.logoSymbol||"";
    $("dashName").textContent=data.companyName||"Company";
    $("dashMoney").textContent=formatMoney(data.funds);
    $("dashYears").textContent="Year "+(data.years||1);
    $("dashKnowledge").textContent=Number(data.knowledge||0).toLocaleString("en-US")+" KP";
  }
  function init(){
    const toggle=$("createDeviceToggle"),popup=$("createDevicePopup");
    if(!toggle||!popup)return;
    let closeTimer;
    function closePopup(){
      if(popup.classList.contains("hidden")||popup.classList.contains("is-closing"))return;
      popup.classList.add("is-closing");
      toggle.setAttribute("aria-expanded","false");
      toggle.classList.remove("is-open");
      clearTimeout(closeTimer);
      closeTimer=window.setTimeout(()=>{
        popup.classList.add("hidden");
        popup.classList.remove("is-closing");
      },140);
    }
    function openPopup(){
      clearTimeout(closeTimer);
      popup.classList.remove("hidden","is-closing");
      toggle.setAttribute("aria-expanded","true");
      toggle.classList.add("is-open");
    }
    toggle.addEventListener("click",()=>{
      if(popup.classList.contains("hidden"))openPopup();
      else closePopup();
    });
    document.addEventListener("pointerdown",event=>{
      if(!event.target.closest(".create-anchor"))closePopup();
    });
    $("createHandphone").addEventListener("click",()=>{
      closePopup();
      $("saveStatus").textContent="Handphone Creator will be added in the next development step.";
    });
    $("manualSave").addEventListener("click",()=>{
      const result=window.SaveSystem.save();
      if(result){
        $("saveStatus").textContent="Saved just now";
        render(result);
      }else $("saveStatus").textContent="No company save found";
    });
    window.SaveSystem.startAutoSave(()=>{
      $("saveStatus").textContent="Autosaved · "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
    });
  }
  window.DashboardSystem={render,init};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();