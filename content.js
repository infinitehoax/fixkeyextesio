// Function to find exactly where we are typing, even inside complex sites like Discord
function getDeepActiveElement(doc = document) {
    if (doc.activeElement && doc.activeElement.shadowRoot) {
        return getDeepActiveElement(doc.activeElement.shadowRoot);
    }
    return doc.activeElement;
}

document.addEventListener('keydown', function(event) {
    // ONLY listen for the Forward Slash key
    if (event.code === 'Slash') {

        // Allow standard computer shortcuts to keep working (Ctrl+/, etc.)
        if (event.ctrlKey || event.altKey || event.metaKey) return;

        // Decide whether we need a lowercase 'n' or uppercase 'N'
        let charToInsert = 'n';
        const isShift = event.shiftKey;
        const isCapsLock = event.getModifierState('CapsLock');

        if (isShift !== isCapsLock) {
            charToInsert = 'N';
        }

        // CRITICAL FIX FOR DISCORD:
        // preventDefault() stops the browser's normal typing.
        // stopImmediatePropagation() blinds the website's code so it NEVER
        // sees the slash key being pressed. It won't fight our script anymore.
        event.preventDefault();
        event.stopImmediatePropagation();

        const activeEl = getDeepActiveElement();
        if (!activeEl) return;

        const tagName = activeEl.tagName.toUpperCase();

        // SCENARIO 1: Standard Search Bars and Text Boxes
        if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
            const start = activeEl.selectionStart;
            const end = activeEl.selectionEnd;
            const text = activeEl.value;

            // Go directly into the browser's brain to bypass React's security
            const nativePrototype = tagName === 'INPUT' ? window.HTMLInputElement.prototype : window.HTMLTextAreaElement.prototype;
            const nativeSetter = Object.getOwnPropertyDescriptor(nativePrototype, 'value').set;

            const newText = text.slice(0, start) + charToInsert + text.slice(end);

            if (nativeSetter) {
                nativeSetter.call(activeEl, newText);
            } else {
                activeEl.value = newText;
            }

            // Fix the cursor jumping backwards
            activeEl.setSelectionRange(start + 1, start + 1);

            // Force the website to save the new letter
            activeEl.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            activeEl.setSelectionRange(start + 1, start + 1);
        }

        // SCENARIO 2: Rich Text Editors (Discord, Reddit, Gmail, ChatGPT)
        else if (activeEl.isContentEditable) {
            // Because we used stopImmediatePropagation() above, Discord is completely
            // unaware that a slash was pressed. Now we just tell the browser natively
            // to type an 'n', and Discord will accept it as if you pressed a working 'N' key.
            document.execCommand('insertText', false, charToInsert);
        }
    }
}, true); // 'true' catches the keystroke at the absolute top level before Discord gets it
