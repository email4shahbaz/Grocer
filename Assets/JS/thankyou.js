document.addEventListener("DOMContentLoaded", function () {
    const lastOrderId = localStorage.getItem("lastOrderId");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderDetails = orders.find((order) => order.orderId === lastOrderId);

    if (!orderDetails) {
        document.body.innerHTML = "<h1>Order not found!</h1>";
        return;
    }

    document.getElementById("orderId").innerText = `#${orderDetails.orderId}`;
    document.getElementById("invoiceNumber").innerText = `Invoice#${orderDetails.orderId}`;
    document.getElementById("subtotal").innerText = `$${orderDetails.subtotal.toFixed(2)}`;
    document.getElementById("shipping").innerText = `$${orderDetails.shipping.toFixed(2)}`;
    document.getElementById("total").innerText = `$${orderDetails.total.toFixed(2)}`;
    document.getElementById("paymentMethod").innerText = orderDetails.paymentMethod;

    const orderSummaryContainer = document.getElementById("orderSummary");
    orderDetails.items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("order-summary-item");
        itemElement.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p class="m-0">${item.name}</p>
                    <small>Quantity: ${item.quantity}</small>
                </div>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderSummaryContainer.appendChild(itemElement);
    });
});
