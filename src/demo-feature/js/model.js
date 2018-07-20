export default class Model {
  get urlRead() {
    throw new Error(`No server for reading`);
  }
  get urlWrite() {
    throw new Error(`No server for writing`);
  }
  load() {
    return fetch(this.urlRead).then(data => data.json());
  }
  send(data) {
    return fetch(this.urlWrite, {
      body: data,
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
    });
  }
}
