/**
 * PAGES - Componentes de páginas
 * Define la estructura HTML de cada página
 */

// ====================================
// LOGIN
// ====================================
function LoginPage() {
    return `
        <div class="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                <!-- Logo/Header -->
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                        <span class="text-3xl font-bold text-gradient">AH</span>
                    </div>
                    <h1 class="text-3xl font-bold text-white mb-2">AcademyHub</h1>
                    <p class="text-blue-100">Tu gestión académica simplificada</p>
                </div>

                <!-- Form Card -->
                <div class="bg-white rounded-2xl shadow-xl p-6 mb-4">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Inicia Sesión</h2>

                    <!-- Error Alert -->
                    <div id="loginError" class="hidden alert alert-danger mb-4"></div>

                    <form id="loginForm" class="space-y-4">
                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="loginEmail"
                                placeholder="ejemplo@correo.com"
                                class="input-field"
                                required
                            />
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="loginPassword"
                                placeholder="Ingresa tu contraseña"
                                class="input-field"
                                required
                            />
                        </div>

                        <!-- Remember me -->
                        <div class="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                class="w-4 h-4 text-blue-600 rounded cursor-pointer"
                            />
                            <label for="rememberMe" class="ml-2 text-sm text-gray-600 cursor-pointer">
                                Recuérdame
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="btn-primary mt-6">
                            Iniciar Sesión
                        </button>
                    </form>

                    <!-- Divider -->
                    <div class="relative my-6">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500">O continúa con</span>
                        </div>
                    </div>

                    <!-- Social Login -->
                    <div class="grid grid-cols-2 gap-3">
                        <button type="button" class="btn-secondary py-2 flex items-center justify-center gap-2">
                            <span>🔵</span> Google
                        </button>
                        <button type="button" class="btn-secondary py-2 flex items-center justify-center gap-2">
                            <span>⚫</span> GitHub
                        </button>
                    </div>
                </div>

                <!-- Sign up link -->
                <div class="text-center">
                    <p class="text-white">¿No tienes cuenta?
                        <button onclick="goTo('/register')" class="font-semibold hover:underline">
                            Regístrate
                        </button>
                    </p>
                </div>

                <!-- Footer -->
                <div class="text-center mt-8 text-blue-100 text-xs">
                    <p>© 2024 AcademyHub. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    `;
}

// ====================================
// REGISTER
// ====================================
function RegisterPage() {
    return `
        <div class="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                        <span class="text-3xl font-bold text-gradient">AH</span>
                    </div>
                    <h1 class="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
                    <p class="text-blue-100">Únete a AcademyHub hoy</p>
                </div>

                <!-- Form Card -->
                <div class="bg-white rounded-2xl shadow-xl p-6 mb-4">
                    <!-- Error Alert -->
                    <div id="registerError" class="hidden alert alert-danger mb-4"></div>

                    <!-- Success Alert -->
                    <div id="registerSuccess" class="hidden alert alert-success mb-4"></div>

                    <form id="registerForm" class="space-y-4">
                        <!-- First Name -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Tu nombre"
                                class="input-field"
                                required
                            />
                        </div>

                        <!-- Last Name -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Apellido
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Tu apellido"
                                class="input-field"
                                required
                            />
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="registerEmail"
                                placeholder="ejemplo@correo.com"
                                class="input-field"
                                required
                            />
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="registerPassword"
                                placeholder="Mínimo 6 caracteres"
                                class="input-field"
                                required
                            />
                        </div>

                        <!-- Confirm Password -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirma tu contraseña"
                                class="input-field"
                                required
                            />
                        </div>

                        <!-- Terms -->
                        <div class="flex items-start">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                class="w-4 h-4 text-blue-600 rounded cursor-pointer mt-1"
                                required
                            />
                            <label for="acceptTerms" class="ml-2 text-sm text-gray-600 cursor-pointer">
                                Acepto los <a href="#" class="text-blue-600 hover:underline">Términos de Servicio</a>
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="btn-primary mt-6">
                            Crear Cuenta
                        </button>
                    </form>
                </div>

                <!-- Login link -->
                <div class="text-center">
                    <p class="text-white">¿Ya tienes cuenta?
                        <button onclick="goTo('/login')" class="font-semibold hover:underline">
                            Inicia Sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Inicializadores de páginas
function initLogin() {
    const form = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Validar
        if (!email || !password) {
            showError(errorDiv, 'Por favor completa todos los campos');
            return;
        }

        // Login
        const result = auth.login(email, password);

        if (result.success) {
            // Mostrar mensaje de éxito
            showSuccess(errorDiv, result.message);
            
            // Redirigir al dashboard
            setTimeout(() => {
                goTo('/dashboard');
            }, 1000);
        } else {
            showError(errorDiv, result.error);
        }
    });
}

function initRegister() {
    const form = document.getElementById('registerForm');
    const errorDiv = document.getElementById('registerError');
    const successDiv = document.getElementById('registerSuccess');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validar
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showError(errorDiv, 'Por favor completa todos los campos');
            return;
        }

        // Registrar
        const result = auth.register({
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        });

        if (result.success) {
            showSuccess(successDiv, result.message);
            
            // Limpiar formulario
            form.reset();

            // Redirigir al login
            setTimeout(() => {
                goTo('/dashboard');
            }, 1500);
        } else {
            showError(errorDiv, result.error);
        }
    });
}

// Funciones helper
function showError(element, message) {
    element.textContent = message;
    element.classList.remove('hidden');
    element.classList.add('alert-danger');
}

function showSuccess(element, message) {
    element.textContent = message;
    element.classList.remove('hidden', 'alert-danger');
    element.classList.add('alert-success');
}
