import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as fs from "fs/promises";
import { existsSync } from "fs";
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
  async deleteFile(fileName: string): Promise<string> {
    try {
      // TODO: виправити костиль з шляхом
      const filePath = path.resolve() + "/" + "src/" + fileName;

      if (!existsSync(filePath)) {
        throw new HttpException(
          "This file does not exist",
          HttpStatus.METHOD_NOT_ALLOWED
        );
      }

      await fs.unlink(filePath);
      return "file was deleted";
    } catch (error) {
      console.log(error);

      throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
