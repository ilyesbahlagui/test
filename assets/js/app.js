// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    initData();
    initScrollTop();
    initAccessibility();
});

let lastFocusedElement = null;

// Données dynamiques
function initData() {
    // Header & Footer
    const nom = config.general.nomMosquee;
    document.getElementById('brand-name').textContent = nom;
    document.getElementById('footer-brand').textContent = nom;
    document.title = `${nom} - Dons`;
    const currentYear = new Date().getFullYear();
    document.getElementById('footer-copy').textContent = `© ${currentYear} ${nom}. Tous droits réservés.`;

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

}

// Menu Burger
function toggleMenu() {
    const nav = document.getElementById('nav-overlay');
    const isOpen = nav.classList.contains('open');

    if (!isOpen) {
        lastFocusedElement = document.activeElement;
        nav.classList.add('open');
        nav.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    } else {
        nav.classList.remove('open');
        nav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }
}

// Copier les informations bancaires
function copierValeur(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.textContent.trim();
    if (!text) return;

    navigator.clipboard.writeText(text)
        .then(() => showToast('Copié'))
    .catch(() => showToast('Copié'))
    .finally(() => clearFocus());
}

// Scroll Top Button
function initScrollTop() {
    const btn = document.getElementById("scrollTopBtn");
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });
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

// Supprime le focus persistant (notamment sur iOS après un clic)
function clearFocus() {
    const active = document.activeElement;
    if (active && typeof active.blur === 'function') {
        active.blur();
    }

    if (window.getSelection) {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
            selection.removeAllRanges();
        }
    }
}

// Accessibilité overlay (Esc pour fermer)
function initAccessibility() {
    document.addEventListener('keydown', (e) => {
        const nav = document.getElementById('nav-overlay');
        if (!nav.classList.contains('open')) return;
        if (e.key === 'Escape') {
            toggleMenu();
        }
    });
}

// Téléchargement direct du RIB statique
function telechargerRIB() {
    try {
        const ribUrl = config?.banque?.ribPdf;
        if (!ribUrl) {
            alert('Aucun PDF de RIB n\'est configuré pour le moment.');
            return;
        }

        const link = document.createElement('a');
        link.href = ribUrl;
        link.target = '_blank';
        link.rel = 'noopener';
        const baseName = (config?.general?.nomMosquee || 'mosquee')
            .normalize('NFD').replace(/\p{Diacritic}/gu, '') // retire les accents
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-_]/g, '') || 'mosquee';
        link.download = `RIB-${baseName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (typeof showToast === 'function') {
            showToast('RIB téléchargé');
        }
    } catch (error) {
        console.error('Erreur téléchargement RIB:', error);
        alert('Erreur lors du téléchargement du RIB. Veuillez réessayer.');
    }
}
