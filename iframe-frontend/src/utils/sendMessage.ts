export const sendMessage = (message: Message) => {
    const searchParams = new URLSearchParams(window.location.search);
    const extensionId = searchParams.get('extensionId');
    window.parent.postMessage({ from: 'bringweb3', ...message, extensionId }, '*')
}

export enum ACTIONS {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
    ACTIVATE = 'ACTIVATE',
    PROMPT_LOGIN = 'PROMPT_LOGIN',
    OPT_OUT = 'OPT_OUT',
    ADD_KEYFRAMES = 'ADD_KEYFRAMES'
}
