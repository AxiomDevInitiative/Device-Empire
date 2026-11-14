/* Device Empire — local save manager */
(()=> {
  const KEY="device-empire-save-v1";
  const defaults={funds:10000,years:1,knowledge:0,reputation:0};
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch{return null}}
  function write(data){
    const next={...data,lastSavedAt:Date.now(),saveVersion:2};
    localStorage.setItem(KEY,JSON.stringify(next));
    return next;
  }
  function create(company){
    return write({...defaults,...company,createdAt:Date.now(),devices:[],designs:[]});
  }
  function save(patch={}){
    const current=read();
    if(!current)return null;
    return write({...current,...patch});
  }
  function hasSave(){const data=read();return !!(data&&data.companyName)}
  function startAutoSave(onSaved){
    window.setInterval(()=>{
      const result=save();
      if(result&&typeof onSaved==="function")onSaved(result);
    },20000);
  }
  window.SaveSystem={read,write,create,save,hasSave,startAutoSave,KEY};
})();