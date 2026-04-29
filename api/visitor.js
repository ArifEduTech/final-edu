// api/visitor.js
const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase sesuai data yang kamu miliki
const SUPABASE_URL = 'https://plwpgjwozugznrlwgtwc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IudfuYPNAbYypJ5_YQ-zng_SJ6tDNYP';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  try {
    // Menambah jumlah kunjungan untuk halaman kamu
    await supabase.rpc('increment_visit', { 
      page_path: 'https://final-edu-seven.vercel.app/' 
    });
    
    // Mengambil data jumlah kunjungan terbaru
    const { data, error } = await supabase
      .from('page_visits')
      .select('total_visits')
      .eq('page_url', 'https://final-edu-seven.vercel.app/')
      .single();

    if (error) throw error;
    
    // Mengirim hasil ke halaman web
    res.status(200).json({ count: data.total_visits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
