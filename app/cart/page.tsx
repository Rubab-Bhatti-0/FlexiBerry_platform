'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { loginSchema, type LoginInput } from '@/lib/schemas'
import { loginUser } from '@/lib/auth'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginInput>({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
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
      if (user.role === 'seller') router.push('/vendor/dashboard')
      else if (user.role === 'admin' || user.role === 'super_admin') router.push('/admin/dashboard')
      else router.push('/buyer/dashboard')
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
    <FlexiLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: 'linear-gradient(135deg, #3730a3, #4338ca)', boxShadow: '0 8px 24px rgba(67,56,202,.3)' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>FB</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Sign In</h1>
            <p className="text-muted-foreground">Welcome back to FlexiBerry</p>
          </div>

          {apiError && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm flex items-start gap-2">
              <span>⚠️</span><span>{apiError}</span>
            </div>
          )}

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className="h-11" aria-invalid={!!errors.email} />
                {errors.email && <p className="text-destructive text-sm mt-1.5">{errors.email}</p>}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
                  <Link href="/auth/forgot-password" className="text-sm text-accent hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Input id="password" name="password" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={formData.password} onChange={handleChange} className="h-11 pr-11" aria-invalid={!!errors.password} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-sm mt-1.5">{errors.password}</p>}
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-medium transition-all hover:scale-[1.02]">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign In →'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="text-accent hover:underline font-medium">Create one free</Link>
              </p>
            </div>

            <Card className="mt-6 p-4 bg-secondary/30 border-border">
              <p className="text-xs text-muted-foreground text-center font-medium mb-2">Demo Credentials</p>
              <div className="space-y-1 text-xs text-muted-foreground text-center">
                <p>Buyer: buyer@demo.com / demo1234</p>
                <p>Seller: seller@demo.com / demo1234</p>
                <p>Admin: admin@demo.com / demo1234</p>
              </div>
            </Card>
          </Card>
        </div>
      </div>
    </FlexiLayout>
  )
}