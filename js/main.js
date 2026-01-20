/* Project: TasFi Premium 
   Path: C:\Users\hp\OneDrive\Desktop\WebSite\TasFi\js\main.js 
*/

document.addEventListener('DOMContentLoaded', () => {
    // ১. কম্পোনেন্ট লোড করা
    loadComponents();
    
    // ২. AOS অ্যানিমেশন শুরু
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic'
    });
});

// --- ১. কম্পোনেন্ট লোডার ফাংশন ---
async function loadComponents() {
    try {
        const response = await fetch('nav-footer.html'); 
        if (!response.ok) throw new Error("Could not fetch components");
        
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // নেভিগেশন ইনজেক্ট করা
        const navTemplate = doc.getElementById('nav-template');
        if (navTemplate) {
            document.body.prepend(navTemplate.content.cloneNode(true));
        }

        // ফুটার ইনজেক্ট করা
        const footerTemplate = doc.getElementById('footer-template');
        if (footerTemplate) {
            document.body.appendChild(footerTemplate.content.cloneNode(true));
        }

        // ইনজেকশন শেষ হওয়ার পর ফিচারগুলো এক্টিভেট করা
        setTimeout(() => {
            initNavbarFeatures();
        }, 10); // সামান্য ডিলে যাতে DOM প্রসেস হতে পারে
        
    } catch (err) {
        console.error("Component loading failed:", err);
    }
}

// --- ২. নেভিগেশন ফিচার (Mobile Menu & Scroll) ---
function initNavbarFeatures() {
    const nav = document.querySelector('.glass-nav');
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!nav || !menuBtn || !navLinks) {
        console.warn("Navbar elements not found. Retrying...");
        return;
    }

    // স্ক্রল ইফেক্ট
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // মোবাইল মেনু টগল (FIXED LOGIC)
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // ক্লিক যাতে বাইরে ছড়িয়ে না পড়ে
        navLinks.classList.toggle('show');
        
        // আইকন পরিবর্তন
        const icon = menuBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('show')) {
                icon.className = 'fa-solid fa-xmark'; // FontAwesome Close Icon
            } else {
                icon.className = 'fa-solid fa-bars'; // FontAwesome Bars Icon
            }
        }
    });

    // মেনুর বাইরে ক্লিক করলে মেনু বন্ধ হয়ে যাবে (Good UX)
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('show') && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });

    // মেনু আইটেমে ক্লিক করলে মেনু বন্ধ হবে (মোবাইল স্ক্রলিং সহজ করতে)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    // একটিভ পেজ হাইলাইট
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add('active');
        }
    });
}

// --- ৩. হোয়াটসঅ্যাপ অর্ডার ফাংশন ---
function quickOrder(product) {
    const msg = `আসসালামু আলাইকুম, আমি তাসফি থেকে *${product}* অর্ডার করতে চাই।`;
    const url = `https://wa.me/8801719269328?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

function openOrder(item) {
    quickOrder(item);
}