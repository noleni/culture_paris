"use client";
import * as DOMPurify from "dompurify";
import Slider from "react-slick";
import Image from "next/image";
import styles from "../../styles/carrousel.module.scss";
import { IoMdHeartEmpty } from "react-icons/io";

interface ExpoProps {
  content: {
    id: number;
    title: string;
    lead_text: string;
    description: string;
    cover_url: string;
    cover_alt: string;
    cover_credit: string;
    tags: { id: number; name: string }[];
    place: { address_name: string };
    date_start: Date;
    date_end: Date;
    audience: string;
  };
}

const ExpoDescription = ({ content }: ExpoProps) => {
  function extractFiguresAndText(htmlContent: string) {
    const figureRegex = /<figure[^>]*>[\s\S]*?<\/figure>/gi;
    const textRegex = /<p[^>]*>[\s\S]*?<\/p>/gi;

    const figures = htmlContent.match(figureRegex) || [];
    const textSections = htmlContent.match(textRegex) || [];

    return { figures, textSections };
  }

  function ContentWithCarousel({ content }: ExpoProps) {
    const { figures, textSections } = extractFiguresAndText(
      content.description
    );

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className={styles.content}>
        <div className={styles["text-section"]}>
          <div className={styles.cover}>
            <Image
              src={content.cover_url}
              alt={content.cover_alt || "Cover image"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className={styles.title}>
              <h2>{content.title}</h2>
            </div>
            <div className={styles.actions}>
              <button type="button" className="cta">
                <IoMdHeartEmpty />
                Ajouter aux favoris
              </button>
              <button type="button" className="cta">
                <IoMdHeartEmpty />
                Envie d&apos;y aller
              </button>
            </div>
          </div>
          <div className={styles.texts}>
            <h4>{content.lead_text}</h4>
            {textSections.map((section, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(section),
                }}
              />
            ))}
          </div>
        </div>

        {figures.length > 0 && (
          <Slider {...sliderSettings}>
            {figures.map((figure, index) => (
              <div
                key={index}
                className="figure-slide"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(figure),
                }}
              />
            ))}
          </Slider>
        )}
      </div>
    );
  }

  return <ContentWithCarousel content={content} />;
};

export default ExpoDescription;
