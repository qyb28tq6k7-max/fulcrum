"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const THEMES = [
  {
    id: "ai",
    label: "AI Infrastructure",
    description: "Chips, data centers, and model providers powering the AI wave",
    stocks: [
      { ticker: "NVDA", name: "NVIDIA", upside: 38, thesis: "GPU monopoly for AI training and inference", exit: 185 },
      { ticker: "PLTR", name: "Palantir", upside: 27, thesis: "Government + enterprise AI data platform", exit: 42 },
      { ticker: "AMD", name: "AMD", upside: 44, thesis: "NVDA alternative gaining AI accelerator share", exit: 165 },
    ],
  },
  {
    id: "energy",
    label: "Clean Energy",
    description: "Solar, wind, hydrogen, and grid infrastructure plays",
    stocks: [
      { ticker: "PLUG", name: "Plug Power", upside: 61, thesis: "Green hydrogen fuel cells for industrial use", exit: 4.20 },
      { ticker: "ENPH", name: "Enphase Energy", upside: 52, thesis: "Residential solar microinverter leader", exit: 95 },
      { ticker: "NEE", name: "NextEra Energy", upside: 29, thesis: "Largest US renewable energy operator", exit: 85 },
    ],
  },
  {
    id: "defense",
    label: "Defense Tech",
    description: "Next-gen defense, drones, and cybersecurity",
    stocks: [
      { ticker: "PLTR", name: "Palantir", upside: 27, thesis: "AI-driven defense intelligence contracts", exit: 42 },
      { ticker: "AXON", name: "Axon Enterprise", upside: 33, thesis: "Law enforcement tech and AI evidence cloud", exit: 320 },
      { ticker: "CACI", name: "CACI International", upside: 31, thesis: "Defense IT and intelligence services", exit: 520 },
    ],
  },
  {
    id: "mining",
    label: "Critical Minerals",
    description: "Copper, lithium, and rare earths for the energy transition",
    stocks: [
      { ticker: "Core", name: "Core Mining", upside: 55, thesis: "Diversified critical mineral exposure", exit: 12 },
      { ticker: "MP", name: "MP Materials", upside: 48, thesis: "Only US rare earth miner and processor", exit: 22 },
      { ticker: "FCX", name: "Freeport-McMoRan", upside: 35, thesis: "World's largest copper producer", exit: 52 },
    ],
  },
];

const CORE_ETFS = [
  { ticker: "VTI", name: "Total Market", color: "bg-blue-600", default: 50 },
  { ticker: "SCHG", name: "US Growth", color: "bg-violet-600", default: 20 },
  { ticker: "VXUS", name: "International", color: "bg-teal-600", default: 15 },
  { ticker: "AVUV", name: "Small Cap Value", color: "bg-amber-600", default: 5 },
];

