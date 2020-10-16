const hamburger = document.querySelector(".hamburger");
const siteContent = document.querySelector(".site-content");
const noScript = document.querySelector(".no-script");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const btnToggle = document.querySelector("#modeToggle i");
const submitBtn = document.querySelector(".form-btn");
const email = document.querySelector(".email input");
const name = document.querySelector(".name input");
const msg = document.getElementById("message");
const form = document.querySelector(".contact-form");

email.addEventListener("blur", validateEmail);
name.addEventListener("blur", validateName);
msg.addEventListener("blur", validateMessage);

// Lozad
const observer = lozad();
observer.observe();

// Get theme
window.addEventListener("DOMContentLoaded", () => {
    siteContent.style.display = "block";
    noScript.style.display = "none";
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
        btnToggle.classList.add("fa-sun");
        btnToggle.style.padding = "4px 3.8px";
        btnToggle.classList.remove("fa-moon");
        document.querySelector("body").classList.add(theme);
    }
});

// Navbar
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    links.forEach((link) => {
        link.classList.toggle("fade");
    });
    hamburger.classList.toggle("toggle");
});

// Get projects
(async () => {
    const header = document.querySelector("#projects .header");
    header.insertAdjacentHTML("afterend", await getProjects());
    observer.observe();
})();

// Light to Dark theme
btnToggle.addEventListener("click", () => {
    if (btnToggle.classList.contains("fa-moon")) {
        btnToggle.classList.add("fa-sun");
        btnToggle.style.padding = "4px 3.8px";
        btnToggle.classList.remove("fa-moon");
        localStorage.setItem("theme", "light");
    } else {
        btnToggle.classList.add("fa-moon");
        btnToggle.classList.remove("fa-sun");
        btnToggle.style.padding = "4px 5px";
        localStorage.clear();
    }
    document.querySelector("body").classList.toggle("light");
});

document.getElementById("");

// Change the title according to the link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        const regex = /\/#[\w+]+/;
        const title = link.href.match(regex)[0].slice(2);
        document.title = `${
            title[0].toUpperCase() + title.slice(1)
        } | Seyon Rajagopal`;
    });
});

// Validate the name field
function validateName() {
    if (name.value === "") {
        name.classList.add("invalid");
        submitBtn.disabled = true;
    } else {
        name.classList.remove("invalid");
        checkInput();
    }
}

// Validate the email field
function validateEmail() {
    const re = /^([A-Za-z0-9\_\-.]+)@([A-Za-z0-9]+)\.([a-z]{2,5})$/;

    if (!re.test(email.value)) {
        email.classList.add("invalid");
        submitBtn.disabled = true;
    } else {
        email.classList.remove("invalid");
        checkInput();
    }
}

// Validate the message field
function validateMessage() {
    if (msg.value === "") {
        msg.classList.add("invalid");
        submitBtn.disabled = true;
    } else {
        msg.classList.remove("invalid");
        checkInput();
    }
}

// Check if any input is empty
function checkInput() {
    const totalValues = [name.value, msg.value, email.value];

    const invalidInput = totalValues.some((value) => value === "");

    if (invalidInput === true) {
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }
}

// Form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const service_id = "service_nq4pp57";
    const template_id = "template_ky2cg6m";
    submitBtn.innerHTML = "Sending...";
    emailjs.sendForm(service_id, template_id, form).then(
        () => {
            form.reset();
            submitBtn.innerHTML = "Sent";
            setTimeout(() => {
                submitBtn.innerHTML =
                    '<i class="fab fa-paper-plane"></i>&nbsp;Submit';
            }, 2000);
        },
        (err) => {
            form.reset();
            submitBtn.innerHTML = "Error";
            submitBtn.classList.add("error");
            setTimeout(() => {
                submitBtn.innerHTML =
                    '<i class="fab fa-paper-plane"></i>&nbsp;Submit';
                submitBtn.classList.remove("error");
            }, 2000);
            console.log(err);
        }
    );
});

// Get projects from json
async function getProjects() {
    const projectsJson = await fetch("projects.json");
    const projects = await projectsJson.json();
    let html = "";
    projects.forEach((project) => {
        const { name, info, image, demoLink, githubLink, languages } = project;

        html += `
      <div class="project-cover">
        <div class="project">
          <div class="info-bg">
            <div class="project-info">
              <h2>${name}</h2>
              <p>${info}</p>
              <div class="project-links">
              ${
                  demoLink
                      ? `<a href="${demoLink}" class="demo" target="_blank" rel="noopener noreferrer">Live
                  Demo</a>`
                      : ""
              }
                <a href="${githubLink}" target="_blank" class="github" rel="noopener noreferrer"><i
					class="fab fa-github"></i></a>
					<div class="languages">
					${languages
						.map((language) => `<i class="fab ${language}"></i>`)
						.join("")}
				  </div>
              </div>
            </div>
          </div>
          <div class="img-container">
            <div class="img lozad" data-background-image="./assets/images/${image}"></div>
            
          </div>
        </div>
      </div>
    `;
    });

    return html;
}

function setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 50,
        tempTypeSpeed = 0;

    var type = function () {
        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            } else {
                tempTypeSpeed = Math.random() * typeSpeed + 50;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = Math.random() * typeSpeed + 50;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }

        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }
    };

    return {
        type: type,
    };
}

var typer = document.getElementById("typewriter");

typewriter = setupTypewriter(typewriter);

typewriter.type();
