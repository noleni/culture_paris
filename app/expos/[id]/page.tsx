import { getEventById } from "@/lib/events";
import Image from "next/image";

interface ExpoPageProps {
  params: {id : string};
}

// {
//     "id": 71,
//     "title": "Zoom sur l'actu",
//     "info": "<p>Inflation, pouvoir d’achat, taxe carbone, marché de l'immobilier, guerre en Ukraine, l’économie est au cœur de l’actualité. Pour y voir plus clair, Citéco innove. Une médiatrice analyse un fait d’actualité et en décrypte le mécanisme économique. Une déambulation ludique et participative.</p>",
//     "url": "https://www.paris.fr/evenements/zoom-sur-l-actu-70445",
//     "lead_text": "Une visite guidée au travers d'un fait d'actualité.",
//     "description": "<p>Inflation, pouvoir d’achat, taxe carbone, marché de l'immobilier, guerre en Ukraine, l’économie est au cœur de l’actualité. Pour y voir plus clair, Citéco innove. Une médiatrice analyse un fait d’actualité et en décrypte le mécanisme économique. Une déambulation ludique et participative.</p>",
//     "date_start": "2024-10-19T17:30:00.000Z",
//     "date_end": "2024-12-21T17:30:00.000Z",
//     "date_description": "Le samedi 21 décembre 2024<br />de 16h30 à 17h30<br />Le samedi 09 novembre 2024<br />de 16h30 à 17h30<br />",
//     "cover_url": "https://cdn.paris.fr/qfapv4/2024/10/09/huge-9d58aa1e3c6f2cb0ba830b5e3c064262.jpg",
//     "cover_alt": "Zoom sur l'actu visite guidée Citéco",
//     "cover_credit": "Rémi Jaouen",
//     "audience": "Public jeunes et adultes. A partir de 14 ans.",
//     "placeId": 58,
//     "updatedAt": "2024-11-01T16:25:49.607Z",
//     "place": {
//         "id": 58,
//         "address_name": "Cité de l'Économie",
//         "address_street": "1 Pl. du Général Catroux",
//         "address_zipcode": "75017",
//         "address_city": "Paris",
//         "latitude": 48.856578,
//         "longitude": 2.351828,
//         "contact_url": "https://www.citeco.fr/agenda/zoom-sur-lactu",
//         "access_link": "https://tickets.citeco.fr/fr-FR/mes-billets-2?famille=2414353071020400002",
//         "updatedAt": "2024-11-01T16:25:49.604Z"
//     }
// }

const ExpoPage = async ({ params }: ExpoPageProps) => {
  const { id } = await params;

  const event = await getEventById(+id);
  console.log("event", event);
  return !event ? null : (
    <div className="flex">
      <div>
        {<h1>{event.title}</h1>}
        <div>
          <p>{event.lead_text}</p>
          <Image
            src={event.cover_url}
            alt={event.cover_alt}
            width={400}
            height={200}
          />
          <p>{event.info}</p>
        </div>
      </div>
      <aside>
        <h5>Catégories</h5>
        <ul>
          {event?.tags && event.tags.map((tag) => (
            <li key={tag.id} className="tag">{tag.name}</li>
          ))}
        </ul>
        <h5>Informations pratiques</h5>
        <p>Adresse : {event.place.address_name}</p>
        <p>
          Date : {new Date(event.date_start).toLocaleDateString()} -{" "}
          {new Date(event.date_end).toLocaleDateString()}
        </p>
        <p>Public : {event.audience}</p>
        <button type="button" className="cta">
          Lien vers l&apos;événement
        </button>
      </aside>
    </div>
  );
};

export default ExpoPage;
