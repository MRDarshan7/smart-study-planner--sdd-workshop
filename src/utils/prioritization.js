const priorityScores = {
  High: 35,
  Medium: 20,
  Low: 8,
};

const difficultyScores = {
  Hard: 15,
  Medium: 9,
  Easy: 4,
};

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseDate(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysUntilDeadline(deadline) {
  if (!deadline) {
    return null;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((deadline.getTime() - startOfToday().getTime()) / millisecondsPerDay);
}

function getDeadlineFactor(deadline) {
  const daysUntil = daysUntilDeadline(deadline);

  if (daysUntil === null) {
    return {
      score: 0,
      rank: Number.POSITIVE_INFINITY,
      explanation: 'it has the strongest overall mix of priority and difficulty',
    };
  }

  if (daysUntil < 0) {
    return {
      score: 65,
      rank: daysUntil,
      explanation: 'its deadline has already passed',
    };
  }

  if (daysUntil === 0) {
    return {
      score: 60,
      rank: 0,
      explanation: 'it is due today',
    };
  }

  if (daysUntil <= 2) {
    return {
      score: 50,
      rank: daysUntil,
      explanation: `it is due in ${daysUntil} ${daysUntil === 1 ? 'day' : 'days'}`,
    };
  }

  if (daysUntil <= 7) {
    return {
      score: 35,
      rank: daysUntil,
      explanation: 'its deadline is coming up this week',
    };
  }

  if (daysUntil <= 14) {
    return {
      score: 20,
      rank: daysUntil,
      explanation: 'its deadline is approaching',
    };
  }

  return {
    score: 8,
    rank: daysUntil,
    explanation: 'it has a future deadline',
  };
}

function getImportanceLabel(score) {
  if (score >= 80) {
    return 'Critical';
  }

  if (score >= 45) {
    return 'Important';
  }

  return 'Flexible';
}

function getFocusExplanation(task, factors) {
  const strongestFactor = [
    {
      score: factors.deadline.score,
      text: factors.deadline.explanation,
    },
    {
      score: factors.priority,
      text: `${task.priority.toLowerCase()} priority makes it important`,
    },
    {
      score: factors.difficulty,
      text: `${task.difficulty.toLowerCase()} difficulty means it needs more attention`,
    },
  ].sort((left, right) => right.score - left.score)[0];

  return `Recommended because ${strongestFactor.text}.`;
}

export function prioritizeTask(task) {
  const deadline = parseDate(task.deadline);
  const deadlineFactor = getDeadlineFactor(deadline);
  const priorityScore = priorityScores[task.priority] ?? 0;
  const difficultyScore = difficultyScores[task.difficulty] ?? 0;
  const score = deadlineFactor.score + priorityScore + difficultyScore;
  const factors = {
    deadline: deadlineFactor,
    priority: priorityScore,
    difficulty: difficultyScore,
  };

  return {
    ...task,
    importance: {
      score,
      label: getImportanceLabel(score),
      explanation: getFocusExplanation(task, factors),
      deadlineRank: deadlineFactor.rank,
    },
  };
}

function getCreatedRank(task) {
  const createdAt = task.createdAt ? new Date(task.createdAt).getTime() : 0;
  return Number.isNaN(createdAt) ? 0 : createdAt;
}

export function getPrioritizedTasks(tasks) {
  return tasks
    .map(prioritizeTask)
    .sort((left, right) => {
      if (right.importance.score !== left.importance.score) {
        return right.importance.score - left.importance.score;
      }

      if (left.importance.deadlineRank !== right.importance.deadlineRank) {
        return left.importance.deadlineRank - right.importance.deadlineRank;
      }

      return getCreatedRank(left) - getCreatedRank(right);
    });
}

export function getTodaysFocus(tasks) {
  const [topTask] = getPrioritizedTasks(tasks);
  return topTask ?? null;
}
