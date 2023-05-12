import { supabase } from '@/src/server/api';
import { tUserDetailsWithFKData } from '@/src/types/iUser';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useUserAndDetails() {
  const user = useUser();

  const [userDetails, setUserDetails] = useState<
    tUserDetailsWithFKData | undefined
  >(undefined);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserDetails() {
      const { data: userDetailsData, error } = await supabase
        .from('user_details')
        .select('*, restaurants (*)')
        .eq('user_id', user?.id);

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
      }
    }

    if (user) {
      fetchUserDetails();
    }
  }, [user, router]);

  return { user, userDetails };
}
