export default function scrollTo(id: string) {
    const element = document.getElementById(id) as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
}
