

export function getPathByPictureUrl(url: string) {

    const urlArray = url.split('/');

    const path = urlArray.pop()

    return { path }
}