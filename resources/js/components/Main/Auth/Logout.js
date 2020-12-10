export default function  logout() {
    window.location.href = 'http://127.0.0.1:8000/#/login';
    localStorage.clear();
}