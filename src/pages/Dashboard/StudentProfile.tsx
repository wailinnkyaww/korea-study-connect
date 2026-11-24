import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  Camera,
  Save,
  X,
  Edit3,
  Globe,
  CalendarDays,
} from "lucide-react";

import "./StudentProfile.css";

interface StudentProfileData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  address: string;
  currentEducation: string;
  preferredDegree: string;
  preferredMajor: string;
  preferredCountry: string;
  preferredLanguage: string;
  bio: string;
}

const initialProfile: StudentProfileData = {
  fullName: "Wai Lin Kyaw",
  email: "wailin@example.com",
  phone: "+95 9 123 456 789",
  dateOfBirth: "2002-05-15",
  gender: "Male",
  nationality: "Myanmar",
  address: "Yangon, Myanmar",
  currentEducation: "Bachelor's Degree",
  preferredDegree: "Master's Degree",
  preferredMajor: "Computer Science / IT",
  preferredCountry: "South Korea",
  preferredLanguage: "Korean",
  bio: "I am interested in pursuing a Master's degree in Computer Science in South Korea. My goal is to improve my technical knowledge and gain international academic experience.",
};

const StudentProfile = () => {
  const [profile, setProfile] = useState<StudentProfileData>(initialProfile);
  const [formData, setFormData] = useState<StudentProfileData>(initialProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    event:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSaveMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage("Image size must be less than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
        setSaveMessage("");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleEdit = () => {
    setFormData(profile);
    setImagePreview("");
    setIsEditing(true);
    setSaveMessage("");
  };

  const handleCancel = () => {
    setFormData(profile);
    setImagePreview("");
    setIsEditing(false);
    setSaveMessage("");
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProfile(formData);

    if (imagePreview) {
      setProfileImage(imagePreview);
    }

    setImagePreview("");
    setIsEditing(false);
    setSaveMessage("Your profile has been updated successfully.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const displayedImage = imagePreview || profileImage;

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="student-profile-page">
      {/* Page Heading */}
      <div className="student-profile-heading">
        <div>
          <span className="dashboard-eyebrow">STUDENT PORTAL</span>
          <h2>My Profile</h2>
          <p>Manage your personal information and study preferences.</p>
        </div>

        {!isEditing && (
          <button className="profile-edit-button" onClick={handleEdit}>
            <Edit3 size={17} />
            Edit Profile
          </button>
        )}
      </div>

      {saveMessage && (
        <div
          className={`profile-message ${
            saveMessage.includes("successfully") ? "success" : "error"
          }`}
        >
          {saveMessage}
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Profile Overview */}
        <section className="profile-overview-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              {displayedImage ? (
                <img
                  src={displayedImage}
                  alt="Student profile"
                  className="student-profile-avatar"
                />
              ) : (
                <div className="student-profile-avatar profile-avatar-initials">
                  {getInitials(profile.fullName)}
                </div>
              )}

              {isEditing && (
                <>
                  <button
                    type="button"
                    className="profile-camera-button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload profile picture"
                  >
                    <Camera size={17} />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </>
              )}
            </div>

            <div className="profile-overview-info">
              <h3>{isEditing ? formData.fullName : profile.fullName}</h3>
              <span>Student Account</span>
              <p>
                <Mail size={14} />
                {profile.email}
              </p>

              {isEditing && (
                <small>Choose a profile image (maximum 5 MB).</small>
              )}
            </div>
          </div>

          <div className="profile-overview-status">
            <span className="profile-status-dot" />
            Active Student
          </div>
        </section>

        {/* Personal Information */}
        <section className="profile-form-section">
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              <User size={20} />
            </div>
            <div>
              <h3>Personal Information</h3>
              <p>Your basic personal details.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
              />
              <small>Email is managed by your account settings.</small>
            </div>

            <div className="profile-form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="profile-form-group">
              <label htmlFor="nationality">Nationality</label>
              <input
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-form-group profile-full-width">
              <label htmlFor="address">Current Address</label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </section>

        {/* Academic Information */}
        <section className="profile-form-section">
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              <GraduationCap size={21} />
            </div>
            <div>
              <h3>Academic Information</h3>
              <p>Your education background and study preferences.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-form-group">
              <label htmlFor="currentEducation">Current Education Level</label>
              <select
                id="currentEducation"
                name="currentEducation"
                value={formData.currentEducation}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Education</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="profile-form-group">
              <label htmlFor="preferredDegree">Preferred Degree</label>
              <select
                id="preferredDegree"
                name="preferredDegree"
                value={formData.preferredDegree}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="profile-form-group">
              <label htmlFor="preferredMajor">Preferred Major</label>
              <input
                id="preferredMajor"
                name="preferredMajor"
                value={formData.preferredMajor}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="e.g. Computer Science"
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="preferredCountry">Preferred Study Country</label>
              <input
                id="preferredCountry"
                name="preferredCountry"
                value={formData.preferredCountry}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="preferredLanguage">
                Preferred Study Language
              </label>
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Language</option>
                <option value="Korean">Korean</option>
                <option value="English">English</option>
                <option value="Both Korean and English">
                  Both Korean and English
                </option>
              </select>
            </div>

            <div className="profile-form-group profile-full-width">
              <label htmlFor="bio">About Me</label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Tell us about yourself and your study goals..."
              />
            </div>
          </div>
        </section>

        {/* Form Actions */}
        {isEditing && (
          <div className="profile-form-actions">
            <button
              type="button"
              className="profile-cancel-button"
              onClick={handleCancel}
            >
              <X size={17} />
              Cancel
            </button>

            <button type="submit" className="profile-save-button">
              <Save size={17} />
              Save Changes
            </button>
          </div>
        )}
      </form>

      {/* Profile Information Footer */}
      {!isEditing && (
        <div className="profile-help-note">
          <Globe size={18} />
          <p>
            Keep your profile and academic preferences up to date so you can
            manage your study applications more easily.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
