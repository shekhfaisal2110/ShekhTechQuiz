// import React, { useContext, useEffect, useState } from 'react';
// import { CertificateContext } from '../App';
// import { getCertificateHistory } from '../utils/storage';
// import { format } from 'date-fns';
// import { FaCertificate, FaClock, FaCheckCircle, FaTimesCircle, FaDownload, FaEye, FaTrash, FaUserGraduate, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

// const History = () => {
//   const { activeCertificateCount, recycledCertificateCount } = useContext(CertificateContext);
//   const [historyData, setHistoryData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('date');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Load history data
//   useEffect(() => {
//     const loadHistory = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getCertificateHistory();
//         setHistoryData(data || []);
//         setFilteredData(data || []);
//       } catch (error) {
//         console.error('Error loading history:', error);
//         setHistoryData([]);
//         setFilteredData([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadHistory();
//   }, []);

//   // Apply filters and sorting
//   useEffect(() => {
//     let filtered = [...historyData];

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(item =>
//         item.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.certificateId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (filter !== 'all') {
//       filtered = filtered.filter(item => item.status === filter);
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       let aValue, bValue;
      
//       switch (sortBy) {
//         case 'date':
//           aValue = new Date(a.completionDate || a.issuedDate);
//           bValue = new Date(b.completionDate || b.issuedDate);
//           break;
//         case 'name':
//           aValue = a.courseName?.toLowerCase() || '';
//           bValue = b.courseName?.toLowerCase() || '';
//           break;
//         case 'score':
//           aValue = a.score || 0;
//           bValue = b.score || 0;
//           break;
//         default:
//           aValue = new Date(a.completionDate || a.issuedDate);
//           bValue = new Date(b.completionDate || b.issuedDate);
//       }

//       if (sortOrder === 'asc') {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//     setFilteredData(filtered);
//   }, [historyData, filter, searchTerm, sortBy, sortOrder]);

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('desc');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'failed':
//         return 'bg-red-100 text-red-800';
//       case 'in-progress':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'expired':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-blue-100 text-blue-800';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'completed':
//         return <FaCheckCircle className="text-green-500" />;
//       case 'failed':
//         return <FaTimesCircle className="text-red-500" />;
//       case 'in-progress':
//         return <FaClock className="text-yellow-500" />;
//       default:
//         return <FaCertificate className="text-blue-500" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return format(new Date(dateString), 'MMM d, yyyy HH:mm');
//     } catch (error) {
//       return dateString;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate History</h1>
//         <p className="text-gray-600">View your complete learning and certification history</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
//               <FaCertificate size={24} />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Active Certificates</p>
//               <p className="text-2xl font-bold text-gray-800">{activeCertificateCount}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
//               <FaTrash size={24} />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Recycled Certificates</p>
//               <p className="text-2xl font-bold text-gray-800">{recycledCertificateCount}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
//               <FaChartLine size={24} />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Activities</p>
//               <p className="text-2xl font-bold text-gray-800">{historyData.length}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-100">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-grow">
//             <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
//               Search Certificates
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="search"
//                 placeholder="Search by course name, ID, or user..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
          
//           <div className="md:w-48">
//             <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
//               Filter by Status
//             </label>
//             <select
//               id="filter"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Statuses</option>
//               <option value="completed">Completed</option>
//               <option value="failed">Failed</option>
//               <option value="in-progress">In Progress</option>
//               <option value="expired">Expired</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* History Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">Detailed History</h2>
//         </div>
        
//         {filteredData.length === 0 ? (
//           <div className="text-center py-12">
//             <FaCertificate className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No history found</h3>
//             <p className="mt-1 text-gray-500">
//               {searchTerm || filter !== 'all' 
//                 ? "Try adjusting your search or filter criteria." 
//                 : "You don't have any certificate history yet."}
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort('date')}
//                   >
//                     <div className="flex items-center">
//                       Date
//                       {sortBy === 'date' && (
//                         <span className="ml-1">
//                           {sortOrder === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort('name')}
//                   >
//                     <div className="flex items-center">
//                       Course/Certificate
//                       {sortBy === 'name' && (
//                         <span className="ml-1">
//                           {sortOrder === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort('score')}
//                   >
//                     <div className="flex items-center">
//                       Score
//                       {sortBy === 'score' && (
//                         <span className="ml-1">
//                           {sortOrder === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredData.map((item, index) => (
//                   <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       <div className="flex items-center">
//                         <FaCalendarAlt className="mr-2 text-gray-400" />
//                         {formatDate(item.completionDate || item.issuedDate)}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div>
//                         <div className="text-sm font-medium text-gray-900">{item.courseName || item.certificateName}</div>
//                         <div className="text-sm text-gray-500">ID: {item.certificateId || 'N/A'}</div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
//                           <FaUserGraduate className="text-blue-600" />
//                         </div>
//                         <div className="ml-3">
//                           <div className="text-sm font-medium text-gray-900">{item.userName || 'Anonymous User'}</div>
//                           <div className="text-sm text-gray-500">{item.userEmail || 'No email'}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {item.score !== undefined ? (
//                         <div className="flex items-center">
//                           <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
//                             <div 
//                               className="bg-blue-600 h-2 rounded-full" 
//                               style={{ width: `${item.score}%` }}
//                             ></div>
//                           </div>
//                           <span className="font-medium">{item.score}%</span>
//                         </div>
//                       ) : (
//                         <span className="text-gray-500">N/A</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
//                         {getStatusIcon(item.status)}
//                         <span className="ml-1 capitalize">{item.status || 'Unknown'}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button 
//                           className="text-blue-600 hover:text-blue-900 transition-colors flex items-center"
//                           title="View Certificate"
//                         >
//                           <FaEye size={16} />
//                           <span className="ml-1 hidden sm:inline">View</span>
//                         </button>
//                         <button 
//                           className="text-green-600 hover:text-green-900 transition-colors flex items-center"
//                           title="Download Certificate"
//                         >
//                           <FaDownload size={16} />
//                           <span className="ml-1 hidden sm:inline">Download</span>
//                         </button>
//                         <button 
//                           className="text-red-600 hover:text-red-900 transition-colors flex items-center"
//                           title="Delete Certificate"
//                         >
//                           <FaTrash size={16} />
//                           <span className="ml-1 hidden sm:inline">Delete</span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Export Options */}
//       <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Export Options</h3>
//         <div className="flex flex-wrap gap-4">
//           <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
//             <FaDownload className="mr-2" />
//             Export All as CSV
//           </button>
//           <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
//             <FaDownload className="mr-2" />
//             Export as PDF
//           </button>
//           <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
//             <FaChartLine className="mr-2" />
//             Generate Analytics Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default History;




