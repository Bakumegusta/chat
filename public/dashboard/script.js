
getchat();
async function getchat(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);
    data.forEach(function(data){
      console.log(data.user);
      var tr = document.createElement('tr');
      var chatparent = document.querySelector('#chatparent');
  
      tr.innerHTML = `
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.user}</td>
                    <td>${data.answer}</td>
                    <td>${data.sessionID}</td>
                    <td>${data.date}</td>  
                    <td ><button class ='session option' value ="${data.sessionID}" onclick="conversation(this.value)"> view convo</button></td>  

                    `;
                    chatparent.append(tr);
    })
      $('#chattable').DataTable();


}


async function conversation(value){
    const response = await fetch('/api');
    const data = await response.json();
    function sortByProperty(property){  
      return function(a,b){  
         if(a[property] > b[property])  
            return 1;  
         else if(a[property] < b[property])  
            return -1;  
     
         return 0;  
      }  
   }
    console.log(value);

    const convo = data.filter(function(convo){
      if(convo.sessionID == value ){
        return true;
      }
    });
    convo.sort(sortByProperty('id'));
    console.log(convo);
    convo.forEach(function(data){
      console.log(data);
      
      var convoparent = document.querySelector('#convoparent');
      var answer = document.createElement('li');
      var query = document.createElement('li');
      answer.setAttribute('class',"in");
      query.setAttribute('class',"out");
                    query.innerHTML = `
                    <div class="chat-body">
                    <div class="chat-message">
                      <p>${data.user}</p>
                    </div>
                  </div>
          
                        `;
                        answer.innerHTML = `
                        <div class="chat-body">
                        <div class="chat-message">
                          <p>${data.answer}</p>
                        </div>
                      </div>
              
                            `;

                        convoparent.append(query);
                        convoparent.append(answer);

                        $('#chatpop').show();
                        $('.shut').on('click', function(){
                          $('#chatpop').hide();
                          $('.in').remove();
                          $('.out').remove();                  
                        })
      
    })
  
}
