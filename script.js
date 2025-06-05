// kopier link
document.addEventListener('DOMContentLoaded', () => {
    const shareIcon = document.querySelector('.huskeliste-ikon');
    const melding = document.getElementById('kopiert-melding');

    shareIcon.addEventListener('click', () => {
        
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                
                melding.style.display = 'block';

                
                setTimeout(() => {
                    melding.style.display = 'none';
                }, 2000);
            })
            .catch(err => {
                console.error('Kopiering mislyktes: ', err);
            });
    });
});

// nedtelling til ferie 
const dagerEl = document.getElementById("dager");
const hoursEl = document.getElementById("hours");
const minutterEl = document.getElementById("minutter");
const sekunderEl = document.getElementById("sekunder");

function nedtelling() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 5, 25, 0, 0, 0); // betyr i juni fordi 0-indersering

    if (now > targetDate) {
        targetDate.setFullYear(now.getFullYear() + 1);
    }

    const forskjell = targetDate - now;

    const dager = Math.floor(forskjell / (1000 * 60 * 60 * 24));
    const hours = Math.floor((forskjell / (1000 * 60 * 60)) % 24);
    const minutter = Math.floor((forskjell / (1000 * 60)) % 60);
    const sekunder = Math.floor((forskjell / 1000) % 60);

    dagerEl.textContent = String(dager).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutterEl.textContent = String(minutter).padStart(2, '0');
    sekunderEl.textContent = String(sekunder).padStart(2, '0');

}


async function hentData() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdLTjmOjxPkEYIQqJwvT7AE8MAVW2LKtBl2m0xH3g-JU01T44q2cmEw_pVzZz50AZBUrTOvdAu3aEK/pub?gid=0&single=true&output=tsv";
    const response = await fetch(url);
    const tsv = await response.text();
    data = tsv
        .split("\n")
        .map(rad => rad.split("\t"));
    return data;
}

setInterval(nedtelling, 1000);
nedtelling();


