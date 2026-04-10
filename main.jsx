import { useState, useMemo } from "react";

const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Exo+2:wght@300;400;600;700&display=swap');`;

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Exo 2', sans-serif; background: #07091a; color: #e8f0ff; }
  .app { min-height: 100vh; padding: 0 0 60px; background: #07091a; }
  .hero { background: linear-gradient(180deg, #07091a 0%, #0d1535 60%, #07091a 100%); padding: 52px 24px 44px; text-align: center; position: relative; overflow: hidden; border-bottom: 1px solid rgba(0,230,230,0.18); }
  .hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(0,230,230,0.04) 39px), repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(0,230,230,0.04) 39px); pointer-events: none; }
  .hero::after { content: '🌴'; position: absolute; bottom: -4px; left: 12px; font-size: 72px; opacity: 0.18; pointer-events: none; filter: drop-shadow(0 0 12px #ff2d78); }
  .hero-palm2 { position: absolute; bottom: -4px; right: 10px; font-size: 72px; opacity: 0.18; filter: drop-shadow(0 0 12px #00e6e6); transform: scaleX(-1); pointer-events: none; }
  .hero-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: #00e6e6; margin-bottom: 14px; text-shadow: 0 0 12px #00e6e6; }
  .hero h1 { font-family: 'Abril Fatface', serif; font-size: clamp(38px,9vw,72px); color: #fff; line-height: 1.0; margin-bottom: 12px; text-shadow: 0 0 30px rgba(255,45,120,0.5), 2px 2px 0 rgba(0,230,230,0.3); letter-spacing: -0.01em; }
  .hero h1 em { font-style: normal; color: #ff2d78; text-shadow: 0 0 20px #ff2d78, 0 0 40px rgba(255,45,120,0.4); }
  .hero p { font-size: 14px; color: rgba(180,210,255,0.6); font-weight: 300; max-width: 340px; margin: 0 auto; letter-spacing: 0.02em; }

  .filters-wrap { background: rgba(7,9,26,0.96); border-bottom: 1px solid rgba(0,230,230,0.2); padding: 18px 24px; position: sticky; top: 0; z-index: 10; box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(0,230,230,0.15); backdrop-filter: blur(12px); }
  .filters-inner { max-width: 720px; margin: 0 auto; }
  .filters-row { display: grid; gap: 10px; margin-bottom: 10px; }
  .filters-row.row1 { grid-template-columns: 1fr 1fr 1fr; }
  .filters-row.row2 { grid-template-columns: 1fr 1fr; }
  .filter-group label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #00e6e6; margin-bottom: 5px; }
  .filter-group select, .filter-group input[type=number] { width: 100%; padding: 9px 12px; border: 1.5px solid rgba(0,230,230,0.3); border-radius: 10px; font-family: 'Exo 2', sans-serif; font-size: 13.5px; color: #e8f0ff; background: rgba(255,255,255,0.05); appearance: none; -webkit-appearance: none; cursor: pointer; transition: border-color 0.15s; outline: none; }
  .filter-group input[type=date] { width: 100%; padding: 18px 20px; border: 2px solid #ff2d78; border-radius: 12px; font-family: 'Exo 2', sans-serif; font-size: 22px; font-weight: 700; color: #fff; background: rgba(255,45,120,0.08); appearance: none; -webkit-appearance: none; cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s; outline: none; box-shadow: 0 0 16px rgba(255,45,120,0.2), inset 0 0 20px rgba(255,45,120,0.05); text-align: center; color-scheme: dark; }
  .filter-group input[type=date]:focus { border-color: #00e6e6; box-shadow: 0 0 20px rgba(0,230,230,0.25); background: rgba(0,230,230,0.06); }
  .filter-group select:focus, .filter-group input:focus { border-color: #00e6e6; background: rgba(0,230,230,0.06); }
  .date-badge { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,45,120,0.1); border: 1px solid rgba(255,45,120,0.35); border-radius: 8px; padding: 6px 10px; font-size: 12px; font-weight: 600; color: #ff2d78; margin-top: 6px; letter-spacing: 0.04em; }
  .search-btn { display: block; width: 100%; margin-top: 12px; padding: 14px; background: linear-gradient(135deg, #ff2d78 0%, #c4006a 100%); color: #fff; border: none; border-radius: 12px; font-family: 'Exo 2', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; box-shadow: 0 0 20px rgba(255,45,120,0.35); }
  .search-btn:hover { box-shadow: 0 0 30px rgba(255,45,120,0.6); transform: translateY(-1px); }
  .search-btn:active { transform: scale(0.99); }
  .search-btn:disabled { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.3); cursor: not-allowed; box-shadow: none; }

  .manage-btn-wrap { max-width: 720px; margin: 16px auto 0; padding: 0 24px; }
  .manage-btn { display: flex; align-items: center; gap: 8px; background: none; border: 1.5px dashed rgba(0,230,230,0.3); border-radius: 12px; padding: 10px 16px; font-family: 'Exo 2', sans-serif; font-size: 13px; font-weight: 600; color: rgba(0,230,230,0.5); cursor: pointer; transition: all 0.15s; width: 100%; }
  .manage-btn:hover { border-color: #00e6e6; color: #00e6e6; box-shadow: 0 0 12px rgba(0,230,230,0.15); }
  .manage-btn .badge { background: #ff2d78; color: #fff; border-radius: 20px; padding: 1px 8px; font-size: 11px; font-weight: 700; margin-left: auto; }
  .manage-panel { max-width: 720px; margin: 10px auto 0; padding: 0 24px; }
  .manage-inner { background: #0d1535; border: 1px solid rgba(0,230,230,0.2); border-radius: 16px; padding: 20px; animation: fadeUp 0.2s ease both; }
  .manage-title { font-family: 'Abril Fatface', serif; font-size: 17px; margin-bottom: 4px; color: #fff; }
  .manage-sub { font-size: 12px; color: rgba(180,210,255,0.45); margin-bottom: 14px; }
  .manage-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #e8f0ff; }
  .manage-item:last-of-type { border-bottom: none; }
  .manage-emoji { font-size: 18px; width: 28px; text-align: center; flex-shrink: 0; }
  .manage-name { flex: 1; font-weight: 500; }
  .manage-del { background: none; border: none; color: rgba(255,255,255,0.2); font-size: 15px; cursor: pointer; padding: 2px 6px; border-radius: 6px; transition: color 0.15s; }
  .manage-del:hover { color: #ff2d78; }
  .add-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 14px 0 10px; }
  .add-field label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,230,230,0.6); margin-bottom: 4px; }
  .add-field input, .add-field select, .add-field textarea { width: 100%; padding: 8px 11px; border: 1.5px solid rgba(0,230,230,0.25); border-radius: 9px; font-family: 'Exo 2', sans-serif; font-size: 13px; color: #e8f0ff; background: rgba(255,255,255,0.05); outline: none; transition: border-color 0.15s; appearance: none; -webkit-appearance: none; }
  .add-field input:focus, .add-field select:focus, .add-field textarea:focus { border-color: #00e6e6; background: rgba(0,230,230,0.06); }
  .add-field textarea { resize: vertical; min-height: 60px; }
  .add-field.full { grid-column: 1 / -1; }
  .add-actions { display: flex; gap: 8px; margin-top: 10px; }
  .btn-save { flex: 1; padding: 10px; background: linear-gradient(135deg, #ff2d78, #c4006a); color: #fff; border: none; border-radius: 10px; font-family: 'Exo 2', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; cursor: pointer; box-shadow: 0 0 14px rgba(255,45,120,0.3); }
  .btn-cancel { padding: 10px 18px; background: transparent; color: rgba(255,255,255,0.4); border: 1.5px solid rgba(255,255,255,0.12); border-radius: 10px; font-family: 'Exo 2', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; }
  .btn-cancel:hover { border-color: #ff2d78; color: #ff2d78; }

  .results { max-width: 720px; margin: 24px auto; padding: 0 24px; }
  .results-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 6px; }
  .results-header h2 { font-family: 'Abril Fatface', serif; font-size: 22px; color: #fff; }
  .results-header span { font-size: 11.5px; color: rgba(0,230,230,0.5); font-weight: 600; letter-spacing: 0.05em; }
  .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(0,230,230,0.55); margin: 20px 0 10px; }

  /* Loading stream */
  .loading-streams { max-width: 720px; margin: 24px auto; padding: 0 24px; display: flex; flex-direction: column; gap: 8px; }
  .stream-item { display: flex; align-items: center; gap: 10px; background: rgba(13,21,53,0.9); border: 1px solid rgba(0,230,230,0.15); border-radius: 12px; padding: 12px 16px; font-size: 13px; color: rgba(180,210,255,0.7); animation: fadeUp 0.3s ease both; }
  .stream-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .stream-dot.running { background: #ff2d78; animation: pulse 1s infinite; box-shadow: 0 0 6px #ff2d78; }
  .stream-dot.done { background: #00e6e6; box-shadow: 0 0 6px #00e6e6; }
  .stream-dot.empty { background: rgba(255,255,255,0.2); }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

  .card { background: linear-gradient(135deg, rgba(13,21,53,0.95) 0%, rgba(7,9,26,0.98) 100%); border-radius: 16px; padding: 18px 20px; margin-bottom: 12px; border: 1px solid rgba(0,230,230,0.12); border-left: 3px solid rgba(0,230,230,0.3); transition: box-shadow 0.2s, transform 0.15s; animation: fadeUp 0.35s ease both; }
  .card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,230,230,0.08); transform: translateY(-2px); }
  .card.col-green    { border-left-color: #22c55e; }
  .card.col-blue     { border-left-color: #38bdf8; }
  .card.col-purple   { border-left-color: #a78bfa; }
  .card.col-orange   { border-left-color: #fb923c; }
  .card.col-lime     { border-left-color: #86efac; }
  .card.col-pink     { border-left-color: #f472b6; }
  .card.col-teal     { border-left-color: #2dd4bf; }
  .card.col-frost    { border-left-color: #00b5e2; }
  .card.col-marlins  { border-left-color: #00a3e0; }
  .card.col-pottery     { border-left-color: #b45309; }
  .card.col-mosscenter   { border-left-color: #7c3aed; }
  .card.col-pirate       { border-left-color: #1e3a5f; }
  .card.col-skatebird    { border-left-color: #0ea5e9; }
  .card.col-pottery      { border-left-color: #b45309; }
  .card.col-tutifruti   { border-left-color: #d946ef; }
  .card.col-railroad    { border-left-color: #92400e; }
  .card.col-speedway    { border-left-color: #dc2626; }
  .card.col-pamm        { border-left-color: #f43f5e; }
  .card.col-mbgarden    { border-left-color: #10b981; }
  .card.col-palmetto    { border-left-color: #84cc16; }
  .card.col-skyzone     { border-left-color: #3b82f6; }
  .card.col-paradox     { border-left-color: #8b5cf6; }
  .card.col-kidsempire  { border-left-color: #ec4899; }
  .card.col-velocity    { border-left-color: #dc2626; }
  .card.col-kidstrong { border-left-color: #f97316; }
  .card.col-um       { border-left-color: #005030; }
  .card.col-intermiami { border-left-color: #f7b5cd; }
  .card.col-gray       { border-left-color: #d1d5db; }
  .card.col-berryfarm  { border-left-color: #fbbf24; }
  .card.col-tinez      { border-left-color: #a3e635; }
  .card.col-f1         { border-left-color: #e11d48; }
  .card.col-vizcaya    { border-left-color: #7c3aed; }
  .card.col-venetian   { border-left-color: #0ea5e9; }
  .card.col-cgmuseum   { border-left-color: #b45309; }
  .card.col-matheson   { border-left-color: #0891b2; }
  .card.col-cg         { border-left-color: #2563eb; }
  .card.col-earthday   { border-left-color: #22c55e; }
  .card.col-jungle     { border-left-color: #16a34a; }
  .card.col-mchm       { border-left-color: #f59e0b; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

  .card-top { display: flex; align-items: flex-start; gap: 13px; margin-bottom: 9px; }
  .card-icon { width: 42px; height: 42px; border-radius: 11px; background: rgba(255,45,120,0.12); border: 1px solid rgba(255,45,120,0.2); display: flex; align-items: center; justify-content: center; font-size: 21px; flex-shrink: 0; }
  .card-name { font-family: 'Abril Fatface', serif; font-size: 17px; line-height: 1.2; margin-bottom: 2px; color: #fff; }
  .card-location { font-size: 12px; color: rgba(0,230,230,0.5); }
  .card-hours { font-size: 12px; color: rgba(180,210,255,0.5); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .hours-dot { width: 7px; height: 7px; border-radius: 50%; background: #00e6e6; box-shadow: 0 0 5px #00e6e6; flex-shrink: 0; }
  .card-seasonal { background: rgba(255,45,120,0.08); border: 1px solid rgba(255,45,120,0.25); border-radius: 8px; padding: 7px 10px; font-size: 12px; color: #ff7aaa; margin-bottom: 9px; display: flex; gap: 6px; }
  .card-event-date { background: rgba(0,230,230,0.08); border: 1px solid rgba(0,230,230,0.25); border-radius: 8px; padding: 6px 10px; font-size: 12px; color: #00e6e6; margin-bottom: 9px; font-weight: 600; letter-spacing: 0.02em; }
  .card-link { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; color: #00e6e6; text-decoration: none; margin-bottom: 9px; letter-spacing: 0.04em; text-shadow: 0 0 8px rgba(0,230,230,0.4); }
  .card-link:hover { text-decoration: underline; color: #ff2d78; text-shadow: 0 0 8px rgba(255,45,120,0.4); }
  .card-desc { font-size: 13.5px; color: rgba(180,210,255,0.65); line-height: 1.6; margin-bottom: 12px; }
  .card-tags { display: flex; flex-wrap: wrap; gap: 5px; }
  .tag { padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .tag-indoor  { background: rgba(0,230,230,0.1); color: #00e6e6; border: 1px solid rgba(0,230,230,0.2); }
  .tag-outdoor { background: rgba(0,230,100,0.1); color: #00e69e; border: 1px solid rgba(0,230,100,0.2); }
  .tag-age     { background: rgba(255,45,120,0.1); color: #ff7aaa; border: 1px solid rgba(255,45,120,0.2); }
  .tag-cost-free { background: rgba(0,230,100,0.1); color: #00e69e; border: 1px solid rgba(0,230,100,0.2); }
  .tag-cost-low  { background: rgba(255,200,0,0.08); color: #ffd060; border: 1px solid rgba(255,200,0,0.2); }
  .tag-source    { background: rgba(255,255,255,0.06); color: rgba(180,210,255,0.5); border: 1px solid rgba(255,255,255,0.08); }

  .empty { text-align: center; padding: 60px 24px; }
  .empty-icon { font-size: 46px; margin-bottom: 12px; }
  .empty p { color: rgba(180,210,255,0.35); font-size: 15px; }
`;

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const SOURCE_META = {
  static:    { col: "col-purple",   label: "📌 Saved" },
  ai:        { col: "col-green",    label: "✨ AI pick" },
  live:      { col: "col-green",    label: "🔍 Live result" },
  library:   { col: "col-blue",     label: "📖 Library" },
  pinecrest: { col: "col-teal",     label: "🌿 Pinecrest" },
  frost:     { col: "col-frost",    label: "🔭 Frost Science" },
  zoo:       { col: "col-orange",   label: "🦒 Zoo Miami" },
  fairchild: { col: "col-lime",     label: "🌸 Fairchild" },
  birdbowl:  { col: "col-pink",     label: "🎳 Bird Bowl" },
  marlins:   { col: "col-marlins",  label: "⚾ Marlins" },
  "pottery-miami":   { col: "col-pottery",   label: "🏺 Pottery Studio" },
  mosscenter:        { col: "col-mosscenter", label: "🎨 Moss Center / AKI" },
  pirateaquatours:   { col: "col-pirate",    label: "🏴‍☠️ Pirate Cruise" },
  skatebird:         { col: "col-skatebird", label: "🛹 SkateBird Miami" },
  potterymiami:      { col: "col-pottery",   label: "🏺 Pottery Miami" },
  tutifruti:         { col: "col-tutifruti", label: "🛹 Tutifruti" },
  goldcoastrailroad: { col: "col-railroad",  label: "🚂 Gold Coast Railroad" },
  speedway:        { col: "col-speedway",    label: "🏎️ Homestead Speedway" },
  pamm:            { col: "col-pamm",        label: "🎨 PAMM" },
  mbgarden:        { col: "col-mbgarden",    label: "🌺 MB Botanical Garden" },
  palmettominigolf: { col: "col-palmetto",   label: "⛳ Palmetto Mini Golf" },
  skyzone:         { col: "col-skyzone",     label: "🏀 Sky Zone" },
  paradox:         { col: "col-paradox",     label: "🌀 Paradox Museum" },
  kidsempire:      { col: "col-kidsempire",  label: "🧗 Kids Empire" },
  velocityclimbing: { col: "col-velocity",   label: "🧗 Velocity Climbing" },
  kidstrong:  { col: "col-kidstrong", label: "💪 KidStrong" },
  um:        { col: "col-um",       label: "🎓 UM Canes" },
  intermiami:{ col: "col-intermiami",label: "⚽ Inter Miami" },
  puttshack:  { col: "col-purple",    label: "⛳ Puttshack" },
  superblue:  { col: "col-purple",    label: "🎨 Superblue" },
  berryfarm:  { col: "col-berryfarm", label: "🌻 Berry Farm" },
  tinezfarms: { col: "col-tinez",     label: "🐴 Tinez Farms" },
  vizcaya:      { col: "col-vizcaya",   label: "🏛️ Vizcaya" },
  venetianpool: { col: "col-venetian",  label: "🏊 Venetian Pool" },
  cgmuseum:     { col: "col-cgmuseum",  label: "🏗️ CG Museum" },
  matheson:     { col: "col-matheson",  label: "🌊 Matheson" },
  coralgables:  { col: "col-cg",       label: "🏛️ Coral Gables" },
  umearthday:   { col: "col-earthday", label: "🌍 UM Earth Month" },
  jungleisland: { col: "col-jungle", label: "🦜 Jungle Island" },
  f1:         { col: "col-f1",        label: "🏎️ F1 Miami" },
  mchm:       { col: "col-mchm",      label: "🧒 Children's Museum" },
};

// Always-on static venues (hours/pricing never changes much)
const STATIC_VENUES = [
  { id: "pirateaquatours", name: "Miami Pirate Sightseeing Cruise — Miami Aqua Tours", location: "Pier 5, Bayside Marketplace · 401 Biscayne Blvd, Miami 33132", description: "Board the pirate ship El Loro for a 1h20min cruise through Biscayne Bay past Star Island celebrity mansions, Venetian Islands, Fisher Island, and the downtown Miami skyline. Kids get pirate hats, bilingual narration (English/Spanish), music on board, restroom on board. Snacks, drinks, and souvenir photos available. Also passes filming locations from Bad Boys, Scarface, Iron Man & Fast & Furious. Book online or call 305-358-7600.", setting: "outdoor", estimatedCost: "$30/adult (13+) · $20/child (0–12)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏴‍☠️", source: "pirateaquatours", typicalHours: "Multiple departures daily — check miamiaquatours.com for times", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://miamiaquatours.com/cruises/pirate-adventure/" },
  { id: "puttshack", name: "Puttshack Miami", location: "701 S Miami Ave, Level 4, Brickell City Centre", description: "High-tech mini golf with patented ball-tracking, outdoor terrace overlooking the Miami River, and a full restaurant. Kids 12 and under: $10/round or $15 all-you-can-putt Sun–Fri. 21+ after 9pm Fri & Sat.", setting: "indoor", estimatedCost: "$10–$15/child", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⛳", source: "puttshack", typicalHours: "Sun 11am–10pm · Mon–Thu 11am–11pm · Fri–Sat 11am–1am", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.puttshack.com/locations/miami/" },
  { id: "superblue", name: "Superblue Miami", location: "1101 NW 23rd St, Allapattah (near Wynwood)", description: "Over 50,000 sq ft of immersive art by teamLab, Es Devlin, and James Turrell — mirrored labyrinths, digital flower worlds, and a 3,000-bulb heartbeat installation. Kids under 3 free; Florida residents get a discount.", setting: "indoor", estimatedCost: "~$17/child · $29+ adults · Under 3 free", ageRange: "All ages (best 3+)", ageMin: 0, ageMax: 17, emoji: "🎨", source: "superblue", typicalHours: "Mon–Thu 11am–7pm · Fri–Sat 10am–8pm · Sun 10am–7pm", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.superblue.com/miami" },
  { id: "zoo", name: "Zoo Miami", location: "12400 SW 152nd St, South Miami", description: "2,000+ animals across 340 acres. Features animal encounters, VIP cart tours, safari cycles, and a botanical garden. Kids 2 and under free. Parking always free. $1 Kids Night select Mondays; $5 weekday summer tickets Mon–Thu.", setting: "outdoor", estimatedCost: "$21.95/child (3–12) · Under 2 free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🦒", source: "zoo", typicalHours: "Daily 10am–5pm (last ticket 4pm)", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.zoomiami.org" },
  { id: "fairchild", name: "Fairchild Tropical Botanic Garden", location: "10901 Old Cutler Rd, Coral Gables", description: "83 acres of tropical plants, butterfly garden, rainforest, and children's garden. Free tram rides included. Kids 5 and under free. Fairies in the Garden scavenger hunt running now.", setting: "outdoor", estimatedCost: "$11.95/child (6–17) · Under 6 free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🌿", source: "fairchild", typicalHours: "Daily 10am–5pm (closed Christmas)", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://fairchildgarden.org" },
  { id: "birdbowl", name: "Bird Bowl Bowling Center", location: "9275 SW 40th St (Bird Road), Miami", description: "60-lane bowling plus arcade, laser tag, mini golf, billiards, karaoke, and a kids menu. After-school special: $3/game Mon–Fri 3–6pm on school days. Saturday Funday: 1hr bowling + pizza + soda + $20 arcade card for $69.95/lane.", setting: "indoor", estimatedCost: "$3–$5.50/game daytime", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎳", source: "birdbowl", typicalHours: "Sun–Thu 10am–12am · Fri–Sat 10am–2am", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://birdbowl.com" },
  { id: "frost", name: "Frost Museum of Science", location: "1101 Biscayne Blvd, Museum Park, Downtown Miami", description: "Miami's premier science museum with a three-story aquarium, live coral reef, immersive exhibitions, and planetarium shows. Explorer Ticket covers museum + aquarium + one planetarium show. Under-3s free. First responders and military free.", setting: "indoor", estimatedCost: "$24.95/child (4–11) · $29.95/adult · Under 3 free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🔭", source: "frost", typicalHours: "Mon–Thu 10am–5pm · Fri–Sun 10am–6pm · Open every day", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.frostscience.org/plan-your-day/" },
  { id: "berryfarm", name: "The Berry Farm", location: "13720 SW 216th St, Miami, FL 33170 (Redland area)", description: "Miami's countryside farm destination with u-pick flower and berry fields, hayrides, shaded playgrounds, bounce floors, obstacle courses, and seasonal festivals. The Flower Festival is running now with sunflowers, zinnias, and snapdragons in bloom. Closed Mondays. Note: closed Apr 18 for a private event.", setting: "outdoor", estimatedCost: "Check site — varies by event", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🌻", source: "berryfarm", typicalHours: "Mon closed · Tue–Thu 10am–6:30pm · Fri & Sun 9am–7pm · Sat 9am–6:30pm", seasonalNote: "Flower Festival running now! Free mulberry picking this weekend (Apr 11–12) while supplies last.", eventDate: null, daysOpen: [0,2,3,4,5,6], url: "https://www.visittheberryfarm.com/" },
  { id: "tinezfarms", name: "Tinez Farms", location: "16405 SW 177th Ave, Miami, FL 33187 (Redland area)", description: "Family-owned pesticide-free farm with pony rides, zip lines, a tubing slide, animal encounters, a bounce house, and seasonal produce. Known for excellent seasonal festivals including Easter egg hunts and a fall pumpkin patch. Closed Mondays. Tickets vary by season and event.", setting: "outdoor", estimatedCost: "Check site — varies by season", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🐴", source: "tinezfarms", typicalHours: "Mon closed · Tue–Fri 10am–5pm · Sat–Sun 10am–6pm", seasonalNote: null, eventDate: null, daysOpen: [0,2,3,4,5,6], url: "https://www.tinezfarms.com/" },
  { id: "jungleisland", name: "Jungle Island", location: "1111 Parrot Jungle Trail, Watson Island, Miami", description: "Miami's iconic eco-adventure park on Watson Island — wildlife exhibits, Treewalk Village, Everglades habitat, Guardians of the Jungle show, playground, petting zoo, and add-on animal encounters with sloths, capybaras, lemurs, flamingos, and more. Just 10 minutes from Downtown Miami.", setting: "outdoor", estimatedCost: "$19.95/child (3–9) · $29.95/adult · Under 3 free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🦜", source: "jungleisland", typicalHours: "Daily 9:30am–5pm (last admission 4pm) · Animal Encounters 9am–4pm", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.jungleisland.com/" },
  { id: "vizcaya", name: "Vizcaya Museum & Gardens", location: "3251 S Miami Ave, Coconut Grove / Brickell, Miami", description: "James Deering's stunning 1916 Italian Renaissance waterfront estate — 10 acres of formal gardens, a coral-rock barge on Biscayne Bay, and a mansion packed with antiques. Currently discounted adult admission ($20) during ongoing restoration. Kids 5 and under free. SNAP/EBT cardholders and veterans free. Free Sunday Farmers Market in the Village (9am–2pm, no estate admission needed).", setting: "outdoor", estimatedCost: "$20/adult (discounted) · $10/child (6–12) · Under 5 free", ageRange: "All ages (best 5+)", ageMin: 0, ageMax: 17, emoji: "🏛️", source: "vizcaya", typicalHours: "Wed–Mon 9:30am–4:30pm (last admission) · Closed Tuesdays", seasonalNote: "Currently discounted to $20/adult while restoration is underway. Free Sunday Farmers Market at Vizcaya Village.", eventDate: null, daysOpen: [0,1,3,4,5,6], url: "https://vizcaya.org/welcome/" },
  { id: "venetianpool", name: "Venetian Pool", location: "2701 De Soto Blvd, Coral Gables", description: "The largest freshwater pool in the US — a 1924 historic landmark carved from a coral rock quarry with waterfalls, grottos, and a stone bridge. Spring-fed with 820,000 gallons of water refreshed daily. Kids must be at least 3 years old and 38 inches tall. You can bring your own food (no coolers, glass, or alcohol). Book in advance — closes at capacity. Closed Mondays.", setting: "outdoor", estimatedCost: "$17/non-resident · $6.75/CG resident (spring rates)", ageRange: "Ages 3+ (38\" min height)", ageMin: 3, ageMax: 17, emoji: "🏊", source: "venetianpool", typicalHours: "Tue–Fri 11am–5:30pm · Sat–Sun 10am–4:30pm · Closed Mon", seasonalNote: "Current spring season: Mar 10 – May 24. Book online — capacity fills fast on weekends!", eventDate: null, daysOpen: [0,2,3,4,5,6], url: "https://www.coralgables.com/attractions/venetian-pool" },
  { id: "cgmuseum", name: "Coral Gables Museum", location: "285 Aragon Ave, Coral Gables", description: "Housed in the 1939 historic Police and Fire Station, the CG Museum explores architecture, urban design, and local history. Free Family Day on Aragon every 3rd Saturday (10am–6pm) with live music, arts & crafts, and kids activities. Bike tours and walking tours also originate here monthly.", setting: "indoor", estimatedCost: "Free on Family Day (3rd Sat) · Check site for other admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏗️", source: "cgmuseum", typicalHours: "Wed–Sun — check site for hours · Family Day: 3rd Saturday 10am–6pm", seasonalNote: "Free Family Day on Aragon every 3rd Saturday — next one Apr 19.", eventDate: null, daysOpen: [0,3,4,5,6], url: "https://coralgablesmuseum.org" },
  { id: "matheson", name: "Matheson Hammock Park & Atoll Pool", location: "9610 Old Cutler Rd, Coral Gables / Pinecrest", description: "630-acre urban park with a unique man-made atoll pool — a tidal lagoon flushed naturally by Biscayne Bay — plus a sandy beach, nature trails, kayaking, fishing pier, picnic pavilions, and the Noma Beach at Red Fish restaurant on the water. Perfect calm shallow water for young kids. Leashed pets not allowed in the park.", setting: "outdoor", estimatedCost: "$7 parking weekdays · $10 parking weekends", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🌊", source: "matheson", typicalHours: "Sunrise – Sunset daily", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.miamidade.gov/parks/matheson-hammock.asp" },
  { id: "kidsempire", name: "Kids Empire", location: "11401 NW 12th St #E610, Dolphin Mall, Miami (Sweetwater)", description: "Giant indoor playground at Dolphin Mall with multi-level climbing mazes, slides, spinning, a dedicated tots area for babies and toddlers, big Lego building stations, ball pit, mini soccer, and a snack bar. All-day access with re-entry. 2 adults enter free per child. Non-grip socks mandatory for everyone — $3 at the door or bring your own. Sign waiver online before arriving to skip the line.", setting: "indoor", estimatedCost: "$22.90/child (1–17) · 2 adults free · Infants free · 10-punch card $159", ageRange: "All ages (tots to age 12)", ageMin: 0, ageMax: 12, emoji: "🧗", source: "kidsempire", typicalHours: "Mon–Thu 10am–8pm · Fri–Sun & holidays 10am–10pm", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.kidsempire.com/park/miami" },
  { id: "velocityclimbing", name: "Velocity Climbing", location: "2280 NW 41st St, Miami, FL 33142 (near Wynwood / Earlington Heights)", description: "South Florida's largest indoor rock climbing facility — 23,000 sq ft with top rope walls up to 60ft, bouldering, auto belays (no partner needed), an Olympic-standard speed wall, Kilter board, and a full training area. Staff-led intro classes run every hour. Youth programs for ages 5–17. Family membership available. Day pass $30, gear rentals available. Kids under 18 must be accompanied by a parent. One block from Earlington Heights Metrorail — 5 min from Wynwood.", setting: "indoor", estimatedCost: "$30 day pass · Gear rental extra · Family membership from $89/parent + $50/child/mo", ageRange: "Ages 5+ (with parent)", ageMin: 5, ageMax: 17, emoji: "🧗", source: "velocityclimbing", typicalHours: "Mon/Wed/Fri 3–10pm · Tue/Thu 10am–10pm · Sat 9am–10pm · Sun 9am–8pm", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.velocityclimbing.com/" },
  // Miami-Dade Public Library — always-on resource card
  { id: "mdpls-fifa-lab", name: "FIFA 2026 Innovation Lab: Soccer & Science Discovery Day", location: "Kendale Lakes Branch — Miami-Dade Public Library", description: "A special event co-hosted by FIFA World Cup 2026 and Sports Konnect featuring a soccer and LEGO/robotics workshop. Kids learn about soccer and science together in a hands-on discovery day. Free — no library card required.", setting: "indoor", estimatedCost: "Free", ageRange: "Ages 6–16", ageMin: 6, ageMax: 16, emoji: "⚽", source: "library", typicalHours: "Sat Apr 18, 1:30–3:30pm · Kendale Lakes Branch", seasonalNote: "Part of MDPLS's FIFA World Cup 2026 programming series", eventDate: "Sat Apr 18, 2026", daysOpen: [6], url: "https://mdpls.org/events" },
  { id: "library-general", name: "Miami-Dade Public Library — Free Kids Programs", location: "60+ branches countywide — find yours at mdpls.org", description: "All MDPLS branches run free weekly children\'s programs — no library card needed to attend. Current recurring programs include: Talking is Teaching bilingual storytime (ages 0–5, songs, stories & activities in English/Spanish); Drop-in Game Time (chess, Connect 4, board games, ages 6–12); GeekFest LARP foam combat (all ages); Tween Games drop-in (ages 8–12); Winnie-the-Pooh storytime & craft (ages 2–5); Earth Month storytelling & crafts (Spanish/English); beginner yoga for kids (ages 5+); and YOUmake Miami art & maker labs. Programs vary by branch — check mdpls.org/events or your nearest branch page.", setting: "indoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "📚", source: "library", typicalHours: "Varies by branch — most open Tue–Sat", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://mdpls.org/events" },
  { id: "skyzone", name: "Sky Zone Doral", location: "5450 NW 82nd Ave, Doral, FL 33166", description: "30,000+ sq ft indoor trampoline park with wall-to-wall trampolines, Ultimate Dodgeball, Foam Zone, Warrior Course, Sky Slam, Zip Line, and climbing walls. Little Leapers sessions for toddlers (Tue, Wed, Sun mornings). GLOW night sessions Fri/Sat evenings. Tuesday deal: all jump sessions $10. BOGO jump sessions available. Sign waiver online before arriving. Grip socks required — $3 at door.", setting: "indoor", estimatedCost: "Tickets from ~$20 · Tue all sessions $10 · Membership from $25.99/mo", ageRange: "All ages (Little Leapers for toddlers)", ageMin: 0, ageMax: 17, emoji: "🏀", source: "skyzone", typicalHours: "Mon–Thu 3–9pm · Fri 3–7:30pm then 8–10pm · Sat 10am–10pm · Sun 12–9pm", seasonalNote: "Tuesday deal: all sessions just $10! GLOW sessions Fri & Sat evenings.", eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.skyzone.com/doral/" },
  { id: "paradox", name: "Paradox Museum Miami", location: "2301 N Miami Ave, Wynwood, Miami", description: "70+ interactive optical illusion and paradox exhibits in the heart of Wynwood — walk on the ceiling in the Reverse Room, disappear in the Camouflage Wall, defy gravity in the Zero Gravity Room, and shrink or grow in the Ames Room. About 60–90 minutes. Florida resident discount available. Staff take photos for you. Sensory-Friendly Morning: Sat Apr 11, 9–11am.", setting: "indoor", estimatedCost: "~$24/child (4–11) · ~$30/adult · FL resident discount available", ageRange: "All ages (best ages 5+)", ageMin: 5, ageMax: 17, emoji: "🌀", source: "paradox", typicalHours: "Mon–Thu 12–7pm · Fri 12–7pm · Sat 10am–9pm · Sun 10am–7pm", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://paradoxmuseum.com/miami/" },
  { id: "mbgarden", name: "Miami Beach Botanical Garden", location: "2000 Convention Center Drive, Miami Beach, FL 33139", description: "A free, lush 2.5-acre tropical garden in the heart of Miami Beach, steps from the convention center and a short walk from Lincoln Road. Features native and exotic plants, serene pathways, and peaceful shaded spots. Free general admission every day. Well-behaved leashed pets welcome. Kids under 12 must be with a guardian. Great combination with a Miami Beach day — free and calm counterpoint to the busy beach scene.", setting: "outdoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🌺", source: "mbgarden", typicalHours: "Tue–Sun 9am–5pm · Closed Mondays", seasonalNote: null, eventDate: null, daysOpen: [0,2,3,4,5,6], url: "https://www.mbgarden.org/" },
  { id: "palmettominigolf", name: "Palmetto Mini Golf", location: "9300 SW 152nd St, Miami, FL 33157 (Palmetto Golf Course)", description: "18-hole outdoor mini golf course on the grounds of the Miami-Dade County Palmetto Golf Course, featuring waterfalls, lagoons, and a cave amid lush tropical landscaping. One of Miami's most affordable and scenic mini golf spots — a real course, not a arcade gimmick. Birthday party packages available with on-site Sports Grill restaurant.", setting: "outdoor", estimatedCost: "$8/player Mon–Thu · $10/player Fri–Sun & holidays", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⛳", source: "palmettominigolf", typicalHours: "Daily 10am–8pm (last tee 7:30pm)", seasonalNote: "Summer tip: call ahead (305-238-2922) as daytime camp field trips can book it out.", eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.golfpalmetto.com/palmetto-mini-golf/" },
  // PAMM — Pérez Art Museum Miami
  { id: "pamm", name: "Pérez Art Museum Miami (PAMM)", location: "1103 Biscayne Blvd, Museum Park, Downtown Miami", description: "World-class contemporary art museum on Biscayne Bay, designed by Herzog & de Meuron with stunning hanging gardens and waterfront terraces. Strong focus on Latin American, Caribbean, and African diaspora art. Free Second Saturdays every month (11am–3pm art-making + free all-day admission). MDCPS Student Pass = free admission any time + 1 free adult guest. Under 7 always free. Bank of America cardholders free first weekend of the month.", setting: "indoor", estimatedCost: "$18/adult · $12/child (7–18) · Under 7 free · Free on Second Saturdays", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎨", source: "pamm", typicalHours: "Mon 11am–6pm · Tue–Wed Closed · Thu 11am–9pm · Fri–Sun 11am–6pm", seasonalNote: "Free Second Saturdays: next is Apr 11 (Sports & Trophy-making theme, Miami Heat & Marlins appearances).", eventDate: null, daysOpen: [0,1,4,5,6], url: "https://www.pamm.org/en/visit/" },
  { id: "pamm-second-sat-apr", name: "PAMM Free Second Saturday — Get in the Game!", location: "Pérez Art Museum Miami, 1103 Biscayne Blvd, Museum Park", description: "Free all-day admission with art-making 11am–3pm. April theme: sports and personal achievement. Features Miami Heat and Marlins appearances, performances by the Legacy Percussion Ensemble, and hands-on trophy-making and art activities for families. Free, no tickets needed.", setting: "indoor", estimatedCost: "Free all day", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏆", source: "pamm", typicalHours: "11am–3pm (art activities) · Museum open until 6pm", seasonalNote: "Free! Miami Heat + Marlins appearances · Legacy Percussion Ensemble performance.", eventDate: "Sat Apr 11, 2026", daysOpen: [6], url: "https://www.pamm.org/en/events/event/pamm-free-second-saturdays-get-in-the-game/" },
  { id: "pamm-kids-jamm", name: "KIDS JAMM at PAMM", location: "Pérez Art Museum Miami, 1103 Biscayne Blvd, Museum Park", description: "PAMM's premier family fundraiser — a morning of hands-on art-making, live performances, and gallery exploration for kids and families. Designed to spark creativity and connect children to the art community. Tickets required for this special event.", setting: "indoor", estimatedCost: "Ticketed — check pamm.org", ageRange: "All ages (family event)", ageMin: 0, ageMax: 17, emoji: "🎭", source: "pamm", typicalHours: "10am–1pm", seasonalNote: null, eventDate: "Sun Apr 19, 2026", daysOpen: [0], url: "https://www.pamm.org/en/events/event/kids-jamm-at-pamm-2/" },
  { id: "pamm-storytime-apr", name: "PAMM Storytime", location: "Pérez Art Museum Miami, 1103 Biscayne Blvd, Museum Park", description: "A family-friendly museum program introducing young children to art, storytelling, and hands-on creativity. Part of PAMM's regular monthly Storytime series. Included with admission or free on Second Saturdays.", setting: "indoor", estimatedCost: "Included with admission · Free on Second Saturdays", ageRange: "Young children (ages 3–7)", ageMin: 3, ageMax: 7, emoji: "📖", source: "pamm", typicalHours: "Check pamm.org for exact time", seasonalNote: null, eventDate: "Sat Apr 25, 2026", daysOpen: [6], url: "https://www.pamm.org/en/events/?event_cat=12926" },
  // Homestead-Miami Speedway
  { id: "speedway", name: "Homestead-Miami Speedway", location: "1 Speedway Blvd, Homestead, FL 33035", description: "A 650-acre motorsports complex in South Dade with a 1.5-mile oval and 2.21-mile road course. Home to the 2026 NASCAR Championship Weekend (Nov 6–8) — the season finale for all three NASCAR national series, returning after a 6-year hiatus. Also hosts Fast Lane Friday street-legal drag racing, NASCAR Race Car Ride Alongs, and the Beach Bash infield area on the 7-acre spring-fed lake (open to all ages). Kids tickets often deeply discounted or free with adult purchase.", setting: "outdoor", estimatedCost: "Varies by event · NASCAR Championship from ~$30+ · Fast Lane Friday spectators free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏎️", source: "speedway", typicalHours: "Event-dependent — check homesteadmiamispeedway.com/calendar", seasonalNote: "2026 NASCAR Championship Weekend returns Nov 6–8 — first time since 2019!", eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.homesteadmiamispeedway.com/calendar/" },
  { id: "speedway-nascar-champ", name: "NASCAR Championship Weekend", location: "Homestead-Miami Speedway, 1 Speedway Blvd, Homestead", description: "The 2026 NASCAR season finale returns to Homestead for the first time since 2019 — three days of championship racing across all three NASCAR national series. Fri Nov 6: Craftsman Truck Series Championship. Sat Nov 7: O'Reilly Auto Parts Series Championship. Sun Nov 8: NASCAR Cup Series Championship. Kids FREE on Saturday in General Admission ($10 reserved). Youth and Family activities, NASCAR Experience stage with driver appearances. Beach Bash open all ages on the infield lake.", setting: "outdoor", estimatedCost: "From ~$30 · Kids FREE (Sat GA) or $10 (Sat reserved) with adult ticket", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏆", source: "speedway", typicalHours: "Fri Nov 6 7pm · Sat Nov 7 · Sun Nov 8", seasonalNote: "Kids FREE Saturday in General Admission — historic Championship Weekend back in Miami!", eventDate: "Nov 6 – 8, 2026", daysOpen: [5,6,0], url: "https://www.homesteadmiamispeedway.com/events/champ/" },
  { id: "speedway-fastlane", name: "Fast Lane Friday — Spectator Night", location: "Homestead-Miami Speedway, 1 Speedway Blvd, Homestead", description: "Watch street-legal cars drag race head-to-head on the actual NASCAR track straightaway. Spectators watch free — drivers pay $50/car for 6 laps. Great motorsports experience for kids who love fast cars, held monthly Friday evenings. Not suitable for young toddlers due to noise and late hours.", setting: "outdoor", estimatedCost: "Free for spectators · $50/car for participants (18+ to drive)", ageRange: "Ages 5+ (loud, late)", ageMin: 5, ageMax: 17, emoji: "🚗", source: "speedway", typicalHours: "Friday evenings — check homesteadmiamispeedway.com for dates", seasonalNote: "Spectators watch free! Monthly Friday nights Apr–Sep.", eventDate: null, daysOpen: [5], url: "https://www.homesteadmiamispeedway.com/fast-lane-friday/" },
  { id: "goldcoastrailroad", name: "Gold Coast Railroad Museum", location: "12450 SW 152nd St, Miami (near Zoo Miami)", description: "One of Florida's three official State Railroad Museums — 40+ historic railcars on 3 miles of track, including the Presidential railcar Ferdinand Magellan (used by FDR, Truman, and Eisenhower) and a WWII-era steam locomotive. Rides available: Link train (2-ft narrow gauge, weekdays 12pm), Standard Gauge, Cab Rides, and Speeder rides. Thomas play tables, model train room, and WWII airship base exhibits. Call ahead to confirm ride availability. Military free · EBT/WIC Museums4All $3 for up to 4.", setting: "outdoor", estimatedCost: "$10/child (3–12) · $12/adult · Under 3 free · Seniors $8", ageRange: "All ages (train-lovers!)", ageMin: 0, ageMax: 17, emoji: "🚂", source: "goldcoastrailroad", typicalHours: "Wed–Fri 11am–4pm · Sat–Sun 10am–4pm · Closed Mon–Tue", seasonalNote: null, eventDate: null, daysOpen: [0,3,4,5,6], url: "https://www.goldcoastrailroadmuseum.org" },
  { id: "potterymiami", name: "Pottery Miami — Kids Pottery Classes", location: "164 NW 20th St, Miami 33127 (Wynwood) · 701 NW 2nd Ave (Edgewater)", description: "Hands-on pottery and hand-building classes for kids from age 3, taught by experienced instructors. In a 2-hour session kids shape clay into mugs, bowls, vases, and more using a potter's wheel and hand-building techniques — finished piece goes home after firing (2–3 weeks). No experience needed, no enrollment fee, no commitment. Also offers kids birthday parties and school field trips. Book at pottery-miami.com.", setting: "indoor", estimatedCost: "$90/person (hand-building); $130 with painting/glazing", ageRange: "Ages 3+", ageMin: 3, ageMax: 17, emoji: "🏺", source: "potterymiami", typicalHours: "Daily 10am–9pm, 2-hour sessions", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://pottery-miami.com/kids-pottery-classes-in-miami" },
  { id: "skatebird", name: "SkateBird Miami", location: "533 NE 83rd St, Miami 33138 (Upper Eastside / El Portal)", description: "32,000 sq ft skatepark complex featuring a covered 12,000 sq ft skate plaza and an outdoor 18,000 sq ft pump track — built to handle rain and open late. Classes, private lessons, and seasonal skate camps for all skill levels. Beyond skating: DJ Academy, gaming lounge, food (pizza, burgers, Mediterranean), skate shop, and regular community events. Rentals available (skateboards, scooters, pads). Also the host venue for Tutifruti's Falling Frut workshop on Apr 17. Monday is FREE SKATE day.", setting: "outdoor", estimatedCost: "$10 entry / $8 rentals; FREE Mondays. Lessons from $25 trial class", ageRange: "All ages", ageMin: 3, ageMax: 17, emoji: "🛹", source: "skatebird", typicalHours: "Mon–Fri 12–8pm · Sat 10am–6pm · Sun 10am–7pm", seasonalNote: "Spring, Summer & Winter skate camps available — book at active.com/orgs/skatebird-miami", eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.skatebirdmiami.com" },
  // Tutifruti
  { id: "tutifruti", name: "Tutifruti — Movement & Art Workshops", location: "Various locations across Miami-Dade, Broward & Palm Beach", description: "South Florida nonprofit bringing low-cost, inclusive movement and creative art workshops to communities across the region. Programs include skateboarding, yoga, art workshops (screenprinting, bookmaking, block printing, fingerboard-making), and mental health discussions. Welcoming to all — especially women, girls, BIPOC, and LGBTQ+ youth. Check Instagram @tutifruti.fl for upcoming workshops.", setting: "outdoor", estimatedCost: "Low cost or free", ageRange: "Ages 5+", ageMin: 5, ageMax: 17, emoji: "🛹", source: "tutifruti", typicalHours: "Varies by event — check tutifruti-fl.org", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.tutifruti-fl.org" },
  { id: "tutifruti-falling-frut", name: "Tutifruti: Falling Frut Workshop @ Skatebird Miami", location: "Skatebird Miami (check miamiandbeaches.com for exact address)", description: "A movement and poetry workshop led by Tutifruti reimagining the skatepark as a space for guided physical practice and creative reflection. Participants move through the space, explore a falling clinic (without gear), observe their physical and emotional responses, then write poetry. Part of the O, Miami Poetry Festival. Ages 5+, parental supervision for younger kids.", setting: "outdoor", estimatedCost: "Free or low cost — check site", ageRange: "Ages 5+", ageMin: 5, ageMax: 17, emoji: "🛹", source: "tutifruti", typicalHours: "Friday April 17", seasonalNote: "Part of the O, Miami Poetry Festival — combining skateboarding, falling, and poetry!", eventDate: "Fri Apr 17, 2026", daysOpen: [5], url: "https://www.tutifruti-fl.org" },
  { id: "pottery-miami", name: "Pottery Studio Miami — Kids Classes", location: "164 NW 20th St, Miami, FL 33127 (Wynwood / Edgewater area)", description: "Daily pottery, hand-building, and painting classes for kids and families in a drop-in-friendly studio near Wynwood. No experience needed, no membership required. Classes run 2 hours with an instructor guiding every step. Kids take home a finished piece after firing (2–3 weeks). Mommy & Me (ages 3–5): $90 total for parent + child. Kids Ceramics (ages 6–10): $90/person (hand-building + 1 firing) or $130 with painting, glazing + 2 firings. Teens same pricing. Private family groups up to 20 people ($100/person, $500 min).", setting: "indoor", estimatedCost: "$90 total Mommy & Me (3–5) · $90/person kids (6–10) · $130 with painting", ageRange: "Ages 3+", ageMin: 3, ageMax: 17, emoji: "🏺", source: "pottery-miami", typicalHours: "Mon–Fri 12–10pm · Sat–Sun 10am–10pm · Classes every 2 hrs, book online", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://pottery-miami.com/kids-pottery-classes-in-miami" },
  { id: "aki-festival-2026", name: "AKI Family Arts Festival 2026 — All Kids Included", location: "Dennis C. Moss Cultural Arts Center · 9901 SW 186th St, Cutler Bay 33157", description: "The 20th annual All Kids Included (AKI) Family Arts Festival — a free, fully inclusive day of creativity and community for children of all abilities and their families. Features live music and theater performances, hands-on arts activities, a rock-climbing wall, outdoor games, and community resource tables. Full accessibility accommodations: Braille, sighted guides, audio description, sensory-inclusive programs, and shadow-interpreted theatre. Presented by Miami-Dade County Department of Cultural Affairs.", setting: "outdoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎨", source: "mosscenter", typicalHours: "Sat May 2 · 10am (check mosscenter.org for exact hours)", seasonalNote: "Fully sensory-inclusive and accessibility-forward — great for kids with and without disabilities.", eventDate: "Sat May 2, 2026", daysOpen: [6], url: "https://www.mosscenter.org/mc/eventDetail.page?id=379" },
  // Coral Gables City Events
  { id: "cg-parents-night-out", name: "Parents Night Out", location: "Coral Gables Country Club, Coral Gables", description: "Drop the kids off for a supervised evening of activities at the Country Club while you enjoy a night out. Organized by the City of Coral Gables Recreation department.", setting: "indoor", estimatedCost: "Check site for registration fee", ageRange: "Kids (check age range)", ageMin: 4, ageMax: 12, emoji: "🌙", source: "coralgables", typicalHours: "Evening — check site for exact time", seasonalNote: null, eventDate: "Fri Apr 17, 2026", daysOpen: [5], url: "https://www.coralgables.com/events/parents-night-out" },
  { id: "cg-plogging", name: "Plogging at Chapman/Matheson", location: "Chapman Field / Matheson Hammock, Coral Gables area", description: "Plogging = jogging + picking up litter! Join Keep Coral Gables Beautiful for an active, eco-friendly morning run/walk while cleaning up the park. Great for active families and kids who love the outdoors.", setting: "outdoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏃", source: "coralgables", typicalHours: "8:30am", seasonalNote: null, eventDate: "Sat Apr 18, 2026", daysOpen: [6], url: "https://www.coralgables.com/events/plogging-chapman" },
  { id: "cg-bike-tours-apr", name: "Gables Bike Tours", location: "Coral Gables Museum, 285 Aragon Ave, Coral Gables", description: "Free guided bike tours of Coral Gables led by BikeWalk Miami and the Coral Gables Museum, exploring the city's stunning architecture, parks, and history. A fun, active family outing — bring your own bikes.", setting: "outdoor", estimatedCost: "Free (check site)", ageRange: "Ages 6+", ageMin: 6, ageMax: 17, emoji: "🚲", source: "coralgables", typicalHours: "Morning — check site for time", seasonalNote: null, eventDate: "Sun Apr 19, 2026", daysOpen: [0], url: "https://www.coralgables.com/events/gables-bike-tours" },
  { id: "cg-arbor-day", name: "Coral Gables Arbor Day Celebration", location: "Fewell Park, Coral Gables", description: "The City of Coral Gables celebrates Arbor Day with a community gathering at Fewell Park. A great free outdoor morning activity for families to learn about trees and enjoy the park.", setting: "outdoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🌳", source: "coralgables", typicalHours: "9:30am – 11:30am", seasonalNote: null, eventDate: "Fri Apr 24, 2026", daysOpen: [5], url: "https://www.coralgables.com/events/arbor-day-celebration" },
  { id: "cg-5k-kids-dash", name: "Tour of the Gables 5K & Kids Dash", location: "Coral Gables (downtown area)", description: "Baptist Health Tour of the Gables features a 5K, 10K, and a dedicated Kids Dash — making it a perfect family racing morning. A great way to make running fun for kids while parents race too.", setting: "outdoor", estimatedCost: "Check site for registration", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏅", source: "coralgables", typicalHours: "Morning — check site for start times", seasonalNote: "Kids Dash included — run as a family!", eventDate: "Sat Apr 25, 2026", daysOpen: [6], url: "https://www.coralgables.com/events/tour-gables-5k" },
  { id: "cg-giralda-live", name: "Giralda Live", location: "Giralda Plaza, Coral Gables", description: "Free monthly street music festival on Giralda Avenue — live bands, food, and a festive community atmosphere. Every first Friday of the month. Great for families to stroll, eat, and enjoy live music outdoors.", setting: "outdoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎵", source: "coralgables", typicalHours: "Evening — check site for exact time", seasonalNote: null, eventDate: null, daysOpen: [5], url: "https://www.coralgables.com/events/giralda-live" },
  { id: "cg-chopin", name: "Chopin for All — Free Concert", location: "Coral Gables (check site for venue)", description: "Free concert of Chopin works performed by award-winning pianist Charles Richard-Hamelin, presented by the Chopin Foundation of the United States. A beautiful, accessible introduction to classical music for families.", setting: "indoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎹", source: "coralgables", typicalHours: "Check site for time", seasonalNote: "Free world-class classical music — great for curious kids!", eventDate: "Sun May 3, 2026", daysOpen: [0], url: "https://www.coralgables.com/events/chopin-all-featuring-charles-richard-hamelin" },
  { id: "cg-bike-tours-may", name: "Gables Bike Tours (May)", location: "Coral Gables Museum, 285 Aragon Ave, Coral Gables", description: "Monthly guided bike tour of Coral Gables with BikeWalk Miami and the Coral Gables Museum. Explore the city's beautiful streets, parks, and historic architecture. Bring your own bikes.", setting: "outdoor", estimatedCost: "Free (check site)", ageRange: "Ages 6+", ageMin: 6, ageMax: 17, emoji: "🚲", source: "coralgables", typicalHours: "Morning — check site for time", seasonalNote: null, eventDate: "Sun May 17, 2026", daysOpen: [0], url: "https://www.coralgables.com/events/gables-bike-tours" },
  { id: "cg-literacy-fest", name: "Gables Family Literacy Festival", location: "War Memorial Youth Center, Coral Gables", description: "Annual daylong book fair under the Youth Center tree canopy, promoting summer reading and literary arts for kids of all ages. A laid-back, family-friendly outdoor event with activities, books, and authors.", setting: "outdoor", estimatedCost: "Free (check site)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "📚", source: "coralgables", typicalHours: "All day — check site for times", seasonalNote: "Great pre-summer reading kickoff!", eventDate: "Sat May 16, 2026", daysOpen: [6], url: "https://www.coralgables.com/events/gables-family-literacy-festival" },
  { id: "cg-sensory-4th", name: "Sensory Friendly Fourth of July", location: "Biltmore Hotel area, Coral Gables", description: "The City of Coral Gables invites guests with autism and sensory sensitivities to enjoy a premier, quieter viewing area for the Biltmore fireworks display — a wonderful accommodation for families who need a calmer environment.", setting: "outdoor", estimatedCost: "Check site for details", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎆", source: "coralgables", typicalHours: "Evening — check site", seasonalNote: "Sensory-friendly accommodations for kids with autism or sensory needs.", eventDate: "Sat Jul 4, 2026", daysOpen: [6], url: "https://www.coralgables.com/events/sensory-friendly-fourth-july" },
  // UM Earth Month events - April 2026
  // UM Non-Baseball Home Events
  { id: "um-track-alumni-invit", name: "🏃 Canes Track & Field — Hurricane Alumni Invitational", location: "Cobb Stadium, University of Miami, Coral Gables", description: "UM's final home track & field meet of the season — open to spectators, free on the UM campus. Watch sprints, jumps, throws and distance events in a beautiful campus setting. Great live college athletics intro for kids.", setting: "outdoor", estimatedCost: "Free to spectators", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏃", source: "um", typicalHours: "All day Apr 10–11 — check miamihurricanes.com/sports/track/schedule", seasonalNote: "UM's last home track meet of the outdoor season!", eventDate: "Apr 10 – 11, 2026", daysOpen: [5,6], url: "https://miamihurricanes.com/sports/track/schedule/" },
  { id: "um-wtennis-unc", name: "🎾 Canes Women's Tennis vs. UNC Tar Heels", location: "Neil Schiff Tennis Center, University of Miami, Coral Gables", description: "Miami Hurricanes women's tennis (ranked, 13-4 ACC) hosts UNC at the Neil Schiff Tennis Center on campus. Free to watch — outdoor courts, great live college tennis atmosphere.", setting: "outdoor", estimatedCost: "Free to spectators", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎾", source: "um", typicalHours: "12:00 PM", seasonalNote: null, eventDate: "Fri Apr 10, 2026", daysOpen: [5], url: "https://miamihurricanes.com/sports/wten/schedule/" },
  { id: "um-mtennis-fsu", name: "🎾 Canes Men's Tennis vs. Florida State", location: "Neil Schiff Tennis Center, University of Miami, Coral Gables", description: "Miami Hurricanes men's tennis hosts longtime rival Florida State at the Neil Schiff Tennis Center on campus. In-state rivalry match — free to watch.", setting: "outdoor", estimatedCost: "Free to spectators", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎾", source: "um", typicalHours: "12:00 PM", seasonalNote: "Rivalry match vs. Florida State!", eventDate: "Sat Apr 11, 2026", daysOpen: [6], url: "https://miamihurricanes.com/sports/mten/schedule/" },
  { id: "um-volleyball-ucf", name: "🏐 Canes Volleyball vs. UCF Knights", location: "UM Wellness Center / Knight Sports Complex, University of Miami, Coral Gables", description: "Miami Hurricanes women's volleyball hosts UCF on campus. Canes volleyball is a strong NCAA program — great live action for families. Check miamihurricanes.com for ticket info.", setting: "indoor", estimatedCost: "Check miamihurricanes.com for tickets", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏐", source: "um", typicalHours: "2:00 PM", seasonalNote: null, eventDate: "Sat Apr 11, 2026", daysOpen: [6], url: "https://miamihurricanes.com/sports/wvball/schedule/" },
  { id: "um-wtennis-duke", name: "🎾 Canes Women's Tennis vs. Duke", location: "Neil Schiff Tennis Center, University of Miami, Coral Gables", description: "Miami Hurricanes women's tennis hosts Duke at the Neil Schiff Tennis Center on campus. Free to watch — great Sunday morning college tennis.", setting: "outdoor", estimatedCost: "Free to spectators", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🎾", source: "um", typicalHours: "12:00 PM", seasonalNote: null, eventDate: "Sun Apr 12, 2026", daysOpen: [0], url: "https://miamihurricanes.com/sports/wten/schedule/" },
  // UM Baseball 2026 home games
  { id: "um-vs-fiu", name: "⚾ Canes Baseball vs. FIU Panthers", location: "Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables", description: "Miami Hurricanes home baseball vs. FIU. In-state rivalry game at Mark Light Field on the UM campus. Great atmosphere, affordable tickets, family-friendly. Baseball Buddies youth program available. Parking on campus.", setting: "outdoor", estimatedCost: "$12+ general admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "um", typicalHours: "6:00 PM first pitch", seasonalNote: "In-state rivalry game!", eventDate: "Tue Apr 7, 2026", daysOpen: [2], url: "https://miamihurricanes.com/baseball-tickets/" },
  { id: "um-vs-wakeforest-fri", name: "⚾ Canes Baseball vs. Wake Forest (Fri)", location: "Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables", description: "Miami Hurricanes ACC home series opener vs. Wake Forest at Mark Light Field. Great atmosphere, affordable tickets, family-friendly. Baseball Buddies youth program available.", setting: "outdoor", estimatedCost: "$12+ general admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "um", typicalHours: "7:00 PM first pitch", seasonalNote: null, eventDate: "Fri Apr 10, 2026", daysOpen: [5], url: "https://miamihurricanes.com/baseball-tickets/" },
  { id: "um-vs-wakeforest-sat", name: "⚾ Canes Baseball vs. Wake Forest (Sat)", location: "Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables", description: "Miami Hurricanes ACC home series game 2 vs. Wake Forest at Mark Light Field. Weekend evening game — great family outing on the UM campus.", setting: "outdoor", estimatedCost: "$12+ general admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "um", typicalHours: "6:00 PM first pitch", seasonalNote: null, eventDate: "Sat Apr 11, 2026", daysOpen: [6], url: "https://miamihurricanes.com/baseball-tickets/" },
  { id: "um-vs-wakeforest-sun", name: "⚾ Canes Baseball vs. Wake Forest (Sun)", location: "Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables", description: "Miami Hurricanes ACC home series finale vs. Wake Forest at Mark Light Field. Sunday afternoon game — perfect for families.", setting: "outdoor", estimatedCost: "$12+ general admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "um", typicalHours: "12:00 PM first pitch", seasonalNote: null, eventDate: "Sun Apr 12, 2026", daysOpen: [0], url: "https://miamihurricanes.com/baseball-tickets/" },
  { id: "um-vs-usf", name: "⚾ Canes Baseball vs. USF Bulls", location: "Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables", description: "Miami Hurricanes home baseball vs. USF Bulls at Mark Light Field. Mid-week game — great for a weeknight outing. Baseball Buddies youth program available.", setting: "outdoor", estimatedCost: "$12+ general admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "um", typicalHours: "6:00 PM first pitch", seasonalNote: null, eventDate: "Wed Apr 15, 2026", daysOpen: [3], url: "https://miamihurricanes.com/baseball-tickets/" },
  { id: "um-vs-cal-fri", name: "⚾ Canes Baseball vs. Cal Golden Bears (Fri)", location: "Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables", description: "Miami Hurricanes ACC home series opener vs. Cal at Mark Light Field. Friday night baseball — great atmosphere on the UM campus.", setting: "outdoor", estimatedCost: "$12+ general admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "um", typicalHours: "7:00 PM first pitch", seasonalNote: null, eventDate: "Fri Apr 24, 2026", daysOpen: [5], url: "https://miamihurricanes.com/baseball-tickets/" },
  { id: "um-vs-cal-sat", name: "⚾ Canes Baseball vs. Cal Golden Bears (Sat)", location: "Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables", description: "Miami Hurricanes ACC home series game 2 vs. Cal at Mark Light Field. Weekend evening game on the UM campus.", setting: "outdoor", estimatedCost: "$12+ general admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "um", typicalHours: "6:00 PM first pitch", seasonalNote: null, eventDate: "Sat Apr 25, 2026", daysOpen: [6], url: "https://miamihurricanes.com/baseball-tickets/" },
  { id: "um-vs-cal-sun", name: "⚾ Canes Baseball vs. Cal Golden Bears (Sun)", location: "Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables", description: "Miami Hurricanes ACC home series finale vs. Cal at Mark Light Field. Sunday afternoon — wrap up the weekend at the ballpark.", setting: "outdoor", estimatedCost: "$12+ general admission", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "um", typicalHours: "12:00 PM first pitch", seasonalNote: null, eventDate: "Sun Apr 26, 2026", daysOpen: [0], url: "https://miamihurricanes.com/baseball-tickets/" },
  { id: "um-earthday-fair", name: "UM Earth Day Fair", location: "Lakeside Patio, University of Miami, Coral Gables", description: "Free outdoor fair on Earth Day featuring student, faculty, and community sustainability booths, a Yellow Submarine ocean art activation, nature photography competition, green giveaways, and Playa Bowl vouchers. Ends with a free Patio Jams concert with Aisha (2–3:30pm). Open to the public.", setting: "outdoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🌍", source: "umearthday", typicalHours: "10:30am – 3:30pm", seasonalNote: "Earth Day event — free and open to the public!", eventDate: "Wed Apr 22, 2026", daysOpen: [3], url: "https://greenu.miami.edu/initiatives/nature/earth-day/index.html" },
  { id: "um-arborday", name: "Arbor Day Celebration & Free Concert", location: "Gifford Arboretum, Cox Science Building, 1301 Memorial Dr, Coral Gables", description: "UM's 12th consecutive Tree Campus USA celebration. Starts at 5pm with a guided sensory tree walk through the Gifford Arboretum, followed by a free outdoor concert at 6pm from Frost School of Music artist Maeve McMahon and UM alum Keith Johns. Finger food served. Open to the public.", setting: "outdoor", estimatedCost: "Free", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🌳", source: "umearthday", typicalHours: "5:00pm – 8:00pm", seasonalNote: "Free concert in the arboretum — beautiful spring evening outing!", eventDate: "Thu Apr 16, 2026", daysOpen: [4], url: "https://greenu.miami.edu/initiatives/nature/earth-day/index.html" },
  { id: "um-coral-movie", name: "Earth Day: Coral Documentary Screening", location: "Coral Gables Art Cinema, Coral Gables", description: "Screening of the 2024 documentary 'With or Without — A Coral Story' followed by a panel discussion with UM Rosenstiel School coral scientists and info on the Rescue a Reef program. A great way for older kids to connect with local ocean conservation. Collaboration between Coral Gables Art Cinema and Green U.", setting: "indoor", estimatedCost: "Check site for ticket price", ageRange: "Ages 8+", ageMin: 8, ageMax: 17, emoji: "🪸", source: "umearthday", typicalHours: "6:00pm", seasonalNote: "Earth Day documentary — learn about Miami's coral reefs!", eventDate: "Wed Apr 22, 2026", daysOpen: [3], url: "https://greenu.miami.edu/initiatives/nature/earth-day/index.html" },
  { id: "um-scavenger-hunt", name: "UM Earth Month Scavenger Hunt", location: "University of Miami Campus, Coral Gables", description: "ECO Agency's multi-day campus scavenger hunt following daily Instagram clues to discover UM's sustainability programs — recycling, solar panels, gardens, composting and more. Concludes at the Arbor Day celebration on Apr 16 with prizes. Open to all UM community visitors.", setting: "outdoor", estimatedCost: "Free", ageRange: "Ages 8+", ageMin: 8, ageMax: 17, emoji: "🗺️", source: "umearthday", typicalHours: "Self-paced, Apr 13–16", seasonalNote: "Win prizes including a drone, daypack, and hammock!", eventDate: "Apr 13 – 16, 2026", daysOpen: [0,1,2,3,4,5,6], url: "https://greenu.miami.edu/initiatives/nature/earth-day/index.html" },
  // Miami Marlins 2026 home games
  { id: "marlins-apr17", name: "Marlins vs. Milwaukee Brewers (Fri)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Milwaukee Brewers. Check for Friday fireworks — mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "7:10 PM", seasonalNote: "Check for Friday fireworks at mlb.com/marlins", eventDate: "Fri Apr 17, 2026", daysOpen: [5], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-apr18", name: "Marlins vs. Milwaukee Brewers (Sat)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Milwaukee Brewers. Weekend game. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "4:10 PM", seasonalNote: null, eventDate: "Sat Apr 18, 2026", daysOpen: [6], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-apr19", name: "Marlins vs. Milwaukee Brewers (Sun)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Milwaukee Brewers. Sunday Funday — check for kids deals. 🎁 Giveaway: Basketball Jersey — Throwback presented by Goya! Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "1:40 PM", seasonalNote: "🏀 Basketball Jersey — Throwback presented by Goya giveaway — arrive early!", eventDate: "Sun Apr 19, 2026", daysOpen: [0], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-apr20", name: "Marlins vs. St. Louis Cardinals (Mon)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the St. Louis Cardinals. Check for $1 Kids Night or special Mon deals. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "Check for $1 Kids Night special", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: "Check for $1 Kids Night Monday specials", eventDate: "Mon Apr 20, 2026", daysOpen: [1], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-apr21", name: "Marlins vs. St. Louis Cardinals (Tue)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the St. Louis Cardinals. Check for weekday specials. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: null, eventDate: "Tue Apr 21, 2026", daysOpen: [2], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-apr22", name: "Marlins vs. St. Louis Cardinals (Wed)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the St. Louis Cardinals. 4-for-$44 Wednesday bundle often available — check mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "4-for-$44 Wednesday bundle — check site", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "12:10 PM", seasonalNote: null, eventDate: "Wed Apr 22, 2026", daysOpen: [3], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may1", name: "Marlins vs. Philadelphia Phillies (Fri)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Philadelphia Phillies. Check for Friday fireworks — mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "7:10 PM", seasonalNote: "Check for Friday fireworks at mlb.com/marlins", eventDate: "Fri May 1, 2026", daysOpen: [5], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may2", name: "Marlins vs. Philadelphia Phillies (Sat)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Philadelphia Phillies. Weekend game. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "4:10 PM", seasonalNote: null, eventDate: "Sat May 2, 2026", daysOpen: [6], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may3", name: "Marlins vs. Philadelphia Phillies (Sun)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Philadelphia Phillies. Sunday Funday — check for kids deals. 🎁 Giveaway: Captain's Hat! Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "1:40 PM", seasonalNote: "🎩 Captain's Hat giveaway — arrive early!", eventDate: "Sun May 3, 2026", daysOpen: [0], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may4", name: "Marlins vs. Philadelphia Phillies (Mon)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Philadelphia Phillies. Check for $1 Kids Night or special Mon deals. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "Check for $1 Kids Night special", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: "Check for $1 Kids Night Monday specials", eventDate: "Mon May 4, 2026", daysOpen: [1], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may5", name: "Marlins vs. Baltimore Orioles (Tue)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Baltimore Orioles. Check for weekday specials. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: null, eventDate: "Tue May 5, 2026", daysOpen: [2], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may6", name: "Marlins vs. Baltimore Orioles (Wed)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Baltimore Orioles. 4-for-$44 Wednesday bundle often available — check mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "4-for-$44 Wednesday bundle — check site", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "12:10 PM", seasonalNote: null, eventDate: "Wed May 6, 2026", daysOpen: [3], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may7", name: "Marlins vs. Baltimore Orioles (Thu)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Baltimore Orioles. Weekday game — budget-friendly. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: null, eventDate: "Thu May 7, 2026", daysOpen: [4], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may8", name: "Marlins vs. Washington Nationals (Fri)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Washington Nationals. Check for Friday fireworks — mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "7:10 PM", seasonalNote: "Check for Friday fireworks at mlb.com/marlins", eventDate: "Fri May 8, 2026", daysOpen: [5], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may9", name: "Marlins vs. Washington Nationals (Sat)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Washington Nationals. Weekend game. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "4:10 PM", seasonalNote: null, eventDate: "Sat May 9, 2026", daysOpen: [6], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may10", name: "Marlins vs. Washington Nationals (Sun)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Washington Nationals. Sunday Funday — check for kids deals. 🎁 Giveaway: Mother's Day Clutch! Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "12:15 PM", seasonalNote: "👜 Mother's Day Clutch giveaway — arrive early!", eventDate: "Sun May 10, 2026", daysOpen: [0], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may18", name: "Marlins vs. Atlanta Braves (Mon)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Atlanta Braves. Check for $1 Kids Night or special Mon deals. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "Check for $1 Kids Night special", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: "Check for $1 Kids Night Monday specials", eventDate: "Mon May 18, 2026", daysOpen: [1], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may19", name: "Marlins vs. Atlanta Braves (Tue)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Atlanta Braves. Check for weekday specials. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: null, eventDate: "Tue May 19, 2026", daysOpen: [2], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may20", name: "Marlins vs. Atlanta Braves (Wed)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Atlanta Braves. 4-for-$44 Wednesday bundle often available — check mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "4-for-$44 Wednesday bundle — check site", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "12:10 PM", seasonalNote: null, eventDate: "Wed May 20, 2026", daysOpen: [3], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may21", name: "Marlins vs. Atlanta Braves (Thu)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Atlanta Braves. Weekday game — budget-friendly. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: null, eventDate: "Thu May 21, 2026", daysOpen: [4], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may22", name: "Marlins vs. New York Mets (Fri)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the New York Mets. Check for Friday fireworks — mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "7:10 PM", seasonalNote: null, eventDate: "Fri May 22, 2026", daysOpen: [5], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may23", name: "Marlins vs. New York Mets (Sat)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the New York Mets. Weekend game. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "4:10 PM", seasonalNote: null, eventDate: "Sat May 23, 2026", daysOpen: [6], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-may24", name: "Marlins vs. New York Mets (Sun)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the New York Mets. Sunday Funday — check for kids deals. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "1:40 PM", seasonalNote: null, eventDate: "Sun May 24, 2026", daysOpen: [0], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun5", name: "Marlins vs. Tampa Bay Rays (Fri)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Tampa Bay Rays. Check for Friday fireworks — mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "7:10 PM", seasonalNote: null, eventDate: "Fri Jun 5, 2026", daysOpen: [5], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun6", name: "Marlins vs. Tampa Bay Rays (Sat)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Tampa Bay Rays. Weekend game. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "4:10 PM", seasonalNote: null, eventDate: "Sat Jun 6, 2026", daysOpen: [6], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun7", name: "Marlins vs. Tampa Bay Rays (Sun)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Tampa Bay Rays. Sunday Funday — check for kids deals. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "1:40 PM", seasonalNote: null, eventDate: "Sun Jun 7, 2026", daysOpen: [0], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun19", name: "Marlins vs. San Francisco Giants (Fri)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the San Francisco Giants. Check for Friday fireworks — mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "7:10 PM", seasonalNote: null, eventDate: "Fri Jun 19, 2026", daysOpen: [5], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun20", name: "Marlins vs. San Francisco Giants (Sat)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the San Francisco Giants. Weekend game. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "4:10 PM", seasonalNote: null, eventDate: "Sat Jun 20, 2026", daysOpen: [6], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun21", name: "Marlins vs. San Francisco Giants (Sun)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the San Francisco Giants. Sunday Funday — check for kids deals. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "1:40 PM", seasonalNote: "Father's Day — special giveaway likely, check mlb.com/marlins", eventDate: "Sun Jun 21, 2026", daysOpen: [0], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun22", name: "Marlins vs. Texas Rangers (Mon)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Texas Rangers. Check for $1 Kids Night or special Mon deals. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "Check for $1 Kids Night special", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: null, eventDate: "Mon Jun 22, 2026", daysOpen: [1], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun23", name: "Marlins vs. Texas Rangers (Tue)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Texas Rangers. Check for weekday specials. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "From ~$9/child · $20+ adult (varies)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "6:40 PM", seasonalNote: null, eventDate: "Tue Jun 23, 2026", daysOpen: [2], url: "https://www.mlb.com/marlins/tickets" },
  { id: "marlins-jun24", name: "Marlins vs. Texas Rangers (Wed)", location: "loanDepot Park, 501 Marlins Way, Little Havana, Miami", description: "Miami Marlins home game at loanDepot Park vs. the Texas Rangers. 4-for-$44 Wednesday bundle often available — check mlb.com/marlins. Air-conditioned retractable roof stadium — great for South Florida afternoons.", setting: "outdoor", estimatedCost: "4-for-$44 Wednesday bundle — check site", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "⚾", source: "marlins", typicalHours: "12:10 PM", seasonalNote: null, eventDate: "Wed Jun 24, 2026", daysOpen: [3], url: "https://www.mlb.com/marlins/tickets" },

  { id: "kidstrong", name: "KidStrong Kendall", location: "13550 SW 120th St, Suite 504, Kendall, Miami", description: "Science-based kids training program with 45-minute weekly classes focused on physical, mental, and character development for kids walking through age 11. Classes run Mon–Thu afternoons (4:15–7:15pm) and Sat–Sun mornings (9:15am–1:15pm). Membership required — first class free trial available. Great for building confidence, athleticism, and social skills.", setting: "indoor", estimatedCost: "Membership required · Free trial class available", ageRange: "Walking – Age 11", ageMin: 0, ageMax: 11, emoji: "💪", source: "kidstrong", typicalHours: "Mon–Thu 4:15–7:15pm · Sat–Sun 9:15am–1:15pm · Fri closed", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,6], url: "https://www.kidstrong.com/locations/kendall" },
  { id: "f1-fanfest", name: "F1 Miami Grand Prix — Fan Fest", location: "Lummus Park, Miami Beach (oceanfront)", description: "The first-ever official F1 Miami Grand Prix Fan Fest transforms Lummus Park on Miami Beach into a free, five-day celebration. Expect F1 personalities, DJ sets, live stage moments, fan competitions, food and drinks, and immersive racing experiences. FREE to attend — reserve tickets at f1miamigp.com.", setting: "outdoor", estimatedCost: "FREE (register online)", ageRange: "All ages", ageMin: 0, ageMax: 17, emoji: "🏎️", source: "f1", typicalHours: "Wed Apr 29 & Thu Apr 30: 2–6pm · Fri May 1 – Sun May 3: Noon–6pm", seasonalNote: "Historic first-ever official Fan Fest! Perfect family intro to F1 race week without circuit ticket prices.", eventDate: "Apr 29 – May 3, 2026", daysOpen: [0,3,4,5,6], url: "https://f1miamigp.com/fan-fest/" },
  { id: "mchm", name: "Miami Children's Museum", location: "980 MacArthur Causeway, Watson Island, Miami", description: "Hands-on, imaginative exhibits across 56,000 sq ft designed for kids up to age 12 — including a new Playful Putters indoor mini golf exhibit. Features recurring programs: Mini Mondays (infants/toddlers), Sensory Friendly Saturdays, Fit Fridays, and Baby STEAM. Florida residents get $18 admission; Bank of America cardholders get one free ticket the first weekend of each month.", setting: "indoor", estimatedCost: "$26 general · $18 FL residents · Members free", ageRange: "Ages 0–12", ageMin: 0, ageMax: 12, emoji: "🧒", source: "mchm", typicalHours: "Daily 10am–6pm", seasonalNote: null, eventDate: null, daysOpen: [0,1,2,3,4,5,6], url: "https://www.miamichildrensmuseum.org/" },
];

// Live-searched sources: each has a label, search prompt template, and source key
const LIVE_SOURCES = [
  {
    key: "library",
    label: "📚 Miami-Dade Library Events",
    prompt: (dateCtx) =>
      `Search site:mdpls.org for upcoming children\'s events at Miami-Dade Public Library branches. ${dateCtx} Use queries like: site:mdpls.org children storytime April 2026, site:mdpls.org GeekFest kids, site:mdpls.org "Drop-in Game Time". Return only specific named events with real dates and branch names — e.g. "READy Set Go Storytime — Kendale Lakes Branch, Apr 16 11:30am". Skip adult-only events and generic page descriptions. Return up to 4 results as a JSON array only:\n[{"name":string,"location":"[Branch name]","description":string,"setting":"indoor","estimatedCost":"Free","ageRange":string,"emoji":"📚","typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://mdpls.org/events"}]`,
  },
  {
    key: "vizcaya",
    label: "🏛️ Vizcaya Events",
    prompt: (dateCtx) =>
      `Search vizcaya.org/calendar for current upcoming family programs, events, and special activities at Vizcaya Museum and Gardens. ${dateCtx} Include free family programs, Sunday Farmers Market, Vizcaya Late evenings, and any kids/family events. Return up to 3 relevant events as a JSON array only:\n[{"name":string,"location":"Vizcaya Museum & Gardens, 3251 S Miami Ave, Miami","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://vizcaya.org/calendar/"}]`,
  },
  {
    key: "cgmuseum",
    label: "🏗️ CG Museum Events",
    prompt: (dateCtx) =>
      `Search coralgablesmuseum.org/events for current upcoming events and programs at the Coral Gables Museum. ${dateCtx} Prioritize family-friendly events like Family Day on Aragon (free, 3rd Saturday each month), kids workshops, bike tours, and walking tours. Return up to 3 relevant events as a JSON array only:\n[{"name":string,"location":"Coral Gables Museum, 285 Aragon Ave, Coral Gables","description":string,"setting":"indoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://coralgablesmuseum.org/events/"}]`,
  },
  {
    key: "skatebird",
    label: "🛹 SkateBird Miami Events",
    prompt: (dateCtx) =>
      `Search for upcoming events, skate competitions, camps, or community events at SkateBird Miami (533 NE 83rd St, skatebirdmiami.com). ${dateCtx} SkateBird is a 32,000 sq ft skatepark in Miami's Upper Eastside with a pump track, DJ school, food, and regular events. Return up to 3 upcoming events as a JSON array only:\n[{"name":string,"location":"533 NE 83rd St, Miami (Upper Eastside)","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":"🛹","typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.skatebirdmiami.com/events/month/"}]`,
  },
  {
    key: "tutifruti",
    label: "🛹 Tutifruti Events",
    prompt: (dateCtx) =>
      `Search for upcoming events and workshops by Tutifruti (tutifruti-fl.org or instagram @tutifruti.fl) in Miami-Dade. ${dateCtx} Tutifruti is a South Florida nonprofit running skateboarding, yoga, art and mental health workshops for youth and communities. Look for any upcoming public workshops, skate sessions, or community events. Return up to 3 relevant events as a JSON array only:\n[{"name":string,"location":string,"description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.tutifruti-fl.org"}]`,
  },
  {
    key: "goldcoastrailroad",
    label: "🚂 Gold Coast Railroad Events",
    prompt: (dateCtx) =>
      `Search goldcoastrailroadmuseum.org/upcoming-events for current upcoming events and special programs at Gold Coast Railroad Museum in Miami (12450 SW 152nd St). ${dateCtx} Include themed train days, special ride events, Thomas events, and family programs. Return up to 3 relevant events as a JSON array only:\n[{"name":string,"location":"Gold Coast Railroad Museum, 12450 SW 152nd St, Miami","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.goldcoastrailroadmuseum.org/upcoming-events"}]`,
  },
  {
    key: "speedway",
    label: "🏎️ Homestead Speedway Events",
    prompt: (dateCtx) =>
      `Search homesteadmiamispeedway.com/calendar for upcoming events at Homestead-Miami Speedway. ${dateCtx} Include NASCAR races, Fast Lane Friday drag racing nights, NASCAR Racing Experience dates, and any family-friendly events. Return up to 3 relevant upcoming events as a JSON array only:\n[{"name":string,"location":"Homestead-Miami Speedway, 1 Speedway Blvd, Homestead, FL 33035","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.homesteadmiamispeedway.com/calendar/"}]`,
  },
  {
    key: "pamm",
    label: "🎨 PAMM Family Events",
    prompt: (dateCtx) =>
      `Search pamm.org/en/events or "PAMM family community events" for upcoming family-friendly events at Pérez Art Museum Miami. ${dateCtx} Focus on: Free Second Saturdays (every 2nd Saturday of the month, free all day + art-making 11am–3pm), Storytime events, Kids programs, and Family & Community events. Return up to 3 relevant events as a JSON array only:\n[{"name":string,"location":"Pérez Art Museum Miami, 1103 Biscayne Blvd, Museum Park, Miami","description":string,"setting":"indoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":string|null}]`,
  },
  {
    key: "mbgarden",
    label: "🌺 MB Botanical Garden Events",
    prompt: (dateCtx) =>
      `Search mbgarden.org/calendaratg or "Miami Beach Botanical Garden events" for current upcoming public events, workshops, and programs at the Miami Beach Botanical Garden (2000 Convention Center Drive, Miami Beach). ${dateCtx} Return up to 3 relevant events as a JSON array only:\n[{"name":string,"location":"Miami Beach Botanical Garden, 2000 Convention Center Dr, Miami Beach","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.mbgarden.org/calendaratg"}]`,
  },
  {
    key: "coralgables",
    label: "🏛️ Coral Gables Events",
    prompt: (dateCtx) =>
      `Search coralgables.com/events-calendar for current upcoming family and community events in Coral Gables. ${dateCtx} Focus on Recreation, Arts/Culture, Festivals, Green Initiatives, and Holiday events that are family-friendly. Skip City Meetings, business events, and adult-only events. Return up to 4 relevant events as a JSON array only:\n[{"name":string,"location":string,"description":string,"setting":"indoor"|"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":string|null}]`,
  },

  {
    key: "pinecrest",
    label: "🌿 Pinecrest Gardens",
    prompt: (dateCtx) =>
      `Search pinecrestgardens.org/Events-directory for current upcoming children's and family events. ${dateCtx} Return up to 3 relevant upcoming events as a JSON array only:\n[{"name":string,"location":string,"description":string,"setting":"indoor"|"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":string|null}]`,
  },
  {
    key: "frost",
    label: "🔭 Frost Science Events",
    prompt: (dateCtx) =>
      `Search frostscience.org/calendar-events for current upcoming events and programs for kids and families. ${dateCtx} Return up to 3 relevant upcoming events as a JSON array only:\n[{"name":string,"location":"Frost Science, 1101 Biscayne Blvd, Miami","description":string,"setting":"indoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":string|null}]`,
  },
  {
    key: "zoo",
    label: "🦒 Zoo Miami Events",
    prompt: (dateCtx) =>
      `Search zoomiami.org/upcoming-events for current upcoming events and special programs for families and children. ${dateCtx} Return up to 3 relevant upcoming events as a JSON array only:\n[{"name":string,"location":"Zoo Miami, 12400 SW 152nd St, Miami","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":string|null}]`,
  },
  {
    key: "fairchild",
    label: "🌸 Fairchild Events",
    prompt: (dateCtx) =>
      `Search fairchildgarden.org/events-at-fairchild for current upcoming family and children's events. ${dateCtx} Return up to 3 relevant upcoming events as a JSON array only:\n[{"name":string,"location":"Fairchild Tropical Botanic Garden, 10901 Old Cutler Rd, Coral Gables","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":string|null}]`,
  },

  {
    key: "um",
    label: "🎓 UM Canes Baseball",
    prompt: (dateCtx) =>
      `Search miamihurricanes.com/sports/baseball/schedule for upcoming Miami Hurricanes HOME baseball games at Alex Rodriguez Park at Mark Light Field in Coral Gables. ${dateCtx} Tickets start at $12. Note the Baseball Buddies youth program. Return up to 4 upcoming home games as a JSON array only:\n[{"name":string,"location":"Alex Rodriguez Park at Mark Light Field, University of Miami, Coral Gables","description":string,"setting":"outdoor","estimatedCost":"$12+ general","ageRange":"All ages","ageMin":0,"ageMax":17,"emoji":"⚾","typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://miamihurricanes.com/baseball-tickets/"}]`,
  },
  {
    key: "intermiami",
    label: "⚽ Inter Miami Home Games",
    prompt: (dateCtx) =>
      `Search intermiamicf.com/schedule/matches or intermiamicf.com/tickets/single for upcoming Inter Miami CF HOME games at Nu Stadium at Miami Freedom Park. ${dateCtx} Tickets from $54 official. Note this is the inaugural 2026 season at Nu Stadium. Return up to 3 upcoming home games as a JSON array only:\n[{"name":string,"location":"Nu Stadium, Miami Freedom Park, NW 37th Ave, Miami","description":string,"setting":"outdoor","estimatedCost":"From $54 (official)","ageRange":"All ages","ageMin":0,"ageMax":17,"emoji":"⚽","typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.intermiamicf.com/tickets/single"}]`,
  },
  {
    key: "berryfarm",
    label: "🌻 Berry Farm Events",
    prompt: (dateCtx) =>
      `Search visittheberryfarm.com for current upcoming events, festivals, and activities for families and kids. ${dateCtx} The farm is in the Redland area of Miami at 13720 SW 216th St. Note it is closed Mondays and closed Apr 18 for a private event. Return up to 3 relevant upcoming events as a JSON array only:\n[{"name":string,"location":"The Berry Farm, 13720 SW 216th St, Miami (Redland)","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.visittheberryfarm.com/"}]`,
  },
  {
    key: "tinezfarms",
    label: "🐴 Tinez Farms Events",
    prompt: (dateCtx) =>
      `Search tinezfarms.com for current upcoming events, seasonal activities, and programs for families and kids. ${dateCtx} The farm is at 16405 SW 177th Ave, Miami. Closed Mondays. Return up to 3 relevant upcoming events as a JSON array only:\n[{"name":string,"location":"Tinez Farms, 16405 SW 177th Ave, Miami (Redland)","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.tinezfarms.com/"}]`,
  },
  {
    key: "jungleisland",
    label: "🦜 Jungle Island Events",
    prompt: (dateCtx) =>
      `Search jungleisland.com/calendar-of-events for current upcoming events, shows, and special programs at Jungle Island Miami (1111 Parrot Jungle Trail). ${dateCtx} Include ongoing shows like Guardians of the Jungle and any seasonal events. Return up to 3 relevant events as a JSON array only:\n[{"name":string,"location":"Jungle Island, 1111 Parrot Jungle Trail, Miami","description":string,"setting":"outdoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.jungleisland.com/calendar-of-events/"}]`,
  },
  {
    key: "mchm",
    label: "🧒 Children's Museum Events",
    prompt: (dateCtx) =>
      `Search miamichildrensmuseum.org/upcoming-events for current upcoming events and programs at Miami Children's Museum (980 MacArthur Causeway). ${dateCtx} Include recurring programs like Mini Mondays (every Monday, infants/toddlers), Sensory Friendly Saturdays, Fit Fridays, Baby STEAM, and any special exhibits or events. Return up to 4 relevant events as a JSON array only:
[{"name":string,"location":"Miami Children's Museum, 980 MacArthur Causeway, Miami","description":string,"setting":"indoor","estimatedCost":string,"ageRange":string,"emoji":string,"typicalHours":string,"eventDate":string|null,"seasonalNote":string|null,"url":"https://www.miamichildrensmuseum.org/upcoming-events"}]`,
  },
];

function parseCost(str) {
  if (!str) return 0;
  const s = str.toLowerCase();
  if (s.includes("free") || s === "0") return 0;
  const nums = s.match(/\d+(\.\d+)?/g);
  if (!nums) return 999;
  return Math.min(...nums.map(Number));
}

// Parse an eventDate string like "Sat Apr 11, 2026" or "Apr 29 – May 3, 2026"
// and check if selectedDate (YYYY-MM-DD) falls within it
function eventDateMatches(eventDate, selectedDate) {
  if (!eventDate || !selectedDate) return true;
  const sel = new Date(selectedDate + "T12:00:00");

  // "Month D1 – D2, Year" (same month, e.g. "Nov 6 – 8, 2026" or "Apr 13 – 16, 2026")
  const sameMonthRange = eventDate.match(/([A-Za-z]+)\s+(\d+)\s*[–\-]\s*(\d+),?\s*(\d{4})/);
  if (sameMonthRange) {
    const [, month, d1, d2, year] = sameMonthRange;
    const start = new Date(month + " " + d1 + " " + year + " 12:00:00");
    const end   = new Date(month + " " + d2 + " " + year + " 12:00:00");
    return sel >= start && sel <= end;
  }

  // "Month D1 – Month D2, Year" (cross-month, e.g. "Apr 29 – May 3, 2026")
  const crossMonthRange = eventDate.match(/([A-Za-z]+ \d+)\s*[–\-]\s*([A-Za-z]+ \d+),?\s*(\d{4})/);
  if (crossMonthRange) {
    const year = crossMonthRange[3];
    const start = new Date(crossMonthRange[1] + " " + year + " 12:00:00");
    const end   = new Date(crossMonthRange[2] + " " + year + " 12:00:00");
    return sel >= start && sel <= end;
  }

  // Single date like "Fri Apr 17, 2026"
  const singleMatch = eventDate.match(/([A-Za-z]+ \d+,?\s*\d{4})/);
  if (singleMatch) {
    const d = new Date(singleMatch[1] + " 12:00:00");
    return d.toDateString() === sel.toDateString();
  }

  return true; // vague/unparseable — always show
}

function filterStatic(venues, selectedDate, dow) {
  return venues.filter(a => {
    // If a venue has a specific eventDate, only show it if the selected date matches
    if (a.eventDate && selectedDate) {
      return eventDateMatches(a.eventDate, selectedDate);
    }
    // For regular venues (no eventDate), check daysOpen against day of week
    if (selectedDate && a.daysOpen) {
      return a.daysOpen.includes(dow);
    }
    // No date selected — show everything
    return true;
  });
}

function todayStr() { return new Date().toISOString().slice(0, 10); }

function getDateInfo(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T12:00:00");
  const dow = d.getDay(), month = d.getMonth() + 1;
  const isWeekend = dow === 0 || dow === 6;
  let season = "spring";
  if (month >= 6 && month <= 8) season = "summer";
  else if (month >= 9 && month <= 11) season = "fall";
  else if (month === 12 || month <= 2) season = "winter";
  return { dow, dayName: DAYS[dow], month, isWeekend, season, dateStr };
}

async function callClaude(prompt) {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
  const match = text.replace(/```json|```/g, "").match(/\[[\s\S]*\]/);
  if (!match) return [];
  try { return JSON.parse(match[0]); } catch { return []; }
}

async function fetchGeneralAI(dateInfo) {
  const dateText = dateInfo
    ? "Specific date: " + dateInfo.dateStr + " (" + dateInfo.dayName + ", " + dateInfo.season + " in Miami)."
    : "No specific date.";
  const prompt = "You are a Miami family activity expert. Suggest 4 REAL specific kid-friendly activities in Miami for families. " + dateText + " Do NOT include Zoo Miami, Frost Science, Fairchild, Bird Bowl, Puttshack, Superblue, Pinecrest Gardens, Miami Marlins, UM Baseball, Inter Miami CF, The Berry Farm, or Tinez Farms — those are covered separately. Return JSON array only, include pricing and age info on the cards:\n[{\"name\":string,\"location\":string,\"description\":string,\"setting\":\"indoor\"|\"outdoor\",\"estimatedCost\":string,\"ageRange\":string,\"emoji\":string,\"typicalHours\":string,\"eventDate\":null,\"seasonalNote\":string|null,\"url\":string|null}]";

  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content.map(b => b.text || "").join("");
  const match = text.replace(/```json|```/g, "").match(/\[[\s\S]*\]/);
  if (!match) return [];
  try { return JSON.parse(match[0]).map(r => ({ ...r, source: "ai" })); } catch { return []; }
}

// ─── Main App ────────────────────────────────────────────────────────────────

const BLANK_FORM = { name: "", location: "", description: "", setting: "indoor", estimatedCost: "", ageRange: "", emoji: "🎉", typicalHours: "", url: "" };

export default function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [searched, setSearched] = useState(false);

  // Results state
  const [staticResults, setStaticResults] = useState([]);
  const [streamResults, setStreamResults] = useState({});
  const [aiResults, setAiResults] = useState([]);
  const [customBank, setCustomBank] = useState([]);
  const [showManage, setShowManage] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);

  const dateInfo = useMemo(() => getDateInfo(selectedDate), [selectedDate]);
  const allStatic = useMemo(() => [...STATIC_VENUES, ...customBank], [customBank]);

  async function handleSearch() {
    if (!selectedDate) return;
    setSearched(true);
    setAiResults([]);

    // Static venues — filter by date/day instantly
    setStaticResults(filterStatic(allStatic, selectedDate, dateInfo?.dow ?? -1));

    // Init stream state
    const initStream = {};
    LIVE_SOURCES.forEach(s => { initStream[s.key] = { status: "running", items: [] }; });
    setStreamResults({ ...initStream });

    // Build context string passed to every live search
    const dateCtx = dateInfo
      ? "The visit date is " + dateInfo.dateStr + " (" + dateInfo.dayName + ", " + dateInfo.season + " in Miami). " + (dateInfo.isWeekend ? "It is a weekend." : "It is a weekday.") + " Only return events/activities that are actually open or scheduled on this exact date."
      : "No specific date selected — return currently upcoming events.";

    // Fire all live source searches in parallel
    const livePromises = LIVE_SOURCES.map(async (src) => {
      try {
        const items = await callClaude(src.prompt(dateCtx));
        const tagged = items.map(r => ({ ...r, source: src.key }));
        setStreamResults(prev => ({
          ...prev,
          [src.key]: { status: tagged.length > 0 ? "done" : "empty", items: tagged },
        }));
      } catch {
        setStreamResults(prev => ({
          ...prev,
          [src.key]: { status: "empty", items: [] },
        }));
      }
    });

    // General AI suggestions in parallel
    const aiPromise = fetchGeneralAI(dateInfo)
      .then(r => setAiResults(r))
      .catch(() => setAiResults([]));

    await Promise.allSettled([...livePromises, aiPromise]);
  }

  function handleSave() {
    if (!form.name.trim()) return;
    setCustomBank(prev => [...prev, {
      ...form, id: "custom-" + Date.now(), source: "static",
      daysOpen: [0,1,2,3,4,5,6], seasonalNote: null, eventDate: null,
    }]);
    setForm(BLANK_FORM); setShowAddForm(false);
  }
  function deleteCustom(id) { setCustomBank(prev => prev.filter(a => a.id !== id)); }

  const isLoading = searched && Object.values(streamResults).some(s => s.status === "running");
  const allLiveItems = Object.values(streamResults).flatMap(s => s.items);
  const totalResults = staticResults.length + allLiveItems.length + aiResults.length;
  const summaryLabel = dateInfo
    ? dateInfo.dayName + " " + dateInfo.dateStr + " · " + dateInfo.season.charAt(0).toUpperCase() + dateInfo.season.slice(1) + " in Miami"
    : "Upcoming events";

  return (
    <>
      <style>{GOOGLE_FONTS + styles}</style>
      <div className="app">
        <div className="hero">
          <div className="hero-palm2">🌴</div>
          <div className="hero-eyebrow">YOUR MIAMI FAMILY GUIDE</div>
          <h1>MIAMI<br /><em>TYKES</em></h1>
          <p>Live searches across Miami's top family venues — every time you search.</p>
        </div>

        {/* Filters */}
        <div className="filters-wrap">
          <div className="filters-inner">
            <div className="filter-group">
              <label style={{fontSize:"13px",fontWeight:700,letterSpacing:"0.08em",color:"#00e6e6", textShadow:"0 0 8px rgba(0,230,230,0.5)"}}>📅 Pick a date to find activities</label>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </div>
            {dateInfo && (
              <div className="date-badge" style={{marginTop:"10px"}}>
                📅 {dateInfo.dayName} · {dateInfo.season.charAt(0).toUpperCase()+dateInfo.season.slice(1)} in Miami
                {dateInfo.isWeekend ? " · Weekend" : " · Weekday"}
              </div>
            )}
            <button className="search-btn" onClick={handleSearch} disabled={isLoading || !selectedDate}>
              {isLoading ? "Searching all venues…" : !selectedDate ? "Pick a date first ↑" : "Find Activities →"}
            </button>
          </div>
        </div>

        {/* Manage custom entries */}
        <div className="manage-btn-wrap">
          <button className="manage-btn" onClick={() => setShowManage(p => !p)}>
            <span>⚙️</span><span>{showManage ? "Close" : "Manage custom activities"}</span>
            {customBank.length > 0 && <span className="badge">{customBank.length}</span>}
          </button>
        </div>
        {showManage && (
          <div className="manage-panel">
            <div className="manage-inner">
              <div className="manage-title">Custom Activities</div>
              <div className="manage-sub">These appear in results alongside live searches when they match your filters.</div>
              {customBank.length === 0 && <p style={{color:"#bbb",fontSize:"13px",marginBottom:"12px"}}>No custom activities yet.</p>}
              {customBank.map(a => (
                <div key={a.id} className="manage-item">
                  <span className="manage-emoji">{a.emoji}</span>
                  <span className="manage-name">{a.name}</span>
                  <button className="manage-del" onClick={() => deleteCustom(a.id)}>✕</button>
                </div>
              ))}
              {!showAddForm && (
                <button className="manage-btn" style={{marginTop:"10px"}} onClick={() => setShowAddForm(true)}>
                  <span>+</span><span>Add activity</span>
                </button>
              )}
              {showAddForm && (
                <>
                  <div style={{borderTop:"1px solid #ececec",margin:"12px 0"}} />
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"16px"}}>Add Activity</div>
                  <div className="add-grid">
                    <div className="add-field full"><label>Name</label><input value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Miami Children's Museum" /></div>
                    <div className="add-field full"><label>Location</label><input value={form.location} onChange={e => setForm(f=>({...f,location:e.target.value}))} /></div>
                    <div className="add-field full"><label>Description</label><textarea value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} /></div>
                    <div className="add-field"><label>Setting</label><select value={form.setting} onChange={e => setForm(f=>({...f,setting:e.target.value}))}><option value="indoor">Indoor</option><option value="outdoor">Outdoor</option></select></div>
                    <div className="add-field"><label>Emoji</label><input value={form.emoji} onChange={e => setForm(f=>({...f,emoji:e.target.value}))} maxLength={4} /></div>
                    <div className="add-field full"><label>Hours</label><input value={form.typicalHours} onChange={e => setForm(f=>({...f,typicalHours:e.target.value}))} placeholder="e.g. Daily 10am–5pm" /></div>
                    <div className="add-field full"><label>Website</label><input value={form.url} onChange={e => setForm(f=>({...f,url:e.target.value}))} placeholder="https://..." /></div>
                  </div>
                  <div className="add-actions">
                    <button className="btn-save" onClick={handleSave}>Save</button>
                    <button className="btn-cancel" onClick={() => { setShowAddForm(false); setForm(BLANK_FORM); }}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Single live search status card */}
        {searched && isLoading && (
          <div className="loading-streams">
            <div className="stream-item">
              <div className="stream-dot running" />
              <span style={{flex:1,color:"#666"}}>Searching live event sources…</span>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="results">
          {searched && totalResults > 0 && (
            <div className="results-header">
              <h2>Activities for you</h2>
              <span>{summaryLabel}</span>
            </div>
          )}

          {searched && totalResults === 0 && !isLoading && (
            <div className="empty">
              <div className="empty-icon">🌴</div>
              <p>No matches yet — try broadening your filters.</p>
            </div>
          )}

          {(() => {
            const datedStatic = staticResults.filter(a => a.eventDate);
            const alwaysStatic = staticResults.filter(a => !a.eventDate);
            return (
              <>
                {datedStatic.length > 0 && (
                  <>
                    <div className="section-label">🎉 Special events this day</div>
                    {datedStatic.map((a, i) => <ActivityCard key={a.id} activity={a} delay={i * 50} />)}
                  </>
                )}

                {allLiveItems.length > 0 && (
                  <>
                    <div className="section-label">🔍 Live results</div>
                    {allLiveItems.map((a, i) => <ActivityCard key={i} activity={a} delay={i * 50} />)}
                  </>
                )}

                {alwaysStatic.length > 0 && (
                  <>
                    <div className="section-label">📍 Always available this day</div>
                    {alwaysStatic.map((a, i) => <ActivityCard key={a.id} activity={a} delay={i * 50} />)}
                  </>
                )}

                {aiResults.length > 0 && (
                  <>
                    <div className="section-label">✨ More ideas</div>
                    {aiResults.map((a, i) => <ActivityCard key={i} activity={a} delay={i * 50} />)}
                  </>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
}

function ActivityCard({ activity, delay = 0 }) {
  const meta = SOURCE_META[activity.source] || { col: "col-gray", label: activity.source };
  const isIndoor = activity.setting === "indoor";
  const isFree = activity.estimatedCost?.toLowerCase().includes("free");

  return (
    <div className={"card " + meta.col} style={{ animationDelay: delay + "ms" }}>
      <div className="card-top">
        <div className="card-icon">{activity.emoji || "🎉"}</div>
        <div style={{flex:1}}>
          <div className="card-name">{activity.name}</div>
          <div className="card-location">📍 {activity.location}</div>
        </div>
      </div>
      {activity.eventDate && <div className="card-event-date">📅 {activity.eventDate}</div>}
      {activity.typicalHours && (
        <div className="card-hours">
          <div className="hours-dot" />
          <span>{activity.typicalHours}</span>
        </div>
      )}
      {activity.seasonalNote && <div className="card-seasonal">🌟 <span>{activity.seasonalNote}</span></div>}
      {activity.url && <a className="card-link" href={activity.url} target="_blank" rel="noopener noreferrer">🔗 Visit website</a>}
      <div className="card-desc">{activity.description}</div>
      <div className="card-tags">
        <span className={"tag " + (isIndoor ? "tag-indoor" : "tag-outdoor")}>{isIndoor ? "🏠 Indoor" : "☀️ Outdoor"}</span>
        {activity.ageRange && <span className="tag tag-age">👦 {activity.ageRange}</span>}
        {activity.estimatedCost && <span className={"tag " + (isFree ? "tag-cost-free" : "tag-cost-low")}>💰 {activity.estimatedCost}</span>}
        <span className="tag tag-source">{meta.label}</span>
      </div>
    </div>
  );
}
