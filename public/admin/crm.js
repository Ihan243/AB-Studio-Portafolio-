(() => {
'use strict';
const $ = s => document.querySelector(s);
const stages=['new','contacted','proposal','won','lost'];
const els={setup:$('#setup'),login:$('#login'),workspace:$('#workspace'),notice:$('#notice'),logout:$('#logout')};
let project=null,anon=null,token=null,leads=[];
const message=s=>{els.notice.textContent=s};
const visible=section=>{for(const k of ['setup','login','workspace'])els[k].hidden=k!==section;els.logout.hidden=section!=='workspace'};
const validUrl=u=>{try{const v=new URL(u);return v.protocol==='https:' && /^[a-z0-9-]+\.supabase\.co$/i.test(v.hostname) && v.pathname==='/'}catch{return false}};
async function request(path,options={}){
 const r=await fetch(project+path,{...options,headers:{apikey:anon,'Authorization':'Bearer '+(token||anon),'Content-Type':'application/json',...options.headers},cache:'no-store'});
 if(!r.ok){if(r.status===401||r.status===403)throw new Error('Not authorized. Check team membership or sign in again.');throw new Error('Request failed ('+r.status+').')}
 return r.status===204?null:r.json();
}
$('#setup-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const u=String(f.get('url')).trim().replace(/\/$/,'');const key=String(f.get('anon')).trim();if(!validUrl(u)||!key.startsWith('sb_publishable_')){message('Use a valid https://PROJECT.supabase.co URL and sb_publishable_ key.');return;}project=u;anon=key;visible('login');message('Project configured for this tab. Sign in to continue.');});
$('#reset-config').addEventListener('click',()=>{project=null;anon=null;token=null;visible('setup');message('')});
$('#login-form').addEventListener('submit',async e=>{
 e.preventDefault();const f=new FormData(e.currentTarget),button=e.currentTarget.querySelector('button');button.disabled=true;message('Signing in...');
 try{
   const r=await fetch(project+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:anon,'Content-Type':'application/json'},body:JSON.stringify({email:f.get('email'),password:f.get('password')})});
   if(!r.ok)throw new Error('Sign-in failed. Check your credentials.');
   const data=await r.json();token=data.access_token;
   const staff=await request('/rest/v1/crm_staff?select=user_id&limit=1');
   if(!Array.isArray(staff)||staff.length!==1)throw new Error('This account is not approved for AB Studio CRM.');
   e.currentTarget.reset();visible('workspace');message('Signed in. Session exists only in this tab.');await load();
 }catch(err){token=null;visible('login');message(err.message)}
 finally{button.disabled=false}
});
$('#logout').addEventListener('click',()=>{token=null;leads=[];visible('login');message('Signed out.')});
$('#refresh').addEventListener('click',load);
$('#search').addEventListener('input',render);
$('#filter').addEventListener('change',render);
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node}
function field(labelText,control){const l=el('label');l.append(el('span','',labelText),control);return l}
function render(){
 const q=$('#search').value.trim().toLowerCase(),filter=$('#filter').value;
 const shown=leads.filter(x=>(!filter||x.status===filter)&&(!q||[x.name,x.email,x.service].some(v=>String(v||'').toLowerCase().includes(q))));
 const box=$('#leads');box.replaceChildren();
 const metric=$('#metrics');metric.replaceChildren();
 const won=leads.filter(l=>l.status==='won').reduce((n,l)=>n+Number(l.estimated_value||0),0);
 [['Total inquiries',leads.length],['New',leads.filter(l=>l.status==='new').length],['In proposals',leads.filter(l=>l.status==='proposal').length],['Won value','$'+won.toLocaleString('en-US')]].forEach(([name,n])=>{const m=el('div','metric');m.append(el('span','',name),el('strong','',String(n)));metric.append(m)});
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
visible('setup');
})();