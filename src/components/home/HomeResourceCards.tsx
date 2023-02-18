import styles from "@/styles/ImageCTACard.module.css";
import ImageCTACard from "@/components/core/ImageCTACard";

type ComponentProps = {
  className?: string;
};

export default function HomeResourceCards({ className }: ComponentProps) {
  return (
    <section className={`container-inner ${styles.container} ${className}`}>
      <ImageCTACard
        title="Jobs"
        href="https://superteam.fun"
        imageSrc="/img/cta/4.jpg"
        text="By Superteam"
      />
      <ImageCTACard
        title="Bounties"
        href="https://superteam.fun"
        imageSrc="/img/cta/0.jpg"
        text="By Superteam"
      />
      <ImageCTACard
        title="Grants"
        href="https://superteam.fun"
        imageSrc="/img/cta/1.jpg"
        text="By Superteam"
      />
    </section>
  );
}
