function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Wait briefly for DOM stability
  setTimeout(() => {
    gsap.utils.toArray("section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          immediateRender: false, // Prevents initial flicker
        },
      });
    });
  }, 100); // 100ms delay
}

function initScrollAnimations2() {
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections
  gsap.utils.toArray(".card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 100,
      duration: 1,
      delay: i * 0.1,
      ease: "back.out(1.2)"
    });
  });
}

function initScrollAnimations3() {
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections
  gsap.utils.toArray(".portfolio-item").forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 100,
      duration: 1,
      delay: i * 0.1,
      ease: "back.out(1.2)"
    });
  });
}

// Call this when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations();
  initScrollAnimations2();
  initScrollAnimations3();
});

// Scroll progress bar
window.addEventListener("scroll", function () {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  document.getElementById("NavProgressBar").style.width = scrollProgress + "%";

  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// counter animation
document.addEventListener("DOMContentLoaded", function () {
  // Counter animation function
  function animateCounters() {
    const counters = document.querySelectorAll(".counter");

    // Options for the Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of element is visible
    };

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const duration = +counter.getAttribute("data-duration") || 2000; // Default 2 seconds
          const suffix = target > 0 ? "+" : "";

          startCounter(counter, target, duration, suffix);
          observer.unobserve(counter); // Stop observing after animation starts
        }
      });
    }, observerOptions);

    // Observe all counters
    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }

  // Counter animation logic
  function startCounter(element, target, duration, suffix) {
    const startTime = performance.now();
    const startValue = 0;
    const endTime = startTime + duration;

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(progress * target);

      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Initialize the counters
  animateCounters();
});

//Animate skills section
document.addEventListener("DOMContentLoaded", function () {
  const skillItems = document.querySelectorAll(".skill-item");

  function animateSkill(item) {
    const progressBar = item.querySelector(".skill-progress");
    const percentageSpan = item.querySelector("span");

    // Get the target width from the data attribute or inline style
    const targetWidth =
      progressBar.dataset.width ||
      progressBar.style.width ||
      getComputedStyle(progressBar).width;

    // Extract just the percentage number
    const targetPercentage = parseInt(targetWidth);

    // Reset initial state
    progressBar.style.width = "0%";
    percentageSpan.textContent = "0%";

    // Start animations
    setTimeout(() => {
      progressBar.style.width = targetWidth + "%";

      let current = 0;
      const increment = targetPercentage / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetPercentage) {
          current = targetPercentage;
          clearInterval(timer);
        }
        percentageSpan.textContent = Math.floor(current) + "%";
      }, 20);
    }, 100);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          if (!item.classList.contains("animated")) {
            item.classList.add("animated");
            animateSkill(item);
          }
          observer.unobserve(item);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillItems.forEach((item) => {
    observer.observe(item);
  });
});

// Initalize particles.js
function initParticles() {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
      },
    },
  });
}

// Call this when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initParticles();
});

// Custom Cursor functionality
function initCustomCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 100);
  });

  document.querySelectorAll("a, button, .project-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.width = "20px";
      cursorFollower.style.height = "20px";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.width = "40px";
      cursorFollower.style.height = "40px";
    });
  });
}

// Call this when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initCustomCursor();
});
