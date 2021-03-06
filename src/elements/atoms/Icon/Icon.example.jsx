/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (noPadding: true)
    - Dark Background variant (darkBackground: true)

  Example:
    ```
      export default [{
        name: 'Default styling',
        component: (
          <Component>Lorem ipsum</Component>
        ),
        options: {
          noPadding: true,
          darkBackground: true
        }
      },
    ```
*/

import Icon from './Icon';
const docs = require("!!docgen-loader?htmlDescription!./Icon");

export default [{
  docs,
  examples: [
    {
      name: 'default',
      component: (
        <Icon name="close" />
      )
    }, {
      name: 'small size',
      component: (
        <Icon size="small" name="cancel" />
      )
    }, {
      name: 'large size',
      component: (
        <Icon size="large" name="plus" />
      )
    }, {
      name: 'wide custom size',
      component: (
        <Icon size="wide" name="minus" />
      )
    }, {
      name: 'light icon on dark background',
      options: {
        darkBackground: true
      },
      component: (
        <Icon name="plus" variant="light" />
      )
    }, {
      name: 'extra attribute',
      component: (
        <Icon name="plus" data-id="yoyoyo" />
      )
    }
  ]
}];
