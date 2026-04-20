// utils/certificateStorage.js
const CERTIFICATES_KEY = "tech_quiz_certificates";
const RECYCLED_CERTIFICATES_KEY = "recycledCertificates";

// ======================
// CERTIFICATES
// ======================

export function getCertificates() {
  try {
    const data = localStorage.getItem(CERTIFICATES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error loading certificates:", e);
    return [];
  }
}

export function saveCertificate(cert) {
  try {
    if (!cert.id) {
      cert.id = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    const arr = getCertificates();
    arr.unshift(cert);
    localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(arr));
    return true;
  } catch (e) {
    console.error("Error saving certificate:", e);
    return false;
  }
}

export function setCertificates(certificates) {
  try {
    localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(certificates));
    return true;
  } catch (e) {
    console.error("Error setting certificates:", e);
    return false;
  }
}

export function clearCertificates() {
  try {
    localStorage.removeItem(CERTIFICATES_KEY);
    return true;
  } catch (e) {
    console.error("Error clearing certificates:", e);
    return false;
  }
}

// ======================
// RECYCLE BIN
// ======================

export function getRecycledCertificates() {
  try {
    const data = localStorage.getItem(RECYCLED_CERTIFICATES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error loading recycled certificates:", e);
    return [];
  }
}

export function setRecycledCertificates(recycledCerts) {
  try {
    localStorage.setItem(RECYCLED_CERTIFICATES_KEY, JSON.stringify(recycledCerts));
    return true;
  } catch (e) {
    console.error("Error setting recycled certificates:", e);
    return false;
  }
}

export function clearRecycledCertificates() {
  try {
    localStorage.removeItem(RECYCLED_CERTIFICATES_KEY);
    return true;
  } catch (e) {
    console.error("Error clearing recycled certificates:", e);
    return false;
  }
}

// ======================
// OPERATIONS
// ======================

export function moveToRecycleBin(certIds) {
  try {
    const certificates = getCertificates();
    const recycledCertificates = getRecycledCertificates();

    const certsToRecycle = certificates.filter((cert) => certIds.includes(cert.id));
    const recycledWithTimestamp = certsToRecycle.map((cert) => ({
      ...cert,
      deletedAt: new Date().toISOString(),
    }));

    const updatedCertificates = certificates.filter((cert) => !certIds.includes(cert.id));
    const updatedRecycled = [...recycledCertificates, ...recycledWithTimestamp];

    setCertificates(updatedCertificates);
    setRecycledCertificates(updatedRecycled);

    return { success: true, movedCount: certIds.length };
  } catch (e) {
    console.error("Error moving certificates to recycle bin:", e);
    return { success: false, error: e.message };
  }
}

export function restoreFromRecycleBin(certIds) {
  try {
    const certificates = getCertificates();
    const recycledCertificates = getRecycledCertificates();

    const certsToRestore = recycledCertificates.filter((cert) => certIds.includes(cert.id));
    const restoredCerts = certsToRestore.map(({ deletedAt, ...original }) => original);

    const updatedRecycled = recycledCertificates.filter((cert) => !certIds.includes(cert.id));
    const updatedCertificates = [...certificates, ...restoredCerts];

    setCertificates(updatedCertificates);
    setRecycledCertificates(updatedRecycled);

    return { success: true, restoredCount: certIds.length, restoredCerts };
  } catch (e) {
    console.error("Error restoring certificates:", e);
    return { success: false, error: e.message };
  }
}

export function permanentlyDelete(certIds) {
  try {
    const recycledCertificates = getRecycledCertificates();
    const updatedRecycled = recycledCertificates.filter((cert) => !certIds.includes(cert.id));

    setRecycledCertificates(updatedRecycled);

    return { success: true, deletedCount: certIds.length };
  } catch (e) {
    console.error("Error permanently deleting certificates:", e);
    return { success: false, error: e.message };
  }
}

export function cleanupExpiredRecycledCertificates() {
  try {
    const recycledCertificates = getRecycledCertificates();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const validRecycled = recycledCertificates.filter(
      (cert) => new Date(cert.deletedAt) > thirtyDaysAgo
    );

    if (validRecycled.length !== recycledCertificates.length) {
      setRecycledCertificates(validRecycled);
      return { cleaned: true, removedCount: recycledCertificates.length - validRecycled.length };
    }

    return { cleaned: false, removedCount: 0 };
  } catch (e) {
    console.error("Error cleaning up expired certificates:", e);
    return { cleaned: false, error: e.message };
  }
}

export function getRecycledCount() {
  try {
    return getRecycledCertificates().length;
  } catch (e) {
    return 0;
  }
}