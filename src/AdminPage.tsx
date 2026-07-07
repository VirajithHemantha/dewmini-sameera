import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (!guestName.trim()) return;
    
    // Construct the URL. We use window.location.origin to get the base URL.
    const baseUrl = window.location.origin;
    const url = new URL(baseUrl);
    
    // We add prefix and guestName as query params
    if (prefix) {
      url.searchParams.set('prefix', prefix);
    }
    url.searchParams.set('guest', guestName.trim());
    
    setGeneratedLink(url.toString());
  };

  const copyLinkOnly = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Link copied to clipboard!');
    }
  };

  const fullMessage = generatedLink ? `Dear ${prefix ? prefix + ' ' : ''}${guestName.trim()} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Dewmini & Sameera` : '';

  const copyFullMessage = () => {
    if (fullMessage) {
      navigator.clipboard.writeText(fullMessage);
      alert('Full message copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] font-montserrat p-6 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white p-8 rounded-[2rem] shadow-xl border border-theme-200"
      >
        <h1 className="font-cinzel text-3xl text-center text-theme-900 mb-8 font-bold">Wedding Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-500 ml-1">Prefix</label>
            <select 
              value={prefix} 
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full border-b-2 border-theme-200 py-3 px-2 bg-transparent focus:outline-none focus:border-theme-500 font-cinzel text-lg"
            >
              <option value="">No Prefix</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dear">Dear</option>
              <option value="Miss">Miss</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-stone-500 ml-1">Guest Name</label>
            <input 
              type="text" 
              value={guestName} 
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sanjaya"
              className="w-full border-b-2 border-theme-200 py-3 px-2 bg-transparent focus:outline-none focus:border-theme-500 font-cinzel text-lg"
            />
          </div>

          <div className="pt-6">
            <button 
              onClick={generateLink}
              disabled={!guestName.trim()}
              className="w-full bg-theme-800 text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-theme-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Link
            </button>
          </div>

          {generatedLink && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-6 space-y-4"
            >
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-sm whitespace-pre-wrap font-sans text-stone-600 max-h-64 overflow-y-auto">
                {fullMessage}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={copyLinkOnly}
                  className="flex-1 bg-stone-200 text-stone-800 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-stone-300 transition-colors"
                >
                  Copy Link Only
                </button>
                <button 
                  onClick={copyFullMessage}
                  className="flex-1 bg-theme-600 text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-theme-700 transition-colors"
                >
                  Copy Full Message
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
