import React, { useState, useEffect } from "react";
import { ReactElement } from "react";

interface iProps {
    data: any;
}


export default function GlobalAdminData(WrappedComponent: React.ComponentType<iProps>) {
    GlobalAdminData.displayName = `GlobalAdminData(${getDisplayName(WrappedComponent)})`;

    function GlobalAdminData(props: iProps) {
        const [data, setData] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                setData([]);
            };

            fetchData();
        }, []);

        return <WrappedComponent {...props} />;
    }

    return GlobalAdminData;
}

function getDisplayName(WrappedComponent: React.ComponentType<iProps>) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}


