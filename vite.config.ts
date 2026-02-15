import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default ({ mode }: any) => {
  // Charge le .env
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react(), tailwindcss()],
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_BASE_URL), // Variable dispo partout
    }
  });
};
