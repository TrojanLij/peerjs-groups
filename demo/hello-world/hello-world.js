//Adds some text to the document.
function addItem(item) {
	var element = document.createElement('p');
	element.innerHTML = escapeHTML(item);
	document.body.appendChild(element);
}

//Generate a random user ID for demo purposes.
var userID = "User" + Math.floor(Math.random() * 10000);

//Create the object we use to access all Peer.js Groups functionality.
var group = new PeerGroup(function (error) {
	addItem(error);
}, {host: 'localhost'});

//Accept any user into the group who tries to join.
group.addEventListener('joinrequest', function (event) {
	group.acceptUser(event.userID);
});

//When we receive a message, add it to the document.
group.addEventListener('message', function (event) {
	addItem(event.message);
});

//When we're accepted into the group then send a message.
group.addEventListener('joined', function (event) {
	//Wait until we're connected to all existing members.
	setTimeout(function () {
		group.send('Greetings from ' + userID);
	}, 1000);
});

//Connect to the group.
group.connect('MySession', userID);