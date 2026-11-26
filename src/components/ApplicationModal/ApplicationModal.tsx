import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { X, GraduationCap, Send, Loader2, CheckCircle2 } from "lucide-react";
import type { FormEvent } from "react";

import { auth } from "../../config/firebase";

import {
  getApplicationAgencies,
  getStudentApplicationProfile,
  submitStudentApplication,
  type ApplicationAgency,
} from "../../services/applicationSubmissionService";

import "./ApplicationModal.css";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  universityId: string;
  universityName: string;
}

const ApplicationModal = ({
  isOpen,
  onClose,
  universityId,
  universityName,
}: ApplicationModalProps) => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const [agencies, setAgencies] = useState<ApplicationAgency[]>([]);
  const [agencyId, setAgencyId] = useState("");

  const [program, setProgram] = useState("");
  const [degree, setDegree] = useState("Master");
  const [intake, setIntake] = useState("September 2027");
  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!active) return;

      if (!user) {
        setError("Please log in with your student account.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const [profile, agencyList] = await Promise.all([
          getStudentApplicationProfile(user.uid),
          getApplicationAgencies(),
        ]);

        if (!active) return;

        setStudentId(user.uid);
        setStudentName(profile.fullName);
        setStudentEmail(profile.email || user.email || "");
        setAgencies(agencyList);
      } catch (err) {
        console.error("Error loading application form:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load the application form.",
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studentId) {
      setError("Please log in with your student account.");
      return;
    }

    if (!studentName.trim() || !studentEmail.trim()) {
      setError("Your student profile must have a name and email address.");
      return;
    }

    if (!agencyId) {
      setError("Please select an education agency.");
      return;
    }

    if (!program.trim() || !intake.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await submitStudentApplication({
        studentId,
        studentName,
        studentEmail,
        universityId,
        universityName,
        program: program.trim(),
        degree,
        intake: intake.trim(),
        agencyId,
        notes: notes.trim(),
      });

      setSuccess(true);
    } catch (err) {
      console.error("Application submission error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setProgram("");
    setDegree("Master");
    setIntake("September 2027");
    setNotes("");
    setAgencyId("");
    onClose();
  };

  return (
    <div className="application-modal-backdrop" onClick={handleClose}>
      <div
        className="application-modal-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="application-modal-header">
          <div>
            <div className="application-modal-title-icon">
              <GraduationCap size={22} />
            </div>

            <h2>University Application</h2>
            <p>Complete the form to apply to this university.</p>
          </div>

          <button
            type="button"
            className="application-modal-close"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className="application-modal-message">
            <Loader2 className="application-loading-icon" size={28} />
            <p>Loading application form...</p>
          </div>
        ) : success ? (
          <div className="application-success">
            <CheckCircle2 size={54} />
            <h3>Application Submitted!</h3>
            <p>
              Your application to {universityName} has been submitted
              successfully.
            </p>
            <p>You can check its progress in your My Applications page.</p>

            <button type="button" onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="application-form-body">
              {error && <div className="application-form-error">{error}</div>}

              <div className="application-form-group">
                <label>University</label>
                <input value={universityName} readOnly />
              </div>

              <div className="application-form-row">
                <div className="application-form-group">
                  <label>Student Name</label>
                  <input value={studentName} readOnly />
                </div>

                <div className="application-form-group">
                  <label>Email Address</label>
                  <input value={studentEmail} readOnly />
                </div>
              </div>

              <div className="application-form-group">
                <label htmlFor="application-agency">
                  Select Education Agency *
                </label>

                <select
                  id="application-agency"
                  value={agencyId}
                  onChange={(event) => setAgencyId(event.target.value)}
                  required
                >
                  <option value="">Choose an agency</option>

                  {agencies.map((agency) => (
                    <option key={agency.id} value={agency.id}>
                      {agency.name}
                    </option>
                  ))}
                </select>

                {agencies.length === 0 && (
                  <small>
                    No agencies are available. Please try again later.
                  </small>
                )}
              </div>

              <div className="application-form-group">
                <label htmlFor="application-program">
                  Desired Program / Major *
                </label>

                <input
                  id="application-program"
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={program}
                  onChange={(event) => setProgram(event.target.value)}
                  required
                />
              </div>

              <div className="application-form-row">
                <div className="application-form-group">
                  <label htmlFor="application-degree">Degree *</label>

                  <select
                    id="application-degree"
                    value={degree}
                    onChange={(event) => setDegree(event.target.value)}
                    required
                  >
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Language Program">Language Program</option>
                  </select>
                </div>

                <div className="application-form-group">
                  <label htmlFor="application-intake">Intake *</label>

                  <input
                    id="application-intake"
                    type="text"
                    placeholder="e.g. September 2027"
                    value={intake}
                    onChange={(event) => setIntake(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="application-form-group">
                <label htmlFor="application-notes">
                  Additional Notes (Optional)
                </label>

                <textarea
                  id="application-notes"
                  rows={4}
                  placeholder="Write any additional information..."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>

              <div className="application-form-notice">
                Your application will be sent to the selected education agency
                for review.
              </div>
            </div>

            <div className="application-modal-footer">
              <button
                type="button"
                className="application-cancel-btn"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="application-submit-btn"
                disabled={isSubmitting || agencies.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="application-loading-icon" size={17} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
