import { useState } from "react";
import type { FormEvent } from "react";
import {
  Bell,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Globe,
  Mail,
  Smartphone,
  AlertTriangle,
  Save,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react";

import "./AgencySettings.css";

interface NotificationSettings {
  newStudent: boolean;
  applicationUpdates: boolean;
  universityUpdates: boolean;
  emailNotifications: boolean;
  marketingEmails: boolean;
}

const AgencySettings = () => {
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Yangon");

  const [notifications, setNotifications] = useState<NotificationSettings>({
    newStudent: true,
    applicationUpdates: true,
    universityUpdates: true,
    emailNotifications: true,
    marketingEmails: false,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleSavePreferences = () => {
    setSuccessMessage("Your preferences have been saved successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handlePasswordChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New password and confirmation do not match.");
      return;
    }

    setPasswordMessage(
      "Password form validated. Connect Firebase Authentication to update your password.",
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteConfirmation = () => {
    if (deleteConfirmation !== "DELETE") {
      return;
    }

    setShowDeleteModal(false);
    setDeleteConfirmation("");

    setSuccessMessage("Demo only: account deletion is not connected yet.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <div className="agency-settings-page">
      <div className="agency-settings-heading">
        <div>
          <span className="agency-settings-eyebrow">ACCOUNT MANAGEMENT</span>
          <h2>Agency Settings</h2>
          <p>Manage your account preferences, notifications and security.</p>
        </div>
      </div>

      {successMessage && (
        <div className="agency-settings-success">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* General Preferences */}
      <section className="agency-settings-card">
        <div className="agency-settings-section-title">
          <div className="agency-settings-icon">
            <Globe size={21} />
          </div>
          <div>
            <h3>General Preferences</h3>
            <p>Customize your agency dashboard experience.</p>
          </div>
        </div>

        <div className="agency-settings-form-grid">
          <div className="agency-settings-field">
            <label htmlFor="agency-language">Dashboard Language</label>
            <select
              id="agency-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="English">English</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Korean">Korean</option>
            </select>
          </div>

          <div className="agency-settings-field">
            <label htmlFor="agency-timezone">Time Zone</label>
            <select
              id="agency-timezone"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
            >
              <option value="Asia/Yangon">Asia/Yangon (UTC+6:30)</option>
              <option value="Asia/Seoul">Asia/Seoul (UTC+9)</option>
              <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="agency-settings-card">
        <div className="agency-settings-section-title">
          <div className="agency-settings-icon">
            <Bell size={21} />
          </div>
          <div>
            <h3>Notification Settings</h3>
            <p>Choose which updates you want to receive.</p>
          </div>
        </div>

        <div className="agency-settings-options">
          <div className="agency-settings-option">
            <div className="agency-settings-option-info">
              <strong>New Student Registrations</strong>
              <span>Get notified when a new student joins your platform.</span>
            </div>
            <label className="agency-toggle">
              <input
                type="checkbox"
                checked={notifications.newStudent}
                onChange={() => handleNotificationChange("newStudent")}
              />
              <span className="agency-toggle-slider" />
            </label>
          </div>

          <div className="agency-settings-option">
            <div className="agency-settings-option-info">
              <strong>Application Updates</strong>
              <span>Receive updates when student applications change.</span>
            </div>
            <label className="agency-toggle">
              <input
                type="checkbox"
                checked={notifications.applicationUpdates}
                onChange={() => handleNotificationChange("applicationUpdates")}
              />
              <span className="agency-toggle-slider" />
            </label>
          </div>

          <div className="agency-settings-option">
            <div className="agency-settings-option-info">
              <strong>University Updates</strong>
              <span>
                Get notifications about university information changes.
              </span>
            </div>
            <label className="agency-toggle">
              <input
                type="checkbox"
                checked={notifications.universityUpdates}
                onChange={() => handleNotificationChange("universityUpdates")}
              />
              <span className="agency-toggle-slider" />
            </label>
          </div>

          <div className="agency-settings-option">
            <div className="agency-settings-option-info">
              <strong>Email Notifications</strong>
              <span>Receive important account updates by email.</span>
            </div>
            <label className="agency-toggle">
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange("emailNotifications")}
              />
              <span className="agency-toggle-slider" />
            </label>
          </div>

          <div className="agency-settings-option">
            <div className="agency-settings-option-info">
              <strong>Marketing Emails</strong>
              <span>Receive news, tips and platform announcements.</span>
            </div>
            <label className="agency-toggle">
              <input
                type="checkbox"
                checked={notifications.marketingEmails}
                onChange={() => handleNotificationChange("marketingEmails")}
              />
              <span className="agency-toggle-slider" />
            </label>
          </div>
        </div>
      </section>

      {/* Password */}
      <section className="agency-settings-card">
        <div className="agency-settings-section-title">
          <div className="agency-settings-icon">
            <Lock size={21} />
          </div>
          <div>
            <h3>Change Password</h3>
            <p>Update your password to keep your account secure.</p>
          </div>
        </div>

        <form className="agency-password-form" onSubmit={handlePasswordChange}>
          <div className="agency-settings-field">
            <label htmlFor="current-password">Current Password</label>
            <div className="agency-password-input">
              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                aria-label="Toggle current password visibility"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="agency-settings-form-grid">
            <div className="agency-settings-field">
              <label htmlFor="new-password">New Password</label>
              <div className="agency-password-input">
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label="Toggle new password visibility"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="agency-settings-field">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <div className="agency-password-input">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {passwordMessage && (
            <p className="agency-password-message">{passwordMessage}</p>
          )}

          <button type="submit" className="agency-settings-primary-btn">
            <Lock size={17} />
            Update Password
          </button>
        </form>
      </section>

      {/* Privacy and Security */}
      <section className="agency-settings-card">
        <div className="agency-settings-section-title">
          <div className="agency-settings-icon">
            <ShieldCheck size={21} />
          </div>
          <div>
            <h3>Privacy & Security</h3>
            <p>Control your agency profile visibility and security options.</p>
          </div>
        </div>

        <div className="agency-settings-options">
          <div className="agency-settings-option">
            <div className="agency-settings-option-info">
              <strong>Public Agency Profile</strong>
              <span>Allow students to view your agency profile.</span>
            </div>
            <label className="agency-toggle">
              <input
                type="checkbox"
                checked={profileVisibility}
                onChange={() => setProfileVisibility(!profileVisibility)}
              />
              <span className="agency-toggle-slider" />
            </label>
          </div>

          <div className="agency-settings-option">
            <div className="agency-settings-option-info">
              <strong>Two-Factor Authentication</strong>
              <span>Add an extra security step when signing in.</span>
            </div>
            <label className="agency-toggle">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              />
              <span className="agency-toggle-slider" />
            </label>
          </div>
        </div>

        <div className="agency-security-note">
          <ShieldCheck size={19} />
          <p>
            Security settings are currently demo controls. Authentication
            features will be connected later.
          </p>
        </div>
      </section>

      {/* Save Preferences */}
      <div className="agency-settings-save-area">
        <p>
          <Mail size={16} />
          Your settings are currently stored in this page only.
        </p>
        <button
          type="button"
          className="agency-settings-primary-btn"
          onClick={handleSavePreferences}
        >
          <Save size={17} />
          Save Preferences
        </button>
      </div>

      {/* Danger Zone */}
      <section className="agency-settings-danger-card">
        <div className="agency-settings-section-title">
          <div className="agency-settings-danger-icon">
            <AlertTriangle size={21} />
          </div>
          <div>
            <h3>Danger Zone</h3>
            <p>Actions in this section may affect your agency account.</p>
          </div>
        </div>

        <div className="agency-danger-content">
          <div>
            <strong>Delete Agency Account</strong>
            <p>
              This action is intended for permanent account deletion. It is not
              connected to Firebase yet.
            </p>
          </div>
          <button
            type="button"
            className="agency-delete-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 size={17} />
            Delete Account
          </button>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="agency-settings-modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="agency-settings-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="agency-settings-modal-close"
              onClick={() => setShowDeleteModal(false)}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="agency-delete-modal-icon">
              <AlertTriangle size={25} />
            </div>

            <h3>Delete Agency Account?</h3>
            <p>
              This is a demo confirmation. No account will actually be deleted.
              Type <strong>DELETE</strong> to continue.
            </p>

            <input
              type="text"
              value={deleteConfirmation}
              onChange={(event) => setDeleteConfirmation(event.target.value)}
              placeholder="Type DELETE"
            />

            <div className="agency-settings-modal-actions">
              <button
                type="button"
                className="agency-cancel-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation("");
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="agency-delete-btn"
                disabled={deleteConfirmation !== "DELETE"}
                onClick={handleDeleteConfirmation}
              >
                <Trash2 size={16} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencySettings;
