export const environment = {
  baseURI: 'http://localhost:3000/api',
};

export function setURIs(hostedDomain: string) {
  if (hostedDomain !== 'http://localhost:4200') {
    environment.baseURI = `${hostedDomain}/todo-app/api`;
  }
}
