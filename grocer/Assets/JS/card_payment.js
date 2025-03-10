document.getElementById("payNowButton").addEventListener("click", function () {
    // Perform your payment processing logic here
    // Example: Simulate successful payment
    const paymentSuccessful = true; // Replace this with actual payment logic

    if (paymentSuccessful) {
        // Save order details to localStorage for the Thank You page
        const orderDetails = {
            id: "12298033",
            items: [
                { name: "Green Capsicum", quantity: 5, price: 14.00, image: "green-capsicum.jpg" },
                { name: "Red Capsicum", quantity: 1, price: 14.00, image: "red-capsicum.jpg" }
            ],
            subtotal: 84.00,
            shipping: 0.00,
            total: 84.00
        };
        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

        // Clear the cart
        localStorage.removeItem("cart");

        // Dispatch a custom event to update the cart and drawer UI
        document.body.dispatchEvent(new CustomEvent("cart-updated", { detail: { count: 0 } }));

        // Redirect to the Thank You page
        window.location.href = "/cod.html";
    } else {
        alert("Payment failed. Please try again.");
    }
});
