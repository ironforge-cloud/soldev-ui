import styles from '@/styles/ImageCTACard.module.css';
import ImageCTACard from '@/components/core/ImageCTACard';

type ComponentProps = {
    className?: string;
};

export default function HomeCategoryCards({className}: ComponentProps) {
    return (
        <section className={`container-inner hide-scroll-bar ${styles.container} ${className}`}>
            <section className={`${styles.scrollContainer} hide-scroll-bar`}>
                <ImageCTACard
                    title="Library"
                    href="/library"
                    imageSrc="/img/cta/library.jpg"
                    text="Checkout the latest and greatest, tutorials, articles, podcasts, and more"
                />
                <ImageCTACard
                    title="Intro to Solana"
                    href="/course"
                    imageSrc="/img/cta/course.jpg"
                    text="The absolute best starting point for Web Developers looking to learn Web3 development"
                />
                <ImageCTACard
                    title="SIMD"
                    href="/simd"
                    imageSrc="/img/cta/newsletter.jpg"
                    text="Read proposed & accepted Solana protocol changes"
                />
            </section>
        </section>
    );
}
