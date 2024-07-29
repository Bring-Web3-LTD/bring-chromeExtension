type WalletAddress = string | undefined

type IFrame = HTMLIFrameElement | null

interface Style {
    [key: string]: string
}

interface KeyFrame {
    name: string
    rules: string
}

interface BringEvent {
    data: {
        from: string
        action: string
        style?: Style[]
        keyFrames?: KeyFrame[]
        time?: number
    }
}