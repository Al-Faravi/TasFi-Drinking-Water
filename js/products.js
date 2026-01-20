/* Project: TasFi Premium 
   Path: C:\Users\hp\OneDrive\Desktop\WebSite\TasFi\js\products.js 
*/

document.addEventListener('DOMContentLoaded', () => {
    // ফিল্টারিং ফাংশনালিটি শুরু
    initProductFilters();
});

// ১. প্রোডাক্ট ফিল্টারিং লজিক
function initProductFilters() {
    const pills = document.querySelectorAll('.pill');
    const products = document.querySelectorAll('.product-card');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // একটিভ ক্লাস পরিবর্তন
            document.querySelector('.pill.active').classList.remove('active');
            pill.classList.add('active');

            const filterValue = pill.textContent.trim();

            products.forEach(product => {
                // সব পণ্য দেখালে
                if (filterValue === "সব পণ্য") {
                    product.style.display = "flex";
                    product.setAttribute('data-aos', 'fade-up');
                } 
                // বোতলজাত ফিল্টার
                else if (filterValue === "বোতলজাত") {
                    const title = product.querySelector('h3').textContent;
                    if (title.includes('Smart') || title.includes('Daily') || title.includes('Alkaline')) {
                        product.style.display = "flex";
                    } else {
                        product.style.display = "none";
                    }
                }
                // জার ও সার্ভিস ফিল্টার
                else if (filterValue === "জার ও সার্ভিস") {
                    const title = product.querySelector('h3').textContent;
                    if (title.includes('Jar') || title.includes('Cup')) {
                        product.style.display = "flex";
                    } else {
                        product.style.display = "none";
                    }
                }
            });
        });
    });
}

// ২. অর্ডারিং লজিক (এটি main.js এর quickOrder ফাংশনকেও কল করতে পারে)
function openOrder(itemName) {
    if (typeof quickOrder === "function") {
        quickOrder(itemName);
    } else {
        const phoneNumber = "8801719269328";
        const message = `আসসালামু আলাইকুম, আমি আপনার ওয়েবসাইট থেকে *${itemName}* সম্পর্কে জানতে চাই বা অর্ডার করতে চাই।`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
}