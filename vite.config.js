import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vite.dev/config/
export default defineConfig({
    base: "/pagenerate/",
    plugins: [
        react(),
        nodePolyfills({
            // To exclude specific polyfills, add them to this list.
            exclude: [
            // 'fs',
            ],
            // Whether to polyfill specific globals.
            globals: {
                Buffer: true,
                global: true,
                process: true,
            },
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    optimizeDeps: {
        include: ["react", "react-dom", "react-router-dom", "@mui/material"],
    },
    build: {
        sourcemap: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        outDir: "build",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: fileURLToPath(new URL("./index.html", import.meta.url)),
                404: fileURLToPath(new URL("./public/404.html", import.meta.url)),
            },
        },
    },
    envPrefix: "VITE_", // Make sure Vite picks up our env variables
});
