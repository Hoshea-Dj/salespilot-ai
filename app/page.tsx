
"use client";

import { useState } from "react";
import {
  LayoutDashboard, Users, BriefcaseBusiness, FileText,
  CalendarClock, Bot, Settings, Search, Bell,
  Plus, TrendingUp, Menu, X, ArrowUpRight
} from "lucide-react";

const initialLeads = [
  { name: "Clean Office", company: "Nettoyage professionnel", status: "Nouveau", value: "2 500 €" },
  { name: "Azuréo Services", company: "Entretien de bureaux", status: "En négociation", value: "4 800 €" },
  { name: "Carillon Pro", company: "Nettoyage industriel", status: "Devis envoyé", value: "3 200 €" },
  { name: "YSY Clean", company: "Services aux entreprises", status: "Nouveau", value: "1 900 €" }
];

export default function Home() {
  const [language, setLanguage] = useState("FR");
  const [active, setActive] = useState("dashboard");
  const [leads, setLeads] = useState(initialLeads);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const en = language === "EN";

  const nav = [
    { id: "dashboard", label: en ? "Dashboard" : "Tableau de bord", icon: LayoutDashboard },
    { id: "leads", label: en ? "Prospects" : "Prospects", icon: Users },
    { id: "clients", label: en ? "Customers" : "Clients", icon: BriefcaseBusiness },
    { id: "quotes", label: en ? "Quotes" : "Devis", icon: FileText },
    { id: "reminders", label: en ? "Follow-ups" : "Relances", icon: CalendarClock },
    { id: "assistant", label: en ? "AI Assistant" : "Assistant IA", icon: Bot }
  ];

  function addLead(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLeads([...leads, {
      name,
      company: company || "Entreprise à renseigner",
      status: "Nouveau",
      value: "À définir"
    }]);
    setName("");
    setCompany("");
    setShowForm(false);
    setActive("leads");
  }

  return (
    <main className="min-h-screen bg-[#f5f6fc] text-slate-800 flex">
      <aside className={`${mobileMenu ? "flex" : "hidden"} lg:flex fixed lg:static z-30 inset-y-0 left-0 w-64 bg-[#11152d] text-white flex-col p-5`}>
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="text-2xl font-black tracking-tight">SalesPilot<span className="text-violet-400"> AI</span></div>
            <div className="text-xs text-slate-400 mt-1">SMART SALES MANAGEMENT</div>
          </div>
          <button className="lg:hidden" onClick={() => setMobileMenu(false)}><X /></button>
        </div>

        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">WORKSPACE</p>
        <nav className="space-y-2">
          {nav.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => { setActive(item.id); setMobileMenu(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${active === item.id ? "bg-violet-600 text-white shadow-lg" : "text-slate-300 hover:bg-white/10"}`}>
                <Icon size={19} /> {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="text-violet-300 mb-2"><Bot size={23} /></div>
          <p className="font-semibold text-sm">SalesPilot AI</p>
          <p className="text-xs text-slate-400 mt-1">Votre assistant commercial intelligent.</p>
          <div className="mt-4 text-xs text-violet-300">Version de démonstration</div>
        </div>
      </aside>

      {mobileMenu && <button aria-label="Fermer le menu" className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setMobileMenu(false)} />}

      <section className="flex-1 min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 px-5 lg:px-9 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileMenu(true)}><Menu /></button>
            <div>
              <p className="text-sm text-slate-400">SalesPilot AI / Workspace</p>
              <h1 className="font-bold text-lg">{nav.find(n => n.id === active)?.label || "SalesPilot AI"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setLanguage(en ? "FR" : "EN")} className="border rounded-lg px-3 py-2 text-xs font-bold">{language}</button>
            <button className="p-2 rounded-full bg-slate-100"><Bell size={19} /></button>
            <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold">SP</div>
          </div>
        </header>

        <div className="p-5 lg:p-9 max-w-7xl mx-auto">
          {active === "dashboard" && <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold">{en ? "Welcome to SalesPilot AI" : "Bienvenue sur SalesPilot AI"}</h2>
                <p className="text-slate-500 text-sm mt-1">{en ? "Manage your sales activity from one place." : "Pilotez toute votre activité commerciale au même endroit."}</p>
              </div>
              <button onClick={() => setShowForm(true)} className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"><Plus size={18} /> {en ? "New prospect" : "Nouveau prospect"}</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {[
                { label: en ? "Total prospects" : "Total prospects", value: leads.length, icon: Users, color: "text-violet-600", trend: "+12%" },
                { label: en ? "Quotes sent" : "Devis envoyés", value: "12", icon: FileText, color: "text-blue-600", trend: "+8%" },
                { label: en ? "Follow-ups" : "Relances à faire", value: "8", icon: CalendarClock, color: "text-orange-500", trend: "À traiter" },
                { label: en ? "Revenue generated" : "Chiffre d'affaires", value: "12 400 €", icon: TrendingUp, color: "text-emerald-600", trend: "+18%" }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-center"><span className="text-sm text-slate-500">{stat.label}</span><Icon className={stat.color} size={21} /></div>
                  <div className="text-2xl font-bold mt-4">{stat.value}</div>
                  <div className="text-xs text-emerald-600 mt-2">{stat.trend}</div>
                </div>;
              })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <div><h3 className="font-bold">{en ? "Recent prospects" : "Prospects récents"}</h3><p className="text-xs text-slate-400 mt-1">Suivi commercial</p></div>
                  <button onClick={() => setActive("leads")} className="text-violet-600 text-sm font-semibold">Voir tout <ArrowUpRight size={15} className="inline" /></button>
                </div>
                <div className="space-y-4">
                  {leads.slice(0, 5).map((lead, i) => <div key={i} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0">
                    <div className="min-w-0"><p className="font-semibold text-sm">{lead.name}</p><p className="text-xs text-slate-400 mt-1">{lead.company}</p></div>
                    <div className="text-right shrink-0"><p className="font-semibold text-sm">{lead.value}</p><span className="text-xs text-violet-600">{lead.status}</span></div>
                  </div>)}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#171b3a] to-violet-800 text-white rounded-2xl p-6 shadow-sm">
                <Bot size={30} className="text-violet-300 mb-5" />
                <h3 className="text-xl font-bold">Assistant IA</h3>
                <p className="text-sm text-violet-100 mt-3 leading-6">Préparez vos messages commerciaux, vos propositions et vos relances avec votre futur assistant intelligent.</p>
                <button onClick={() => setActive("assistant")} className="mt-6 bg-white text-violet-800 rounded-xl px-4 py-3 text-sm font-bold">Découvrir l'assistant</button>
              </div>
            </div>
          </>}

          {active === "leads" && <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <div className="flex justify-between items-center mb-6"><h2 className="font-bold text-xl">Gestion des prospects</h2><button onClick={() => setShowForm(true)} className="bg-violet-600 text-white rounded-xl px-4 py-2 text-sm"><Plus size={16} className="inline" /> Ajouter</button></div>
            {leads.map((lead, i) => <div key={i} className="flex justify-between gap-3 py-4 border-b last:border-0"><div><p className="font-semibold">{lead.name}</p><p className="text-sm text-slate-400">{lead.company}</p></div><div className="text-right"><p className="font-semibold text-sm">{lead.value}</p><p className="text-xs text-violet-600">{lead.status}</p></div></div>)}
          </div>}

          {active !== "dashboard" && active !== "leads" && <div className="bg-white rounded-2xl p-10 border text-center">
            <div className="mx-auto bg-violet-100 text-violet-700 rounded-2xl w-14 h-14 flex items-center justify-center"><Bot size={28}/></div>
            <h2 className="text-xl font-bold mt-5">{nav.find(n => n.id === active)?.label}</h2>
            <p className="text-slate-500 text-sm mt-2">Ce module sera développé dans la prochaine étape de SalesPilot AI.</p>
          </div>}
        </div>
      </section>

      {showForm && <div className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4">
        <form onSubmit={addLead} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
          <div className="flex justify-between mb-5"><h2 className="font-bold text-xl">Nouveau prospect</h2><button type="button" onClick={() => setShowForm(false)}><X /></button></div>
          <label className="block text-sm font-medium mb-2">Nom du prospect</label>
          <input required value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-xl p-3 mb-4 outline-violet-500" placeholder="Ex : Clean Office" />
          <label className="block text-sm font-medium mb-2">Activité / entreprise</label>
          <input value={company} onChange={e => setCompany(e.target.value)} className="w-full border rounded-xl p-3 mb-6 outline-violet-500" placeholder="Ex : Nettoyage de bureaux" />
          <button className="w-full bg-violet-600 text-white rounded-xl p-3 font-semibold">Enregistrer le prospect</button>
        </form>
      </div>}
    </main>
  );
}
