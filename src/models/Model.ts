import { generateId } from "../utils/helpers";
import { getRequest, getSingleRequest, postRequest } from "../utils/services";
interface ModelData {
  [key: string]: any; // or a more specific type if you know the shape
}

class Model {
  protected table = "";
  protected hiddenField = ["table"];

  public async all() {
    const data = await getRequest(this.table);
    return data.map((d: any) => this.createInstance(d));
  }
  public async find(id: string) {
    const data = await getSingleRequest(`${this.table}/${id}`);
    return this.createInstance(data);
  }
  public async update(id: string, data: object) {
    try {
      await postRequest(`${this.table}/${id}`, data);
      return true;
    } catch (error) {
      return false;
    }
  }
  public async create(data: { [key: string]: any }) {
    try {
      const id = generateId();
      data.date = new Date().toISOString();
      data.id = id;
      await postRequest(`${this.table}/${id}`, data);
      return data;
    } catch (error) {
      return 0;
    }
  }

  public async hasOne(model: typeof Model, foreignKey: string) {
    const value = (this as any)[foreignKey];
    const instance = new model();
    return instance.find(value);
  }

  private createInstance(data: object) {
    const instance = new Model();
    return instance.fill(data);
  }

  private fill(data: ModelData) {
    // handle property
    if (typeof data === "object" && data !== null) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          (this as any)[key] = data[key];
        }
      }
    }

    this.hiddenField.forEach((hide) => {
      this.removeProperty(hide);
    });
    // default remove property
    this.removeProperty("table");
    this.removeProperty("hiddenField");

    return this; // Return the instance for chaining if needed
  }

  private removeProperty(key: string) {
    if (key in this) {
      delete (this as any)[key];
    }
  }
}

export default Model;
