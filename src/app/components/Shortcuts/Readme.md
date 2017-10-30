A list of shortcuts example:

```js
const data = [
  [
    {
      to: '/',
      text: 'Transfer',
      iconClass: 'icon-transfer u-mr1',
    },
    {
      to: '/transactions',
      text: 'Transaction History',
      iconClass: 'icon-history u-mr1',
    },
    {
      to: '/permissions',
      text: 'Permissions',
      iconClass: 'icon-permissions u-mr1',
    },
    {
      to: '/logout',
      text: 'Logout',
      iconClass: 'icon-logout u-mr1',
    },
  ],
  {
    to: '/users',
    text: 'Users',
  },
  {
    to: '/about',
    text: 'About',
  },
  {
    to: '/faq',
    text: 'FAQ',
  },
];

<Background className="shortcuts-example">
  <DisplayReactRouter>
    <Shortcuts data={data} />
  </DisplayReactRouter>
</Background>
```
