import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const type = searchParams.get('type');

    if (token && type === 'signup') {
      verifyEmail(token);
    }
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    setIsVerifying(true);
    try {
      // For now, we'll simulate email verification
      // In a real app, you'd call Supabase's email verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      setVerificationStatus('success');
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage('Failed to verify email. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    // Implement resend verification email logic
    console.log('Resend verification email');
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-white">Email Verified!</CardTitle>
              <CardDescription className="text-gray-300">
                Your account has been successfully verified. You can now access all features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Continue to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <Mail className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-white">Verify Your Email</CardTitle>
            <CardDescription className="text-gray-300">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isVerifying && (
              <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>Verifying your email...</AlertDescription>
              </Alert>
            )}

            {verificationStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Didn't receive the email?</h4>
              <p className="text-sm text-gray-300 mb-3">
                Check your spam folder or try resending the verification email.
              </p>
              <Button
                variant="outline"
                onClick={handleResendEmail}
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Resend Verification Email
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-300 text-sm">
                Already verified?{' '}
                <Link
                  to="/sign-in"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail; 