const _ = require('lodash.debounce');
require('@build/guide/alex/lib/voice-recognition.js');
const VoiceRecognition = annyang;

class AlexPlugin {
  constructor() {
  	this.states = {
			status: 'ready',
			params: []
		};

		this.position = undefined;
    navigator.geolocation.getCurrentPosition((position) => {
    	this.position = [ position.coords.latitude, position.coords.longitude ];
    });

		this.commandList = [
			{
				commands: ['alex'],
				request: () => { 
					this.dispatch('prompt');
					this.states.status = 'ready';
				}
			},
			{
				commands: [
					'about you',
					'who are you',
					'what are you',
					'how do you work',
					'tell me about you'
				],
				request: () => { 
					this.dispatch('about');
				}
			},			
			{
				commands: [
					'get weather',
					'weather report', 
					'what is the weather',
					'whats the weather',
					'local weather',
					'local weather report',
					'get local weather',
					'get tempature',
					'get current tempature'
				],
				request: () => {
					this.externalRequest('https://api.weather.gov/points/'+this.position[0]+','+this.position[1], (data) => {
						this.externalRequest(JSON.parse(data).properties.forecast, (forecasts) => {

							this.dispatch('get local weather', [
								JSON.parse(forecasts).properties.periods[0].detailedForecast,
								JSON.parse(forecasts).properties.periods[1].detailedForecast
							]);							
						});
					});
				}
			},
			{
				commands: ['hello', 'hello alex', 'hi alex'],
				request: () => { this.dispatch('hello'); }
			},
			{
				commands: ['doing good', 'doing great', 'good thanks'],
				request: () => { this.dispatch('good thanks'); }
			},
			{
				commands: ['thanks', 'thanks alex', 'thank you alex', 'thank you'],
				request: () => { this.dispatch('gratitude'); }
			},
			{
				commands: ['add to cart', 'checkout now', 'proceed with', 'goto checkout', 'go to checkout'],
				request: () => { this.dispatch('shopping'); }
			},
			{
				commands: [
					'new package',
					'add package',
					'new plugin',
					'add plugin',
					'new module',
					'add module',
					'add new package',
					'add new plugin',
					'add new module'
				],
				request: (data, match) => {
					this.dispatch('new package', data.replace(match, '').replace(/ /g, '-'));
				}
			},
	    {
	    	commands: [
	    		'who is the',
	    		'who are the',
	    		'who is',
	    		'who are',
	    		'whos the',
	    		'whos'
	    	],
	    	request: (data) => {
	    		data = data.replace("'", '');
					this.dispatch('who is', data);
	    	}
	    },
	    {
	    	commands: [
	    		'what is the',
	    		'what are the',
	    		'what is',
	    		'what are',
	    		'whats the',
	    		'whats'
	    	],
	    	request: (data) => {
	    		this.dispatch('what is', data);
	    	}
	    },
	    {
	    	commands: [
					'search for',
					'google for',
		    	'search',
					'google',
		    ],
		    request: (data, match) => {
		    	this.dispatch('searchWeb', data.replace(match, '').replace(/ /g, '+'));
		    }
	    },
	    {
	    	commands: [
		    	'open',
		    ],
		    request: (data, match) => {
		    	this.dispatch('openFile', data.replace(match, '').replace(/ /g, ''));
		    }
	    },
	    {
	    	commands: [
		    	'find'
		    ],
		    request: (data, match) => {
        	this.dispatch('queryFiles', data.replace(match, ''), (query) => {
        		this.listenForFeedback((answer) => {
				      this.dispatch('openQueried', [query, answer], () => {
				        this.listenForCommands();
				      });
        		});
        	});
		    }
	    },
	    {
	    	commands: [
	    		'+',
	    		'-',
	    		'*',
	    		'/',
	    		'pi'
	    	],
	    	request: (data, match, allData) => {
	    		data = data.replace(/divided by/g, '/');
	    		data = data.replace(/ million/g, '000000');
	    		data = data.replace(/ billion/g, '000000000');
	    		data = data.replace(/ trillion/g,'000000000000');
	    		data = data.replace(/pi/g, '3.14159265359');
	    		try {
	    			this.dispatch('calculator', eval(data).toFixed(2));
	    		} catch(err) {
	    			this.dispatch('error', 'Sorry, I\'m not able to translate '+data+' into a formula for you. Please try again.');
	    		}
	    	}
	    },	    	    
			{
				commands: [
					'add new atom',
					'create new atom',
					'add new molecule',
					'create new molecule',
					'add new modifier',
					'create new modifier',
					'add new organism',
					'create new organism',
					'create new page',
					'add new template',
					'new template',
					'add new page',
					'create new template',
					'add template',					
					'new atom',
					'add atom',
					'new adam',
					'add adam',
					'new molecule',
					'add molecule',
					'new modifier',
					'add modifier',
					'new organism',
					'add organism',
					'new page', 
					'add page'
				],
				request: (data, match, raw) => {
					let type = undefined;
					data = data.replace(/adam/g, 'atom'); //little translation help
					if (data.indexOf('atom') !== -1) { type = 'atom'; }
					if (data.indexOf('molecule') !== -1) { type = 'molecule'; }
					if (data.indexOf('organism') !== -1) { type = 'organism'; }
					if (data.indexOf('modifier') !== -1) { type = 'modifier'; }
					if (data.indexOf('page') !== -1) { type = 'page'; }
					if (data.indexOf('template') !== -1) { type = 'template'; }
					if (!type) {
						this.dispatch('error', 'Sorry, but I don\'t appear to have the scaffolding to '+data);
					} else {
						this.dispatch('new', type, () => {
							this.listenForFeedback((name) => {
					      this.dispatch('add', [type+'s', name], () => {
					        this.listenForCommands();
					      });
							}, {
								retry: 3,
								retryInterval: 5000,
								retryMessages: [
									'No name given, please try again or say; Alex stop, to quit.',
									'Are you still there? Please give a name for new '+type+' or say; Alex stop, to cancel.',
									'You can say; alex cancel, to stop creating a new '+type+', or tell me new desired '+type+'\s name'
								],
								cancels: ['alex stop', 'alex cancel']
							});
						});
					}
				}
			}
		];

  	this.init();
  }

