import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import { List, List__item } from '@atoms/List/List';

export const Guide__welcome = (props) => {
  const classStack = Utils.createClassStack([
    'guide__welcome'
  ]);

  return (
    <Rhythm tagName="section">
      <Heading>Welcome to Unslate</Heading>
      <p>Unslated is Connective DX&apos;s in-house toolset for making static websites and atomic styleguides.<br/> Perfect for producing static web assets with an emphasis on atomic driven architecture.</p>

      <Heading level="h3">About Unslated</Heading>
      <p>Unslate is a component based framework for developing web sites and applications. Unslate uses a nimble set of core build features to not only compress and transpile bundled code, but help solitify team practice across projects.</p>
      <p>The core build modules for Unslate are as followes:</p>
      <List>
        <List__item><strong>Webpack / Webpack-dev-server</strong> - Main bundle engine and dev host</List__item>
        <List__item><strong>Babel</strong> - Transpile ES6/7 and React into browser compatable JS.</List__item>
        <List__item><strong>React</strong> - Used to compile JSX syntax down to HTML.</List__item>
        <List__item><strong>POSTCSS</strong> - Used to compile CSS down.</List__item>
      </List>

      <p>For a complete list of all modules unslate uses, see package.json at root of Unslate checkout.</p>
      
      <Heading level="h3">Getting Started</Heading>
      <p>There are two groups of bundles that Unslate procuces; <strong>guide.(js|css)</strong> and <strong>assets.(js|css)</strong>.<br/> All things under <strong>guide.(js|css)</strong> are purly for style guide purposes, while all things <strong>assets.(js|css)</strong> are for actual production.</p>
      <p>To add more elements, pages and templates to Unslate, simply run any of the following commands:</p>
       <List>
        <List__item><strong>npm run new:atom [name]</strong> - Adds a new atom element under src/elements/atoms/</List__item>
        <List__item><strong>npm run new:molecule [name]</strong> - Adds a new molecule element under src/elements/molecules/</List__item>
        <List__item><strong>npm run new:organisim [name]</strong> - Adds a new organisim element under src/elements/organisim/</List__item>
        <List__item><strong>npm run new:template [name]</strong> - Adds a new template element under src/elements/template/</List__item>
        <List__item><strong>npm run new:modifier [name]</strong> - Adds a new modifier element under src/elements/modifier/</List__item>
        <List__item><strong>npm run new:page [name]</strong> - Adds a new page under src/pages/</List__item>
      </List>
      <Heading level="h3">Elements and Examples</Heading>
      <p>Elements are the parts of what ultimatly make up a component. Most atom elements are simple abstractions of baseline web features, while molecules are further abstractions of atoms or other molecules. Organisims are yet another level of abstraction but are considered to be where a projects actual componets are finally formed.</p>
      <p>Each element comes with a JSX example file that allows you to customize the options and style variants available to each atomic element.</p>

      <Heading level="h3">Templates</Heading>
      <p>Templates are used to help demonstrate common or repeated layouts from page level on down to component level. Templates allow you to combine elements togehter without the need to actaul cracting a while new element to do so.</p>

      <Heading level="h3">Pages</Heading>
      <p>Pages are standalone pages that do not contain any styleguide shell. With pages you get to demostrate full page views specific projects pages, and utilize templates or elements while doing so.</p>

      <Heading level="h3">Build configs</Heading>
      <p>The build configuration for Unstlate as been broken up into the following categories:</p>
      <List>
        <List__item><strong>build/configs/html</strong></List__item>
        <List__item><strong>build/configs/css</strong></List__item>
        <List__item><strong>build/configs/js</strong></List__item>
        <List__item><strong>build/configs/img</strong></List__item>
      </List>

      <p>Under build/configs/ you will find three main config files:</p>
      <List>
        <List__item><strong>buid/configs/webpack.config.js</strong> - Main config file that stitches together all config categories.</List__item>
        <List__item><strong>build/configs/performance.config.js</strong> - Customizable way to see more or less performance details.</List__item>
        <List__item><strong>build/configs/alias.config.js</strong>- @alias names for import paths across the project.</List__item>
      </List>
      
      <Heading level="h3">Guide</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>      
      <Heading level="h3">Scaffolding</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>      
      <Heading level="h3">Documentation</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>      
      <Heading level="h3">Adding a JS plugins</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>      
      <Heading level="h3">Adding a CSS plugin</Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>      
      <Heading level="h3">Adding routes </Heading>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed sem pellentesque, volutpat dolor eget, accumsan quam. Donec ac porta mauris. Suspendisse blandit fringilla viverra. Vivamus sodales nisi et leo gravida, id imperdiet augue tristique. Mauris ultrices eros non sollicitudin finibus. Cras consequat placerat turpis sit amet porttitor. Cras efficitur ligula sit amet nibh convallis feugiat. Integer sem justo, mollis a risus sit amet, mattis venenatis mauris. Morbi rhoncus sem urna, id condimentum elit vehicula ut. Curabitur id nibh ut arcu iaculis convallis nec nec ipsum. Pellentesque feugiat vestibulum feugiat. Phasellus nisl mi, blandit vitae ipsum eu, scelerisque volutpat lorem. Sed condimentum felis nunc, nec commodo purus efficitur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <p>Cras tincidunt tempor mi, quis porttitor est tempor ac. Maecenas sit amet tincidunt mi, ut pharetra mauris. Duis tempor elit et mi tristique, eget rhoncus turpis scelerisque. Nulla auctor posuere purus, eu pellentesque mi rhoncus vel. Nulla tincidunt luctus nulla. Integer efficitur molestie mauris, a eleifend ipsum malesuada vel. Ut id bibendum neque. Nulla quis nulla mattis, tempus lectus vitae, efficitur ligula. Nullam elementum turpis velit, nec semper lacus efficitur quis. Nunc venenatis orci in imperdiet malesuada. Praesent a nunc nec nisi lobortis euismod ac ut ipsum. Fusce ut nisi aliquet, posuere felis rutrum, bibendum justo. Maecenas gravida efficitur elementum. Cras ultrices elit diam, in consequat nisl dignissim vel.</p>      
    </Rhythm>
  );
};


export default Guide__welcome;
