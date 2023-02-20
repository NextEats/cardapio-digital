import { TableContext } from "@/src/contexts/TableControlContext"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useContext } from "react"
import CreateTableModal from "./CreateTableModal"
import Table from "./Table"

export default function Tables() {
    const { tables } = useContext(TableContext)

    const moment = new Date();

    return (
        <div>
            <div className="flex flex-1 items-center justify-between mb-4">
                <p className="text-base font-medium mb-4">
                    {format(moment, "HH")} {":"} {format(moment, "mm")} {"-"}{" "}
                    {format(moment, "P", { locale: ptBR })}{" "}
                </p>
                {true ? <CreateTableModal /> : null}

            </div>
            <div className="flex flex-col  sm:grid sm:grid-cols-2 xl:grid-cols-3 1280px gap-5">
                {
                    tables.map(t => {
                        return (
                            <div key={t.id}>
                                <Table table={t} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}