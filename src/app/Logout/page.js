"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
            toast.error('Logged out successfully');
          localStorage.clear();
          router.push('/Login');
        } else {
          toast.error('Logout failed');
        }
      } catch (error) {
        toast.error('An error occurred during logout');
      }
    };

    logout();
  }, [router]);

  return null; // This component won't render anything visible
};

export default Logout;
