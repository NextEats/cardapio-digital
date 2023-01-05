import { useRouter } from "next/router"

export default function Posduct() {
    const { query } = useRouter()

    return (
        <h1>{`poduct: ${query.id}`}</h1>
    )
}