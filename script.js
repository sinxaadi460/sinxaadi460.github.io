window.addEventListener("load", () => {

    const animations = [{
            selector: ".top-tags",
            class: "from-top",
            delay: 0
        },
        {
            selector: ".left h1",
            class: "from-left",
            delay: 0.3
        },
        {
            selector: ".desc",
            class: "from-left",
            delay: 0.6
        },
        {
            selector: ".live-line",
            class: "from-bottom",
            delay: 0.9
        },
        {
            selector: ".buttons",
            class: "zoom-in",
            delay: 1.2
        },
        {
            selector: ".site-link",
            class: "from-bottom",
            delay: 1.5
        },
        {
            selector: ".right",
            class: "from-right",
            delay: 0.6
        },
        {
            selector: ".stats",
            class: "from-bottom",
            delay: 1.8
        },
    ];

    animations.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            el.style.animationDelay = `${item.delay}s`;
            el.classList.add(item.class);
        }
    });

    // ===== HIDE INTRO =====
    setTimeout(() => {
        const intro = document.getElementById("intro");
        const site = document.getElementById("real-site");

        intro.classList.add("smooth-out");

        setTimeout(() => {
            intro.style.display = "none";
            site.style.display = "block";
            initScrollAnimations();
            initContactForm();
        }, 1200);
    }, 3800);
});


// ===============================
// SCROLL REVEAL (SECTIONS)
// ===============================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right, .slide-in-up"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translate(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        }
    );

    elements.forEach(el => observer.observe(el));
}


// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".ul-list li");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");

        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 120,
                behavior: "smooth"
            });
        }
    });
});

// ==============================================
// HAMBURGER MENU — MOBILE NAV WITH OVERLAY
// ==============================================
(function() {
    const hamburger = document.getElementById("hamburger");
    const divList = document.querySelector(".div-list");
    const overlay = document.getElementById("navOverlay");

    if (!hamburger || !divList) return;

    function openMenu() {
        hamburger.classList.add("open");
        divList.classList.add("open");
        if (overlay) overlay.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        hamburger.classList.remove("open");
        divList.classList.remove("open");
        if (overlay) overlay.classList.remove("show");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
        hamburger.classList.contains("open") ? closeMenu() : openMenu();
    });

    // Close on overlay click
    if (overlay) overlay.addEventListener("click", closeMenu);

    // Close on nav link click
    document.querySelectorAll(".ul-list li a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close on Escape key
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeMenu();
    });
})();

// ==============================================
// EMAILJS — CONTACT FORM
// ==============================================
function initContactForm() {

    const EMAILJS_PUBLIC_KEY = "-fjN9ivrpo3eNzOcD";
    const EMAILJS_SERVICE_ID = "service_ke8b97e";
    const EMAILJS_TEMPLATE_ID = "template_g20wb9f";

    if (typeof emailjs === "undefined") {
        console.error("EmailJS not loaded!");
        return;
    }

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const form = document.getElementById("contact-form");
    const btn = document.getElementById("send-btn");
    const status = document.getElementById("form-status");

    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        status.className = "";
        status.style.display = "none";

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(function() {
                status.className = "success";
                status.innerHTML = "✅ Message sent successfully! I'll get back to you soon 🚀";
                form.reset();
                setTimeout(() => {
                    status.style.display = "none";
                    status.className = "";
                }, 5000);
            })
            .catch(function(error) {
                status.className = "error";
                status.innerHTML = "❌ Something went wrong. Please try again!";
                console.error("EmailJS error:", error);
            })
            .finally(function() {
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
            });
    });
}