/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
const publicRoutes = ['/', '/api/auth'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to the home page.
 * @type {string[]}
 */
const authRoutes = ['/auth', '/autenticacion'];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
const API_AUTH_PREFIX = '/api/auth';

export { publicRoutes, authRoutes, API_AUTH_PREFIX };
