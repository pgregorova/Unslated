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

import {
  List,
  List__item
} from './List';
import docs from '!!docgen-loader?htmlDescription!./List';

export default [{
  docs,
  examples: [
    {
      name: 'default',
      component: (
        <List>
          <List__item>Horse</List__item>
          <List__item>Dog</List__item>
          <List__item className="is-leader">Pig</List__item>
        </List>
      )
    }, {
      name: 'ordered list',
      component: (
        <List variant="ordered">
          <List__item className="is-leader">Pig</List__item>
          <List__item>Dog</List__item>
          <List__item>Horse</List__item>
        </List>
      )
    }, {
      name: 'definition list',
      component: (
        <List variant="definition">
          <List__item variant="term">Pig</List__item>
          <List__item variant="description">Leader</List__item>

          <List__item variant="term">Dog</List__item>
          <List__item variant="description">Enforcer</List__item>

          <List__item variant="term">Horse</List__item>
          <List__item variant="description">Laborer</List__item>
        </List>
      )
    }, {
      name: 'blank list',
      component: (
        <List variant="blank">
          <List__item className="is-leader">Pig</List__item>
          <List__item>Dog</List__item>
          <List__item>Horse</List__item>
        </List>
      )
    }, {
      name: 'list w/ class',
      component: (
        <List className="boogy-monster">
          <List__item className="is-leader">Pig</List__item>
          <List__item>Dog</List__item>
          <List__item>Horse</List__item>
        </List>
      )
    }, {
      name: 'list item w/ class',
      component: (
        <List__item className="yahoo">Horse</List__item>
      )
    }
  ]
}];
