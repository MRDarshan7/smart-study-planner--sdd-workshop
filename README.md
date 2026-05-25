# 📐 Smart Study Planner — Spec-Driven Development (SDD)

This branch demonstrates **Spec-Driven Development (SDD)** using **OpenSpec** and Codex.

## Experiment Goal

The goal was to implement the **same intelligent prioritization feature** as the vibe-coded branch while using:

- structured specifications
- planning artifacts
- task breakdown
- modular implementation

instead of direct prompting alone.

## Development Workflow

The feature was implemented using an OpenSpec workflow:

```txt
/opsx:propose
        ↓
proposal.md
design.md
tasks.md
spec.md
        ↓
/opsx:apply
        ↓
Implementation
```

## Run Locally
```
npm install
npm run dev
```