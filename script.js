// Counter to generate unique IDs
let taxonCounter = 0;

// Create an object to store the form data
let formData = {
  taxa: [],
};

// Define a function to add a taxon input field
function addTaxon() {
  const taxaContainer = document.getElementById("taxa-container");
  const taxonDiv = document.createElement("div");
  taxonDiv.className = "taxon-entry";

  // Label for "Takson"
  const taxonNameLabel = document.createElement("label");
  taxonNameLabel.textContent = "Takson";
  taxonNameLabel.setAttribute("for", "taxon-name-" + taxonCounter);

  const taxonNameInput = document.createElement("input");
  taxonNameInput.type = "text";
  taxonNameInput.placeholder = "Unesite naziv taksona..";
  taxonNameInput.id = "taxon-name-" + taxonCounter; // Unique ID for taxon name
  taxonNameInput.className = "taxon-name";

  // Label for taxonBInput
  const taxonBLabel = document.createElement("label");
  taxonBLabel.textContent = "Brojnost";
  taxonBLabel.setAttribute("for", "brojnost-" + taxonCounter);

  const taxonBInput = document.createElement("select");
  taxonBInput.className = "taxon-b";
  taxonBInput.id = "brojnost-" + taxonCounter; // Unique ID for brojnost

  const taxonBoptions = [
    createOptionWithTooltip("1", "1", "1 - 1 do 5 jedinki"),
    createOptionWithTooltip("2", "2", "2 - 6 do 20 jedinki"),
    createOptionWithTooltip("3", "3", "3 - 21 do 50 jedinki"),
    createOptionWithTooltip("4", "4", "4 - 50+ jedinki"),
  ];

  for (const option of taxonBoptions) {
    taxonBInput.appendChild(option);
  }

  // Label for taxonPInput
  const taxonPLabel = document.createElement("label");
  taxonPLabel.textContent = "Pokrovnost";
  taxonPLabel.setAttribute("for", "pokrovnost-" + taxonCounter);

  const taxonPInput = document.createElement("select");
  taxonPInput.className = "taxon-p";
  taxonPInput.id = "pokrovnost-" + taxonCounter; // Unique ID for pokrovnost

  const taxonPoptions = [
    createOptionWithTooltip("1", "1", "1 - jedna slucajna/BB-r"),
    createOptionWithTooltip("2", "2", "2 - <1%, vise nji/ BB-+"),
    createOptionWithTooltip("3", "3", "3 - 1 do 10%/BB-1"),
    createOptionWithTooltip("4", "4", "4 - 11% do 25%/BB-2"),
    createOptionWithTooltip("5", "5", "5 - 26% do 50%/BB-3"),
    createOptionWithTooltip("6", "6", "6 - 51% do 75%/BB-4"),
    createOptionWithTooltip("7", "7", "7 - 76% do 100%/BB7"),
  ];

  for (const option of taxonPoptions) {
    taxonPInput.appendChild(option);
  }

  // Label for taxonSInput
  const taxonSLabel = document.createElement("label");
  taxonSLabel.textContent = "Spratovnost";
  taxonSLabel.setAttribute("for", "taxon-s-" + taxonCounter);

  const taxonSInput = document.createElement("select");
  taxonSInput.className = "taxon-s";
  taxonSInput.id = "taxon-s-" + taxonCounter; // Unique ID for taxon select

  const taxonSOptions = [
    createOptionWithTooltip("A1", "A1", "A1 - drvece 20m+"),
    createOptionWithTooltip("A2", "A2", "A2 - drvece 10-20m"),
    createOptionWithTooltip("B1", "B1", "B1 - zbunje 5-10m"),
    createOptionWithTooltip("B2", "B2", "B2 - zbunje 1-5m"),
    createOptionWithTooltip("C", "C", "C - zeljasta vegetacija"),
    createOptionWithTooltip("C1", "C1", "C1 - mahovine"),
  ];

  for (const option of taxonSOptions) {
    taxonSInput.appendChild(option);
  }

  taxonDiv.appendChild(taxonNameLabel); // Append label before input
  taxonDiv.appendChild(taxonNameInput);
  taxonDiv.appendChild(taxonBLabel); // Append label before input
  taxonDiv.appendChild(taxonBInput);
  taxonDiv.appendChild(taxonPLabel); // Append label before input
  taxonDiv.appendChild(taxonPInput);
  taxonDiv.appendChild(taxonSLabel); // Append label before input
  taxonDiv.appendChild(taxonSInput);

  // Append the taxonDiv to the taxaContainer or any other desired container.
  taxaContainer.appendChild(taxonDiv);

  // Increment the counter
  taxonCounter++;
}

function createOptionWithTooltip(value, text, tooltip) {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  option.title = tooltip;
  return option;
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
  formData.note = document.getElementById("gpsNumber").value;
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

