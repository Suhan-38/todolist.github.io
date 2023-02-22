let alerta = document.getElementById("full");
let form = document.getElementById("form");
let itemsinput = document.getElementById("itemsinput");
let editbtn=document.getElementById("editbtn");
let submitbtn=document.getElementById("submitbtn");
let del = document.getElementsByClassName("del");
let edit = Array.from(document.getElementsByClassName("edit"));
let item = document.getElementsByClassName("item");
let grocerylist = document.getElementById("grocerylist");
let clear=document.getElementById("clear");
let countelem=document.getElementById("countelem");
let elementitem;
let flag = 0; //indicates whether item should be editted or added
let count = 0; //indicates no of items
form.addEventListener('submit', adding);
function adding(e) {
    e.preventDefault();
    const input = e.target.itemsinput;
    if (input.value != "" && flag === 0) {
        let add = document.createElement("div");
        count++;
        add.classList.add("item");
        add.innerHTML =
            `<p>${input.value}</p>
    <div class="inside-button">
        <button class="del" id="del"><i class="fa-solid fa-trash"></i></button>
        <button class="edit" id="edit"><i class="fa-regular fa-pen-to-square"></i></button>
        <input type="checkbox" name="check" class="checks" id="${count}">
    </div>`;

        grocerylist.appendChild(add);
        alert("item has been added","success");
        flag = 0;
        itemsinput.value="";
        countelem.innerText=count;

        // adding click eventlisener on edit button and passing function editinginside this is only triggered when one or more item added into
        // list u cannot write it outside adding function(this is for all event liseners here)

        let editelem=add.querySelector(".edit");
        editelem.addEventListener('click',editinginside);
         // adding click eventlisener on delete button and passing function deleteiteminside
        let delelem=add.querySelector(".del");
        delelem.addEventListener('click',deleteiteminside);
        // adding click eventlisener on checkbox 
        let checks = add.querySelector(".checks");
        checks.addEventListener('click',(e)=>{
            e.target.parentElement.parentElement.classList.toggle("checkeditem");
        })
    }

    // this else if is when u click and edit button flag ==1 suggest we are not adding we are editing
    else if (input.value != "" && flag === 1) {
        elementitem.innerText=input.value;
        submitbtn.textContent = "Submit";
        flag=0;
        itemsinput.value="";
        alert("item has been edited","normal")
    }

    // if u try click on submit without any inputtext this else statment will work
    else {
        alert("Please add item and click on submit","bf");
    }

}
function alert(text,classs){
    alerta.classList.add(classs);
    alerta.innerText=text;
    setInterval(()=>{
        alerta.classList.remove(classs);
        alerta.innerText="";
    },3000)
}

// the function called on clicking delete button
function deleteiteminside(e){
    count--;
    console.log(e.currentTarget.parentElement.parentElement);
    grocerylist.removeChild(e.currentTarget.parentElement.parentElement);
    alert(`The ${e.currentTarget.parentElement.previousElementSibling.innerText} has been removed`,"danger")
    countelem.innerText=count;
}
// the function called on clicking edit button
function editinginside(e){
    //here elementitem should have globalscope as you are not passing it to add function but add function has to use it
    elementitem=e.currentTarget.parentElement.previousElementSibling;
    submitbtn.textContent = "edit";
    setTimeout(()=>{
        itemsinput.focus();
    },100);
    flag=1;
    itemsinput.value=elementitem.innerText;
    setTimeout(()=>{
        itemsinput.select();
    },100);
}
// the function called on clicking allclear button
clear.addEventListener('click',()=>{
    count=0;
    countelem.innerText=count;
    grocerylist.innerHTML="";
    itemsinput.value="";
    submitbtn.textContent = "Submit";
    alert("All items cleared","bf");
})

