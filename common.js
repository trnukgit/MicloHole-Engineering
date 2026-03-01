document.addEventListener('DOMContentLoaded', () => {

    const IDLE_TIMEOUT = 20000;
    let idleTimer = null;
    
    const resetIdleTimer = () => {
        if (idleTimer) clearTimeout(idleTimer);
        
        const isTopPage = window.location.pathname.endsWith('index.html') 
                       || window.location.pathname === '/'
                       || window.location.pathname.endsWith('/');
        
        if (!isTopPage) {
            idleTimer = setTimeout(() => {
                window.location.href = 'index.html';
            }, IDLE_TIMEOUT);
        }
    };
    
    ['click', 'touchstart', 'mousemove', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, resetIdleTimer, { passive: true });
    });
    
    resetIdleTimer();

    if (!document.getElementById('splash-screen')) {
        document.body.classList.add('is-visible');
    }

    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (!href || link.target === '_blank' || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
                return;
            }
            
            e.preventDefault();
            document.body.classList.add('is-fading');
            
            setTimeout(() => {
                window.location.href = href;
            }, 1000); 
        });
    });

});
