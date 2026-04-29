// ===========================================
// 動作處理函式 (可在此新增新動作)
// ===========================================

const actions = {
  toggleTooltip: () => {
    const tooltip = document.getElementById('gemini-custom-tooltip');
    if (tooltip) {
      tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
    }
  },

  focusInput: () => {
    // 先找 rich-textarea 內部的 contenteditable 元素
    const inputBox = document.querySelector('rich-textarea .ql-editor, rich-textarea div[contenteditable="true"], .ql-editor');
    if (inputBox) {
      inputBox.focus();
    }
  },

  newChat: () => {
    // 模擬 Ctrl+Shift+O (Gemini 內建的新對話快捷鍵)
    const event = new KeyboardEvent('keydown', {
      key: 'o',
      code: 'KeyO',
      ctrlKey: true,
      shiftKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  },

  tempChat: () => {
    const btn = document.querySelector('[data-test-id="temp-chat-button"], .temp-chat-button, button[aria-label="臨時對話"]');
    if (btn) {
      btn.click();
    }
  },

  switchModel: async () => {
    // 先隱藏提示氣泡
    const tooltip = document.getElementById('gemini-custom-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }

    // 打開模型選單讓選項出現在 DOM 中
    const modelSelectorBtn = document.querySelector('button[data-test-id="bard-mode-menu-button"], button[aria-label="開啟模式挑選器"]');
    if (!modelSelectorBtn) {
      return;
    }

    modelSelectorBtn.click();
    await new Promise(r => setTimeout(r, 100));

    // 找到所有模型選項
    const options = Array.from(document.querySelectorAll('[data-mode-id]'));

    if (options.length > 0) {
      const currentIndex = options.findIndex(opt => opt.classList.contains('is-selected'));
      const nextIndex = (currentIndex + 1) % options.length;

      options[nextIndex].click();

      // 切換後立即隱藏選單 (按 Escape 關閉)
      await new Promise(r => setTimeout(r, 50));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    } else {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    }
  }
};

// ===========================================
// 條件比對器
// ===========================================

function matchCondition(event, condition) {
  if (condition.ctrl && !event.ctrlKey) return false;
  if (condition.shift && !event.shiftKey) return false;
  if (condition.alt && !event.altKey) return false;
  if (condition.key && event.key.toLowerCase() !== condition.key.toLowerCase()) return false;
  return true;
}

// ===========================================
// UI 建構
// ===========================================

function createTooltip(shortcuts) {
  const tooltip = document.createElement('div');
  tooltip.id = 'gemini-custom-tooltip';

  const hintHtml = shortcuts
    .map(s => `<div>${s.hint}</div>`)
    .join('');

  tooltip.innerHTML = `<strong>⌨️ 快捷鍵提示</strong><br>${hintHtml}`;
  document.body.appendChild(tooltip);
}

// ===========================================
// 主監聽器
// ===========================================

function init() {
  const shortcuts = window.SHORTCUTS_CONFIG || [];

  if (shortcuts.length === 0) {
    return;
  }

  // 建立 UI
  createTooltip(shortcuts);

  // 註冊鍵盤監聽
  window.addEventListener('keydown', (event) => {
    for (const shortcut of shortcuts) {
      if (matchCondition(event, shortcut.condition)) {
        event.preventDefault();

        const actionFn = actions[shortcut.action];
        if (actionFn) {
          actionFn();
        } else {
        }
        break; // 避免一次觸發多個
      }
    }
  });
}

// 啟動
init();