# ⚡ Smart Study Planner — Vibe Coding Version

This branch demonstrates **feature development using pure vibe coding (raw prompting)** with Codex.

## Experiment Goal

The goal was to implement the **same intelligent prioritization feature** using only:

- direct prompting
- fresh context
- no structured planning
- no OpenSpec artifacts

This simulates a typical **AI-assisted vibe coding workflow**.

## Added Feature

### 🧠 Intelligent Task Prioritization

Tasks are automatically ranked based on:

- deadline urgency
- task priority
- task difficulty

### Added Capabilities

- Automatic smart sorting
- Importance labels:
  - 🔥 Critical
  - ⚠ Important
  - 🟢 Flexible
- **Today's Focus** recommendation section
- Enhanced UI experience

## Development Approach

Implementation was completed through **direct prompting with Codex**, without specification files or structured planning.

Workflow:

```txt
Prompt → Generate → Refine → Test
```
## Run Locally
```
npm install
npm run dev
```