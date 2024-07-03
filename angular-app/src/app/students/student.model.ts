import {Address} from "../addresses/address.model";
import {Account} from "../accounts/account.model";
import {Team} from "../teams/team.model";

export class Student {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  address?: Address;
  account?: Account;
  teamList?: Team[];


  constructor(
    firstname: string, lastname: string, email: string, telephone: string, address: Address, account: Account, teamList: Team[]) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.telephone = telephone;
    this.address = address;
    this.account = account;
    this.teamList = teamList;
  }

}
