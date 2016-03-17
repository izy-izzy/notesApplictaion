## Synopsis

Simple notes application is and online Angular.js application that supports multiple users and online change of notes without the need of refreshing the page. It supports multiple users and notes can be deleted, created and viewed.

## Installation

npm install
bower install (required for angularfire, latest NPM version lacks module export)
gulp
node httpserver.js (for local HTTP server)

## Requirements
Ruby, GEM, Node

## Technology

Firebase, Angular.js, GULP, CSS3, HTML5, Karma, Jasmine 

## Tests

Tests are run automatically via GULP.  

## Demo users

login: jane@notes.com
password : jane

login: mary@test.com
password : mary

demoserver: http://notes.lukaskalcok.com

## Contributors

lukaskalcok@gmail.com (Lukas Kalcok)

## Notes

* User session is set to 12 hours. After being idle for more than 12 hours, Firebase will destroy the session and user will be prompt to log in. 
* Set of tests could be expanded. At the moment, only controllers initilisation and filters are tested. 
* Application uses SweetAlert module instead of a classic Javascript alert. This solution was incorporated to inform the user about their action resolvement in a more user-friendly way.
* Application is fully responsive and was tested on the following setups:
	Microsoft Windows 10:
		Google Chrome (v.48)
		Mozilla Firefox (v.43)
		Microsoft Internet Explorer (v.11, v.10, v.9)
		Opera Browser (v.35)
	Lenovo A7000 / Android 5.0:
		Google Chrome (v.48)