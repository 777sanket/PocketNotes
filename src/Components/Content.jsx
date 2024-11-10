import notecontentImg from '../assets/notesfront.png'
import lockImg from '../assets/lock.png'

import styles from './Content.module.css'

function Content() {
  return (
    <div className={styles.ncontent}>
      <div className={styles.contentPosition}>
        <div className={styles.topPart}>
          <img src={notecontentImg} alt="" />
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online. <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>
        <div className={styles.bottomPart}>
          <img src={lockImg} alt="" /> end-to-end encrypted
        </div>
      </div>
    </div>
  )
}

export default Content