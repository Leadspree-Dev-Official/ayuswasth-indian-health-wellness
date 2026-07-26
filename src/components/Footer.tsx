import React from 'react';
import { HeartPulse, ShieldCheck, Key, Building2, Phone, MapPin, Palette } from 'lucide-react';
import { useBrand } from '../context/BrandContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuiz }) => {
  const { brandProfile, setIsModalOpen } = useBrand();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-serif font-bold text-xl">
                ॐ
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-wide">{brandProfile.businessName}</span>
            </div>
            <p className="text-xs text-stone-400 font-sans leading-relaxed max-w-sm">
              Empowering modern lives with authentic Ayurvedic diagnostic tools, Sattvic nutrition, Prana breathwork, and AI Vaidya wisdom.
            </p>

            <div className="text-xs text-stone-400 space-y-1 font-sans">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>{brandProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{brandProfile.address}</span>
              </div>
            </div>

            <div className="font-serif italic text-amber-200/90 text-sm p-4 rounded-2xl bg-amber-950/40 border border-amber-900/40">
              "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।"<br />
              <span className="text-[11px] text-stone-400 font-sans font-normal not-italic block mt-1">
                May all beings be happy. May all beings be free from suffering and illness.
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">Quick Exploration</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={onOpenQuiz} className="hover:text-amber-300 transition-colors">
                  Prakriti Diagnostic Assessment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('aahar')} className="hover:text-amber-300 transition-colors">
                  Sattvic Recipe Vault & AI Meal Plan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('yoga')} className="hover:text-amber-300 transition-colors">
                  Yog Asana & Pranayama Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dravyaguna')} className="hover:text-amber-300 transition-colors">
                  Herbal Directory & Ask Vaidya AI
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dinacharya')} className="hover:text-amber-300 transition-colors">
                  Daily Dinacharya Routine Tracker
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-amber-300 transition-colors text-amber-400 font-bold flex items-center gap-1.5"
                >
                  <Palette className="w-3.5 h-3.5" />
                  🎨 Design Your Brand Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="hover:text-amber-300 transition-colors text-stone-400 font-bold flex items-center gap-1.5"
                >
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  🔑 Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Medical Disclaimer */}
          <div className="md:col-span-4 space-y-3 p-5 rounded-2xl bg-stone-900 border border-stone-800 text-xs">
            <h4 className="font-serif font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Ayurvedic Wellness Disclaimer
            </h4>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              {brandProfile.businessName} provides educational and lifestyle guidance based on traditional Indian Ayurvedic principles. Content and AI responses are for wellness support only and should not be considered formal medical advice, diagnosis, or treatment. Always consult a licensed healthcare practitioner for medical concerns.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <span>© {new Date().getFullYear()} {brandProfile.businessName}. Crafted for Indian Health & Wellness.</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('admin')}
              className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-bold"
            >
              <Key className="w-3 h-3 text-amber-500" />
              🔑 Admin Console
            </button>
            <span>Sattvic • Ayurvedic • AI-Enhanced</span>
          </div>
        </div>

        <div className="pt-4 text-center text-xs text-stone-500">
          <p>
            Developer: <span className="font-semibold">Aniruddha Das</span> | Developed by{" "}
            <a href="https://leadspree.in" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
              LeadSpree Business Solutions
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

