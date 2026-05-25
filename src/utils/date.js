export function formatDeadline(dateString) {
  if (!dateString) {
    return 'No deadline';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${dateString}T00:00:00`));
}
