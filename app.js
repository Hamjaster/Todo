//selectors

let addbtn = document.getElementById("todobtn")
let delbtn = document.getElementsByClassName("cross")
let editbtn = document.getElementsByClassName("edit")
let input =  document.getElementById("todoinput")
let input_main =  document.getElementById("search_main")
let list = document.getElementById("todolist")

function getAndupdate() {
   if(input.value!=''){
   if(localStorage.getItem('items')==null){
      itemsArray = []
      itemsArray.push(input.value)
      input.value=''
      localStorage.setItem('items',JSON.stringify(itemsArray))
      
      
   }else{
      itemsArray = JSON.parse(localStorage.getItem('items'))
      itemsArray.push(input.value)
      input.value=''
      localStorage.setItem('items',JSON.stringify(itemsArray))

   }
   }else{
      new Notify ({
         status: 'warning',
         title: 'Nothing Found',
         text: 'Enter some text as you future To-do',
         effect: 'fade',
         speed: 300,
         position: 'right top'
        
       })
       var audio = new Audio('error.mp3');
         audio.play();
   }
   update()
}


function update() {

   if(localStorage.getItem('items')==null){
      itemsArray = []
      // itemsArray.push(input.value)
      localStorage.setItem('items',JSON.stringify(itemsArray))

      
   }else{
      itemsArray = JSON.parse(localStorage.getItem('items'))
      // console.log(itemsArray);
      // itemsArray.push(input.value)
      localStorage.setItem('items',JSON.stringify(itemsArray))

   }
   items = JSON.parse(localStorage.getItem("items"))
   let html = "";
   Array.from(items).forEach(function(element,index) {
      html+=`
      <li class="todo">
      <p class="para">${element}</p>

      <div class="cont">

      <img class='edit' onclick="edit(${index})" src="edit.png" alt="edit image" srcset="">
      <button class="deltodo">
      <img class='cross' onclick='deltodo(${index})' src="close (1).png" alt="Cross image" srcset="">
      </button>

      </div>

</li>
      `
      list.innerHTML = html;
      
   })}





addbtn.addEventListener('click',getAndupdate)
input.addEventListener("keydown", function (e) {
   if (e.key === "Enter") {  
     getAndupdate()
   }
 });
update()

function deltodo(i) {
   itemsArray = JSON.parse(localStorage.getItem('items'))
   itemsArray.splice(i,1)
   
   // console.log(itemsArray,i);
   localStorage.setItem('items',JSON.stringify(itemsArray))
   
   items = JSON.parse(localStorage.getItem("items"))
   // console.log(items,'yay h');
   let html = "";
   Array.from(items).forEach(function(element,index) {
      html+=`
      <li class="todo">
            <p class="para">${element}</p>

            <div class="cont">

            <img class='edit' onclick="edit(${index})" src="edit.png" alt="edit image" srcset="">
            <button class="deltodo">
            <img class='cross' onclick='deltodo(${index})' src="close (1).png" alt="Cross image" srcset="">
            </button>

            </div>

      </li>
      `
      // console.log(html,'yay html h');
   })
      // console.log(html,'yay html h')
      list.innerHTML = html;

}

function edit(i){
   let cont = document.getElementsByClassName('cont')[i]
   // console.log(cont);
   let input = document.createElement('input')
   input.setAttribute('class','todoInput')
   
   let todos = document.getElementsByClassName('todo')
   // console.log(todos,i);
   let todo = todos[i];
   let p = document.getElementsByClassName("para")[i]

   p.innerText = ''
   cont.appendChild(input)
   // console.log(editbtn[i],delbtn[i]);
   editbtn[i].style.visibility = 'hidden';
   delbtn[i].style.visibility = 'hidden';

   let tick = document.createElement('img')
   input.focus()
   tick.setAttribute('class','tick')
   tick.src = "checked.png"
   cont.appendChild(tick)
   tick.addEventListener('click',()=>{
      // console.log(input.value);
      p.innerHTML  = input.value
      editbtn[i].style.visibility = 'visible';
      delbtn[i].style.visibility = 'visible';
      
      input.parentNode.removeChild(input);
      tick.parentNode.removeChild(tick);

      itemsArray = JSON.parse(localStorage.getItem('items'))
      itemsArray.splice(i,1,input.value)
      localStorage.setItem('items',JSON.stringify(itemsArray))
      update()
     
   })

      
   
}

function search() {
   let value = input_main.value
//   console.log(value);
   let todo = document.getElementsByClassName('todo')
   // console.log(todo[0]);
  
   Array.from(todo).forEach(function(e) {
    let txt = e.firstElementChild.innerText.toLowerCase();

    if (txt.includes(value)) {
      // console.log('haan g',txt,value);
       
      e.style.display = "flex"
    }else{
      e.style.display = "none"
     
 
    }
   })
   
   
   
}





input_main.addEventListener('input',()=>{
   search()
})