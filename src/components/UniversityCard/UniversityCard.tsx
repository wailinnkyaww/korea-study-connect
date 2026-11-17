import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { University } from "../../data/sampleData";
import "./UniversityCard.css";

interface Props {
  university: University;
}

function UniversityCard({ university }: Props) {
  return (
    <article className="university-card">
      <div className="university-image">
        <img src={university.image} alt={university.name} />

        <div className="program-badges">
          {university.programs.map((program) => (
            <span
              key={program}
              className={`program-badge ${program.toLowerCase()}`}
            >
              {program}
            </span>
          ))}
        </div>
      </div>

      <div className="university-content">
        <span className="university-location">
          <MapPin size={15} />
          {university.location}
        </span>

        <h3>{university.name}</h3>
        <p>{university.description}</p>

        <div className="university-footer">
          <span>{university.tuition}</span>

          <Link
            to={`/universities/${university.id}`}
            className="card-link"
            aria-label={`View ${university.name}`}
          >
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default UniversityCard;
