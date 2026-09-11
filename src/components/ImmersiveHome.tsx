"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { contact } from "@/lib/site";
import { ACCEPTED_EXTENSIONS, MAX_FILE_BYTES } from "@/lib/rfq";
import "./immersive.css";

const views = [
  { name: "Perspective", file: "flex-hero.png" },
  { name: "Front", file: "flex-front.png" },
  { name: "Side", file: "flex-side.png" },
  { name: "Rear", file: "flex-back.png" },
];
const capabilities = [
  { n: "01", title: "Marine & offshore", text: "Vessel supplies, provisions and shore-based coordination for demanding operations.", image: "operations/daron-ranger-quayside.jpg", href: "/services/ship-chandlery" },
  { n: "02", title: "Technical supply", text: "Equipment, gas detection and technical procurement, with the right questions asked upfront.", image: "operations/crew-lifting-pallet.jpg", href: "#equipment" },
  { n: "03", title: "Coatings & care", text: "Protective coatings and surface preparation support, from specification to maintenance.", image: "drydock/case-study-hempel-bow.jpg", href: "/services/coatings" },
];

export function ImmersiveHome() {
  const [menu, setMenu] = useState(false);
  const [view, setView] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [video, setVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [selection, setSelection] = useState("");
  const [configuration, setConfiguration] = useState("Help me choose");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState("");
  const [preferred, setPreferred] = useState("Email");
  const [result, setResult] = useState<{ subject: string; text: string } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDialogElement>(null);
  const busyRef = useRef(false);

  function selectEquipment() {
    setSelection("Honeywell Flex 5 Series"); setCategory("Health & safety"); setResult(null);
    document.getElementById("request")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    document.getElementById("selected-equipment")?.focus({ preventScroll: true });
  }
  function playFilm() { setVideo(true); setVideoError(false); videoRef.current?.showModal(); }
  function closeFilm() { setVideo(false); videoRef.current?.close(); }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busyRef.current) return;
    const data = new FormData(event.currentTarget);
    const file = data.get("rfqFile");
    if (file instanceof File && file.size && (file.size > MAX_FILE_BYTES || !ACCEPTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext)))) {
      setError("Choose a PDF, Excel, Word, CSV or text file smaller than 4 MB."); return;
    }
    data.set("requestType", "quote");
    data.set("message", [selection === "Honeywell Flex 5 Series" ? `Equipment: ${selection}\nConfiguration: ${configuration}\nQuantity: ${quantity}` : selection ? `Requirement: ${selection}` : "", String(data.get("message") || "")].filter(Boolean).join("\n\n"));
    busyRef.current = true; setBusy(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data, signal: AbortSignal.timeout(30000) });
      const output = await response.json();
      if (!response.ok || !output.preview) throw new Error(output.error || "The preview could not be prepared. Please try again.");
      setResult({ subject: output.subject, text: output.text });
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); }
    finally { busyRef.current = false; setBusy(false); }
  }
  return <div className="immersive-home">
    <div className="im-preview"><span className="im-status-dot" /> DESIGN PREVIEW <span>Explore freely · enquiries are not sent</span></div>
    <header className="im-nav">
      <Link href="/" aria-label="Daron Namibia home"><BrandLogo /></Link>
      <nav aria-label="Main navigation" className={menu ? "im-menu is-open" : "im-menu"}>
        <Link href="#capabilities" onClick={() => setMenu(false)}>Capabilities</Link>
        <Link href="#equipment" onClick={() => setMenu(false)}>Equipment</Link>
        <Link href="#track-record" onClick={() => setMenu(false)}>Our track record</Link>
        <Link href="#network" onClick={() => setMenu(false)}>The group</Link>
      </nav>
      <Link className="im-nav-quote" href="#request">Request a quote <span aria-hidden="true">↗</span></Link>
      <button className="im-menu-button" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}</button>
    </header>

    <section className="im-hero" aria-labelledby="hero-title">
      <Image src="/images/site/operations/hercules-aerial.jpg" alt="Deepsea Hercules offshore drilling rig in Namibian waters" fill priority sizes="100vw" className="im-hero-photo" />
      <div className="im-hero-shade" />
      <div className="im-hero-content">
        <p className="im-eyebrow"><span /> WALVIS BAY, NAMIBIA · CONNECTED TO AFRICA</p>
        <h1 id="hero-title">When operations<br />cannot <em>wait.</em></h1>
        <p className="im-hero-intro">Marine supply, technical procurement and offshore support. One local team, with the reach to keep you moving.</p>
        <div className="im-actions"><Link href="#request" className="im-button">Tell us what you need <span aria-hidden="true">↗</span></Link><Link href="#equipment" className="im-outline">Explore equipment <span aria-hidden="true">↓</span></Link></div>
      </div>
      <div className="im-hero-bottom"><span>SUPPLYING AFRICA’S SEAS, SHORES & INDUSTRIES</span><button onClick={playFilm}><span className="im-play" aria-hidden="true">▷</span> See our work on the water</button></div>
      <span className="im-hero-coordinate" aria-hidden="true">22°57′S &nbsp; 14°30′E</span>
    </section>

    <section className="im-proof-strip" aria-label="Offshore project at a glance"><div><strong>3 rigs.</strong><span>Supplied simultaneously</span></div><div><strong>8+ months.</strong><span>Supporting all three together</span></div><div><strong>2 years.</strong><span>Complete project duration</span></div><Link href="#track-record">The story behind the numbers <span aria-hidden="true">↗</span></Link></section>

    <section className="im-section" id="capabilities"><div className="im-section-heading"><div><p className="im-eyebrow">01 / WHAT WE BRING</p><h2>Built around<br />your operation.</h2></div><p>From the next vessel call to a sustained offshore campaign, connect with the people, products and practical support your work needs.</p></div>
      <div className="im-capabilities">{capabilities.map(c => <Link href={c.href} key={c.n} className="im-capability"><span className="im-cap-number">{c.n}</span><h3>{c.title}</h3><p>{c.text}</p><span className="im-cap-link">Explore capability <span aria-hidden="true">↗</span></span></Link>)}</div>
    </section>

    <section className="im-equipment" id="equipment" aria-labelledby="equipment-title"><div className="im-section-heading"><div><p className="im-eyebrow">02 / THE EQUIPMENT ROOM</p><h2 id="equipment-title">Get closer to<br />the right equipment.</h2></div><p>Explore genuine product views. Check the details. Bring your application to our technical team.</p></div>
      <div className="im-showroom"><div className="im-product-stage"><div className="im-product-meta"><span>HONEYWELL</span><span>PORTABLE GAS DETECTION</span></div><div className={zoom ? "im-product-image is-zoomed" : "im-product-image"}><Image src={`/immersive/${views[view].file}`} alt={`Honeywell Flex 5 four-way cartridge model — ${views[view].name.toLowerCase()} view`} fill sizes="(max-width: 760px) 95vw, 50vw" /></div><button className="im-zoom" onClick={() => setZoom(!zoom)} aria-pressed={zoom}>{zoom ? "− Reset zoom" : "+ Zoom in"}</button><div className="im-view-controls" role="group" aria-label="Equipment photographs">{views.map((v,i) => <button key={v.name} aria-pressed={view === i} onClick={() => { setView(i); setZoom(false); }}>{v.name}</button>)}</div><p className="im-view-note" aria-live="polite">{views[view].name} view · manufacturer-supplied imagery</p></div>
      <div className="im-product-copy"><p className="im-eyebrow">FEATURED EQUIPMENT / 01</p><h3>Honeywell<br />Flex 5 Series<span>One platform. Multiple configurations.</span></h3><p>A modular portable gas monitor, with diffusion and pumped options. Start with your application; let the technical team help confirm the appropriate configuration.</p><dl className="im-specs"><div><dt>Detection</dt><dd>Configurations supporting up to 6 gases</dd></div><div><dt>Format</dt><dd>Diffusion or pumped options</dd></div><div><dt>Connectivity</dt><dd>Bluetooth, NFC and USB-C</dd></div></dl><Link className="im-datasheet" href="/immersive/honeywell-flex-5-datasheet.pdf" target="_blank" rel="noopener noreferrer">Read the manufacturer datasheet <span aria-hidden="true">↗</span></Link><button className="im-button" onClick={selectEquipment}>Request this equipment <span aria-hidden="true">↗</span></button><p className="im-small">Four-way cartridge shown. Sensor combinations, suitability, availability and lead time require confirmation.</p></div></div>
      <div className="im-partners" aria-label="Explore represented brands">{[{ name: "Hempel", file: "hempel.png" },{ name: "Hammelmann", file: "hammelmann.png" },{ name: "Honeywell", file: "honeywell.svg" },{ name: "Blackline Safety", file: "blackline-safety.svg" }].map(p => <Link href="/brands" key={p.name}><Image src={`/images/partners/${p.file}`} width={160} height={48} alt={p.name} /></Link>)}</div>
    </section>

    <section className="im-campaign" id="track-record"><div className="im-campaign-image"><Image src="/images/site/operations/deepsea-mira.jpg" alt="Deepsea Mira offshore drilling rig" fill sizes="(max-width: 760px) 100vw, 50vw" /><span>DEEPSEA MIRA / NAMIBIA</span></div><div className="im-campaign-copy"><p className="im-eyebrow">03 / PROVEN ON THE WATER</p><h2>Three rigs.<br />One sustained<br /><em>commitment.</em></h2><p>Daron Namibia supplied Deepsea Mira, Deepsea Bollsta and Deepsea Hercules during a project spanning two years. For more than eight months, we supplied all three rigs simultaneously.</p><p className="im-rig-names">DEEPSEA MIRA · DEEPSEA BOLLSTA · DEEPSEA HERCULES</p><Link href="/track-record" className="im-text-link">Explore our track record <span aria-hidden="true">↗</span></Link></div></section>

    <section className="im-section im-network" id="network"><div><p className="im-eyebrow">04 / LOCAL KNOWLEDGE. GROUP REACH.</p><h2>Your team in Namibia.<br />A connection to more.</h2><p>Start with Daron Namibia. Where your requirement extends beyond our local scope, we can discuss the relevant Daron Group capability and coordinate the next step.</p><div className="im-actions"><button className="im-button" onClick={() => { setSelection("Daron Group capability enquiry"); setCategory("Other"); setResult(null); document.getElementById("request")?.scrollIntoView(); }}>Discuss a group requirement <span aria-hidden="true">↗</span></button><Link href="https://daron-group.com/" target="_blank" rel="noopener noreferrer" className="im-text-link">Visit Daron Group ↗</Link></div></div><div className="im-network-visual" aria-label="Daron Namibia connects local requirements with Daron Group capabilities"><span className="im-orbit im-orbit-one" /><span className="im-orbit im-orbit-two" /><span className="im-orbit im-orbit-three" /><div className="im-network-centre"><BrandLogo /></div><span className="im-network-node node-one">WALVIS BAY</span><span className="im-network-node node-two">YOUR OPERATION</span><span className="im-network-node node-three">DARON GROUP</span></div></section>

    <section className="im-request" id="request"><div className="im-request-intro"><p className="im-eyebrow">05 / LET’S GET TO WORK</p><h2>What does your<br />operation need?</h2><p>Equipment, supplies or a more complex requirement. Give us the essentials and choose how you would like to be contacted.</p><Link href={contact.phone.href}>{contact.phone.display} ↗</Link><Link href={`mailto:${contact.emails.operations}`}>{contact.emails.operations} ↗</Link><div className="im-preview-note"><strong>You are exploring a preview.</strong><p>This form validates your request and shows the RFQ your team would receive. Nothing is emailed or saved as a lead.</p></div></div>
      <div><form onSubmit={submit} onChange={() => setResult(null)} className="im-form"><fieldset disabled={busy}><legend className="sr-only">Prepare an enquiry preview</legend><label className="im-full">Equipment or requirement<input id="selected-equipment" value={selection} onChange={e => { setSelection(e.target.value); setResult(null); }} placeholder="Tell us what you are looking for" maxLength={180} /></label>{selection === "Honeywell Flex 5 Series" && <><label>Configuration<select value={configuration} onChange={e => setConfiguration(e.target.value)}><option>Help me choose</option><option>Diffusion — 4-way cartridge</option><option>Diffusion — 6-way cartridge</option><option>Pumped — 6-way cartridge</option></select></label><label>Quantity<input aria-label="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} type="number" min="1" max="10000" required /></label></>}
      <label>Your name<input name="firstName" autoComplete="name" required maxLength={120} /></label><label>Company<input name="company" autoComplete="organization" required maxLength={120} /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={160} /></label><label>Reply by<select name="preferredContact" value={preferred} onChange={e => setPreferred(e.target.value)}><option>Email</option><option>WhatsApp</option><option>Phone call</option></select></label>{preferred !== "Email" && <label className="im-full">Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" placeholder="+264 …" pattern="\+[0-9 ().\-]{7,24}" required /></label>}
      <label>Service<select name="category" value={category} onChange={e => setCategory(e.target.value)} required><option value="">Choose a service</option><option>Health & safety</option><option>Ship chandlery</option><option>Oil & gas / offshore</option><option>Technical stores</option><option>Coatings / surface preparation</option><option>Warehousing / logistics</option><option>Provisions / catering</option><option>Dry dock</option><option>Other</option></select></label><label>Vessel / project<input name="vessel" maxLength={120} /></label><label>Delivery location<input name="deliveryPoint" placeholder="Port, site or delivery address" maxLength={140} /></label><label>Required date<input name="urgency" type="date" /></label><label className="im-full">Your application or requirement<textarea name="message" rows={3} required={!selection} minLength={selection ? undefined : 10} maxLength={3000} placeholder="Gas hazards, quantities, operating conditions or anything else we should know…" /></label><label className="im-full im-upload">Attach your requirement <small>PDF, Excel, Word, CSV or TXT · up to 4 MB</small><input name="rfqFile" type="file" accept={ACCEPTED_EXTENSIONS.join(",")} /></label><button type="submit" className="im-button im-full">{busy ? "Preparing your preview…" : "Review enquiry preview"}<span aria-hidden="true">↗</span></button></fieldset>{error && <p role="alert" className="im-error">{error}</p>}<p className="im-small">Your details are used to prepare this preview. <Link href="/privacy">Privacy policy</Link></p></form>
      {result && <div className="im-rfq-review" ref={resultRef} tabIndex={-1} role="status"><p className="im-eyebrow">ENQUIRY PREVIEW · NOT SENT</p><h3>{result.subject}</h3><pre>{result.text}</pre><button onClick={() => { setResult(null); document.getElementById("selected-equipment")?.focus(); }}>Edit requirement ↑</button></div>}</div></section>
    <footer className="im-footer"><Link href="/" aria-label="Daron Namibia home"><BrandLogo /></Link><p>Supplying Africa’s seas, shores & industries with confidence.</p><Link href="/privacy">Privacy</Link><Link href="https://daron-group.com/" target="_blank" rel="noopener noreferrer">Daron Group ↗</Link><span>Walvis Bay · Namibia</span></footer>
    <dialog ref={videoRef} className="im-film" onCancel={closeFilm} onClick={e => { if (e.target === e.currentTarget) closeFilm(); }} aria-label="Daron operational film"><button className="im-film-close" onClick={closeFilm}>Close film ×</button>{video && <video src="/immersive/operations.mp4" controls muted playsInline preload="metadata" onError={() => setVideoError(true)} aria-label="Supplied video of vessel deck operations" />}{videoError && <p>The film could not load. You can still explore our <Link href="/track-record">track record</Link>.</p>}<p>From Daron’s operational video archive. Sound is off by default.</p></dialog>
  </div>;
}
