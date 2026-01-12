class Car{
 constructor(id,name,price,image){
  this.id=id;this.name=name;this.price=price;
  this.image=image;this.available=true;
 }
}

const cars=[
 new Car("C001","BMW X5",15000,"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"),
 new Car("C002","Audi A6",14000,"https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg"),
 new Car("C003","Mercedes G-Wagon",25000,"https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"),
 new Car("C004","Tesla Model S",20000,"https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg"),
 new Car("C005","Range Rover Sport",22000,"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg")
];

const rentals=[];
let selectedCar=null;

function loadCars(){
 carsContainer.innerHTML="";
 carSelect.innerHTML="";
 returnCarSelect.innerHTML="";
 rentedList.innerHTML="";

 cars.forEach(car=>{
  carsContainer.innerHTML+=`
  <div class="car-card" onclick="openModal('${car.id}')">
   <img src="${car.image}">
   <div class="car-info">
    <h3>${car.name}</h3>
    <p>₹${car.price}/day</p>
    <p class="${car.available?'available':'rented'}">${car.available?'Available':'Rented'}</p>
   </div>
  </div>`;
  if(car.available) carSelect.innerHTML+=`<option value="${car.id}">${car.name}</option>`;
  else returnCarSelect.innerHTML+=`<option value="${car.id}">${car.name}</option>`;
 });

 rentals.forEach(r=>{
  rentedList.innerHTML+=`<li>${r.name} | ${r.customer} | ${r.days} days | ₹${r.total}</li>`;
 });
 totalRented.innerText=rentals.length;
}

function openModal(id){
 selectedCar=cars.find(c=>c.id===id);
 modalImg.src=selectedCar.image;
 modalName.innerText=selectedCar.name;
 modalPrice.innerText="₹"+selectedCar.price+"/day";
 modalStatus.innerText=selectedCar.available?"Available":"Rented";
 carModal.style.display="flex";
}
function closeModal(){carModal.style.display="none";}

function quickRent(){
 if(!selectedCar.available) return;
 carSelect.value=selectedCar.id;
 rentalDays.value=1;
 closeModal();
}

function rentCar(){
 const id=carSelect.value;
 const days=parseInt(rentalDays.value);
 const customer=customerName.value;
 const car=cars.find(c=>c.id===id && c.available);
 if(!car||!customer||!days) return;
 car.available=false;
 const total=car.price*days;
 rentals.push({id:car.id,name:car.name,customer,days,total});
 rentResult.innerText=`Booked ${car.name} | ₹${total}`;
 loadCars();
}
function returnCar(){
 const id=returnCarSelect.value;
 const car=cars.find(c=>c.id===id);
 car.available=true;
 rentals.splice(rentals.findIndex(r=>r.id===id),1);
 returnResult.innerText=`${car.name} Returned`;
 loadCars();
}
loadCars();

