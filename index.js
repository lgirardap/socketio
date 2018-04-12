var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client){
	var shuffleInterval;
  console.log("Connected <3");
  client.on('start shuffle', function(msg){
	  console.log("test update");
	 
	  shuffleInterval = setInterval( function(){
		  var list = getList();
		  io.emit('shuffle', list);
	  }, 1000 );
	  
  });
  
  client.on('stop shuffle', function(msg){
	 clearInterval( shuffleInterval );  
  });
  
  client.on('disconnect', function(){
	   console.log('user disconnected');
  });
});

function getList(){
	
	 var list = [
	  {id : "1", message : "Hello from Socket IO" },
	  {id : "2", message : "My journey with Vue2" },
	  {id : "3", message : "My journey with Vue2" },
	  {id : "4", message : "Blogging with Vue2" },
	  {id : "5", message : "Hello from Socket IO" },
	  {id : "6", message : "Why Vue is so fun2" },
	  ];
	  
	  shuffle(list);
	 return list;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

server.listen(3000);