/* Conexión Natural RA – memorama + Mapa de SLP (Agenda Ambiental UASLP).
   Unidades locales: 1 = ancho del marcador (ilustración 3:4 → alto 1.333). Compartido por index.html (RA) y visor.html. */
if(!CanvasRenderingContext2D.prototype.roundRect)CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){r=Math.min(r,w/2,h/2);this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);this.closePath();};
(function(){
const $=s=>document.querySelector(s), T=()=>AFRAME.THREE, FONT='Montserrat,"Open Sans",Arial,sans-serif';
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2, back=t=>{const c=1.7;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2);};
function anim(ms,fn,done){const t0=performance.now();(function f(){const k=Math.min(1,(performance.now()-t0)/ms);fn(k);k<1?requestAnimationFrame(f):done&&done();})();}
function lienzo(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function wrap(c,t,max){const out=[];String(t).split('\n').forEach(p=>{let l='';p.split(' ').forEach(w=>{const s=l?l+' '+w:w;if(c.measureText(s).width>max&&l){out.push(l);l=w}else l=s});out.push(l)});return out;}
function tex(src){const t=new (T().TextureLoader)().load(src);t.colorSpace=T().SRGBColorSpace;t.anisotropy=4;return t;}
function texC(cv){const t=new (T().CanvasTexture)(cv);t.colorSpace=T().SRGBColorSpace;return t;}
function plano(cv,w){const th=T();return new th.Mesh(new th.PlaneGeometry(w,w*cv.height/cv.width),new th.MeshBasicMaterial({map:texC(cv),transparent:true,depthWrite:false,side:th.DoubleSide}));}
function img(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src;});}
// vidrio orgánico-futurista redondeado
function vidrio(c,W,H,r,col){const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'rgba(0,59,113,0.88)');g.addColorStop(1,'rgba(14,34,64,0.74)');
 c.beginPath();c.roundRect(8,8,W-16,H-16,r);c.fillStyle=g;c.fill();
 c.save();c.clip();const h=c.createRadialGradient(W*.2,0,10,W*.2,0,W*.8);h.addColorStop(0,'rgba(255,255,255,.18)');h.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=h;c.fillRect(0,0,W,H);c.restore();
 c.lineWidth=6;c.strokeStyle=col||'rgba(90,224,240,.9)';c.shadowColor=col||'#5AE0F0';c.shadowBlur=22;c.beginPath();c.roundRect(8,8,W-16,H-16,r);c.stroke();c.shadowBlur=0;}
const ESP=()=>window.ESPECIES, RG=()=>window.REGIONES, byId=id=>ESP().find(e=>e.id===id);
const NIVELES={facil:{nombre:'Fácil',c:3,r:4},medio:{nombre:'Medio',c:4,r:4},dificil:{nombre:'Difícil',c:4,r:6}};
const KEY='cnDesbloqueadas';
const PROG={get(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}},
 add(id){const a=this.get();if(!a.includes(id)){a.push(id);localStorage.setItem(KEY,JSON.stringify(a));return true}return false},
 reset(){localStorage.removeItem(KEY);}};
window.PROG=PROG;

