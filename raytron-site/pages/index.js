import Head from 'next/head';
import Image from 'next/image';

export async function getServerSideProps(ctx) {
  const SITE_DOMAIN = process.env.SITE_DOMAIN || 'https://en.raytron.group';
  const ALT_DOMAIN = process.env.ALT_DOMAIN || 'https://cn.raytron.group';
  const LANG = process.env.LANG || 'en';
  return { props: { SITE_DOMAIN, ALT_DOMAIN, LANG } };
}

export default function Home({ SITE_DOMAIN, ALT_DOMAIN, LANG }) {
  const canonical = `${SITE_DOMAIN}/`;
  const altUrl = `${ALT_DOMAIN}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_DOMAIN}/#org`,
        "name": "Raytron",
        "url": SITE_DOMAIN,
        "logo": `${SITE_DOMAIN}/assets/logo.png`,
        "contactPoint": [{
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "sales@raytron.group",
          "telephone": "+86-575-85550857"
        }]
      },
      {
        "@type": "WebSite",
        "url": SITE_DOMAIN,
        "name": "Raytron",
        "inLanguage": LANG
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": canonical }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Raytron — Global Leader in Bimetal Conductive Materials</title>
        <meta name="description" content="Raytron produces high-performance bimetal conductive materials (CCA, CCS, copper flat wire) for solar, battery and automotive applications." />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" href={canonical} hreflang={LANG} />
        <link rel="alternate" href={altUrl} hreflang="zh-CN" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <header style={{display:'flex',justifyContent:'space-between',padding:20,borderBottom:'1px solid #eee'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src={`${SITE_DOMAIN}/assets/logo.png`} alt="Raytron logo" width="36" height="36"/>
          <div><strong>Raytron</strong><div style={{fontSize:12,color:'#666'}}>Bimetal conductive materials</div></div>
        </div>
        <nav>
          <a href={`${SITE_DOMAIN}/`} style={{marginRight:12}}>Home</a>
          <a href={`${SITE_DOMAIN}/products/`} style={{marginRight:12}}>Products</a>
          <a href={`${SITE_DOMAIN}/contact/`}>Contact</a>
        </nav>
      </header>

      <main style={{maxWidth:1200,margin:'36px auto',padding:'0 20px'}}>
        <section style={{display:'grid',gridTemplateColumns:'1fr 480px',gap:32,alignItems:'center'}}>
          <div>
            <div style={{textTransform:'uppercase',fontSize:12,color:'#777'}}>Global manufacturing · Precision · Compliance</div>
            <h1 style={{fontSize:36,margin:'16px 0'}}>Raytron: Global Leader in Bimetal Conductive Materials</h1>
            <p style={{color:'#333'}}>Specialist in copper-clad aluminum (CCA), copper-clad steel (CCS), copper flat wires and photovoltaic ribbons. Raytron delivers engineered conductor solutions for solar, battery storage and automotive electrification.</p>

            <div style={{marginTop:18,display:'flex',gap:12}}>
              <a href={`${SITE_DOMAIN}/contact/#inquiry-form`} style={{padding:'10px 16px',background:'#0B5FFF',color:'#fff',borderRadius:8}}>Contact Us</a>
              <a href={`${SITE_DOMAIN}/assets/Raytron-Catalog.pdf`} target="_blank" rel="noopener" style={{padding:'10px 16px',borderRadius:8,border:'1px solid #0B5FFF'}}>Download Catalog</a>
            </div>
            <div style={{marginTop:12,color:'#666'}}>Core keyword: <strong>Copper clad materials manufacturer</strong></div>
          </div>

          <div style={{borderRadius:12,overflow:'hidden',border:'1px solid #eef2f7',height:360}}>
            <Image src={`${SITE_DOMAIN}/assets/hero-flat-wire.webp`} alt="High-precision flat wire" width={600} height={360} style={{objectFit:'cover'}} />
          </div>
        </section>

        <section id="inquiry-form" style={{marginTop:40}}>
          <h2>Quick Inquiry</h2>
          <form method="post" action={`${SITE_DOMAIN}/api/submit`} style={{maxWidth:720}}>
            <label>Company *</label>
            <input name="company" required style={{width:'100%',padding:8,marginBottom:8}}/>

            <label>Contact *</label>
            <input name="contact" required style={{width:'100%',padding:8,marginBottom:8}}/>

            <label>Email *</label>
            <input name="email" type="email" required style={{width:'100%',padding:8,marginBottom:8}}/>

            <label>Message</label>
            <textarea name="message" style={{width:'100%',padding:8,marginBottom:12}} />

            <button type="submit" style={{padding:'10px 16px',background:'#0B5FFF',color:'#fff',borderRadius:8}}>Submit Inquiry</button>
          </form>
        </section>
      </main>

      <footer style={{padding:28,textAlign:'center',borderTop:'1px solid #f1f1f1',color:'#666'}}>
        © {new Date().getFullYear()} Raytron. All rights reserved.
      </footer>
    </>
  );
}
