var express = require('express');
var app = express();
var http = require('http').Server(app);
// Ajoutons socket.io
var io = require('socket.io')(http);

// On gère les requêtes HTTP des utilisateurs en leur renvoyant les fichiers du dossier 'public'
app.use("/", express.static(__dirname + "/public"));
// Log de connexion et de déconnexion des utilisateurs
io.on('connection', function (socket) {
	var loggedUser;
	//log de connexion user avant login
	console.log('a user connected');
	
	// Déconnexion d'un utilisateur : broadcast: service-message
	socket.on('disconnect', function () {
	    if (loggedUser !== undefined) {
	      console.log('user disconnected : ' + loggedUser.username);
	      var serviceMessage = {
	        text: 'User "' + loggedUser.username + '" disconnected',
	        type: 'logout'
	      };
	      socket.broadcast.emit('service-message', serviceMessage);
		}
    });

    // Connexion d'un utilisateur - via formulaire - sauvegarde d'user + broadcast service-message
    socket.on('user-login', function (user) {
    	loggedUser = user;
    	if (loggedUser !== undefined) {
    		var serviceMessage = {
    			text: 'User "' + loggedUser.username + '" logged in',
    			type: 'login'
		 };
		 socket.broadcast.emit('service-message', serviceMessage);
    	}
    });
	// Réception de l'évènement 'chat-message' et réemission vers tous les utilisateurs
	socket.on('chat-messsage', function (message) {
		message.username = loggedUser.username; // On intègre ici le nom d'utilisateur au message
		io.emit('chat-message', message);
		console.log('Message de : ' + loggedUser.username);
	});

});
// On lance le serveur en écoutant les connexions arrivant sur le port 3000
http.listen(3000, function(){
  console.log('Server is running on localhost:3000');
});