'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { registerSchema } from '@/lib/schemas'
import { registerUser } from '@/lib/auth'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'
import { Upload, ShieldCheck, Store, MapPin, User, Mail, Lock, Phone, Calendar, CreditCard } from 'lucide-react'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')
  
  const [userType, setUserType] = useState<'buyer' | 'seller'>((typeParam as 'buyer' | 'seller') || 'buyer')
  const [formData, setFormData] = useState<any>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    userType: userType,
    cnicNumber: '',
    phoneNumber: '',
    dob: '',
    shopName: '',
    shopLocation: '',
    businessType: 'Retail',
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
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const handleTypeChange = (type: 'buyer' | 'seller') => {
    setUserType(type)
    setFormData(prev => ({ ...prev, userType: type }))
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setApiError('')
    setLoading(true)
    
    try {
      const validated = registerSchema.parse(formData)
      const user = await registerUser(
        validated.email, 
        validated.password, 
        validated.firstName, 
        validated.lastName, 
        validated.userType
      )
      
      localStorage.setItem('user', JSON.stringify(user))
      window.dispatchEvent(new Event('storage'))
      
      if (user.role === 'seller') {
        router.push('/vendor/dashboard')
      } else {
        router.push('/buyer/dashboard')
      }
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          if (err.path) newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      } else {
        setApiError(error.message || 'Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-[#111827] mb-3">Create Your Account</h1>
        <p className="text-[#6b7280] text-lg">Join FlexiBerry and start shopping on easy installments</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-[#e5e7eb] flex gap-2">
          <button
            type="button"
            onClick={() => handleTypeChange('buyer')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
              userType === 'buyer' 
                ? 'bg-[#6366f1] text-white shadow-md' 
                : 'text-[#6b7280] hover:bg-[#f5f3ff] hover:text-[#6366f1]'
            }`}
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              I'm a Buyer
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('seller')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
              userType === 'seller' 
                ? 'bg-[#6366f1] text-white shadow-md' 
                : 'text-[#6b7280] hover:bg-[#f5f3ff] hover:text-[#6366f1]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Store size={18} />
              I'm a Vendor
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-8 border-[#e5e7eb] shadow-sm rounded-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f3f4f6]">
            <div className="w-10 h-10 bg-[#f5f3ff] rounded-xl flex items-center justify-center text-[#6366f1]">
              <User size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#111827]">Basic Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#374151]">First Name</label>
              <div className="relative">
                <Input name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
              </div>
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#374151]">Last Name</label>
              <div className="relative">
                <Input name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
              </div>
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-[#374151]">Email Address</label>
              <div className="relative">
                <Input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#374151]">Password</label>
              <div className="relative">
                <Input name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#374151]">Confirm Password</label>
              <div className="relative">
                <Input name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        </Card>

        {userType === 'buyer' ? (
          <Card className="p-8 border-[#e5e7eb] shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#f5f3ff] rounded-xl flex items-center justify-center text-[#6366f1]">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#111827]">Identity Verification</h2>
            </div>
            <p className="text-[#6b7280] text-sm mb-6 ml-13">Required for installment approval</p>

            <div className="bg-[#f5f3ff] border border-[#e0e7ff] rounded-xl p-4 mb-8 flex gap-3">
              <div className="text-[#6366f1] mt-0.5">ℹ️</div>
              <p className="text-[#4338ca] text-sm leading-relaxed">
                Your information is encrypted end-to-end and only shared with the vendor for approval. We never sell your data.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151]">CNIC Number</label>
                <div className="relative">
                  <Input name="cnicNumber" placeholder="12345-1234567-1" value={formData.cnicNumber} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.cnicNumber && <p className="text-red-500 text-xs mt-1">{errors.cnicNumber}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151]">Mobile Number</label>
                <div className="relative">
                  <Input name="phoneNumber" placeholder="0300-1234567" value={formData.phoneNumber} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151]">Date of Birth</label>
                <div className="relative">
                  <Input name="dob" type="date" value={formData.dob} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#374151] uppercase tracking-wider">Required Documents</h3>
              <div className="border-2 border-dashed border-[#e5e7eb] rounded-2xl p-6 flex items-center justify-between hover:border-[#6366f1] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f9fafb] rounded-xl flex items-center justify-center text-[#9ca3af] group-hover:bg-[#f5f3ff] group-hover:text-[#6366f1]">
                    <Upload size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827]">CNIC — Front Side</p>
                    <p className="text-xs text-[#6b7280]">Clear photo, all corners visible</p>
                  </div>
                </div>
                <Button type="button" variant="outline" className="rounded-lg border-[#e5e7eb] text-[#6366f1] font-bold">Browse</Button>
              </div>
              <div className="border-2 border-dashed border-[#e5e7eb] rounded-2xl p-6 flex items-center justify-between hover:border-[#6366f1] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f9fafb] rounded-xl flex items-center justify-center text-[#9ca3af] group-hover:bg-[#f5f3ff] group-hover:text-[#6366f1]">
                    <Upload size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827]">CNIC — Back Side</p>
                    <p className="text-xs text-[#6b7280]">Clear photo, all corners visible</p>
                  </div>
                </div>
                <Button type="button" variant="outline" className="rounded-lg border-[#e5e7eb] text-[#6366f1] font-bold">Browse</Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-8 border-[#e5e7eb] shadow-sm rounded-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f3f4f6]">
              <div className="w-10 h-10 bg-[#f5f3ff] rounded-xl flex items-center justify-center text-[#6366f1]">
                <Store size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#111827]">Shop Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#374151]">Shop Name</label>
                <div className="relative">
                  <Input name="shopName" placeholder="Your Business Name" value={formData.shopName} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-[#374151]">Shop Location / Address</label>
                <div className="relative">
                  <Input name="shopLocation" placeholder="Full physical address of your shop" value={formData.shopLocation} onChange={handleChange} className="pl-10 h-12 rounded-xl border-[#e5e7eb]" />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                </div>
                {errors.shopLocation && <p className="text-red-500 text-xs mt-1">{errors.shopLocation}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151]">Business Type</label>
                <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full h-12 rounded-xl border-[#e5e7eb] px-4 text-sm focus:border-[#6366f1] outline-none">
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>Manufacturer</option>
                  <option>Service Provider</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#374151] uppercase tracking-wider">Business Verification</h3>
              <div className="border-2 border-dashed border-[#e5e7eb] rounded-2xl p-6 flex items-center justify-between hover:border-[#6366f1] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f9fafb] rounded-xl flex items-center justify-center text-[#9ca3af] group-hover:bg-[#f5f3ff] group-hover:text-[#6366f1]">
                    <Upload size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-[#111827]">Business License / NTN</p>
                    <p className="text-xs text-[#6b7280]">Upload a clear scan of your business registration</p>
                  </div>
                </div>
                <Button type="button" variant="outline" className="rounded-lg border-[#e5e7eb] text-[#6366f1] font-bold">Browse</Button>
              </div>
            </div>
          </Card>
        )}

        {apiError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
            <span>⚠️</span>
            {apiError}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full h-14 bg-[#6366f1] text-white hover:bg-[#4f46e5] rounded-2xl text-lg font-bold shadow-lg shadow-[#6366f1]/20 transition-all hover:scale-[1.01] active:scale-[0.99]">
          {loading ? 'Creating Account...' : 'Complete Registration →'}
        </Button>

        <div className="text-center">
          <p className="text-[#6b7280]">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#6366f1] font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <FlexiLayout>
      <div className="min-h-screen bg-[#f8f9fd] py-12 px-4">
        <Suspense fallback={<div className="text-center py-20">Loading registration form...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </FlexiLayout>
  )
}
