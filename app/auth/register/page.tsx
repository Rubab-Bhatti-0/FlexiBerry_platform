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
  CheckCircle2, FileText, Wallet, Checkbox
} from 'lucide-react'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')
  
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<'buyer' | 'seller'>((typeParam as 'buyer' | 'seller') || 'buyer')
  const [formData, setFormData] = useState<any>({
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
    documentsConfirmed: false,
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    if (typeParam === 'seller' || typeParam === 'buyer') {
      setUserType(typeParam)
      setFormData(prev => ({ ...prev, userType: typeParam }))
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
      if (userType === 'buyer') {
        if (!formData.cnicNumber || !/^\d{5}-\d{7}-\d{1}$/.test(formData.cnicNumber)) newErrors.cnicNumber = 'Valid CNIC (12345-1234567-1) is required'
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
        if (!formData.dob) newErrors.dob = 'Date of birth is required'
      } else {
        if (!formData.shopName) newErrors.shopName = 'Shop name is required'
        if (!formData.shopLocation) newErrors.shopLocation = 'Shop location is required'
      }
    } else if (step === 3) {
      if (!formData.documentsConfirmed) newErrors.documentsConfirmed = 'You must confirm the documents'
    } else if (step === 4) {
      if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1)
  }

  const prevStep = () => {
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

  const steps = [
    { id: 1, title: 'Basic Info', icon: <User size={18} /> },
    { id: 2, title: userType === 'buyer' ? 'Identity' : 'Shop Info', icon: userType === 'buyer' ? <ShieldCheck size={18} /> : <Store size={18} /> },
    { id: 3, title: 'Documents', icon: <FileText size={18} /> },
    { id: 4, title: 'Security', icon: <Lock size={18} /> },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#e5e7eb] -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-[#6366f1] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          {steps.map((s) => (
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
              <h2 className="text-2xl font-serif font-bold text-[#111827] mb-2">Basic Information</h2>
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

        {/* Step 2: Identity / Shop Info */}
        {step === 2 && (
          <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {userType === 'buyer' ? (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-[#111827] mb-2">Identity Verification</h2>
                  <p className="text-[#6b7280]">Secure your account with official identification</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-[#374151] ml-1">CNIC Number</label>
                    <div className="relative">
                      <Input name="cnicNumber" placeholder="12345-1234567-1" value={formData.cnicNumber} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                    </div>
                    {errors.cnicNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cnicNumber}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#374151] ml-1">Mobile Number</label>
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
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-[#111827] mb-2">Shop Information</h2>
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
                </div>
              </>
            )}
          </Card>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#111827] mb-2">Document Upload</h2>
              <p className="text-[#6b7280]">Upload required documents for verification</p>
            </div>
            
            <div className="space-y-4 mb-8">
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
                I confirm that all uploaded documents are authentic and belong to me. I understand that providing false information will lead to account rejection.
              </label>
            </div>
            {errors.documentsConfirmed && <p className="text-red-500 text-xs mt-2 ml-1">{errors.documentsConfirmed}</p>}
          </Card>
        )}

        {/* Step 4: Security */}
        {step === 4 && (
          <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-50/50 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#111827] mb-2">Secure Your Account</h2>
              <p className="text-[#6b7280]">Create a strong password to protect your data</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Password</label>
                <div className="relative">
                  <Input name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151] ml-1">Confirm Password</label>
                <div className="relative">
                  <Input name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="pl-11 h-13 rounded-2xl border-[#e5e7eb]" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
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
          {step > 1 && (
            <Button 
              type="button" 
              onClick={prevStep} 
              variant="outline" 
              className="flex-1 h-14 rounded-2xl border-[#e5e7eb] text-[#374151] font-bold hover:bg-[#f9fafb] transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={20} /> Back
            </Button>
          )}
          {step < 4 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              className="flex-[2] h-14 bg-[#6366f1] text-white hover:bg-[#4f46e5] rounded-2xl text-lg font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              Next Step <ChevronRight size={20} />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-[2] h-14 bg-[#6366f1] text-white hover:bg-[#4f46e5] rounded-2xl text-lg font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Creating Account...' : 'Complete Sign Up'} <CheckCircle2 size={20} />
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
