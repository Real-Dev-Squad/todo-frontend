'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const success = params.get('success');
    const error = params.get('error');

    if (success === 'true') {
      toast.success('Login successful!');
    } else if (error) {
      toast.error('Login failed');
    } else {
      toast('Login status unknown.');
    }
    router.replace('/');
  }, [params, router]);

  return <div>Processing login...</div>;
} 