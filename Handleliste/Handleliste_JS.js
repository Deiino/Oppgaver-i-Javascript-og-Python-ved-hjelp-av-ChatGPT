// Hent referanser til HTML-elementer
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');

// Funksjon for å legge til et element til listen
function addItem() {
    const itemName = itemInput.value;
    if (itemName === '') return; // Sjekker om input-feltet er tomt
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" onchange="toggleChecked(this)">
        <span>${itemName}</span>
        <button onclick="removeItem(this)">Fjern</button>
    `;
    itemList.appendChild(li);
    saveToLocalStorage(); // Lagrer listen til local storage
    itemInput.value = ''; // Tømmer input-feltet
}

// Funksjon for å fjerne et element fra listen
function removeItem(item) {
    item.parentElement.remove();
    saveToLocalStorage(); // Lagrer listen til local storage
}

// Funksjon for å markere/avmarkere et element som hentet
function toggleChecked(checkbox) {
    const itemText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        itemText.style.textDecoration = 'line-through';
    } else {
        itemText.style.textDecoration = 'none';
    }
    saveToLocalStorage(); // Lagrer listen til local storage
}

// Funksjon for å lagre listen til local storage
function saveToLocalStorage() {
    const items = [];
    const listItems = itemList.querySelectorAll('li');
    listItems.forEach(item => {
        const itemName = item.querySelector('span').textContent;
        const checked = item.querySelector('input[type="checkbox"]').checked;
        items.push({ name: itemName, checked: checked });
    });
    localStorage.setItem('items', JSON.stringify(items));
}

// Funksjon for å laste listen fra local storage når siden lastes
function loadFromLocalStorage() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        const items = JSON.parse(storedItems);
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" onchange="toggleChecked(this)" ${item.checked ? 'checked' : ''}>
                <span>${item.name}</span>
                <button onclick="removeItem(this)">Fjern</button>
            `;
            itemList.appendChild(li);
            if (item.checked) {
                li.querySelector('span').style.textDecoration = 'line-through';
            }
        });
    }
}

// Last inn listen fra local storage når siden lastes
loadFromLocalStorage();
