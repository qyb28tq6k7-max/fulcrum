import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-indigo-400">F</span>ulcrum
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/waitlist"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Join Waitlist
          </Link>
          <Link
            href="/app"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
          Built for self-directed investors
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
          Your core holds.
          <br />
          <span className="text-indigo-400">Your satellite sleeve wins.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Fulcrum screens for high-conviction satellite positions that complement
          your ETF core — sized right, themed right, with pre-set exits built in.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/app"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
          >
            Build My Sleeve →
          </Link>
          <Link
            href="/waitlist"
            className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-base"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-center text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Set your core",
              desc: "Define your ETF base allocation — VTI, SCHG, VXUS, or whatever you hold. Fulcrum keeps it as your anchor.",
            },
            {
              step: "02",
              title: "Pick a theme",
              desc: "AI infrastructure, clean energy, defense tech — choose a conviction theme and Fulcrum screens pure-play stocks.",
            },
            {
              step: "03",
              title: "Get your sleeve",
              desc: "See position sizes (1–3% each), upside scores, and pre-set exit levels for each satellite pick.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <div className="text-3xl font-black text-indigo-600 mb-4">
                {item.step}
              </div>
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio example */}
      <section className="max-w-3xl mx-auto px-8 py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-base">Example Allocation</h3>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
              10% satellite sleeve
            </span>
          </div>
          <div className="space-y-3">
            {[
              { label: "VTI — Total Market", pct: 50, color: "bg-blue-600" },
              { label: "SCHG — US Growth", pct: 20, color: "bg-violet-600" },
              { label: "VXUS — International", pct: 15, color: "bg-teal-600" },
              { label: "AVUV — Small Cap Value", pct: 5, color: "bg-amber-600" },
              { label: "Satellite Sleeve", pct: 10, color: "bg-indigo-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-32 text-xs text-gray-400 shrink-0 truncate">
                  {item.label}
                </div>
                <div className="flex-1 bg-gray-800 rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full`}
                    style={{ width: `${item.pct}%` }}
                  ></div>
                </div>
                <div className="text-xs font-semibold w-8 text-right">
                  {item.pct}%
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-5">
            Fulcrum screens and sizes the satellite sleeve — you keep full control of the core.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to find your edge?</h2>
        <p className="text-gray-400 mb-8 text-base">
          Free to start. No brokerage connection required.
        </p>
        <Link
          href="/app"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-10 py-4 rounded-xl transition-colors text-base inline-block"
        >
          Build My Sleeve →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-8 py-6 text-center text-xs text-gray-600">
        Fulcrum is not a registered investment advisor. Nothing here is financial advice.
        &nbsp;·&nbsp; Not affiliated with any brokerage.
      </footer>
    </main>
  );
}
