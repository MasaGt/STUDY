export class Student {
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  greeting() {
    return `id: ${this._id}. name: ${this._name}.`;
  }
}
