This styleguide is intended for designers and developers to be a living document of
the specific branding, styles, components and patterns used through out the project.
This styleguide is generated from source files and from static documentation files
found in the `docs/` folder at the top level of the project root.

We're using [React Styleguidist](https://react-styleguidist.js.org/) for generating 
this styleguide automatically from source.  Each component or set of related 
components will have it's own section within the styleguide. You can read the docs
for the React Styleguidist project for more details.

## Build & Installation
This project uses `create-react-app` to scaffold the application.  You can clone the project from github and
use the usual commands to start the application locally. Once cloned, cd into the project directory and run
the following to start the application.

```sh
$ yarn install
$ npm start
```

To build and run this styleguide locally, use the following:
```sh
$ npm run styleguide
```

If you make changes to the `styleguide.config.js` file in the root repository or modify any of the custom
styleguide components, be sure and restart the styleguide to see the changes.

## CSS Framework
This project is using the [Bulma CSS framework](http://bulma.io/documentation/overview/start/) as
a base framework for building custom styles and applications. All styles for the application are written using SCSS.

The application can customize the styles and elements provided by Bulma in two ways:

1. Adding custom styles or overriding Bulma styles through inclusion of new styles added in the `src/styles/` folder.  The application provides a `custom_variables.scss` which allows the projec to override Bulma variables/styles and may define global application wide styles within this directory (`@import`ed into the `src/styles/index.scss`).
2. Using CSS Modules at the React Component level.  This allows each React Component to include it's own specific styles (_these should be layout focused and not presentation_).  Those local CSS Modules also use SCSS syntax and are imported directly into the React Component `.js`. 

## Project Organization
The general setup for the projet is a `create-react-app` project, with the 
usual folder structures.  The additional folder structure used by the project is described below:

| Folder             | Description   |
| :---               | :---          |
| `/src/`             | top level source folder |
| ` |-components/`   | all ui/presentational components |
| ` |-containers/`   | smart/container components strictly for state management |
| ` |-images/`       | images for importing directly into `.js` files |
| ` |-styles/`       | custom and overridding styles for application |
| ` |-styleguide/`   | contains all styleguide related files/components |
| ` |  |- components/` | customized Styleguidist components for rendering the styleguide |
| ` |  |- styles/`   | styles specific to the styleguide only |
| `` |  `- *.md/`` | static styleguide sections not-generated from components |
| `` `-util/``       | HOCs and other app-wide utilities |
| `/server/`          | \[*optional*\] if the application needs a node server it should go here |

Images not imported directly into a `.js` file should be added to the `/public/images` folder and referenced using the `%PUBLIC_URL%` token provided by `create-react-app` for `.html` files or the `process.env.PUBLIC_URL` environment variable in Javascript code. 

