'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { loginSchema, type LoginInput } from '@/lib/schemas'
import { loginUser } from '@/lib/auth'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect')
  
  const [formData, setFormData] = useState<LoginInput>({ email: '', password: '' })
  const [errors,   setErrors  ] = useState<Record<string, string>>({})
  const [loading,  setLoading ] = useState(false)
  const [apiError, setApiError] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev  => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setApiError('')
    setLoading(true)
    try {
      const validated = loginSchema.parse(formData)
      const user = await loginUser(validated.email, validated.password)
      localStorage.setItem('user', JSON.stringify(user))
      
      // Dispatch storage event for header update
      window.dispatchEvent(new Event('storage'))
      
      // Handle redirection
      if (redirectPath) {
        router.push(redirectPath)
      } else {
        if      (user.role === 'seller')                       router.push('/vendor/dashboard')
        else if (user.role === 'admin' || user.role === 'super_admin') router.push('/admin/dashboard')
        else                                                   router.push('/buyer/dashboard')
      }
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => { if (err.path) newErrors[err.path[0]] = err.message })
        setErrors(newErrors)
      } else {
        setApiError(error.message || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 border-[#e5e7eb] shadow-xl shadow-indigo-100/50 rounded-3xl bg-white">
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-start gap-2">
          <span>⚠️</span>
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-bold text-[#374151] ml-1">
            Email Address
          </label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-13 pl-11 rounded-2xl border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 transition-all"
              aria-invalid={!!errors.email}
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1 ml-1">
            <label htmlFor="password" className="text-sm font-bold text-[#374151]">Password</label>
            <Link href="/auth/forgot-password" className="text-xs font-bold text-[#6366f1] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="h-13 pl-11 pr-11 rounded-2xl border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 transition-all"
              aria-invalid={!!errors.password}
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6366f1] transition-colors"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-[#6366f1] text-white hover:bg-[#4f46e5] rounded-2xl text-lg font-bold shadow-lg shadow-[#6366f1]/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <>
              Sign In
              <LogIn size={20} />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#f3f4f6] text-center">
        <p className="text-sm text-[#6b7280]">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-[#6366f1] font-bold hover:underline inline-flex items-center gap-1">
            Create one free <UserPlus size={14} />
          </Link>
        </p>
      </div>

      {/* Demo credentials hint */}
      <div className="mt-8 p-4 bg-[#f5f3ff] border border-[#e0e7ff] rounded-2xl">
        <p className="text-[10px] text-[#4338ca] text-center font-bold uppercase tracking-widest mb-3">Demo Credentials</p>
        <div className="space-y-2 text-xs text-[#6366f1] text-center font-medium">
          <div className="flex justify-between px-2">
            <span>Buyer:</span>
            <span className="font-bold">buyer@demo.com / demo1234</span>
          </div>
          <div className="flex justify-between px-2">
            <span>Seller:</span>
            <span className="font-bold">seller@demo.com / demo1234</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <FlexiLayout>
      <div className="min-h-screen bg-[#f8f9fd] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif font-bold text-[#111827] mb-3">Welcome Back</h1>
            <p className="text-[#6b7280] text-lg">Sign in to manage your installments</p>
          </div>
          <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </FlexiLayout>
  )
}
