document.addEventListener('keydown', function(event) {
    // Check if the physical key pressed was the Right Bracket (]) or Forward Slash (/)
    if (event.code === 'BracketRight' || event.code === 'Slash') {

        // Decide whether we need a 'b' or an 'n'
        let charToInsert = event.code === 'BracketRight' ? 'b' : 'n';

        // Figure out if it should be capitalized (checking Shift and CapsLock)
        const isShift = event.shiftKey;
        const isCapsLock = event.getModifierState('CapsLock');
        const isUpperCase = isShift !== isCapsLock; // XOR logic: if one is on but not both

        if (isUpperCase) {
            charToInsert = charToInsert.toUpperCase();
        }

        // Stop the default ] or / from being typed
        event.preventDefault();

        // Insert the new character.
        // execCommand is used here because it perfectly mimics human typing
        // and triggers necessary events for modern websites to save your text properly.
        document.execCommand('insertText', false, charToInsert);
    }
}, true); // 'true' catches the keystroke early before the website processes it
