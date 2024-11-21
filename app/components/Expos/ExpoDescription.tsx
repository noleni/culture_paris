"use client";
import * as DOMPurify from "dompurify";
// import Slider from "react-slick";
import Image from "next/image";
import ExpoLocalisation from "./ExpoLocalisation";
import Rater from "../UI/Rater";
import styles from "./carrousel.module.scss";
import { IoMdHeartEmpty } from "react-icons/io";

interface ExpoProps {
  content: {
    id: string;
    title: string;
    lead_text: string;
    cover_url: string;
    cover_alt: string;
    cover_credits: string;
    tags: { id: number; name: string }[];
    place: { address_name: string; latitude: number; longitude: number };
    date_start: string;
    date_end: string;
  };
  extractedDescription: string[];
  figures: string[];
}

const ExpoDescription = ({
  content,
  extractedDescription,
  figures,
}: ExpoProps) => {
  console.log("content", content);

  // function ContentWithCarousel({ content }: ExpoProps) {
  //   const { figures, extractedDescription } = extractFiguresAndText(
  //     content.description
  //   );

  //   const sliderSettings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     adaptiveHeight: true,
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //           infinite: true,
  //           dots: true,
  //         },
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 480,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //     ],
  //   };

  //   return (
  //     <div className={styles.content}>
  //       <div className={styles.cover}>
  //         {content.cover_url && (
  //           <Image
  //             src={content.cover_url}
  //             alt={content.cover_alt}
  //             fill
  //             priority
  //           />
  //         )}
  //         <div className={styles.title}>
  //           <h2>{content.title}</h2>
  //         </div>
  //       </div>
  //       <div className={styles["text-section"]}>
  //         <Rater rating={3} setRating={() => {}} />
  //         <div className={styles.actions}>
  //           <button type="button" className="cta">
  //             <IoMdHeartEmpty />
  //             Ajouter aux favoris
  //           </button>
  //           <button type="button" className="cta">
  //             <IoMdHeartEmpty />
  //             Envie d&apos;y aller
  //           </button>
  //         </div>
  //         <div>
  //           {/* <ExpoAside event={content} /> */}
  //           <div className={styles.texts}>
  //             <div className="flex">
  //               <h3>{content.lead_text}</h3>
  //               <EventMap
  //                 latitude={content.place.latitude}
  //                 longitude={content.place.longitude}
  //               />
  //             </div>
  //             {extractedDescription.map((section, index) => (
  //               <p
  //                 key={index}
  //                 dangerouslySetInnerHTML={{
  //                   __html: DOMPurify.sanitize(section),
  //                 }}
  //               />
  //             ))}
  //           </div>
  //         </div>
  //       </div>

  //       {figures.length > 0 && (
  //         <Slider {...sliderSettings}>
  //           {figures.map((figure, index) => (
  //             <div
  //               key={index}
  //               className="figure-slide"
  //               dangerouslySetInnerHTML={{
  //                 __html: DOMPurify.sanitize(figure),
  //               }}
  //             />
  //           ))}
  //         </Slider>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className={styles.content}>
      <div className={styles.cover}>
        {content.cover_url && (
          <Image
            src={content.cover_url}
            alt={content.cover_alt}
            fill
            priority
          />
        )}
        <div className={styles.title}>
          <h2>{content.title}</h2>
          <Rater rating={0} setRating={() => {}} />
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
      </div>
      <div className={styles["text-section"]}>
        <div>
          {/* <ExpoAside event={content} /> */}
          <div className={styles.texts}>
            <h3>{content.lead_text}</h3>
            <ExpoLocalisation event={content} />
            {extractedDescription.map((section, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(section),
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* {figures.length > 0 && (
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
        )} */}
    </div>
  );
};

export default ExpoDescription;
