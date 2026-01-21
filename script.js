document.addEventListener('DOMContentLoaded', () => {
    const userNav = document.getElementById('user-nav');
    const loginBtn = document.getElementById('login-trigger');
    const videoGrid = document.getElementById('main-video-grid');

    const savedUser = localStorage.getItem('aroUser');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        userNav.innerHTML = `
            <div class="user-profile fade-in" id="logout-trigger">
                <div class="avatar-mini">${user.username[0].toUpperCase()}</div>
                <span>${user.username}</span>
            </div>
        `;
        document.getElementById('logout-trigger').onclick = () => {
            if(confirm("Выйти?")) {
                localStorage.removeItem('aroUser');
                location.reload();
            }
        };
    } else if (loginBtn) {
        loginBtn.onclick = () => window.location.href = 'sign/index.html';
    }

    const overlay = document.getElementById('age-verification');
    if (localStorage.getItem('aro_age_verified') === 'true') {
        overlay.style.display = 'none';
    }
    document.getElementById('btn-accept').onclick = () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            localStorage.setItem('aro_age_verified', 'true');
        }, 400);
    };

    const localVideos = JSON.parse(localStorage.getItem('localVideos')) || [];
    localVideos.forEach(vid => {
        const card = document.createElement('div');
        card.className = 'video-card fade-in';
        card.innerHTML = `
            <div class="video-thumb" style="background-image: url('${vid.thumb}')">
                <div class="play-button"></div>
            </div>
            <div class="v-info">
                <h4>${vid.title}</h4>
                <span>Смотреть на AroHub</span>
            </div>
        `;
        
        card.onclick = () => {
            const thumb = card.querySelector('.video-thumb');
            thumb.innerHTML = `<iframe src="https://www.youtube.com/embed/${vid.id}?autoplay=1&rel=0&enablejsapi=1&origin=${window.location.origin}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        };
        videoGrid.prepend(card);
    });
});