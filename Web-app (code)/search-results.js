document.addEventListener('DOMContentLoaded', function () {
    const diseaseDatabase = {
        "Leaf Spot": {
            plant: "Tomato",
            image: "",
            symptoms: "Small gray or dark brown spots appear on the lower leaves, gradually enlarging with yellow halos and spreading rapidly in humid conditions.",
            cause: "Caused by the fungus Septoria lycopersici or Cercospora under warm, wet, and poorly ventilated environments.",
            treatments: [
                {
                    title: "1. Isolate and prune",
                    type: "Mechanical",
                    content: "Immediately cut off leaves showing signs of disease to prevent spreading. Dispose of infected leaves far away from the planting area."
                },
                {
                    title: "2. Spray preventive fungicides",
                    type: "Chemical",
                    content: "Use fungicides containing Mancozeb or Copper Oxychloride, spraying twice 7 days apart."
                }
            ]
        },
        "Healthy": {
            plant: "Potato",
            image: "",
            symptoms: "Leaves are vibrant green, firm, and free of spots, discoloration, curling, or pest damage.",
            cause: "Optimal watering, balanced soil nutrients, and good air circulation.",
            treatments: [
                {
                    title: "1. Routine maintenance",
                    type: "Care",
                    content: "Maintain your current watering schedule (water at the base in the early morning) and inspect leaves weekly."
                }
            ]
        },
        "Apple Scab": {
            plant: "Apple Tree",
            image: "",
            symptoms: "Olive-green to dark brown, velvety or scabby lesions on both leaves and fruit, causing leaves to twist and drop prematurely.",
            cause: "Caused by the ascomycete fungus Venturia inaequalis overwintering in fallen infected leaves.",
            treatments: [
                {
                    title: "1. Sanitation & pruning",
                    type: "Mechanical",
                    content: "Rake and destroy all fallen leaves around the tree base. Prune the canopy to improve sunlight penetration and airflow."
                },
                {
                    title: "2. Targeted fungicide application",
                    type: "Chemical",
                    content: "Apply sulfur or captan-based fungicides starting at green tip stage through petal fall."
                }
            ]
        }
    };

    const modalHTML = `
        <div class="lib-modal-overlay" id="libModalOverlay">
            <div class="lib-modal-container">
                <button class="lib-modal-close" id="libModalClose" title="Close">&times;</button>
                <div class="lib-modal-scroll">
                    <div class="lib-modal-hero">
                        <i class="bi bi-image" id="libModalPlaceholderIcon"></i>
                        <img id="libModalImg" src="" alt="Plant disease">
                    </div>
                    <div class="lib-modal-body">
                        <div class="lib-modal-header">
                            <span class="lib-plant-badge"><i class="bi bi-flower1"></i> <span id="libModalPlant">PLANT: -</span></span>
                            <h2 class="lib-disease-title" id="libModalDisease">Condition: -</h2>
                        </div>

                        <div class="lib-info-grid">
                            <div class="lib-info-card">
                                <h4><i class="bi bi-search"></i> Symptoms</h4>
                                <p id="libModalSymptoms">-</p>
                            </div>
                            <div class="lib-info-card">
                                <h4><i class="bi bi-virus"></i> Cause</h4>
                                <p id="libModalCause">-</p>
                            </div>
                        </div>

                        <div class="lib-treatment-section">
                            <h3>Recommended Treatment Plan</h3>
                            <div class="lib-treatment-list" id="libModalTreatments"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const overlay = document.getElementById('libModalOverlay');
    const closeBtn = document.getElementById('libModalClose');

    function openDiseaseModal(card) {
        const diseaseName = card.querySelector('.lib-heading')?.innerText.trim() || "-";
        const plantName = card.querySelector('.lib-subheading')?.innerText.trim() || "-";
        const descFallback = card.querySelector('.lib-desc')?.innerText.trim() || "No detailed description available.";
        const cardImg = card.querySelector('.lib-img-placeholder img')?.getAttribute('src');

        const data = diseaseDatabase[diseaseName] || {
            plant: plantName,
            image: cardImg || "",
            symptoms: descFallback,
            cause: "Information is being updated in the library database.",
            treatments: [
                {
                    title: "General Care",
                    type: "Advisory",
                    content: "Isolate the affected plant if symptoms worsen and consult a local agricultural specialist."
                }
            ]
        };

        const modalImg = document.getElementById('libModalImg');
        const placeholderIcon = document.getElementById('libModalPlaceholderIcon');
        const finalImgSrc = data.image || cardImg;

        if (finalImgSrc) {
            modalImg.src = finalImgSrc;
            modalImg.style.display = 'block';
            placeholderIcon.style.display = 'none';
        } else {
            modalImg.style.display = 'none';
            placeholderIcon.style.display = 'block';
        }

        document.getElementById('libModalPlant').innerText = `PLANT: ${data.plant}`;
        document.getElementById('libModalDisease').innerText = `Condition: ${diseaseName}`;
        document.getElementById('libModalSymptoms').innerText = data.symptoms;
        document.getElementById('libModalCause').innerText = data.cause;

        const treatmentsContainer = document.getElementById('libModalTreatments');
        treatmentsContainer.innerHTML = data.treatments.map(item => `
            <div class="lib-reco-card">
                <div class="lib-reco-header">
                    <strong>${item.title}</strong> <span class="lib-reco-type">· ${item.type}</span>
                </div>
                <div class="lib-reco-content">${item.content}</div>
            </div>
        `).join('');

        overlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeDiseaseModal() {
        overlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('.lib-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.lib-card');
            if (card) openDiseaseModal(card);
        });
    });

    closeBtn.addEventListener('click', closeDiseaseModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeDiseaseModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeDiseaseModal();
        }
    });
});