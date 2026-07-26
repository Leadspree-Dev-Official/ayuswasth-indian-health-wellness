import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrandProfile, OrderInquiry, SiteSettings, Recipe, Herb, YogaPose, DinacharyaItem } from '../types';
import { applyBrandColor, decodeDemoToken, SESSION_DURATION_MS } from '../utils/brandUtils';
import { indianRecipes } from '../data/recipes';
import { herbsData } from '../data/herbsData';
import { yogaPoses } from '../data/yogaData';
import { initialDinacharyaItems } from '../data/dinacharyaData';

const DEFAULT_SETTINGS: SiteSettings = {
  defaultBusinessName: 'AyuSwasth Ayurveda',
  defaultContactName: 'Dr. Ananda Vaidya',
  defaultPhone: '+91 98765 43210',
  defaultAddress: 'AyurVeda Bhavan, MG Road, Bengaluru, Karnataka 560001',
  defaultPrimaryColor: '#92400e',
  supportEmail: 'care@ayuswasth.in',
  tagline: 'Modern Indian Health & Wellness',
  adminPin: '1234',
};

const INITIAL_ORDERS: OrderInquiry[] = [
  {
    id: 'ORD-101',
    customerName: 'Rohan Verma',
    businessName: 'Aura Wellness Spa',
    phone: '+91 98112 33445',
    address: 'Indiranagar, Bengaluru, KA',
    type: 'Meal Plan Request',
    details: '3-Day Sattvic Detox meal plan customization for 12 guests',
    amount: '₹4,500',
    status: 'New',
    createdAt: 'Today, 10:30 AM',
    notes: 'Requested extra ginger kadha on Day 2',
  },
  {
    id: 'ORD-102',
    customerName: 'Priya Sharma',
    businessName: 'Sattva Living Yoga',
    phone: '+91 97223 44556',
    address: 'Bandra West, Mumbai, MH',
    type: 'Herb Order',
    details: 'Bulk Organic Ashwagandha Root Powder & Triphala (5kg)',
    amount: '₹3,800',
    status: 'Confirmed',
    createdAt: 'Today, 09:15 AM',
    notes: 'Payment received via UPI',
  },
  {
    id: 'ORD-103',
    customerName: 'Dr. Arvind Patel',
    businessName: 'Patel Ayur Clinic',
    phone: '+91 98980 11223',
    address: 'Navrangpura, Ahmedabad, GJ',
    type: 'Consultation Lead',
    details: 'Specialized Pitta-pacifying dietary chart & herbs consultation',
    amount: '₹1,500',
    status: 'Out for Delivery',
    createdAt: 'Yesterday, 04:45 PM',
    notes: 'Courier dispatched via BlueDart',
  },
  {
    id: 'ORD-104',
    customerName: 'Sunita Reddy',
    businessName: 'Veda Care Center',
    phone: '+91 94401 99887',
    address: 'Jubilee Hills, Hyderabad, TS',
    type: 'Prakriti Assessment',
    details: 'Corporate Prakriti diagnostic workshop inquiry for 50 employees',
    amount: '₹15,000',
    status: 'Completed',
    createdAt: '2 days ago',
    notes: 'Workshop completed successfully',
  },
];

interface BrandContextType {
  brandProfile: BrandProfile;
  isCustomized: boolean;
  siteSettings: SiteSettings;
  orders: OrderInquiry[];
  recipes: Recipe[];
  herbs: Herb[];
  yogaPoses: YogaPose[];
  dinacharyaItems: DinacharyaItem[];
  isModalOpen: boolean;
  timeRemainingMs: number;
  toastMessage: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsModalOpen: (open: boolean) => void;
  updateBrandProfile: (profile: Partial<BrandProfile>) => void;
  resetBrandProfile: () => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  addOrder: (order: Omit<OrderInquiry, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: OrderInquiry['status'], notes?: string) => void;
  deleteOrder: (id: string) => void;
  updateRecipe: (recipe: Recipe) => void;
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  updateHerb: (herb: Herb) => void;
  addHerb: (herb: Herb) => void;
  deleteHerb: (id: string) => void;
  updateYogaPose: (pose: YogaPose) => void;
  addYogaPose: (pose: YogaPose) => void;
  deleteYogaPose: (id: string) => void;
  updateDinacharyaItem: (item: DinacharyaItem) => void;
  addDinacharyaItem: (item: DinacharyaItem) => void;
  deleteDinacharyaItem: (id: string) => void;
  resetDemoData: () => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('ayuswasth_site_settings');
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [brandProfile, setBrandProfile] = useState<BrandProfile>(() => {
    return {
      businessName: DEFAULT_SETTINGS.defaultBusinessName,
      contactName: DEFAULT_SETTINGS.defaultContactName,
      phone: DEFAULT_SETTINGS.defaultPhone,
      address: DEFAULT_SETTINGS.defaultAddress,
      primaryColor: DEFAULT_SETTINGS.defaultPrimaryColor,
      submittedAt: 0,
    };
  });

