/* Device Empire — dashboard presentation and device action menu */
(()=> {
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
    toggle.addEventListener("click",()=>{
      const opening=popup.classList.contains("hidden");
      popup.classList.toggle("hidden",!opening);
      toggle.setAttribute("aria-expanded",String(opening));
      toggle.classList.toggle("is-open",opening);
    });
    document.addEventListener("pointerdown",event=>{
      if(!event.target.closest(".create-anchor")){
        popup.classList.add("hidden");
        toggle.setAttribute("aria-expanded","false");
        toggle.classList.remove("is-open");
      }
    });
    $("createHandphone").addEventListener("click",()=>{
      popup.classList.add("hidden");
      toggle.setAttribute("aria-expanded","false");
      toggle.classList.remove("is-open");
      const status=$("saveStatus");
      status.textContent="Handphone Creator will be added in the next development step.";
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