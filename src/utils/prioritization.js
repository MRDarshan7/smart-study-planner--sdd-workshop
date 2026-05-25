const priorityScores = {
  High: 36,
  Medium: 22,
  Low: 10,
};

const difficultyScores = {
  Hard: 22,
  Medium: 14,
  Easy: 6,
};

const importanceLevels = [
  {
    label: 'Critical',
    minScore: 88,
    className: 'border-rose-200 bg-rose-50 text-rose-800',
  },
  {
    label: 'Important',
    minScore: 56,
    className: 'border-amber-200 bg-amber-50 text-amber-800',
  },
  {
    label: 'Flexible',
    minScore: 0,
    className: 'border-sky-200 bg-sky-50 text-sky-800',
  },
];

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function parseDeadline(deadline) {
  if (!deadline) {
    return null;
  }

  const date = new Date(`${deadline}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getDaysUntilDeadline(deadline) {
  const deadlineDate = parseDeadline(deadline);

  if (!deadlineDate) {
    return null;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((deadlineDate.getTime() - startOfToday().getTime()) / millisecondsPerDay);
}

function getUrgencyScore(daysUntilDeadline) {
  if (daysUntilDeadline === null) {
    return 4;
  }

  if (daysUntilDeadline < 0) {
    return 48;
  }

  if (daysUntilDeadline === 0) {
    return 46;
  }

  if (daysUntilDeadline === 1) {
    return 40;
  }

  if (daysUntilDeadline <= 3) {
    return 32;
  }

  if (daysUntilDeadline <= 7) {
    return 22;
  }

  return 10;
}

function getUrgencyText(daysUntilDeadline) {
  if (daysUntilDeadline === null) {
    return 'no deadline';
  }

  if (daysUntilDeadline < 0) {
    return 'overdue';
  }

  if (daysUntilDeadline === 0) {
    return 'due today';
  }

  if (daysUntilDeadline === 1) {
    return 'due tomorrow';
  }

  return `due in ${daysUntilDeadline} days`;
}

function getImportance(score) {
  return importanceLevels.find((level) => score >= level.minScore);
}

function buildFocusReason(task, daysUntilDeadline, importance) {
  const reasons = [];

  if (daysUntilDeadline !== null && daysUntilDeadline <= 1) {
    reasons.push(getUrgencyText(daysUntilDeadline));
  } else if (daysUntilDeadline !== null && daysUntilDeadline <= 7) {
    reasons.push('deadline is approaching');
  }

  if (task.priority === 'High') {
    reasons.push('marked high priority');
  }

  if (task.difficulty === 'Hard') {
    reasons.push('needs extra effort');
  }

  if (reasons.length === 0) {
    reasons.push('it has the strongest overall balance of timing, priority, and difficulty');
  }

  return `${importance.label} focus because ${reasons.join(', ')}.`;
}

export function prioritizeTask(task) {
  const daysUntilDeadline = getDaysUntilDeadline(task.deadline);
  const score =
    getUrgencyScore(daysUntilDeadline) +
    (priorityScores[task.priority] ?? 0) +
    (difficultyScores[task.difficulty] ?? 0);
  const importance = getImportance(score);

  return {
    ...task,
    prioritization: {
      score,
      importance,
      urgencyText: getUrgencyText(daysUntilDeadline),
      reason: buildFocusReason(task, daysUntilDeadline, importance),
    },
  };
}

export function getPrioritizedTasks(tasks) {
  return tasks
    .map(prioritizeTask)
    .sort((firstTask, secondTask) => {
      if (secondTask.prioritization.score !== firstTask.prioritization.score) {
        return secondTask.prioritization.score - firstTask.prioritization.score;
      }

      const firstDeadline = parseDeadline(firstTask.deadline)?.getTime() ?? Number.POSITIVE_INFINITY;
      const secondDeadline =
        parseDeadline(secondTask.deadline)?.getTime() ?? Number.POSITIVE_INFINITY;

      if (firstDeadline !== secondDeadline) {
        return firstDeadline - secondDeadline;
      }

      return new Date(secondTask.createdAt).getTime() - new Date(firstTask.createdAt).getTime();
    });
}
