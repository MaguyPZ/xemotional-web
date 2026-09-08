"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Activity,
  Calendar,
  Layers,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Trash2,
  Lock,
  LogOut,
  ChevronRight,
  TrendingDown,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const STORAGE_KEYS = {
  USERS: "audioanalyzer_users",
  CURRENT_USER: "audioanalyzer_current_user",
  AUDIO_ANALYSES: "audioanalyzer_analyses",
};

const PLANS = {
  trial: { name: "Trial", segundos: 0, precio: 0 },
  basic_60: { name: "Básico", segundos: 60, precio: 5 },
  standard_300: { name: "Estándar", segundos: 300, precio: 20 },
  pro_3600: { name: "Pro", segundos: 3600, precio: 150 },
};

interface UserObj {
  id: number;
  nombre_completo: string;
  email: string;
  telefono: string;
  passwordHash: string;
  uso_basico_inicial: boolean;
  plan: keyof typeof PLANS;
  plan_activo: boolean;
  segundos_asignados: number;
  segundos_consumidos: number;
  estado: string;
  created_at: string;
  last_login: string;
}

interface AnalysisObj {
  id: number;
  usuario_id: number;
  tipo: string;
  duracion: number;
  archivo: string;
  referencia: string;
  resultado: any;
  created_at: string;
}

