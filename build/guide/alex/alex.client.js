require('@build/guide/alex/lib/voice-recognition.js');
const VoiceRecognition = annyang;

class AlexPlugin {
  constructor() {
  	this.states = {
			status: 'ready',
			newElementType: undefined
		};

		this.position = undefined;
    navigator.geolocation.getCurrentPosition((position) => {
    	this.position = [ position.coords.latitude, position.coords.longitude ];
    });

    

		this.commands = [
			{
				command: ['alex'],
				request: () => { 
					this.dispatch('prompt');
					this.states.alex = 'ready';
				}
			},
			{
				command: ['get weather', 'weather report', 'what is the weather', 'whats the weather', 'local weather', 'get local weather', 'get tempature', 'get current tempature'],
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
				command: ['hello', 'hello alex', 'hi alex'],
				request: () => { this.dispatch('hello'); }
			},
			{
				command: ['doing good', 'doing great', 'good thanks'],
				request: () => { this.dispatch('good thanks'); }
			},
			{
				command: ['thanks', 'thanks alex', 'thank you alex', 'thank you'],
				request: () => { this.dispatch('gratitude'); }
			},	
			{
				command: ['new atom', 'add new atom', 'create new atom', 'add atom'],
				request: () => {
					this.dispatch('add atom', '', () => {
						this.states.status = 'addElement';
						this.states.newElementType = 'atoms';
			      annyang.pause();
			      setTimeout(() => {
			        annyang.resume();
			      }, 5000);				
					});
				}
			},
			{
				command: ['new molecule', 'add new molecule', 'create new molecule', 'add molecule'],
				request: () => {
					this.dispatch('add molecule', '', ()=>{
						this.states.status = 'addElement';
						this.states.newElementType = 'molecules';
			      annyang.pause();
			      setTimeout(() => {
			        annyang.resume();
			      }, 5000);				
					});
				}
			},
			{
				command: ['new modifier', 'add new modifier', 'create new modifier', 'add modifier'],
				request: () => {
					annyang.pause();
					this.dispatch('add modifier', '', () =>{
						this.states.status = 'addElement';
						this.states.newElementType = 'modifiers';
			      setTimeout(() => {
			        annyang.resume();
			      }, 5000);				
					});
				}
			},
			{
				command: ['new organism', 'add new organism', 'create new organism', 'add organism'],
				request: () => {
					annyang.pause();
					this.dispatch('add organism', '', ()=>{
						this.states.status = 'addElement';
						this.states.newElementType = 'organisms';
			      setTimeout(() => {
			        annyang.resume();
			      }, 5000);				
					});
				}
			},
			{
				command: ['new page', 'add new page', 'create new page', 'add page'],
				request: () => {
					annyang.pause();
					this.dispatch('add page', '', ()=>{
						this.states.status = 'addElement';
						this.states.newElementType = 'pages';
			      setTimeout(() => {
			        annyang.resume();
			      }, 5000);				
					});
				}
			},
			{
				command: ['new template', 'add new template', 'create new template', 'add template'],
				request: () => {
			    annyang.pause();			
					this.dispatch('add template', '', ()=>{
						this.states.status = 'addElement';
						this.states.newElementType = 'templates';
			      setTimeout(() => {
			        annyang.resume();
			      }, 5000);				
					});
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
		    	callback();
		    }
		  }
		};
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

  init() {
	  // Unpack our commands for alex.
	  const collection = {};
	  Object.keys(this.commands).map(i => {
	    Object.keys(this.commands[i].command).map(j => {
	      collection[this.commands[i].command[j]] = () => {
	        if (this.commands[i].request) {
	          this.commands[i].request();
	        }
	      };
	    });
	  });
	  
	  VoiceRecognition.addCommands(collection);

	  // Undeterministic commands live under the VR's resultNoMatch callback
	  VoiceRecognition.addCallback('resultNoMatch', (data) => {

	    // under addElement state
	    if (this.states.status === 'addElement' && data[0].length) {
	      this.dispatch('make element', [this.states.newElementType, data[0]], () => {
	        // reset alex states
	        this.states.status = 'ready';
	        this.states.newElementType = undefined;
	      });
	    }

	    // lets clear away confusing apostrophes from our commands
	    data[0] = data[0].replace("'", '');
	    // under who is state
	    const whos = ['who is the', 'who are the', 'who is', 'who are', 'whos the', 'whos'];
	    for (let i = 0; i < whos.length; i++) {
	      if (data[0].indexOf(whos[i]) !== -1) {
	        this.dispatch('who is', data[0]);
	        break;
	      }
	    }        

	    // under what is state
	    const whats = ['what is the', 'what are the', 'what is', 'what are', 'whats the', 'whats'];
	    for (let j = 0; j < whats.length; j++) {
	      if (data[0].indexOf(whats[j]) !== -1) {
	        this.dispatch('what is', data[0]);
	        break;
	      }
	    }

	    // under subjective tasks
	    const tasks = ['alex open', 'alex please open', 'please open', 'open'];
	    for (let k = 0; k < tasks.length; k++) {
	      const path = data[0].toLowerCase();
	      if (path.indexOf(tasks[k]) !== -1) {
	        this.dispatch('open file', path.replace(tasks[k], '').replace(/ /g, ''));
	        break;
	      }
	    }
	  });

	  // Start listening.
	  VoiceRecognition.start();
  }
}

module.exports = AlexPlugin;
