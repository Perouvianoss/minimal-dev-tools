import React, { useState } from "react";

const initialResumeState = {
  personalInfo: {
    fullName: "Γιάννης Παπαδόπουλος",
    email: "johnpapa@example.com",
    phone: "6912345678",
    summary: "Λίγα λόγια για εμένα, είμαι ο Γιάννης και ψάχνω για δουλειά.",
  },
  experience: [],
  education: [],
  skills: [
    {
      softSkills: [],
      hardSkills: [],
    },
  ],
};

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(initialResumeState);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-100">
      {/* ΑΡΙΣΤΕΡΑ: EDITOR (Εδώ γράφει ο χρήστης) */}
      {/* w-full md:w-1/2: Στα κινητά όλο το πλάτος, στα PC το μισό */}
      {/* overflow-y-auto: Σκρολάρει μόνο αυτό το κομμάτι, όχι όλη η σελίδα */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto h-full border-r border-slate-300">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Editor</h2>

        {/* Εδώ θα βάλουμε τις φόρμες στα επόμενα βήματα */}
        <div className="space-y-6">
          {/* Placeholder για τη Φόρμα Προσωπικών Στοιχείων */}
          {/* --- ΦΟΡΜΑ ΠΡΟΣΩΠΙΚΩΝ ΣΤΟΙΧΕΙΩΝ --- */}
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4 border border-slate-200">
            <h3 className="font-bold text-xl text-slate-800 border-b pb-2">
              Προσωπικά Στοιχεία
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Ονοματεπώνυμο
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={handlePersonalChange}
                  placeholder="π.χ. Γιάννης Παπαδόπουλος"
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={resumeData.personalInfo.email}
                  onChange={handlePersonalChange}
                  placeholder="john@example.com"
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Τηλέφωνο
                </label>
                <input
                  type="text"
                  name="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={handlePersonalChange}
                  placeholder="6912345678"
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Διεύθυνση
                </label>
                <input
                  type="text"
                  name="address"
                  value={resumeData.personalInfo.address}
                  onChange={handlePersonalChange}
                  placeholder="Αθήνα, Ελλάδα"
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Summary (Textarea - πιάνει όλο το πλάτος) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Σύντομο Βιογραφικό (Summary)
              </label>
              <textarea
                name="summary"
                value={resumeData.personalInfo.summary}
                onChange={handlePersonalChange}
                rows="4"
                placeholder="Περιέγραψε τον εαυτό σου με λίγα λόγια..."
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </section>
        </div>
      </div>

      {/* ΔΕΞΙΑ: PREVIEW (Εδώ βλέπει το αποτέλεσμα) */}
      <div className="w-full md:w-1/2 p-8 bg-slate-500 overflow-y-auto h-full flex justify-center">
        {/* Αυτό είναι το "Χαρτί A4" */}
        <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl p-8 transform scale-75 md:scale-90 origin-top">
          {/* HEADER ΤΟΥ ΒΙΟΓΡΑΦΙΚΟΥ */}
          <div className="border-b-2 border-slate-800 pb-4 mb-6">
            <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-wider">
              {resumeData.personalInfo.fullName || "ΟΝΟΜΑΤΕΠΩΝΥΜΟ"}
            </h1>
            <div className="text-slate-600 mt-2 flex gap-4 text-sm">
              <span>{resumeData.personalInfo.email}</span>
              <span>|</span>
              <span>{resumeData.personalInfo.phone}</span>
              <span>|</span>
              <span>{resumeData.personalInfo.address}</span>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mb-6">
            <p className="text-slate-700 leading-relaxed">
              {resumeData.personalInfo.summary || "Περιγραφή..."}
            </p>
          </div>

          {/* EXPERIENCE PREVIEW (Προσωρινό Loop) */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 mb-4">
              ΕΜΠΕΙΡΙΑ
            </h2>
            {resumeData.experience.length === 0 ? (
              <p className="text-slate-400 italic">
                Δεν έχει προστεθεί εμπειρία ακόμα.
              </p>
            ) : (
              resumeData.experience.map((job) => (
                <div key={job.id} className="mb-4">
                  <h3 className="font-bold">{job.role}</h3>
                  <p>{job.companyName}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
