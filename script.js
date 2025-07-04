// mobile menu logic

const mobileMenuBtn = document.querySelector(".hamburger")
const mobileLinks = document.querySelector(".mobile-links")

// Initially hide the mobile menu
mobileLinks.style.display = "none"

// Toggle mobile menu when hamburger button is clicked
mobileMenuBtn.addEventListener("click", function (e) {
  if (
    mobileLinks.style.display === "none" ||
    mobileLinks.style.display === ""
  ) {
    mobileLinks.style.display = "flex"
    mobileMenuBtn.classList.add("active")
  } else {
    mobileLinks.style.display = "none"
    mobileMenuBtn.classList.remove("active")
  }
})

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll(".mobile-links a")
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileLinks.style.display = "none"
    mobileMenuBtn.classList.remove("active")
  })
})

// Close mobile menu when clicking outside of it
document.addEventListener("click", function (event) {
  if (
    !mobileLinks.contains(event.target) &&
    !mobileMenuBtn.contains(event.target)
  ) {
    mobileLinks.style.display = "none"
    mobileMenuBtn.classList.remove("active")
  }
})

// Close mobile menu on window resize (when switching to desktop)
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    mobileLinks.style.display = "none"
    mobileMenuBtn.classList.remove("active")
  }
})

// Accordion logic

let acc = document.getElementsByClassName("accordion")
let i

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active")

    let panel = this.nextElementSibling
    if (panel.style.display === "block") {
      panel.style.display = "none"
    } else {
      panel.style.display = "block"
    }
  })
}

function toggleFAQ(element) {
  const answer = element.nextElementSibling
  const icon = element.querySelector("i")

  // Close all other FAQs
  document.querySelectorAll(".faq-answer").forEach((item) => {
    if (item !== answer) {
      item.classList.remove("active")
      item.previousElementSibling.querySelector("i").style.transform =
        "rotate(0deg)"
    }
  })

  // Toggle current FAQ
  answer.classList.toggle("active")

  // Rotate icon
  if (answer.classList.contains("active")) {
    icon.style.transform = "rotate(180deg)"
  } else {
    icon.style.transform = "rotate(0deg)"
  }
}

// Popup modal start //

const orderApexButton = document.querySelector(".cta-button")
const apexCardModal = document.querySelector(".modal")
const modalCloseButton = document.querySelector(".modal-close")
const modalBackdrop = document.querySelector(".modal-backdrop")

// Open modal function
function openModal() {
  apexCardModal.classList.add("active")
  modalBackdrop.classList.add("active")
}

// Close modal function
function closeModal() {
  apexCardModal.classList.remove("active")
  modalBackdrop.classList.remove("active")
}

// Attach event listeners
orderApexButton.addEventListener("click", openModal)
modalCloseButton.addEventListener("click", closeModal)
modalBackdrop.addEventListener("click", closeModal) // Close when clicking the backdrop

// Optional: Close modal on "Escape" key
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && apexCardModal.classList.contains("active")) {
    closeModal()
  }
})

// Popup modal end //

// Modal waitlist form logic //

const form = document.getElementById("waitlistForm")
const thankYouMessage = document.getElementById("thankYouMessage")
const submitBtn = form.querySelector("button")
const modalWaitlistText = document.querySelectorAll(".modal-text")

form.addEventListener("submit", function () {
  submitBtn.disabled = true
  submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...'

  setTimeout(() => {
    modalWaitlistText.forEach((e) => (e.style.display = "none"))
    form.style.display = "none"
    thankYouMessage.style.display = "block"
  }, 1000)
})

// Modal waitlist form logic end //

// main contact form logic start //

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault()

    const form = e.target
    const successMessage = document.getElementById("successMessage")

    //  Run built-in validation
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)

    // Check reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse()
    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA.")
      return
    }

    formData.append("g-recaptcha-response", recaptchaResponse)

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        form.style.display = "none"
        successMessage.style.display = "block"
        form.reset()
        grecaptcha.reset()
      } else {
        alert("Submission failed. Please try again.")
      }
    } catch (error) {
      console.error("Form error:", error)
      alert("An error occurred. Please try again.")
    }
  })

// back to top button //

document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.querySelector(".back-to-top-btn")
  const hero = document.getElementById("home")

  if (!backToTopBtn || !hero) return

  // Hide initially
  backToTopBtn.style.opacity = 0
  backToTopBtn.style.pointerEvents = "none"
  backToTopBtn.style.transition = "opacity 0.4s ease"

  function toggleBackToTop() {
    const heroBottom = hero.getBoundingClientRect().bottom

    if (heroBottom < 0) {
      // User scrolled past hero, show button
      backToTopBtn.style.opacity = 1
      backToTopBtn.style.pointerEvents = "auto"
    } else {
      // Hide button
      backToTopBtn.style.opacity = 0
      backToTopBtn.style.pointerEvents = "none"
    }
  }

  window.addEventListener("scroll", toggleBackToTop)

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
})
