# vue-4-peaks-with-vuex
Front-end app using Vue.js.
Created with CodeSandbox

App functionality:
- Routing: Menu: People: onClick it calls for a 'people.vue' component
- then at the lifecycle 'created()', component calls method to get data from API developer.marvel.com
- once loaded, it prints a clickable list of first 10 objets
- on click, it passes selected object to a child 'person-detail.vue'
- onCancel a child does not mutate the object, while onSave object is updated to a parent
- Parent can see updated object in the list.

## Demo
```
https://codesandbox.io/s/vue-4-peaks-with-vuex-h6j67
https://h6j67.csb.app/people
```

## Install dependencies

```
npm install or npm i
```

Create a .env file, from the example existing and filling our variables (.env is not sent to git)

```
cp .env.example .env
```

## Serve

Served at localhost:8080, with hot-reload

```
vue-cli-service serve
```

## Build

Ready for production with minification

```
vue-cli-service build
```

Ready for production and view the bundle analyzer report

```
npm run build --report
```

## Lints and fixes files

```
npm run prettier
vue-cli-service lint
```

## Tests

Run unit testing :

```
npm run unit
```

Run e2e tests

```
npm run e2e
```

Run all tests

```
npm test
```

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
