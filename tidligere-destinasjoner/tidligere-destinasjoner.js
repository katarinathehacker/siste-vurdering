function visFeriemapper(data) {
    const divEl = document.getElementById("feriemappeFraRegneark");
    divEl.innerHTML = "";

    const overskrifter = data[0];
    const rader = data.slice(1); 

    rader.forEach(rad => {
        const mappeDiv = document.createElement("div");
        mappeDiv.className = "mappe";

        const linje = document.createElement("p");
        linje.className = "destinasjonsoverskrift1"
        linje.innerHTML = `<strong class="underoverskrift">${overskrifter[0]}</strong> <span class="bokstekst">${rad[0]}</span>`;

        const bilde = document.createElement("img");
        
        bilde.src = `https://drive.usercontent.google.com/download?id=${rad[5]}&export=view&authuser=0`;
        bilde.alt = `bildebeskrivelse${rad[0]}`;

        mappeDiv.appendChild(linje); 
        mappeDiv.appendChild(bilde);

        divEl.appendChild(mappeDiv);
    });
}

hentData().then(data => {
    visFeriemapper(data);
});