"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  Fingerprint,
  Clock,
  Play,
  Upload,
  User,
  LogOut,
  Database,
  History,
  FileText,
  Lock,
  ChevronRight,
  TrendingUp,
  Brain,
  Mic,
  Activity,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// ==================== STORAGE AND PLANS SETUP ====================
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

const ADMIN_CREDENTIALS = {
  email: "admin@audioanalyzer.com",
  password: "admin123",
  nombre_completo: "Administrador del Sistema",
  role: "admin",
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
  resultado: {
    emocion_detectada: string;
    confianza: string;
    veracidad: string | null;
    transcripcion: string | null;
  };
  created_at: string;
}

export default function AppAnalyzer() {
  const router = useRouter();

  // Core States
  const [users, setUsers] = useState<UserObj[]>([]);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [analyses, setAnalyses] = useState<AnalysisObj[]>([]);

  // Page level state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);

  // Active Modals
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisObj | null>(null);
  const [planModal, setPlanModal] = useState<boolean>(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerTel, setRegisterTel] = useState("");
  const [registerPass, setRegisterPass] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ==================== SEED DATA INITIALIZATION ====================
  useEffect(() => {
    // 1. Initialize Users Database
    const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    let initialUsers: UserObj[] = [];
    if (!savedUsers) {
      initialUsers = [
        {
          id: 1,
          nombre_completo: "Juan Pérez",
          email: "juan@ejemplo.com",
          telefono: "+52 555 123 4567",
          passwordHash: btoa("password123_salt_audioanalyzer"),
          uso_basico_inicial: true,
          plan: "standard_300",
          plan_activo: true,
          segundos_asignados: 300,
          segundos_consumidos: 145,
          estado: "activo",
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          last_login: new Date().toISOString(),
        },
        {
          id: 2,
          nombre_completo: "María García",
          email: "maria@ejemplo.com",
          telefono: "+52 555 987 6543",
          passwordHash: btoa("password123_salt_audioanalyzer"),
          uso_basico_inicial: false,
          plan: "trial",
          plan_activo: false,
          segundos_asignados: 0,
          segundos_consumidos: 0,
          estado: "activo",
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          last_login: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          nombre_completo: "Carlos Rodríguez",
          email: "carlos@ejemplo.com",
          telefono: "+52 555 456 7890",
          passwordHash: btoa("password123_salt_audioanalyzer"),
          uso_basico_inicial: true,
          plan: "pro_3600",
          plan_activo: true,
          segundos_asignados: 3600,
          segundos_consumidos: 892,
          estado: "activo",
          created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          last_login: new Date().toISOString(),
        },
      ];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
      setUsers(initialUsers);
    } else {
      setUsers(JSON.parse(savedUsers));
    }

    // 2. Initialize Analyses Database
    const savedAnalyses = localStorage.getItem(STORAGE_KEYS.AUDIO_ANALYSES);
    if (!savedAnalyses) {
      localStorage.setItem(STORAGE_KEYS.AUDIO_ANALYSES, JSON.stringify([]));
      setAnalyses([]);
    } else {
      setAnalyses(JSON.parse(savedAnalyses));
    }

    // 3. Initialize Current User Session
    const savedSession = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
    }
  }, []);

  // Update localStorage helper
  const syncUsersInStorage = (updatedUsers: UserObj[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const syncAnalysesInStorage = (updatedAnalyses: AnalysisObj[]) => {
    localStorage.setItem(STORAGE_KEYS.AUDIO_ANALYSES, JSON.stringify(updatedAnalyses));
    setAnalyses(updatedAnalyses);
  };

  // ==================== AUTH ACTIONS ====================
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Check for admin
    if (loginEmail === ADMIN_CREDENTIALS.email && loginPassword === ADMIN_CREDENTIALS.password) {
      const adminSession = {
        user: ADMIN_CREDENTIALS,
        token: "admin_token_" + Date.now(),
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminSession));
      setCurrentUser(adminSession);
      setAuthModal(null);
      router.push("/admin");
      return;
    }

    // Regular login
    const user = users.find((u) => u.email === loginEmail);
    if (!user) {
      setErrorMessage("Usuario no registrado o credenciales inválidas");
      return;
    }

    if (user.estado !== "activo") {
      setErrorMessage("Su cuenta está inactiva. Contacte a soporte.");
      return;
    }

    const hashed = btoa(loginPassword + "_salt_audioanalyzer");
    if (user.passwordHash !== hashed) {
      setErrorMessage("Contraseña incorrecta");
      return;
    }

    // Update login timestamp
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, last_login: new Date().toISOString() } : u
    );
    syncUsersInStorage(updatedUsers);

    const session = {
      user: { ...user, passwordHash: undefined },
      token: "user_token_" + Date.now(),
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
    setCurrentUser(session);
    setAuthModal(null);
    setSuccessMessage("¡Inicio de sesión exitoso!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!registerName || !registerEmail || !registerPass) {
      setErrorMessage("Por favor llene todos los campos obligatorios");
      return;
    }

    if (registerPass.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const existing = users.find((u) => u.email === registerEmail);
    if (existing) {
      setErrorMessage("Este correo ya se encuentra registrado");
      return;
    }

    const newUser: UserObj = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      nombre_completo: registerName,
      email: registerEmail,
      telefono: registerTel,
      passwordHash: btoa(registerPass + "_salt_audioanalyzer"),
      uso_basico_inicial: false,
      plan: "trial",
      plan_activo: false,
      segundos_asignados: 0,
      segundos_consumidos: 0,
      estado: "activo",
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    const newUsersList = [...users, newUser];
    syncUsersInStorage(newUsersList);

    const session = {
      user: { ...newUser, passwordHash: undefined },
      token: "user_token_" + Date.now(),
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
    setCurrentUser(session);
    setAuthModal(null);
    setSuccessMessage("¡Cuenta creada exitosamente!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
    setSelectedFile(null);
  };

  // ==================== PLAN ACTIONS ====================
  const handleSelectPlan = (planType: keyof typeof PLANS) => {
    if (!currentUser) {
      setPlanModal(false);
      setAuthModal("login");
      return;
    }

    const plan = PLANS[planType];
    const updatedUsers = users.map((u) =>
      u.id === currentUser.user.id
        ? {
            ...u,
            plan: planType,
            plan_activo: planType !== "trial",
            segundos_asignados: plan.segundos,
            segundos_consumidos: 0,
          }
        : u
    );

    syncUsersInStorage(updatedUsers);

    // Refresh Session
    const refreshedUser = updatedUsers.find((u) => u.id === currentUser.user.id);
    const session = {
      ...currentUser,
      user: { ...refreshedUser, passwordHash: undefined },
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
    setCurrentUser(session);
    setPlanModal(false);

    setSuccessMessage(`Plan ${plan.name} activado exitosamente.`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // ==================== AUDIO ANALYSIS ACTIONS ====================
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const executeAnalysis = () => {
    if (!selectedFile) return;

    if (!currentUser) {
      setAuthModal("login");
      return;
    }

    const user = users.find((u) => u.id === currentUser.user.id);
    if (!user) return;

    // Determine type (basic if trial/not active, full otherwise)
    const analysisType = user.plan_activo ? "full" : "basic";

    if (analysisType === "basic" && user.uso_basico_inicial) {
      setErrorMessage("Ya has consumido tu peritaje libre. Elige un plan para continuar.");
      return;
    }

    // Simulated duration
    const duracion = Math.floor(Math.random() * 50) + 15; // 15 - 65 seconds

    if (analysisType === "full") {
      const segundosDisponibles = user.segundos_asignados - user.segundos_consumidos;
      if (segundosDisponibles < duracion) {
        setErrorMessage("Segundos contratados insuficientes. Adquiera más segundos en planes.");
        return;
      }
    }

    // Start scanning animation
    setIsProcessing(true);
    setProcessStep(1);

    const steps = [
      "Extrayendo frecuencias F0...",
      "Calculando varianza Jitter & Shimmer...",
      "Identificando micro-temblores autonomos...",
      "Computando veredicto bioacústico final..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProcessStep(currentStep + 1);
      } else {
        clearInterval(interval);
        
        // Finalize Analysis Object
        const newAnalysis: AnalysisObj = {
          id: Date.now(),
          usuario_id: user.id,
          tipo: analysisType,
          duracion,
          archivo: selectedFile.name,
          referencia: "XEM-" + Math.floor(100000 + Math.random() * 900000),
          resultado: {
            emocion_detectada: ["honesto", "nerviosismo", "fatiga cognitiva", "incongruencia"][Math.floor(Math.random() * 4)],
            confianza: (Math.random() * 20 + 78).toFixed(1) + "%",
            veracidad: analysisType === "full" ? (Math.random() * 25 + 72).toFixed(1) + "%" : null,
            transcripcion: analysisType === "full" ? "Simulación de transcripción del audio analizado pericialmente por el motor bioacústico..." : null,
          },
          created_at: new Date().toISOString(),
        };

        const updatedAnalyses = [...analyses, newAnalysis];
        syncAnalysesInStorage(updatedAnalyses);

        // Deduct seconds / set free used
        const updatedUsers = users.map((u) =>
          u.id === user.id
            ? {
                ...u,
                uso_basico_inicial: true,
                segundos_consumidos: analysisType === "full" ? u.segundos_consumidos + duracion : u.segundos_consumidos,
              }
            : u
        );
        syncUsersInStorage(updatedUsers);

        // Update Session
        const refreshedUser = updatedUsers.find((u) => u.id === user.id);
        const session = {
          ...currentUser,
          user: { ...refreshedUser, passwordHash: undefined },
        };
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
        setCurrentUser(session);

        setIsProcessing(false);
        setSelectedFile(null);
        setSelectedAnalysis(newAnalysis);
      }
    }, 1200);
  };

  const userAnalyses = currentUser ? analyses.filter((a) => a.usuario_id === currentUser.user.id) : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* ==================== SUB-HEADER ==================== */}
      <nav className="bg-slate-950/80 border-b border-slate-900 sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
            <img src="/LogoWhap.png" alt="Xemotional" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-base tracking-tight">Xemotional App</span>
        </Link>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-400" />
                {currentUser.user.nombre_completo}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModal("login")}
              className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all shadow-md cursor-pointer"
            >
              🔑 Iniciar Sesión / Registrarse
            </button>
          )}
        </div>
      </nav>

      {/* ==================== CONTENT SECTION ==================== */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-6 md:p-8">
        
        {/* Alerts messages */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4.5 h-4.5" />
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="ml-auto hover:text-white cursor-pointer">×</button>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5" />
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage("")} className="ml-auto hover:text-white cursor-pointer">×</button>
          </div>
        )}

        {/* Dashboard View (Authenticated) */}
        {currentUser ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Stats and Dashboard (Left side) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-xl font-black text-white mb-1">
                    Hola, {currentUser.user.nombre_completo}
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    Gestiona tus peritajes bioacústicos de voz de forma confidencial.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
                    Plan Contratado
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-bold text-indigo-400">
                    Plan {PLANS[currentUser.user.plan as keyof typeof PLANS]?.name || "Trial"}
                  </div>
                </div>
              </div>

              {/* Progress Bars Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Segundos Totales
                  </span>
                  <span className="text-xl font-bold text-slate-200">
                    {currentUser.user.segundos_asignados} seg
                  </span>
                </div>
                <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Segundos Consumidos
                  </span>
                  <span className="text-xl font-bold text-indigo-400">
                    {currentUser.user.segundos_consumidos} seg
                  </span>
                </div>
                <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-5">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Análisis Ejecutados
                  </span>
                  <span className="text-xl font-bold text-emerald-400">
                    {userAnalyses.length}
                  </span>
                </div>
              </div>

              {/* Audio Uploader Box */}
              <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                  Analizador Bioacústico
                </h3>

                <label className="w-full max-w-md h-36 border border-dashed border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/70 rounded-xl flex flex-col items-center justify-center gap-3.5 cursor-pointer transition-all duration-300">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400">
                    <Upload className="w-5 h-5" />
                  </div>
                  {selectedFile ? (
                    <div>
                      <p className="text-xs font-bold text-slate-200">{selectedFile.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Clic para cambiar</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-slate-400">Arrastre un audio o haga clic para buscar</p>
                      <p className="text-[10px] text-slate-500 mt-1">Soporta WAV, MP3, M4A, OGG hasta 15MB</p>
                    </div>
                  )}
                </label>

                {selectedFile && (
                  <button
                    onClick={executeAnalysis}
                    className="btn-glow mt-6 px-8 py-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-colors cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Ejecutar Análisis Forense</span>
                  </button>
                )}
              </div>
            </div>

            {/* Past Analyses (Right side history) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-6 flex flex-col h-full min-h-[420px]">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-4">
                  <History className="w-4 h-4 text-slate-500" />
                  Historial de Peritajes
                </h3>

                <div className="flex flex-col gap-3 overflow-y-auto max-h-[360px] pr-2 flex-grow">
                  {userAnalyses.length > 0 ? (
                    [...userAnalyses].reverse().map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedAnalysis(item)}
                        className="p-3.5 rounded-xl border border-slate-900/60 hover:border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-mono text-slate-500">
                            {item.referencia}
                          </span>
                          <span className="text-xs font-bold text-slate-300 truncate mt-1">
                            {item.archivo}
                          </span>
                          <span className="text-[9px] font-semibold text-slate-500 mt-0.5">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-xs text-slate-600 font-semibold my-auto">
                      No has realizado ningún análisis de audio todavía.
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setPlanModal(true)}
                  className="mt-6 w-full text-center text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest border-t border-slate-900 pt-4 cursor-pointer"
                >
                  ⚡ Cambiar de Plan / Adquirir Segundos
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Unauthenticated Landing / Sales Screen */
          <div className="max-w-4xl mx-auto py-12 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase mb-4">
              Consola del Cliente
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Analizador Web de Audio Forense
            </h1>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl font-semibold mb-10">
              Accede a la interfaz pericial del modelo MV9-F. Extrae parámetros de estrés vocal, veracidad, jitter, shimmer y fatiga cognitiva de forma completamente autónoma con tu cuenta.
            </p>

            {/* Auth CTA Banner */}
            <div className="rounded-2xl border border-slate-900 bg-slate-950/60 p-8 max-w-lg w-full flex flex-col gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base mb-1">
                  Inicio de sesión requerido
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Para utilizar la consola del analizador y revisar reportes debes registrarte o autenticarte.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setAuthModal("login")}
                  className="flex-1 py-3 rounded-lg font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
                >
                  Entrar a mi Cuenta
                </button>
                <button
                  onClick={() => setAuthModal("register")}
                  className="flex-1 py-3 rounded-lg font-bold text-xs border border-slate-800 hover:border-slate-700 bg-slate-900/30 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Crear Cuenta Nueva
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================== MOCK AUTH MODALS ==================== */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8 relative">
            <button
              onClick={() => {
                setAuthModal(null);
                setErrorMessage("");
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold text-lg cursor-pointer"
            >
              ×
            </button>

            {authModal === "login" ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="text-center">
                  <h3 className="text-lg font-black text-white">Iniciar Sesión</h3>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Consola de Cliente Xemotional</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Contraseña</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
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
                  Entrar a la Consola
                </button>

                <p className="text-[11px] text-slate-500 text-center font-medium">
                  ¿No tienes una cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModal("register");
                      setErrorMessage("");
                    }}
                    className="text-indigo-400 hover:underline font-bold"
                  >
                    Registrarme gratis
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="text-center">
                  <h3 className="text-lg font-black text-white">Registro Gratuito</h3>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Crea una cuenta en segundos</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Juan Pérez"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Teléfono / Celular</label>
                  <input
                    type="tel"
                    value={registerTel}
                    onChange={(e) => setRegisterTel(e.target.value)}
                    placeholder="+52 555 123 4567"
                    className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Contraseña *</label>
                  <input
                    type="password"
                    required
                    value={registerPass}
                    onChange={(e) => setRegisterPass(e.target.value)}
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
                  Registrar mi Cuenta
                </button>

                <p className="text-[11px] text-slate-500 text-center font-medium">
                  ¿Ya tienes una cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModal("login");
                      setErrorMessage("");
                    }}
                    className="text-indigo-400 hover:underline font-bold"
                  >
                    Iniciar Sesión
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================== MOCK PROCESSING SCAN LOADER ==================== */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm p-6 text-center">
          <div className="w-full max-w-sm flex flex-col items-center gap-6">
            <div className="relative w-20 h-20 rounded-full border border-indigo-500/20 bg-slate-950 flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_60%)] animate-pulse" />
              <Activity className="w-8 h-8 text-indigo-400 animate-[bounce_1.5s_infinite]" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-indigo-500 origin-top animate-[spin_3s_linear_infinite]" />
            </div>

            <div>
              <h3 className="font-extrabold text-white text-base mb-1">
                Procesando Audio Forense
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Modelo MV9-F · IA Bioacústica
              </p>
            </div>

            {/* Stepped progress indicators */}
            <div className="flex flex-col gap-2 w-full text-xs font-semibold text-slate-400">
              <div className="flex items-center justify-between pb-1 border-b border-slate-900">
                <span>Filtro de Ruido & SNR</span>
                <span className={processStep >= 1 ? "text-emerald-400" : "text-slate-650"}>
                  {processStep >= 1 ? "COMPLETO" : "ESPERANDO"}
                </span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-900">
                <span>Frecuencia Fundamental F0</span>
                <span className={processStep >= 2 ? "text-emerald-400" : "text-slate-650"}>
                  {processStep >= 2 ? "COMPLETO" : "ESPERANDO"}
                </span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-900">
                <span>Varianza Jitter & Shimmer</span>
                <span className={processStep >= 3 ? "text-emerald-400" : "text-slate-650"}>
                  {processStep >= 3 ? "COMPLETO" : "ESPERANDO"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estrés Autónomo & Veredicto</span>
                <span className={processStep >= 4 ? "text-emerald-400" : "text-slate-650"}>
                  {processStep >= 4 ? "COMPLETO" : "ESPERANDO"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MOCK ANALYSIS DETAILS MODAL ==================== */}
      {selectedAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden relative shadow-2xl">
            
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-900">
              <span className="text-[10px] font-bold tracking-widest text-slate-400">
                REPORTE DETALLADO
              </span>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="text-slate-500 hover:text-white font-bold text-lg cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase font-mono">
                  Referencia del Caso
                </span>
                <span className="text-sm font-extrabold text-slate-200">
                  {selectedAnalysis.referencia}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-slate-900 py-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Archivo</span>
                  <span className="text-xs font-extrabold text-slate-350 truncate mt-1">
                    {selectedAnalysis.archivo}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Duración</span>
                  <span className="text-xs font-extrabold text-slate-350 mt-1">
                    {selectedAnalysis.duracion} segundos
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-450 uppercase">
                    Indicador Emocional
                  </span>
                  <span className="text-xs font-bold text-indigo-400 capitalize">
                    {selectedAnalysis.resultado.emocion_detectada}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-450 uppercase">
                    Confianza del Modelo
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    {selectedAnalysis.resultado.confianza}
                  </span>
                </div>

                {selectedAnalysis.tipo === "full" ? (
                  <>
                    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-emerald-450 uppercase">
                        Veredicto Veracidad (F0)
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {selectedAnalysis.resultado.veracidad}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/50 flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-slate-450 uppercase">
                        Transcripción Certificada
                      </span>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        {selectedAnalysis.resultado.transcripcion}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/5 text-center">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mb-1">
                      Reporte Limitado (Trial)
                    </span>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                      Adquiera un plan premium para desbloquear la transcripción del audio y el veredicto porcentual de veracidad.
                    </p>
                  </div>
                )}
              </div>

            </div>

            <div className="bg-slate-900/60 px-6 py-4 flex justify-end border-t border-slate-900">
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg font-bold text-xs cursor-pointer"
              >
                Cerrar Reporte
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================== MOCK PLAN SWITCHER MODAL ==================== */}
      {planModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden relative shadow-2xl">
            
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-900">
              <span className="text-[10px] font-bold tracking-widest text-slate-400">
                ADQUIRIR PLAN / SEGUNDOS DE ANÁLISIS
              </span>
              <button
                onClick={() => setPlanModal(false)}
                className="text-slate-500 hover:text-white font-bold text-lg cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Plan 1 */}
              <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/40 flex flex-col items-center text-center">
                <span className="text-[9px] font-extrabold uppercase text-slate-500 mb-1">Básico</span>
                <span className="text-2xl font-bold text-white mb-2">$5</span>
                <span className="text-xs text-indigo-400 font-bold mb-4">60 Segundos de Audio</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mb-6 flex-grow">
                  Extracción de parámetros bioacústicos básicos y veredicto de veracidad.
                </p>
                <button
                  onClick={() => handleSelectPlan("basic_60")}
                  className="w-full py-2 bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Activar Plan
                </button>
              </div>

              {/* Plan 2 */}
              <div className="p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 flex flex-col items-center text-center relative">
                <div className="absolute top-3 right-3 text-[8px] font-extrabold text-indigo-400 tracking-wider uppercase border border-indigo-400/25 bg-indigo-400/5 px-1.5 py-0.5 rounded">
                  Recomendado
                </div>
                <span className="text-[9px] font-extrabold uppercase text-indigo-400 mb-1">Estándar</span>
                <span className="text-2xl font-bold text-white mb-2">$20</span>
                <span className="text-xs text-indigo-400 font-bold mb-4">300 Segundos de Audio</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mb-6 flex-grow">
                  Reporte completo, transcripción, diarización de hablantes y veredicto.
                </p>
                <button
                  onClick={() => handleSelectPlan("standard_300")}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Activar Plan
                </button>
              </div>

              {/* Plan 3 */}
              <div className="p-5 rounded-xl border border-slate-900 bg-slate-950/40 flex flex-col items-center text-center">
                <span className="text-[9px] font-extrabold uppercase text-slate-500 mb-1">Pro</span>
                <span className="text-2xl font-bold text-white mb-2">$150</span>
                <span className="text-xs text-indigo-400 font-bold mb-4">3,600 Segundos de Audio</span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mb-6 flex-grow">
                  Para firmas de abogados, agencias de seguridad y peritos especializados.
                </p>
                <button
                  onClick={() => handleSelectPlan("pro_3600")}
                  className="w-full py-2 bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Activar Plan
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-FOOTER ==================== */}
      <footer className="bg-slate-950 border-t border-slate-900 px-6 py-6 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Xemotional · Cero datos almacenados en disco</span>
      </footer>

    </div>
  );
}
