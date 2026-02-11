# AIA — Agentic AI Analytics (MVP)

Private, single-case workspace to produce a **copy/paste-ready correlation matrix** for Sociomapping.

## MVP scope (locked)
- Single case at a time
- Dataset input: **human-uploaded** CSV/XLSX, **wide format**
- Stats: **Spearman (default)** with dropdown to Pearson
- Output: full **NxN** matrix **with headers** (variable names) — Excel-ready for copy/paste

## Dev
```bash
npm install
npm run dev
```

Then open: http://127.0.0.1:3190

## Notes
- This repo is a scaffold; workflow screens + compute pipeline are implemented incrementally.