export default function AdminConsole() {
  const router = useRouter();

  // Core Data States
  const [users, setUsers] = useState<UserObj[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisObj[]>([]);
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  // Forms and Modals
  const [targetUser, setTargetUser] = useState<UserObj | null>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<keyof typeof PLANS>("standard_300");
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserTel, setNewUserTel] = useState("");
  const [newUserPass, setNewUserPass] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ==================== AUTH CHECK ====================
  useEffect(() => {
    const session = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!session) {
      router.push("/app");
      return;
    }

    const parsedSession = JSON.parse(session);
    if (parsedSession.user.role !== "admin") {
      router.push("/app");
      return;
    }

    setIsAdminAuth(true);

    // Load DB
    const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (savedUsers) setUsers(JSON.parse(savedUsers));

    const savedAnalyses = localStorage.getItem(STORAGE_KEYS.AUDIO_ANALYSES);
    if (savedAnalyses) setAnalyses(JSON.parse(savedAnalyses));
  }, [router]);

  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-xs font-bold text-slate-500 uppercase tracking-widest">
        Verificando Sesión de Administrador...
      </div>
    );
  }

  // Sync helpers
  const syncUsers = (list: UserObj[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(list));
    setUsers(list);
  };

  // ==================== STATS COMPILER ====================
  const activeUsers = users.filter((u) => u.estado === "activo");
  const usersWithPlans = users.filter((u) => u.plan_activo);
  const totalSecondsConsumed = users.reduce((sum, u) => sum + u.segundos_consumidos, 0);
  
  const todayStr = new Date().toDateString();
  const analysesToday = analyses.filter(
    (a) => new Date(a.created_at).toDateString() === todayStr
  );

  const planCounts = {
    trial: users.filter((u) => u.plan === "trial").length,
    basic_60: users.filter((u) => u.plan === "basic_60").length,
    standard_300: users.filter((u) => u.plan === "standard_300").length,
    pro_3600: users.filter((u) => u.plan === "pro_3600").length,
  };

  const totalUsersCount = users.length || 1; // avoid divide by zero

  // ==================== ADMINISTRATIVE ACTIONS ====================
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!newUserName || !newUserEmail || !newUserPass) {
      setErrorMessage("Complete los campos obligatorios");
      return;
    }

    const existing = users.find((u) => u.email === newUserEmail);
    if (existing) {
      setErrorMessage("El correo electrónico ya existe.");
      return;
    }

    const newUser: UserObj = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      nombre_completo: newUserName,
      email: newUserEmail,
      telefono: newUserTel,
      passwordHash: btoa(newUserPass + "_salt_audioanalyzer"),
      uso_basico_inicial: false,
      plan: "trial",
      plan_activo: false,
      segundos_asignados: 0,
      segundos_consumidos: 0,
      estado: "activo",
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    syncUsers([...users, newUser]);
    setIsAddUserOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserTel("");
    setNewUserPass("");
    setSuccessMessage("Usuario administrativo creado con éxito.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleToggleUserStatus = (userId: number) => {
    const updated = users.map((u) => {
      if (u.id === userId) {
        const newStatus = u.estado === "activo" ? "inactivo" : "activo";
        return { ...u, estado: newStatus };
      }
      return u;
    });
    syncUsers(updated);
    setSuccessMessage("Estado del usuario modificado.");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("¿Está seguro de eliminar de forma lógica este usuario del sistema?")) {
      const updated = users.map((u) =>
        u.id === userId ? { ...u, estado: "eliminado" } : u
      );
      syncUsers(updated);
      setSuccessMessage("Usuario marcado como eliminado.");
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  };

  const handleActivatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUser) return;

    const plan = PLANS[selectedPlanType];
    const updated = users.map((u) =>
      u.id === targetUser.id
        ? {
            ...u,
            plan: selectedPlanType,
            plan_activo: selectedPlanType !== "trial",
            segundos_asignados: plan.segundos,
            segundos_consumidos: 0,
          }
        : u
    );

    syncUsers(updated);
    setIsPlanModalOpen(false);
    setTargetUser(null);
    setSuccessMessage("Plan del usuario re-calibrado con éxito.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Navbar */}
      <nav className="bg-slate-950/80 border-b border-slate-900 sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white shadow-lg">
            <img src="/LogoWhap.png" alt="Xemotional" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-base tracking-tight">Xemotional Admin</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-extrabold text-red-500 border border-red-500/25 bg-red-500/5 px-2.5 py-0.5 rounded uppercase tracking-wider">
            Administrador del Sistema
          </span>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Salir del Panel
          </button>
        </div>
      </nav>

      {/* Main Panel Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8">
        
        {/* Messages */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4.5 h-4.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Dashboard Title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">
              Panel de Administración
            </h1>
            <p className="text-xs text-slate-450 font-semibold">
              Panel de control central de la base de datos de usuarios, peritajes consumidos y licencias bioacústicas.
            </p>
          </div>
          <button
            onClick={() => setIsAddUserOpen(true)}
            className="btn-glow px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <UserPlus className="w-4.5 h-4.5" />
            Crear Usuario
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { lbl: "Usuarios Totales", val: users.length, icon: <Users className="w-4.5 h-4.5 text-slate-400" /> },
            { lbl: "Usuarios Activos", val: activeUsers.length, icon: <CheckCircle className="w-4.5 h-4.5 text-indigo-400" /> },
            { lbl: "Planes Activos", val: usersWithPlans.length, icon: <Layers className="w-4.5 h-4.5 text-indigo-400" /> },
            { lbl: "Segundos Consumidos", val: totalSecondsConsumed, icon: <Activity className="w-4.5 h-4.5 text-indigo-400" /> },
            { lbl: "Peritajes Totales", val: analyses.length, icon: <Layers className="w-4.5 h-4.5 text-indigo-400" /> },
            { lbl: "Analizados Hoy", val: analysesToday.length, icon: <Calendar className="w-4.5 h-4.5 text-indigo-400" /> },
          ].map((stat, idx) => (
            <div key={idx} className="rounded-xl border border-slate-900 bg-slate-950/40 p-4.5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                  {stat.lbl}
                </span>
                {stat.icon}
              </div>
              <span className="text-lg font-black text-slate-200">{stat.val}</span>
            </div>
          ))}
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* User Table (Left Side) */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-900 bg-slate-950/60 p-6 overflow-hidden">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-5">
              Lista General de Usuarios
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="pb-3.5 pl-2">Usuario</th>
                    <th className="pb-3.5">Plan / Consumo</th>
                    <th className="pb-3.5">Registrado</th>
                    <th className="pb-3.5">Estado</th>
                    <th className="pb-3.5 pr-2 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 font-semibold">
                  {users.filter(u => u.estado !== "eliminado").map((user) => (
                    <tr key={user.id} className="hover:bg-slate-900/20">
                      <td className="py-4.5 pl-2 flex flex-col gap-0.5">
                        <span className="font-extrabold text-slate-200">{user.nombre_completo}</span>
                        <span className="text-[10px] text-slate-500">{user.email}</span>
                        {user.telefono && <span className="text-[10px] text-slate-500">{user.telefono}</span>}
                      </td>
                      <td className="py-4.5">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-indigo-400 capitalize">
                            {PLANS[user.plan]?.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {user.segundos_consumidos} / {user.segundos_asignados} s
                          </span>
                        </div>
                      </td>
                      <td className="py-4.5 text-slate-400 text-[11px]">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4.5">
                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                            user.estado === "activo"
                              ? "text-emerald-400 border border-emerald-500/20 bg-emerald-500/5"
                              : "text-amber-500 border border-amber-500/20 bg-amber-500/5"
                          }`}
                        >
                          {user.estado}
                        </span>
                      </td>
                      <td className="py-4.5 pr-2 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => {
                              setTargetUser(user);
                              setSelectedPlanType(user.plan);
                              setIsPlanModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded text-[10px] cursor-pointer"
                          >
                            Plan
                          </button>
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`px-2.5 py-1 rounded text-[10px] cursor-pointer ${
                              user.estado === "activo"
                                ? "bg-amber-950/20 border border-amber-900/30 text-amber-500 hover:text-amber-400"
                                : "bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 hover:text-emerald-300"
                            }`}
                          >
                            {user.estado === "activo" ? "Suspender" : "Activar"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 text-slate-650 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Plan Distribution graph (Right Side) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-6 flex flex-col">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-5">
                Distribución de Planes
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  { name: "Trial / Libre", code: "trial", count: planCounts.trial, color: "bg-slate-700" },
                  { name: "Plan Básico", code: "basic_60", count: planCounts.basic_60, color: "bg-indigo-400" },
                  { name: "Plan Estándar", code: "standard_300", count: planCounts.standard_300, color: "bg-indigo-600" },
                  { name: "Plan Pro", code: "pro_3600", count: planCounts.pro_3600, color: "bg-emerald-500" },
                ].map((plan, idx) => {
                  const percent = Math.round((plan.count / totalUsersCount) * 100);

                  return (
                    <div key={idx} className="flex flex-col">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1.5">
                        <span className="text-slate-300">{plan.name}</span>
                        <span>
                          {plan.count} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${percent}%` }}
                          className={`h-full rounded-full ${plan.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ==================== CREATE USER MODAL ==================== */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8 relative">
            <button
              onClick={() => setIsAddUserOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold text-lg cursor-pointer"
            >
              ×
            </button>

            <form onSubmit={handleCreateUser} className="flex flex-col gap-5">
              <div className="text-center">
                <h3 className="text-lg font-black text-white">Crear Usuario Nuevo</h3>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Registro administrativo local</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Juan Pérez"
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="juan@ejemplo.com"
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Teléfono / Celular</label>
                <input
                  type="tel"
                  value={newUserTel}
                  onChange={(e) => setNewUserTel(e.target.value)}
                  placeholder="+52 555 123 4567"
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Contraseña *</label>
                <input
                  type="password"
                  required
                  value={newUserPass}
                  onChange={(e) => setNewUserPass(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {errorMessage && (
                <p className="text-[10px] text-red-400 font-bold text-center">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Crear Usuario
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== ACTIVATE PLAN MODAL ==================== */}
      {isPlanModalOpen && targetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-6 relative">
            <button
              onClick={() => {
                setIsPlanModalOpen(false);
                setTargetUser(null);
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold text-lg cursor-pointer"
            >
              ×
            </button>

            <form onSubmit={handleActivatePlan} className="flex flex-col gap-5">
              <div className="text-center">
                <h3 className="text-base font-black text-white">Calibrar Licencia</h3>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Asignar segundos al usuario</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Usuario seleccionado</span>
                <span className="text-xs font-extrabold text-slate-200">
                  {targetUser.nombre_completo}
                </span>
                <span className="text-[10px] text-slate-500">
                  {targetUser.email}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Seleccione el Plan</label>
                <select
                  value={selectedPlanType}
                  onChange={(e) => setSelectedPlanType(e.target.value as keyof typeof PLANS)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="trial">Trial / Libre (0s)</option>
                  <option value="basic_60">Básico (60s - $5)</option>
                  <option value="standard_300">Estándar (300s - $20)</option>
                  <option value="pro_3600">Pro (3600s - $150)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Aplicar Licencia
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 px-6 py-6 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Xemotional · Panel de control administrativo</span>
      </footer>

    </div>
  );
}
