import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Eye, EyeOff } from 'lucide-react'
import rriLogo from '../assets/rri-logo.svg'
import loginHero from '../assets/login-hero.png'
import cfBrand from '../assets/cloudflare-brand.svg'

export const LoginPage: React.FC = () => {
  const { verify2FA, login } = useApp()
  const [step, setStep] = useState<'login' | '2fa'>('login')
  const [identifier, setIdentifier] = useState('admin@rri.co.id')
  const [password, setPassword] = useState('••••••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [isHumanVerified, setIsHumanVerified] = useState(false)
  const [otp, setOtp] = useState(['1', '2', '3', '4', '', ''])
  const [errorMsg, setErrorMsg] = useState('')

  const handleProceedTo2FA = (e: React.FormEvent) => {
    e.preventDefault()
    if (!identifier || !password) {
      setErrorMsg('Harap masukkan NIP/email dan kata sandi.')
      return
    }
    if (!isHumanVerified) {
      setErrorMsg('Harap centang verifikasi "Verify you are human".')
      return
    }
    login(identifier, password)
    setErrorMsg('')
    setStep('2fa')
  }

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1)
    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = otp.join('')
    if (fullCode.length < 6) {
      setErrorMsg('Harap masukkan 6-digit kode OTP lengkap.')
      return
    }
    login(identifier, password)
    const success = verify2FA(fullCode)
    if (!success) {
      setErrorMsg('Kode OTP salah. Coba masukkan 6 digit angka apa saja.')
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white select-none">
      {/* Left Hero Section (720px in Figma, exactly matches figma_login_screen.png) */}
      <div className="hidden lg:block w-[720px] shrink-0 h-full bg-[#1866EF] overflow-hidden">
        <img
          src={loginHero}
          alt="RRI Riset & Produksi Berita"
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* Right Form Section (560px in Figma) */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 overflow-y-auto bg-white">
        <div className="w-full max-w-[400px] space-y-6">
          {/* RRI Logo Mark */}
          <div>
            <img
              src={rriLogo}
              alt="Radio Republik Indonesia"
              className="h-8 w-auto object-contain object-left mb-4"
            />
          </div>

          {step === 'login' ? (
            /* Login Form */
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
                  Selamat datang
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Silakan masuk menggunakan NIP atau Email Anda.
                </p>
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-[6px]">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleProceedTo2FA} className="space-y-4">
                {/* Identifier Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900 block">
                    Masukkan NIP / email pengguna <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Masukkan NIP / email pengguna di sini ..."
                    className="w-full h-[40px] px-3.5 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-900 block">
                    Masukkan kata sandi pengguna <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi di sini..."
                      className="w-full h-[40px] pl-3.5 pr-10 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Cloudflare Turnstile Box matching Figma */}
                <div className="flex items-center justify-between p-3.5 bg-[#FAFAFA] border border-[#E5E7EB] rounded-[6px]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isHumanVerified}
                      onChange={(e) => setIsHumanVerified(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Verify you are human
                    </span>
                  </label>

                  <img
                    src={cfBrand}
                    alt="Cloudflare"
                    className="h-8 w-auto object-contain"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-[40px] bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
                >
                  Lanjutkan ke Verifikasi 2FA
                </button>
              </form>
            </div>
          ) : (
            /* 2FA Form matching figma_2fa_screen.png */
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
                  Verifikasi Dua Langkah (2FA)
                </h1>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Kami mengirimkan 6-digit kode OTP ke <span className="font-semibold text-slate-800">email {identifier || 'editor@rri.co.id'}</span>.
                </p>
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-[6px]">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleVerify2FA} className="space-y-6">
                {/* 6 OTP Inputs */}
                <div className="flex justify-between gap-2.5">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className={`w-12 h-12 text-center text-base font-bold rounded-[6px] border bg-white focus:outline-none transition-all ${
                        digit
                          ? 'border-[#DBEAFE] text-slate-900 bg-white'
                          : i === 4
                          ? 'border-[#1866EF] ring-1 ring-[#1866EF] text-slate-900'
                          : 'border-[#DBEAFE] text-slate-900'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-center text-xs text-slate-400">
                  Kode berlaku dalam 04:28 WIB ·{' '}
                  <button
                    type="button"
                    onClick={() => setOtp(['9', '8', '7', '6', '5', '4'])}
                    className="text-[#1866EF] font-semibold hover:underline"
                  >
                    Kirim ulang kode
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-[40px] bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
                >
                  Verifikasi & Masuk ke Dashboard
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('login')
                      setErrorMsg('')
                    }}
                    className="text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    ← Kembali ke Layar Login Utama
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
