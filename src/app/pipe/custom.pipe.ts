import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "getUserFirstLetter" })
export class GetUserFirstLetter implements PipeTransform {
  transform(value: string) {
    return value.charAt(0).toUpperCase();
  }
}
