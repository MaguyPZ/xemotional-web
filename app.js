/**
 * AudioAnalyzer Pro - Mock Authentication & Data Management System
 * Simulates a complete backend using localStorage
 */

// ==================== CONSTANTS ====================
const STORAGE_KEYS = {
    USERS: 'audioanalyzer_users',
    CURRENT_USER: 'audioanalyzer_current_user',
    AUDIO_ANALYSES: 'audioanalyzer_analyses',
    ADMIN_USER: 'audioanalyzer_admin'
};

const ADMIN_CREDENTIALS = {
    email: 'admin@audioanalyzer.com',
    password: 'admin123',
    nombre_completo: 'Administrador del Sistema',
    role: 'admin'
};

const PLANS = {
    trial: { name: 'Trial', segundos: 0, precio: 0 },
    basic_60: { name: 'Básico', segundos: 60, precio: 5 },
    standard_300: { name: 'Estándar', segundos: 300, precio: 20 },
    pro_3600: { name: 'Pro', segundos: 3600, precio: 150 }
};

// ==================== DATA MANAGEMENT ====================

/**
 * Initialize storage with sample data if empty
 */
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        const sampleUsers = [
            {
                id: 1,
                nombre_completo: 'Juan Pérez',
                email: 'juan@ejemplo.com',
                telefono: '+52 555 123 4567',
                password: hashPassword('password123'),
                es_invitado: false,
                uso_basico_inicial: true,
                plan: 'standard_300',
                plan_activo: true,
                segundos_asignados: 300,
                segundos_consumidos: 145,
                estado: 'activo',
                created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                last_login: new Date().toISOString()
            },
            {
                id: 2,
                nombre_completo: 'María García',
                email: 'maria@ejemplo.com',
                telefono: '+52 555 987 6543',
                password: hashPassword('password123'),
                es_invitado: false,
                uso_basico_inicial: false,
                plan: 'trial',
                plan_activo: false,
                segundos_asignados: 0,
                segundos_consumidos: 0,
                estado: 'activo',
                created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                last_login: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                nombre_completo: 'Carlos Rodríguez',
                email: 'carlos@ejemplo.com',
                telefono: '+52 555 456 7890',
                password: hashPassword('password123'),
                es_invitado: false,
                uso_basico_inicial: true,
                plan: 'pro_3600',
                plan_activo: true,
                segundos_asignados: 3600,
                segundos_consumidos: 892,
                estado: 'activo',
                created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                last_login: new Date().toISOString()
            }
        ];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(sampleUsers));
    }

    if (!localStorage.getItem(STORAGE_KEYS.AUDIO_ANALYSES)) {
        localStorage.setItem(STORAGE_KEYS.AUDIO_ANALYSES, JSON.stringify([]));
    }
}

// Simple password hashing (not secure, just for demo)
function hashPassword(password) {
    return btoa(password + '_salt_audioanalyzer');
}

function verifyPassword(password, hash) {
    return hashPassword(password) === hash;
}

// ==================== USER MANAGEMENT ====================

function getUsers() {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getUserById(id) {
    const users = getUsers();
    return users.find(u => u.id === parseInt(id));
}

function getUserByEmail(email) {
    const users = getUsers();
    return users.find(u => u.email === email);
}

function createUser(userData) {
    const users = getUsers();

    // Check if email already exists
    if (getUserByEmail(userData.email)) {
        throw new Error('Este correo electrónico ya está registrado');
    }

    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        nombre_completo: userData.nombre_completo,
        email: userData.email,
        telefono: userData.telefono || '',
        password: hashPassword(userData.password),
        es_invitado: false,
        uso_basico_inicial: false,
        plan: 'trial',
        plan_activo: false,
        segundos_asignados: 0,
        segundos_consumidos: 0,
        estado: 'activo',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
}

function updateUser(id, updates) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    users[index] = { ...users[index], ...updates };
    saveUsers(users);

    return users[index];
}

function deleteUser(id) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    // Soft delete
    users[index].estado = 'eliminado';
    saveUsers(users);

    return true;
}

function activatePlan(userId, planType) {
    const plan = PLANS[planType];
    if (!plan) {
        throw new Error('Plan no válido');
    }

    return updateUser(userId, {
        plan: planType,
        plan_activo: true,
        segundos_asignados: plan.segundos,
        segundos_consumidos: 0
    });
}

// ==================== AUTHENTICATION ====================

