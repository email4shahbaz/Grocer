document.addEventListener("DOMContentLoaded", () => {
    const orderDetailsContainer = document.getElementById("orderDetails");
    const orderIdElement = document.getElementById("orderId");
    const downloadButtonContainer = document.getElementById("downloadButtonContainer");

    // Helper function to get the `id` parameter from the URL
    function getOrderIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

    // Function to generate a random delivery time
    function getRandomDeliveryTime() {
        const deliverySlots = [
            "6:00 AM to 10:00 AM",
            "10:00 AM to 2:00 PM",
            "2:00 PM to 6:00 PM",
            "6:00 PM to 10:00 PM",
        ];
        return deliverySlots[Math.floor(Math.random() * deliverySlots.length)];
    }

    // Function to generate an estimated delivery date
    function getEstimatedDeliveryDate(orderDate) {
        const randomDays = Math.floor(Math.random() * 3) + 1; // Random offset (1–3 days)
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + randomDays);
        return deliveryDate.toDateString(); // Format as "Mon Jan 16 2023"
    }

    // Retrieve order ID from URL
    const orderId = getOrderIdFromUrl();

    if (!orderId) {
        orderDetailsContainer.innerHTML = `<p class="text-danger">Order ID is missing in the URL. Please check and try again.</p>`;
        return;
    }

    // Display order ID in breadcrumb
    orderIdElement.textContent = `Order ID: ${orderId}`;

    // Load orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = orders.find((o) => o.orderId === orderId);

    if (!order) {
        orderDetailsContainer.innerHTML = `<p class="text-danger">Order not found. Please check your order ID.</p>`;
        return;
    }

    // Generate a random delivery time and estimated delivery date
    const randomDeliveryTime = getRandomDeliveryTime();
    const estimatedDeliveryDate = getEstimatedDeliveryDate(new Date(order.date));

    // Render the order details
    const productsHtml = order.items
        .map(
            (item) => `
            <div class="d-flex align-items-center border-bottom py-3">
                <img src="${item.image}" alt="${item.name}" class="img-thumbnail me-3" style="width: 100px;">
                <div class="flex-grow-1">
                    <h5>${item.name}</h5>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <h5 class="text-end">$${item.price * item.quantity}</h5>
            </div>
        `
        )
        .join("");

    const progressHtml = `
        <div class="progress my-4" style="height: 20px;">
            <div
                class="progress-bar bg-success"
                role="progressbar"
                style="width: ${order.progress}%"
                aria-valuenow="${order.progress}"
                aria-valuemin="0"
                aria-valuemax="100">
                ${order.status}
            </div>
        </div>
    `;

    const deliveryDetailsHtml = `
        <div class="mt-4">
            <h4>Delivery Details</h4>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Delivery Time:</strong> ${randomDeliveryTime}</p>
            <p><strong>Estimated Delivery:</strong> ${estimatedDeliveryDate}</p>
        </div>
    `;

    const paymentHtml = `
        <div class="mt-4">
            <h4>Payment</h4>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Total Paid:</strong> $${order.total}</p>
        </div>
    `;

    orderDetailsContainer.innerHTML = `
        <h3>Order #${orderId}</h3>
        <p><strong>Order Date:</strong> ${order.date}</p>
        ${progressHtml}
        <h4>Products</h4>
        ${productsHtml}
        ${deliveryDetailsHtml}
        ${paymentHtml}
    `;

    // Add Download Invoice Button
    const downloadButton = document.createElement("button");
    downloadButton.className = "btn btn-primary mb-3";
    downloadButton.innerText = "Download Invoice";
    downloadButton.onclick = () => generateInvoicePDF(order, randomDeliveryTime, estimatedDeliveryDate);
    downloadButtonContainer.appendChild(downloadButton);
});

// Function to generate a PDF invoice
function generateInvoicePDF(order, deliveryTime, estimatedDelivery) {
    const { jsPDF } = window.jspdf; // Make sure jsPDF is loaded
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Invoice - Order #${order.orderId}`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Order Date: ${order.date}`, 20, 30);
    doc.text(`Estimated Delivery: ${estimatedDelivery}`, 20, 40);
    doc.text(`Delivery Time: ${deliveryTime}`, 20, 50);
    doc.text(`Customer: ${order.customerName}`, 20, 60);
    doc.text(`Address: ${order.address}`, 20, 70);

    let yPosition = 80;
    doc.text(`Products:`, 20, yPosition);

    order.items.forEach((item) => {
        yPosition += 10;
        doc.text(`- ${item.name} (x${item.quantity}): $${item.price * item.quantity}`, 20, yPosition);
    });

    yPosition += 20;
    doc.text(`Total Paid: $${order.total}`, 20, yPosition);

    // Save the PDF
    doc.save(`Invoice_Order_${order.orderId}.pdf`);
}
