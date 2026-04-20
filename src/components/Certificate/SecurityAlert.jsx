// Enhanced Professional Security Alert Modal
const SecurityAlert = ({ isOpen, onClose, alertType }) => {
  if (!isOpen) return null;

  const getAlertContent = () => {
    switch (alertType) {
      case 'screenshot':
        return {
          icon: <Shield className="w-12 h-12 text-red-500" />,
          title: 'Security Protection Active',
          subtitle: 'Screenshot Prevention System',
          message: 'This certificate is protected by advanced security measures to prevent unauthorized copying and maintain its authenticity.',
          details: [
            'Screenshots are automatically blocked',
            'Content protection is enforced',
            'Digital integrity is preserved'
          ],
          severity: 'high',
          primaryAction: 'Understood',
          secondaryAction: null
        };
      case 'copy':
        return {
          icon: <Lock className="w-12 h-12 text-orange-500" />,
          title: 'Content Protection',
          subtitle: 'Copy Prevention Active',
          message: 'This certificate content is protected and cannot be copied to maintain document integrity and prevent fraud.',
          details: [
            'Text selection is disabled',
            'Copy operations are blocked',
            'Document authenticity protected'
          ],
          severity: 'medium',
          primaryAction: 'Continue',
          secondaryAction: null
        };
      case 'rightclick':
        return {
          icon: <Eye className="w-12 h-12 text-blue-500" />,
          title: 'Viewing Mode Active',
          subtitle: 'Interaction Restricted',
          message: 'This certificate is in secure viewing mode. Right-click and context menus are disabled for security.',
          details: [
            'Context menu disabled',
            'Secure viewing enabled',
            'Professional presentation maintained'
          ],
          severity: 'low',
          primaryAction: 'Got It',
          secondaryAction: null
        };
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
          title: 'Security Notice',
          subtitle: 'Protected Content',
          message: 'This certificate is protected by security measures to ensure authenticity and prevent unauthorized access.',
          details: [
            'Security protocols active',
            'Content integrity maintained',
            'Professional standards upheld'
          ],
          severity: 'medium',
          primaryAction: 'Acknowledge',
          secondaryAction: null
        };
    }
  };

  const content = getAlertContent();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Enhanced Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" />
      
      {/* Professional Modal Design */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 opacity-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-3xl p-6 border-b border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
              {content.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {content.title}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                {content.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {content.message}
          </p>
          
          {/* Security Features List */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <Shield className="w-4 h-4 text-green-500 mr-2" />
              Security Features Active
            </h4>
            <ul className="space-y-2">
              {content.details.map((detail, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Branding */}
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-6">
            <img 
              src={LogoImg} 
              className="w-6 h-6 rounded-full" 
              alt="ShaikhTech Logo"
            />
            <span>Protected by ShaikhTech Security System</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 rounded-b-3xl px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            {content.secondaryAction && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors duration-200"
              >
                {content.secondaryAction}
              </button>
            )}
            <button
              onClick={onClose}
              className={`px-8 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                content.severity === 'high' 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  : content.severity === 'medium'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
              }`}
            >
              {content.primaryAction}
            </button>
          </div>
        </div>

        {/* Subtle animation indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};
export default SecurityAlert;