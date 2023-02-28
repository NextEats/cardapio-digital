import InputWithLabel from '@/src/components/InputWithLabel'
import { useState } from 'react'

export default function ContactInfo() {
    const [whatsapp, setWhatsapp] = useState<string>('')

    return (
        <div>
            <InputWithLabel
                placeholder="Digite seu número de WhatsApp"
                label="WhatsApp"
                state={whatsapp}
                setState={setWhatsapp}
                mask="(99) 99999-9999"
            />
        </div>
    )
}
