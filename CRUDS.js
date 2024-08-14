"use strict";

let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let dicount= document.getElementById('dicount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let create= document.getElementById('create');
let mood='create';
let tmp;
window.onbeforeunload= function () {
  window.scrollTo(0, 0);
 }

// get total
function getTotal() {
    if(price.value!=''){
    let result;
    result=(+price.value+ +taxes.value+ +ads.value)- +dicount.value;
    total.innerHTML=result;
    total.style.background='green';
    }
    else
    {
        total.innerHTML='Total :';
        total.style.background='red';
    }
  }

// Create
  let storageProudact;
  if(localStorage.Proudact!=null){
     storageProudact =JSON.parse(localStorage.Proudact);
  }
  else{
     storageProudact=[];
  }

 create.onclick= function proudactCreate(){
    let pro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        dicount:dicount.value,
        total:total.innerHTML,
        category:category.value.toLowerCase(),
        count:count.value,
    }

// Count + CleanData
    if(title.value!='' && price.value!='' && category.value!='' && count.value<101){
       if(mood === 'create'){
        
    if(pro.count>1){
        for(let i=0;i<pro.count;i++){
            storageProudact.push(pro);
        }
    }
    else{
        storageProudact.push(pro);
    }
    }else{
        storageProudact[tmp]=pro;    
        create.innerHTML='Create';
        count.style.display='block';

    }

    }else{
      alert('Please Enter Title & Price & Category & Count < 100 ');
    }

    localStorage.setItem("Proudact",JSON.stringify(storageProudact));
    clearInputs();
    read();
  }

// Clear Inputs

function clearInputs(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    dicount.value="";
    total.innerHTML='Total : ';
    count.value='';
    category.value='';

}

// Read

function read() {
    getTotal();
    let table='';

    for(let i=0;i<storageProudact.length;i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${storageProudact[i].title}</td>
            <td>${storageProudact[i].price}</td>
            <td>${storageProudact[i].taxes}</td>
            <td>${storageProudact[i].ads}</td>
            <td>${storageProudact[i].dicount}</td>
            <td>${storageProudact[i].total}</td>
            <td>${storageProudact[i].category}</td>
            <td>
            <button onclick="updateInputs(${i});" class="btn btn-primary">Update</button>
            </td>
            <td>
            <button onclick="deleteInputs(${i})" id="delete" class="btn btn-primary">Delete </button>
            </td>
        </tr>
        `
        
    }
    document.getElementById('tbody').innerHTML=table;
//Creating Deletall button.
    let deleteAll= document.getElementById('deleteAll');

    if(storageProudact.length>0){
        deleteAll.innerHTML=`
        <div class="row ms-0 mt-2 ">
        <button onclick="deleteBtn();" class="btn btn-primary">Delete All</button>
        </div>
        `
    }
    else{
        deleteAll.innerHTML="";
    }
  }
  read();
  

// Delete

  function deleteInputs(i){
    storageProudact.splice(i,1);
    localStorage.Proudact=JSON.stringify(storageProudact);
    read();
  }

// Delete All
  function deleteBtn(){
    localStorage.clear();
    storageProudact.splice(0);
    read();

  }

// Update

function updateInputs(i){
    title.value=storageProudact[i].title;
    price.value=storageProudact[i].price;
    taxes.value=storageProudact[i].taxes;
    ads.value=storageProudact[i].ads;
    dicount.value=storageProudact[i].dicount;
    count.value=storageProudact[i].count;
    category.value=storageProudact[i].category;
    create.innerHTML='Update';
    mood='update';
    count.style.display='none';
    tmp=i;
    scroll({
        top:0,behavior:'smooth',
    })
    getTotal();
    
 
}

// Search By Title Or Categeory

let searchMood='title';
function search(id){
  let searchInput=document.getElementById('search');
  if(id == 'search-titile'){
    searchMood ='title';
    searchInput.placeholder='Search By Title';
    

  }else{
    searchMood='category';
    searchInput.placeholder='Search By Category';

  }
  searchInput.focus();
  searchInput.value='';
  read();
  scrollTo(0, document.body.scrollHeight);

}


function searchData(value) {
    let table='';  
    if(searchMood =='title'){
      for(let i=0;i<storageProudact.length;i++){
        if(storageProudact[i].title.includes(value.toLowerCase())){
            
          table +=`
        <tr>
            <td>${i}</td>
            <td>${storageProudact[i].title}</td>
            <td>${storageProudact[i].price}</td>
            <td>${storageProudact[i].taxes}</td>
            <td>${storageProudact[i].ads}</td>
            <td>${storageProudact[i].dicount}</td>
            <td>${storageProudact[i].total}</td>
            <td>${storageProudact[i].category}</td>
            <td>
            <button onclick="updateInputs(${i});" class="btn btn-primary">Update</button>
            </td>
            <td>
            <button onclick="deleteInputs(${i})" id="delete" class="btn btn-primary">Delete </button>
            </td>
        </tr>
        `
        }
      }
    }
    else{
      for(let i=0;i<storageProudact.length;i++){
        if(storageProudact[i].category.includes(value.toLowerCase())){
            
          table +=`
        <tr>
            <td>${i}</td>
            <td>${storageProudact[i].title}</td>
            <td>${storageProudact[i].price}</td>
            <td>${storageProudact[i].taxes}</td>
            <td>${storageProudact[i].ads}</td>
            <td>${storageProudact[i].dicount}</td>
            <td>${storageProudact[i].total}</td>
            <td>${storageProudact[i].category}</td>
            <td>
            <button onclick="updateInputs(${i});" class="btn btn-primary">Update</button>
            </td>
            <td>
            <button onclick="deleteInputs(${i})" id="delete" class="btn btn-primary">Delete </button>
            </td>
        </tr>
        `
        }
      }
    }
    document.getElementById('tbody').innerHTML=table;

  }