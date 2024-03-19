import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,

  e2e: {
    baseUrl: process.env.NEXTAUTH_URL,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
