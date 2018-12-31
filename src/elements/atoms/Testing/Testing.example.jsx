/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (noPadding: true)
    - Dark Background variant (darkBackground: true)

  Example:
    ```
      examples: [{
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

import Testing from './Testing';
import docs from '!!docgen-loader?htmlDescription!./Testing';

export default [{
  docs,
  examples: [
    {
      name: 'Default styling',
      description:'',
      component: (
        <Testing>Lorem ipsum</Testing>
      ),
      notes: ''
    }
  ]
}];