function login(email, password) {
    // Check for admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminSession = {
            user: ADMIN_CREDENTIALS,
            token: 'admin_token_' + Date.now(),
            loginAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminSession));
        return adminSession;
    }

    // Regular user login
    const user = getUserByEmail(email);

    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    if (user.estado !== 'activo') {
        throw new Error('Tu cuenta está inactiva. Contacta a soporte.');
    }

    if (!verifyPassword(password, user.password)) {
        throw new Error('Credenciales inválidas');
    }

    // Update last login
    updateUser(user.id, { last_login: new Date().toISOString() });

    const session = {
        user: { ...user, password: undefined }, // Don't store password in session
        token: 'user_token_' + Date.now(),
        loginAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
    return session;
}

function register(userData) {
    const newUser = createUser(userData);

    // Auto-login after registration
    const session = {
        user: { ...newUser, password: undefined },
        token: 'user_token_' + Date.now(),
        loginAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
    return session;
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

function getCurrentUser() {
    const session = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return session ? JSON.parse(session) : null;
}

function isAuthenticated() {
    return getCurrentUser() !== null;
}

function isAdmin() {
    const session = getCurrentUser();
    return session && session.user.role === 'admin';
}

// ==================== AUDIO ANALYSIS ====================

function analyzeAudio(userId, audioData, analysisType = 'basic') {
    const user = getUserById(userId);

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Check if basic analysis already used
    if (analysisType === 'basic' && user.uso_basico_inicial) {
        throw new Error('Ya utilizaste tu análisis básico gratuito. Por favor, activa un plan.');
    }

    // Check if user has enough seconds for full analysis
    if (analysisType === 'full') {
        if (!user.plan_activo) {
            throw new Error('Necesitas activar un plan para análisis completos');
        }

        const segundosRestantes = user.segundos_asignados - user.segundos_consumidos;
        if (segundosRestantes < audioData.duracion) {
            throw new Error('No tienes suficientes segundos disponibles');
        }
    }

    // Create analysis record
    const analysis = {
        id: Date.now(),
        usuario_id: userId,
        tipo: analysisType,
        duracion: audioData.duracion,
        archivo: audioData.nombre,
        referencia: audioData.referencia || 'audio_' + Date.now(),
        resultado: {
            emocion_detectada: ['neutral', 'feliz', 'triste', 'enojado', 'ansioso'][Math.floor(Math.random() * 5)],
            confianza: (Math.random() * 0.4 + 0.6).toFixed(2),
            veracidad: analysisType === 'full' ? (Math.random() * 0.5 + 0.5).toFixed(2) : null,
            transcripcion: analysisType === 'full' ? 'Transcripción de ejemplo del audio...' : null
        },
        created_at: new Date().toISOString()
    };

    // Save analysis
    const analyses = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIO_ANALYSES) || '[]');
    analyses.push(analysis);
    localStorage.setItem(STORAGE_KEYS.AUDIO_ANALYSES, JSON.stringify(analyses));

    // Update user consumption
    const updates = {
        uso_basico_inicial: analysisType === 'basic' ? true : user.uso_basico_inicial,
        segundos_consumidos: analysisType === 'full'
            ? user.segundos_consumidos + audioData.duracion
            : user.segundos_consumidos
    };

    updateUser(userId, updates);

    return analysis;
}

function getUserAnalyses(userId) {
    const analyses = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIO_ANALYSES) || '[]');
    return analyses.filter(a => a.usuario_id === parseInt(userId));
}

// ==================== STATISTICS ====================

function getSystemStats() {
    const users = getUsers();
    const analyses = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIO_ANALYSES) || '[]');

    const activeUsers = users.filter(u => u.estado === 'activo');
    const usersWithPlans = users.filter(u => u.plan_activo);
    const totalSecondsConsumed = users.reduce((sum, u) => sum + u.segundos_consumidos, 0);

    const today = new Date().toDateString();
    const analysesToday = analyses.filter(a =>
        new Date(a.created_at).toDateString() === today
    );

    return {
        totalUsers: users.length,
        activeUsers: activeUsers.length,
        usersWithPlans: usersWithPlans.length,
        totalSecondsConsumed,
        totalAnalyses: analyses.length,
        analysesToday: analysesToday.length,
        planDistribution: {
            trial: users.filter(u => u.plan === 'trial').length,
            basic_60: users.filter(u => u.plan === 'basic_60').length,
            standard_300: users.filter(u => u.plan === 'standard_300').length,
            pro_3600: users.filter(u => u.plan === 'pro_3600').length
        }
    };
}

// ==================== INITIALIZATION ====================

// Initialize on load
initializeStorage();

// Export functions for use in HTML pages
window.AudioAnalyzerApp = {
    // Auth
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated,
    isAdmin,

    // Users
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    activatePlan,

    // Audio
    analyzeAudio,
    getUserAnalyses,

    // Stats
    getSystemStats,

    // Constants
    PLANS,
    ADMIN_CREDENTIALS
};
