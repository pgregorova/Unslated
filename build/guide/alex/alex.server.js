const express = require('express');
const app = express();
const path = require('path');
const Robot = require('say');
const opn = require('opn');
const wikipedia = require("node-wikipedia");
const recursive = require("recursive-readdir");
const childProcess = require('child_process');

const runNodeScript = (scriptPath, arguments, callback) => {
  let invoked = false;
  const process = childProcess.fork(scriptPath, arguments);

  process.on('error', (err) => {
      if (invoked) return;
      invoked = true;
      if (typeof callback === 'function') {
      	callback(err);
      }
  });

  process.on('exit', (code) => {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('exit code ' + code);
      if (typeof callback === 'function') {
      	callback(err);
      }
  });
}

const cleanWikiResponse = (response) => {
	try {
		response = response.text['*'];
		response = response.replace(/\n/g, '').replace(/\r/g, ''); //remove any returns and newlines
		response = response.replace(/<table(.*?)<\/table>/g, ''); //removes any bio table
		response = response.replace(/\n/g, '').replace(/\r/g, ''); //remove any returns and newlines
		response = response.replace(/<p class="mw-empty(.*?)<\/p>/g, ''); //removes any empties
		response = response.match(/<p>(.+?)<\/p>/)[0]; // gets first paragraph from page
		response = response.replace(/<sup id="cite_ref(.*?)<\/sup>/g, ''); // remove citations
		response = response.replace(/<[^>]+>/g, ' '); // strips away all html tags
		response = response.replace(/#(.*?);/g, ''); // remove html entites	
		return response;		
	} catch (err) {
		Robot.speak('Sorry, but that information could not be found.');
	}	
};



app.use(express.json());       // to support JSON-encoded bodies

app.use(path.resolve(__dirname, '../../src'), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	const command = res.req.query.command;
	let input = res.req.query.input;

		if (command === 'prompt') {
			Robot.stop();
			Robot.speak('Yes, how can I help?');
		}

		if (command === 'gratitude') {
			const responses = [
				'My pleasure.',
				'You are most welcome.',
				'Anything to help.',
				'No problem.',
				'Glad to be of assistance.',
				'Happy to help'
			];
			Robot.speak(responses[Math.floor((Math.random() * 5))]);
		}

		if (command === 'get local weather') {

			Robot.speak('Today: '+input.split(',')[0]+'. Tonight:'+input.split(',')[1]);
		}

		if (command === 'who is') {
			wikipedia.page.data(input.replace('who is ', '').replace('who are ', '').replace('whos ', '').replace(/ /g, '_'), { content: true }, (response) => {
				Robot.speak(cleanWikiResponse(response));
			});	
		}

		if (command === 'what is') {
			wikipedia.page.data(input.replace('what is ', '').replace('what are ', '').replace('whats ', '').replace(/ /g, '_'), { content: true }, (response) => {
				Robot.speak(cleanWikiResponse(response));
			});	
		}

		if (command === 'open file') {
			recursive(path.resolve(__dirname, '../../../src/'), (err, files) => {
				if (!input.length) {
					Robot.speak('You didn\'t specify a file name.'); 
					return;
				}

				Object.keys(files).map(index => {
					if (files[index].toLowerCase().indexOf(input) !== -1) {
						opn(files[index]);
						Robot.speak('File opened, edit away!');
					}

					if (index === (files.length-1)) {
						Robot.speak(String(index));
						Robot.speak('Sorry, '+String(input)+' could not be found.');
					}
				});
			});			
		}		

		if (command === 'make element') {
			input = input.split(',');
			if (input[1].length >= 15) {
				Robot.speak(input + ' is a very lengthy name, please consider a new one.');
			} else {
				runNodeScript(
					path.resolve(__dirname, '../../scaffolding/scaffolding.build.js'),
					[
						input[0], 
						input[1].replace(/(\w)(\w*)/g, (g0,g1,g2) => {return g1.toUpperCase() + g2.toLowerCase();}).trim()
					]
				);
				Robot.speak('New '+input[1]+' '+input[0]+' successfully created.');
			}
		}

		if (command === 'add atom') {
			Robot.speak('Ok, and what shall we name this new atom?');
		}

		if (command === 'add molecule') {
			Robot.speak('Ok, and what shall we name this new molecule?');
		}

		if (command === 'add organism') {
			Robot.speak('Ok, and what shall we name this new organism?');
		}

		if (command === 'add modifier') {
			Robot.speak('Ok, and what shall we name this new modifier?');
		}

		if (command === 'add page') {
			Robot.speak('Ok, and what shall we name this new page?');
		}	

		if (command === 'add template') {
			Robot.speak('Ok, and what shall we name this new template?');
		}	

		if (command === 'hello') {
			Robot.speak('Hello, how are you?');
		}

		if (command === 'good thanks') {
			Robot.speak('Glad to hear it. Shall we get to work?');
		}

	res.send();
});

app.listen(8000, () => {
    console.log('Press Ctrl+C to quit.');
});





