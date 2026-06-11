
import styles from './style.module.scss';
import { Form } from '@/app/components';

export default function SpamSection() {
    return (
        <div className={styles.section}>
            <div className="container">
                <div className={styles.spam_section_wrapper}>
                    <div className={styles.spam_section_content}>
                        <h2>Хотите быть в курсе всех новинок?</h2>
                        <p>Подпишитесь на нашу рассылку и получайте свежие новости и статьи о последних тенденциях в мире композитных материалов, а также эксклюзивные предложения от компании РИФ.</p>
                    </div>
                    <Form />
                </div>
            </div>
        </div>
    )
}