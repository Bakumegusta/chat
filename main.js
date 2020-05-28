$(document).ready(function() {
    $('.alert').hide();
    function updateScroll(){
        var element = document.querySelector(".nano-content");
        element.scrollTop = element.scrollHeight;
    }
    var submit = document.querySelector('#submit');
    var options = document.querySelectorAll('.option');
    var x = document.getElementById("sound"); 
    var y = document.getElementById("sound2"); 
    options.forEach(function(option){
        console.log(option);
        option.addEventListener('click',function(e){
            var ask = e.target.textContent;
            console.log(ask);
            chaton(ask);
        });
        
    })
    
    var bot = new RiveScript();
        bot.loadFile("main.rive").then(loading_done).catch(loading_error);
        //  chat bot ready
        function loading_done() {
            console.log('chatbot ready');
            bot.sortReplies();
        }
        //  chat bot  not ready
        function loading_error() {
            console.log('chatbot not ready');
        }

    submit.addEventListener('click', chat);
    function chat() {  
        var chatinput = document.querySelector('#chat-input').value;  
         console.log(chatinput);
        if(chatinput != ''){
            let username = "local-user";
        bot.reply(username, chatinput).then(function(reply) {
            console.log("The bot says: " + reply);

         // output on ui
        var parent = document.querySelector('#parent');
        var query = document.createElement('li');
        var bot = document.createElement('li');
        bot.setAttribute('class', 'mar-btm');
        query.setAttribute('class', 'mar-btm');
        query.innerHTML = `
    							<div class="media-body pad-hor speech-right">
    								<div class="speech">
    									<p>${chatinput}</p>
    								</div>
    							</div>

   			 `;
        bot.innerHTML = `
    							<div class="media-body pad-hor">
    								<div class="speech">
    									<p>${reply}</p
    								</div>
    							</div>
   			 `;

        console.log(query);
        parent.appendChild(query);   
        updateScroll();

        x.play();
        setTimeout(function(){
            parent.appendChild(bot);
            y.play();
            updateScroll();
            },2000);

        // reset input field
        document.querySelector('#chat-input').value='';
        });
        }else{
            $('.alert').show();
            setTimeout(function(){
            $('.alert').hide();
                
                },3000);

        }
        
    }

    function chaton(ask) {  
        let username = "local-user";
        bot.reply(username, ask).then(function(reply) {
            console.log("The bot says: " + reply);

         // output on ui
        var parent = document.querySelector('#parent');
        var query = document.createElement('li');
        var bot = document.createElement('li');
        bot.setAttribute('class', 'mar-btm');
        query.setAttribute('class', 'mar-btm');
        query.innerHTML = `
    							<div class="media-body pad-hor speech-right">
    								<div class="speech">
    									<p>${ask}</p>
    								</div>
    							</div>

   			 `;
        bot.innerHTML = `
    							<div class="media-body pad-hor">
    								<div class="speech">
    									<p>${reply}</p
    								</div>
    							</div>
   			 `;

        x.play();
        console.log(query);
        parent.appendChild(query);
        updateScroll();

        setTimeout(function(){
            parent.appendChild(bot);
            y.play();
            updateScroll();
            },2000);

        // reset input field
        document.querySelector('#chat-input').value='';
        });
    }


});


