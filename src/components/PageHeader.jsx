import { LogoMark, PlusIcon } from "./Icons";

const copy = {
  dashboard: {
    kicker: "Dashboard",
    subtitle: (date, greeting) =>
      `${date} · ${greeting === "Good night" ? "Time to rest and recharge." : "Here is a calm plan for the rest of your day."}`,
  },
  overview: {
    kicker: "Overview",
    title: "Your study snapshot",
    subtitle: () => "A quick look at everything on your list, not just today.",
  },
  tasks: {
    kicker: "Tasks",
    title: "All study tasks",
    subtitle: () => "Check items off as you finish, or add the next one.",
  },
  progress: {
    kicker: "Progress",
    title: "See how you are tracking",
    subtitle: () => "Completion updates as soon as you check a task.",
  },
  settings: {
    kicker: "Settings",
    title: "Study preferences",
    subtitle: () => "Manage your StudyFlow preferences and profile.",
  },
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  }

  if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  }

  if (hour >= 17 && hour < 21) {
    return "Good evening";
  }

  return "Good night";
}

export default function PageHeader({
  page,
  dateLabel,
  showAddTask,
  onAddTask,
  firstName,
  session,
}) {
  const item = copy[page] ?? copy.dashboard;
  const greeting = getGreeting();

  const title = page === "dashboard" ? `${greeting}, ${firstName}` : item.title;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-slate-100/90 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="md:hidden flex min-w-0 items-center gap-2">
            <LogoMark className="h-8 w-8 shrink-0" />

            <div className="min-w-0 leading-tight">
              <p className="text-sm font-bold tracking-tight text-slate-900">
                StudyFlow
              </p>
              <p className="truncate text-[10px] text-slate-500">
                {session?.user?.email || "Your study workspace"}
              </p>
            </div>
          </div>

          <div className="hidden md:block min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-indigo-600">
              {item.kicker}
            </p>

            <h1 className="truncate text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h1>
          </div>
        </div>

        {showAddTask ? (
          <button
            type="button"
            onClick={onAddTask}
            className="hidden items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:inline-flex"
          >
            <PlusIcon className="h-4 w-4" />
            Add a task
          </button>
        ) : null}
      </div>

      <p className="px-4 pb-4 text-sm text-slate-500 sm:px-6 lg:px-8">
        {item.subtitle(dateLabel, greeting)}
      </p>
    </header>
  );
}
