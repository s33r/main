export interface SimpleName {
    name : string,
    email: string,
    url  : string,
}

const nameRegex = /(?<name>[^<(]+)\s*(<(?<email>[^>]+)>)?\s*(\(((?<url>[^)]+)))?/g;
// "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"

export const parseNameString = (
    content: string,
): SimpleName => {
    const match = content.match(nameRegex);

    const {
        url, email, name,
    } = (match?.groups) ?? {};

    return {
        url,
        email,
        name,
    };
};