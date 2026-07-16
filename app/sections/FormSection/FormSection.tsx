
import styles from './style.module.scss';
import { Form } from '@/app/components';

type FormSectionProps = {
    background: number;
    buttonText: string;
    title: string;
    description: string;
    textColor?: 'black' | 'white';
}

export default function FormSection({ background = 2, title, description, textColor = 'white', buttonText = 'Отправить' }: FormSectionProps) {
    return (
        <div className={styles.section}>
            <div className={styles.spam_section_wrapper}>
                <div className={`${styles.spam_section_content} ${styles[`background_${background}`]}`}>
                    <h2 className={`${styles.title} ${styles[`text_${textColor}`]}`}>{title}</h2>
                    <p className={`${styles.description} ${styles[`text_${textColor}`]}`}>{description}</p>
                </div>
                <Form buttonText={buttonText} />
            </div>
        </div>
    )
}