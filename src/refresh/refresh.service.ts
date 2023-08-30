import { Injectable, Inject } from "@nestjs/common";
import { Refresh } from "./refresh.model";
import { JwtService } from "@nestjs/jwt";
import * as uuid from "uuid";

import { SaveRefreshDto } from "./dto/save-refresh.dto";
import { CreateRefreshDto } from "./dto/create-refresh.dto";

@Injectable()
export class RefreshService {
  constructor(
    @Inject("REFRESH_REPOSITORY")
    private refreshRepository: typeof Refresh,
    private refreshService: JwtService
  ) {}

  generateRefresh(user: CreateRefreshDto): string {
    try {
      const payload = {
        id: user.id,
        userName: `${user.firstName}  ${user.lastName}`,
        role: user.roles,
      };
      const refresh = this.refreshService.sign(payload, {
        secret: process.env.REFRESH_KEY,
      });

      return refresh;
    } catch (error) {
      console.log(error);
    }
  }

  async saveRefreshToDatabase(tokenData: SaveRefreshDto): Promise<object> {
    try {
      const savedRefresh = await this.refreshRepository.create({
        id: uuid.v4(),
        refresh: tokenData.refresh,
        userId: tokenData.userId,
      });

      return savedRefresh;
    } catch (error) {
      console.log(error);
    }
  }

  async updateRefreshInDatabase(tokenData: SaveRefreshDto): Promise<object> {
    try {
      const refresh = await this.refreshRepository.update(
        {
          refresh: tokenData.refresh,
        },
        {
          where: { userId: tokenData.userId }, // Тут коректно вказано userId
        }
      );

      return refresh;
    } catch (error) {
      console.log(error);
    }
  }

  async getRefreshById(id: string): Promise<object> {
    try {
      return this.refreshRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  async decodeRefresh(token: string) {
    try {
      return await this.refreshService.verify(token, {
        secret: process.env.REFRESH_KEY,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
