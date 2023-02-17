import { TableContext } from "@/src/contexts/TableControlContext"
import { useContext } from "react"
import Table from "./Table"

export default function Tables() {
    const { tables } = useContext(TableContext)
    return (
        <div>
            <div className="flex flex-col sm:grid sm:grid-cols-2 xl:grid-cols-3 1280px gap-5">
                {
                    tables.map(t => {
                        return (
                            <Table key={t.id} table={t} />
                        )
                    })
                }
            </div>
        </div>
    )
}