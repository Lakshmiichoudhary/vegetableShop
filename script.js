const baseURL = 'https://crudcrud.com/api/3dfea2672bc44dd79d3d4099d3208c1a/vegetables';
let vegetables = [];

async function fetchData() {
    try {
        const response = await axios.get(baseURL);
        vegetables = response.data;
        displayVegetables();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function displayVegetables() {
    const vegList = document.getElementById('vegList');
    vegList.innerHTML = '';
    let totalCount = 0;

    vegetables.forEach(vegetable => {
        const li = document.createElement('li');
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = `Quantity: ${vegetable.quantity} KG`;
        li.textContent = `${vegetable.name} - Price: ${vegetable.price} Rupees/KG, `;
        
        const buyInput = document.createElement('input');
        buyInput.type = 'number';
        buyInput.placeholder = 'Buy Quantity';

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.addEventListener('click', async () => {
            const buyQuantity = parseInt(buyInput.value);
            if (buyQuantity <= vegetable.quantity) {
                vegetable.quantity -= buyQuantity;
                await updateVegetable(vegetable);
                quantitySpan.textContent = `Quantity: ${vegetable.quantity} KG`; // Update displayed quantity
                alert(`You bought ${buyQuantity} kg of ${vegetable.name}`);
            } else {
                alert('Not enough quantity available!');
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this vegetable?')) {
                await deleteVegetable(vegetable._id);
                await fetchData();
            }
        });

        li.appendChild(quantitySpan);
        li.appendChild(buyInput);
        li.appendChild(buyButton);
        li.appendChild(deleteButton);
        vegList.appendChild(li);

        totalCount += 1; // Increase total count by 1 for each vegetable
    });

    document.getElementById('totalVeg').textContent = totalCount;
}

async function updateVegetable(vegetable) {
    try {
        await axios.put(`${baseURL}/${vegetable._id}`, {
            name: vegetable.name,
            price: vegetable.price,
            quantity: vegetable.quantity
        });
    } catch (error) {
        console.error('Error updating vegetable:', error);
    }
}

async function deleteVegetable(id) {
    try {
        await axios.delete(`${baseURL}/${id}`);
    } catch (error) {
        console.error('Error deleting vegetable:', error);
    }
}

function clearInputFields() {
    document.getElementById('vegName').value = '';
    document.getElementById('vegPrice').value = '';
    document.getElementById('vegQuantity').value = '';
    //clears the input field
}

fetchData();
