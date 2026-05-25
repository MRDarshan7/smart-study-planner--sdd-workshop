## 1. Prioritization Logic

- [x] 1.1 Add a reusable prioritization utility that scores tasks by deadline urgency, priority, and difficulty.
- [x] 1.2 Add derived importance labels of Critical, Important, and Flexible from the computed score.
- [x] 1.3 Add sorted/enriched task output with deterministic tie-breakers and support for missing deadlines.
- [x] 1.4 Add a recommendation helper that returns the top task and a brief explanation for Today's Focus.

## 2. User Interface

- [x] 2.1 Update the task list to render prioritized tasks instead of insertion-order tasks.
- [x] 2.2 Add a Today's Focus section above the task grid when tasks exist.
- [x] 2.3 Update task cards to display the computed importance label while preserving existing priority, difficulty, deadline, and delete controls.
- [x] 2.4 Keep the empty state unchanged when no tasks exist.

## 3. Verification

- [x] 3.1 Verify existing localStorage add/delete behavior still works without data migration.
- [x] 3.2 Run the project build to catch integration errors.
