/**
 * ROUTER - Sistema de enrutamiento SPA
 * Maneja la navegación entre páginas sin recargar
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.appContainer = document.getElementById('app');
    }

    /**
     * Registrar una ruta
     */
    register(path, component) {
        this.routes[path] = component;
    }

    /**
     * Navegar a una ruta
     */
    navigate(path) {
        if (!this.routes[path]) {
            console.warn(`Ruta no encontrada: ${path}`);
            this.navigate('/login');
            return;
        }

        // Verificar autenticación para rutas protegidas
        if (path !== '/login' && path !== '/register' && !auth.isAuthenticated()) {
            this.navigate('/login');
            return;
        }

        this.currentRoute = path;
        const component = this.routes[path];

        // Limpiar contenedor
        this.appContainer.innerHTML = '';

        // Renderizar componente
        const html = typeof component === 'function' ? component() : component;
        this.appContainer.innerHTML = html;

        // Ejecutar scripts asociados a la página
        this.executeRouteScripts(path);

        // Scroll al top
        window.scrollTo(0, 0);
    }

    /**
     * Ejecutar scripts de la ruta
     */
    executeRouteScripts(path) {
        // Los scripts se ejecutarán después de que el DOM esté listo
        setTimeout(() => {
            const script = window[`init${this.camelCase(path)}`];
            if (typeof script === 'function') {
                script();
            }
        }, 0);
    }

    /**
     * Convertir a camelCase
     */
    camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\//g, '').replace(/-/g, '');
    }

    /**
     * Obtener ruta actual
     */
    getCurrentRoute() {
        return this.currentRoute;
    }
}

// Instancia global
const router = new Router();

/**
 * Función helper para navegar
 */
function goTo(path) {
    router.navigate(path);
}
