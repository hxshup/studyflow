export const subjects = [
  "Chemistry",
  "Mathematics",
  "Psychology",
  "English",
  "Languages",
  "Computer Science",
];
export function toISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDueDate(isoDate) {
  if (!isoDate) return "No due date";

  const date = new Date(`${isoDate}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatLongDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "completed").length;
  const pending = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending,
    rate,
    cards: [
      {
        id: "total",
        label: "Total Tasks",
        value: String(total),
        hint:
          total === 0
            ? "Add your first task to get started"
            : "On your study list",
        accent: "indigo",
      },
      {
        id: "completed",
        label: "Completed",
        value: String(completed),
        hint:
          completed === 0 ? "No tasks finished yet" : "Checked off and done",
        accent: "emerald",
      },
      {
        id: "pending",
        label: "Pending",
        value: String(pending),
        hint:
          pending === 0 && total > 0
            ? "You are all caught up"
            : "Still on your plate",
        accent: "amber",
      },
      {
        id: "rate",
        label: "Completion Rate",
        value: `${rate}%`,
        hint:
          total === 0
            ? "Stats appear after you add a task"
            : "Of all tasks completed",
        accent: "sky",
      },
    ],
  };
}
