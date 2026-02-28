// studies.js (Studiesページ専用)

document.addEventListener('DOMContentLoaded', () => {

    // 1. 操作対象のHTML要素を取得
    const video = document.getElementById('studies-top-video');
    const contentSection = document.getElementById('studies-content'); // スクロール先

    // 要素が見つからない場合はエラーを表示して終了
    if (!video || !contentSection) {
        console.error('Studiesページの動画またはスクロール先の要素が見つかりません。IDを確認してください。');
        return; 
    }

    // --- 2. ページフェードイン後に動画を再生 ---
    
    // common.js が 1.0s かけてフェードインさせるのを待つ
    // 1.1秒後 (1100ms) に再生を開始
    setTimeout(() => {
        video.play();
    }, 1100); 


    // --- 3. スクロール関数の準備 (top.jsからコピー) ---

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

    // --- 4. イベントリスナーの設定 ---

    // 動画終了時の処理 (毎回スクロール)
    video.addEventListener('ended', () => {
        console.log('Studies動画 終了'); 
        
        // スクロール先を計算
        const sectionTop = contentSection.offsetTop;
        const offset = 80; // 80px手前で止まる (お好みで調整)
        const scrollToPosition = sectionTop - offset;
        
        // スクロール実行
        customSmoothScroll(scrollToPosition, 1500); // 1.5秒かけてスクロール
    });

    // 動画クリック時の処理
    video.addEventListener('click', () => {
        video.play(); // 再生 (再生終了後に 'ended' が発火して自動スクロール)
    });

});