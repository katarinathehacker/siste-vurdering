// styling på beskrivelser.html. Legg til destinasjon

// for å hente lagrede destinasjoner fra localStorage
let destinasjoner = JSON.parse(localStorage.getItem("destinasjoner")) || [];

// for å lagre til localstorage automatisk 
function lagre() {
    localStorage.setItem("destinasjoner", JSON.stringify(destinasjoner)); 
}

function visDestinasjoner() {
    const destinasjonsContainer = document.getElementById("destinasjonsListe");
    destinasjonsContainer.innerHTML = ""; 
    
    for (let i = 0; i < destinasjoner.length; i++) {
        const destinasjon = destinasjoner[i];

        const destinasjonsDiv = document.createElement("div");
        destinasjonsDiv.className = "destinasjonsListe";

        //slett knapp:
        const slettKnapp = document.createElement("button");
        slettKnapp.textContent = "🗑️";
        slettKnapp.className = "slettKnapp";
        slettKnapp.onclick = function () {
            destinasjoner.splice(i, 1);
            lagre();
            visDestinasjoner();
        };

        const destinasjonsNavn = document.createElement("h2");
        destinasjonsNavn.textContent = destinasjon.navn; 

        const faktaBoks = document.createElement("label");
        faktaBoks.textContent = "Fakta";
        const fakta = document.createElement("textarea");
        fakta.value = destinasjon.fakta;
        fakta.oninput = function () {
            destinasjon.fakta = fakta.value;
            lagre();
        };

        const erfaringsBoks = document.createElement("label");
        erfaringsBoks.textContent = "Hvordan var reisen?";
        const erfaring = document.createElement("textarea");
        erfaring.value = destinasjon.erfaring;
        erfaring.oninput = function () {
            destinasjon.erfaring = erfaring.value;
            lagre();
        };

        destinasjonsDiv.appendChild(slettKnapp);
        destinasjonsDiv.appendChild(destinasjonsNavn);
        destinasjonsDiv.appendChild(faktaBoks);
        destinasjonsDiv.appendChild(fakta);
        destinasjonsDiv.appendChild(erfaringsBoks);
        destinasjonsDiv.appendChild(erfaring);

        destinasjonsContainer.appendChild(destinasjonsDiv);
    }
}
//legg til/lag nye destinasjonsmapper:

function leggTilDestinasjon() {
    const Destinasjonsinput = document.getElementById("destinasjonsinput");
    const navn = Destinasjonsinput.value.trim();
    if (navn === "") return;

    destinasjoner.push({
        navn: navn,
        fakta: "", 
        erfaring: ""
    });

    Destinasjonsinput.value = "";
    lagre();
    visDestinasjoner();
}
visDestinasjoner();