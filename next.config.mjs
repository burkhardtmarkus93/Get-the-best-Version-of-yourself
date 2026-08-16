/** @type {import('next').NextConfig} */
const nextConfig = {
  // Kein ESLint-Setup in diesem Prototyp — ohne diese Zeile fragt
  // `next build` beim ersten Lauf interaktiv nach einer ESLint-Konfig
  // bzw. scheitert in nicht-interaktiven Umgebungen (CI) daran.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
