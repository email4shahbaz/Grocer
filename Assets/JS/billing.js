document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const orderSummaryContainer = document.getElementById("orderSummary");
    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");
    const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
    const placeOrderBtn = document.querySelector(".place_order_btn");

    // Retrieve Checkout Data
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || {};
    const { cart = [], subtotal = 0, shipping = 100, total = 0 } = checkoutData;

    // Function to Render Order Summary
    function renderOrderSummary() {
        orderSummaryContainer.innerHTML = ""; // Clear order summary

        if (cart.length === 0) {
            orderSummaryContainer.innerHTML = "<p>Your cart is empty.</p>";
            subtotalElement.innerText = "$0.00";
            shippingElement.innerText = `$${shipping.toFixed(2)}`;
            totalElement.innerText = `$${shipping.toFixed(2)}`; // Only shipping cost if no items
            return;
        }

        cart.forEach((item) => {
            const orderItemHTML = `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="order-item-details">
                        <span class="order-item-name">${item.name}</span>
                        <span class="order-item-quantity">Quantity: ${item.quantity}</span>
                    </div>
                    <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `;
            orderSummaryContainer.innerHTML += orderItemHTML;
        });

        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        shippingElement.innerText = `$${shipping.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;
    }

    // Save Order and Redirect
    function saveOrder(paymentMethod) {
        const orderId = `ORD-${Date.now()}`;
        const customerNames = ["John", "Doe", "Alice", "Bob", "Jane"];
        const randomCustomerName = customerNames[Math.floor(Math.random() * customerNames.length)];

        const newOrder = {
            orderId,
            date: new Date().toISOString().split("T")[0],
            customerName: randomCustomerName,
            address: "Johar Town, Lahore", 
            items: cart,
            subtotal,
            shipping,
            total,
            paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
            paymentMethod,
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        existingOrders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(existingOrders));
        localStorage.setItem("lastOrderId", orderId);

       
        if (paymentMethod === "COD") {
            window.location.href = "/thankyou.html";
        } else if (paymentMethod === "CardPayment") {
            window.location.href = "/card-payment.html";
        }
    }

    

    // Event Listener for Checkout Button
    placeOrderBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const selectedPaymentMethod = document.querySelector('input[name="payment_method"]:checked');
        // if (!selectedPaymentMethod) {
        //     alert("Please select a payment method.");
        //     return;
        // }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        saveOrder(selectedPaymentMethod.value);
    });

    // Initial Render
    renderOrderSummary();
});
