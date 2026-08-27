import { useState, useEffect } from "react"
import logoImg from "@/imports/13D1F0DD-2D27-482F-A5C5-0B60194042FE.PNG"

// ─── TOKENS ──────────────────────────────────────────────────────────────────

const GOLD       = "#b8973a"
const GOLD_LIGHT = "#d4af5a"
const GOLD_GRAD  = `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 55%, #c9a84c 100%)`
const BG         = "#080808"
const BG_ALT     = "#0d0d0d"
const TEXT       = "#e8e2d8"
const TEXT_MUTED = "rgba(232,226,216,0.45)"
const TEXT_DIM   = "rgba(232,226,216,0.22)"
const BORDER     = "rgba(184,151,58,0.16)"

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────

function Section({ id, alt, children, noPad }: {
  id?: string; alt?: boolean; children: React.ReactNode; noPad?: boolean
}) {
  return (
    <section id={id} style={{ background: alt ? BG_ALT : BG, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: noPad ? 0 : "108px 40px" }}>
        {children}
      </div>
    </section>
  )
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontSize: 10, letterSpacing: "0.34em", color: GOLD, marginBottom: 18, fontWeight: 500 }}>
      {children}
    </p>
  )
}

function Rule() {
  return <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${GOLD}44,transparent)` }} />
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

const NAV = ["COLLECTION", "ABOUT", "CONCEPT", "ATELIER", "CONTACT"]

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
      borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}`,
      backdropFilter: scrolled ? "blur(14px)" : "none",
      transition: "background .4s, border-color .4s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", height: 104, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
          <img src={logoImg} alt="VELLENCE" style={{ height: 76, width: 76, objectFit: "contain" }} />
          <span className="font-display gold-gradient" style={{ fontSize: 27, letterSpacing: "0.24em", fontWeight: 600 }}>VELLENCE</span>
        </a>

        <ul className="nav-links" style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {NAV.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} style={{
                fontSize: 10, letterSpacing: "0.2em", color: TEXT,
                textDecoration: "none", opacity: .6, fontWeight: 500, transition: "opacity .2s, color .2s",
              }}
                onMouseEnter={e => { const t = e.target as HTMLElement; t.style.opacity="1"; t.style.color=GOLD }}
                onMouseLeave={e => { const t = e.target as HTMLElement; t.style.opacity=".6"; t.style.color=TEXT }}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {[
            <svg key="s" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
            <svg key="c" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
          ].map((icon, i) => (
            <button key={i} style={{ background:"none",border:"none",cursor:"pointer",color:TEXT,opacity:.5,padding:4 }}>{icon}</button>
          ))}
          <button className="nav-burger" onClick={() => setOpen(!open)}
            style={{ background:"none",border:"none",cursor:"pointer",color:TEXT,padding:4,display:"none" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M18 6 6 18M6 6l12 12"/> : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background:"rgba(8,8,8,.98)", borderTop:`1px solid ${BORDER}`, padding:"20px 40px 28px" }}>
          {NAV.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{
              display:"block", fontSize:12, letterSpacing:"0.2em", color:TEXT,
              textDecoration:"none", padding:"11px 0", borderBottom:`1px solid ${BORDER}`, opacity:.7,
            }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── COLLECTION CARD (text-only) ─────────────────────────────────────────────

const COLLECTIONS = [
  { id:1, name:"The Sovereign Suit",  category:"TAILORING",  price:"¥128,000", note:"Italian Wool · Slim Silhouette" },
  { id:2, name:"Midnight Overcoat",   category:"OUTERWEAR",  price:"¥98,000",  note:"Cashmere Blend · Structured Shoulder" },
  { id:3, name:"Onyx Dress Shirt",    category:"SHIRTING",   price:"¥32,000",  note:"Sea Island Cotton · French Cuff" },
  { id:4, name:"The Prestige Blazer", category:"TAILORING",  price:"¥84,000",  note:"Virgin Wool · Double-Vented" },
]

function CollectionCard({ item }: { item: typeof COLLECTIONS[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#121212" : BG_ALT,
        border: `1px solid ${hov ? GOLD+"44" : BORDER}`,
        padding: "40px 36px",
        cursor: "pointer",
        transition: "background .3s, border-color .3s",
        display: "flex", flexDirection: "column", gap: 0,
      }}>
      <p style={{ fontSize: 9, letterSpacing: "0.28em", color: GOLD, marginBottom: 14 }}>{item.category}</p>
      <p className="font-display" style={{ fontSize: "clamp(20px,2vw,28px)", fontWeight: 500, lineHeight: 1.2, color: TEXT, marginBottom: 10 }}>{item.name}</p>
      <p style={{ fontSize: 12, color: TEXT_MUTED, letterSpacing: "0.05em", marginBottom: 36, lineHeight: 1.7 }}>{item.note}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <span style={{ fontSize: 15, color: GOLD, fontWeight: 500 }}>{item.price}</span>
        <span style={{
          fontSize: 9, letterSpacing: "0.22em", color: hov ? BG : GOLD,
          background: hov ? GOLD_GRAD : "none",
          border: hov ? "none" : `1px solid ${GOLD}55`,
          padding: "9px 20px", transition: "background .3s, color .3s, border-color .3s",
        }}>ADD TO BAG</span>
      </div>
    </div>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>
      <NavBar />

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", background: BG }}>
        {/* Decorative V silhouette */}
        <div style={{
          position: "absolute", right: "-6%", bottom: "-14%",
          width: "50vw", maxWidth: 720, aspectRatio: "0.8",
          opacity: .03,
          background: `radial-gradient(ellipse at center, ${GOLD} 0%, transparent 72%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "4%", bottom: "-10%",
          fontSize: "clamp(320px,42vw,680px)", lineHeight: .82,
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: `1px ${GOLD}15`,
          pointerEvents: "none", userSelect: "none",
        }}>V</div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", width: "100%", paddingTop: 104 }}>
          <div style={{ maxWidth: 700, margin: "0 auto", paddingTop: 40, textAlign: "center" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.36em", color: GOLD, marginBottom: 20, fontWeight: 500 }}>
              AUTUMN / WINTER 2026
            </p>
            <p className="font-display" style={{ lineHeight:1.7, fontWeight:500, color:TEXT, marginBottom:52, letterSpacing:"-0.01em" }}>
              <span style={{ display:"block", fontSize:"clamp(14px,2.3vw,30px)" }}>強さだけでなく、柔らかさや余裕も持つ。</span>
              <span style={{ display:"block", fontSize:"clamp(12px,2vw,28px)" }}>品格ある男性のための、<em className="gold-gradient" style={{ fontStyle:"italic" }}>新しいラグジュアリー。</em></span>
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:36, flexWrap:"wrap" }}>
              <a href="#collection" style={{ padding:"18px 48px", background:GOLD_GRAD, color:BG, textDecoration:"none", fontSize:11, letterSpacing:"0.26em", fontWeight:700 }}>
                EXPLORE COLLECTION
              </a>
              <a href="#about" style={{
                display:"flex", alignItems:"center", gap:10,
                color:GOLD, textDecoration:"none", fontSize:10, letterSpacing:"0.24em", fontWeight:500,
                borderBottom:"1px solid transparent", paddingBottom:2, transition:"border-color .2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = GOLD }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent" }}>
                OUR STORY
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ position:"relative", marginTop:96, paddingTop:40, maxWidth:900, marginLeft:"auto", marginRight:"auto" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${BORDER} 20%, ${BORDER} 80%, transparent)` }} />
            <div style={{ display:"flex", gap:0, justifyContent:"center" }} className="stats-row">
            {[
              { num:"12+",   label:"Years of Mastery" },
              { num:"100%",  label:"Handcrafted Details" },
              { num:"3",     label:"Flagship Ateliers" },
              { num:"∞",     label:"Presence Defined" },
            ].map((s, i) => (
              <div key={s.label} style={{
                flex:1, padding:"0 32px",
                position:"relative", textAlign:"center",
              }}>
                {i !== 0 && <div style={{ position:"absolute", left:0, top:4, bottom:4, width:1, background:`linear-gradient(180deg, transparent, ${BORDER}, transparent)` }} />}
                <p className="font-display gold-gradient" style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:700, lineHeight:1, marginBottom:8 }}>{s.num}</p>
                <p style={{ fontSize:11, color:TEXT_MUTED, letterSpacing:"0.08em" }}>{s.label}</p>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div style={{ position:"absolute", bottom:40, left:40, display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:1, height:44, background:`${GOLD}40` }} />
          <span style={{ fontSize:9, letterSpacing:"0.28em", color:TEXT_DIM }}>SCROLL</span>
        </div>
        <p className="font-editorial nav-links" style={{ position:"absolute", bottom:44, right:40, fontSize:12, fontStyle:"italic", color:TEXT_DIM, letterSpacing:"0.1em" }}>
          DEFINE YOUR PRESENCE.
        </p>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, background:BG_ALT, padding:"13px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", gap:60, whiteSpace:"nowrap", animation:"marquee 28s linear infinite" }}>
          {Array(4).fill(null).map((_,i) => (
            <span key={i} style={{ display:"flex", gap:60, flexShrink:0 }}>
              {["静かな強さを、纏う。","DEFINE YOUR PRESENCE","VELVET × EXCELLENCE","AUTUMN WINTER 2026","TOKYO — 東京"].map(t => (
                <span key={t} style={{ fontSize:10, letterSpacing:"0.3em", color:`${GOLD}55`, fontWeight:500 }}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <Section id="about">
        <div style={{ textAlign:"center", marginBottom:96 }}>
          <Eyebrow>BRAND CONCEPT</Eyebrow>
          <h2 className="font-display" style={{ fontSize:"clamp(44px,7vw,88px)", fontWeight:500, lineHeight:.95, letterSpacing:"-0.02em" }}>
            <span style={{ color:TEXT_DIM, fontSize:".82em" }} className="font-editorial"><em>DEFINE YOUR</em></span>
            <br />
            <span className="gold-gradient">PRESENCE.</span>
          </h2>
          <p style={{ fontSize:15, lineHeight:2, color:TEXT_MUTED, maxWidth:520, margin:"28px auto 0", letterSpacing:"0.04em" }}>
            服で別人になるのではなく、その人が本来持っている<br />
            自信や魅力を完成させる。<em style={{ fontStyle:"italic", color:`${GOLD}88` }}>存在を、完成させる。</em>
          </p>
        </div>

        <Rule />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px 100px", marginTop:80 }} className="two-col">
          <div>
            <Eyebrow>VELLENCE とは</Eyebrow>
            <h3 className="font-display" style={{ fontSize:"clamp(22px,2.6vw,36px)", fontWeight:500, lineHeight:1.2, marginBottom:24, letterSpacing:"-0.01em" }}>
              派手に見せなくても、<br />
              <em style={{ fontStyle:"italic", color:GOLD }}>自然と品格が伝わる</em><br />
              男性のために。
            </h3>
            <p style={{ fontSize:14, lineHeight:2.1, color:TEXT_MUTED, letterSpacing:"0.04em" }}>
              高級ブランドのような品質と世界観を持ちながら、
              日常でも着用しやすい服を展開します。
              強さだけでなく、柔らかさや余裕も持つ——
              品格ある男性を、静かに表現するブランドです。
            </p>
          </div>
          <div>
            <Eyebrow>ブランドコンセプト</Eyebrow>
            <p className="font-display" style={{ fontSize:"clamp(18px,2vw,28px)", fontWeight:400, lineHeight:1.6, marginBottom:20, color:TEXT, letterSpacing:"-0.005em" }}>
              「ブランドが目立つ服」ではなく、<br />
              <em style={{ fontStyle:"italic", color:GOLD }}>&ldquo;着ている男性自身が魅力的に見える服&rdquo;</em>
              を作ります。
            </p>
            <p style={{ fontSize:13, lineHeight:2.1, color:TEXT_MUTED, letterSpacing:"0.04em" }}>
              素材の質、シルエット、縫製、細かなデザインによって、
              着る人の品格を自然に引き出す。
              それがVELLENCEの考える新しいラグジュアリーです。
            </p>
          </div>
        </div>
      </Section>

      {/* ── NAME MEANING ── */}
      <Section id="concept" alt>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <Eyebrow>NAME ORIGIN</Eyebrow>
          <h2 className="font-display" style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:500, lineHeight:1.1, letterSpacing:"-0.01em" }}>
            名前に込めた意味
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:0 }} className="name-grid">
          <div style={{ padding:"52px 48px", borderTop:`2px solid ${GOLD}`, background:`${GOLD}07` }}>
            <p className="font-display gold-gradient" style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:700, letterSpacing:"0.04em", marginBottom:8 }}>VELVET</p>
            <p style={{ fontSize:10, letterSpacing:"0.26em", color:TEXT_MUTED, marginBottom:28 }}>ベルベット</p>
            {["柔らかさ","上質さ","深みのある色気"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:GOLD, flexShrink:0 }} />
                <span style={{ fontSize:14, color:TEXT_MUTED, letterSpacing:"0.05em" }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"0 36px", borderTop:`2px solid ${BORDER}` }}>
            <span className="font-display gold-gradient" style={{ fontSize:40, fontWeight:300 }}>×</span>
          </div>

          <div style={{ padding:"52px 48px", borderTop:`2px solid ${BORDER}` }}>
            <p className="font-display" style={{ fontSize:"clamp(28px,3.8vw,52px)", fontWeight:700, letterSpacing:"0.04em", marginBottom:8, color:TEXT }}>EXCELLENCE</p>
            <p style={{ fontSize:10, letterSpacing:"0.26em", color:TEXT_MUTED, marginBottom:28 }}>エクセレンス</p>
            {["卓越した品質","高い完成度","妥協しない姿勢"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:TEXT_DIM, flexShrink:0 }} />
                <span style={{ fontSize:14, color:TEXT_MUTED, letterSpacing:"0.05em" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:`1px solid ${BORDER}`, padding:"40px 48px", textAlign:"center", background:`${GOLD}05` }}>
          <p style={{ fontSize:10, letterSpacing:"0.3em", color:GOLD, marginBottom:12 }}>= VELLENCE</p>
          <p className="font-display" style={{ fontSize:"clamp(16px,2vw,24px)", fontWeight:400, color:TEXT, letterSpacing:"0.02em" }}>
            強さだけでなく、柔らかさや余裕も持つ、
            <em style={{ fontStyle:"italic", color:GOLD }}> 品格ある男性</em>
          </p>
        </div>

        {/* Brand colors inline */}
        <div style={{ marginTop:80 }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <Eyebrow>BRAND COLORS</Eyebrow>
            <h3 className="font-display" style={{ fontSize:"clamp(24px,3vw,40px)", fontWeight:500, letterSpacing:"-0.01em" }}>ブランドカラー</h3>
            <p style={{ fontSize:13, color:TEXT_MUTED, marginTop:14, letterSpacing:"0.04em", lineHeight:1.9 }}>
              黒一色で冷たくなりすぎないように、シルバーとアイボリーで柔らかな高級感を加えています。
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }} className="color-grid">
            {[
              { swatch:"#0a0a0a", border:"1px solid rgba(255,255,255,0.07)", name:"ブラック",   en:"BLACK",    desc:"威厳・自信・重厚感" },
              { swatch:"#2d2d2d", border:"none",                              name:"チャコール", en:"CHARCOAL", desc:"都会的・落ち着き・知性" },
              { swatch:"#b8b8b8", border:"none",                              name:"シルバー",   en:"SILVER",   desc:"洗練・品質・未来感" },
              { swatch:"#efe9d8", border:"none",                              name:"アイボリー", en:"IVORY",    desc:"温かさ・余裕・上品さ" },
            ].map(c => (
              <div key={c.en} style={{ border:c.border }}>
                <div style={{ height:120, background:c.swatch }} />
                <div style={{ padding:"20px 18px", background:BG_ALT }}>
                  <p style={{ fontSize:9, letterSpacing:"0.26em", color:GOLD, marginBottom:5 }}>{c.en}</p>
                  <p style={{ fontSize:15, fontWeight:500, color:TEXT, marginBottom:6 }}>{c.name}</p>
                  <p style={{ fontSize:12, color:TEXT_MUTED, lineHeight:1.7, letterSpacing:"0.04em" }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── LOGO MEANING ── */}
      <Section>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px 100px", alignItems:"center" }} className="two-col">
          {/* Large V */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{
              width:"100%", maxWidth:440, aspectRatio:"1",
              border:`1px solid ${BORDER}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative", background:BG,
            }}>
              {[
                { top:-1,left:-1, borderTop:`2px solid ${GOLD}`, borderLeft:`2px solid ${GOLD}` },
                { top:-1,right:-1, borderTop:`2px solid ${GOLD}`, borderRight:`2px solid ${GOLD}` },
                { bottom:-1,left:-1, borderBottom:`2px solid ${GOLD}`, borderLeft:`2px solid ${GOLD}` },
                { bottom:-1,right:-1, borderBottom:`2px solid ${GOLD}`, borderRight:`2px solid ${GOLD}` },
              ].map((s,i) => <div key={i} style={{ position:"absolute", width:22, height:22, ...s }} />)}
              <img src={logoImg} alt="VELLENCE Logo" style={{ width:"54%", objectFit:"contain" }} />
            </div>
          </div>

          <div>
            <Eyebrow>LOGO MARK</Eyebrow>
            <h2 className="font-display" style={{ fontSize:"clamp(26px,3.2vw,44px)", fontWeight:500, lineHeight:1.12, marginBottom:48, letterSpacing:"-0.01em" }}>
              ロゴマークに<br /><em style={{ fontStyle:"italic" }}>込めた意味</em>
            </h2>
            {[
              { label:"黒い直線部分",      desc:"男性らしい強さ、意志、自信",    gold:true },
              { label:"シルバーの曲線部分", desc:"柔らかさ、余裕、色気、上質さ",  gold:false },
              { label:"上へ広がる形",       desc:"成長、可能性、存在感",          gold:true },
              { label:"下へまとまる形",     desc:"自分の軸、集中力、信念",        gold:false },
            ].map((row, i, arr) => (
              <div key={row.label} style={{ display:"flex", gap:20, padding:"18px 0", borderBottom: i<arr.length-1 ? `1px solid ${BORDER}` : "none" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:row.gold?GOLD:TEXT_DIM, marginTop:6, flexShrink:0 }} />
                <div>
                  <p style={{ fontSize:10, letterSpacing:"0.2em", color:GOLD, marginBottom:5 }}>{row.label}</p>
                  <p style={{ fontSize:13, color:TEXT_MUTED, letterSpacing:"0.04em", lineHeight:1.7 }}>{row.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── COLLECTION ── */}
      <Section id="collection" alt>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:64, flexWrap:"wrap", gap:24 }}>
          <div>
            <Eyebrow>AW 2026</Eyebrow>
            <h2 className="font-display" style={{ fontSize:"clamp(30px,4.5vw,56px)", fontWeight:500, lineHeight:1.08, letterSpacing:"-0.01em" }}>
              The Sovereign<br /><em style={{ fontStyle:"italic" }}>Collection</em>
            </h2>
          </div>
          <a href="#" style={{ fontSize:10, letterSpacing:"0.24em", color:GOLD, textDecoration:"none", display:"flex", alignItems:"center", gap:10, borderBottom:`1px solid ${GOLD}44`, paddingBottom:4 }}>
            VIEW ALL
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:2 }}>
          {COLLECTIONS.map(item => <CollectionCard key={item.id} item={item} />)}
        </div>
      </Section>

      {/* ── ATELIER ── */}
      <Section id="atelier">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px 100px" }} className="two-col">
          <div>
            <Eyebrow>THE VELLENCE PHILOSOPHY</Eyebrow>
            <h2 className="font-display" style={{ fontSize:"clamp(26px,3.2vw,44px)", fontWeight:500, lineHeight:1.12, marginBottom:28, letterSpacing:"-0.01em" }}>
              静かに、しかし<br /><em style={{ fontStyle:"italic", color:GOLD }}>確かに。</em>
            </h2>
            <p style={{ fontSize:14, lineHeight:2.1, color:TEXT_MUTED, letterSpacing:"0.04em", marginBottom:18 }}>
              素材の質、シルエット、縫製、細かなデザインによって、
              着る人の品格を自然に引き出す。派手に飾るのではなく、
              素材と仕立てで存在感を生み出す。
            </p>
            <p style={{ fontSize:14, lineHeight:2.1, color:TEXT_MUTED, letterSpacing:"0.04em", marginBottom:48 }}>
              それがVELLENCEの考える新しいラグジュアリーです。
            </p>
            <a href="#" style={{ fontSize:10, letterSpacing:"0.24em", color:GOLD, textDecoration:"none", borderBottom:`1px solid ${GOLD}`, paddingBottom:4 }}>
              OUR ATELIER
            </a>
          </div>

          {/* Packaging philosophy as text panel */}
          <div style={{ borderLeft:`1px solid ${BORDER}`, paddingLeft:64 }} className="pkg-panel">
            <Eyebrow>PACKAGING PHILOSOPHY</Eyebrow>
            <h3 className="font-display" style={{ fontSize:"clamp(20px,2.2vw,30px)", fontWeight:500, lineHeight:1.2, marginBottom:24, letterSpacing:"-0.01em" }}>
              箱を開ける瞬間も、<br /><em style={{ fontStyle:"italic", color:GOLD }}>ブランド体験。</em>
            </h3>
            <p style={{ fontSize:13, lineHeight:2, color:TEXT_MUTED, letterSpacing:"0.04em", marginBottom:36 }}>
              商品だけでなく、箱を開ける時間もブランド体験の一部にします。
            </p>
            <div>
              {[
                ["マットブラックの箱",   "重厚で特別感のある印象"],
                ["シルバーのロゴ",       "控えめながら高品質"],
                ["黒いリボン",           "落ち着いた華やかさ"],
                ["アイボリーの薄紙",     "開く瞬間に温かさを加える"],
                ["メッセージカード",     "ブランドの考え方を伝える"],
              ].map(([label, desc], i, arr) => (
                <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"13px 0", borderBottom: i<arr.length-1 ? `1px solid ${BORDER}` : "none", gap:16 }}>
                  <span style={{ fontSize:12, color:GOLD, letterSpacing:"0.08em", flexShrink:0 }}>{label}</span>
                  <span style={{ fontSize:12, color:TEXT_MUTED, letterSpacing:"0.04em", textAlign:"right" }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }} className="two-col">
          {[
            { tag:"MADE TO MEASURE", head:<>Your Suit,<br /><em style={{ fontStyle:"italic" }}>Your Rules.</em></>, body:"Book a private consultation at our Tokyo atelier. Every measurement, every choice — entirely yours.", cta:"BOOK CONSULTATION", accent:true },
            { tag:"MEMBERSHIP",     head:<>Join The<br /><em style={{ fontStyle:"italic" }}>Inner Circle.</em></>, body:"Priority access to new collections, exclusive member events, and a personal stylist on call.",          cta:"APPLY FOR MEMBERSHIP", accent:false },
          ].map(s => (
            <div key={s.tag} style={{ padding:"72px 52px", background:BG_ALT, borderTop:`${s.accent?"2px":"1px"} solid ${s.accent?GOLD:BORDER}` }}>
              <Eyebrow>{s.tag}</Eyebrow>
              <h3 className="font-display" style={{ fontSize:"clamp(24px,2.8vw,40px)", fontWeight:500, lineHeight:1.12, marginBottom:20, letterSpacing:"-0.01em" }}>{s.head}</h3>
              <p style={{ fontSize:13, lineHeight:2, color:TEXT_MUTED, marginBottom:40, maxWidth:320, letterSpacing:"0.04em" }}>{s.body}</p>
              <button style={{
                padding:"13px 32px", fontSize:10, letterSpacing:"0.24em", fontWeight:600, cursor:"pointer",
                background:s.accent?GOLD_GRAD:"none", color:s.accent?BG:GOLD,
                border:s.accent?"none":`1px solid ${GOLD}55`,
              }}>{s.cta}</button>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${BORDER}`, background:"#050505", padding:"76px 40px 44px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"44px 40px", marginBottom:68 }} className="footer-grid">
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:18 }}>
                <img src={logoImg} alt="VELLENCE" style={{ height:34, width:34, objectFit:"contain" }} />
                <span className="font-display gold-gradient" style={{ fontSize:17, letterSpacing:"0.26em", fontWeight:600 }}>VELLENCE</span>
              </div>
              <p style={{ fontSize:13, lineHeight:2, color:TEXT_DIM, maxWidth:240, letterSpacing:"0.03em" }}>
                静かな強さを、纏う。<br />強さ・色気・品格を、静かに表現するメンズブランド。
              </p>
              <p className="font-editorial" style={{ fontSize:11, fontStyle:"italic", color:`${GOLD}50`, marginTop:14, letterSpacing:"0.1em" }}>
                DEFINE YOUR PRESENCE.
              </p>
            </div>
            {[
              { title:"COLLECTION", links:["Tailoring","Outerwear","Shirting","Accessories","Archive"] },
              { title:"MAISON",     links:["Our Story","Atelier","Craftsmanship","Sustainability","Press"] },
              { title:"CLIENT",     links:["Made to Measure","Inner Circle","Stockists","Contact","FAQ"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize:9, letterSpacing:"0.3em", color:GOLD, marginBottom:20, fontWeight:600 }}>{col.title}</p>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom:10 }}>
                      <a href="#" style={{ fontSize:13, color:TEXT_DIM, textDecoration:"none", letterSpacing:"0.03em", transition:"color .2s" }}
                        onMouseEnter={e => (e.target as HTMLElement).style.color=TEXT}
                        onMouseLeave={e => (e.target as HTMLElement).style.color=TEXT_DIM}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Rule />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14, marginTop:28 }}>
            <p style={{ fontSize:11, color:TEXT_DIM, letterSpacing:"0.05em" }}>© 2026 VELLENCE. All rights reserved. Tokyo, Japan.</p>
            <div style={{ display:"flex", gap:20 }}>
              {["Instagram","X","WeChat","LINE"].map(s => (
                <a key={s} href="#" style={{ fontSize:11, color:TEXT_DIM, textDecoration:"none", letterSpacing:"0.05em", transition:"color .2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color=GOLD}
                  onMouseLeave={e => (e.target as HTMLElement).style.color=TEXT_DIM}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-25%); } }
        @media(max-width:900px){
          .two-col{grid-template-columns:1fr !important;}
          .name-grid{grid-template-columns:1fr !important;}
          .name-grid>*:nth-child(2){display:none !important;}
          .pkg-panel{border-left:none !important;padding-left:0 !important;border-top:1px solid ${BORDER};padding-top:48px !important;}
          .stats-row{flex-wrap:wrap;}
          .stats-row>*{flex:1 1 40%;padding:16px 16px;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
        }
        @media(max-width:768px){
          .nav-links{display:none !important;}
          .nav-burger{display:block !important;}
          .color-grid{grid-template-columns:1fr 1fr !important;}
        }
        @media(min-width:769px){.nav-burger{display:none !important;}}
        @media(max-width:500px){
          .footer-grid{grid-template-columns:1fr !important;}
          .color-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </div>
  )
}
