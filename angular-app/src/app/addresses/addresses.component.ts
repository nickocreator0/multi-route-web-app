// addresses.component.ts

import { Component, OnInit } from '@angular/core';
import { Address } from './address.model';
import { AddressService } from './address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses: Address[] = [];

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
    this.getAllAddresses();
  }

  getAllAddresses(): void {
    this.addressService.getAllAddresses()
      .subscribe(addresses => this.addresses = addresses);
  }

  deleteAllAddresses(): void {
    this.addressService.deleteAllAddresses()
      .subscribe(() => {
        // Refresh the address list after deletion
        this.getAllAddresses();
      });
  }

  deleteAddressById(id: number): void {
    this.addressService.deleteAddressById(id)
      .subscribe(() => {
        // Refresh the address list after deletion
        this.getAllAddresses();
      });
  }

  updateAddressById(address: Address): void {
    this.addressService.updateAddressById(address)
      .subscribe();
  }

  updateAddressCollection(addresses: Address[]): void {
    this.addressService.updateAddressCollection(addresses)
      .subscribe();
  }

  addAddressCollection(addresses: Address[]): void {
    this.addressService.addAddressCollection(addresses)
      .subscribe(() => {
        // Refresh the address list after deletion
        this.getAllAddresses();
      });
  }
}

