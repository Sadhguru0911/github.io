// Function to fetch data from CSV file
function fetchCSV(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            callback(parseCSV(data));
        })
        .catch(error => console.error('Error fetching CSV:', error));
}

// Function to parse CSV data
function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const products = [];

    // Check if there are at least two lines (header and one data row)
    if (lines.length < 2) {
        console.error('Error parsing CSV: Not enough data lines');
        return products;
    }

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        
        // Check if the number of values matches the number of headers
        if (values.length !== headers.length) {
            console.error('Error parsing CSV: Number of values does not match number of headers');
            continue;
        }

        const product = {};

        for (let j = 0; j < headers.length; j++) {
            product[headers[j]] = values[j].trim();
        }

        products.push(product);
    }

    return products;
}

// Function to populate filter buttons based on product categories
function populateFilterButtons(products) {
    const categories = [];
    products.forEach(product => {
        if (!categories.includes(product['Product Category'])) {
            categories.push(product['Product Category']);
        }
    });

    const filterButtonsContainer = document.getElementById('filter-buttons');
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = () => filterProducts(category);
        filterButtonsContainer.appendChild(button);
    });
}

// Function to filter products by category
function filterProducts(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block'; // Show products of the selected category or show all products
        } else {
            product.style.display = 'none'; // Hide products not in the selected category
        }
    });
}

// Function to populate product catalog
function populateCatalog(products) {
    const catalogSection = document.getElementById('catalog');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.setAttribute('data-category', product['Product Category']); // Set data-category attribute
        
        // Create elements for the product image and details
        const productImage = document.createElement('img');
        productImage.src = product['Picture Link'];
        productImage.alt = product['Product Name'];

        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');
        productDetails.innerHTML = `
            <h3>${product['Product Name']}</h3>
            <h5>Category: ${product['Product Category']}</h5>
            <p>Price: ${product['Price']}</p>
            <p>Weight: ${product['Weight']}</p>`;
        
        // Append the image and details to the product element
        productElement.appendChild(productImage);
        productElement.appendChild(productDetails);
        
        catalogSection.appendChild(productElement);
    });

    // After populating the catalog, populate the filter buttons
    populateFilterButtons(products);
}

// Example usage:
const csvURL = 'product_catalog.csv';

fetchCSV(csvURL, populateCatalog);

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("feedbackForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get form values
        var name = document.getElementById("name").value;
        var community = document.getElementById("community").value;
        var mood = document.querySelector('input[name="mood"]:checked').value;
        var feedback = document.getElementById("feedback").value;
        
        // Create feedback item
        var feedbackItem = document.createElement("div");
        feedbackItem.classList.add("feedback-item");
        feedbackItem.innerHTML = "<strong>" + name + "</strong> from <strong>" + community + "</strong> is " + mood + "<br>Feedback: " + feedback;
        
        // Append feedback item to feedback list
        document.getElementById("feedbackList").appendChild(feedbackItem);
        
        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("community").value = "";
        document.getElementById("feedback").value = "";
    });
});
