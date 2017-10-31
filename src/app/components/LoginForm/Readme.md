Login form example:

```js
const noop = () => {};

<Background className="login-form-example content">
  <DisplayRedux>
    <DisplayReactRouter>
      <h4>This operation requires your Active Key or Master password.</h4>
      <LoginForm callAPI={noop} />
    </DisplayReactRouter>
  </DisplayRedux>
</Background>
```
