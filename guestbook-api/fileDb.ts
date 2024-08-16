import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import { IBookMessage, BookMessageMutation } from "./types";

const fileName = "./db.json";

let data: IBookMessage[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: BookMessageMutation) {
    const product: IBookMessage = {
      ...item,
      id: randomUUID(),
    };

    data.push(product);
    await this.save();
    return product;
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  },
};

export default fileDb;
