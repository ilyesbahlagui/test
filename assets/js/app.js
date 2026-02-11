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

    // Banque
    document.getElementById('val-benef').textContent = config.banque.titulaire;
    document.getElementById('val-iban').textContent = config.banque.iban;
    document.getElementById('val-bic').textContent = config.banque.bic;
    document.getElementById('val-ref').textContent = config.banque.ref;

    // Liens externes
    document.getElementById('link-cb').href = config.liens.cb;
    document.getElementById('link-cagnotte').href = config.liens.cagnotte;

    // Contact
    const adresse = config.contact.adresse;
    const tel = config.contact.tel;
    const email = config.contact.email;

    document.getElementById('txt-adresse').textContent = adresse;
    document.getElementById('txt-tel').textContent = tel;
    document.getElementById('txt-email').textContent = email;

    const adresseLink = document.getElementById('link-adresse');
    const telLink = document.getElementById('link-tel');
    const emailLink = document.getElementById('link-email');

    adresseLink.href = `https://maps.google.com/?q=${encodeURIComponent(adresse)}`;
    telLink.href = `tel:${tel.replace(/\s+/g, '')}`;
    emailLink.href = `mailto:${email}`;

    // Horaires vendredi
    document.getElementById('heure-ete').textContent = config.horaires.vendredi.ete;
    document.getElementById('heure-hiver').textContent = config.horaires.vendredi.hiver;
    const mawaqitLink = document.getElementById('link-mawaqit');
    if (mawaqitLink) {
        mawaqitLink.href = config.horaires.lien;
    }

    // Map
    const mapHtml = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q=${encodeURIComponent(config.contact.adresse)}&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>`;
    document.getElementById('map-frame').innerHTML = mapHtml;

    // Meta SEO minimal
    applySeoTags(nom);
}

// Menu Burger
function toggleMenu() {
    const nav = document.getElementById('nav-overlay');
    nav.classList.toggle('open');
}

// Copier les informations bancaires
function copierValeur(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.textContent.trim();
    if (!text) return;

    navigator.clipboard.writeText(text)
        .then(() => showToast('Copié'))
        .catch(() => showToast('Copié'));
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

function showToast(message = 'Copié') {
    const toast = document.getElementById('toast');
    const text = document.getElementById('toast-text');
    if (!toast || !text) return;
    text.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
}

function applySeoTags(nom) {
    const description = `${nom} - Dons, coordonnées et horaires du vendredi.`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
    }
    ogTitle.content = `${nom} - Portail de dons`;

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
    }
    ogDesc.content = description;
}
