import { useState } from "preact/hooks";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    if (!name.trim()) return;
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div class="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-4">
      <div class="w-full max-w-md space-y-8">
        {/* Header */}
        <div class="text-center space-y-2">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-2">
            <svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.5}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold tracking-tight text-white">Offroute</h1>
          <p class="text-sm text-zinc-500">Your desktop companion</p>
        </div>

        {/* Card */}
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl shadow-black/20">
          <label class="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Say hello
          </label>
          <form
            class="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              greet();
            }}
          >
            <input
              id="greet-input"
              class="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
              placeholder="Enter your name…"
            />
            <button
              type="submit"
              class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer disabled:opacity-40"
              disabled={!name.trim()}
            >
              Greet
            </button>
          </form>

          {greetMsg && (
            <div class="flex items-start gap-3 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3">
              <span class="mt-0.5 flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400 mt-1.5"></span>
              <p class="text-sm text-zinc-300 leading-relaxed">{greetMsg}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p class="text-center text-xs text-zinc-600">
          Tauri v2 · Preact · Tailwind v4
        </p>
      </div>
    </div>
  );
}

export default App;
