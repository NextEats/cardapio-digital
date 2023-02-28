import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AiFillEye } from 'react-icons/ai';

interface iDropdownMenuObservationProps {
    observation: string
}

export function DropdownMenuObservation({ observation }: iDropdownMenuObservationProps) {

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <AiFillEye className="text-2xl text-gray-400" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content data-state="top" className='rounded max-w-[350px] sm:max-w-[400px] bg-white p-2 shadow-md '>
                    <DropdownMenu.Label className='mb-2 text-xl font-bold text-gray-400'> Observação </DropdownMenu.Label>
                    <p className='text-lg font-medium text-gray-700 ml-2'>
                        {observation}
                    </p>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Arrow className='fill-white' />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}