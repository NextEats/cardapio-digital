import AdminWrapper from "../../../../components/admin/AdminWrapper";
import TextInputWithLabel from "../../../../components/TextInputWithLabel";

export default function Config() {
    return (
        <AdminWrapper>
            <>
                <TextInputWithLabel placeholder="Digite seu email" />
            </>
        </AdminWrapper>
    );
}
