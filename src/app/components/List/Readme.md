A simple List example:

```js
let data = [
  { text: 'one' },
  { text: 'two' },
  { text: 'three' }
];

// The key is required on your renderItem
const renderItem = ({ text }, key) => (
  <li key={key}><div>{text}</div></li>
);

<div className="list-example">
  <List data={data} renderItem={renderItem} />
</div>
```
