import Head from 'next/head';

export async function getServerSideProps() {
  const SITE_DOMAIN = process.env.SITE_DOMAIN || 'https://cn.raytron.group';
  const ALT_DOMAIN = process.env.ALT_DOMAIN || 'https://en.raytron.group';
  return { props: { SITE_DOMAIN, ALT_DOMAIN } };
}

export default function CNHome({ SITE_DOMAIN, ALT_DOMAIN }) {
  const canonical = `${SITE_DOMAIN}/`;
  const altUrl = `${ALT_DOMAIN}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": SITE_DOMAIN,
    "inLanguage": "zh-CN"
  };
  return (
    <>
      <Head>
        <title>锐创 — 铜包覆导体材料全球供应商</title>
        <meta name="description" content="锐创生产高性能铜包铝、铜包钢、铜扁线与光伏焊带，适用于光伏、电池与汽车系统。" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" href={canonical} hreflang="zh-CN" />
        <link rel="alternate" href={altUrl} hreflang="en" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <main style={{maxWidth:1200,margin:'36px auto',padding:'0 20px'}}>
        <h1>光伏焊带与铜包铝解决方案 — 锐创</h1>
        <p>专业制造铜包铝（CCA）、铜包钢（CCS）与各类高精度扁线。支持定制与样品申请。</p>

        <a href={`${SITE_DOMAIN}/contact/`} style={{display:'inline-block',padding:'10px 16px',background:'#0B5FFF',color:'#fff',borderRadius:8}}>联系我们</a>
        <section style={{marginTop:24}}>
          <form method="post" action={`${SITE_DOMAIN}/api/submit`}>
            <label>公司名称 *</label><input name="company" required style={{width:'100%',padding:8,marginBottom:8}} />
            <label>联系人 *</label><input name="contact" required style={{width:'100%',padding:8,marginBottom:8}} />
            <label>邮箱 *</label><input name="email" type="email" required style={{width:'100%',padding:8,marginBottom:8}} />
            <label>信息</label><textarea name="message" style={{width:'100%',padding:8,marginBottom:8}} />
            <button type="submit" style={{padding:'10px 16px',background:'#0B5FFF',color:'#fff',borderRadius:8}}>提交</button>
          </form>
        </section>
      </main>
    </>
  );
}
