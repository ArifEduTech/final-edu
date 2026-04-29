// api/visitor.js
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://plwpgjwozugznrlwgtwc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IudfuYPNAbYypJ5_YQ-zng_SJ6tDNYP';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  // Izinkan akses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const HALAMAN = 'https://final-edu-seven.vercel.app/';

    // Cek apakah data sudah ada
    const { data: cekData, error: errorCek } = await supabase
      .from('page_visits')
      .select('total_visits')
      .eq('page_url', HALAMAN)
      .maybeSingle();

    let jumlah;
    if (!cekData) {
      // Jika belum ada, buat data baru dengan nilai 1
      const { data: dataBaru, error: errorBaru } = await supabase
        .from('page_visits')
        .insert([{ page_url: HALAMAN, total_visits: 1 }])
        .select('total_visits')
        .single();
      jumlah = dataBaru.total_visits;
    } else {
      // Jika sudah ada, tambah 1
      const { data: dataUpdate, error: errorUpdate } = await supabase
        .from('page_visits')
        .update({ total_visits: cekData.total_visits + 1 })
        .eq('page_url', HALAMAN)
        .select('total_visits')
        .single();
      jumlah = dataUpdate.total_visits;
    }

    res.status(200).json({ count: jumlah });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
}
