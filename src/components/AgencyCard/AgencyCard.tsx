import { Link } from "react-router-dom";
import { MapPin, Building2, ArrowUpRight } from "lucide-react";

import type { Agency } from "../../data/sampleData";
import "./AgencyCard.css";

interface Props {
  agency: Agency;
}

function AgencyCard({ agency }: Props) {
  return (
    <article className="agency-card">
      <div className="agency-image">
        <img src={agency.image} alt={agency.name} />
      </div>

      <div className="agency-content">
        <h3>{agency.name}</h3>

        <span className="agency-location">
          <MapPin size={14} />
          {agency.location}
        </span>

        <p>{agency.description}</p>

        <div className="agency-bottom">
          <span>
            <Building2 size={16} />
            {agency.universities.length} Partner Universities
          </span>

          <Link
            to={`/agencies/${agency.id}`}
            className="card-link"
            aria-label={`View ${agency.name}`}
          >
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default AgencyCard;
