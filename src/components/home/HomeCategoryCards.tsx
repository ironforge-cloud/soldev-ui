import styles from '@/styles/ImageCTACard.module.css';
import ImageCTACard from '@/components/core/ImageCTACard';

type ComponentProps = {
  className?: string;
};

export default function HomeCategoryCards({ className }: ComponentProps) {
  return (
    <section className={`container-inner hide-scroll-bar ${styles.container} ${className}`}>
      <section className={`${styles.scrollContainer} hide-scroll-bar`}>
        <ImageCTACard
          title="Ironforge"
          href="https://www.ironforge.cloud?utm_source=soldev"
          imageSrc="/img/cta/newsletter.jpg"
          text="Accelerate your Solana development with Ironforge"
          isExternal={true}
        />
        <ImageCTACard
          title="Solana Development Course"
          href="/course"
          imageSrc="/img/cta/course.jpg"
          text="The best starting point for learning Web3 development"
        />
        <ImageCTACard
          title="Mike Hale Newsletter"
          href="https://mikehale.beehiiv.com"
          imageSrc="/img/cta/library.jpg"
          text="News, tools, and resources for Solana developers"
          isExternal={true}
        />
      </section>
    </section>
  );
}
