import { v4 as uuidv4 } from 'uuid';
import { string } from 'zod';

interface iGetFilePathProps {
    file: File;
    slug: string;

}

export function getFilePath({ file, slug }: iGetFilePathProps) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${slug}-${uuidv4()}.${fileExt}`
    const filePath = `${fileName}`
    return { filePath }
} 