## ADDED Requirements

### Requirement: Automatic Task Ranking
The system SHALL rank saved study tasks using deadline urgency, task priority, and task difficulty so higher-importance tasks appear first.

#### Scenario: Tasks are displayed by computed importance
- **WHEN** the planner displays multiple saved tasks with different deadlines, priorities, and difficulties
- **THEN** the task list orders them from highest computed importance to lowest computed importance

#### Scenario: Missing deadline remains supported
- **WHEN** a saved task has no deadline
- **THEN** the system still includes the task in the ranked list using its priority and difficulty

### Requirement: Importance Labels
The system SHALL assign each saved task one of the labels Critical, Important, or Flexible based on the computed importance.

#### Scenario: Importance label is visible on each task
- **WHEN** the planner displays a saved task
- **THEN** the task shows its computed importance label

#### Scenario: Labels use the allowed values
- **WHEN** the system computes a task importance label
- **THEN** the label is exactly Critical, Important, or Flexible

### Requirement: Today's Focus Recommendation
The system SHALL display a Today's Focus section that recommends the highest-ranked task and briefly explains why it was selected.

#### Scenario: Focus appears when tasks exist
- **WHEN** at least one study task is saved
- **THEN** the planner displays a Today's Focus section for the highest-ranked task

#### Scenario: Focus explains selection
- **WHEN** the Today's Focus section recommends a task
- **THEN** it includes a brief explanation referencing the strongest prioritization factor

#### Scenario: Empty planner hides focus
- **WHEN** no study tasks are saved
- **THEN** the planner does not display a Today's Focus recommendation

### Requirement: Persistence Compatibility
The system SHALL preserve existing localStorage task persistence without requiring stored task data migration.

#### Scenario: Existing tasks are prioritized without migration
- **WHEN** previously saved tasks are loaded from localStorage
- **THEN** the system ranks and labels them without requiring new stored fields

#### Scenario: Task operations still persist
- **WHEN** a user adds or deletes a task
- **THEN** the updated task collection remains saved through the existing localStorage behavior

### Requirement: Modular Prioritization Logic
The system SHALL keep prioritization calculations separate from task presentation components.

#### Scenario: UI consumes enriched task metadata
- **WHEN** the task list renders tasks
- **THEN** it uses reusable prioritization output rather than duplicating scoring rules inside individual task cards
