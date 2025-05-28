// Nav baren 
const navLister = document.querySelectorAll(".nav-liste");

navLister.forEach(liste=> {
    const h3 = liste.querySelector("h3");
    const dropdown = liste.querySelector(".dropdown-content");

    if(dropdown) {
        h3.addEventListener("click", () => {
            liste.classList.toggle("active");
        });
    }
});
// avslutt js til nav bar