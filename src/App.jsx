import { supabase } from "./supabase";
import { useEffect, useMemo, useState } from "react";
import AddTaskModal from "./components/AddTaskModal";
import DashboardPage from "./components/DashboardPage";
import OverviewPage from "./components/OverviewPage";
import PageHeader from "./components/PageHeader";
import ProgressPage from "./components/ProgressPage";
import SettingsPage from "./components/SettingsPage";
import { Sidebar } from "./components/Sidebar";
import TasksPage from "./components/TasksPage";
import AuthPage from "./components/AuthPage";
import { formatLongDate, getTaskStats, toISODate } from "./data/mockData";

export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();

      if (mounted) {
        setSession(data.session);
        setAuthLoading(false);

        if (data.session?.user) {
          loadTasks(data.session.user.id);
        } else {
          setTasks([]);
          setTasksLoading(false);
        }
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthLoading(false);

      if (newSession?.user) {
        loadTasks(newSession.user.id);
      } else {
        setTasks([]);
        setTasksLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);
  console.log("Supabase client:", supabase);

  const [page, setPage] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(toISODate());
  async function loadTasks(userId) {
    setTasksLoading(true);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading tasks:", error);
      setTasks([]);
    } else {
      setTasks(
        data.map((task) => ({
          id: task.id,
          title: task.title,
          subject: task.subject,
          priority: task.priority,
          dueDate: task.due_date,
          status: task.status,
        })),
      );
    }

    setTasksLoading(false);
  }

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);
  const today = toISODate();
  const todayTasks = tasks.filter((task) => task.dueDate === today);
  const selectedDateTasks = tasks.filter(
    (task) => task.dueDate === selectedDate,
  );

  function changeSelectedDate(days) {
    setSelectedDate((currentDate) => {
      const date = new Date(`${currentDate}T00:00:00`);
      date.setDate(date.getDate() + days);
      return toISODate(date);
    });
  }

  function goToToday() {
    setSelectedDate(today);
  }
  const dateLabel = formatLongDate();
  if (authLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
          Loading StudyFlow...
        </div>
      </div>
    );
  }

  if (!session) {
    return <AuthPage onAuthSuccess={setSession} />;
  }
  const showAddTask = page !== "settings";

  async function addTask(values) {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: session.user.id,
        title: values.title,
        subject: values.subject,
        priority: values.priority,
        due_date: values.dueDate || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
      alert("Unable to add task. Please try again.");
      return;
    }

    setTasks((current) => [
      {
        id: data.id,
        title: data.title,
        subject: data.subject,
        priority: data.priority,
        dueDate: data.due_date,
        status: data.status,
      },
      ...current,
    ]);

    setModalOpen(false);
  }

  async function toggleTask(id) {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";

    const { error } = await supabase
      .from("tasks")
      .update({
        status: newStatus,
      })
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error updating task:", error);
      alert("Unable to update task. Please try again.");
      return;
    }

    setTasks((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  }

  async function deleteTask(id) {
    if (!session?.user) return;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error deleting task:", error);
      alert("Unable to delete task. Please try again.");
      return;
    }

    setTasks((current) => current.filter((task) => task.id !== id));
  }

  let content = null;
  if (page === "tasks") {
    content = (
      <TasksPage
        tasks={tasks}
        stats={stats}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onAddTask={() => setModalOpen(true)}
      />
    );
  } else if (page === "progress") {
    content = <ProgressPage tasks={tasks} stats={stats} />;
  } else if (page === "settings") {
    content = <SettingsPage session={session} />;
  } else if (page === "overview") {
    content = (
      <OverviewPage
        tasks={tasks}
        stats={stats}
        onToggle={toggleTask}
        onAddTask={() => setModalOpen(true)}
      />
    );
  } else {
    content = (
      <DashboardPage
        todayTasks={selectedDateTasks}
        selectedDate={selectedDate}
        today={today}
        onChangeDate={changeSelectedDate}
        onToday={goToToday}
        stats={stats}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onAddTask={() => setModalOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-svh bg-slate-100 font-sans text-slate-700">
      <Sidebar currentPage={page} onNavigate={setPage} session={session} />{" "}
      <div className="md:pl-20 lg:pl-72">
        <div className="flex min-h-svh flex-col">
          <PageHeader
            page={page}
            dateLabel={dateLabel}
            showAddTask={showAddTask}
            onAddTask={() => setModalOpen(true)}
            firstName={
              session?.user?.user_metadata?.full_name?.split(" ")[0] ||
              session?.user?.email?.split("@")[0] ||
              "Student"
            }
            session={session}
          />
          <main className="flex-1 px-4 pb-24 sm:px-6 md:pb-10 lg:px-8">
            {content}
          </main>
        </div>
      </div>
      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addTask}
      />
    </div>
  );
}
