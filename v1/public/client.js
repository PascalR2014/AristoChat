// Global io
var socket = io();

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

// Réception d'un message
socket.on('chat-message', function (message) {
	$('#messages').append($('<li>').text(message.text));
});


