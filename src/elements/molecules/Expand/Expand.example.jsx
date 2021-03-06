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

import Expand from './Expand';
import docs from '!!docgen-loader?htmlDescription!./Expand';

export default [{
  docs,
  examples: [
    {
      name: 'Default state (align top)',
      component: (
        <div>
          <Expand title="Toggle me" level="h5">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }, {
      name: 'Overloaded state (align top)',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }, {
      name: 'Align bottom',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="bottom">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }, {
      name: 'Align left',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="left">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }, {
      name: 'Align right',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="right">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }
  ]
}];
