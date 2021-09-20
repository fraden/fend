/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const navbar = document.getElementById("navbar__list");
const bottomButton = document.getElementById("bottom__button");
const sections = document.querySelectorAll("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */



/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav

// source of how to add elements to the list: https://stackoverflow.com/questions/4310759/updating-an-html-list-using-js
// source of how to use dataset: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
const navBuilder = () => {
    const fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const liElement = document.createElement('li');
        liElement.innerHTML = `<a class="menu__link" href="#${section.id}">${section.dataset.nav}</a>`;
        fragment.appendChild(liElement);
    });
    navbar.appendChild(fragment);
}

navBuilder();

// Add class 'active' to section when near top of viewport
const updateActiveClass = (section, isInScreen) => {
    if (isInScreen) {
        section.classList.add("your-active-class");
    } else {
        section.classList.remove("your-active-class");
    }
};

// source of how get the position: https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window
const position = (element) => {
    return element.getBoundingClientRect().top;
};

const isInScreen = (position) => {
    return -200 <= position && position <= 200;
};

const updateSections = () => {
    sections.forEach(section => {
        const pos = position(section);
        updateActiveClass(
            section,
            isInScreen(pos)
        );
    });
};




// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// Scroll to section on link click

// Set sections as active


const isOnBottom = () => {

    const ft = document.getElementsByClassName("page__footer")[0]
    return ft.getBoundingClientRect().bottom <= 1100;

};

// source of how to update innerHTML: https://stackoverflow.com/questions/4310759/updating-an-html-list-using-js
const bottomChecker = () => {
    if (isOnBottom()) {
        bottomButton.innerHTML = "<button class='section-button' onclick='jumpToTop()'>Scroll to top</button>";
    } else {
        bottomButton.innerHTML = "";
    }

};

const jumpToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


window.addEventListener("scroll", bottomChecker);
window.addEventListener("scroll", updateSections);
// Set sections as active


// source for smoothScrolling: https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
const smoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            updateNavbar(anchor);
        });
    });
}

smoothScrolling();

const updateNavbar = (current_anchor) => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.classList.remove("your-active-state");
    });
    current_anchor.classList.add("your-active-state");
}