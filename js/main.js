/* Project: TasFi Premium 
   Path: C:\Users\hp\OneDrive\Desktop\WebSite\TasFi\js\main.js 
*/

document.addEventListener('DOMContentLoaded', () => {
    // ১. প্রথমেই কম্পোনেন্ট লোড করা শুরু করি
    loadComponents();
    
    // ২. AOS অ্যানিমেশন শুরু করি
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic'
    });
});

// --- ১. কম্পোনেন্ট লোডার ফাংশন ---
async function loadComponents() {
    try {
        // ফাইল পাথ চেক করুন: যদি রুট ফোল্ডারে থাকে তবে 'nav-footer.html' ব্যবহার করুন
        const response = await fetch('nav-footer.html'); 
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // নেভিগেশন ইনজেক্ট করা
        const navTemplate = doc.getElementById('nav-template').content;
        document.body.prepend(navTemplate.cloneNode(true));

        // ফুটার ইনজেক্ট করা
        const footerTemplate = doc.getElementById('footer-template').content;
        document.body.appendChild(footerTemplate.cloneNode(true));

        // কম্পোনেন্ট লোড হওয়ার পর সেগুলোর ফিচার এক্টিভেট করা
        initNavbarFeatures();
        
    } catch (err) {
        console.error("Component loading failed:", err);
    }
}

// --- ২. নেভিগেশন ফিচার (ইনজেকশনের পরে কল করা হয়) ---
function initNavbarFeatures() {
    const nav = document.querySelector('.glass-nav');
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // স্ক্রল ইফেক্ট
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // মোবাইল মেনু টগল
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            // আইকন পরিবর্তন (ঐচ্ছিক)
            const icon = menuBtn.querySelector('i');
            if(icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // একটিভ পেজ হাইলাইট
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// --- ৩. হোয়াটসঅ্যাপ অর্ডার ফাংশন (Global) ---
function quickOrder(product) {
    const msg = `আসসালামু আলাইকুম, আমি তাসফি থেকে *${product}* অর্ডার করতে চাই।`;
    const url = `https://wa.me/8801719269328?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// products.html এর জন্য বাড়তি সাপোর্ট (যদি দরকার হয়)
function openOrder(item) {
    quickOrder(item);
}