let isLogin = true;
const authForm = document.getElementById('auth-form');
const toggleBtn = document.getElementById('toggle-auth');
const authTitle = document.getElementById('auth-title');
const mainBtn = document.getElementById('main-btn');
const emailGroup = document.getElementById('email-group');

toggleBtn.onclick = () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? "Вход" : "Регистрация";
    mainBtn.innerText = isLogin ? "ВОЙТИ" : "СОЗДАТЬ АККАУНТ";
    emailGroup.classList.toggle('active');
};

authForm.onsubmit = (e) => {
    e.preventDefault();
    const userVal = document.getElementById('username').value;
    const passVal = document.getElementById('password').value;

    if (userVal === "admin" && passVal === "admin123") {
        document.getElementById('auth-ui').style.display = "none";
        document.getElementById('admin-panel').style.display = "block";
    } else {
        localStorage.setItem('aroUser', JSON.stringify({ username: userVal }));
        window.location.href = "../index.html";
    }
};

document.getElementById('add-video-btn').onclick = () => {
    const title = document.getElementById('v-title').value;
    const id = document.getElementById('v-id').value;
    if (title && id) {
        let vids = JSON.parse(localStorage.getItem('localVideos')) || [];
        vids.push({
            title, 
            id, 
            thumb: `https://img.youtube.com/vi/${id}/mqdefault.jpg`
        });
        localStorage.setItem('localVideos', JSON.stringify(vids));
        alert("Опубликовано!");
        window.location.href = "../index.html";
    }
};