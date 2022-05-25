# shopping_Ana-Silva

## Languages and methodology

-   [CoffeeScript](http://coffeescript.org/)
-   [Handlebarsjs](http://handlebarsjs.com/)
-   [SASS](http://sass-lang.com/)
-   [Pattern Lab Atomic Design](http://patternlab.io/)

## Components

-   Normalize 2.1.0
-   Twitter's Bootstrap 4.0.0-alpha.2
-   Modernizr 2.6.2
-   jQuery 1.9.1

## Workflow

-   Bower 1.7.2
-   Gulp 3.9.0

## Installation

```
npm install
bower install
```

## Usage

Create a static server at port 3001 (for user interface, read [browser-sync official page for more info](http://www.browsersync.io/)) that watches for file changes and enables live reload:

```
gulp serve
```

Compile SASS to CSS and lint all the generated files:

```
gulp sass
```

Validate JS with JSHint and concatenates different files to one:

```
gulp scripts:dist
```

Convert a set of images (PNG & SVG) into a spritesheet and corresponding CSS variables:

```
gulp sprites:dist
```

Minify PNG and JPEG images:

```
gulp images:dist
```

Compile [Handlebars](http://handlebarsjs.com) templates and outputs static HTML:

```
gulp html:dist
```
