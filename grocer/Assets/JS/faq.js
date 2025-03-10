document.addEventListener("DOMContentLoaded", async () => {
    const faqAccordion = document.querySelector('.accordion');

    try {
        // Fetch FAQs from the API
        const faqResponse = await fetch('./Assets/json_files/faqs.json'); // Ensure the path is correct
        if (!faqResponse.ok) {
            throw new Error(`HTTP error! Status: ${faqResponse.status}`);
        }

        const faqs = await faqResponse.json();
        console.log("FAQs fetched successfully:", faqs);

        // Check if FAQs exist
        if (faqs.length === 0) {
            faqAccordion.innerHTML = "<p>No FAQs available at the moment. Please check back later.</p>";
            return;
        }

        // Render FAQs dynamically
        faqs.forEach((faq) => {
            const faqId = faq.id;
            const faqQuestion = faq.question;
            const faqAnswer = faq.answer;

            // Create accordion item for each FAQ
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item', 'mb-4');
            accordionItem.innerHTML = `
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed faq_accordian_border_radius" type="button"
                        data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${faqId}"
                        aria-expanded="false" aria-controls="panelsStayOpen-collapse${faqId}">
                        ${faqQuestion}
                    </button>
                </h2>
                <div id="panelsStayOpen-collapse${faqId}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        ${faqAnswer}
                    </div>
                </div>
            `;

            // Append each FAQ to the accordion container
            faqAccordion.appendChild(accordionItem);
        });
    } catch (error) {
        console.error("Error fetching FAQ data:", error);
        faqAccordion.innerHTML = "<p>Failed to load FAQs. Please try again later.</p>";
    }
});
