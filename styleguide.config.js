const path = require("path");
const webpackConfig = require("@tandem.ly/react-scripts/config/webpack.config.dev.js");

module.exports = {
  components: "src/components/**/[A-Z]*.js",
  ignore: [
    "**/__tests__/*",
    "**/*.test.js",
    "**/*.test.jsx",
    "**/*.spec.js",
    "src/components/**/index.js",
    "src/components/styleguide/*"
  ],
  require: [
    // The Application's specific styles
    path.join(__dirname, "src/styles/index.css"),
    // Styles solely for react-styleguide
    path.join(__dirname, "src/styleguide/styles/styles.css")
  ],
  styleguideComponents: {
    Logo: path.join(__dirname, "src/styleguide/components/Logo.js")
  },
  template: path.join(__dirname, "src/styleguide/template.html"),
  assetsDir: "./src/images",
  showCode: true,
  showUsage: true,
  sections: [
    {
      name: "Introduction",
      content: "src/styleguide/intro.md",
      isolated: true
    },
    {
      name: "Typography",
      content: "src/styleguide/typography.md",
      isolatedSection: true
    },
    {
      name: "Colors",
      content: "src/styleguide/colors.md",
      isolatedSection: true
    },
    {
      name: "Components",
      components: "src/components/**/[A-Z]*.js",
      isolatedSection: true
    },
    {
      name: "Containers",
      components: "src/containers/**/[A-Z]*.js",
      isolatedSection: true
    },
    {
      name: "Utility",
      components: "src/util/**/[A-Z]*.js",
      isolatedSection: true
    }
  ],
  webpackConfig: webpackConfig
};
