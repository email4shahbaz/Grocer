document.addEventListener("DOMContentLoaded", () => {
    const historyTableBody = document.querySelector(".history_table tbody");

    // Fetch completed orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Function to render orders in the history table
    function renderOrderHistory() {
        historyTableBody.innerHTML = ""; // Clear the table

        if (orders.length === 0) {
            historyTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">No orders found.</td>
                </tr>
            `;
            return;
        }

        orders.forEach((order) => {
            order.items.forEach((item) => {
                const orderRow = `
                    <tr>
                        <td>
                            <div class="HistoryOrderProductImageAndName">
                                <div class="HistoryOrderProductImage">
                                    <img src="${item.image}" class="history_product_img" alt="${item.name}" />
                                </div>
                                <div class="history_product_name_main">
                                    <h3 class="history_product_name">${item.name}</h3>
                                    <h3 class="history_product_name">x ${item.quantity}</h3>
                                </div>
                            </div>
                        </td>
                        <td>
                            <h3 class="OrderDateHeading">${order.date}</h3>
                        </td>
                        <td>
                            <div class="HistoryOrderPriceAndBTN">
                                <div>
                                    <h3 class="history_product_total">$${(item.price * item.quantity).toFixed(2)}</h3>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="HistoryRatingMain">
                                <span class="fa fa-star HistoryChecked"></span>
                                <span class="fa fa-star HistoryChecked"></span>
                                <span class="fa fa-star HistoryChecked"></span>
                                <span class="fa fa-star HistoryChecked"></span>
                                <span class="fa fa-star HistoryUnChecked"></span>
                                <span class="HistoryNoOfstars">(4)</span>
                            </div>
                        </td>
                        <td>
                            <div class="reorderButtonDiv">
                                <a class="reorder_btn" href="/product-review.html">Add Reviews</a>
                            </div>
                        </td>
                    </tr>
                `;
                historyTableBody.insertAdjacentHTML("beforeend", orderRow);
            });
        });
    }

    // Initial render
    renderOrderHistory();
});
