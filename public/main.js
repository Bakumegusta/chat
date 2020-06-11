
$(document).ready(function() {
 
    // scroll down
    function updateScroll(){
        var element = document.querySelector(".nano-content");
        element.scrollTop = element.scrollHeight;
    }
    var name; 
    var email;
    var id = getRandomInt(0, Date.now());
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yy = date.getFullYear();
    date = `${dd}/${mm}/${yy}`;
    sessionStorage.setItem('sessionID',id);
    var sessionID = sessionStorage.getItem('sessionID');
    let answer;
    let data ;
    var requrementform = false;
    var submit = document.querySelector('#submit');
    var options = document.querySelectorAll('.option');
    var x = document.getElementById("sound"); 
    var y = document.getElementById("sound2"); 

    function option(){
        options.forEach(function(option){
            // console.log(option);
            option.addEventListener('click',function(e){
                var ask = e.target.textContent;
                // console.log(ask);
                chaton(ask);
            });
            
        });
    }
    option();
    var bot = new RiveScript();
        bot.loadFile([
            "main.rive",
            "asset/brain/standard.rive",
             "asset/brain/test.rive",

          ]).then(loading_done).catch(loading_error);
        //  chat bot ready
        function loading_done() {
            console.log('chatbot ready');
            bot.sortReplies();
        }
        //  chat bot  not ready
        function loading_error() {
            console.log('chatbot not ready');
        }
        // event call
    submit.addEventListener('click', chat);
    function chat() {  
       
        // console.log(data);                

        $('.yesno').hide();
        var chatinput = document.querySelector('#chat-input').value;
        //  console.log(chatinput);
        if(chatinput != ''){
            // typing
            setTimeout(function(){
                $('#typing').show();     
                updateScroll();
                },500);
                chaton(chatinput);
                
        }else{
            $('.alert').show();
            setTimeout(function(){
            $('.alert').hide();             
                },3000);
        }
        
    }
    function chaton(user) {    
    var time = Date.now();

        $('.yesno').hide();

            setTimeout(function(){
                $('#typing').show();
                updateScroll();
                },500);
            let username = "local-user";
            bot.reply(username, user).then(function(reply) {
                // console.log("The bot says: " + reply);
             // output on ui
            var parent = document.querySelector('#parent');
            var query = document.createElement('li');
            var bot = document.createElement('li');
            bot.setAttribute('class', 'mar-btm');
            query.setAttribute('class', 'mar-btm');
            query.innerHTML = `
                                <div class="media-body pad-hor speech-right">
                                    <div class="speech">
                                        <p>${user}</p>
                                    </div>
                                </div>
                                `;
            bot.innerHTML = `
                            <div class="media-left">
                                <img src="https://icrewsystems.com/icrewsystems_mascot.gif" class="img-circle img-m" alt="Profile Picture">
                            </div>
                            <div class="media-body pad-hor">
                                <div class="speech">
                                    <p>${reply}</p
                                </div>                      
                            </div>
                             `;
                                 
            x.play();
            // console.log(query);
            parent.appendChild(query);
            updateScroll();
    
            setTimeout(function(){
                parent.appendChild(bot);
                y.play();
                updateScroll();
                $('#typing').hide();           
                // newva
                $('.yesno').on('click',function(e){
                    // console.log(e.target.parentNode.parentNode.parentNode);
                    // e.target.parentNode.style.display = 'none';
                    chaton(e.target.textContent);
                }) ;
                },3000);
                
                // save data
                var pos = reply.indexOf("");
                var poss = reply.lastIndexOf("?");
                answer = reply.slice(pos,poss);
                data = ({user:user,answer:answer,date:date,sessionID:sessionID,id:time,name:name,email:email});
                console.log(data);     
                
                const options = {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body:JSON.stringify(data)
                }
                fetch('/api', options).then(response => {
                    console.log(response);
                })
            // reset input field
            document.querySelector('#chat-input').value='';
            });
        // }
        
    }


    // enter key
    window.addEventListener('keypress', function (e) {
        if (e.keyCode == 13) {
            // chars.push(e.key);         
            chat();
        }
    }, false);

    // close btn
    $('.shut').on('click',function(){
        $('.requirementform').hide();
    })
    // id generate
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

      $('#data').on("click",function(e){
        e.preventDefault();
        name = document.querySelector('#name').value;
        email = document.querySelector('#email').value;
        if(name == '' || email == ''){
            $('.banned').show();
        }else{
            console.log(name);
            console.log(email);
            $('.requirementform').hide();
        }
         
    })
         
});


