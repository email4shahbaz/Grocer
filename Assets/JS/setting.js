document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const imageInput = document.querySelector('input[type="file"]');
    const nameInput = document.querySelector('input[name="fname"]');
    const lastNameInput = document.querySelector('input[name="lname"]');
    const emailInput = document.querySelector('.info_email_inp');
    const phoneInput = document.querySelector('input[name="phone"]');
    const previewImage = document.getElementById("preview-image");
    const displayName = document.querySelector(".user_Img_name h2");
    const displayEmail = document.querySelector(".user_Img_name p");
    const updateButton = document.querySelector('.UpdateBTN');
    const infoEmailSetting = document.querySelector('.info_email_setting');

    // Load saved data from localStorage
    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem("userSettings")) || {};

        // Set profile image
        if (savedSettings.image) {
            previewImage.src = savedSettings.image;
        }

        // Set name
        if (savedSettings.name) {
            displayName.textContent = savedSettings.name;
            nameInput.value = savedSettings.name.split(" ")[0] || ""; // First name
            lastNameInput.value = savedSettings.name.split(" ")[1] || ""; // Last name
        }

        // Set email
        if (savedSettings.email) {
            displayEmail.textContent = savedSettings.email;
            infoEmailSetting.textContent = savedSettings.email;
            emailInput.value = savedSettings.email;
        }

        // Set phone
        if (savedSettings.phone) {
            phoneInput.value = savedSettings.phone;
        }
    }

    // Save settings to localStorage
    function saveSettings(settings) {
        const currentSettings = JSON.parse(localStorage.getItem("userSettings")) || {};
        const updatedSettings = { ...currentSettings, ...settings };
        localStorage.setItem("userSettings", JSON.stringify(updatedSettings));
    }

    // Handle image upload
    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                previewImage.src = reader.result;
                saveSettings({ image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle settings update
    updateButton.addEventListener("click", (event) => {
        event.preventDefault();

        const updatedName = `${nameInput.value} ${lastNameInput.value}`.trim(); // Combine first and last name
        const updatedSettings = {
            name: updatedName,
            email: emailInput.value,
            phone: phoneInput.value,
        };

        // Save settings to localStorage
        saveSettings(updatedSettings);

        // Update displayed values
        displayName.textContent = updatedName;
        displayEmail.textContent = updatedSettings.email;
        infoEmailSetting.textContent = updatedSettings.email;

        alert("Settings updated successfully!");
    });

    // Load settings on page load
    loadSettings();
});
