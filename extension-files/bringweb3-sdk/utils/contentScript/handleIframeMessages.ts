import applyStyles from "./applyStyles"
import addKeyframes from "./addKeyFrames"

interface Props {
    event: BringEvent
    iframeEl: IFrame
    promptLogin: () => Promise<void>
}

const ACTIONS = {
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    ACTIVATE: 'ACTIVATE',
    PROMPT_LOGIN: 'PROMPT_LOGIN',
    OPT_OUT: 'OPT_OUT',
    ADD_KEYFRAMES: 'ADD_KEYFRAMES',
    ERASE_NOTIFICATION: 'ERASE_NOTIFICATION'
}

const UNION_ACTIONS = [ACTIONS.ACTIVATE]

const handleIframeMessages = ({ event, iframeEl, promptLogin }: Props) => {
    const { data } = event
    const { from, action, style, keyFrames, time, extensionId, url } = data

    if (from !== 'bringweb3') return

    // If the event comes from another extension that installed our package, ignore it (unless it ACTIVATE action)
    if (extensionId !== chrome.runtime.id && !UNION_ACTIONS.includes(action)) return

    switch (action) {
        case ACTIONS.OPEN:
            applyStyles(iframeEl, style)
            break;
        case ACTIONS.CLOSE:
            if (iframeEl) iframeEl.parentNode?.removeChild(iframeEl)
            if (time) chrome.runtime.sendMessage({ action, time, from: "bringweb3" })
            break;
        case ACTIONS.PROMPT_LOGIN:
            promptLogin()
            break;
        case ACTIONS.ACTIVATE:
            chrome.runtime.sendMessage({ action, from: "bringweb3", url, extensionId })
            break;
        case ACTIONS.OPT_OUT:
            chrome.runtime.sendMessage({ action, time, from: "bringweb3" })
            break;
        case ACTIONS.ERASE_NOTIFICATION:
            chrome.runtime.sendMessage({ action, from: "bringweb3" })
        case ACTIONS.ADD_KEYFRAMES:
            addKeyframes(keyFrames)
            break;
        default:
            // console.log('Non exist ACTION:', action);
            break;
    }
}

export default handleIframeMessages;