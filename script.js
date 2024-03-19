let userList = [];
const api = 'https://randomuser.me/api/?results=2';
const listElm = document.getElementById('cardList');
const fetchUsers = /* async to have async await inside the function*/ async (url = api) => {
    // const user = fetch(api);
    // console.log(user);


    // //promish method 
    /*
        fetch(api).then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data)=>{
            console.log(data.results);
        }).catch((error) => {
            console.log(error);
        });
    */

    //async/await method
    try {
        const respAwait = await fetch(url);
        const data = await respAwait.json();
        userList = data.results;
        display(userList);
    } catch (error) {
        console.log(error);
    }
}
fetchUsers();


const display = (userList) => {
    let userCard = ``;
    userList.forEach(usr => {
        userCard += `
        <div class="card flex-grow-1" style="width: 18rem">
        <img
          src="${usr.picture.large}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${usr.name.title} ${usr.name.first} ${usr.name.last}</h5>
          <ul class="list-unstyled">
            <li>${usr.phone}</li>
            <li>${usr.email}</li>
            <li>${usr.location.street.number} ${usr.location.street.name}, ${usr.location.city}, ${usr.location.state}, ${usr.location.postcode}</li>
          </ul>
        </div>
      </div>`;
    });

    listElm.innerHTML = userCard;
    document.getElementById('userCount').innerText = userList.length;
}

const handleOnGenderSelect = (e)=>{
   const gen = e.value;
   const urlGender = api + '&gender=' + gen;
   console.log(gen,urlGender);
   fetchUsers(urlGender);
}