let destinasjoner = JSON.parse(localStorage.getItem("destinasjoner")) || [];

function lagre() {
    localStorage.setItem("destinasjoner", JSON.stringify(destinasjoner));
}

function visDestinasjoner() {
    const destinasjonsContainer = document.getElementById("destinasjonsListe");
    destinasjonsContainer.innerHTML = "";

    for (let i = 0; i < destinasjoner.length; i++) {
        const destinasjon = destinasjoner[i];

        if(!destinasjon.bilder) destinasjon.bilder = []

        const destinasjonsDiv = document.createElement("div");
        destinasjonsDiv.className = "destinasjonsListe";

        const destinasjonsNavn = document.createElement("h2");
        destinasjonsNavn.textContent = destinasjon.navn;


        //slett knapp:
        const slettKnapp = document.createElement("button");
        slettKnapp.textContent = "🗑️";
        slettKnapp.className = "slettKnapp";
        slettKnapp.onclick = function () {
            destinasjoner.splice(i, 1);
            lagre();
            visDestinasjoner();
        };

        const bildefil = document.createElement("input");
        bildefil.type = "file";
        bildefil.accept = "image/*";
        bildefil.multiple = true;
        bildefil.onchange = (event) => {
            const filer = Array.from(event.target.files);
            filer.forEach((fil) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    destinasjon.bilder.push(e.target.result);
                    lagre();
                    visDestinasjoner();
                };
                reader.readAsDataURL(fil);
            });
        };

        const bilderDiv = document.createElement("div");
        bilderDiv.className = "bilder";
        destinasjon.bilder.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            bilderDiv.appendChild(img);
        });

        destinasjonsDiv.appendChild(destinasjonsNavn);
        destinasjonsDiv.appendChild(slettKnapp);
        destinasjonsDiv.appendChild(bildefil);
        destinasjonsDiv.appendChild(bilderDiv);

        destinasjonsContainer.appendChild(destinasjonsDiv);
    }
};

function leggTilDestinasjon() {
    const input = document.getElementById("destinasjonsinput");
    const destinasjonsNavn = input.value.trim();
    if (destinasjonsNavn === "") return;

    destinasjoner.push({
        navn: destinasjonsNavn,
        bilder: []
    });

    input.value = "";
    lagre();
    visDestinasjoner();
}

visDestinasjoner();

