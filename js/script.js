// Apply saved or default theme before the DOM is fully loaded
const savedTheme = localStorage.getItem("theme");

// Default to dark mode if no theme is saved
if (savedTheme === "dark" || !savedTheme) {
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");
} else {
  document.body.classList.add("light-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");
  const body = document.body;

  // Set correct icon on load
  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
    } else {
      navbar.style.padding = "15px 0";
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Update active nav link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // Highlight active nav item on scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".section-header, .about-content, .gallery-item, .contact-form, .contact-info"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial styles for animation
  document
    .querySelectorAll(
      ".section-header, .about-content, .gallery-item, .contact-form, .contact-info"
    )
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Read More toggle
  document.querySelector(".read-more-btn").addEventListener("click", function () {
    const moreText = document.querySelector(".more-text");
    const aboutText = document.querySelector(".about-text");

    if (moreText.style.display === "none" || moreText.style.display === "") {
      moreText.style.display = "inline";
      aboutText.style.webkitLineClamp = "unset";
      this.textContent = "Read Less";
    } else {
      moreText.style.display = "none";
      aboutText.style.webkitLineClamp = "3";
      this.textContent = "Read More";
    }
  });

  // Contact form submission
  const form = document.getElementById("ancienta-form");
  const result = document.getElementById("result");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.status == 200) {
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-green-500");
        } else {
          console.log(response);
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-red-500");
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(() => {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
      });
  });

  // Add hover effect on tap for service cards on mobile
  if (window.innerWidth <= 767) {
    document.querySelectorAll('.service-card').forEach(function(card) {
      card.addEventListener('touchstart', function() {
        // Remove hover from all cards
        document.querySelectorAll('.service-card').forEach(function(c) {
          c.classList.remove('hover');
        });
        // Add hover to the tapped card
        card.classList.add('hover');
      });
      // Optional: remove hover when touch ends or user taps elsewhere
      card.addEventListener('touchend', function() {
        setTimeout(function() {
          card.classList.remove('hover');
        }, 1000); // Remove after 1 second, adjust as needed
      });
    });
  }
});


// ...existing code above...

  // Animation on scroll
  function animateOnScroll() {
    // Animate section headers, about card, contact, etc.
    document.querySelectorAll(
      ".section-header, .about-card, .contact-form, .contact-info"
    ).forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate-fade-in");
      }
    });

    // Animate service cards (alternate left/right)
    document.querySelectorAll(".service-card").forEach((card, i) => {
      const cardPosition = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (cardPosition < windowHeight - 60) {
        card.classList.add(i % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right");
      }
    });

    // Animate gallery items (alternate left/right)
    document.querySelectorAll(".gallery-item").forEach((item, i) => {
      const itemPosition = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (itemPosition < windowHeight - 60) {
        item.classList.add(i % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right");
      }
    });
  }

  // Set initial styles for animation
 