  const [isCustomized, setIsCustomized] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [timeRemainingMs, setTimeRemainingMs] = useState<number>(SESSION_DURATION_MS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Orders State
  const [orders, setOrders] = useState<OrderInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('ayuswasth_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // Custom Content States
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem('ayuswasth_recipes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return indianRecipes;
  });

  const [herbs, setHerbs] = useState<Herb[]>(() => {
    try {
      const saved = localStorage.getItem('ayuswasth_herbs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return herbsData;
  });

  const [yoga, setYoga] = useState<YogaPose[]>(() => {
    try {
      const saved = localStorage.getItem('ayuswasth_yoga');
      if (saved) return JSON.parse(saved);
    } catch {}
    return yogaPoses;
  });

  const [dinacharya, setDinacharya] = useState<DinacharyaItem[]>(() => {
    try {
      const saved = localStorage.getItem('ayuswasth_dinacharya');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialDinacharyaItems;
  });


  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  // Check URL Token / LocalStorage on Mount
  useEffect(() => {
    let loadedProfile: BrandProfile | null = null;
    let fromUrl = false;

    // 1. Check URL for ?token=... or ?demo=...
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token') || searchParams.get('demo');
      if (token) {
        const decoded = decodeDemoToken(token);
        if (decoded && decoded.businessName) {
          loadedProfile = {
            businessName: decoded.businessName || siteSettings.defaultBusinessName,
            contactName: decoded.contactName || siteSettings.defaultContactName,
            phone: decoded.phone || siteSettings.defaultPhone,
            address: decoded.address || siteSettings.defaultAddress,
            primaryColor: decoded.primaryColor || siteSettings.defaultPrimaryColor,
            submittedAt: Date.now(),
          };
          fromUrl = true;
        }
      }
    }

    // 2. If not from URL, check localStorage
    if (!loadedProfile) {
      try {
        const saved = localStorage.getItem('ayuswasth_brand_profile');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.submittedAt) {
            const elapsed = Date.now() - parsed.submittedAt;
            if (elapsed >= SESSION_DURATION_MS) {
              // 3 hours expired!
              localStorage.removeItem('ayuswasth_brand_profile');
              showToast('🕒 3 hours completed! Your form was reset automatically. Please enter your details.');
              setIsModalOpen(true);
            } else {
              loadedProfile = parsed;
            }
          }
        }
      } catch {}
    }

    if (loadedProfile) {
      setBrandProfile(loadedProfile);
      setIsCustomized(true);
      applyBrandColor(loadedProfile.primaryColor);
      if (fromUrl) {
        try {
          localStorage.setItem('ayuswasth_brand_profile', JSON.stringify(loadedProfile));
          showToast(`✨ Loaded personalized demo for ${loadedProfile.businessName}`);
        } catch {}
      }
    } else {
      // No active submission - Open modal on visit/refresh!
      setIsModalOpen(true);
      applyBrandColor(siteSettings.defaultPrimaryColor);
    }
  }, []);

  // 3-Hour Auto-Reset Background Polling & Live Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (brandProfile.submittedAt > 0) {
        const elapsed = Date.now() - brandProfile.submittedAt;
        const remaining = SESSION_DURATION_MS - elapsed;

        if (remaining <= 0) {
          // Auto reset!
          localStorage.removeItem('ayuswasth_brand_profile');
          setBrandProfile({
            businessName: siteSettings.defaultBusinessName,
            contactName: siteSettings.defaultContactName,
            phone: siteSettings.defaultPhone,
            address: siteSettings.defaultAddress,
            primaryColor: siteSettings.defaultPrimaryColor,
            submittedAt: 0,
          });
          setIsCustomized(false);
          setTimeRemainingMs(0);
          applyBrandColor(siteSettings.defaultPrimaryColor);
          showToast('🕒 3 hours completed! Your form was reset automatically. Please enter your details.');
          setIsModalOpen(true);
        } else {
          setTimeRemainingMs(remaining);
        }
      } else {
        setTimeRemainingMs(SESSION_DURATION_MS);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [brandProfile, siteSettings]);

