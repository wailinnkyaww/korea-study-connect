import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { uploadProfileImage } from "../../services/cloudinaryService";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../../services/profileService";
import type { ChangeEvent, FormEvent } from "react";
import {
  User,
  Mail,
  GraduationCap,
  Camera,
  Save,
  X,
  Edit3,
  Globe,
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
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  address: "",
  currentEducation: "",
  preferredDegree: "",
  preferredMajor: "",
  preferredCountry: "",
  preferredLanguage: "",
  bio: "",
};

const StudentProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<StudentProfileData>(initialProfile);
  const [formData, setFormData] = useState<StudentProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser?.uid) return;

      try {
        setIsLoading(true);

        const data = await getStudentProfile(currentUser.uid);

        if (!data) {
          throw new Error("Student profile not found.");
        }

        const loadedProfile: StudentProfileData = {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          nationality: data.nationality,
          address: data.address,
          currentEducation: data.currentEducation,
          preferredDegree: data.preferredDegree,
          preferredMajor: data.preferredMajor,
          preferredCountry: data.preferredCountry,
          preferredLanguage: data.preferredLanguage,
          bio: data.bio,
        };

        setProfile(loadedProfile);
        setFormData(loadedProfile);
        setProfileImage(data.profileImage || "");
      } catch (error) {
        console.error("Failed to load student profile:", error);
        setSaveMessage(
          error instanceof Error
            ? error.message
            : "Unable to load your profile.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [currentUser?.uid]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setSaveMessage("Only JPG, PNG, and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedImageFile(file);

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
    setSelectedImageFile(null);
    setIsEditing(true);
    setSaveMessage("");
  };

  const handleCancel = () => {
    setFormData(profile);
    setImagePreview("");
    setSelectedImageFile(null);
    setIsEditing(false);
    setSaveMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser?.uid) {
      setSaveMessage("Please log in again.");
      return;
    }

    try {
      setIsSaving(true);
      setSaveMessage("");

      let uploadedImageUrl = profileImage;

      if (selectedImageFile) {
        uploadedImageUrl = await uploadProfileImage(
          selectedImageFile,
          "students",
        );
      }

      await updateStudentProfile(currentUser.uid, {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality.trim(),
        address: formData.address.trim(),
        currentEducation: formData.currentEducation,
        preferredDegree: formData.preferredDegree,
        preferredMajor: formData.preferredMajor.trim(),
        preferredCountry: formData.preferredCountry.trim(),
        preferredLanguage: formData.preferredLanguage,
        bio: formData.bio.trim(),
        profileImage: uploadedImageUrl,
      });

      setProfile(formData);
      setProfileImage(uploadedImageUrl);
      setImagePreview("");
      setSelectedImageFile(null);
      setIsEditing(false);
      setSaveMessage("Your profile has been updated successfully.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to save student profile:", error);

      setSaveMessage(
        error instanceof Error
          ? error.message
          : "Failed to save your profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
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

  if (isLoading) {
    return <div className="dashboard-loading">Loading student profile...</div>;
  }

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

            <button
              type="submit"
              className="profile-save-button"
              disabled={isSaving}
            >
              <Save size={17} />
              {isSaving ? "Saving..." : "Save Changes"}
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
