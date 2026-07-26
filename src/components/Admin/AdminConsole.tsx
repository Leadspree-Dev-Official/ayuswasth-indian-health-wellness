import React, { useState } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Recipe, Herb, YogaPose, DinacharyaItem, OrderInquiry } from '../../types';
import {
  Key,
  Lock,
  Unlock,
  Building2,
  PackageCheck,
  FileEdit,
  Settings,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Check,
  X,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Palette,
  ArrowLeft,
  Filter,
  DollarSign,
  User,
  ShoppingBag
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    recipes,
    updateRecipe,
    addRecipe,
    deleteRecipe,
    herbs,
    updateHerb,
    addHerb,
    deleteHerb,
    yogaPoses,
    updateYogaPose,
    addYogaPose,
    deleteYogaPose,
    dinacharyaItems,
    updateDinacharyaItem,
    addDinacharyaItem,
    deleteDinacharyaItem,
    resetDemoData,
    setActiveTab,
    showToast,
  } = useBrand();

  // Authentication State
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Active Admin Sub-Tab
  const [adminTab, setAdminTab] = useState<'orders' | 'content' | 'settings' | 'session'>('orders');

  // Content Sub-Tab
  const [contentType, setContentType] = useState<'recipes' | 'herbs' | 'yoga' | 'dinacharya'>('recipes');

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Edit Modal States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Login Form Submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === siteSettings.adminPin || pinInput === '1234') {
      setIsAuthenticated(true);
      setLoginError(false);
      showToast('🔑 Welcome to Executive Admin Console');
    } else {
      setLoginError(true);
    }
  };

  // Simulate Test Lead / Order
  const handleSimulateOrder = () => {
    const types: OrderInquiry['type'][] = ['Meal Plan Request', 'Herb Order', 'Consultation Lead', 'Prakriti Assessment'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const names = ['Anita Roy', 'Vikramaditya Rao', 'Meera Kulkarni', 'Siddharth Sen', 'Kavita Iyer'];
    const randomName = names[Math.floor(Math.random() * names.length)];

    addOrder({
      customerName: randomName,
      businessName: `${randomName.split(' ')[0]} Wellness`,
      phone: `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`,
      address: 'Koramangala, Bengaluru, KA',
      type: randomType,
      details: `Inquiry regarding custom ${randomType.toLowerCase()} & Ayurvedic consultation`,
      amount: `₹${Math.floor(10 + Math.random() * 50) * 100}`,
      status: 'New',
      notes: 'Lead received via website inquiry form',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-stone-900 text-stone-100">
        <div className="w-full max-w-md bg-stone-950 p-8 rounded-3xl border border-amber-800/40 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-900/60 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-300">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Restricted Access</span>
            <h2 className="text-2xl font-serif font-bold text-white">Executive Admin Console</h2>
            <p className="text-xs text-stone-400">
              Enter your security PIN code to manage live content, orders, and site settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span>Admin Security PIN</span>
                <span className="text-[10px] text-amber-400 font-normal">Default PIN: 1234</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Enter 4-digit PIN"
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white text-center font-mono text-lg tracking-widest focus:outline-none focus:border-amber-500"
                />
                <Key className="w-5 h-5 text-stone-500 absolute left-3 top-3.5" />
              </div>
              {loginError && (
                <p className="text-xs text-red-400 font-medium pt-1">
                  ❌ Invalid PIN code. Default PIN is <strong>1234</strong>.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              Unlock Admin Console
            </button>
          </form>

          <button
            onClick={() => setActiveTab('home')}
            className="text-xs text-stone-400 hover:text-stone-200 transition-colors flex items-center justify-center gap-1.5 mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 p-4 sm:p-8 space-y-8">
      
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto bg-stone-900 rounded-3xl p-6 border border-amber-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-800/80 text-amber-200 flex items-center justify-center text-xl font-serif font-bold border border-amber-600/40">
            ॐ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-white">Executive Admin Console</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                LIVE ADMIN MODE
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Managing content, order leads, and global configuration for {siteSettings.defaultBusinessName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            Back to Public View
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4" />
            Lock Admin
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setAdminTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            adminTab === 'orders'
              ? 'bg-amber-400 text-stone-950 shadow-md'
              : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          Order & Inquiry Tracker ({orders.length})
        </button>

        <button
          onClick={() => setAdminTab('content')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            adminTab === 'content'
              ? 'bg-amber-400 text-stone-950 shadow-md'
              : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          Live Content Editor
        </button>

        <button
          onClick={() => setAdminTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            adminTab === 'settings'
              ? 'bg-amber-400 text-stone-950 shadow-md'
              : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          Global Site Settings
        </button>

        <button
          onClick={() => setAdminTab('session')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            adminTab === 'session'
              ? 'bg-amber-400 text-stone-950 shadow-md'
              : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Reset & Session Manager
        </button>
      </div>

      {/* SECTION 1: ORDER & INQUIRY TRACKER */}
      {adminTab === 'orders' && (
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-900 p-5 rounded-2xl border border-stone-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Filter Status:</span>
              <div className="flex items-center gap-1">
                {['All', 'New', 'Confirmed', 'Out for Delivery', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      orderStatusFilter === status
                        ? 'bg-amber-800 text-white'
                        : 'bg-stone-950 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSimulateOrder}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Simulate New Incoming Order / Lead
            </button>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders
              .filter((o) => orderStatusFilter === 'All' || o.status === orderStatusFilter)
              .map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-4 hover:border-amber-800/60 transition-all"
                >
                  <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-amber-400 font-bold">{order.id}</span>
                        <span className="text-xs font-semibold text-stone-300">• {order.type}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-white mt-1">{order.customerName}</h3>
                      <p className="text-xs text-amber-200 font-medium">{order.businessName}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderInquiry['status'])}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                          order.status === 'New'
                            ? 'bg-amber-950 text-amber-300 border-amber-700'
                            : order.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : order.status === 'Out for Delivery'
                            ? 'bg-purple-950 text-purple-300 border-purple-700'
                            : 'bg-stone-800 text-stone-300 border-stone-700'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <span className="text-[10px] text-stone-500">{order.createdAt}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed bg-stone-950 p-3 rounded-xl border border-stone-800/80">
                    {order.details}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{order.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400 text-sm">Value: {order.amount}</span>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      )}

      {/* SECTION 2: LIVE CONTENT EDITOR */}
      {adminTab === 'content' && (
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Content Sub-Tabs & Add Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-900 p-5 rounded-2xl border border-stone-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setContentType('recipes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  contentType === 'recipes' ? 'bg-amber-800 text-white' : 'bg-stone-950 text-stone-400'
                }`}
              >
                Sattvic Recipes ({recipes.length})
              </button>
              <button
                onClick={() => setContentType('herbs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  contentType === 'herbs' ? 'bg-amber-800 text-white' : 'bg-stone-950 text-stone-400'
                }`}
              >
                Classical Herbs ({herbs.length})
              </button>
              <button
                onClick={() => setContentType('yoga')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  contentType === 'yoga' ? 'bg-amber-800 text-white' : 'bg-stone-950 text-stone-400'
                }`}
              >
                Yoga & Pranayama ({yogaPoses.length})
              </button>
              <button
                onClick={() => setContentType('dinacharya')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  contentType === 'dinacharya' ? 'bg-amber-800 text-white' : 'bg-stone-950 text-stone-400'
                }`}
              >
                Dinacharya Routines ({dinacharyaItems.length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Render Content Lists */}
          {contentType === 'recipes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes
                .filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((recipe) => (
                  <div key={recipe.id} className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-36 object-cover rounded-xl" />
                    <div className="flex items-center justify-between text-xs text-amber-400">
                      <span>{recipe.category}</span>
                      <span>Prep: {recipe.prepTime}</span>
                    </div>
                    <h3 className="font-serif font-bold text-white text-base">{recipe.title}</h3>
                    <p className="text-xs text-stone-400 line-clamp-2">{recipe.description}</p>
                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400">{recipe.calories} kcal</span>
                      <button
                        onClick={() => deleteRecipe(recipe.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {contentType === 'herbs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {herbs
                .filter((h) => h.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((herb) => (
                  <div key={herb.id} className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3">
                    <img src={herb.image} alt={herb.name} className="w-full h-36 object-cover rounded-xl" />
                    <div className="flex items-center justify-between text-xs text-amber-400">
                      <span className="font-serif italic">{herb.sanskritName}</span>
                      <span>{herb.doshaImpact}</span>
                    </div>
                    <h3 className="font-serif font-bold text-white text-base">{herb.name}</h3>
                    <p className="text-xs text-stone-400 line-clamp-2">{herb.primaryBenefit}</p>
                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-300">Taste: {herb.rasa}</span>
                      <button
                        onClick={() => deleteHerb(herb.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {contentType === 'yoga' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {yogaPoses
                .filter((y) => y.englishName.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((pose) => (
                  <div key={pose.id} className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3">
                    <img src={pose.image} alt={pose.englishName} className="w-full h-36 object-cover rounded-xl" />
                    <div className="flex items-center justify-between text-xs text-amber-400">
                      <span className="font-serif italic">{pose.sanskritName}</span>
                      <span>{pose.category}</span>
                    </div>
                    <h3 className="font-serif font-bold text-white text-base">{pose.englishName}</h3>
                    <p className="text-xs text-stone-400 line-clamp-2">{pose.benefits.join(', ')}</p>
                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400">{pose.difficulty}</span>
                      <button
                        onClick={() => deleteYogaPose(pose.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {contentType === 'dinacharya' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dinacharyaItems
                .filter((d) => d.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item) => (
                  <div key={item.id} className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-amber-400">
                      <span className="font-mono">{item.timeSlot}</span>
                      <span className="font-bold">{item.category}</span>
                    </div>
                    <h3 className="font-serif font-bold text-white text-base">{item.englishTitle}</h3>
                    <p className="text-xs text-stone-400 line-clamp-2">{item.description}</p>
                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                      <span className="text-[11px] italic text-amber-300">{item.sanskritTitle}</span>
                      <button
                        onClick={() => deleteDinacharyaItem(item.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

        </div>
      )}

      {/* SECTION 3: SITE SETTINGS */}
      {adminTab === 'settings' && (
        <div className="max-w-3xl mx-auto bg-stone-900 p-8 rounded-3xl border border-stone-800 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <h2 className="text-xl font-serif font-bold text-white">Global Site & Branding Settings</h2>
            <p className="text-xs text-stone-400">
              Configure baseline defaults for brand profile, support contacts, and security.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              updateSiteSettings({
                defaultBusinessName: formData.get('businessName') as string,
                defaultContactName: formData.get('contactName') as string,
                defaultPhone: formData.get('phone') as string,
                defaultAddress: formData.get('address') as string,
                supportEmail: formData.get('email') as string,
                adminPin: formData.get('adminPin') as string,
              });
            }}
            className="space-y-4 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Default Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  defaultValue={siteSettings.defaultBusinessName}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Default Contact Doctor / Name</label>
                <input
                  type="text"
                  name="contactName"
                  defaultValue={siteSettings.defaultContactName}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Default Contact Phone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={siteSettings.defaultPhone}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Support Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={siteSettings.supportEmail}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-semibold text-stone-300">Default Business Address</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={siteSettings.defaultAddress}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-stone-300">Admin Lock PIN Code</label>
                <input
                  type="text"
                  name="adminPin"
                  defaultValue={siteSettings.adminPin}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Save Global Settings
            </button>
          </form>
        </div>
      )}

      {/* SECTION 4: RESET & SESSION MANAGER */}
      {adminTab === 'session' && (
        <div className="max-w-2xl mx-auto bg-stone-900 p-8 rounded-3xl border border-amber-800/40 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-950 border border-amber-700/50 flex items-center justify-center mx-auto text-amber-400">
            <RotateCcw className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-white">Session Cache & Demo Reset</h2>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md mx-auto">
              Clear saved visitor profiles, custom recipe overrides, order histories, and revert the entire application back to its clean initial defaults.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-1 text-left">
            <span className="font-bold text-amber-400 block">Actions performed on reset:</span>
            <ul className="list-disc list-inside space-y-1 text-stone-400">
              <li>Flushes visitor brand customization (`localStorage`)</li>
              <li>Restores 3-hour session policy countdown timer</li>
              <li>Reverts recipes, herbs, yoga poses, and dinacharya habits to original data</li>
              <li>Resets sample order leads to default state</li>
            </ul>
          </div>

          <button
            onClick={resetDemoData}
            className="w-full py-4 rounded-2xl bg-red-900/80 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-all border border-red-700 shadow-md"
          >
            Flush Session Cache & Revert All Demo Data
          </button>
        </div>
      )}

    </div>
  );
};
