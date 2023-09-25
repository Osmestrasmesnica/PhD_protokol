// Counter to generate unique IDs
let taxonCounter = 0;

const baseURL = "https://osmestrasmesnica.github.io/PhD_protokol/"; // Replace with your GitHub Pages URL
const baseURL1 = "https://osmestrasmesnica.github.io"; // or with this i don't know

// Create an object to store the form data
let formData = {
  taxa: [],
};

// Define a function to add a taxon input field
function addTaxon() {
  const taxaContainer = document.getElementById("taxa-container");
  const taxonDiv = document.createElement("div");
  taxonDiv.className = "taxon-entry";

  const taxonNameInput = document.createElement("input");
  taxonNameInput.type = "text";
  taxonNameInput.placeholder = "Ime taksona";
  taxonNameInput.id = "taxon-name-" + taxonCounter; // Unique ID for taxon name
  taxonNameInput.className = "taxon-name";

  const taxonBInput = document.createElement("input");
  taxonBInput.type = "number";
  taxonBInput.min = "1";
  taxonBInput.max = "4";
  taxonBInput.id = "brojnost-" + taxonCounter; // Unique ID for brojnost
  taxonBInput.placeholder = "Vrednost za B";
  taxonBInput.className = "taxon-b";

  const taxonPInput = document.createElement("input");
  taxonPInput.type = "number";
  taxonPInput.min = "1";
  taxonPInput.max = "7";
  taxonPInput.id = "pokrovnost-" + taxonCounter; // Unique ID for pokrovnost
  taxonPInput.placeholder = "Vrednost za P";
  taxonPInput.className = "taxon-p";

  const taxonSInput = document.createElement("select");
  taxonSInput.className = "taxon-s";
  taxonSInput.id = "taxon-s-" + taxonCounter; // Unique ID for taxon select
  const taxonSOptions = ["A1", "A2", "B1", "B2", "C", "C1"];
  for (const option of taxonSOptions) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.text = option;
    taxonSInput.appendChild(optionElement);
  }

  taxonDiv.appendChild(taxonNameInput);
  taxonDiv.appendChild(taxonBInput);
  taxonDiv.appendChild(taxonPInput);
  taxonDiv.appendChild(taxonSInput);

  taxaContainer.appendChild(taxonDiv);

  // Increment the counter
  taxonCounter++;

  // Log the generated IDs
  console.log("Generated IDs for Taxon " + taxonCounter + ":");
  console.log("Taxon Name ID: taxon-name-" + taxonCounter);
  console.log("Brojnost ID: brojnost-" + taxonCounter);
  console.log("Pokrovnost ID: pokrovnost-" + taxonCounter);
  console.log("Taxon Select ID: taxon-s-" + taxonCounter);
}

// Define a function to remove the last taxon input field
function removeTaxon() {
  const taxaContainer = document.getElementById("taxa-container");
  const taxonEntries = taxaContainer.getElementsByClassName("taxon-entry");
  if (taxonEntries.length > 0) {
    taxaContainer.removeChild(taxonEntries[taxonEntries.length - 1]);
  }
}

// Add event listeners to the "Dodaj takson" and "Ukloni takson" buttons
document.getElementById("addTaxonButton").addEventListener("click", function (event) {
  event.preventDefault();
  addTaxon();
});

document.getElementById("removeTaxonButton").addEventListener("click", function (event) {
  event.preventDefault();
  removeTaxon();
});

// Add a function to show the success message
function showSuccessMessage() {
  const successMessage = document.getElementById("success-message");
  successMessage.textContent = "Data successfully added to the database.";
  successMessage.style.display = "block";
}

// Reset the form after success
function resetForm() {
  document.getElementById("myForm").reset();
}

// Add a listener to the form submission
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Retrieve other form data (excluding gpsNumber)
  formData.fsNumber = document.getElementById("fsNumber").value;
  formData.date = document.getElementById("date").value;
  formData.location = document.getElementById("location").value;
  formData.sublocation1 = document.getElementById("sublocation1").value;
  formData.sublocation2 = document.getElementById("sublocation2").value;
  formData.participants = document.getElementById("participants").value;
  formData.lighting = document.getElementById("lighting").value;
  formData.threatFactor = document.getElementById("threatFactor").value;
  formData.note = document.getElementById("note").value;
  formData.fsSize = document.getElementById("fsSize").value;
  formData.latitude = document.getElementById("latitude").value;
  formData.longitude = document.getElementById("longitude").value;
  formData.altitude = document.getElementById("altitude").value;
  formData.exposure = document.getElementById("exposure").value;
  formData.slope = document.getElementById("slope").value;
  formData.habitat = document.getElementById("habitat").value;

  // Loop through taxon entries and retrieve values
  const taxaEntries = document.getElementsByClassName("taxon-entry");
  formData.taxa = [];
  for (const entry of taxaEntries) {
    const taxonName = entry.querySelector(".taxon-name").value;
    const taxonB = entry.querySelector(".taxon-b").value;
    const taxonP = entry.querySelector(".taxon-p").value;
    const taxonS = entry.querySelector(".taxon-s").value;

    formData.taxa.push({
      name: taxonName,
      b: taxonB,
      p: taxonP,
      s: taxonS,
    });
  }

  // Send the JSON data to the server using fetch
  fetch(`/saveData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Optionally, you can perform actions after data is successfully saved
      showSuccessMessage(); // Show success message
      resetForm(); // Reset the form
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      // Handle errors here
    });
  
});

