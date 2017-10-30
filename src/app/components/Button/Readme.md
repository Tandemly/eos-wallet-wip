A Basic button:

```js
<div className="button-example">
  <Button text={'Click Me'} />
  <Button>Click Me, Too!</Button>
</div>
```

A primary color button:

```js
<div className="button-example">
  <Button text={'Primary'} className="is-primary" />
  <Button text={'Secondary'} className="is-secondary" />
  <Button text={'Accent'} className="is-accent" />
</div>
```

```js
<div className="button-example">
  <Button text={'Info'} className="is-info" />
  <Button text={'Success'} className="is-success" />
  <Button text={'Warning'} className="is-warning" />
  <Button text={'Danger'} className="is-danger" />
</div>
```

```js
<div className="button-example">
  <Button text={'Light'} className="is-light" />
  <Button text={'Dark'} className="is-dark" />
</div>
```

```js
<div className="button-example">
  <Button text={'Small'} className="is-primary is-small" />
  <Button text={'Normal'} className="is-primary"/>
  <Button text={'Medium'} className="is-primary is-medium" />
  <Button text={'Large'} className="is-primary is-large" />
</div>
```

Overridding buttons styles:
```js
// .custom-button is defined by user elsewhere
let custom = require('!style-loader!css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!../../styleguide/styles/custom.button.css');
<div className="button-example">
  {/* .custom-button { color: magenta; font-weight: 700; } */}
  <Button className="custom-button" >Click Me, Too!</Button>
  {/* custom is a css-module that uses same classes defined in the component's css-module */}
  <Button css={custom} >Click Me, Too!</Button>
</div>