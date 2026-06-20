export type MedicationCategory = 'Antibiotics' | 'Vitamins' | 'Calcium' | 'Gastric Medicine' | 'Others';

export interface Medicine {
  name: string;
  dosage: string;
  duration: string;
  category: MedicationCategory;
}

export interface TestResult {
  testName: string;
  value: number; 
  unit: string;
}

export interface VitalSigns {
  respiratoryRate: string;
  bloodPressure: string;
}

export interface MedicalRecord {
  recordId: string;
  date: string; // ISO Format YYYY-MM-DD
  doctorName: string;
  patientCase: string;
  vitals: VitalSigns;
  medicines: Medicine[];
  testResults: TestResult[];
}

export interface PatientProfile {
  patientId: string;
  fullName: string;
  status: 'Active' | 'Suspended';
  records: MedicalRecord[];
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED';
  fileName: string;
  errorMessage?: string;
}

export interface AppStorageState {
  patients: PatientProfile[];
  logs: SystemAuditLog[];
}