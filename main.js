const ninoDubost = document.getElementById('name');
const etudiantInfo = document.getElementById('function');
const profilPic = document.getElementById('nino');
const header = document.querySelector('header');
const backToTopButton = document.getElementById("backToTop");

const blackContainers = document.querySelectorAll(".blockFade");
const sectionTitles = document.querySelectorAll(".sectionTitle");

//Apparition header et hero
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if(header) header.classList.add('visible'); 
    }, 50);

    setTimeout(() => {
        if(ninoDubost) ninoDubost.style.opacity = 1;
    }, 100);

    setTimeout(() => {
        if(etudiantInfo) etudiantInfo.style.opacity = 1;
    }, 400);

    setTimeout(() => {
        if(profilPic) profilPic.style.opacity = 1;
    }, 900);
    
    majAffichage(false);
});

//Scroll
window.addEventListener('scroll', () => {
    if(header) {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    if(backToTopButton) {
        if(window.scrollY > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    }
});

if(backToTopButton) {
    backToTopButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


//Apparition sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

blackContainers.forEach(block => observer.observe(block));
sectionTitles.forEach(title => observer.observe(title));


//Filtre et tri
const experiences = Array.from(document.querySelectorAll('.expItem'));
const gridContainer = document.getElementById("experiencesGrid");
const langSelect = document.getElementById("langSelect");
const boutons = document.querySelectorAll('.filtreExp');
const sortSelect = document.getElementById("sortSelect");

let categorieActuelle = 'tout';
let triActuel = 'antichrono';
let langageActuel = 'tout';

function majAffichage(avecAnimation = true) {

    let itemsA_Afficher = experiences.filter(bloc => {
        let bonneCategorie = (categorieActuelle == 'tout' || bloc.classList.contains(categorieActuelle));
        let bonLangage = true;

        if(categorieActuelle == 'projet' && langageActuel !== 'tout') {
            bonLangage = bloc.classList.contains(langageActuel);
        }
        return bonneCategorie && bonLangage;
    });

    if(triActuel == 'chrono') {
        itemsA_Afficher.reverse();
    }

    experiences.forEach(bloc => {
        bloc.style.display = 'none';
        bloc.classList.remove('visible');
    });

    let compteur = 0;

    itemsA_Afficher.forEach(bloc => {
        gridContainer.appendChild(bloc);

        bloc.classList.remove('blockGauche', 'blockDroite');
        bloc.style.opacity = '0'; 
        bloc.style.transform = '';

        if(compteur % 2 == 0) {
            bloc.classList.add('blockGauche');
        } else {
            bloc.classList.add('blockDroite');
        }

        bloc.style.display = 'flex';

        if(avecAnimation) {
            setTimeout(() => {
                bloc.style.opacity = '1';
                bloc.classList.add('visible');
            }, 50 + (compteur * 50));
        } else {
            bloc.style.opacity = ''; 
            observer.observe(bloc);
        }
        compteur++;
    });
}

function changerFiltre(categorie, bouton) {
    boutons.forEach(b => b.classList.remove('actif'));
    bouton.classList.add('actif');
    categorieActuelle = categorie;

    if (langSelect) {
        if(categorie == 'projet') {
            langSelect.classList.add('show');
        } else {
            langSelect.classList.remove('show');
            setTimeout(() => {
                if(!langSelect.classList.contains('show')) {
                    langSelect.value = 'tout';
                    langageActuel = 'tout';
                }
            }, 500);
        }
    }

    if(categorie != 'projet') { langageActuel = 'tout'; }

    majAffichage(true);
}

const boutonTout = document.getElementById("boutonTout");
const boutonEmplois = document.getElementById("boutonEmplois");
const boutonStages = document.getElementById("boutonStages");
const boutonProjets = document.getElementById("boutonProjets");

if(boutonTout) boutonTout.addEventListener('click', () => changerFiltre('tout', boutonTout));
if(boutonEmplois) boutonEmplois.addEventListener('click', () => changerFiltre('emploi', boutonEmplois));
if(boutonStages) boutonStages.addEventListener('click', () => changerFiltre('stage', boutonStages));
if(boutonProjets) boutonProjets.addEventListener('click', () => changerFiltre('projet', boutonProjets));

if(sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        triActuel = e.target.value;
        majAffichage(true);
        sortSelect.blur();
    });
}

if(langSelect) {
    langSelect.addEventListener('change', (e) => {
        langageActuel = e.target.value;
        majAffichage(true);
        langSelect.blur();
    });
}
