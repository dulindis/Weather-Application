//TOFIX:current active class and make navlink correct
const navLinksAll = document.querySelectorAll('.navigation li a');
const page = document.getElementsByTagName('title')[0];
const currentNavLink = document.querySelector(`li a.${page.className}`)

for(const navLink of navLinksAll){
    navLink.classList.remove("active");
}

currentNavLink.classList.add("active")



// for (const navLink of navigationOptions) {
//     navLink.addEventListener('click', function (ev) {
//        // ev.preventDefault();
//         console.log(current);
//         console.log(this);
//         console.log(ev.target);
//         if (ev.target.classList.contains("active")) {
//             return
//         } else {
//             ev.target.classList.add("active");
//             current.classList.remove('active');
//             current = ev.target
//         }
//         current.classList.remove("active");
//         this.classList.add("active");
//         current = this;
//         //current[0].className = current[0].className.replace(" active", "");
//         this.className += " active";
//     })

//     //let currentActive = document.querySelector(".active");
//     // navLink.addEventListener('click', (ev) => {
//     //     // navLink.classList.remove("active");
//     //     // ev.preventDefault();
//     //     if (ev.target.classList.contains("active")) {
//     //         return
//     //     } else {
//     //         ev.target.classList.add("active");
//     //         currentActive.classList.remove('active');
//     //         currentActive = ev.target
//     //     }
//     //     //console.log(ev.target);

//     // })

// }
