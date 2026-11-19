document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const previewImg = document.getElementById('previewImg');
    const previewIcon = document.getElementById('previewIcon');
    const uploadZone = document.querySelector('.upload-zone');

    let toastTimeout;
    function showToast(title, message, type = 'error') {
        let toast = document.getElementById('customToast');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'customToast';
            document.body.appendChild(toast);
        }
        
        const isSuccess = type === 'success';
        const iconClass = isSuccess ? 'bi-check-lg' : 'bi-exclamation';
        const colorClass = isSuccess ? 'toast-success' : 'toast-error';
        
        toast.className = `custom-toast ${colorClass}`;
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="bi ${iconClass}"></i>
            </div>
            <div class="toast-content">
                <h4 class="toast-title">${title}</h4>
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close" id="closeToastBtn">
                <i class="bi bi-x"></i>
            </button>
        `;
        
        void toast.offsetWidth;
        
        toast.classList.add('show');

        document.getElementById('closeToastBtn').addEventListener('click', function() {
            toast.classList.remove('show');
        });

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    function analyzeImage() {
        const resultBox = document.getElementById('resultBox');
        const loadingState = document.getElementById('loadingState');
        const plantBar = document.getElementById('resPlantBar');
        const diseaseBar = document.getElementById('resDiseaseBar');

        plantBar.style.width = '0%';
        diseaseBar.style.width = '0%';

        resultBox.style.display = 'none';
        loadingState.style.display = 'flex'; 

        setTimeout(() => {
            loadingState.style.display = 'none';
            resultBox.style.display = 'block';

            document.getElementById('resPlantName').innerText = 'PLANT: Demo Plant Name';
            document.getElementById('resPlantConf').innerText = 'Confidence 95.0%';
            document.getElementById('resPlantTopK').innerHTML = `<p>Demo Plant Name (0.95)</p><p>Other Plant Name (0.04)</p>`;

            document.getElementById('resDiseaseName').innerText = 'Condition: Leaf Spot Disease';
            document.getElementById('resDiseaseConf').innerText = 'Confidence 88.0%';
            document.getElementById('resSymptoms').innerText = 'Small gray spots appear on the leaf surface and spread in humid conditions.';
            document.getElementById('resCause').innerText = 'Caused by the Cercospora fungus under high humidity conditions.';
            document.getElementById('resDiseaseTopK').innerHTML = `<p>Leaf Spot Disease (0.88)</p><p>Anthracnose (0.10)</p>`;

            document.getElementById('resTreatmentContainer').innerHTML = `
                <div class="reco-card">
                    <div class="reco-header"><strong>1. Isolate and prune</strong> <span class="reco-type">· Mechanical</span></div>
                    <div class="reco-content">Immediately cut off leaves showing signs of disease to prevent spreading. Dispose of infected leaves far away from the planting area.</div>
                </div>
                <div class="reco-card">
                    <div class="reco-header"><strong>2. Spray preventive fungicides</strong> <span class="reco-type">· Chemical</span></div>
                    <div class="reco-content">Use fungicides containing Mancozeb or Copper Oxychloride, spraying twice 7 days apart.</div>
                </div>
            `;
            document.getElementById('resLatency').innerText = '⏱ plant 120 ms · disease 150 ms · total 270 ms · ONNX backend';

            setTimeout(() => {
                plantBar.style.width = '95%';
                diseaseBar.style.width = '88%';
            }, 50);

        }, 1500); 
    }

    function showPreview(file) {
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            previewImg.src = imageUrl;
            previewIcon.style.display = 'none';
            previewImg.style.display = 'block';
            
            showToast('Success', 'Image uploaded successfully.', 'success');

            analyzeImage();

        } else {
            showToast('Error', 'Select a valid image format (jpg, png,...).', 'error');
        }
    }    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        showPreview(file);
    });

    uploadZone.addEventListener('dragover', function(event) {
        event.preventDefault();
        uploadZone.style.opacity = '0.6';
    });

    uploadZone.addEventListener('dragleave', function(event) {
        event.preventDefault();
        uploadZone.style.opacity = '1';
    });

    uploadZone.addEventListener('drop', function(event) {
        event.preventDefault();
        uploadZone.style.opacity = '1';
        
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            showPreview(files[0]);
        }
    });
});

const saveButtons = document.querySelectorAll('.btn-secondary');

saveButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        
        const icon = this.querySelector('i');
        
        if (this.classList.contains('active')) {
            icon.classList.remove('bi-bookmark');
            icon.classList.add('bi-bookmark-fill');
        } else {
            icon.classList.remove('bi-bookmark-fill');
            icon.classList.add('bi-bookmark');
        }
    });
});

function openAboutModal() {
    document.getElementById('aboutModalOverlay').classList.add('active');
    document.body.classList.add('modal-open'); // Chặn scroll nền
}

function closeAboutModal() {
    document.getElementById('aboutModalOverlay').classList.remove('active');
    document.body.classList.remove('modal-open'); // Mở lại scroll nền
}

function closeAboutModalOnOutside(event) {
if (event.target.id === 'aboutModalOverlay') {
    closeAboutModal();
}
}

document.addEventListener('DOMContentLoaded', function() {
    const navList = document.querySelector('.nav-btn');
    const slider = document.querySelector('.nav-slider');
    const navItems = document.querySelectorAll('.nav-btn li');

    if (!navList || !slider || navItems.length === 0) return;

    function updateNavIcons() {
        navItems.forEach(item => {
            const icon = item.querySelector('i');
            if (!icon) return;
            const baseClass = Array.from(icon.classList).find(c => c.startsWith('bi-') && c !== 'bi');
            if (!baseClass) return;
            const cleanName = baseClass.replace('-fill', '');
            
            if (item.classList.contains('active')) {
                icon.classList.remove(cleanName);
                icon.classList.add(cleanName + '-fill');
            } else {
                icon.classList.remove(cleanName + '-fill');
                icon.classList.add(cleanName);
            }
        });
    }

    function moveSliderTo(targetItem, animate = true) {
        if (!targetItem) return;
        const link = targetItem.querySelector('a');
        
        if (!animate) {
            slider.style.transition = 'none';
        } else {
            slider.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), width 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        }
        
        slider.style.width = `${link.offsetWidth}px`;
        slider.style.transform = `translateX(${targetItem.offsetLeft}px)`;
        
        if (!animate) {
            void slider.offsetWidth;
        }
    }

    const activeIndex = Array.from(navItems).findIndex(li => li.classList.contains('active'));
    updateNavIcons();
    if (activeIndex !== -1) {
        moveSliderTo(navItems[activeIndex], false);
    }

    navItems.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            
            if (item.classList.contains('active')) {
                e.preventDefault();
                return;
            }

            e.preventDefault();

            navItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            updateNavIcons();
            moveSliderTo(item, true); 

            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.classList.add('fade-out');
            }

            setTimeout(() => {
                window.location.href = targetHref;
            }, 350);
        });
    });

    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-btn li.active');
        moveSliderTo(currentActive, false);
    });
});

