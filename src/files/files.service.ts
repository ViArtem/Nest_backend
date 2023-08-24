import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as fs from "fs/promises";
import { existsSync, stat } from "fs";
import * as path from "path";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async saveFile(file: any): Promise<string> {
    try {
      const originalname = file.originalname;
      const extension = originalname.split(".").pop();

      const fileName = uuid.v4() + "." + extension;

      const filePath = path.resolve("src", "images");

      if (!existsSync(filePath)) {
        await fs.mkdir(filePath, { recursive: true }); // { recursive: true } якщо якоїсь папки на шляху не буде, то вона створиться
      }

      await fs.writeFile(path.join(filePath, fileName), file.buffer);
      return "images/" + fileName;
    } catch (error) {
      console.log(error);

      throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //
  async deleteFile(fileName: string): Promise<object> {
    try {
      // TODO: виправити костиль з шляхом
      const filePath = path.resolve() + "/" + "src/" + fileName;

      if (!existsSync(filePath)) {
        return { message: "This file alreadu exists" };
      }

      await fs.unlink(filePath);
      return { success: true };
    } catch (error) {
      console.log(error);

      throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkFileExist(fileName: string): Promise<object> {
    try {
      await fs.stat(path.resolve("src", "images", fileName));

      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
      };
    }
  }
}
