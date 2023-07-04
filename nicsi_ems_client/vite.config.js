import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import eslintPlugin from "vite-plugin-eslint";

const dotEnvReplacement = (env) => {
  const replacement = Object.entries(env).reduce((obj, [key, val]) => {
    obj[`process.env.${key}`] = `"${val}"`;
    return obj;
  }, {});
  return {
    name: "EMS-dotenv",
    config(obj) {
      obj.define = obj.define || {};
      Object.assign(obj.define, replacement);
    },
  };
};

// https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     optimizeDeps: {
//         exclude: ["js-big-decimal"],
//     },
// });

export default defineConfig(({ mode }) => {
  let env;
  switch (mode) {
    case "development":
      env = dotenv.config().parsed;
      break;
    case "production":
      env = dotenv.config({ path: "./.env.prod" }).parsed;
      break;
    default:
      env = {};
  }
  // env = { ...process.env, ...env };
  env = { ...env, MODE: mode };
  return {
    plugins: [react(), eslintPlugin(), dotEnvReplacement(env)],
    optimizeDeps: {
      exclude: ["js-big-decimal"],
    },
  };
});
