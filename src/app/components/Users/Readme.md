Users example:

```js
const noop = () => {};

<Background className="users-example content">
  <DisplayRedux>
    <DisplayReactRouter>
      <ErrorBoundary>
        <Users data={users.default} callAPI={noop} />
      </ErrorBoundary>
    </DisplayReactRouter>
  </DisplayRedux>
</Background>
```
