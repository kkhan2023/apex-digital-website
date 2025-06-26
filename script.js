// mobile menu logic

const mobileMenuBtn = document.querySelector(".hamburger")
const mobileLinks = document.querySelector(".mobile-links")

// Initially hide the mobile menu
mobileLinks.style.display = "none"

// Toggle mobile menu when hamburger button is clicked
mobileMenuBtn.addEventListener("click", function () {
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

// contact form logic

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const formObject = {}
  formData.forEach((value, key) => {
    formObject[key] = value
  })

  // Validate required fields
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "message",
    "privacy",
  ]
  let isValid = true

  requiredFields.forEach((field) => {
    const input = document.getElementById(field)
    if (!input.value || (field === "privacy" && !input.checked)) {
      input.classList.add("error")
      isValid = false
    } else {
      input.classList.remove("error")
    }
  })

  if (!isValid) {
    // Show error message
    showNotification("Please fill in all required fields", "error")
    return
  }

  // Simulate form submission
  const submitBtn = document.querySelector(".submit-btn")
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  // Simulate API call delay
  setTimeout(() => {
    // Hide form and show success message
    document.querySelector(".contact-form").style.display = "none"
    document.querySelector(".success-message").style.display = "block"

    // Reset button after showing success
    setTimeout(() => {
      submitBtn.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i> Send Message'
      submitBtn.disabled = false

      // Reset form and show it again after 5 seconds
      setTimeout(() => {
        this.reset()
        document.querySelector(".contact-form").style.display = "block"
        document.querySelector(".success-message").style.display = "none"
      }, 5000)
    }, 100)
  }, 2000)
})

// Notification function
function showNotification(message, type) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <i class="fa-solid fa-${
      type === "error" ? "exclamation-triangle" : "check-circle"
    }"></i>
    ${message}
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Remove error class on input
document.querySelectorAll("input, textarea, select").forEach((input) => {
  input.addEventListener("input", function () {
    this.classList.remove("error")
  })

  input.addEventListener("change", function () {
    this.classList.remove("error")
  })
})
