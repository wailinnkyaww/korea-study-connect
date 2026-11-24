import { useState } from "react";
import type { FormEvent } from "react";
import {
  Settings,
  Bell,
  Lock,
  Globe,
  ShieldCheck,
  Mail,
  FileText,
  Eye,
  EyeOff,
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  X,
  GraduationCap,
} from "lucide-react";

import "./StudentSettings.css";

interface NotificationSettings {
  emailNotifications: boolean;
  applicationUpdates: boolean;
  universityUpdates: boolean;
  promotionalEmails: boolean;
}

const StudentSettings = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    applicationUpdates: true,
    universityUpdates: true,
    promotionalEmails: false,
  });

  const [language, setLanguage] = useState("English");
  const [profileVisibility, setProfileVisibility] = useState("private");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const updateNotification = (
    key: keyof NotificationSettings,
    value: boolean,
  ) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleSavePreferences = () => {
    // TODO: Save notification and privacy settings to Firestore.
    showMessage("Your preferences have been saved.");
  };

  const handlePasswordChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage("Please complete all password fields.", "error");
      return;
    }

    if (newPassword.length < 8) {
      showMessage("New password must contain at least 8 characters.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage("New passwords do not match.", "error");
      return;
    }

    // TODO: Change password using Firebase Authentication.
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    showMessage(
      "Password form validated. Firebase integration is still required.",
    );
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") return;

    // TODO: Delete account after Firebase reauthentication and confirmation.
    setDeleteModalOpen(false);
    setDeleteConfirmation("");

    showMessage(
      "Deletion is not connected yet. Your account has not been deleted.",
      "error",
    );
  };

  return (
    <div className="student-settings-page">
      {" "}
      {/* Heading */}
      <div className="student-settings-heading">
        {" "}
        <div>
          {" "}
          <span className="dashboard-eyebrow">STUDENT PORTAL</span>{" "}
          <h2>Settings</h2>{" "}
          <p>Manage your account, notifications, and preferences.</p>{" "}
        </div>{" "}
      </div>{" "}
      {message && (
        <div
          className={`settings-message $ {
            messageType
          }

          `}
        >
          {" "}
          {messageType === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}
          <span> {message}</span>{" "}
          <button onClick={() => setMessage("")} aria-label="Dismiss message">
            {" "}
            <X size={17} />{" "}
          </button>{" "}
        </div>
      )}
      {/* General Preferences */}
      <section className="settings-section">
        {" "}
        <div className="settings-section-heading">
          {" "}
          <div className="settings-section-icon">
            {" "}
            <Settings size={20} />{" "}
          </div>{" "}
          <div>
            {" "}
            <h3>General Preferences</h3>{" "}
            <p>Customize your dashboard experience.</p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="settings-option">
          {" "}
          <div className="settings-option-info">
            {" "}
            <div className="settings-option-icon">
              {" "}
              <Globe size={19} />{" "}
            </div>{" "}
            <div>
              {" "}
              <h4>Dashboard Language</h4>{" "}
              <p>Select your preferred dashboard language.</p>{" "}
            </div>{" "}
          </div>{" "}
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="settings-select"
          >
            {" "}
            <option value="English">English</option>{" "}
            <option value="Myanmar">Myanmar</option>{" "}
            <option value="Korean">Korean</option>{" "}
          </select>{" "}
        </div>{" "}
        <div className="settings-option">
          {" "}
          <div className="settings-option-info">
            {" "}
            <div className="settings-option-icon">
              {" "}
              <Eye size={19} />{" "}
            </div>{" "}
            <div>
              {" "}
              <h4>Profile Visibility</h4>{" "}
              <p>Choose who can see your student profile.</p>{" "}
            </div>{" "}
          </div>{" "}
          <select
            value={profileVisibility}
            onChange={(event) => setProfileVisibility(event.target.value)}
            className="settings-select"
          >
            {" "}
            <option value="private">Private</option>{" "}
            <option value="agencies">Registered Agencies</option>{" "}
            <option value="public">Public</option>{" "}
          </select>{" "}
        </div>{" "}
      </section>{" "}
      {/* Notification Settings */}
      <section className="settings-section">
        {" "}
        <div className="settings-section-heading">
          {" "}
          <div className="settings-section-icon">
            {" "}
            <Bell size={20} />{" "}
          </div>{" "}
          <div>
            {" "}
            <h3>Notification Preferences</h3>{" "}
            <p>Choose which notifications you want to receive.</p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="settings-notification-list">
          {" "}
          <div className="settings-notification-item">
            {" "}
            <div className="settings-option-info">
              {" "}
              <div className="settings-option-icon">
                {" "}
                <Mail size={19} />{" "}
              </div>{" "}
              <div>
                {" "}
                <h4>Email Notifications</h4>{" "}
                <p>Receive notifications through your email.</p>{" "}
              </div>{" "}
            </div>{" "}
            <label className="settings-switch">
              {" "}
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={(event) =>
                  updateNotification("emailNotifications", event.target.checked)
                }
              />{" "}
              <span className="settings-switch-slider" />{" "}
            </label>{" "}
          </div>{" "}
          <div className="settings-notification-item">
            {" "}
            <div className="settings-option-info">
              {" "}
              <div className="settings-option-icon">
                {" "}
                <FileText size={19} />{" "}
              </div>{" "}
              <div>
                {" "}
                <h4>Application Status Updates</h4>{" "}
                <p>Get notified when your application status changes.</p>{" "}
              </div>{" "}
            </div>{" "}
            <label className="settings-switch">
              {" "}
              <input
                type="checkbox"
                checked={notifications.applicationUpdates}
                onChange={(event) =>
                  updateNotification("applicationUpdates", event.target.checked)
                }
              />{" "}
              <span className="settings-switch-slider" />{" "}
            </label>{" "}
          </div>{" "}
          <div className="settings-notification-item">
            {" "}
            <div className="settings-option-info">
              {" "}
              <div className="settings-option-icon">
                {" "}
                <GraduationCapIcon />{" "}
              </div>{" "}
              <div>
                {" "}
                <h4>University Updates</h4>{" "}
                <p>
                  Receive news about universities and admission periods.
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <label className="settings-switch">
              {" "}
              <input
                type="checkbox"
                checked={notifications.universityUpdates}
                onChange={(event) =>
                  updateNotification("universityUpdates", event.target.checked)
                }
              />{" "}
              <span className="settings-switch-slider" />{" "}
            </label>{" "}
          </div>{" "}
          <div className="settings-notification-item">
            {" "}
            <div className="settings-option-info">
              {" "}
              <div className="settings-option-icon">
                {" "}
                <Mail size={19} />{" "}
              </div>{" "}
              <div>
                {" "}
                <h4>Promotional Emails</h4>{" "}
                <p>Receive offers, announcements, and platform news.</p>{" "}
              </div>{" "}
            </div>{" "}
            <label className="settings-switch">
              {" "}
              <input
                type="checkbox"
                checked={notifications.promotionalEmails}
                onChange={(event) =>
                  updateNotification("promotionalEmails", event.target.checked)
                }
              />{" "}
              <span className="settings-switch-slider" />{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
        <div className="settings-note">
          {" "}
          Disabling email notifications does not disable important security
          messages about your account.{" "}
        </div>{" "}
      </section>{" "}
      {/* Password Settings */}
      <section className="settings-section">
        {" "}
        <div className="settings-section-heading">
          {" "}
          <div className="settings-section-icon">
            {" "}
            <Lock size={20} />{" "}
          </div>{" "}
          <div>
            {" "}
            <h3>Change Password</h3>{" "}
            <p>Keep your account secure with a strong password.</p>{" "}
          </div>{" "}
        </div>{" "}
        <form
          className="settings-password-form"
          onSubmit={handlePasswordChange}
        >
          {" "}
          <div className="settings-password-grid">
            {" "}
            <div className="settings-form-group">
              {" "}
              <label htmlFor="currentPassword">Current Password</label>{" "}
              <div className="settings-password-input">
                {" "}
                <input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Enter current password"
                  required
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label="Toggle current password visibility"
                >
                  {" "}
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            <div className="settings-form-group">
              {" "}
              <label htmlFor="newPassword">New Password</label>{" "}
              <div className="settings-password-input">
                {" "}
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label="Toggle new password visibility"
                >
                  {" "}
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            <div className="settings-form-group">
              {" "}
              <label htmlFor="confirmPassword">Confirm New Password</label>{" "}
              <div className="settings-password-input">
                {" "}
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm new password"
                  minLength={8}
                  required
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {" "}
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <button type="submit" className="settings-primary-button">
            {" "}
            <Lock size={16} /> Update Password{" "}
          </button>{" "}
        </form>{" "}
      </section>{" "}
      {/* Account Security */}
      <section className="settings-section">
        {" "}
        <div className="settings-section-heading">
          {" "}
          <div className="settings-section-icon">
            {" "}
            <ShieldCheck size={20} />{" "}
          </div>{" "}
          <div>
            {" "}
            <h3>Account Security</h3>{" "}
            <p>Manage your account privacy and security.</p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="settings-security-card">
          {" "}
          <div>
            {" "}
            <h4>Account Protection</h4>{" "}
            <p>
              {" "}
              Always use a unique password and keep your account information
              secure.{" "}
            </p>{" "}
          </div>{" "}
          <ShieldCheck size={27} />{" "}
        </div>{" "}
      </section>{" "}
      {/* Save Preferences */}
      <div className="settings-save-area">
        {" "}
        <button
          className="settings-primary-button"
          onClick={handleSavePreferences}
        >
          {" "}
          <Save size={17} /> Save Preferences{" "}
        </button>{" "}
      </div>{" "}
      {/* Danger Zone */}
      <section className="settings-danger-section">
        {" "}
        <div className="settings-section-heading">
          {" "}
          <div className="settings-danger-icon">
            {" "}
            <Trash2 size={20} />{" "}
          </div>{" "}
          <div>
            {" "}
            <h3>Danger Zone</h3>{" "}
            <p>Actions that can permanently affect your account.</p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="settings-danger-content">
          {" "}
          <div>
            {" "}
            <h4>Delete Account</h4>{" "}
            <p>
              {" "}
              Requesting account deletion may permanently remove your profile,
              saved universities, and application information.{" "}
            </p>{" "}
          </div>{" "}
          <button
            className="settings-delete-button"
            onClick={() => setDeleteModalOpen(true)}
          >
            {" "}
            <Trash2 size={16} /> Delete Account{" "}
          </button>{" "}
        </div>{" "}
      </section>{" "}
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div
          className="settings-modal-overlay"
          onClick={() => setDeleteModalOpen(false)}
        >
          {" "}
          <div
            className="settings-delete-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {" "}
            <div className="settings-delete-modal-icon">
              {" "}
              <AlertTriangle size={27} />{" "}
            </div>{" "}
            <button
              className="settings-modal-close"
              onClick={() => setDeleteModalOpen(false)}
              aria-label="Close confirmation"
            >
              {" "}
              <X size={20} />{" "}
            </button>{" "}
            <h3>Delete Your Account?</h3>{" "}
            <p>
              {" "}
              This action is permanent when connected to the account deletion
              service. For this frontend demo, no account will be deleted.{" "}
            </p>{" "}
            <label htmlFor="deleteConfirmation">
              {" "}
              Type <strong>DELETE</strong> to confirm.{" "}
            </label>{" "}
            <input
              id="deleteConfirmation"
              value={deleteConfirmation}
              onChange={(event) => setDeleteConfirmation(event.target.value)}
              placeholder="Type DELETE"
            />{" "}
            <div className="settings-delete-modal-actions">
              {" "}
              <button
                className="settings-cancel-button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteConfirmation("");
                }}
              >
                {" "}
                Cancel{" "}
              </button>{" "}
              <button
                className="settings-confirm-delete"
                disabled={deleteConfirmation !== "DELETE"}
                onClick={handleDeleteAccount}
              >
                {" "}
                Confirm{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

const GraduationCapIcon = () => <GraduationCap size={19} />;

export default StudentSettings;
