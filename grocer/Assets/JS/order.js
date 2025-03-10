document.addEventListener("DOMContentLoaded", () => {
    const orderTableBody = document.getElementById("orderTableBody");

    // Load orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    function renderOrders() {
        orderTableBody.innerHTML = ""; // Clear table body

        if (orders.length === 0) {
            orderTableBody.innerHTML = "<tr><td colspan='7'>No orders found.</td></tr>";
            return;
        }

        orders.forEach((order) => {
            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" name="check" id="check"></td>
                <td>${order.orderId}</td>
                <td>${order.date}</td>
                <td>${order.customerName}<br>${order.address}</td>
                <td>${totalItems} Item(s)</td>
                <td><a href="/track.html?id=${order.orderId}" class="btn "  style="background-color: #53B175; color: white">Track Order</a></td>
                <td>
                    <span class="payment-status Payment_status_unpaid ${order.paymentStatus.toLowerCase()}">
                        ${order.paymentStatus}
                    </span>
                </td>
            `;
            orderTableBody.appendChild(row);
        });
    }

    renderOrders();
});
