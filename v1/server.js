// Tout d'abbord on initialise notre application avec le framework Express 
// et la bibliothèque http integrée à node.
var express = require('express');
var app = express();
var http = require('http').Server(app);
// Ajoutons socket.io
var io = require('socket.io')(http);
/*
// Ajout perso 1
var bodyParser = require('body-parser');
*/

// On gère les requêtes HTTP des utilisateurs en leur renvoyant les fichiers du dossier 'public'
app.use("/", express.static(__dirname + "/public"));
// Log de connexion et de déconnexion des utilisateurs
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
// Réception de l'évènement 'chat message' et réemission vers tous les utilisateurs
	socket.on('chat-message', function (message) {
		io.emit('chat-message', message);
	});
});
/*
// Ajout perso 2 - parse application json
app.use(bodyParser.json());

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
});
*/

// On lance le serveur en écoutant les connexions arrivant sur le port 3000
http.listen(3000, function(){
  console.log('Server is running on localhost:3000');
});