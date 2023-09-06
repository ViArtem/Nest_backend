import { Injectable } from "@nestjs/common";

@Injectable()
export class ApisService {
  async getDollarRate() {
    try {
      const dollarEuroExchangeRate = await fetch(
        "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
      );
      const dollarJson = await dollarEuroExchangeRate.json();
      return [
        {
          ccy: dollarJson[1].ccy,
          buy: dollarJson[1].buy,
          sale: dollarJson[1].sale,
        },
      ];
    } catch (error) {
      if (error instanceof TypeError) {
        const dollarNBU = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?valcode=USD&json"
        );

        const dollarJson = await dollarNBU.json();

        return [{ ccy: dollarJson[0].cc, buy: dollarJson[0].rate, sale: 0.0 }];
      }
      console.log(error);
      return { message: error.message };
    }
  }
}
