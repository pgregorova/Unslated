const Wizard = require('questions');
const Robot = require('say');
const fs = require('fs');

/* 
Unslate wizard helps expidite the setup up process of first time checkout under new projects. 
The wizard below asks the user a series of questions that will turn the confiuration to a projects needs.
*/

const config = [];

// key = key to be used when captured in our config object
// verbal = a version of the question to be used with text to speech
// textual = a version of the quesiton to be used with termal
// required = question must be answered to proceed to next step
const askQuestions = (questions) => {

	for (let i = 0; i < questions.length; i++) {
		const verbal = questions[i].verbal;
		const textual = questions[i].textual;
		const required = questions[i].required || false;
		const key = questions[i].key;
		const skip = questions[i].skipOn;

		Robot.speak(verbal);
		Wizard.askOne(
			{ info: textual, required: required },
			result => {
				if (skip.length) {
					let j = skip.length;
					let skipFlag = false;
					while (j--) {
						if (result === skip[j]) {
							skipFlag = true;
						}
					}
					if (!skipFlag) {
						config[key] = result;
					}
				} else {
					config[key] = result;
				}
			}
		);
	}
}

const dialog = {
	welcome: {
		audible: 'Welcome to Unslate Framework. Use this wizard to quickly configure common areas of configuration within the Unslate framework. Would you like to proceed?',
		textual: 'Welcome to Unslate quick setup wizard.'
	},
	restart: {
		audible: 'Would you like to start wizard over? y for yes, n for no',
		textual: 'Would you like to start wizard over? (y or n)'
	},
	review: {
		audible: 'Do the above answer look correct to you? y for yes, n for no.',
		textual: 'Do the above answer look correct to you? (y or n)'
	},
	complete: {
		audible: 'Tada!! Unslate has finished configuring your new checkout.',
		textual: 'Tada!! Unslate has finished configuring your new checkout.'
	},
	ok: {
		audible: 'Ok.'
	},
	thanks: {
		audible: 'Thanks.'
	}	
};

const startOver = () => {
	Robot.speak(dialog.restart.audible);
  Wizard.askMany({
  	restart: { info: dialog.restart.textual, required: true }
  }, (results) => {
  	if (results.restart.toLowerCase() === 'y') {
  		startWizard();
  	}
  });
};

const runConfiguration = () => {
	Robot.speak(dialog.review.audible);
  Wizard.askMany({
  	review: { info: dialog.review.textual, required: true }
  }, (results) => {
  	if (results.review.toLowerCase() === 'y') {
  		Robot.speak(dialog.complete.audible);
  		console.log(dialog.complete.textual);
  	} else {
  		startOver();
  	}
  });
};

const startWizard = () => {
	askQuestions([{
			key: 'projectName', 
			verbal: 'Please name this project', 
			textual: 'Please name this project', 
			required: true,
			skipOn: []
		},
		{
			key: 'outputPath',
			verbal: 'Would you like to change the location of where your built files get output too? Default is /dist. You can leave blank to skip.',
			textual: 'Output path (blank to skip)',
			required: false,
			skipOn: []
		},
		{
			key: 'sourcePath',
			verbal: 'Would you like to change the location of where your source files live? Default is /src. You can leave blank to skip.',
			textual: 'Source path (blank to skip)',
			required: false,
			skipOn: ['']			
		},
		{
			key: 'publicPath',
			verbal: 'Would you like to change paths within the source of built files to something custom? Default is /dist. You can leave blank to skip.',
			textual: 'Public path (blank to skip):',
			required: false,
			skipOn: ['']
		},
		{
			key: 'disabledMinify',
			verbal: 'By default ',
			textual: 'Disable minify (y or n):',
			required: true,
			skipOn: ['', 'n']
		},
		{
			key: 'devServerPort',
			verbal: 'Dev port (default :8080, blank to skip):',
			textual: 'Dev port (default :8080, blank to skip):',
			required: false,
			skipOn: ['']
		},
		{
			key: 'devServerHostname',
			verbal: 'Dev Hostname (default localhost, blank to skip):',
			textual: 'Dev Hostname (default localhost, blank to skip):',
			required: false,
			skipOn: ['']
		},
		{
			key: 'baseBodyFontSize',
			verbal: 'Base Font Size (default 16px, blank to skip):',
			textual: 'Base Font Size (default 16px, blank to skip):',
			required: false,
			skipOn: ['']
		}
	]);
	console.log('Please review your answers:');
	console.log('----------- Review ----------');
	console.log(config);
	console.log('-----------------------------');
	runConfiguration();	
};

const init = () => {
	Robot.speak(dialog.welcome.audible);
	console.log(dialog.welcome.textual);
	console.log('#######################################');
	console.log(' ');
	Wizard.askMany({
		beginWizard: { info: 'Would you like to proceed? y or n', required: true },
	}, (results) => {
		if (results.beginWizard.toLowerCase() === 'y') {
			startWizard();
		} else {
			Robot.speak(dialog.goodbye.audible);
		}
	});
};

init();