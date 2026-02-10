// Générateur de RIB en PDF
function genererRIB() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Couleurs
    const vertPrimaire = [6, 95, 70];
    const grisFonce = [31, 41, 55];
    const grisTexte = [107, 114, 128];
    
    // En-tête avec bordure verte
    doc.setFillColor(...vertPrimaire);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Titre
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text(config.general.nomMosquee, 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.text('RELEVÉ D\'IDENTITÉ BANCAIRE', 105, 30, { align: 'center' });
    
    // Cadre principal
    doc.setDrawColor(...grisTexte);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, 50, 180, 120, 3, 3, 'S');
    
    // Contenu
    doc.setTextColor(...grisFonce);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    let y = 65;
    
    // Titulaire
    doc.text('TITULAIRE DU COMPTE', 20, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    doc.text(config.banque.titulaire, 20, y + 7);
    
    y += 25;
    
    // Domiciliation
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('DOMICILIATION', 20, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(11);
    doc.text(config.banque.domiciliation, 20, y + 7);
    
    y += 25;
    
    // IBAN
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('IBAN (International Bank Account Number)', 20, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    doc.setFont('courier', 'normal');
    doc.text(config.banque.iban, 20, y + 7);
    
    y += 20;
    
    // BIC
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('BIC (Bank Identifier Code)', 20, y);
    doc.setFont('courier', 'normal');
    doc.setFontSize(12);
    doc.text(config.banque.bic, 20, y + 7);
    
    y += 20;
    
    // Référence
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('RÉFÉRENCE DU DON', 20, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(11);
    doc.text(config.banque.ref, 20, y + 7);
    
    // Pied de page
    doc.setFontSize(9);
    doc.setTextColor(...grisTexte);
    doc.setFont(undefined, 'italic');
    doc.text('Document généré automatiquement - ' + new Date().toLocaleDateString('fr-FR'), 105, 185, { align: 'center' });
    doc.text('Merci pour votre générosité', 105, 192, { align: 'center' });
    
    // Contact
    doc.setFontSize(8);
    doc.text(config.contact.adresse, 105, 275, { align: 'center' });
    doc.text(`${config.contact.tel} • ${config.contact.email}`, 105, 280, { align: 'center' });
    
    return doc;
}

// Fonction pour télécharger le RIB
function telechargerRIB() {
    try {
        const doc = genererRIB();
        doc.save(`RIB-${config.general.nomMosquee.replace(/\s+/g, '-')}-${config.general.annee}.pdf`);
        showToast('RIB téléchargé avec succès !');
    } catch (error) {
        console.error('Erreur génération PDF:', error);
        alert('Erreur lors de la génération du RIB. Veuillez réessayer.');
    }
}
