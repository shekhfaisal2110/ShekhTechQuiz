// components/RecycleBin/RecycleBinContainer.jsx
import React, { useState, useEffect } from 'react';
import {
  Award, User, RotateCcw, Trash2, Recycle, AlertCircle
} from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getCertificates,
  getRecycledCertificates,
  restoreFromRecycleBin as restoreFromRecycleBinUtil,
  permanentlyDelete as permanentlyDeleteUtil,
  cleanupExpiredRecycledCertificates
} from '../../utils/storage';
import { useCertificateContext } from '../../App';
import RecycleBinHeader from './RecycleBinHeader';
import CertificateCard from './CertificateCard';
import EmptyRecycleBin from './EmptyRecycleBin';
import BottomActionBar from './BottomActionBar';
import ConfirmationModal from './ConfirmationModal';
import LoadingSpinner from '../LoadingSpinner';
import ToastManager from '../ToastManager'; // Optional - see below

export default function RecycleBinContainer() {
  const [recycledCertificates, setRecycledCertificatesState] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedCerts, setSelectedCerts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
    confirmColor: 'red',
  });

  const { refreshCounts } = useCertificateContext();

  // Load data
  useEffect(() => {
    const loadData = () => {
      try {
        const recycled = getRecycledCertificates();
        const activeCerts = getCertificates();
        setRecycledCertificatesState(recycled);
        setCertificates(activeCerts);
        setLoading(false);
        refreshCounts();
      } catch (error) {
        console.error('Error loading recycled certificates:', error);
        setRecycledCertificatesState([]);
        setCertificates([]);
        setLoading(false);
      }
    };
    loadData();
  }, [refreshCounts]);

  // Cleanup expired
  useEffect(() => {
    const cleanup = async () => {
      const result = cleanupExpiredRecycledCertificates();
      if (result.cleaned && result.removedCount > 0) {
        setRecycledCertificatesState(getRecycledCertificates());
        ToastManager.showInfoToast(`${result.removedCount} expired certificates were automatically removed.`);
        refreshCounts();
      }
    };

    if (recycledCertificates.length > 0) {
      cleanup();
    }
  }, [recycledCertificates.length, refreshCounts]);

  // Utility functions
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getDaysUntilExpiry = (deletedAt) => {
    const now = new Date();
    const deletedDate = new Date(deletedAt);
    const expiryDate = new Date(deletedDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    const daysLeft = Math.ceil((expiryDate - now) / (24 * 60 * 60 * 1000));
    return Math.max(0, daysLeft);
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Exceptional', icon: Award, color: 'from-yellow-400 to-orange-500' };
    if (percentage >= 80) return { level: 'Excellent', icon: Award, color: 'from-purple-500 to-indigo-600' };
    if (percentage >= 70) return { level: 'Good', icon: Award, color: 'from-emerald-500 to-green-600' };
    return { level: 'Passed', icon: Award, color: 'from-blue-500 to-blue-600' };
  };

  // Handlers
  const handleSelectCertificate = (certId) => {
    const newSelected = new Set(selectedCerts);
    newSelected.has(certId) ? newSelected.delete(certId) : newSelected.add(certId);
    setSelectedCerts(newSelected);
  };

  const handleSelectAll = () => setSelectedCerts(new Set(recycledCertificates.map(cert => cert.id)));
  const handleDeselectAll = () => setSelectedCerts(new Set());

  const restoreFromRecycleBin = (certIds) => {
    try {
      const result = restoreFromRecycleBinUtil(certIds);
      if (result.success) {
        setRecycledCertificatesState(getRecycledCertificates());
        setCertificates(getCertificates());
        setSelectedCerts(new Set());
        refreshCounts();

        const count = result.restoredCount;
        const text = count === 1 ? 'certificate' : 'certificates';
        ToastManager.showSuccessToast(`${count} ${text} restored!`);
        setTimeout(() => ToastManager.showInfoToast(`Restored ${text} are now in your main gallery.`), 1000);
      } else {
        ToastManager.showErrorToast(`Failed to restore: ${result.error}`);
      }
    } catch (error) {
      console.error('Error restoring:', error);
      ToastManager.showErrorToast('Failed to restore. Please try again.');
    }
  };

  const permanentlyDelete = (certIds) => {
    const count = certIds.length;
    const text = count === 1 ? 'certificate' : 'certificates';
    const certsToDelete = recycledCertificates.filter(cert => certIds.includes(cert.id));
    const courseNames = certsToDelete.map(cert => cert.courseTitle);

    const message = `⚠️ PERMANENT DELETE WARNING ⚠️

You are about to permanently delete ${count} ${text}:
${courseNames.slice(0, 3).join('\n')}
${courseNames.length > 3 ? `...and ${courseNames.length - 3} more` : ''}

This action CANNOT be undone.
Are you absolutely sure you want to proceed?`;

    ToastManager.showWarningToast(`Deleting ${count} ${text}...`);

    setModal({
      isOpen: true,
      title: 'Delete Certificate(s)?',
      message,
      confirmColor: 'red',
      onConfirm: () => {
        try {
          const result = permanentlyDeleteUtil(certIds);
          if (result.success) {
            setRecycledCertificatesState(getRecycledCertificates());
            setSelectedCerts(new Set());
            refreshCounts();
            ToastManager.showSuccessToast(
              `${count} ${text} deleted permanently.`,
              { style: { background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' } }
            );
            setTimeout(() => ToastManager.showInfoToast(`Storage freed. These ${text} cannot be recovered.`), 2000);
          } else {
            ToastManager.showErrorToast(`Failed to delete: ${result.error}`);
          }
        } catch (error) {
          console.error('Delete failed:', error);
          ToastManager.showErrorToast('Failed to delete. Please try again.');
        } finally {
          setModal(prev => ({ ...prev, isOpen: false }));
        }
      },
      onCancel: () => setModal(prev => ({ ...prev, isOpen: false })),
    });
  };

  const emptyRecycleBin = () => {
    const count = recycledCertificates.length;
    const message = `🗑️ EMPTY RECYCLE BIN WARNING 🗑️

You are about to permanently delete ALL ${count} certificates in the recycle bin.

This includes:
${recycledCertificates.slice(0, 5).map(cert => `• ${cert.courseTitle}`).join('\n')}
${count > 5 ? `...and ${count - 5} more` : ''}

⚠️ THIS ACTION CANNOT BE UNDONE!
Are you absolutely certain you want to proceed?`;

    ToastManager.showWarningToast(`Emptying recycle bin...`);

    setModal({
      isOpen: true,
      title: 'Empty Recycle Bin?',
      message,
      confirmColor: 'red',
      onConfirm: () => {
        try {
          const allIds = recycledCertificates.map(cert => cert.id);
          const result = permanentlyDeleteUtil(allIds);
          if (result.success) {
            setRecycledCertificatesState([]);
            setSelectedCerts(new Set());
            refreshCounts();
            ToastManager.showSuccessToast(
              `🗑️ Recycle bin emptied! ${count} certificates deleted.`,
              { style: { background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }, autoClose: 6000 }
            );
            setTimeout(() => ToastManager.showInfoToast('Your recycle bin is now empty.'), 1500);
          } else {
            ToastManager.showErrorToast(`Failed to empty bin: ${result.error}`);
          }
        } catch (error) {
          console.error('Empty bin failed:', error);
          ToastManager.showErrorToast('Failed to empty bin.');
        } finally {
          setModal(prev => ({ ...prev, isOpen: false }));
        }
      },
      onCancel: () => {
        ToastManager.showInfoToast('Restore cancelled.');
        setModal(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const restoreAllCertificates = () => {
    const count = recycledCertificates.length;
    if (count === 0) return;

    const message = `🔄 RESTORE ALL CERTIFICATES 🔄

You are about to restore ALL ${count} certificates from the recycle bin.

This includes:
${recycledCertificates.slice(0, 5).map(cert => `• ${cert.courseTitle}`).join('\n')}
${count > 5 ? `...and ${count - 5} more` : ''}

All will be moved back to your active collection.
Do you want to proceed?`;

    ToastManager.showInfoToast(`Preparing to restore all ${count} certificates...`);

    setModal({
      isOpen: true,
      title: 'Restore All Certificates?',
      message,
      confirmColor: 'green',
      onConfirm: () => {
        const allIds = recycledCertificates.map(cert => cert.id);
        restoreFromRecycleBin(allIds);
        setModal(prev => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        ToastManager.showInfoToast('Restore cancelled.');
        setModal(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const navigateBack = () => {
    window.location.href = '/certificates';
  };

  // Render
  if (loading) return <LoadingSpinner message="Loading recycle bin..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ fontSize: '12px' }}
        toastStyle={{ borderRadius: '8px', fontWeight: '600' }}
      />

      <ConfirmationModal {...modal} />

      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
        <RecycleBinHeader
          count={recycledCertificates.length}
          onEmptyBin={emptyRecycleBin}
          onRestoreAll={restoreAllCertificates}
        />

        {recycledCertificates.length === 0 ? (
          <EmptyRecycleBin onBack={navigateBack} />
        ) : (
          <>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recycledCertificates.map((cert) => (
                <CertificateCard
                  key={cert.id}
                  cert={cert}
                  isSelected={selectedCerts.has(cert.id)}
                  performance={getPerformanceLevel(cert.percentage)}
                  daysLeft={getDaysUntilExpiry(cert.deletedAt)}
                  formatDate={formatDate}
                  onSelect={() => handleSelectCertificate(cert.id)}
                  onRestore={() => restoreFromRecycleBin([cert.id])}
                  onDelete={() => permanentlyDelete([cert.id])}
                />
              ))}
            </div>
          </>
        )}

        {selectedCerts.size > 0 && (
          <BottomActionBar
            selectedCount={selectedCerts.size}
            totalCount={recycledCertificates.length}
            onDeselectAll={handleDeselectAll}
            onSelectAll={handleSelectAll}
            onRestore={() => restoreFromRecycleBin(Array.from(selectedCerts))}
            onDelete={() => permanentlyDelete(Array.from(selectedCerts))}
          />
        )}
      </div>
    </div>
  );
}