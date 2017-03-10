# 4xxi frontend boilerplate project

## Documentation

This project uses `yarn` as a package manager.
You should install yarn globally before you start working with project:
`npm i -g yarn`
(maybe you should use `sudo` - it depends on how NodeJS installed in your env).

After that use:

* `yarn` - to install project dependencies
* `yarn run dev` - to run webpack-dev-server for local development
* `yarn run build` - to get a ready bundle with source-map in `/build/` folder

After installing dependencies, please run `bin/install-git-hooks.sh`.
This comand will install [git pre-commit hook](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks) into your local git repository.
This hook will check before each commit if your JS- and CSS- changes are comply to our styleguides.
If they're not - you'll see a list of error and warnings, and your commit will not be accepted by git, until you'd fix all of them.

We're also have `.editorconfig` file in our repository, which is a great way to sync whitespace settings across team members.
Please install editorconfig plugin from "Download a Plugin" section of [editorconfig official site](http://editorconfig.org/).


## Technology
#### JS
JavaScript ES6+ with code styleguide mostly based on [Airbnb JS](https://github.com/airbnb/javascript) and [Airbnb React](https://github.com/airbnb/javascript/tree/master/react).
JS stylguide is enforced via [ESLint linter](http://eslint.org/) called in [git pre-commit hook](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks).

#### CSS
PostCSS with plugins with css styleguide mostly based on [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) with custom css-rules order (based on best practices from HTMLAcademy and others - you can look at it in `.eslintrc` file).
CSS styleguide is enforced via [stylelint PostCSS plugin](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/postcss-plugin.md) and reported right on a webpage were compiled styles used (in body::before);
`stylelint` itself are also called in [git pre-commit hook](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks).

PostCSS plugins we're using:

* [postcss-smart-import](https://github.com/sebastian-software/postcss-smart-import)
* [postcss-normalize](https://github.com/seaneking/postcss-normalize)
* [precss](https://github.com/jonathantneal/precss)
* [cssnext](https://github.com/MoOx/postcss-cssnext)
* [postcss-short](https://github.com/jonathantneal/postcss-short)
* [postcss-focus](https://github.com/postcss/postcss-focus)
* [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)
* [lost](https://github.com/peterramsing/lost)
* [postcss-csso](https://github.com/lahmatiy/postcss-csso)
* [stylelint](https://github.com/stylelint/stylelint)
* [postcss-browser-reporter](https://github.com/postcss/postcss-browser-reporter)


### Browser support
* Chrome (latest 2)
* Safari (latest 2)
* Firefox (latest 2)
* Edge (latest 2)
* Internet Explorer 11+
* Opera (latest 2)

## Steps
### First step
* webpack-svgstore-plugin
* hot reload
* choose and install some webpack plugin to build sprites from raster images and use them in CSS
* inegrate mjml for email's

### Second step
* css modules
* React
* React Router
* Redux
* Redux Dev Tools
* redux-form
* React Helmet
* classnames

### Third step
* Merge with backend boilerplate repo

#### Possible to use
* react-motion
* multireducer
* momentum
* multi select
* react immutable
* bem-linting
* fetch
* redbox
