const origin = 'https://api.getwaitlist.com/api/v1';

const createEndpoint = (url: string): string => new URL(url, origin).href;

export default createEndpoint;
