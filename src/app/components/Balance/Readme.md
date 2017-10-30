A Balance example with positive difference:

```js

<Balance total="200" difference="0.0001" symbol={<span className="icon-increase"></span>} />
```

A Balance example with negative difference:

```js

<Balance total="200" difference="0.0001" symbol={<span className="icon-decrease"></span>} />
```

A Balance example with nothing:

```js

<Balance total="0" />
```

A Balance example with many decimals:

```js

<Balance total="200.23223232" difference="0.232323" symbol={<span className="icon-increase"></span>} />
```
