import styles from "@/styles/ImageCTACard.module.css";
import ImageCTACard from "./core/ImageCTACard";

type ComponentProps = {
  className?: string;
};

export default function HomeCategoryCards({ className }: ComponentProps) {
  return (
    <section className={`container-inner ${styles.container} ${className}`}>
      <ImageCTACard
        title="Library"
        href="/library"
        imageSrc="/img/cta/0.jpg"
        text="Checkout the latest and greatest, tutorials, articles, podcasts, and more"
      />
      <ImageCTACard
        title="Intro to Solana"
        href="/course"
        imageSrc="/img/cta/5.jpg"
        text="The absolute best starting point for Web Developers looking to learn Web3 development"
      />
      <ImageCTACard
        title="Newsletter"
        href="/newsletter"
        imageSrc="/img/cta/4.jpg"
        text="The latest news and updates from the Solana Foundation"
      />
    </section>
  );
}
