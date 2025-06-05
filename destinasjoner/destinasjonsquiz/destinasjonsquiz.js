

const faktaKolonne = 2;
const antallSpoersmaal = 4;

function visQuiz(data) {

    const divEl = document.getElementById("paastand");
    divEl.innerHTML = "";

    const overskrifter = data[0];
    const rader = data.slice(1); 

    rader.forEach(rad => {
        
        const faktaDiv = document.createElement("div");
        faktaDiv.className = "fakta";

        faktaDiv.innerHTML = rad[faktaKolonne];

        divEl.appendChild(faktaDiv);
    });

}

hentData().then(data => {
    visQuiz(data);
});