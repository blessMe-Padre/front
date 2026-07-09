
import styles from './style.module.scss';
import { Form } from '@/app/components';

type FormSectionProps = {
    background: number;
    title: string;
    description: string;
}

export default function FormSection({ background = 1, title, description }: FormSectionProps) {
    return (
        <div className={styles.section}>
            <div className={styles.spam_section_wrapper}>
                <div className={`${styles.spam_section_content} ${styles[`background_${background}`]}`}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                </div>
                <Form />
            </div>
        </div>
    )
}