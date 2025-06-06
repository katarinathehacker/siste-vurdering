

const faktaKolonne = 2;
const antallSpoersmaal = 4;

let spørsmål = [];
let nåværendeIndeks = 0;
let poeng = 0;
let brukerSvar = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function visQuiz(data) {
    const overskrifter = data[0];
    const rader = data.slice(1); 

    const alternativer = rader.map(rad => rad[0]);
    shuffle(rader);
    spørsmål = rader.slice(0, 10).map((rad, indeks) => {
        const riktigSvar = rad[0];
        const spmTekst = rad[1];

        let svaralternativer = [riktigSvar];
        while (svaralternativer.length < 4) {
            let tilfeldig = alternativer[Math.floor(Math.random() * alternativer.length)];
            if (!svaralternativer.includes(tilfeldig)) {
                svaralternativer.push(tilfeldig);
            }
        }
        shuffle(svaralternativer);

        return {
            indeks,
            spm: spmTekst,
            fasit: riktigSvar,
            alternativer: svaralternativer,
            valgt: null
        };
    });

    visAlleSpørsmål();
    //visNesteSpørsmål();
}

function visAlleSpørsmål() {
    const container = document.querySelector(".svaralternativer");
    container.innerHTML = "";

    spørsmål.forEach((spm, indeks) => {
        const spmDiv = document.createElement("div");
        spmDiv.className = "spm-blokk";

        const spmTekst = document.createElement("p");
        spmTekst.textContent = `${indeks + 1}. ${spm.spm}`;
        spmDiv.appendChild(spmTekst);

        spm.alternativer.forEach(alt => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `spm-${indeks}`;
            radio.value = alt;
            radio.onchange = () => spm.valgt = alt;

            label.appendChild(radio);
            label.append(` ${alt}`);
            spmDiv.appendChild(label);
            spmDiv.appendChild(document.createElement("br"));
        });

        container.appendChild(spmDiv);
    });
}

function visNesteSpørsmål() {
    const spørsmålsElement = document.getElementById("paastand");
    const svarElement = document.querySelector(".svaralternativer");

    if (nåværendeIndeks >= spørsmål.length) {
        spørsmålsElement.textContent = "Du har svart på alle spørsmål.";
        svarElement.innerHTML = "";
        return;
    }

    const nå = spørsmål[nåværendeIndeks];
    spørsmålsElement.textContent = `${nåværendeIndeks + 1}. ${nå.spm}`;
    svarElement.innerHTML = "";

    nå.alternativer.forEach(alternativ => {
        const knapp = document.createElement("button");
        knapp.textContent = alternativ;
        knapp.onclick = () => {
            brukerSvar[nåværendeIndeks] = alternativ;
            nåværendeIndeks++;
            visNesteSpørsmål();
        };
        svarElement.appendChild(knapp);
    });
}

document.getElementById("ferdigKnapp").addEventListener("click", () => {
    const resultatDiv = document.getElementById("resultat");
    resultatDiv.innerHTML = "";

    let riktige = 0;
    spørsmål.forEach((spm, i) => {
        const div = document.createElement("div");
        const korrekt = spm.valgt === spm.fasit;
        if (korrekt) riktige++;

        div.innerHTML = `<strong>${i + 1}. ${spm.spm}</strong><br>` +
                        `Ditt svar: ${spm.valgt || "(ingen valgt)"} <br>` +
                        `Riktig svar: ${spm.fasit}`;
        div.style.backgroundColor = korrekt ? "#c8f7c5" : "#f7c5c5";
        div.style.padding = "10px";
        div.style.marginBottom = "10px";

        resultatDiv.appendChild(div);
    });

    const oppsummering = document.createElement("p");
    oppsummering.innerHTML = `<strong>Du fikk ${riktige} av ${spørsmål.length} riktige.</strong>`;
    resultatDiv.prepend(oppsummering);
});

hentData().then(data => {
    visQuiz(data);
});