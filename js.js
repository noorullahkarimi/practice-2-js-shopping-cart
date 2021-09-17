//variable 
const productContent = document.querySelector('.product'),
    shoppCard = document.querySelector('.tbody');

//events 
eventsListener()
function eventsListener() {
    productContent.addEventListener('click', buy);
    document.querySelector('.shoppingPage').addEventListener('click', remove);
    document.querySelector('.removeAllCourse').addEventListener('click', removeAll);
    document.addEventListener('DOMContentLoaded', loadLocal);
}

//functions
function buy(e) {
    e.preventDefault();
    if (e.target.classList.contains('addToShoppingCard')) {
        const courses = e.target.parentElement.parentElement;
        getCourseElement(courses);
    }
}
function getCourseElement(courses) {
    const element = {
        img: courses.querySelector('img').src,
        title: courses.querySelector('h1').textContent,
        price: courses.querySelector('small').textContent
    }
    // console.log(courses);
    addToLS(element);
    addToCard(element);
}
function addToCard(element) {
    console.log('line 31');
    let row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${element.img}" style="width:100px !important;"/></td>
    <td>${element.title}</td>
    <td>${element.price}</td>
    <td class='remove'>x</td>
    `;
    shoppCard.appendChild(row);

}
function remove(e) {
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
    }
    let parent = e.target.parentElement;
    removeLS(parent.querySelectorAll('td')[1].textContent);
    
}
function removeLS(title){
    let local= getCourseElementLS();
    local.forEach(function(element,index){
        if(element.title==title){
            local.splice(index,1);
        }
    });
    localStorage.setItem('course',JSON.stringify(local));
}
function removeAll(e) {
    while (shoppCard.firstChild) {
        shoppCard.firstChild.remove();
    }
    clearCartLS();
}
function clearCartLS(){
    localStorage.clear();
}
function addToLS(element) {
    console.log(element);
    let local = getCourseElementLS();
    console.log(local);
    local.push(element);
    localStorage.setItem('course', JSON.stringify(local));
}
function getCourseElementLS() {
    let local;
    const ls=localStorage.getItem('course');
    if (ls===null) {
        local = [];
    } else {
        local = JSON.parse(ls);
    }
    return local;
}
function loadLocal() {
    let local = getCourseElementLS();
    local.forEach(element => {
        let row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${element.img}" style="width:100px !important;"/></td>
    <td>${element.title}</td>
    <td>${element.price}</td>
    <td class='remove'>x</td>
    `;
    shoppCard.appendChild(row);
    });
}