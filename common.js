document.addEventListener('DOMContentLoaded', () => {

    // --- 0. 展示用: 20秒操作なしでトップに戻る ---
    const IDLE_TIMEOUT = 20000; // 20秒
    let idleTimer = null;
    
    const resetIdleTimer = () => {
        if (idleTimer) clearTimeout(idleTimer);
        
        // トップページ以外にいる場合のみタイマー設定
        const isTopPage = window.location.pathname.endsWith('index.html') 
                       || window.location.pathname === '/'
                       || window.location.pathname.endsWith('/');
        
        if (!isTopPage) {
            idleTimer = setTimeout(() => {
                window.location.href = 'index.html';
            }, IDLE_TIMEOUT);
        }
    };
    
    // ユーザー操作を検知してタイマーリセット
    ['click', 'touchstart', 'mousemove', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, resetIdleTimer, { passive: true });
    });
    
    // 初回タイマー開始
    resetIdleTimer();


    // --- 1. ページフェードイン ---
    
    // もしトップページ（#splash-screen）で「ない」なら
    if (!document.getElementById('splash-screen')) {
        
        // ページ読み込みと同時にフェードインを開始
        document.body.classList.add('is-visible');
    }
    // (トップページの場合は、top.js が 'intro-started' を追加するまで
    // 'is-visible' が付かないので、フェードインが始まらない)


    // --- 2. ページ遷移 (FADE OUT) ---
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 外部リンク、ページ内リンク(#)、JSリンクなどは除外
            if (!href || link.target === '_blank' || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
                return;
            }
            
            // 内部リンクの場合
            e.preventDefault(); // いったんページ移動を止める
            document.body.classList.add('is-fading'); // フェードアウト開始
            
            // 1秒後 (CSSの transition: 1.0s に合わせる) にページ移動
            setTimeout(() => {
                window.location.href = href;
            }, 1000); 
        });
    });

});