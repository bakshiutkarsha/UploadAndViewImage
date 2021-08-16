import sanitizeHtml from 'sanitize-html';

export function sanitizeString(str: string) {
    return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} })
        .replace(/&amp;/gi, '&')
        .replace(/&gt;/gi, '>')
        .replace(/&lt;/gi, '<')
        .replace(/&quot;/gi, '"');
}

export function validateStringWithRegex(val, checkURL, checkSpecial) {
    // https://www.aspforums.net/Threads/194095/Check-if-String-contains-URL-using-JavaScript/
    const hasUrlRegex = new RegExp(
        '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?',
    );
    // https://melvingeorge.me/blog/check-if-string-contain-emojis-javascript
    // eslint-disable-next-line no-useless-escape
    const hasSpecialCharactersRegex = /[`!@#$%^*()_+~=\[\]\\{}|"/<>?\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]]/;

    const hasURL = checkURL ? hasUrlRegex.test(val) : false;
    const hasSpecialCharacters = checkSpecial ? hasSpecialCharactersRegex.test(val) : false;

    return !hasURL && !hasSpecialCharacters;
}