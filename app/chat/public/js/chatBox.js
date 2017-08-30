let source = $("#discussion-bubble-template").html(); 
$.get("static/chat/views/partials/message_bubble/simple.hbs").then(function(source){ 
  Handlebars.registerPartial('chat.message_bubble.simple', Handlebars.compile(source));
});
localStorage.user = {
  '_id':"azqszeasdqsd",
  'name':"Simon Vivier",
  'avatar_url':"https://www.w3schools.com/w3images/workbench.jpg"
};
class ChatBox {
	constructor(id){
		console.log("ChatBox","creating chatbox-"+id);
		this.id = id;
		this.chatSelector = $('#chatBox-'+id);
		this.sender = localStorage.user;
		this.chat = {
			'_id':"5981cac8256eee6478bd053a",
			'participants':['azqszeasdqsd','ezfdsww'],
			'messages':[]
		};
		if (this.id === null){
			// create a chat and store it to chat
		}else{
			// get the chat from server
		}
		this.chatSelector.find('.sendmsg-area')
			.keypress((event)=>{this.sendmsgKeyPressHandler(event.keyCode,$(event.target,this.sender))});
	}
	sendmsgKeyPressHandler(keyCode,input,sender){
		switch(keyCode){
	  	case 13: //enter
			let text = input.val();
			if (text !== ''){
				console.log(this.sender); 	
				let msg = {
					content:text,
					owner:this.sender,
					date : new Date(),
					is_sender: true,
				};
				this.sendMsg(msg);
				this.appendMsg(msg);
				input.val('');
	      	}
	    	break;
	  }
	}
	appendMsg(msg){
		let bubbleTemplate = Handlebars.partials['chat.message_bubble.simple']; 
		let body = this.chatSelector.find('.body');
		body
		.append(bubbleTemplate(msg))
		.scrollTop(body[0].scrollHeight);
	}
	sendMsg(msg){
		console.log(this.chat,this.sender,msg)
		$.ajax({
			url:'/ajax/chat/sendmsg',
			context:this,
			type:'POST',
			data:{
				senderId:this.sender._id,
				chatId	:this.chat._id,
				msg 	: msg
			}
		})
	}
	getNewMsg(chatId){
			return [{
	    	owner:{
	        '_id':"azqszeasdqsd",
	        'name':"Simon Vivier",
	        'avatar_url':"https://www.w3schools.com/w3images/workbench.jpg"
	    	},
	      content:"incoming message"
	    }]
	}
}

