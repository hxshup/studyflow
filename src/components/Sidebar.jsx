import { supabase } from "../supabase";
import {
  DashboardIcon,
  LogoMark,
  OverviewIcon,
  ProgressIcon,
  SettingsIcon,
  TasksIcon,
} from "./Icons";

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "overview", label: "Overview", icon: OverviewIcon },
  { id: "tasks", label: "Tasks", icon: TasksIcon },
  { id: "progress", label: "Progress", icon: ProgressIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function navClass(active, compact) {
  if (compact) {
    return active ? "text-indigo-600" : "text-slate-500";
  }

  return active
    ? "bg-white/10 text-white shadow-sm"
    : "text-slate-300 hover:bg-white/5 hover:text-white";
}

function NavLinks({ compact = false, currentPage, onNavigate }) {
  return (
    <nav
      className={`flex ${
        compact ? "flex-row justify-around gap-1" : "flex-col gap-1"
      }`}
      aria-label="Main"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.id === currentPage;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex items-center rounded-xl transition-colors ${
              compact
                ? "flex-col gap-1 px-2 py-2 text-[11px] font-medium"
                : "gap-3 px-3 py-2.5 text-sm font-medium"
            } ${navClass(active, compact)}`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className={compact ? "leading-none" : ""}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    alert("Unable to log out. Please try again.");
  }
}

function LogoutButton({ compact = false }) {
  return (
    <button
      type="button"
      onClick={handleLogout}
      className={
        compact
          ? "flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          : "mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
      }
      title="Log out"
    >
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

      {!compact && <span>Log out</span>}
    </button>
  );
}

export function Sidebar({ currentPage, onNavigate, session }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-slate-900 text-white">
        <div className="flex h-20 items-center gap-3 px-6">
          <LogoMark className="h-10 w-10" />

          <div>
            <p className="text-lg font-semibold tracking-tight">StudyFlow</p>
            <p className="text-xs text-slate-400">Plan. Focus. Finish.</p>
          </div>
        </div>

        <div className="px-4 pt-2">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Navigation
          </p>

          <NavLinks currentPage={currentPage} onNavigate={onNavigate} />
        </div>

        <div className="mt-auto border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 text-sm font-semibold text-white">
              {(
                session?.user?.user_metadata?.full_name ||
                session?.user?.email ||
                "U"
              )
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {session?.user?.user_metadata?.full_name ||
                  session?.user?.email?.split("@")[0] ||
                  "StudyFlow User"}
              </p>

              <p className="truncate text-xs text-slate-400">
                {session?.user?.email || "Your study workspace"}
              </p>
            </div>
          </div>

          <LogoutButton />
        </div>
      </aside>

      {/* Tablet sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-20 md:flex-col bg-slate-900 text-white lg:hidden">
        <div className="flex h-20 items-center justify-center">
          <LogoMark className="h-9 w-9" />
        </div>

        <nav
          className="flex flex-1 flex-col items-center gap-2 px-3"
          aria-label="Main"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.id === currentPage;

            return (
              <button
                key={item.id}
                type="button"
                title={item.label}
                onClick={() => onNavigate(item.id)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon />
                <span className="sr-only">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex justify-center pb-4">
          <LogoutButton compact />
        </div>
      </aside>

      {/* Mobile navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden"
        aria-label="Mobile"
      >
        <NavLinks compact currentPage={currentPage} onNavigate={onNavigate} />
      </nav>
    </>
  );
}
