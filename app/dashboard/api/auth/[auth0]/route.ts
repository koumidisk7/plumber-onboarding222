import { handleAuth ,handleLogin } from '@auth0/nextjs-auth0';
export const GET = handleAuth()
// export const GET = handleAuth({
//     async login(req, res) {
//       await handleLogin(req, res, {
//         returnTo: AUTH0_BASE_URL_DASHBOARD,
//       });
//     },
//   });

