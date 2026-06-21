import { PatientProfile } from '@/app/types/medical';

export const initialMockPatients: PatientProfile[] = [
  {
    patientId: "PAT-8812",
    fullName: "John Doe",
    status: "Active",
    records: [
      {
        recordId: "REC-001",
        date: "2025-03-12",
        doctorName: "Dr. Sarah Jenkins",
        patientCase: "Acute bacterial bronchitis with persistent dry cough.",
        vitals: { respiratoryRate: "20 bpm", bloodPressure: "120/80 mmHg" },
        medicines: [
          { name: "Amoxicillin", dosage: "500mg, thrice daily", duration: "7 days", category: "Antibiotics" },
          { name: "Pantoprazole", dosage: "40mg, once daily before breakfast", duration: "10 days", category: "Gastric Medicine" }
        ],
        testResults: [
          { testName: "WBC Count", value: 11.5, unit: "10^3/uL" },
          { testName: "Hemoglobin", value: 14.2, unit: "g/dL" }
        ]
      },
      {
        recordId: "REC-002",
        date: "2025-11-05",
        doctorName: "Dr. Alex Rivera",
        patientCase: "Routine wellness follow-up, mild vitamin deficiency fatigue.",
        vitals: { respiratoryRate: "16 bpm", bloodPressure: "118/75 mmHg" },
        medicines: [
          { name: "Vitamin D3", dosage: "2000 IU, once daily", duration: "30 days", category: "Vitamins" },
          { name: "Calcium Citrate", dosage: "500mg, twice daily", duration: "30 days", category: "Calcium" }
        ],
        testResults: [
          { testName: "Vitamin D Level", value: 22.0, unit: "ng/mL" },
          { testName: "WBC Count", value: 6.8, unit: "10^3/uL" }
        ]
      }
    ]
  },
  {
    patientId: "PAT-3321",
    fullName: "Jane Smith",
    status: "Suspended",
    records: []
  }
];