class Car{
    constructor(id,name,price,image){
        this.id=id;
        this.name=name;
        this.price=price; // INR
        this.image=image;
        this.available=true;
    }
}

const cars=[
    new Car("C001","BMW X5",15000,"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"),
    new Car("C002","Audi A6",14000,"https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg"),
    new Car("C003","Mercedes G-Wagon",25000,"https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"),
    new Car("C004","Tesla Model S",20000,"https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg"),
    new Car("C005","Range Rover Sport",22000,"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg"),
    new Car("C006","Mahindra Thar",5500,"https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"),
    new Car("C007","Toyota Fortuner",6000,"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"),
    new Car("C008","Hyundai Creta",4000,"https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"),
    new Car("C009","Honda City",3500,"https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg"),
    new Car("C010","Skoda Superb",5000,"https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"),
    new Car("C011","Mini Cooper",7000,"https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg"),
    new Car("C012","Volvo XC90",18000,"https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"),
    new Car("C013","Lexus RX",16000,"https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"),
    new Car("C014","Jeep Compass",5200,"https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"),
    new Car("C015","Kia Seltos",3800,"https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg")
];

const rentals=[];

function loadCars(){
    carsContainer.innerHTML="";
    carSelect.innerHTML="";
    returnCarSelect.innerHTML="";
    rentedList.innerHTML="";

    cars.forEach(car=>{
        carsContainer.innerHTML+=`
        <div class="car-card">
            <img src="${car.image}">
            <div class="car-info">
                <h3>${car.name}</h3>
                <p>ID: ${car.id}</p>
                <p>₹${car.price}/day</p>
                <p class="${car.available?'available':'rented'}">
                ${car.available?'Available':'Rented'}
                </p>
            </div>
        </div>`;

        if(car.available)
            carSelect.innerHTML+=`<option value="${car.id}">${car.id} - ${car.name}</option>`;
        else
            returnCarSelect.innerHTML+=`<option value="${car.id}">${car.id} - ${car.name}</option>`;
    });

    rentals.forEach(r=>{
        rentedList.innerHTML+=`
        <li>${r.id} | ${r.name} | ${r.customer} |
        ${r.days} days | ₹${r.total}</li>`;
    });

    totalRented.innerText=rentals.length;
}

function rentCar(){
    const id=carSelect.value;
    const days=parseInt(rentalDays.value);
    const customer=customerName.value;

    const car=cars.find(c=>c.id===id && c.available);
    if(!car || !customer || !days) return;

    car.available=false;
    const total=car.price*days;

    rentals.push({id:car.id,name:car.name,customer,days,total});
    rentResult.innerText=`✅ ${car.name} booked | Total ₹${total}`;

    loadCars();
}

function returnCar(){
    const id=returnCarSelect.value;
    const car=cars.find(c=>c.id===id);
    if(!car) return;

    car.available=true;
    const index=rentals.findIndex(r=>r.id===id);
    rentals.splice(index,1);

    returnResult.innerText=`🔁 ${car.name} returned successfully`;
    loadCars();
}

loadCars();
