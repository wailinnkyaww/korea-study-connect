import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Upload,
  Pencil,
  Save,
  X,
  BriefcaseBusiness,
  GraduationCap,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import "./AgencyProfile.css";

interface AgencyProfileData {
  agencyName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  country: string;
  registrationNumber: string;
  establishedYear: string;
  description: string;
  services: string;
  specialization: string;
}

const initialProfile: AgencyProfileData = {
  agencyName: "Korea Education Agency",
  email: "info@koreaeducation.com",
  phone: "+95 9 123456789",
  website: "https://www.koreaeducation.com",
  address: "No. 25, Pyay Road",
  city: "Yangon",
  country: "Myanmar",
  registrationNumber: "AG-2026-001",
  establishedYear: "2020",
  description:
    "We help students find suitable universities and educational opportunities in South Korea. Our team provides university guidance and application support.",
  services:
    "University Admission, Application Support, Document Preparation, Student Counseling",
  specialization: "South Korea University Admissions",
};

const AgencyProfile = () => {
  const [profile, setProfile] = useState<AgencyProfileData>(initialProfile);
  const [formData, setFormData] = useState<AgencyProfileData>(initialProfile);
  const [savedLogo, setSavedLogo] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setLogo(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
    setSavedMessage(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setLogo(savedLogo);
    setIsEditing(false);
    setSavedMessage(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProfile(formData);
    setIsEditing(false);
    setSavedMessage(true);
    setSavedLogo(logo);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayLogo = logo;

  return (
    <div className="agency-profile-page">
      {/* Heading */}
      <div className="agency-profile-heading">
        <div>
          <span className="agency-profile-eyebrow">AGENCY MANAGEMENT</span>
          <h2>My Profile</h2>
          <p>Manage your agency information and business details.</p>
        </div>

        {!isEditing && (
          <button className="agency-profile-edit-btn" onClick={handleEdit}>
            <Pencil size={17} />
            Edit Profile
          </button>
        )}
      </div>

      {savedMessage && (
        <div className="agency-profile-success">
          <CheckCircle2 size={19} />
          Profile changes saved in this session.
          <button
            onClick={() => setSavedMessage(false)}
            aria-label="Dismiss message"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Agency Overview */}
        <div className="agency-profile-overview-card">
          <div className="agency-profile-cover" />

          <div className="agency-profile-overview-content">
            <div className="agency-profile-logo-area">
              <div className="agency-profile-logo">
                {displayLogo ? (
                  <img src={displayLogo} alt="Agency logo" />
                ) : (
                  <Building2 size={35} />
                )}
              </div>

              {isEditing && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleLogoChange}
                  />
                  <button
                    type="button"
                    className="agency-profile-upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={15} />
                    Change Logo
                  </button>
                </>
              )}
            </div>

            <div className="agency-profile-overview-info">
              <div>
                <h3>{profile.agencyName}</h3>
                <p>
                  <MapPin size={15} />
                  {profile.city}, {profile.country}
                </p>
              </div>

              <span className="agency-profile-verified">
                <CheckCircle2 size={15} />
                Agency Account
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="agency-profile-section">
          <div className="agency-profile-section-heading">
            <div className="agency-profile-section-icon">
              <Building2 size={20} />
            </div>
            <div>
              <h3>Basic Information</h3>
              <p>Your agency's main business information.</p>
            </div>
          </div>

          <div className="agency-profile-form-grid">
            <label>
              Agency Name
              <input
                name="agencyName"
                value={formData.agencyName}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </label>

            <label>
              Registration Number
              <input
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              Established Year
              <input
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>

            <label>
              Specialization
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>
          </div>
        </div>

        {/* Contact Information */}
        <div className="agency-profile-section">
          <div className="agency-profile-section-heading">
            <div className="agency-profile-section-icon">
              <Phone size={20} />
            </div>
            <div>
              <h3>Contact Information</h3>
              <p>How students and universities can contact your agency.</p>
            </div>
          </div>

          <div className="agency-profile-form-grid">
            <label>
              Email Address
              <span className="agency-profile-input-icon">
                <Mail size={17} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </span>
            </label>

            <label>
              Phone Number
              <span className="agency-profile-input-icon">
                <Phone size={17} />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </span>
            </label>

            <label>
              Website
              <span className="agency-profile-input-icon">
                <Globe size={17} />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </span>
            </label>

            <label>
              Country
              <input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </label>

            <label>
              City
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </label>

            <label>
              Street Address
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </label>
          </div>
        </div>

        {/* Business Description */}
        <div className="agency-profile-section">
          <div className="agency-profile-section-heading">
            <div className="agency-profile-section-icon">
              <BriefcaseBusiness size={20} />
            </div>
            <div>
              <h3>Business Information</h3>
              <p>Tell students more about your agency.</p>
            </div>
          </div>

          <div className="agency-profile-textarea-group">
            <label>
              Agency Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={5}
                placeholder="Describe your agency..."
              />
            </label>

            <label>
              Services Offered
              <textarea
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                placeholder="List your agency services..."
              />
            </label>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="agency-profile-summary">
          <div>
            <GraduationCap size={21} />
            <div>
              <strong>Education Consultant</strong>
              <span>Agency specialization</span>
            </div>
          </div>

          <div>
            <CalendarDays size={21} />
            <div>
              <strong>{profile.establishedYear}</strong>
              <span>Established year</span>
            </div>
          </div>

          <div>
            <Building2 size={21} />
            <div>
              <strong>{profile.country}</strong>
              <span>Operating country</span>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        {isEditing && (
          <div className="agency-profile-form-actions">
            <button
              type="button"
              className="agency-profile-cancel-btn"
              onClick={handleCancel}
            >
              <X size={17} />
              Cancel
            </button>

            <button type="submit" className="agency-profile-save-btn">
              <Save size={17} />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AgencyProfile;
