## Start application

First install the packages:

```shell
npm i
```

To start only the React app use this command:

```shell
npm run dev
```

If you want to start the React app with the json-server run this command:

```shell
npm run dev-db
```

To run the build for production use:

```shell
npm run build
```

To run eslint and prettier use:

```shell
npm run lint && npm run format
```

## I18N

To extract the messages from the source code use either of the following:

```shell
npm run extract-de # extract German messages
npm run extract-en # extract English messages
npm run extract-fr # extract French messages
```

Before compiling the messages make sure that the messages are translated correctly in the previously extracted file.
To compile the messages use either of the following:

```shell
npm run compile-de # compile German messages
npm run compile-en # compile English messages
npm run compile-fr # compile French messages
```
