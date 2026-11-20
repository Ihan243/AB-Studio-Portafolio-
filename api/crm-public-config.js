// Public, read-only Supabase configuration for the AB Studio admin sign-in.
// Never send SUPABASE_SECRET_KEY, passwords, or access tokens in this response.
module.exports = function publicConfig(req,res) {
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Type','application/json; charset=utf-8');
  if(req.method!=='GET') {
    res.setHeader('Allow','GET');
    return res.status(405).json({ok:false,error:'method_not_allowed'});
  }
  const url=String(process.env.SUPABASE_URL||'').trim().replace(/\/$/,'');
  const key=String(process.env.SUPABASE_PUBLISHABLE_KEY||'').trim();
  let valid=false;
  try {
    const u=new URL(url);
    valid=u.protocol==='https:' && /^[a-z0-9-]+\.supabase\.co$/i.test(u.hostname) && u.pathname==='/';
  }catch{}
  if(!valid || !key.startsWith('sb_publishable_')) {
    return res.status(503).json({ok:false,error:'public_config_missing'});
  }
  return res.status(200).json({ok:true,projectUrl:url,publishableKey:key});
};