function UpsideBadge({ upside }: { upside: number }) {
  const color =
    upside >= 50
      ? "bg-green-950 text-green-400 border-green-800"
      : upside >= 30
      ? "bg-indigo-950 text-indigo-300 border-indigo-800"
      : "bg-gray-800 text-gray-300 border-gray-700";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${color}`}>
      +{upside}% upside
    </span>
  );
}

export default function AppPage() {
  const [sleeveSize, setSleeveSize] = useState(10);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [coreAlloc, setCoreAlloc] = useState(
    Object.fromEntries(CORE_ETFS.map((e) => [e.ticker, e.default]))
  );

  const totalCore = Object.values(coreAlloc).reduce((a, b) => a + b, 0);
  const totalWithSleeve = totalCore + sleeveSize;
  const isValid = totalWithSleeve === 100;

  const positionSize = +(sleeveSize / selectedTheme.stocks.length).toFixed(1);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-indigo-400">F</span>ulcrum
        </Link>
        <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
          Beta
        </Badge>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-1">Build Your Sleeve</h1>
        <p className="text-gray-400 text-sm mb-8">
          Set your core, pick your theme, get sized positions.
        </p>

        <Tabs defaultValue="core" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="core">1 · Core Allocation</TabsTrigger>
            <TabsTrigger value="sleeve">2 · Sleeve Size</TabsTrigger>
            <TabsTrigger value="theme">3 · Theme</TabsTrigger>
            <TabsTrigger value="screen">4 · Your Sleeve</TabsTrigger>
          </TabsList>

          {/* Step 1: Core */}
          <TabsContent value="core">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Core ETF Allocation</CardTitle>
                <p className="text-xs text-gray-500">
                  Adjust each ETF. Remaining % goes to your satellite sleeve.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                {CORE_ETFS.map((etf) => (
                  <div key={etf.ticker}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">
                        {etf.ticker}{" "}
                        <span className="text-gray-500 font-normal text-xs">— {etf.name}</span>
                      </span>
                      <span className="font-semibold">{coreAlloc[etf.ticker]}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      step={5}
                      value={coreAlloc[etf.ticker]}
                      onChange={(e) =>
                        setCoreAlloc({ ...coreAlloc, [etf.ticker]: +e.target.value })
                      }
                      className="w-full accent-indigo-500"
                    />
                    <div className="mt-1 bg-gray-800 rounded-full h-1.5">
                      <div
                        className={`${etf.color} h-1.5 rounded-full transition-all`}
                        style={{ width: `${coreAlloc[etf.ticker]}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Core total:{" "}
                    <span className={totalCore > 100 ? "text-red-400" : "text-white font-semibold"}>
                      {totalCore}%
                    </span>
                  </span>
                  <span className="text-sm text-gray-400">
                    Remaining for sleeve:{" "}
                    <span className="text-indigo-400 font-semibold">
                      {Math.max(0, 100 - totalCore)}%
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 2: Sleeve size */}
          <TabsContent value="sleeve">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Satellite Sleeve Size</CardTitle>
                <p className="text-xs text-gray-500">
                  How much of your portfolio do you want in satellite picks?
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-6xl font-black text-indigo-400 text-center py-8">
                  {sleeveSize}%
                </div>
                <input
                  type="range"
                  min={2}
                  max={25}
                  step={1}
                  value={sleeveSize}
                  onChange={(e) => setSleeveSize(+e.target.value)}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2% (conservative)</span>
                  <span>25% (aggressive)</span>
                </div>
                <div
                  className={`mt-6 text-sm rounded-lg px-4 py-3 ${
                    isValid
                      ? "bg-green-950 text-green-400 border border-green-800"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {isValid
                    ? `✓ Allocation balanced: ${totalCore}% core + ${sleeveSize}% sleeve = 100%`
                    : `Core (${totalCore}%) + Sleeve (${sleeveSize}%) = ${totalWithSleeve}% — adjust your core to balance`}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 3: Theme */}
          <TabsContent value="theme">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`text-left p-5 rounded-xl border transition-all ${
                    selectedTheme.id === theme.id
                      ? "border-indigo-500 bg-indigo-950"
                      : "border-gray-800 bg-gray-900 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{theme.label}</span>
                    {selectedTheme.id === theme.id && (
                      <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{theme.description}</p>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Step 4: Screener results */}
          <TabsContent value="screen">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-base">{selectedTheme.label} Sleeve</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {sleeveSize}% sleeve · {positionSize}% per position · {selectedTheme.stocks.length} picks
                  </p>
                </div>
                <Badge className="bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs">
                  {sleeveSize}% sleeve
                </Badge>
              </div>

              {selectedTheme.stocks.map((stock) => (
                <Card key={stock.ticker} className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg">{stock.ticker}</span>
                          <span className="text-gray-400 text-sm">{stock.name}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 max-w-xs">{stock.thesis}</p>
                      </div>
                      <UpsideBadge upside={stock.upside} />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="bg-gray-800 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Position Size</div>
                        <div className="font-bold text-indigo-400">{positionSize}%</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Upside Target</div>
                        <div className="font-bold text-green-400">+{stock.upside}%</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Exit Level</div>
                        <div className="font-bold">${stock.exit}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-2">
                <div className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">
                  Full Portfolio Summary
                </div>
                <div className="space-y-2">
                  {CORE_ETFS.map((etf) => (
                    <div key={etf.ticker} className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-24 shrink-0">{etf.ticker}</span>
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <div
                          className={`${etf.color} h-2 rounded-full`}
                          style={{ width: `${coreAlloc[etf.ticker]}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold w-8 text-right">
                        {coreAlloc[etf.ticker]}%
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-indigo-400 w-24 shrink-0">Satellite</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${sleeveSize}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold w-8 text-right text-indigo-400">
                      {sleeveSize}%
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 pt-2">
                Not financial advice. Upside targets are illustrative estimates, not guarantees.
                Always do your own research before investing.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
