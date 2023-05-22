import { supabase } from '@/src/server/api';
import { tUserDetailsWithFKData } from '@/src/types/iUser';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useUserAndDetails() {
  const { isLoading, session, error } = useSessionContext();

  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false)
  const [userDetails, setUserDetails] = useState<
    tUserDetailsWithFKData | undefined
  >(undefined);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserDetails() {
      setIsLoadingUserDetails(true);
      const { data: userDetailsData, error } = await supabase
        .from('user_details')
        .select('*, restaurants (*)')
        .eq('user_id', session?.user.id);

      if (error) {
        console.error(error);
        return;
      }

      if (!userDetailsData) {
        router.replace(`/login`);
      } else {
        const userDetailsTypedData =
          userDetailsData[0] as unknown as tUserDetailsWithFKData;
        setUserDetails(userDetailsTypedData);
        setIsLoadingUserDetails(false);
      }
    }

    if (session && session.user) {
      fetchUserDetails();
    }
  }, [session, router]);

  return { user: session?.user || null, userDetails, isLoading: isLoading || isLoadingUserDetails };
}
