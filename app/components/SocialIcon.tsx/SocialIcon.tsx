import Image from "next/image";
import styles from "./style.module.scss";

export default function SocialIcon({ href, type }: { href: string, type: string }) {

    const socialIcons = {

        telegram: {
            width: 22,
            height: 18,
            icon: "/icons/telegram-icon.svg",
        },
        nax: {
            width: 20,
            height: 20,
            icon: "/icons/max-icon.svg",
        },
        email: {
            width: 23,
            height: 16,
            icon: "/icons/email-icon.svg",
        },
    }


    return (
        <div className={styles.social_icon}>
            <a href={type === "email" ? `mailto:${href}` : href} 
                target="_blank" rel="noopener noreferrer"
                className={styles.social_icon_link}
                title={type}
            >
                <Image 
                    src={socialIcons[type as keyof typeof socialIcons].icon as string}
                    alt={type} 
                    width={socialIcons[type as keyof typeof socialIcons].width} 
                    height={socialIcons[type as keyof typeof socialIcons].height} 
                />
            </a>
        </div>
    );
}