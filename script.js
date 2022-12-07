var tbody = document.getElementById('tbody')
var tr = () => document.createElement('tr')
var btn = () => document.createElement('button')
var  td = () => document.createElement('td')
var nextBtn = document.getElementById('next')
var prevBtn = document.getElementById('prev')
var firstBtn = document.getElementById('first')
var lastBtn = document.getElementById('last')
var currentPage = document.getElementById('currentPage')
var totalPage = document.getElementById('totalPages')
var pageCon = document.getElementById('pageBtns')

// initiate class for pagination task

class Pagination {
constructor(){
    this.firstIndex = 0 
    this.send()



}
send(data){this.data = data}
// logic for pagination buttons
buttons(){
   
        
        // condition logic for next button
        if(this.firstIndex < this.data.length-6   && this.firstIndex >= 0){
        nextBtn.style.display = "block"
    } else {
        nextBtn.style.display = "none"
    }
    // condition logic for prev btn

    if(this.firstIndex > 0 && this.firstIndex < this.data.length){
        prevBtn.style.display = "block"
    }else{
        prevBtn.style.display = "none"
    }

    
}

// to display table contents
display(){

    
   // navigation i.e showing current and total page number
    
    totalPage.innerHTML = this.data.length/5;
    currentPage.innerHTML = (this.firstIndex/5)+1
    
    //display table
    tbody.innerHTML = ''
    for(let i = this.firstIndex ; i < this.firstIndex+5; i++){
    
        // console.log(data[i].id)
        var row = tr()
        var rowData = [td(), td(), td()]
        rowData[0].innerHTML = this.data[i].id
        rowData[1].innerHTML = this.data[i].name
        rowData[2].innerHTML = this.data[i].email
        row.append(...rowData)
        tbody.append(row)
    }

this.buttons()
}

// to change next page
next(){
   
    this.firstIndex = this.firstIndex + 5
    this.display()
   
}

// to change previous page
prev(){
    this.firstIndex = this.firstIndex - 5
    this.display()
}

// to set the page number
setPage(num){
this.firstIndex = num *5
this.display()
}
lastPage(){
    
        this.setPage((this.data.length/5)-1)
   
}
}


// fetch data 
var page = new Pagination()
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json",true);
xhr.send();

    xhr.onload = function(){
        var a = JSON.parse(this.response);
       
        //invoke the data

        page.send(a)
       
        page.display()
        // generate buttons

var numOfBtn = a.length/5;
for(let i = 0 ; i < numOfBtn ; i++){
   var pageBtn = btn()
   pageBtn.setAttribute('onclick',`page.setPage(${i})`)
   pageBtn.setAttribute('class', 'btn btn-dark')
   pageBtn.innerHTML = i+1

   pageCon.append(pageBtn)
}
        // button actions i.e click event actions
        
        firstBtn.addEventListener('click', ()=>page.setPage(0))
        lastBtn.addEventListener('click', ()=>page.lastPage())
        nextBtn.addEventListener('click', ()=> page.next())
        prevBtn.addEventListener('click', ()=> page.prev())

}
xhr.onerror = function(){
   console.log( this.statusText);
}
