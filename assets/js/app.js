// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    initData();
    initScrollTop();
});

function initData() {
    // Header & Footer
    const nom = config.general.nomMosquee;
    document.getElementById('brand-name').textContent = nom;
    document.getElementById('footer-brand').textContent = nom;
    document.title = `${nom} - Dons`;
    document.getElementById('footer-copy').textContent = `© ${config.general.annee} ${nom}. Tous droits réservés.`;

    // Boutons Prière
    const btnPriere = document.getElementById('btn-prayer-top');
    const lblPriere = document.getElementById('lbl-prayer');
    const menuPriere = document.getElementById('menu-prayer-link');
    btnPriere.href = config.horaires.lien;
    menuPriere.href = config.horaires.lien;
    lblPriere.textContent = config.horaires.texte;

    // Banque
    document.getElementById('val-benef').value = config.banque.titulaire;
    document.getElementById('val-iban').value = config.banque.iban;
    document.getElementById('val-bic').value = config.banque.bic;
    document.getElementById('val-ref').value = config.banque.ref;

    // Liens externes
    document.getElementById('link-cb').href = config.liens.cb;
    document.getElementById('link-cagnotte').href = config.liens.cagnotte;

    // Contact
    document.getElementById('txt-adresse').textContent = config.contact.adresse;
    document.getElementById('txt-tel').textContent = config.contact.tel;
    document.getElementById('txt-email').textContent = config.contact.email;

    // Map
    const mapHtml = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q=${encodeURIComponent(config.contact.adresse)}&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>`;
    document.getElementById('map-frame').innerHTML = mapHtml;
}

// Menu Burger
function toggleMenu() {
    const nav = document.getElementById('nav-overlay');
    nav.classList.toggle('open');
}

// Copier depuis Input
function copier(id) {
    const el = document.getElementById(id);
    el.select(); 
    el.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(el.value)
        .then(showToast)
        .catch(() => { 
            document.execCommand('copy'); 
            showToast(); 
        });
}

// Copier depuis Texte (Contact)
function copierTexte(id) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text)
        .then(showToast)
        .catch(err => console.error('Erreur copie', err));
}

function showToast(message = 'Copié avec succès !') {
    const x = document.getElementById("toast");
    const icon = x.querySelector('i');
    const textSpan = x.querySelector('span');
    
    if (textSpan) {
        textSpan.textContent = message;
    }
    
    x.className = "show";
    setTimeout(() => x.className = x.className.replace("show", ""), 3000);
}

// Scroll Top Button
function initScrollTop() {
    const btn = document.getElementById("scrollTopBtn");
    window.onscroll = () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    };
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
