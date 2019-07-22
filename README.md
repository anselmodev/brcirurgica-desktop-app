<br>

<p>
  Electron React Boilerplate uses <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a> for rapid application development.
</p>
<br />

<h3>AD Studios - Electron and React with Typescript Boilerplate</a></h3>

<br />
<hr />
<br />

## Install

First, clone the repo via git:

```bash
git clone --depth 1 --single-branch --branch master https://github.com/anselmodev/ads-electron-react-boilerplate.git your-project-name
```

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Starting Development

Before, Start the React Server

```bash
$ yarn dev-server
```

After, Start the App in dev mode

```bash
$ yarn dev-app
```

## Packaging for Production

### First, Build React:

```bash
$ yarn build
```

### Second, Build for platforms:

To package apps for all platform:

```bash
$ yarn electron-pack-all
```

To package app for the mac platform:

```bash
$ yarn electron-pack-mac
```

To package apps for the windows platform:

```bash
$ yarn electron-pack-win
```

To package apps for the linux platform:

```bash
$ yarn electron-pack-lnx
```

## Icons for Mac Platform

Execute the command below on folder RESOURCES:

```bash
$ bash icns_creator.sh /path/to/image-icon.png [icon_name]
```
- [icns Creator DOCs](https://github.com/jamf/icns-Creator)

## Tools ( Icons generator and preloaders )

See related Sites:

- Icon Generator [redketchup.io](https://redketchup.io/icon-editor)

- [Preloaders](https://icons8.com/preloaders)

## Docs

See related docs:

- [Electron](https://electronjs.org/)

- [React](https://reactjs.org/)

- [RSuite UI Framework](https://rsuitejs.com/en/)

## Maintainers

- [Anselmo Lima](https://github.com/anselmodev)