import React, { useContext, useEffect, useState } from 'react';
import { CertificateContext } from '../context/CertificateContext';
import { getCertificateHistory } from '../utils/storage';
import { format } from 'date-fns';
import { FaCertificate, FaClock, FaCheckCircle, FaTimesCircle, FaDownload, FaEye, FaTrash, FaUserGraduate, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const History = () => {
  const { activeCertificateCount, recycledCertificateCount } = useContext(CertificateContext);
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Load history data
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        const data = await getCertificateHistory();
        setHistoryData(data || []);
        setFilteredData(data || []);
      } catch (error) {
        console.error('Error loading history:', error);
        setHistoryData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...historyData];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.certificateId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(item => item.status === filter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.completionDate || a.issuedDate);
          bValue = new Date(b.completionDate || b.issuedDate);
          break;
        case 'name':
          aValue = a.courseName?.toLowerCase() || '';
          bValue = b.courseName?.toLowerCase() || '';
          break;
        case 'score':
          aValue = a.score || 0;
          bValue = b.score || 0;
          break;
        default:
          aValue = new Date(a.completionDate || a.issuedDate);
          bValue = new Date(b.completionDate || b.issuedDate);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredData(filtered);
  }, [historyData, filter, searchTerm, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'failed':
        return <FaTimesCircle className="text-red-500" />;
      case 'in-progress':
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaCertificate className="text-blue-500" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM d, yyyy HH:mm');
    } catch (error) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate History</h1>
        <p className="text-gray-600">View your complete learning and certification history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaCertificate size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Certificates</p>
              <p className="text-2xl font-bold text-gray-800">{activeCertificateCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <FaTrash size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Recycled Certificates</p>
              <p className="text-2xl font-bold text-gray-800">{recycledCertificateCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaChartLine size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Activities</p>
              <p className="text-2xl font-bold text-gray-800">{historyData.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Certificates
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search by course name, ID, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="md:w-48">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="in-progress">In Progress</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Detailed History</h2>
        </div>
        
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <FaCertificate className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No history found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm || filter !== 'all' 
                ? "Try adjusting your search or filter criteria." 
                : "You don't have any certificate history yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortBy === 'date' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Course/Certificate
                      {sortBy === 'name' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('score')}
                  >
                    <div className="flex items-center">
                      Score
                      {sortBy === 'score' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        {formatDate(item.completionDate || item.issuedDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.courseName || item.certificateName}</div>
                        <div className="text-sm text-gray-500">ID: {item.certificateId || 'N/A'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <FaUserGraduate className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{item.userName || 'Anonymous User'}</div>
                          <div className="text-sm text-gray-500">{item.userEmail || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.score !== undefined ? (
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{item.score}%</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status || 'Unknown'}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 transition-colors flex items-center"
                          title="View Certificate"
                        >
                          <FaEye size={16} />
                          <span className="ml-1 hidden sm:inline">View</span>
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900 transition-colors flex items-center"
                          title="Download Certificate"
                        >
                          <FaDownload size={16} />
                          <span className="ml-1 hidden sm:inline">Download</span>
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 transition-colors flex items-center"
                          title="Delete Certificate"
                        >
                          <FaTrash size={16} />
                          <span className="ml-1 hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Export Options</h3>
        <div className="flex flex-wrap gap-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <FaDownload className="mr-2" />
            Export All as CSV
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            <FaDownload className="mr-2" />
            Export as PDF
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <FaChartLine className="mr-2" />
            Generate Analytics Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;