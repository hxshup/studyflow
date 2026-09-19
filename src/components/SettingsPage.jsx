import { useEffect, useState } from "react";
import { supabase } from "../supabase";
export default function SettingsPage({ session }) {
  const [fullName, setFullName] = useState(
    session?.user?.user_metadata?.full_name || "",
  );
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");

  const [reminders, setReminders] = useState(true);
  const [weekendCatchUp, setWeekendCatchUp] = useState(false);
  useEffect(() => {
    async function loadProfile() {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, program, year")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        return;
      }

      setFullName(data.full_name || "");
      setProgram(data.program || "");
      setYear(data.year || "");
    }

    loadProfile();
  }, [session]);

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  async function saveProfile() {
    if (!session?.user?.id) return;

    setSavingProfile(true);
    setProfileMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || "Student",
        program: program.trim(),
        year: year.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id);

    if (error) {
      console.error("Error saving profile:", error);
      setProfileMessage("Unable to save profile. Please try again.");
      setSavingProfile(false);
      return;
    }

    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: fullName.trim() || "Student",
      },
    });

    if (authError) {
      console.error("Error updating account name:", authError);
    }

    setProfileMessage("Profile saved successfully.");
    setSavingProfile(false);
  }

  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <button
      type="button"
      onClick={saveProfile}
      disabled={savingProfile}
      className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {savingProfile ? "Saving..." : "Save profile"}
    </button>

    {profileMessage && (
      <p className="text-sm text-slate-500">{profileMessage}</p>
    )}
  </div>;

  const email = session?.user?.email || "No email available";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-200/70 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
        <p className="mt-1 text-sm text-slate-500">
          Your StudyFlow account information.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Program
              </label>
              <input
                type="text"
                value={program}
                onChange={(event) => setProgram(event.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(event) => setYear(event.target.value)}
                placeholder="e.g. 1st Year"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={saveProfile}
            disabled={savingProfile}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savingProfile ? "Saving..." : "Save profile"}
          </button>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
            }}
            className="mt-3 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100"
          >
            Log out
          </button>

          {profileMessage && (
            <p className="text-sm text-slate-500">{profileMessage}</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-200/70 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Planner</h2>
        <p className="mt-1 text-sm text-slate-500">
          These preferences currently apply to this session.
        </p>

        <ul className="mt-5 space-y-3">
          <li className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Study reminders
              </p>
              <p className="text-xs text-slate-500">
                Keep due tasks visible in your evening plan.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={reminders}
              onClick={() => setReminders((value) => !value)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                reminders ? "bg-indigo-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  reminders ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </li>

          <li className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Weekend catch-up
              </p>
              <p className="text-xs text-slate-500">
                Surface leftover tasks on Saturday and Sunday.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={weekendCatchUp}
              onClick={() => setWeekendCatchUp((value) => !value)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                weekendCatchUp ? "bg-indigo-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  weekendCatchUp ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
