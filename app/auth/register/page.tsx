'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { registerUser } from '@/lib/auth'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'
import { 
  Upload, ShieldCheck, Store, MapPin, User, Mail, Lock, 
  Phone, Calendar, CreditCard, ChevronRight, ChevronLeft, 
  CheckCircle2, FileText, Eye, EyeOff, Briefcase, FileCheck
} from 'lucide-react'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')
  
  const [step, setStep] = useState(0) // 0: Role Selection, 1: Basic, 2: Identity, 3: Documents, 4: Confirm, 5: Security
  const [userType, setUserType] = useState<'buyer' | 'seller'>((typeParam as 'buyer' | 'seller') || 'buyer')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    password: '',
    confirmPassword: '',
    userType: userType,
    cnicNumber: '',
    phoneNumber: '',
    dob: '',
    shopName: '',
    shopLocation: '',
    businessType: 'Retail',
    shopLicense: '',
    documentsConfirmed: false,
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    if (typeParam === 'seller' || typeParam === 'buyer') {
      setUserType(typeParam)
      setFormData(prev => ({ ...prev, userType: typeParam }))
      setStep(1) // Skip role selection if type is in URL
    }
  }, [typeParam])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(prev => ({ ...prev, [name]: val }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required'
      if (!formData.lastName) newErrors.lastName = 'Last name is required'
      if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Valid email is required'
      if (!formData.address) newErrors.address = 'Address is required'
    } else if (step === 2) {
      if (!formData.cnicNumber) newErrors.cnicNumber = 'CNIC is required'
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
      if (!formData.dob) newErrors.dob = 'Date of birth is required'
    } else if (step === 3) {
      if (userType === 'seller') {
        if (!formData.shopName) newErrors.shopName = 'Shop name is required'
        if (!formData.shopLocation) newErrors.shopLocation = 'Shop location is required'
        if (!formData.businessType) newErrors.businessType = 'Business type is required'
        if (!formData.shopLicense) newErrors.shopLicense = 'Shop license is required'
      }
      // Documents validation would go here if we track uploads
    } else if (step === 4) {
      if (!formData.documentsConfirmed) newErrors.documentsConfirmed = 'You must confirm the information'
    } else if (step === 5) {
      if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (step === 0) {
      setStep(1)
      return
    }
    
    if (validateStep()) {
      setStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (step === 0) return
    setStep(prev => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return
    
    setLoading(true)
    setApiError('')
    
    try {
      const user = await registerUser(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName, 
        formData.userType
      )
      
      localStorage.setItem('user', JSON.stringify(user))
      window.dispatchEvent(new Event('storage'))
      
      if (user.role === 'seller') router.push('/vendor/dashboard')
      else router.push('/buyer/dashboard')
    } catch (error: any) {
      setApiError(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStepCount = () => {
    if (userType === 'seller') return 6 // 0: Role, 1: Basic, 2: Identity, 3: Shop, 4: Confirm, 5: Security
    return 6 // 0: Role, 1: Basic, 2: Identity, 3: Documents, 4: Confirm, 5: Security
  }

  const steps = [
    { id: 1, title: 'Basic Info', icon: <User size={18} /> },
    { id: 2, title: 'Identity', icon: <ShieldCheck size={18} /> },
    userType === 'seller' 
      ? { id: 3, title: 'Shop Info', icon: <Store size={18} /> }
      : { id: 3, title: 'Documents', icon: <FileText size={18} /> },
    { id: 4, title: 'Confirm', icon: <FileCheck size={18} /> },
    { id: 5, title: 'Security', icon: <Lock size={18} /> },
  ]

  if (step === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#111827] mb-4">Join FlexiBerry</h1>
          <p className="text-lg text-[#6b7280]">Choose how you want to use our platform</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card 
            className={`p-8 cursor-pointer transition-all duration-300 border-2 hover:shadow-2xl ${userType === 'buyer' ? 'border-[#6366f1] bg-indigo-50/30' : 'border-transparent hover:border-indigo-200'}`}
            onClick={() => {
              setUserType('buyer')
              setFormData(prev => ({ ...prev, userType: 'buyer' }))
            }}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${userType === 'buyer' ? 'bg-[#6366f1] text-white' : 'bg-indigo-100 text-[#6366f1]'}`}>
              <User size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mb-2">I am a Buyer</h3>
            <p className="text-[#6b7280] mb-6">Shop the best products with flexible installment plans and secure payments.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-[#4b5563]">
                <CheckCircle2 size={16} className="text-green-500" /> Browse thousands of products
              </li>
              <li className="flex items-center gap-2 text-sm text-[#4b5563]">
                <CheckCircle2 size={16} className="text-green-500" /> Flexible installment options
              </li>
              <li className="flex items-center gap-2 text-sm text-[#4b5563]">
                <CheckCircle2 size={16} className="text-green-500" /> Fast and secure checkout
              </li>
            </ul>
            <Button 
              className={`w-full h-12 rounded-xl font-bold ${userType === 'buyer' ? 'bg-[#6366f1] text-white' : 'bg-white border-2 border-[#e5e7eb] text-[#374151]'}`}
              onClick={nextStep}
            >
              Continue as Buyer
            </Button>
          </Card>

          <Card 
            className={`p-8 cursor-pointer transition-all duration-300 border-2 hover:shadow-2xl ${userType === 'seller' ? 'border-[#6366f1] bg-indigo-50/30' : 'border-transparent hover:border-indigo-200'}`}
            onClick={() => {
              setUserType('seller')
              setFormData(prev => ({ ...prev, userType: 'seller' }))
            }}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${userType === 'seller' ? 'bg-[#6366f1] text-white' : 'bg-indigo-100 text-[#6366f1]'}`}>
              <Store size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mb-2">I am a Vendor</h3>
            <p className="text-[#6b7280] mb-6">Grow your business by selling to thousands of customers on our platform.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-[#4b5563]">
                <CheckCircle2 size={16} className="text-green-500" /> Reach more customers
              </li>
              <li className="flex items-center gap-2 text-sm text-[#4b5563]">
                <CheckCircle2 size={16} className="text-green-500" /> Manage orders efficiently
              </li>
              <li className="flex items-center gap-2 text-sm text-[#4b5563]">
                <CheckCircle2 size={16} className="text-green-500" /> Secure payment processing
              </li>
            </ul>
            <Button 
              className={`w-full h-12 rounded-xl font-bold ${userType === 'seller' ? 'bg-[#6366f1] text-white' : 'bg-white border-2 border-[#e5e7eb] text-[#374151]'}`}
              onClick={nextStep}
            >
              Continue as Vendor
            </Button>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-[#6b7280]">
            Already have an account? <Link href="/auth/login" className="text-[#6366f1] font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#e5e7eb] -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-[#6366f1] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((steps.findIndex(s => s.id === step)) / (steps.length - 1)) * 100}%` }}
          ></div>
          {steps.map((s, idx) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                step >= s.id ? 'bg-[#6366f1] text-white shadow-lg shadow-indigo-200' : 'bg-white border-2 border-[#e5e7eb] text-[#9ca3af]'
              }`}>
                {step > s.id ? <CheckCircle2 size={20} /> : s.icon}
              </div>
              <span className={`text-[11px] font-bold mt-2 uppercase tracking-wider ${step >= s.id ? 'text-[#6366f1]' : 'text-[#9ca3af]'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#111827] mb-1">
                {userType === 'buyer' ? 'Buyer Sign Up' : 'Vendor Sign Up'}
              </h2>
              <p className="text-lg font-bold text-[#6366f1] mb-4">Basic Information</p>
              <p className="text-[#6b7280]">Tell us who you are to get started</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">First Name</label>
                <div className="relative">
                  <Input name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10" />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Last Name</label>
                <div className="relative">
                  <Input name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10" />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.lastName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.lastName}</p>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Email Address</label>
                <div className="relative">
                  <Input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10" />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Physical Address</label>
                <div className="relative">
                  <Input name="address" placeholder="House #, Street, City, Pakistan" value={formData.address} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10" />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Identity Info */}
        {step === 2 && (
          <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#111827] mb-1">
                {userType === 'buyer' ? 'Buyer Sign Up' : 'Vendor Sign Up'}
              </h2>
              <p className="text-lg font-bold text-[#6366f1] mb-4">Identity Information</p>
              <p className="text-[#6b7280]">Secure your account with official identification</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">ID Card Number (CNIC)</label>
                <div className="relative">
                  <Input name="cnicNumber" placeholder="12345-1234567-1" value={formData.cnicNumber} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.cnicNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cnicNumber}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Phone Number</label>
                <div className="relative">
                  <Input name="phoneNumber" placeholder="0300-1234567" value={formData.phoneNumber} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phoneNumber}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Date of Birth</label>
                <div className="relative">
                  <Input name="dob" type="date" value={formData.dob} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.dob && <p className="text-red-500 text-xs mt-1 ml-1">{errors.dob}</p>}
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Shop Info (Vendor) or Documents (Buyer) */}
        {step === 3 && (
          <>
            {userType === 'seller' ? (
              <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-[#111827] mb-1">Vendor Sign Up</h2>
                  <p className="text-lg font-bold text-[#6366f1] mb-4">Shop Information</p>
                  <p className="text-[#6b7280]">Tell us about your business</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-[#374151] ml-1">Shop Name</label>
                    <div className="relative">
                      <Input name="shopName" placeholder="Your Business Name" value={formData.shopName} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                    </div>
                    {errors.shopName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.shopName}</p>}
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-[#374151] ml-1">Shop Location</label>
                    <div className="relative">
                      <Input name="shopLocation" placeholder="Full physical address" value={formData.shopLocation} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                    </div>
                    {errors.shopLocation && <p className="text-red-500 text-xs mt-1 ml-1">{errors.shopLocation}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#374151] ml-1">Business Type</label>
                    <div className="relative">
                      <select 
                        name="businessType" 
                        value={formData.businessType} 
                        onChange={handleChange as any}
                        className="w-full pl-11 h-13 rounded-2xl border-[#e5e7eb] bg-white text-sm focus:border-[#6366f1] focus:ring-[#6366f1]/10 outline-none appearance-none"
                      >
                        <option value="Retail">Retail</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Service">Service</option>
                      </select>
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                    </div>
                    {errors.businessType && <p className="text-red-500 text-xs mt-1 ml-1">{errors.businessType}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#374151] ml-1">Shop License Number</label>
                    <div className="relative">
                      <Input name="shopLicense" placeholder="LIC-12345678" value={formData.shopLicense} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                    </div>
                    {errors.shopLicense && <p className="text-red-500 text-xs mt-1 ml-1">{errors.shopLicense}</p>}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-[#111827] mb-1">Buyer Sign Up</h2>
                  <p className="text-lg font-bold text-[#6366f1] mb-4">Document Upload</p>
                  <p className="text-[#6b7280]">Upload required documents for verification</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'CNIC Front Side', desc: 'Clear photo of the front' },
                    { label: 'CNIC Back Side', desc: 'Clear photo of the back' },
                    { label: 'Salary Slip', desc: 'Latest month salary slip' },
                    { label: 'Bank Statement', desc: 'Last 3 months statement' },
                  ].map((doc) => (
                    <div key={doc.label} className="border-2 border-dashed border-[#e5e7eb] rounded-2xl p-5 flex items-center justify-between hover:border-[#6366f1] transition-all group cursor-pointer bg-white">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#f9fafb] rounded-xl flex items-center justify-center text-[#9ca3af] group-hover:bg-[#f5f3ff] group-hover:text-[#6366f1] transition-colors">
                          <Upload size={22} />
                        </div>
                        <div>
                          <p className="font-bold text-[#111827] text-sm">{doc.label}</p>
                          <p className="text-xs text-[#6b7280]">{doc.desc}</p>
                        </div>
                      </div>
                      <Button type="button" variant="outline" className="rounded-xl border-[#e5e7eb] text-[#6366f1] font-bold text-xs h-9">Browse</Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#111827] mb-1">
                {userType === 'buyer' ? 'Buyer Sign Up' : 'Vendor Sign Up'}
              </h2>
              <p className="text-lg font-bold text-[#6366f1] mb-4">Confirmation</p>
              <p className="text-[#6b7280]">Please confirm your details</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                <p className="text-sm text-gray-600"><span className="font-bold">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p className="text-sm text-gray-600"><span className="font-bold">Email:</span> {formData.email}</p>
                <p className="text-sm text-gray-600"><span className="font-bold">Role:</span> {userType === 'seller' ? 'Vendor' : 'Buyer'}</p>
                {userType === 'seller' && (
                  <>
                    <p className="text-sm text-gray-600"><span className="font-bold">Shop:</span> {formData.shopName}</p>
                    <p className="text-sm text-gray-600"><span className="font-bold">License:</span> {formData.shopLicense}</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#f5f3ff] rounded-2xl border border-[#e0e7ff]">
              <input 
                type="checkbox" 
                name="documentsConfirmed" 
                id="documentsConfirmed"
                checked={formData.documentsConfirmed}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-[#e5e7eb] text-[#6366f1] focus:ring-[#6366f1]"
              />
              <label htmlFor="documentsConfirmed" className="text-sm font-medium text-[#4338ca] leading-relaxed cursor-pointer">
                I confirm that all information provided is authentic and belongs to me. I understand that providing false information will lead to account rejection.
              </label>
            </div>
            {errors.documentsConfirmed && <p className="text-red-500 text-xs mt-2 ml-1">{errors.documentsConfirmed}</p>}
          </Card>
        )}

        {/* Step 5: Security */}
        {step === 5 && (
          <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#111827] mb-1">
                {userType === 'buyer' ? 'Buyer Sign Up' : 'Vendor Sign Up'}
              </h2>
              <p className="text-lg font-bold text-[#6366f1] mb-4">Security</p>
              <p className="text-[#6b7280]">Create a strong password to protect your data</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Password</label>
                <div className="relative">
                  <Input 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="pl-11 pr-11 h-13 rounded-2xl border-[#e5e7eb]" 
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6366f1] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Confirm Password</label>
                <div className="relative">
                  <Input 
                    name="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    className="pl-11 pr-11 h-13 rounded-2xl border-[#e5e7eb]" 
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6366f1] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
              </div>
            </div>
            {apiError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span> {apiError}
              </div>
            )}
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {step > 0 && (
            <Button 
              type="button" 
              onClick={prevStep} 
              variant="outline" 
              className="flex-1 h-14 rounded-2xl border-[#e5e7eb] text-[#374151] font-bold hover:bg-[#f9fafb] transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={20} /> Back
            </Button>
          )}
          {step < 5 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              className={`${step > 0 ? 'flex-[2]' : 'flex-1'} h-14 bg-[#6366f1] text-white hover:bg-[#4f46e5] rounded-2xl text-lg font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2`}
            >
              Next Step <ChevronRight size={20} />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={loading}
              className={`${step > 0 ? 'flex-[2]' : 'flex-1'} h-14 bg-[#6366f1] text-white hover:bg-[#4f46e5] rounded-2xl text-lg font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'} <CheckCircle2 size={20} />
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <FlexiLayout>
      <div className="min-h-screen bg-[#f8f9fd] py-16 px-4">
        <Suspense fallback={<div className="text-center py-20">Loading registration form...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </FlexiLayout>
  )
}
