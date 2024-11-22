import EventLocalisation from "./EventLocalisation";

import styles from "./eventContent.module.scss";

interface EventContentProps {
  tags: { id: number; name: string }[];
  place: {
    address_name: string;
    address_street: string;
    address_zipcode: string;
    latitude: number;
    longitude: number;
  };
  date_start: string;
  date_end: string;
  audience: string;
  contact_url: string;
  contact_mail: string;
  contact_facebook: string;
  contact_twitter: string;
  price_type: string;
  price_detail: string;
  access_type: string;
  access_link: string;
  access_link_text: string;
  lead_text: string;
  extractedDescription: string[];
}

const EventContent: React.FC<EventContentProps> = (props) => {
  return (
    <div className={styles["event-content"]}>
      <EventLocalisation
        place={props.place}
        date_start={props.date_start}
        date_end={props.date_end}
        audience={props.audience}
        contact_url={props.contact_url}
        contact_mail={props.contact_mail}
        contact_facebook={props.contact_facebook}
        contact_twitter={props.contact_twitter}
        price_type={props.price_type}
        price_detail={props.price_detail}
        access_type={props.access_type}
        access_link={props.access_link}
        access_link_text={props.access_link_text}
      />
      <div className={styles["event-content__texts"]}>
        <ul>
          {props.tags?.map((tag) => (
            <li key={tag.id} className="tag">
              {tag.name}
            </li>
          ))}
        </ul>
        <p>{props.lead_text}</p>

        <h5>Description</h5>
        {props.extractedDescription.map((section, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{
              __html: section,
            }}
          />
        ))}
        <h5>Critiques</h5>
      </div>
    </div>
  );
};

export default EventContent;
