import Slider from "react-slick";
import Image from "next/image";

import styles from "./slider.module.scss";


interface SlickSliderProps {
  figures: {
    imgUrl: string;
    figcaption: string;
  }[];
}

const SlickSlider: React.FC<SlickSliderProps> = ({ figures }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.slider_wrapper}>
      <div className={styles.slider_container}>
        <Slider {...settings}>
          {figures.map((figure, index) => (
            <div key={index} className={styles.slider_item}>
              <div className={styles.image_wrapper}>
                <Image src={figure.imgUrl} alt={figure.figcaption} fill sizes="300px" />
              </div>
              <figcaption>{figure.figcaption}</figcaption>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlickSlider;
