/* Builds the abstract floating 2.5D cubes using CSS only — no imported images. */
(()=>{
 const root=document.getElementById("menuBackdrop");
 if(!root)return;
 const field=document.createElement("div");field.className="cube-field";root.appendChild(field);
 const cubes=[
  [13,22,32,-42,7.8,0],[29,34,46,-18,8.6,1.2],[47,17,24,-64,7.2,2.1],[68,28,38,-34,9.1,.7],[88,18,28,-72,8.2,1.8],
  [8,58,24,-12,9.4,2.5],[23,72,35,-52,8.1,.3],[43,58,22,-88,7.7,1.5],[61,75,43,-28,9.2,2.8],[82,58,31,-58,8.4,1.1],[96,76,20,-20,7.9,2],
  [35,9,17,-108,9.8,3.2],[76,8,19,-94,8.9,2.4],[54,42,15,-122,7.6,.5]
 ];
 cubes.forEach(([x,y,size,z,duration,delay])=>{
  const cube=document.createElement("div");cube.className="cube";
  cube.style.cssText=`--x:${x}%;--y:${y}%;--s:${size}px;--z:${z}px;--duration:${duration}s;--delay:-${delay}s`;
  ["front","back","right","left","top","bottom"].forEach(side=>{const face=document.createElement("i");face.className="face "+side;cube.appendChild(face)});
  field.appendChild(cube);
 });
})();