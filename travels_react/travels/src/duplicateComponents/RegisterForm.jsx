import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: '', email: "", password:""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const [message, setMessage] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            await axios.post("http://localhost:8000/api/register/", form);
            setMessage('Registration Successful! You can now login.')
        } catch(error){
            setMessage(`Registration Failed: ${error.response?.data?.username || error.response?.data?.email || error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-green-100">Join our bus booking platform</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                            </svg>
                                        </div>
                                        <input 
                                            type="text" 
                                            name="username" 
                                            value={form.username} 
                                            onChange={handleChange}
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Choose a username"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                            </svg>
                                        </div>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={form.email} 
                                            onChange={handleChange}
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                            </svg>
                                        </div>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            value={form.password} 
                                            onChange={handleChange}
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Create a strong password"
                                            required
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Password must be at least 8 characters long
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id="terms"
                                        className="h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300"
                                        required
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                        I agree to the 
                                        <a href="#" className="text-green-600 hover:text-green-500 ml-1">Terms & Conditions</a>
                                    </label>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </div>
                        </form>

                        {message && (
                            <div className={`mt-6 p-4 rounded-xl ${message.includes('Successful') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                                <div className="flex items-center">
                                    {message.includes('Successful') ? (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                            </svg>
                                            <span>🎉 {message}</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                                            </svg>
                                            {message}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Already have an account? 
                                <a href="/login" className="ml-2 text-green-600 font-semibold hover:text-green-500 transition-colors">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;