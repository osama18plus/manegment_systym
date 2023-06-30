

let name = document.getElementById("name");
let price = document.getElementById("price");
let date = document.getElementById("date");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let count = document.getElementById("count");
let mood = 'create';
let tmp;

// let lightemood = document.getElementById('lightedark');
// let body = document.getElementById('body');


// get total
function gettotal()
{
    if(price.value !=""){
        let result = (+price.value +  +ads.value) - +discount.value; 
        total.innerHTML = result;
        total.style.background = "#040";
    }else{
        total.innerHTML = "";
        total.style.background = "#a00d02";

    }

}
// create product

let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}


submit.onclick = function(){
    let newpro = {
        name:name.value.toLowerCase(),
        price:price.value,
        date:date.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }


    if(mood==='create'){
        if(newpro.count>1){
            for(let i = 0; i < newpro.count; i++ ){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
        }

    }else{
        datapro[tmp]=newpro;
        mood='create';
        count.style.display='block';
        submit.innerHTML='create';
        total.style.background='#a00d02';

    }
    
    // datapro.push(newpro);
    // save localstorage
    localStorage.setItem("product",  JSON.stringify(datapro))
    clearData()
    showData()
    




    
}








// clear inputs
function clearData(){
    name.value = "";
    price.value = "";
    date.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";

}
// read function
function showData(){
    let table = "";
    for(let i = 0 ; i < datapro.length; i++){
        table +=`<tr>
                     <td>${i}</td>
                     <td>${datapro[i].name}</td>
                     <td>${datapro[i].price}</td>
                     <td>${datapro[i].date}</td>
                     <td>${datapro[i].ads}</td>
                     <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                  </tr>
                 `;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDeleteAll = document.getElementById("deleteAll");
    if(datapro.length > 0 ){
        btnDeleteAll.innerHTML = `
        <button onclick=deleteDataAll()>Delete All(${datapro.length})</button>
        `

    }else{
        btnDeleteAll.innerHTML = '';
    }

}

showData()
// delete function
function deleteData(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showData()

}
function deleteDataAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();

}

// count
// update
function updateData(i){
    name.value=datapro[i].name;
    price.value=datapro[i].price;
    date.value=datapro[i].date;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    count.style.display='none';
    gettotal();
    submit.innerHTML='update';
    mood='updateData';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })

}
// search

let searchmood = "name";
function getsearchmood(id){
    let search = document.getElementById('search');
    if(id =="searchname"){
        searchmood = "name";
        
    }else{
        searchmood = "category";
    }
    search.placeholder = "search by "+ searchmood;
    search.focus();
    search.value ='';
    showData();

}

function searchData(value){
    let table = '';
    if(searchmood=='name'){
        for(let i = 0; i<datapro.length; i++){
            if(datapro[i].name.includes(value.toLowerCase())){
                table +=`<tr>
                            <td>${i}</td>
                            <td>${datapro[i].name}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].date}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick='updateData(${i})' id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                         </tr>
                         `;
                         let btnDeleteAll = document.getElementById("deleteAll");
                        btnDeleteAll.innerHTML = `
                        <button onclick=deleteDataAll()>Delete All(${+table.length})</button>
                        `
                        
            }
        
        }
        
    }else{
        for(let i = 0; i<datapro.length; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`<tr>
                            <td>${i}</td>
                            <td>${datapro[i].name}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].date}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick='updateData(${i})' id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                         </tr>
                         `;
                         
            }
        }

    }
    
        document.getElementById("tbody").innerHTML = table;
        
                
        
       
        
        
    
        

           
            
    
       
}








// clean data



















// darkmood lightemood
// function lighte(){
//     name.style.background='#fff';
//     price.style.background='#fff';
//     date.style.background='#fff';
//     ads.style.background='#fff';
//     discount.style.background='#fff';
//     count.style.background='#fff';
//     category.style.background='#fff';
//     body.style.background = '#5604';
//     search.style.background='#fff';
    



// }