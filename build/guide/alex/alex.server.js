const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const Robot = require('say');
const opn = require('opn');
const wikipedia = require("node-wikipedia");
const recursive = require("recursive-readdir");
const childProcess = require('child_process');
const searchFiles = require('find-in-files');
const NumberToWords = require('number-to-words');

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

app.get('/api', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	const command = res.req.query.command;
	let input = res.req.query.input;

	if (command === 'error') {
		Robot.speak(input, null, null, () => {
			res.send();			
		});
	}

	if (command === 'prompt') {
		Robot.stop();
		Robot.speak('Yes, how can I help?');
		res.send();
	}

	if (command === 'about') {
		Robot.stop();
		Robot.speak('Hi, I\'m Alex, (Audio level executable XHR)! Here is more information about me.');
		opn('https://github.com/drolsen/Unslated/tree/Enhance/Guide/build/guide/alex');
		res.send();
	}	

	if (command === 'openFile') {
		recursive(path.resolve(__dirname, '../../../'), (err, files) => {
			if (!input.length) {
				Robot.speak('You didn\'t specify a file name.'); 
				return;
			}
			const collection = [];
			Object.keys(files).map(index => {
				collection.push(files[index]);
				if (files[index].toLowerCase().indexOf(input) !== -1) {
					opn(files[index]);
					Robot.speak('File opened, edit away!');
				}

				if (index === (files.length-1)) {
					Robot.speak(String(index));
					Robot.speak('Sorry, '+String(input)+' could not be found.');
				}
			});
			res.send(collection);
			next();
		});
		
	}

	if (command === 'searchWeb') {
		Robot.speak('Ok, here is what I found.');
		opn('https://www.google.com/search?q='+input);
		res.send();
	}

	if (command === 'queryFiles') {
		input = input.trim();
		if (!input.length) {
			Robot.speak('You didn\'t specify a search string.'); 
		} else {
			Robot.speak('Ok, looking for '+input+'.', null, null, () => {
				searchFiles.find(input, path.resolve(__dirname, '../../../src/'), '.*{css|js|jsx|html|less|txt|xml}$')
				.then((results) => {
			    if (Object.keys(results).length) {
						let occurances = 0;
						let across = Object.keys(results).length;
			    	Object.keys(results).map(index => {
			    		occurances += parseInt(results[index].count, 10);
			    	});

			    	Robot.speak('I\'ve located '+occurances+' occurances of '+input+' across '+across+' files. Would you like to edit these files?', null, null, () => {
							res.send(input);
							next();
			    	});
					} else {
						Robot.speak('Sorry, could not be found.', null, null, () => {
							res.send();
							next();
						});
					}
				});
			});
		}
	}

	if (command === 'openQueried') {
			input = input.split(',');
			if (input[1].toLowerCase().indexOf('yes') !== -1) {
				Robot.speak('Ok, opening files.', null, null, () => {
					searchFiles.find(input[0], path.resolve(__dirname, '../../../src/'), '.{css|js|jsx|html|less|txt|xml}$')
					.then((results) => {
				    if (Object.keys(results).length) {
				    	Object.keys(results).map(index => {
				    		opn(index);
				    	});
							res.send();
							next();
						}
					});
				});
			} else {
				res.send();
				next();
			}
	}

	if (command === 'calculator') {
		Robot.speak('equals '+ NumberToWords.toWords(input));
		res.send();
	}

	if (command === 'shopping') {
		const responses = [
			'I\'m not a shopping cart posing as AI',
			'Go ask alexa for that kind of stuff.',
			'I\'m not a glorified shopping cart, stop it.',
			'What do I look like, alexa?'
		];
		Robot.speak(responses[Math.floor((Math.random() * 3))]);
		res.send();
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
		res.send();
	}

	if (command === 'get local weather') {
		Robot.speak('Today: '+input.split(',')[0]+'. Tonight:'+input.split(',')[1]);
		res.send();
	}

	if (command === 'who is') {
		wikipedia.page.data(input.replace('who is ', '').replace('who are ', '').replace('whos ', '').replace(/ /g, '_'), { content: true }, (response) => {
			Robot.speak(cleanWikiResponse(response));
		});
		res.send();
	}

	if (command === 'what is') {
		wikipedia.page.data(input.replace('what is ', '').replace('what are ', '').replace('whats ', '').replace(/ /g, '_'), { content: true }, (response) => {
			Robot.speak(cleanWikiResponse(response));
		});
		res.send();
	}		

	if (command === 'new package') {
		if (input.length >= 40) {
			Robot.speak(input + ' is a very lengthy package name, please try again.', null, null, () => {
				res.send();
			});
		} else {
			runNodeScript('npm install '+input+' --save-dev');
			Robot.speak('New '+input+' package successfully installed.', () => {
				res.send();
			});
		}
	}

	if (command === 'new') {
		Robot.speak('Ok, and what shall we name this new '+input+'?', null, null, () => {
			res.send();
		});
	}

	if (command === 'add') {
		input = input.split(',');
		if (input[1].length >= 15) {
			Robot.speak(input + ' is a very lengthy name, please try again.');
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
		res.send();
	}


	if (command === 'hello') {
		Robot.speak('Hello, how are you?');
		res.send();
	}

	if (command === 'good thanks') {
		Robot.speak('Glad to hear it. Shall we get to work?');
		res.send();
	}
});

app.listen(8000, () => {
    console.log('Press Ctrl+C to quit.');
});
