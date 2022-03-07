const inputN = document.getElementById('inputN');
const inputC = document.getElementById('inputC');
const submit = document.getElementById('submit');
const container = document.getElementById('container-question');
const dropdown = document.getElementById('dropdown');
console.log(dropdown.value)
const myget=()=>{
    fetch('/api',{method:'GET'}).then((res)=> res.json()).then((getdata)=>{
        console.log('get data',typeof(getdata))
    getdata.forEach(element => {
frontuser(element)
        
    });
    })
}
myget();

const mypost = (mydata) => {
    fetch('/api', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mydata),
    }).then((res) => res.json()).then((result) => {
        alert(`if there is any issue please contact us and applay your id:${result.id}`)
        console.log(result)
        frontuser(result)

    })
}
const frontuser = (result) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card', 'mb-3', 'w-50');

    // Create card header
    const cardHeaderEl = document.createElement('h4');
    cardHeaderEl.classList.add(
        'card-header',
        'bg-dark',
        'text-light',
        'p-2',
        'm-0'
    );
    cardHeaderEl.innerHTML = `<b>User</b> ${result.name} <hr>`;


    // Create card body
    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
    cardBodyEl.innerHTML = `<b> Item:<b> ${result.item} <hr> 
    <b> Item's ID: ${result.id} <b> <hr>
    <b>review:</b> ${result.comment}`;

    // Append the header and body to the card element
    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);

    // Append the card element to the tips container in the DOM
    container.appendChild(cardEl);



}







function myfun() {
    const userdata = {
        name: inputN.value.trim(),
        comment: inputC.value.trim(),
        item: dropdown.value.trim()
    }
    mypost(userdata)

}