  dispatch(command, input, callback) {
  	const xhttp = new XMLHttpRequest();
	  xhttp.open("GET", "http://localhost:8000/api?command="+command+'&input='+input, true);
		xhttp.onreadystatechange = () => {
		  if (xhttp.readyState == 4 && xhttp.status == 200) {
		    if (typeof callback === 'function') {
		    	callback(xhttp.responseText);
		    }
		  }
		  VoiceRecognition.start(); // re-enable mic when request is finished (succes or not)
		};
		VoiceRecognition.abort(); // disable mic before alex speaks
	  xhttp.send();
  }

	externalRequest(url, callback) {
		const xhttp = new XMLHttpRequest();
	  xhttp.open("GET", url, true);
		xhttp.onreadystatechange = () => {
		  if (xhttp.readyState == 4 && xhttp.status == 200) {
		    if (typeof callback === 'function') {
		    	callback(xhttp.responseText);
		    }
		  }
		};
	  xhttp.send();
	}

	resetStates() {
    this.states.status = {
    	status: 'ready',
    	params: []
    };	
	}

	// Here are the two primary methods in which we interface with alex, either taking commands or taking further feedback.
	listenForCommands(){
		VoiceRecognition.removeCallback('result'); // clearing previouly setup listener
		VoiceRecognition.addCallback('result', (data) => {
			let input = data[0].toLowerCase().trim();
			// we don't require alex in our commands, so we trim it from our input to assist the end user
			if (input.replace('alex', '').length) {
				input = input.replace('alex', '');
			}

			let match = false;
			Object.keys(this.commandList).map(i => { //loop commands object
				const commandObj = this.commandList[i];
				const commandList = commandObj.commands;
				if (match === true) { return; }
				Object.keys(commandList).map(j => { //loop actual commands
					if (match === true) { return; }

					// first test for a prefix of alex against command matching, then just raw command
					if (input.indexOf(commandList[j]) !== -1) {
		        if (typeof commandObj.request === 'function') {
		        	// returns best guess data, matched data, all guesses
		          commandObj.request(input, commandList[j], data);
		        }
		        match = true;
					}
				});
			});
		});

		VoiceRecognition.start();
	}

	listenForFeedback(callback, options){
		options = Object.assign({
			retry: 1, // number of attempts to keep trying before giving up on feedback
			retryInterval: 10000, // 10 seconds between re-prompts for feedback
			retryMessages: [], //messages to use randomly during retry attempts,
			cancels: [] // keywords that will kick the user out of feedback retry.
		}, options);


		let tryAgain = undefined;
		if (options.retryMessages.length) {
			tryAgain = setTimeout(() => {
				let message = options.retryMessages[Math.floor((Math.random() * options.retryMessages.length))];

				if (options.retry === 0) {
					message = 'Well that was awkward. Perhaps we should try this again later.';
				}

				this.dispatch('error', message, () => {
					if (options.retry > 0) {
						options.retry = options.retry - 1;
						this.listenForFeedback(callback, options); //we keep reminding until we get an answer
					} else {
						clearTimeout(tryAgain);
						this.listenForCommands(); //we keep reminding until we get an answer
					}
				});

			}, options.retryInterval);
		}

		VoiceRecognition.removeCallback('result'); // clearing previouly setup listener
		VoiceRecognition.addCallback('result', (data) => {
			data = data[0].toLowerCase().trim();
			let cancel = false;
			if (options.cancels.length) {
				Object.keys(options.cancels).map(index => {
					if (data.indexOf(options.cancels[index]) !== -1) {
						cancel = true;
					}
				});
			}

			console.log(cancel);

			if (typeof callback === 'function') {
				clearTimeout(tryAgain);
				if (cancel) {
					const outro = [
						'Ok.',
						'Sure.',
						'Absolutly.',
						'Stopped.'
					];
					const rand = Math.floor((Math.random() * outro.length));
					this.dispatch('error', outro[rand], () => {
						this.listenForCommands();
					});
				} else {
					callback(data);
				}
			}
		});

		VoiceRecognition.start();
	}

	// Initial setup alex listens for commands.
  init() {
  	this.listenForCommands();
  }
}

module.exports = AlexPlugin;
