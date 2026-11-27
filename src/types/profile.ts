export interface StudentProfile {
  uid: string;
  fullName: string;
  email: string;
  role: "student";
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
  profileImage?: string;
}

export interface AgencyProfile {
  userId: string;
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
  logo?: string;
}
