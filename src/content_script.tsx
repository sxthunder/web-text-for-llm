// src/content_script.ts
import { Popup } from './ui/Popup';
// import { Popup } from './index';

class ContentScript {
    private popup: Popup;

    constructor() {
        this.popup = new Popup();
        this.attachEventListeners();
    }

    private getSelectedText(): string {
        const selection = window.getSelection();
        return selection ? selection.toString() : '';
    }

    private attachEventListeners() {
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    private handleMouseUp = (event: MouseEvent) => {
        const selectedText = this.getSelectedText();
        if (selectedText) {
            this.popup.show(selectedText, event.pageX, event.pageY);
        } else {
            this.popup.hide();
        }
    }

    private handleKeyUp = (event: KeyboardEvent) => {
        const selectedText = this.getSelectedText();
        if (selectedText) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                this.popup.show(selectedText, rect.left + window.scrollX, rect.bottom + window.scrollY);
            }
        }
    }
}

new ContentScript();

console.log('Content script loaded');