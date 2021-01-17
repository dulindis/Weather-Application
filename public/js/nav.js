const navLinksAll = document.querySelectorAll('.navigation li a');
const page = document.getElementsByTagName('title')[0];
const currentNavLink = document.querySelector(`li a.${page.className}`)

for(const navLink of navLinksAll){
    navLink.classList.remove("active");
}

currentNavLink.classList.add("active");