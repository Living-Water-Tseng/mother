document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.getElementById('playButton');
  const message = document.getElementById('message');
  const showCodeBtn = document.getElementById('showCodeBtn');
  const codeModal = document.getElementById('codeModal');
  const closeModal = document.getElementById('closeModal');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const codeContent = document.getElementById('codeContent');
  const heartsContainer = document.getElementById('hearts');
  const soundEffect = document.getElementById('soundEffect');
  const statusMessage = document.getElementById('statusMessage');

  // 設置原始碼內容
  codeContent.textContent = document.documentElement.outerHTML;

  // 創建漂浮愛心
  function createHearts() {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '❤️';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = 6 + Math.random() * 10 + 's';
      heart.style.animationDelay = Math.random() * 5 + 's';
      heartsContainer.appendChild(heart);
    }
  }

  createHearts();

  // 顯示狀態訊息
  function showStatus(message, duration = 3000) {
    statusMessage.textContent = message;
    statusMessage.classList.add('show');
    setTimeout(() => {
      statusMessage.classList.remove('show');
    }, duration);
  }

  // 播放按鈕點擊事件
  playButton.addEventListener('click', function() {
    // 嘗試多種方法播放音效
    try {
      // 方法 1: 使用 Audio 元素
      soundEffect.play()
        .then(() => {
          showStatus('音效播放中...');
        })
        .catch(err => {
          console.error('音效播放失敗 (方法 1):', err);
          // 方法 2: 創建新的 Audio 對象
          try {
            const audio = new Audio('https://taira-komori.jpn.org/sound_os2/arms01/laser6.mp3');
            audio.play()
              .then(() => {
                showStatus('音效播放中... (方法 2)');
              })
              .catch(err2 => {
                console.error('音效播放失敗 (方法 2):', err2);
                showStatus('無法播放音效，請檢查瀏覽器設置');
              });
          } catch (err3) {
            console.error('音效播放失敗 (方法 2 創建):', err3);
          }
        });
    } catch (err) {
      console.error('音效播放嘗試失敗:', err);
    }

    // 顯示訊息
    message.classList.add('show');

    // 創建更多愛心效果
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = 40 + Math.random() * 20 + 'vw';
        heart.style.bottom = '0';
        heart.style.animationDuration = 3 + Math.random() * 4 + 's';
        heartsContainer.appendChild(heart);
      }, i * 300);
    }
  });

  // 顯示程式碼視窗
  showCodeBtn.addEventListener('click', function() {
    codeModal.classList.add('show');
  });

  // 關閉程式碼視窗
  closeModal.addEventListener('click', function() {
    codeModal.classList.remove('show');
  });

  // 點擊視窗外部關閉視窗
  codeModal.addEventListener('click', function(e) {
    if (e.target === codeModal) {
      codeModal.classList.remove('show');
    }
  });

  // 複製程式碼
  copyCodeBtn.addEventListener('click', function() {
    const textArea = document.createElement('textarea');
    textArea.value = codeContent.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // 顯示複製成功提示
    const originalText = copyCodeBtn.innerHTML;
    copyCodeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      已複製！
    `;
    setTimeout(function() {
      copyCodeBtn.innerHTML = originalText;
    }, 2000);
  });
});
