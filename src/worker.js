const PAGE = String.raw`<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#090d18">
  <title>Device Empire</title>
  <style>
    :root{color-scheme:dark;--bg:#090d18;--panel:#111a2b;--line:#26354d;--cyan:#42d9ff;--purple:#9c7bff;--text:#eef5ff;--muted:#91a3bd}
    *{box-sizing:border-box}body{margin:0;background:radial-gradient(ellipse at 15% 0%,#17314a 0,transparent 38%),var(--bg);color:var(--text);font:15px/1.5 system-ui, sans-serif}
    .shell{max-width:1100px;margin:auto;padding:24px}.top{display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line);padding-bottom:18px}
    .brand{font-size:20px;font-weight:800;letter-spacing:.4px}.brand span{color:var(--cyan)}.tag{color:var(--muted);font-size:12px}
    .hero{padding:48px 0 28px}.eyebrow{color:var(--cyan);font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase}
    h1{font-size:clamp(34px,7vw,64px);line-height:1.03;max-width:720px;margin:12px 0}.hero p{max-width:600px;color:var(--muted)}
    .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:26px}.card{background:linear-gradient(145deg,#152238,#0e1625);border:1px solid var(--line);border-radius:18px;padding:20px;min-height:150px}
    .card .ico{font-size:26px}.card h2{font-size:17px;margin:12px 0 5px}.card p{color:var(--muted);font-size:13px;margin:0}
    .status{display:inline-flex;align-items:center;gap:8px;border:1px solid #28546a;background:#102b3b;color:#9deaff;border-radius:999px;padding:7px 11px;font-size:12px}
    .dot{width:7px;height:7px;border-radius:50%;background:#54e5a2;box-shadow:0 0 12px #54e5a2}
    footer{margin-top:34px;color:var(--muted);font-size:12px}
    @media(max-width:680px){.shell{padding:18px}.grid{grid-template-columns:1fr}.hero{padding:36px 0 18px}.top{align-items:flex-start;flex-direction:column}}
  </style>
</head>
<body>
  <main class="shell">
    <header class="top"><div><div class="brand">DEVICE <span>EMPIRE</span></div><div class="tag">Build technology. Build your empire.</div></div><div class="status"><i class="dot"></i> Core online · Foundation 0.1</div></header>
    <section class="hero"><div class="eyebrow">Your technology journey starts here</div><h1>From a small startup to a tech empire.</h1><p>Bangun perusahaan teknologi, teliti komponen, rancang perangkat, kelola produksi, dan kembangkan bisnis hingga mendunia.</p></section>
    <section class="grid">
      <article class="card"><div class="ico">🏢</div><h2>Company</h2><p>Kelola identitas, keuangan, reputasi, dan perkembangan perusahaan.</p></article>
      <article class="card"><div class="ico">🧪</div><h2>Research & Development</h2><p>Kembangkan CPU, GPU, layar, baterai, dan teknologi baru.</p></article>
      <article class="card"><div class="ico">📱</div><h2>Device Creator</h2><p>Rancang smartphone, laptop, tablet, dan perangkat lainnya.</p></article>
      <article class="card"><div class="ico">🏭</div><h2>Manufacturing</h2><p>Bangun fasilitas dan atur proses produksi perangkat.</p></article>
      <article class="card"><div class="ico">📈</div><h2>Marketplace</h2><p>Pasarkan produk, pantau permintaan, dan bersaing di pasar.</p></article>
      <article class="card"><div class="ico">🌐</div><h2>Technology World</h2><p>Hadapi tren pasar, kompetitor, dan perkembangan industri.</p></article>
    </section>
    <footer>Device Empire · Early foundation build · Progression systems are under construction.</footer>
  </main>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return Response.json({ ok: true, app: "device-empire", version: "0.1.0" });
    }
    if (url.pathname !== "/" && url.pathname !== "/index.html") {
      return new Response("Not Found", { status: 404 });
    }
    return new Response(PAGE, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store"
      }
    });
  }
};