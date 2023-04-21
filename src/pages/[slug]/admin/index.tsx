import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RedirectToCashboxPage() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      router.replace(`/${slug}/admin/caixa`);
    }
  }, [router, slug]);
}
