// All web component imports
import "./wc-footer.js";
import "./wc-home.js";
import "./wc-documentation.js";
import "./wc-navbar.js";

// ----- Navbar Web Component Creation -----
const pageTitle = document.querySelector("title").innerHTML.split(" ");
const page = pageTitle[2];

const navbar = document.createElement("wc-navbar");
navbar.dataset.page = page ?? "Home";

const body = document.querySelector("body");
const newBody = document.createElement("body");
newBody.appendChild(navbar);
body.innerHTML = newBody.innerHTML + body.innerHTML;