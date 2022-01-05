# pgui

A modern, open-source desktop GUI for managing PostgreSQL databases.

Initialized using the [Electron React Boilerplate][electron-react-boilerplate].

## Limitations

### Prototype Stripping

Objects are [stripped of their prototypes][electron-context-bridge-types] when passed between the main and render processes. GRPC messages rely on these prototypes, so a pipeline serializes them to and from binary when they make the trip.

Other types that we need to pass between processes, such as `ClientUnaryCall`, also rely on prototypes. The functions they provide are wrapped before the trip, transforming the prototype into a simple `{ [key]: Function }` object that can safely be passed.

We're not yet able avoid losing prototype functionality on all passed objects. Below is a list of "lossy" types - when working with these, you'll likely have to do some munging before the object at hand works as expected.

* Metadata

[electron-react-boilerplate]: https://electron-react-boilerplate.js.org/
[electron-context-bridge-types]: https://www.electronjs.org/docs/latest/api/context-bridge#parameter--error--return-type-support
