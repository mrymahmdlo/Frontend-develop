import { defineConfig } from 'cypress';
import path from 'path';

export default defineConfig({
  env:
    process.env.INSTRUMENT_COVERAGE === 'true'
      ? {
          codeCoverage: {
            url: '/api/__coverage__'
          }
        }
      : {},
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'http://localhost:3000',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    }
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src')
          }
        }
      }
    }
  }
});
