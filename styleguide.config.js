const path = require("path");
const webpackConfig = require("@tandem.ly/react-scripts/config/webpack.config.dev.js");

module.exports = {
  components: "src/components/**/[A-Z]*.js",
  ignore: [
    "**/__tests__/*",
    "**/*.test.js",
    "**/*.test.jsx",
    "**/test.js",
    "**/*.spec.js",
    "**/__snapshots__/*",
    "src/app/components/**/index.js",
    "src/app/components/styleguide/*",
    "src/app/containers/**/*",
  ],
  require: [
    // The Application's specific styles
    path.join(__dirname, "src/app/styles/index.scss"),
    // Styles solely for react-styleguide
    path.join(__dirname, "src/app/styleguide/styles/styles.css")
  ],
  styleguideComponents: {
    Logo: path.join(__dirname, "src/app/styleguide/components/Logo.js"),
    DisplayRedux: path.join(__dirname, 'src/app/util/component-utils/DisplayRedux.js'),
    DisplayReactRouter: path.join(__dirname, 'src/app/util/component-utils/DisplayReactRouter.js'),
    ErrorBoundary: path.join(__dirname, 'src/app/containers/ErrorBoundary.js'),
  },
  context: {
    account: path.resolve(__dirname, 'src/app/fixtures/account.js'),
    transactions: path.resolve(__dirname, 'src/app/fixtures/transactions.js'),
    users: path.resolve(__dirname, 'src/app/fixtures/users.js'),
  },
  template: path.join(__dirname, "src/app/styleguide/template.html"),
  assetsDir: "",
  showCode: true,
  showUsage: true,
  sections: [
    {
      name: "Introduction",
      content: "src/app/styleguide/intro.md",
      isolated: true
    },
    {
      name: "Typography",
      content: "src/app/styleguide/typography.md",
      isolatedSection: true
    },
    {
      name: "Colors",
      content: "src/app/styleguide/colors.md",
      isolatedSection: true
    },
    {
      name: "Components",
      components: "src/app/components/**/[A-Z]*.js",
      isolatedSection: true
    },
    {
      name: "Containers",
      components: "src/app/containers/**/[A-Z]*.js",
      isolatedSection: true
    },
    {
      name: "Utility",
      components: "src/app/util/**/[A-Z]*.js",
      isolatedSection: true
    }
  ],
  webpackConfig: webpackConfig
};
