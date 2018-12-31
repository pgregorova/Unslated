/** 
  This allows Alex access to webpack's stats object for error reporting
*/
const Robot = require('say');

let buildFailedFlag = false;

class AlexPlugin {
  // Alex helps track down location of build errors.
  apply(compiler) {    
    compiler.hooks.done.tap({name:'AlexPlugin'}, stats => {
      if (stats.hasErrors()) {
        console.log('||||||||||||||||||||||||||||||||||||||||');
        console.log(stats.toJson().errors[0].split(/\n/g));
        console.log('||||||||||||||||||||||||||||||||||||||||');
        Robot.speak('There appears to be a build error.');
        buildFailedFlag = true;
      } else {
        if (buildFailedFlag) {
          buildFailedFlag = false;
          Robot.speak('Build back to normal.');
        }
      }
    });

    compiler.hooks.watchClose.tap({name: 'AlexPlugin'}, () => {
      Robot.speak('Omg, I\'m dieing!');
    });  
  }
}

module.exports = AlexPlugin;