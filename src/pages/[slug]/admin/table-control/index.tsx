import AdminWrapper from "@/src/components/admin/AdminWrapper";
import Tables from "@/src/components/admin/Tables/";
import TableContextProvider from "@/src/contexts/tableControl";
import { getRestaurantBySlugFetch } from "@/src/fetch/restaurant/getRestaurantBySlug";
import { iRestaurantWithFKData } from "@/src/types/types";
import { GetServerSideProps } from "next";
import { useRef } from "react";

interface iAdminHomePageProps {

    restaurant: iRestaurantWithFKData
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const restaurant = await getRestaurantBySlugFetch(context.query.slug);
    const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);
    return {
        props: {
            restaurant,
        },
    };
};

export default function TableControl({
    restaurant,
}: iAdminHomePageProps) {

    return (
        <AdminWrapper>
            <TableContextProvider>

                <div className="flex flex-col gap-8">
                    <Tables />
                </div>
            </TableContextProvider>
        </AdminWrapper>
    );
}
