import styles from './styles.module.css'
import { sendMessage, ACTIONS } from '../../utils/sendMessage'
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics'
import { QUIET_TIME } from '../../config'

interface Props {
    callback?: () => void
}

const CloseBtn = ({ callback }: Props) => {
    const { sendGaEvent } = useGoogleAnalytics()

    const close = async () => {
        await sendGaEvent('popup_close', {
            category: 'user_action',
            action: 'click',
            details: 'extension'
        })
        sendMessage({ action: ACTIONS.CLOSE, time: Date.now() + QUIET_TIME })
    }

    return (
        <button
            onClick={() => {
                close()
                callback && callback()
            }}
            className={styles.btn}
        >
            <div
                className={styles.icon}
            />
        </button>
    )
}

export default CloseBtn