AFRAME.registerComponent('conexion',{
 init(){
  const th=T();this.th=th;this.root=this.el.object3D;this.clic=[];this.vista=null;this.panel=null;this.listo=false;this.tapDesde=0;this.nuevos=new Set();
  this.texRev=tex(CARTAS.reverso);this.texCarta={};
  this.gJuego=new th.Group();this.gMapa=new th.Group();this.gInfo=new th.Group();this.root.add(this.gJuego,this.gMapa,this.gInfo);
  this.gJuego.visible=false;this.gMapa.visible=false;
  this.construirMapa();this.eventos();
  window.CN=this;
 },
 texDe(id){return this.texCarta[id]||(this.texCarta[id]=tex(CARTAS[id]));},
 agregarClic(m,fn){m.userData.on=fn;this.clic.push(m);},
 /* ---------- MEMORAMA ---------- */
 nuevaPartida(nivel){
  const th=this.th,N=NIVELES[nivel]||NIVELES.facil;this.nivel=nivel;
  this.gJuego.clear();this.clic=this.clic.filter(m=>!m.userData.carta);this.cerrarPanel(true);
  const pares=N.c*N.r/2,ids=ESP().map(e=>e.id).sort(()=>Math.random()-.5).slice(0,pares);
  const mazo=ids.concat(ids).sort(()=>Math.random()-.5);
  const AR=!!document.querySelector('[mindar-image]'),K=AR?3:1;this.K=K;this.zB=AR?0.19:0.04;/* RA: cartas 3x respecto al ancla */
  const asp=399/300,maxW=1.2*K,maxH=1.6*K,gap=0.025*K;
  const cw=Math.min((maxW-gap*(N.c-1))/N.c,((maxH-gap*(N.r-1))/N.r)/asp),ch=cw*asp;
  this.cartas=[];this.sPar=Math.min(1.15,1+0.95*gap/Math.max(cw,ch));
  mazo.forEach((id,i)=>{const col=i%N.c,row=Math.floor(i/N.c);
   const g=new th.Group();g.position.set((col-(N.c-1)/2)*(cw+gap),((N.r-1)/2-row)*(ch+gap),this.zB);
   const rev=new th.Mesh(new th.PlaneGeometry(cw,ch),new th.MeshBasicMaterial({map:this.texRev}));
   const fr=new th.Mesh(new th.PlaneGeometry(cw,ch),new th.MeshBasicMaterial({map:this.texDe(id)}));fr.rotation.y=Math.PI;fr.position.z=-0.001;
   const hit=new th.Mesh(new th.PlaneGeometry(cw+gap,ch+gap),new th.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,side:th.DoubleSide}));hit.position.z=0.002;
   const brillo=new th.Mesh(new th.PlaneGeometry(cw*1.12,ch*1.08),new th.MeshBasicMaterial({color:0x5AE0F0,transparent:true,opacity:0,depthWrite:false}));brillo.position.z=-0.004;
   g.add(brillo,rev,fr,hit);this.gJuego.add(g);
   const c={id,g,brillo,vuelta:false,par:false,i};hit.userData.carta=true;this.agregarClic(hit,()=>this.tocarCarta(c));this.cartas.push(c);
   g.scale.setScalar(0.01);setTimeout(()=>anim(380,k=>g.scale.setScalar(Math.max(.01,back(k)))),i*25);});
  this.est={puntos:0,movs:0,pares:0,total:pares,racha:0,t0:null,tAcum:0,primera:null,bloqueo:false,fin:false};
  this.mostrar('juego');this.hud();
 },
 tiempo(){const e=this.est;if(!e)return 0;return e.tAcum+(e.t0&&!this.pausa?(performance.now()-e.t0):0);},
 voltear(c,arriba,ms=320){c.vuelta=arriba;const g=c.g,r0=g.rotation.y,r1=arriba?Math.PI:0;
  anim(ms,k=>{const e=ease(k);g.rotation.y=r0+(r1-r0)*e;g.position.z=(this.zB||0.04)+Math.sin(Math.PI*k)*0.08*(this.K||1);});},
 tocarCarta(c){const e=this.est;if(!e||e.fin||e.bloqueo||c.vuelta||c.par)return;
  if(!e.t0)e.t0=performance.now();
  this.voltear(c,true);
  if(!e.primera){e.primera=c;return;}
  const a=e.primera;e.primera=null;e.movs++;
  if(a.id===c.id){a.par=c.par=true;const sp=this.sPar||1.15;setTimeout(()=>anim(260,k=>{const v=1+(sp-1)*ease(k);a.g.scale.setScalar(v);c.g.scale.setScalar(v);}),330);e.pares++;e.racha++;const pts=100+50*(e.racha-1);e.puntos+=pts;
   const nuevo=PROG.add(c.id);if(nuevo)this.nuevos.add(c.id);this.actualizarPines();
   [a,c].forEach(x=>{x.brillo.material.opacity=.85;anim(900,k=>{x.brillo.material.opacity=.85*(1-k)+.25*k;});});
   e.bloqueo=true;setTimeout(()=>{e.bloqueo=false;this.panelEspecie(byId(c.id),{par:true,pts,nuevo});},420);
   if(e.pares===e.total){e.fin=true;e.tAcum=this.tiempo();e.t0=null;}
  }else{e.racha=0;e.bloqueo=true;setTimeout(()=>{this.voltear(a,false);this.voltear(c,false);setTimeout(()=>e.bloqueo=false,330);},900);}
  this.hud();},
 fin(){const e=this.est,s=Math.round(e.tAcum/1000),bono=Math.max(0,300-s)*2;e.puntos+=bono;this.hud();
  UI.resumen({puntos:e.puntos,bono,movs:e.movs,seg:s,pares:e.total,nivel:this.nivel});},
 /* ---------- PANELES FLOTANTES (infografías) ---------- */
 async panelEspecie(sp,op={}){
  const W=1100,H=1180,cv=lienzo(W,H),c=cv.getContext('2d');vidrio(c,W,H,90,op.par?'#9BE15D':null);
  const im=await img(CARTAS[sp.id]);if(im){c.save();c.beginPath();c.roundRect(60,60,390,519,36);c.clip();c.drawImage(im,60,60,390,519);c.restore();}
  c.fillStyle='#5AE0F0';c.font=`700 34px ${FONT}`;c.fillText(op.par?'¡PAR ENCONTRADO!  +'+op.pts+' pts':'ESPECIE DEL MEMORAMA',490,105);
  c.fillStyle='#fff';c.font=`800 64px ${FONT}`;let y=180;wrap(c,sp.nombre,560).forEach(l=>{c.fillText(l,490,y);y+=70});
  c.font=`italic 500 38px ${FONT}`;c.fillStyle='#d9f2ff';wrap(c,sp.cientifico,560).forEach(l=>{c.fillText(l,490,y);y+=46});
  y+=14;c.font=`700 32px ${FONT}`;const chip=(t,col,x,yy)=>{const w=c.measureText(t).width+40;c.beginPath();c.roundRect(x,yy-36,w,50,25);c.fillStyle=col;c.fill();c.fillStyle='#fff';c.fillText(t,x+20,yy);return x+w+12;};
  let x=490;x=chip(sp.grupo,'rgba(230,106,44,.9)',x,y+20);y+=80;
  c.fillStyle='#FFD628';c.font=`700 30px ${FONT}`;c.fillText('Estatus (NOM-059/UICN)',490,y);y+=42;c.fillStyle='#fff';c.font=`500 34px ${FONT}`;wrap(c,sp.estatus,560).forEach(l=>{c.fillText(l,490,y);y+=42});
  y=Math.max(y+30,640);c.fillStyle='#FFD628';c.font=`700 34px ${FONT}`;c.fillText('Distribución en San Luis Potosí',60,y);y+=50;
  c.fillStyle='#fff';c.font=`500 38px ${FONT}`;wrap(c,sp.distribucion,W-130).forEach(l=>{c.fillText(l,60,y);y+=48});
  y+=30;c.fillStyle='#FFD628';c.font=`700 34px ${FONT}`;c.fillText('Región en el Mapa de SLP',60,y);y+=58;x=60;c.font=`700 34px ${FONT}`;
  if(sp.regiones.length===4)chip('Todo el estado (4 regiones)','#003B71',x,y);else if(!sp.regiones.length)chip('[POR DEFINIR]','rgba(160,30,45,.9)',x,y);else sp.regiones.forEach(r=>x=chip(RG()[r].nombre,RG()[r].color,x,y));
  c.textAlign='center';c.fillStyle='#5AE0F0';c.font=`600 32px ${FONT}`;
  c.fillText(op.par?(op.nuevo?'🔓 ¡Nueva especie desbloqueada en el Mapa de SLP!':'Ya estaba desbloqueada en el Mapa de SLP')+' · Toca para seguir':'Toca para cerrar',W/2,H-50);
  this.abrirPanel(plano(cv,0.95),()=>{if(this.est&&this.est.fin&&this.vista==='juego')this.fin();});
 },
 panelTexto(titulo,lineas,col,w=0.9){const W=1100,cv=lienzo(W,10),c0=cv.getContext('2d');c0.font=`500 40px ${FONT}`;
  const L=[];lineas.forEach(l=>{if(l.h){L.push(l)}else wrap(c0,l,W-130).forEach(t=>L.push({t}));});
  const H=210+L.reduce((s,l)=>s+(l.h?62:50),0)+90;cv.height=H;const c=cv.getContext('2d');vidrio(c,W,H,80,col);
  c.fillStyle='#fff';c.font=`800 62px ${FONT}`;c.fillText(titulo,60,120);if(col){c.fillStyle=col;c.fillRect(60,145,220,10);}
  let y=220;L.forEach(l=>{if(l.h){c.fillStyle='#FFD628';c.font=`700 36px ${FONT}`;c.fillText(l.h,60,y+12);y+=62}else{c.fillStyle='#fff';c.font=`500 40px ${FONT}`;c.fillText(l.t,60,y);y+=50}});
  c.textAlign='center';c.fillStyle='#5AE0F0';c.font=`600 32px ${FONT}`;c.fillText('Toca para cerrar',W/2,H-40);
  this.abrirPanel(plano(cv,w));},
 abrirPanel(mesh,alCerrar){this.cerrarPanel(true);mesh.renderOrder=50;mesh.material.depthTest=false;const g=new this.th.Group();g.add(mesh);
  const v=this.vista==='mapa';g.position.set(0,v?0.05:0,v?0.42:0.34);this.gInfo.add(g);this.panel={g,alCerrar};this.tapDesde=performance.now()+250;
  g.scale.setScalar(.01);anim(420,k=>g.scale.setScalar(Math.max(.01,back(k))));},
 cerrarPanel(silencio){const p=this.panel;if(!p)return;this.panel=null;
  if(silencio){this.gInfo.remove(p.g);return;}anim(200,k=>p.g.scale.setScalar(Math.max(.01,1-k)),()=>{this.gInfo.remove(p.g);p.alCerrar&&p.alCerrar();});},
 /* ---------- MAPA DE SLP ---------- */
 async construirMapa(){
  const th=this.th,G=await (await fetch('data/regiones_geo.json')).json();this.G=G;
  const tilt=new th.Group();tilt.rotation.x=Math.PI/2-0.45;tilt.position.set(0,0.02,0.16);this.gMapa.add(tilt);
  this.giro=new th.Group();tilt.add(this.giro);this.tilt=tilt;
  const base=new th.Mesh(new th.CircleGeometry(0.66,64),new th.MeshBasicMaterial({color:0x5AE0F0,transparent:true,opacity:.12,depthWrite:false,side:th.DoubleSide}));base.rotation.x=-Math.PI/2;base.position.y=-0.005;
  const aro=new th.Mesh(new th.TorusGeometry(0.66,0.005,8,96),new th.MeshBasicMaterial({color:0x5AE0F0,transparent:true,opacity:.8}));aro.rotation.x=Math.PI/2;
  this.giro.add(base,aro);
  const ld=new th.GLTFLoader();
  ld.load('models/slp_regiones.gltf',gl=>{gl.scene.traverse(o=>{if(o.isMesh){const r=o.name in RG()?o.name:(o.parent&&o.parent.name);
    const key=Object.keys(RG()).find(k=>(o.name||'').startsWith(k)||(o.parent&&o.parent.name||'').startsWith(k));
    o.material=new th.MeshStandardMaterial({color:RG()[key].color,roughness:.55,metalness:.05,emissive:RG()[key].color,emissiveIntensity:.18,flatShading:true});
    this.agregarClic(o,()=>this.panelRegion(key));}});
   this.giro.add(gl.scene);this.modelo=gl.scene;});
  // etiquetas de región (siempre de frente al usuario)
  this.etqs={};
  for(const k in RG()){const R=RG()[k],cv=lienzo(512,150),c=cv.getContext('2d');
   const e=plano(cv,0.2);e.position.set(G.regiones[k].x,0.2,G.regiones[k].z);e.rotation.x=-this.tilt.rotation.x;e.renderOrder=5;this.giro.add(e);this.etqs[k]={cv,e};
   const hit=new th.Mesh(new th.PlaneGeometry(0.22,0.07),new th.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,side:th.DoubleSide}));e.add(hit);this.agregarClic(hit,()=>this.panelRegion(k));}
  // pines por especie
  this.pines=[];const usados={};
  for(const sp of ESP()){for(const r of sp.regiones){const i=usados[r]=(usados[r]||0);usados[r]++;const s=G.pines[r][i+1]||G.pines[r][0];
   const p=new th.Group();p.position.set(s[0],0.04,s[1]);
   const tallo=new th.Mesh(new th.CylinderGeometry(0.002,0.002,0.06,6),new th.MeshBasicMaterial({color:0xffffff}));tallo.position.y=0.03;
   const cab=new th.Group();cab.position.y=0.075;cab.rotation.x=-this.tilt.rotation.x;
   const cv=lienzo(160,160);const disco=plano(cv,0.04);disco.renderOrder=6;cab.add(disco);
   const hit=new th.Mesh(new th.CircleGeometry(0.03,16),new th.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,side:th.DoubleSide}));hit.position.z=0.002;cab.add(hit);
   p.add(tallo,cab);this.giro.add(p);const pin={sp,r,p,cab,cv,disco,estado:null};this.pines.push(pin);
   this.agregarClic(hit,()=>this.tocarPin(pin));}}
  const pd=ESP().filter(e=>!e.regiones.length);this.porDefinir=pd;
  const cv=lienzo(900,120),c=cv.getContext('2d');vidrio(c,900,120,50,'#ff9aa8');c.fillStyle='#fff';c.font=`700 40px ${FONT}`;c.textAlign='center';c.fillText(`+${pd.length} especies con región [POR DEFINIR] · tocar`,450,75);
  const nota=plano(cv,0.62);nota.position.set(0,-0.5,0.2);this.gMapa.add(nota);this.agregarClic(nota,()=>this.panelTexto('Región [POR DEFINIR]',['El material del memorama no precisa la región de estas especies; no se ubican en el mapa:',...pd.map(e=>'• '+e.nombre+' — '+e.distribucion)],'#ff9aa8'));
  this.cvTit=lienzo(1000,220);this.tit=plano(this.cvTit,0.8);this.tit.position.set(0,0.56,0.12);this.gMapa.add(this.tit);
  this.actualizarPines();this.listo=true;
 },
 async actualizarPines(){if(!this.pines)return;const des=PROG.get();
  for(const pin of this.pines){const on=des.includes(pin.sp.id);if(pin.estado===on)continue;pin.estado=on;const c=pin.cv.getContext('2d');c.clearRect(0,0,160,160);
   c.beginPath();c.arc(80,80,72,0,7);c.fillStyle=on?'#fff':'rgba(40,50,70,.92)';c.fill();
   if(on){const im=await img(CARTAS[pin.sp.id]);c.save();c.beginPath();c.arc(80,80,66,0,7);c.clip();if(im)c.drawImage(im,20,18,260,260,14,14,132,132);c.restore();}
   else{c.fillStyle='#9fb3c8';c.font=`900 90px ${FONT}`;c.textAlign='center';c.fillText('?',80,112);}
   c.lineWidth=8;c.strokeStyle=on?RG()[pin.r].color:'#9fb3c8';c.beginPath();c.arc(80,80,72,0,7);c.stroke();pin.disco.material.map.needsUpdate=true;}
  const n=des.length,t=ESP().length;
  for(const k in this.etqs){const {cv}=this.etqs[k],c=cv.getContext('2d'),R=RG()[k],tot=ESP().filter(e=>e.regiones.includes(k)),d=tot.filter(e=>des.includes(e.id)).length;
   c.clearRect(0,0,512,150);c.beginPath();c.roundRect(8,8,496,134,60);c.fillStyle=R.color;c.fill();c.lineWidth=6;c.strokeStyle='#fff';c.stroke();
   c.fillStyle='#fff';c.textAlign='center';c.font=`800 56px ${FONT}`;c.fillText(R.nombre.toUpperCase(),256,72);c.font=`600 34px ${FONT}`;c.fillText(`${d}/${tot.length} especies`,256,120);this.etqs[k].e.material.map.needsUpdate=true;}
  const c=this.cvTit.getContext('2d');c.clearRect(0,0,1000,220);vidrio(c,1000,220,90);c.fillStyle='#fff';c.textAlign='center';c.font=`800 70px ${FONT}`;c.fillText('Mapa de SLP',500,100);
  c.font=`600 42px ${FONT}`;c.fillStyle='#FFD628';c.fillText(`${n}/${t} especies desbloqueadas`,500,165);this.tit.material.map.needsUpdate=true;
  UI.progreso&&UI.progreso(n,t);},
 animarNuevos(){if(!this.pines)return;for(const pin of this.pines){if(!this.nuevos.has(pin.sp.id))continue;const cab=pin.cab;
   const aro=new this.th.Mesh(new this.th.RingGeometry(0.03,0.036,32),new this.th.MeshBasicMaterial({color:RG()[pin.r].color,transparent:true,side:this.th.DoubleSide,depthWrite:false}));cab.add(aro);
   cab.scale.setScalar(.01);setTimeout(()=>anim(900,k=>{cab.scale.setScalar(Math.max(.01,back(k))*(1+.4*Math.sin(Math.PI*k)));cab.position.y=0.075+0.06*Math.sin(Math.PI*k);aro.scale.setScalar(1+3*k);aro.material.opacity=1-k;},()=>cab.remove(aro)),300);}
  this.nuevos.clear();},
 tocarPin(pin){if(PROG.get().includes(pin.sp.id))this.panelEspecie(pin.sp);
  else this.panelTexto('Especie bloqueada',['Región: '+RG()[pin.r].nombre,'Encuentra su par en el memorama para desbloquear esta especie y ver su carta.'],'#9fb3c8',0.8);},
 panelRegion(k){const R=RG()[k],des=PROG.get(),sp=ESP().filter(e=>e.regiones.includes(k));
  this.panelTexto('Región '+R.nombre,[R.texto,{h:'Municipios: '+R.municipios+' · Sede: '+R.sede},{h:`Especies del memorama: ${sp.filter(e=>des.includes(e.id)).length}/${sp.length} desbloqueadas`},
   sp.map(e=>des.includes(e.id)?e.nombre:'?').join(' · ')],R.color);},
 /* ---------- vistas ---------- */
 mostrar(v){this.vista=v;this.cerrarPanel(true);this.gJuego.visible=v==='juego';this.gMapa.visible=v==='mapa';this.tapDesde=performance.now()+500;
  if(v==='mapa'){this.gMapa.scale.setScalar(.01);anim(500,k=>this.gMapa.scale.setScalar(Math.max(.01,back(k))*this.zoomMapa),()=>this.animarNuevos());}
  UI.vista&&UI.vista(v);},
 zoomMapa:1,
 eventos(){
  let down=null,pinch=null;const sc=this.el.sceneEl;
  const esUI=e=>e.target.closest&&e.target.closest('button,a,.capa,#resumen');
  document.addEventListener('pointerdown',e=>{if(esUI(e))return;down={x:e.clientX,y:e.clientY,mov:false};});
  document.addEventListener('pointermove',e=>{if(!down||pinch)return;const dx=e.clientX-down.x;if(Math.abs(dx)+Math.abs(e.clientY-down.y)>14)down.mov=true;
   if(down.mov&&this.vista==='mapa'&&this.giro){this.giro.rotation.y+=dx*0.01;down.x=e.clientX;down.y=e.clientY;}});
  document.addEventListener('pointerup',e=>{const d=down;down=null;if(!d||d.mov||pinch||esUI(e))return;this.tap(e.clientX,e.clientY);});
  const dist=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
  document.addEventListener('touchstart',e=>{if(e.touches.length===2){const g=this.vista==='mapa'?this.gMapa:this.gJuego;pinch={d:dist(e.touches),s:g.scale.x,g};if(down)down.mov=true;}},{passive:true});
  document.addEventListener('touchmove',e=>{if(e.touches.length===2&&pinch){e.preventDefault();const s=Math.min(2.5,Math.max(.5,pinch.s*dist(e.touches)/pinch.d));pinch.g.scale.setScalar(s);if(pinch.g===this.gMapa)this.zoomMapa=s;}},{passive:false});
  document.addEventListener('touchend',e=>{if(e.touches.length<2)setTimeout(()=>pinch=null,50);},{passive:true});
 },
 tap(x,y){if(!this.listo||performance.now()<this.tapDesde||this.pausa)return;
  if(this.panel){this.cerrarPanel();return;}
  const cam=this.el.sceneEl.camera;if(!cam)return;const th=this.th,r=new th.Raycaster();r.far=100000;
  const rect=this.el.sceneEl.canvas.getBoundingClientRect();
  r.setFromCamera(new th.Vector2((x-rect.left)/rect.width*2-1,-(y-rect.top)/rect.height*2+1),cam);
  const vis=o=>{for(;o;o=o.parent)if(!o.visible)return false;return true;};
  const hits=r.intersectObjects(this.clic.filter(vis),false);if(hits.length)hits[0].object.userData.on();},
 pausa:false
});

