## Why

Students can currently capture study tasks, but they still need to manually decide what deserves attention first. Adding smart prioritization helps the planner surface the most important work using the task data students already enter.

## What Changes

- Automatically rank study tasks by deadline urgency, declared priority, and difficulty.
- Display higher-importance tasks before lower-importance tasks without removing the ability to save and delete tasks.
- Add importance labels: Critical, Important, and Flexible.
- Add a "Today's Focus" section that recommends the top task and briefly explains why it was chosen.
- Preserve the existing localStorage-backed task persistence and current visual style.

## Capabilities

### New Capabilities
- `smart-task-prioritization`: Covers automatic task ranking, importance labels, and the Today's Focus recommendation.

### Modified Capabilities

## Impact

- Affects task ordering and display behavior in the React UI.
- Adds reusable prioritization logic for scoring, labeling, sorting, and recommendation explanations.
- Updates task list/card presentation while preserving stored task data compatibility.
- No new external dependencies are expected.
