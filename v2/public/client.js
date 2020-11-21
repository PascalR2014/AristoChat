// Global io
var socket = io();

$('#login form').submit(function (e) {
	e.preventDefault();
	var user = {
		username : $('#login input').val().trim()
	};
	if (user.username.length > 0) { // Gestion champ non vide
		socket.emit('user-login', user);
		$('body').removeAttr('id'); // Cache formulaire de connexion
		$('#chat input').focus(); // Focus sur le champ du message
	}
});

// Envoi d'un message
$('#chat form').submit(function (e) {
	e.preventDefault(); //On évite le rechargement de la page à la validation du formulaire
	//On crée notre objet JSON corespondant à notre message
	var message = {
		text : $('#m').val()
	};
	$('#m').val(''); // On vide le champ texte
	if (message.text.trim().length !== 0) { // Gestion message vide
		socket.emit('chat-message', message);
	}
	$('#chat input').focus(); // focus sur le champ du message
});

// Réception d'un message client
socket.on('chat-message', function (message) {
	$('#messages').append($('<li>').html('<span class="username">' + message.username + '</span>' + message.text));
});

// Réception d'un message de service
socket.on('service-message', function (message) {
  $('#messages').append($('<li class="' + message.type + '">').html('<span class="info">information</span> ' + message.text));
});



