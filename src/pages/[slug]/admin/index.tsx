import AdminWrapper from '@/src/components/admin/AdminWrapper';
import AdminHomePage, {
    iAdminHomePageProps,
} from '@/src/components/admin/DeliveryControl/index';
import { fetchAdminHomePageData } from '@/src/utils/fetchAdminHomePageData';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const adminHomePageData = await fetchAdminHomePageData(context);
    return adminHomePageData;
};

export default function AdminHome(props: iAdminHomePageProps) {
    return (
        <AdminWrapper>
            <AdminHomePage {...props} />
        </AdminWrapper>
    );
}
