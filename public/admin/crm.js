(() => {
'use strict';
const $ = s => document.querySelector(s);
const stages=['new','contacted','proposal','won','lost'];
const els={boot:$('#boot'),setup:$('#setup'),login:$('#login'),workspace:$('#workspace'),notice:$('#notice'),logout:$('#logout')};
const CACHE_KEY='abstudio.crm.public-config.v1';
let project=null,anon=null,token=null,leads=[],configuredFromServer=false;
const message=s=>{els.notice.textContent=s};
const visible=section=>{for(const k of ['boot','setup','login','workspace'])els[k].hidden=k!==section;els.logout.hidden=section!=='workspace';document.body.classList.toggle('crm-workspace-open',section==='workspace');if(section==='workspace')setActiveView('overview')};
const validUrl=u=>{try{const v=new URL(u);return v.protocol==='https:' && /^[a-z0-9-]+\.supabase\.co$/i.test(v.hostname) && v.pathname==='/'}catch{return false}};
const validPublicKey=k=>typeof k==='string' && k.startsWith('sb_publishable_') && k.length>20;
function savePublicSettings(url,key){
  project=url;anon=key;
  // Only the project URL and publishable (public) key are remembered, never passwords or tokens.
  try{localStorage.setItem(CACHE_KEY,JSON.stringify({url,key}))}catch{}
}
async function initialize(){
  visible('boot');
  let config=null;
  // Static configuration is bundled with the published site, so login works
  // even when the hosting provider does not deploy the optional API endpoint.
  const bundled=window.AB_STUDIO_CRM_PUBLIC_CONFIG;
  if(bundled && validUrl(bundled.projectUrl) && validPublicKey(bundled.publishableKey)){
    config={url:bundled.projectUrl,key:bundled.publishableKey};
    configuredFromServer=true;
  }
  if(!config) try{
    const response=await fetch('/api/crm-public-config',{cache:'no-store'});
    if(response.ok){
      const data=await response.json();
      if(data.ok===true && validUrl(data.projectUrl) && validPublicKey(data.publishableKey)){
        config={url:data.projectUrl,key:data.publishableKey};
        configuredFromServer=true;
      }
    }
  }catch{}
  if(!config){
    try{
      const saved=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');
      if(saved && validUrl(saved.url) && validPublicKey(saved.key))config=saved;
    }catch{}
  }
  if(config){
    savePublicSettings(config.url,config.key);
    $('#reset-config').hidden=configuredFromServer;
    visible('login');
    message('');
  }else{
    visible('setup');
    message('One-time setup required. Your password is never stored here.');
  }
}
async function request(path,options={}){
 const r=await fetch(project+path,{...options,headers:{apikey:anon,'Authorization':'Bearer '+token,'Content-Type':'application/json',...options.headers},cache:'no-store'});
 if(!r.ok){if(r.status===401||r.status===403)throw new Error('Not authorized. Check team membership or sign in again.');throw new Error('Request failed ('+r.status+').')}
 return r.status===204?null:r.json();
}
$('#setup-form').addEventListener('submit',e=>{
 e.preventDefault();
 const form=e.currentTarget,f=new FormData(form),u=String(f.get('url')).trim().replace(/\/$/,'');
 const key=String(f.get('anon')).trim();
 if(!validUrl(u)||!validPublicKey(key)){message('Use a valid https://PROJECT.supabase.co URL and sb_publishable_ key.');return}
 savePublicSettings(u,key);
 form.reset();
 visible('login');
 message('Public connection settings saved in this browser. Sign in with email and password.');
});
$('#reset-config').addEventListener('click',()=>{
 if(configuredFromServer)return;
 try{localStorage.removeItem(CACHE_KEY)}catch{}
 project=null;anon=null;token=null;leads=[];
 visible('setup');message('Public settings cleared. Set them once to continue.');
});
function explainAuthFailure(status,payload){
 const code=String(payload?.code||payload?.error_code||payload?.error||'').toLowerCase();
 const detail=String(payload?.msg||payload?.message||payload?.error_description||'').toLowerCase();
 if(/api.?key|invalid.?apikey|invalid.?key|unknown.?api.?key/.test(code+' '+detail)){
   return 'CRM configuration error: the Supabase publishable key is not accepted by this project. Check the Project URL and Publishable key in Supabase.';
 }
 if(code.includes('email_not_confirmed') || detail.includes('email not confirmed')){
   return 'Your email address needs confirmation in Supabase Authentication before you can sign in.';
 }
 if(code.includes('invalid_credentials') || detail.includes('invalid login credentials')){
   return 'Supabase rejected the email or password. Check that this is the administrator account in the configured Supabase project.';
 }
 if(status===429 || code.includes('rate_limit')){
   return 'Too many sign-in attempts. Wait before trying again or reset your password through Supabase.';
 }
 return 'Supabase sign-in failed (HTTP '+status+(code?', '+code:'')+'). Check the administrator account and project configuration.';
}
$('#login-form').addEventListener('submit',async e=>{
 e.preventDefault();
 const form=e.currentTarget,f=new FormData(form),button=form.querySelector('button');
 if(!project || !anon){visible('setup');message('Configure your CRM connection first.');return}
 button.disabled=true;message('Signing in...');
 try{
   const r=await fetch(project+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:anon,'Content-Type':'application/json'},body:JSON.stringify({email:f.get('email'),password:f.get('password')})});
   if(!r.ok){const failure=await r.json().catch(()=>null);throw new Error(explainAuthFailure(r.status,failure));}
   const data=await r.json();if(!data?.access_token)throw new Error('Supabase did not return a valid session token.');token=data.access_token;
   const staff=await request('/rest/v1/crm_staff?select=user_id&limit=1');
   if(!Array.isArray(staff)||staff.length!==1)throw new Error('This account is not approved for AB Studio CRM.');
   form.reset();visible('workspace');message('Signed in. Session stays in this tab only.');await load();
 }catch(err){token=null;visible('login');message(err.message)}
 finally{button.disabled=false}
});
$('#logout').addEventListener('click',()=>{token=null;leads=[];visible('login');message('Signed out.')});
$('#refresh').addEventListener('click',load);
$('#refresh-leads').addEventListener('click',load);
$('#search').addEventListener('input',render);
$('#filter').addEventListener('change',render);
$('#open-leads').addEventListener('click',()=>setActiveView('leads'));
document.querySelectorAll('[data-crm-view]').forEach(button=>{
 button.addEventListener('click',()=>setActiveView(button.dataset.crmView));
});
function setActiveView(view){
 if(!['overview','leads'].includes(view))return;
 $('#view-overview').hidden=view!=='overview';
 $('#view-leads').hidden=view!=='leads';
 document.querySelectorAll('[data-crm-view]').forEach(button=>{
  const active=button.dataset.crmView===view;
  button.classList.toggle('is-active',active);
  if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
 });
}
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node}
function field(labelText,control){const l=el('label');l.append(el('span','',labelText),control);return l}
function render(){
 const q=$('#search').value.trim().toLowerCase(),filter=$('#filter').value;
 const shown=leads.filter(x=>(!filter||x.status===filter)&&(!q||[x.name,x.email,x.service].some(v=>String(v||'').toLowerCase().includes(q))));
 const box=$('#leads');box.replaceChildren();
 const metric=$('#metrics');metric.replaceChildren();
 const won=leads.filter(l=>l.status==='won').reduce((n,l)=>n+Number(l.estimated_value||0),0);
 [['Total inquiries',leads.length],['New',leads.filter(l=>l.status==='new').length],['In proposals',leads.filter(l=>l.status==='proposal').length],['Won value','$'+won.toLocaleString('en-US')]].forEach(([name,n])=>{const m=el('div','metric');m.append(el('span','',name),el('strong','',String(n)));metric.append(m)});
 $('#leads-count').textContent=String(leads.length);
 const recent=$('#recent-leads');recent.replaceChildren();
 if(!leads.length)recent.append(el('p','crm-empty','No leads yet. New inquiries will appear here.'));
 leads.slice(0,5).forEach(x=>{
   const item=el('button','crm-recent-row');item.type='button';
   const details=el('span','crm-recent-info');
   details.append(el('strong','',x.name),el('small','',(x.service||'Unspecified service')+' · '+new Date(x.created_at).toLocaleDateString()));
   const stageName=stages.includes(x.status)?x.status:'new';
   const status=el('span','crm-stage-tag crm-stage-'+stageName,stageName[0].toUpperCase()+stageName.slice(1));
   item.append(details,status);
   item.addEventListener('click',()=>{
     $('#search').value=x.email||x.name;
     $('#filter').value='';
     setActiveView('leads');render();
   });
   recent.append(item);
 });
 if(!shown.length)box.append(el('p','', 'No inquiries match your filters.'));
 shown.forEach(x=>{
  const card=el('article','lead');card.append(el('div','muted',new Date(x.created_at).toLocaleString()),el('h2','',x.name),el('div','meta',x.email+' · '+(x.service||'Unspecified service')+' · '+x.channel),el('p','description',x.description));
  const edit=el('form','edit');
  const stage=document.createElement('select');stages.forEach(s=>{const o=new Option(s[0].toUpperCase()+s.slice(1),s);stage.add(o)});stage.value=x.status;
  const amount=document.createElement('input');amount.type='number';amount.min='0';amount.max='9999999999';amount.step='0.01';amount.value=x.estimated_value||0;
  const notes=document.createElement('textarea');notes.maxLength=3000;notes.value=x.notes||'';
  const save=el('button','', 'Save changes');save.type='submit';
  edit.append(field('Stage',stage),field('Estimated USD',amount),field('Private notes',notes),save);
  edit.addEventListener('submit',async ev=>{ev.preventDefault();save.disabled=true;try{
   const payload={status:stage.value,estimated_value:Number(amount.value),notes:notes.value.slice(0,3000),updated_at:new Date().toISOString()};
   if(!stages.includes(payload.status)||!Number.isFinite(payload.estimated_value)||payload.estimated_value<0)throw Error('Invalid values.');
   await request('/rest/v1/crm_leads?id=eq.'+encodeURIComponent(x.id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify(payload)});
   Object.assign(x,payload);message('Changes saved for '+x.name);render();
  }catch(err){message(err.message);save.disabled=false}});
  card.append(edit);box.append(card);
 });
}
async function load(){if(!token)return;message('Loading inquiries...');try{const rows=await request('/rest/v1/crm_leads?select=id,name,email,description,service,plan,channel,status,estimated_value,notes,created_at&order=created_at.desc&limit=200');leads=rows;render();message('Showing the latest '+rows.length+' inquiries (maximum 200).')}catch(e){message(e.message)}}
initialize();
})();