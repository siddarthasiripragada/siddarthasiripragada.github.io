# Local RAG Chatbot — `local-rag-chat.html`

A fully client-side retrieval-augmented generation chatbot. Embeddings, vector
search, reranking, and text generation all run **inside the browser tab** via
[Transformers.js](https://huggingface.co/docs/transformers.js) + ONNX Runtime
Web. No backend, no API key, no server process. After the first model
download (cached by the browser), it works fully offline.

This is built as a single self-contained `.html` file so it drops straight
into your existing `siddarthasiripragada.github.io` repo alongside your other
demo pages (`rag-explainer-v2.html`, `prompt-lab.html`, etc.) without touching
any of your existing files.

## What it actually does (for talking through in an interview)

1. **Chunking** — each source document is split into ~110-word sliding-window
   chunks with 20-word overlap, so ideas that straddle a boundary aren't lost.
2. **Embedding** — every chunk (and every incoming query) is embedded with
   `Xenova/all-MiniLM-L6-v2`, a 22M-parameter sentence embedding model, run
   through ONNX Runtime Web on WebGPU (falls back to WASM automatically).
3. **Dense retrieval** — cosine similarity (a plain dot product, since
   embeddings are L2-normalized) ranks all chunks against the query and keeps
   the top 8 candidates.
4. **Lexical rerank** — a lightweight keyword-overlap score is blended in
   (`0.8 × cosine + 0.2 × lexical overlap`) to recover exact-term matches that
   pure dense search can sometimes bury — a toy version of hybrid
   dense+sparse retrieval. You can toggle this off in the UI to show the
   difference live.
5. **Context injection** — the top-K chunks (configurable, default 4) are
   formatted into a numbered context block and injected into a system+user
   prompt that explicitly instructs the model to answer only from that
   context, and to say so plainly if the answer isn't there.
6. **Generation** — `HuggingFaceTB/SmolLM2-360M-Instruct` (or the 135M variant
   for faster, lower-spec demos) generates the answer, streamed token-by-token
   back to the UI via `TextStreamer`.
7. **Observability** — a live pipeline trace shows each stage lighting up in
   real time with its own latency, plus a tokens/sec counter and the raw
   retrieved chunks with their similarity scores, so nothing is a black box.

All of the above (both model pipelines, the index, retrieval, and generation)
runs inside a dedicated **Web Worker**, so the main UI thread never blocks —
the worker source is embedded in the page as an inert `<script type="text/plain">`
block and instantiated at runtime as a Blob-backed module worker, which is how
the whole thing stays a single deployable file.

## Deploying to GitHub Pages

1. Copy `local-rag-chat.html` into the root of your
   `siddarthasiripragada.github.io` repo (same level as `index.html`).
2. Commit and push:
   ```bash
   git add local-rag-chat.html
   git commit -m "Add local, client-side RAG chatbot demo"
   git push
   ```
3. It will be live at `https://siddarthasiripragada.github.io/local-rag-chat.html`
   within a minute or two. No build step, no config — GitHub Pages just
   serves it as a static file like your other demos.

### Optional: add it to your "Selected Work" grid

I didn't touch your `index.html`, but here's a card you can paste into the
`demo-grid` section (it reuses classes that already exist in your stylesheet,
so no CSS changes are needed):

```html
<!-- Local RAG Chatbot Demo -->
<div class="demo-card" style="--dc:#15803d;">
  <div class="demo-strip ds-rag">
    <div class="rn">📂 Docs</div><span class="ra">→</span>
    <div class="rn">🧠 MiniLM</div><span class="ra">→</span>
    <div class="rn">🔎 Cosine</div><span class="ra">→</span>
    <div class="rn">⚖️ Rerank</div><span class="ra">→</span>
    <div class="rn">🤖 SmolLM2</div>
  </div>
  <div class="demo-body">
    <div class="demo-top">
      <div class="demo-ico">🖥️</div>
      <div class="demo-title">Local RAG Chatbot — 100% Client-Side</div>
    </div>
    <div class="demo-desc">A retrieval-augmented chatbot that runs entirely in the browser: MiniLM embeddings, cosine + lexical hybrid retrieval, and a SmolLM2 instruct model via Transformers.js and WebGPU/WASM — no backend, no API key, fully offline after first load.</div>
    <div class="demo-tags"><span class="demo-tag">RAG</span><span class="demo-tag">Transformers.js</span><span class="demo-tag">WebGPU</span><span class="demo-tag">On-Device LLM</span><span class="demo-tag">Web Workers</span></div>
    <div class="demo-footer">
      <div class="demo-stats"><span class="demo-stat"><strong>0</strong> API calls</span><span class="demo-stat"><strong>Live</strong> token stream</span><span class="demo-stat"><strong>Offline</strong> after load</span></div>
      <a href="local-rag-chat.html" target="_blank" class="demo-btn">Launch →</a>
    </div>
  </div>
</div>
```

## Adding / editing documents

Open `local-rag-chat.html` and find the `SEED_DOCUMENTS` array near the top
of the worker source block (search for `SEED_DOCUMENTS`). Each entry is:

```js
{ title: "Short label", source: "Shown as the citation tag", text: "..." }
```

Add as many as you like — there's no separate build step, just save and
reload. You can also add documents live in the running demo via the "Upload a
.txt or .md file" control in the Knowledge Base panel, without editing any
code, which is a good thing to demonstrate live ("watch it re-index a brand
new document on the fly").

## Browser compatibility

- **Best experience**: Chrome or Edge (113+), where WebGPU acceleration kicks
  in automatically. The device badge at the top of the setup card tells you
  which backend is active.
- **Fallback**: any modern browser without WebGPU (Firefox, Safari, older
  Chrome) automatically falls back to WASM — slower, but works.
- Requires module Web Worker support (all evergreen browsers). If worker
  creation fails, the UI shows a clear error rather than failing silently.
- First load downloads roughly 100–400MB total (embedding model + chosen
  generation model), cached by the browser's HTTP cache afterward.

## Known limitations (worth stating proactively in an interview)

- **Tiny corpus, brute-force search**: with a few dozen chunks, scoring every
  chunk against the query on every call is fine (sub-millisecond). At real
  scale (10K+ chunks) you'd swap the linear scan for an ANN index — see
  "Future improvements" below.
- **Small generation model**: 135M–360M-parameter models are fast and run
  everywhere, but they're far less capable than GPT-4-class models. The
  system prompt is written to keep them grounded and terse rather than
  asking them to do open-ended reasoning.
- **No PDF support yet**: file upload currently accepts `.txt`/`.md` only.
- **No persistence**: re-embeds the seed corpus on every page load. Fine at
  this scale (a couple of seconds); see below for caching it.

## Future improvements

- **IndexedDB persistence** for computed embeddings, so re-visiting the page
  doesn't re-embed the seed corpus every time — only re-embed on content
  change (hash the doc text and compare).
- **Real ANN index** (e.g., a WASM HNSW library) once the corpus grows past
  a few thousand chunks, instead of the current linear scan.
- **PDF ingestion** via `pdf.js` for the upload control.
- **Larger/better models** behind a quality toggle (e.g., Qwen2.5-0.5B or
  Phi-3-mini-4k for WebGPU-capable devices) alongside the current
  fast/small default.
- **RAGAS-style evaluation harness**: a small fixed eval set of
  question/expected-source pairs, scored automatically, to demonstrate
  retrieval evaluation methodology (faithfulness / answer relevance) rather
  than just eyeballing answers.
- **Conversation memory**: currently each question is independent; adding
  short-term chat history into the prompt would make it feel more like a
  real assistant.