  // Actions
  const updateBrandProfile = (newFields: Partial<BrandProfile>) => {
    const updated: BrandProfile = {
      ...brandProfile,
      ...newFields,
      submittedAt: Date.now(),
    };
    setBrandProfile(updated);
    setIsCustomized(true);
    applyBrandColor(updated.primaryColor);
    try {
      localStorage.setItem('ayuswasth_brand_profile', JSON.stringify(updated));
    } catch {}
    showToast(`✅ Brand customized for "${updated.businessName}"`);
  };

  const resetBrandProfile = () => {
    localStorage.removeItem('ayuswasth_brand_profile');
    const resetProf: BrandProfile = {
      businessName: siteSettings.defaultBusinessName,
      contactName: siteSettings.defaultContactName,
      phone: siteSettings.defaultPhone,
      address: siteSettings.defaultAddress,
      primaryColor: siteSettings.defaultPrimaryColor,
      submittedAt: 0,
    };
    setBrandProfile(resetProf);
    setIsCustomized(false);
    setTimeRemainingMs(SESSION_DURATION_MS);
    applyBrandColor(siteSettings.defaultPrimaryColor);
    showToast('🔄 Brand profile reset to defaults');
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...newSettings };
    setSiteSettings(updated);
    try {
      localStorage.setItem('ayuswasth_site_settings', JSON.stringify(updated));
    } catch {}
    if (!isCustomized) {
      applyBrandColor(updated.defaultPrimaryColor);
      setBrandProfile((prev) => ({
        ...prev,
        businessName: updated.defaultBusinessName,
        contactName: updated.defaultContactName,
        phone: updated.defaultPhone,
        address: updated.defaultAddress,
        primaryColor: updated.defaultPrimaryColor,
      }));
    }
    showToast('⚙️ Site settings saved globally');
  };

  // Orders Actions
  const addOrder = (orderData: Omit<OrderInquiry, 'id' | 'createdAt'>) => {
    const newOrd: OrderInquiry = {
      ...orderData,
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: 'Just now',
    };
    const updated = [newOrd, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('ayuswasth_orders', JSON.stringify(updated));
    } catch {}
    showToast(`📦 New order logged for ${orderData.customerName}`);
  };

  const updateOrderStatus = (id: string, status: OrderInquiry['status'], notes?: string) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status, notes: notes !== undefined ? notes : o.notes } : o));
    setOrders(updated);
    try {
      localStorage.setItem('ayuswasth_orders', JSON.stringify(updated));
    } catch {}
    showToast(`Order ${id} updated to ${status}`);
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    try {
      localStorage.setItem('ayuswasth_orders', JSON.stringify(updated));
    } catch {}
    showToast(`Order ${id} deleted`);
  };

  // Content Actions
  const updateRecipe = (updated: Recipe) => {
    const next = recipes.map((r) => (r.id === updated.id ? updated : r));
    setRecipes(next);
    localStorage.setItem('ayuswasth_recipes', JSON.stringify(next));
    showToast(`Recipe "${updated.title}" updated!`);
  };

  const addRecipe = (newRecipe: Recipe) => {
    const next = [newRecipe, ...recipes];
    setRecipes(next);
    localStorage.setItem('ayuswasth_recipes', JSON.stringify(next));
    showToast(`Recipe "${newRecipe.title}" added!`);
  };

  const deleteRecipe = (id: string) => {
    const next = recipes.filter((r) => r.id !== id);
    setRecipes(next);
    localStorage.setItem('ayuswasth_recipes', JSON.stringify(next));
    showToast(`Recipe removed`);
  };

  const updateHerb = (updated: Herb) => {
    const next = herbs.map((h) => (h.id === updated.id ? updated : h));
    setHerbs(next);
    localStorage.setItem('ayuswasth_herbs', JSON.stringify(next));
    showToast(`Herb "${updated.name}" updated!`);
  };

  const addHerb = (newHerb: Herb) => {
    const next = [newHerb, ...herbs];
    setHerbs(next);
    localStorage.setItem('ayuswasth_herbs', JSON.stringify(next));
    showToast(`Herb "${newHerb.name}" added!`);
  };

  const deleteHerb = (id: string) => {
    const next = herbs.filter((h) => h.id !== id);
    setHerbs(next);
    localStorage.setItem('ayuswasth_herbs', JSON.stringify(next));
    showToast(`Herb removed`);
  };

  const updateYogaPose = (updated: YogaPose) => {
    const next = yoga.map((y) => (y.id === updated.id ? updated : y));
    setYoga(next);
    localStorage.setItem('ayuswasth_yoga', JSON.stringify(next));
    showToast(`Yoga pose updated!`);
  };

  const addYogaPose = (newPose: YogaPose) => {
    const next = [newPose, ...yoga];
    setYoga(next);
    localStorage.setItem('ayuswasth_yoga', JSON.stringify(next));
    showToast(`Yoga pose added!`);
  };

  const deleteYogaPose = (id: string) => {
    const next = yoga.filter((y) => y.id !== id);
    setYoga(next);
    localStorage.setItem('ayuswasth_yoga', JSON.stringify(next));
    showToast(`Yoga pose removed`);
  };

  const updateDinacharyaItem = (updated: DinacharyaItem) => {
    const next = dinacharya.map((d) => (d.id === updated.id ? updated : d));
    setDinacharya(next);
    localStorage.setItem('ayuswasth_dinacharya', JSON.stringify(next));
    showToast(`Dinacharya item updated!`);
  };

  const addDinacharyaItem = (newItem: DinacharyaItem) => {
    const next = [newItem, ...dinacharya];
    setDinacharya(next);
    localStorage.setItem('ayuswasth_dinacharya', JSON.stringify(next));
    showToast(`Dinacharya item added!`);
  };

  const deleteDinacharyaItem = (id: string) => {
    const next = dinacharya.filter((d) => d.id !== id);
    setDinacharya(next);
    localStorage.setItem('ayuswasth_dinacharya', JSON.stringify(next));
    showToast(`Dinacharya item removed`);
  };

  const resetDemoData = () => {
    localStorage.removeItem('ayuswasth_brand_profile');
    localStorage.removeItem('ayuswasth_site_settings');
    localStorage.removeItem('ayuswasth_orders');
    localStorage.removeItem('ayuswasth_recipes');
    localStorage.removeItem('ayuswasth_herbs');
    localStorage.removeItem('ayuswasth_yoga');
    localStorage.removeItem('ayuswasth_dinacharya');

    setSiteSettings(DEFAULT_SETTINGS);
    setBrandProfile({
      businessName: DEFAULT_SETTINGS.defaultBusinessName,
      contactName: DEFAULT_SETTINGS.defaultContactName,
      phone: DEFAULT_SETTINGS.defaultPhone,
      address: DEFAULT_SETTINGS.defaultAddress,
      primaryColor: DEFAULT_SETTINGS.defaultPrimaryColor,
      submittedAt: 0,
    });
    setIsCustomized(false);
    setOrders(INITIAL_ORDERS);
    setRecipes(indianRecipes);
    setHerbs(herbsData);
    setYoga(yogaPoses);
    setDinacharya(initialDinacharyaItems);
    applyBrandColor(DEFAULT_SETTINGS.defaultPrimaryColor);
    showToast('🔄 Demo data and session cache reset to defaults!');
  };

  return (
    <BrandContext.Provider
      value={{
        brandProfile,
        isCustomized,
        siteSettings,
        orders,
        recipes,
        herbs,
        yogaPoses: yoga,
        dinacharyaItems: dinacharya,
        isModalOpen,
        timeRemainingMs,
        toastMessage,
        activeTab,
        setActiveTab,
        setIsModalOpen,
        updateBrandProfile,
        resetBrandProfile,
        updateSiteSettings,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        updateRecipe,
        addRecipe,
        deleteRecipe,
        updateHerb,
        addHerb,
        deleteHerb,
        updateYogaPose,
        addYogaPose,
        deleteYogaPose,
        updateDinacharyaItem,
        addDinacharyaItem,
        deleteDinacharyaItem,
        resetDemoData,
        showToast,
        hideToast,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
