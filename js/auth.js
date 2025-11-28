/**
 * AUTH - Gestión de autenticación
 * Maneja login, registro y sesiones de usuario
 */

class AuthManager {
    constructor() {
        this.currentUser = storage.get('user');
        this.sessionToken = storage.get('token');
    }

    /**
     * Registro de nuevo usuario
     */
    register(userData) {
        const { email, password, firstName, lastName, confirmPassword } = userData;

        // Validaciones
        if (!this.validateEmail(email)) {
            return { success: false, error: 'El correo electrónico no es válido' };
        }

        if (password.length < 6) {
            return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
        }

        if (password !== confirmPassword) {
            return { success: false, error: 'Las contraseñas no coinciden' };
        }

        if (!firstName || !lastName) {
            return { success: false, error: 'El nombre y apellido son requeridos' };
        }

        // Verificar si el usuario ya existe
        const existingUser = storage.get(`user_${email}`);
        if (existingUser) {
            return { success: false, error: 'Este correo electrónico ya está registrado' };
        }

        // Crear usuario
        const user = {
            id: this.generateUUID(),
            email,
            firstName,
            lastName,
            password: this.hashPassword(password),
            phone: '',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            timezone: 'America/Bogota',
            language: 'es',
            isActive: true,
            emailVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Guardar usuario
        storage.set(`user_${email}`, user);
        storage.set('user', user);

        const token = this.generateToken();
        storage.set('token', token);

        this.currentUser = user;
        this.sessionToken = token;

        return {
            success: true,
            user,
            token,
            message: 'Registro exitoso'
        };
    }

    /**
     * Login de usuario
     */
    login(email, password) {
        // Validar email
        if (!this.validateEmail(email)) {
            return { success: false, error: 'El correo electrónico no es válido' };
        }

        if (!password) {
            return { success: false, error: 'La contraseña es requerida' };
        }

        // Buscar usuario
        const user = storage.get(`user_${email}`);
        if (!user) {
            return { success: false, error: 'El usuario no existe' };
        }

        // Verificar contraseña
        if (!this.verifyPassword(password, user.password)) {
            return { success: false, error: 'Contraseña incorrecta' };
        }

        const token = this.generateToken();
        storage.set('token', token);
        storage.set('user', user);

        this.currentUser = user;
        this.sessionToken = token;

        // Actualizar último login
        user.lastLoginAt = new Date().toISOString();
        storage.set(`user_${email}`, user);

        return {
            success: true,
            user,
            token,
            message: 'Inicio de sesión exitoso'
        };
    }

    /**
     * Logout
     */
    logout() {
        storage.remove('user');
        storage.remove('token');
        this.currentUser = null;
        this.sessionToken = null;
        return { success: true, message: 'Sesión cerrada' };
    }

    /**
     * Obtener usuario actual
     */
    getCurrentUser() {
        return this.currentUser || storage.get('user');
    }

    /**
     * Verificar si está autenticado
     */
    isAuthenticated() {
        const user = this.getCurrentUser();
        const token = storage.get('token');
        return !!(user && token);
    }

    /**
     * Validar formato de email
     */
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Hash simple para contraseña (en producción usar bcrypt)
     */
    hashPassword(password) {
        return btoa(password);
    }

    /**
     * Verificar contraseña
     */
    verifyPassword(password, hash) {
        return btoa(password) === hash;
    }

    /**
     * Generar UUID simple
     */
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    /**
     * Generar token
     */
    generateToken() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        return `token_${timestamp}_${random}`;
    }

    /**
     * Actualizar perfil
     */
    updateProfile(userData) {
        const user = this.getCurrentUser();
        if (!user) {
            return { success: false, error: 'Usuario no autenticado' };
        }

        const oldEmail = user.email;
        const updatedUser = {
            ...user,
            ...userData,
            updatedAt: new Date().toISOString()
        };

        // Si cambió el email, actualizar referencias
        if (userData.email && userData.email !== oldEmail) {
            storage.remove(`user_${oldEmail}`);
            storage.set(`user_${userData.email}`, updatedUser);
        } else {
            storage.set(`user_${oldEmail}`, updatedUser);
        }

        storage.set('user', updatedUser);
        this.currentUser = updatedUser;

        return { success: true, user: updatedUser, message: 'Perfil actualizado' };
    }

    /**
     * Cambiar contraseña
     */
    changePassword(currentPassword, newPassword, confirmPassword) {
        const user = this.getCurrentUser();
        if (!user) {
            return { success: false, error: 'Usuario no autenticado' };
        }

        if (!this.verifyPassword(currentPassword, user.password)) {
            return { success: false, error: 'La contraseña actual es incorrecta' };
        }

        if (newPassword !== confirmPassword) {
            return { success: false, error: 'Las nuevas contraseñas no coinciden' };
        }

        if (newPassword.length < 6) {
            return { success: false, error: 'La nueva contraseña debe tener al menos 6 caracteres' };
        }

        user.password = this.hashPassword(newPassword);
        user.updatedAt = new Date().toISOString();

        storage.set(`user_${user.email}`, user);
        storage.set('user', user);

        return { success: true, message: 'Contraseña cambiada exitosamente' };
    }
}

// Instancia global
const auth = new AuthManager();