/* ---------- UI HTML compartida ---------- */
const UI=window.UI={nivel:localStorage.getItem('cnNivel')||'facil',
 init(){const nv=$('#niveles');nv.innerHTML='';for(const k in NIVELES){const N=NIVELES[k],b=document.createElement('button');b.innerHTML=`${N.nombre}<small style="display:block;font-size:11px;font-weight:500">${N.c}×${N.r} · ${N.c*N.r/2} pares</small>`;
   b.className=k===this.nivel?'sel':'';b.onclick=()=>{this.nivel=k;localStorage.setItem('cnNivel',k);[...nv.children].forEach(x=>x.classList.toggle('sel',x===b));};nv.appendChild(b);}
  $('#portada').src=window.PORTADA;this.progreso(PROG.get().length,ESP().length);
  $('#bReset').onclick=()=>{if(confirm('¿Borrar las especies desbloqueadas en el Mapa de SLP?')){PROG.reset();CN.pines&&CN.pines.forEach(p=>p.estado=null);CN.actualizarPines();this.progreso(0,ESP().length);}};
  $('#vJuego').onclick=()=>{if(!CN.est)CN.nuevaPartida(this.nivel);else CN.mostrar('juego');};
  $('#vMapa').onclick=()=>CN.mostrar('mapa');
  $('#vNueva').onclick=()=>CN.nuevaPartida(this.nivel);
  setInterval(()=>this.hudT(),250);},
 iniciar(destino){$('#menu').classList.add('oculto');$('#juegoUI').classList.remove('oculto');const go=()=>{if(!CN||!CN.listo)return setTimeout(go,100);destino==='mapa'?CN.mostrar('mapa'):CN.nuevaPartida(this.nivel);};go();},
 progreso(n,t){document.querySelectorAll('.nDes').forEach(e=>e.textContent=`${n}/${t}`);},
 vista(v){$('#vJuego').classList.toggle('sel',v==='juego');$('#vMapa').classList.toggle('sel',v==='mapa');$('#hud').classList.toggle('oculto',v!=='juego');
  $('#ayuda').textContent=v==='mapa'?'Toca una región o un pin · arrastra para girar · pellizca para zoom':'Toca dos cartas para encontrar su par';},
 hudT(){const e=CN&&CN.est;if(!e)return;const s=Math.floor(CN.tiempo()/1000);const t=$('#hT');if(t)t.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');},
 hud(){},
 resumen(r){const d=$('#resumen');d.classList.remove('oculto');const N=NIVELES[r.nivel],ks=Object.keys(NIVELES),sig=ks[ks.indexOf(r.nivel)+1];
  d.querySelector('.cont').innerHTML=`<h2 style="margin:4px">¡Memorama completo!</h2><div class="gran">${r.puntos}<small>puntos · nivel ${N.nombre}</small></div>
  <div class="stats"><div><b>${r.pares}</b>pares</div><div><b>${r.movs}</b>movimientos</div><div><b>${Math.floor(r.seg/60)}:${String(r.seg%60).padStart(2,'0')}</b>tiempo</div><div><b>+${r.bono}</b>bono tiempo</div><div><b class="nDes"></b>desbloqueadas</div></div>
  <button class="grande" id="rMapa">🗺 Ver Mapa de SLP</button><button class="sec" id="rOtra">↺ Jugar otra vez</button>${sig?`<button class="sec" id="rSig">Siguiente nivel: ${NIVELES[sig].nombre}</button>`:''}`;
  this.progreso(PROG.get().length,ESP().length);
  $('#rMapa').onclick=()=>{d.classList.add('oculto');CN.mostrar('mapa');};$('#rOtra').onclick=()=>{d.classList.add('oculto');CN.nuevaPartida(r.nivel);};
  if(sig)$('#rSig').onclick=()=>{d.classList.add('oculto');this.nivel=sig;localStorage.setItem('cnNivel',sig);CN.nuevaPartida(sig);};}
};
const _hud=AFRAME.components.conexion.Component.prototype;
_hud.hud=function(){const e=this.est;$('#hud').innerHTML=`<div><small>Puntos</small><b>${e.puntos}</b></div><div><small>Movimientos</small><b>${e.movs}</b></div><div><small>Tiempo</small><b id="hT">0:00</b></div><div><small>Pares</small><b>${e.pares}/${e.total}</b></div>`;UI.hudT();};
document.addEventListener('DOMContentLoaded',()=>UI.init());
})();
