import React, { useState } from 'react';
// Note: असल एप्लीकेशन में, आपको JWT को डिकोड करने के लिए एक लाइब्रेरी (जैसे jwt-decode) का उपयोग करना होगा।
// यह फंक्शन केवल डेमो के लिए एक नकली टोकन पेलोड लौटाता है।

/**
 * यह फ़ंक्शन JWT टोकन को डिकोड करने और भूमिका निकालने का अनुकरण करता है।
 * असल JWT में भूमिका (role) होनी चाहिए, उदाहरण के लिए: "ROLE_USER", "ROLE_NGO", "ROLE_HOSPITAL".
 * @param {string} token - API से प्राप्त नकली JWT टोकन।
 * @returns {string} - टोकन से निकाली गई भूमिका।
 */
const decodeTokenAndExtractRole = (token) => {
  if (token.includes('user_token')) return 'ROLE_USER';
  if (token.includes('ngo_token')) return 'ROLE_NGO';
  if (token.includes('hospital_token')) return 'ROLE_HOSPITAL';
  return 'ROLE_UNKNOWN';
};

// API कॉल का अनुकरण (Mocking the API call)
const mockLoginApi = (intendedRole, username, password) => {
  // यहाँ आप वास्तव में Spring Boot API को कॉल करेंगे।
  // चूंकि हम केवल फ्रंटएंड लॉजिक का प्रदर्शन कर रहे हैं, हम हार्डकोड (hardcode) किए गए टोकन लौटाते हैं।
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // नकली सफलता, टोकन हमेशा क्रेडेंशियल के आधार पर सही रोल देता है
      if (username === 'user' && intendedRole === 'USER') {
        resolve({ token: 'jwt_user_token_1234', success: true });
      } else if (username === 'ngo' && intendedRole === 'NGO') {
        resolve({ token: 'jwt_ngo_token_5678', success: true });
      } else if (username === 'hospital' && intendedRole === 'HOSPITAL') {
        resolve({ token: 'jwt_hospital_token_9012', success: true });
      } else {
        // यदि यूजरनेम और रोल मैच नहीं होते हैं (गलत क्रेडेंशियल), तो API आमतौर पर 401 Unauthorized लौटाता है।
        reject({ message: 'Invalid Username or Password (API failure)' });
      }
    }, 1000);
  });
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ message: 'लॉगिन करने के लिए क्रेडेंशियल दर्ज करें।', type: 'info' });
  const [loading, setLoading] = useState(false);

  /**
   * मुख्य लॉगिन हैंडलर जो भूमिका को प्रतिबंधित करता है।
   * @param {string} intendedLoginType - फ्रंटएंड पर यह फॉर्म किस प्रकार के लॉगिन के लिए है ('USER', 'NGO', 'HOSPITAL')
   */
  const handleLogin = async (intendedLoginType) => {
    setStatus({ message: `लॉगिन किया जा रहा है... (${intendedLoginType})`, type: 'info' });
    setLoading(true);

    try {
      // 1. API कॉल (Spring Boot)
      const apiResponse = await mockLoginApi(intendedLoginType, username, password);
      
      const token = apiResponse.token;
      
      // 2. JWT से वास्तविक भूमिका (Actual Role) निकालें
      // API से रोल हमेशा 'ROLE_USER', 'ROLE_NGO' जैसे फॉर्मेट में आता है।
      const actualRole = decodeTokenAndExtractRole(token); 
      
      // 3. इच्छित भूमिका के साथ वास्तविक भूमिका की जाँच करें (THE CRUCIAL CHECK)
      // उदाहरण: यदि फॉर्म NGO का है (Intended: ROLE_NGO) लेकिन टोकन USER का देता है (Actual: ROLE_USER)।
      if (actualRole === `ROLE_${intendedLoginType}`) {
        // ✅ सफलता: भूमिका मैच करती है।
        setStatus({ message: `सफलतापूर्वक लॉग इन! आप एक ${intendedLoginType} हैं।`, type: 'success' });
        // यहाँ यूजर को डैशबोर्ड पर भेजें: navigate(`/${intendedLoginType.toLowerCase()}-dashboard`);
        localStorage.setItem('jwtToken', token);
      } else {
        // ❌ विफलता: भूमिका मेल नहीं खाती।
        const errorMessage = `प्रवेश निषेध (Access Denied)! यह पोर्टल ${intendedLoginType} के लिए है, लेकिन आपके खाते की भूमिका ${actualRole.replace('ROLE_', '')} है।`;
        setStatus({ message: errorMessage, type: 'error' });
        // IMPORTANT: टोकन को स्टोर न करें, भले ही यह वैध हो
      }
      
    } catch (error) {
      // API विफल (गलत क्रेडेंशियल)
      setStatus({ message: error.message || 'लॉगिन विफल। यूजरनेम या पासवर्ड गलत है।', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    info: 'bg-blue-100 text-blue-800 border-blue-400',
    success: 'bg-green-100 text-green-800 border-green-400',
    error: 'bg-red-100 text-red-800 border-red-400',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          भूमिका-प्रतिबंधित लॉगिन डेमो
        </h1>
        <p className="text-center text-gray-500">
          अपने क्रेडेंशियल के रूप में **'user', 'ngo', या 'hospital'** का उपयोग करें। पासवर्ड कुछ भी हो सकता है।
        </p>

        {/* Status Message */}
        {status.message && (
          <div className={`p-4 rounded-lg border-l-4 font-medium ${statusColors[status.type]}`}>
            {status.message}
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">यूजरनेम (Username)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="user / ngo / hospital"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">पासवर्ड (Password)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="कोई भी पासवर्ड"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Login Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <button
            onClick={() => handleLogin('USER')}
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-50"
          >
            {loading && status.message.includes('(USER)') ? 'प्रवेश हो रहा...' : 'User Login (USER)'}
          </button>
          
          <button
            onClick={() => handleLogin('NGO')}
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
          >
            {loading && status.message.includes('(NGO)') ? 'प्रवेश हो रहा...' : 'NGO Login (NGO)'}
          </button>
          
          <button
            onClick={() => handleLogin('HOSPITAL')}
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out disabled:opacity-50"
          >
            {loading && status.message.includes('(HOSPITAL)') ? 'प्रवेश हो रहा...' : 'Hospital Login (HOSPITAL)'}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 font-semibold">जाँच के लिए उदाहरण:</p>
          <ul className="text-xs text-gray-500 list-disc list-inside space-y-1 mt-2">
            <li>**सही लॉगिन:** User नाम से 'User Login' पर क्लिक करें। (सफल होगा)</li>
            <li>**गलत पोर्टल:** User नाम से 'NGO Login' पर क्लिक करें। (<span className="text-red-600 font-bold">ब्लॉक हो जाएगा</span> क्योंकि भूमिका USER है, NGO नहीं)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;