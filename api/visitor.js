// api/visitor.js
const { createClient } = require('@supabase/supabase-js');

// Konfigurasi sesuai data yang kamu miliki
const SUPABASE_URL = 'https://plwpgjwozugznrlwgtwc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IudfuYPNAbYypJ5_YQ-zng_SJ6tDNYP';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  // Izinkan akses dari situs kamu
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Tambah jumlah kunjungan
    await supabase.rpc('increment_visit', { 
      page_path: 'https://final-edu-seven.vercel.app/' 
    });
    
    // Ambil data jumlah kunjungan
    const { data, error } = await supabase
      .from('page_visits')
      .select('total_visits')
      .eq('page_url', 'https://final-edu-seven.vercel.app/')
      .single();

    if (error) throw error;
    
    // Kirim hasil
    return res.status(200).json({ count: data.total_visits });
  } catch (err) {
    console.error('Kesalahan API:', err);
    return res.status(500).json({ error: err.message });
  }
}
