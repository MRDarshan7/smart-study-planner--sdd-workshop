## Context

The planner is a single-page React/Vite app that stores tasks in localStorage through `useLocalStorage`. Each task already includes the inputs needed for prioritization: `deadline`, `priority`, and `difficulty`. Tasks currently render in saved order with visual chips for priority and difficulty.

The change should improve task ordering and recommendation quality without changing the persisted task schema or introducing external dependencies.

## Goals / Non-Goals

**Goals:**
- Derive a deterministic importance score from deadline urgency, task priority, and task difficulty.
- Sort displayed tasks so the most important tasks appear first.
- Add Critical, Important, and Flexible labels derived from the same prioritization logic.
- Add a Today's Focus section that highlights the top-ranked task and explains the main reason it was selected.
- Keep prioritization logic modular and independent from presentation components.
- Preserve existing task creation, deletion, and localStorage behavior.

**Non-Goals:**
- Adding authentication, server persistence, notifications, calendar sync, or AI/network-based recommendations.
- Changing the task creation form fields or requiring a data migration for saved tasks.
- Allowing users to manually override the computed ranking in this change.

## Decisions

- Add a reusable prioritization utility under `src/utils/` that accepts raw tasks and returns enriched task metadata.
  - Rationale: scoring, sorting, labels, and explanation text are related domain logic and should not be spread across UI components.
  - Alternative considered: compute everything inline in `TaskList`, but that would make rendering responsible for business rules and reduce testability.

- Score deadline urgency, priority, and difficulty as weighted numeric factors.
  - Rationale: a simple transparent scoring model is maintainable and easy to tune for a student planner.
  - Alternative considered: complex formulas or machine-learning style recommendations, but the available data is small and deterministic ranking is preferable.

- Treat missing deadlines as lower urgency while still considering priority and difficulty.
  - Rationale: existing tasks may have no deadline, and localStorage compatibility requires graceful handling.
  - Alternative considered: force deadlines for all tasks, but that changes existing form behavior and data expectations.

- Preserve raw task objects in storage and compute priority metadata at render time.
  - Rationale: existing persisted tasks remain valid, and future scoring tweaks do not require data migration.
  - Alternative considered: store computed labels on task creation, but cached labels could become stale as dates change.

- Render Today's Focus above the sorted task grid when tasks exist.
  - Rationale: the recommendation should be prominent while retaining the familiar task list below.
  - Alternative considered: replacing the task list with the focus item, but users still need to scan all saved tasks.

## Risks / Trade-offs

- Score thresholds may feel too coarse for some task combinations -> Keep labels broad and pair the focus card with an explanation.
- Date-based urgency changes daily -> Compute at render time so labels update naturally when the app loads.
- Over-prioritizing hard tasks could make lower-effort urgent tasks less visible -> Weight deadline urgency and declared priority above difficulty.
- Sorting changes the visible order from insertion order -> Use deterministic tie-breakers such as earlier deadlines and creation time to keep behavior predictable.
