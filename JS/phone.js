const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')
    // clear previous search
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    phones.forEach( phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-4 bg-gray-100 shadow-xl ';
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Phone" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick = "handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show details</button>
          </div>
         </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading 
    toggleLoadingInfinity(false);
}

// Handle search button

const handleSearch = (isShowAll) =>{
    toggleLoadingInfinity(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll );
   
}
// Loading
const toggleLoadingInfinity = (isLoading) =>{
    const loadingInfinity = document.getElementById('load-infinity');
    if(isLoading){
        loadingInfinity.classList.remove('hidden');
    }
    else{
        loadingInfinity.classList.add('hidden');
    }
     
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

// handle show details

const handleShowDetail = async (id) =>{
//  load sibngle phone data
const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
const phone = data.data;
showPhoneDetails(phone);

}  

const showPhoneDetails = (phone) =>{
   
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <div class ="flex justify-center"><img src ="${phone.image}"/></div>
    <h3 class="font-bold text-center text-3xl mb-2">${phone?.name}</h3>
    <p> <sapan>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS: </span>${phone?.others?.GPS}</p>
    <p> <span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p> <span>ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
    <p> <span>Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p> <span>Slug: </span>${phone?.slug}</p>
    <p> <span>Release date: </span>${phone?.others?.releaseDate}</p>
    <p> <span>Brand: </span>${phone?.brand}</p>
    `
    show_details_modal.showModal();
}


