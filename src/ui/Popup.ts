// src/ui/Popup.ts
export class Popup {
    private element: HTMLDivElement | null = null;

    constructor() {
        this.injectStyles();
    }

    private injectStyles() {
        const link = document.createElement('link');
        link.href = chrome.runtime.getURL('popup.css');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    show(text: string, x: number, y: number) {
        if (this.element) {
            document.body.removeChild(this.element);
        }

        this.element = document.createElement('div');
        this.element.className = 'text-selection-popup';
        this.element.innerHTML = `
            <p>${text}</p>
            <button id="process-text">处理文本</button>
        `;
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;

        document.body.appendChild(this.element);

        document.getElementById('process-text')?.addEventListener('click', () => {
            console.log('Processing text:', text);
            // TODO: 在这里添加处理文本的逻辑，比如发送到LLM API
        });
    }

    hide() {
        if (this.element && document.body.contains(this.element)) {
            document.body.removeChild(this.element);
            this.element = null;
        }
    }
}