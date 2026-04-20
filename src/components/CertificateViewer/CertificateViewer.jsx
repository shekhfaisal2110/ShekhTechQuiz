// CertificateViewer.jsx
import React, { useState, useEffect } from "react";
import Certificate from "../Certificate/CertificateContainer";
import { getCertificates } from "../../utils/certificateUtils"; // Adjust path as needed
import { useParams, useNavigate } from "react-router-dom";

export default function CertificateViewer() {
  const { id } = useParams(); // If using React Router
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const certs = getCertificates();
    const foundCert = certs.find((cert) => cert.id === id);

    if (!foundCert) {
      alert("Certificate not found.");
      navigate("/certificates"); // Redirect if not found
      return;
    }

    setCertificate(foundCert);
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading Certificate...</div>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  return (
    <Certificate
      name={certificate.name}
      courseTitle={certificate.courseTitle}
      score={certificate.score}
      total={certificate.total}
      percentage={certificate.percentage}
      date={certificate.date}
      certificateNumber={certificate.certificateNumber || certificate.id}
    />
  );
}