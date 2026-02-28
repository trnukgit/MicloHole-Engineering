// top.js (トップページ専用)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. イントロロゴのフェードイン (★新規追加) ---
    const splashLogo = document.querySelector('.splash-logo');
    if (splashLogo) {
        // 少し待ってからフェードインさせる
        setTimeout(() => {
            splashLogo.classList.add('is-visible');
        }, 200); // 0.2秒後
    }


    // --- 2. イントロアニメーション (FADE IN) ---
    const splashScreen = document.getElementById('splash-screen');
    const video = document.getElementById('main-video'); 
    
    if (splashScreen) {
        splashScreen.addEventListener('click', () => {
            document.body.classList.add('intro-started');
            
            setTimeout(() => {
                if (video) {
                    video.play();
                }
            }, 2000); 
            
        }, { once: true });
    }


    // --- 3. 既存のスクリプト (ページ読み込みと動画終了) ---
    const contentSection = document.getElementById('content-start');
    
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100); 

    if (!video || !contentSection) {
        console.error('動画またはスクロール先の要素が見つかりません。');
        return;
    }

    // イージング関数
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // カスタムスクロール関数
    const customSmoothScroll = (targetPosition, duration) => {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animationLoop = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            window.scrollTo(0, startPosition + distance * easedProgress);
            if (elapsedTime < duration) {
                requestAnimationFrame(animationLoop);
            }
        };
        requestAnimationFrame(animationLoop);
    };

    // 動画終了時の処理
    video.addEventListener('ended', () => {
        const sectionTop = contentSection.offsetTop;
        const offset = 120; 
        const scrollToPosition = sectionTop - offset;
        customSmoothScroll(scrollToPosition, 1500);
    });

    // 動画クリック時の処理
    video.addEventListener('click', () => {
        video.play();
    });

});