import { TableContext } from "@/src/contexts/TableControlContext"
import { table } from "console"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useContext, useEffect, useState } from "react"
import { CardapioDigitalButton } from "../cardapio-digital/CardapioDigitalButton"
import CreateTableModal from "./CreateTableModal"
import Table from "./Table"
import TableModal from "./TableModal"

export default function Tables() {
    const { tables, setOpenedTableModal, openedTableModal, setIsOpenedCreateTableModal } = useContext(TableContext)

    // useEffect(() => setIsOpenedCreateTableModal(false), [])

    const moment = new Date();

    return (
        <div>
            {openedTableModal ? <TableModal /> : null}
            <div className="flex flex-1 items-center justify-between mb-4">
                <p className="text-base font-medium mb-4">
                    {format(moment, "HH")} {":"} {format(moment, "mm")} {"-"}{" "}
                    {format(moment, "P", { locale: ptBR })}{" "}
                </p>

                <CreateTableModal />
                <CardapioDigitalButton name="Nova Mesa" h="h-9" w="w-36" onClick={() => setIsOpenedCreateTableModal(true)} />

            </div>
            <div className="flex flex-col  sm:grid sm:grid-cols-2 xl:grid-cols-3 1280px gap-5">
                {
                    tables.map(t => {
                        return (
                            <button key={t.id} onClick={() => setOpenedTableModal(t)}>
                                <Table table={t} />
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}