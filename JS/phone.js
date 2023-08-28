const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}


const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container')
    // clear previous search
    phoneContainer.textContent = '';
    phones.forEach( phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-4 bg-gray-100 shadow-xl ';
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Phone" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
         </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
}

// Handle search button

const handleSearch = () =>{
    toggleLoadingInfinity()
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
    console.log(searchText);

}

const toggleLoadingInfinity = () =>{
    const LoadingInfinity = document.getElementById('loading-infinity');
    LoadingInfinity.classList.remove = ('hidden');
}
loadPhone();
