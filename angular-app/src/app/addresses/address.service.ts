// address.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Address } from './address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressesUrl = '/addresses'; // Your API endpoint

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET all addresses */
  getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.addressesUrl)
      .pipe(
        catchError(this.handleError<Address[]>('getAllAddresses', []))
      );
  }

  /** DELETE all addresses */
  deleteAllAddresses(): Observable<Address[]> {
    return this.http.delete<Address[]>(this.addressesUrl)
      .pipe(
        catchError(this.handleError<Address[]>('deleteAllAddresses', []))
      );
  }

  /** DELETE address by id */
  deleteAddressById(id: number): Observable<Address> {
    const url = `${this.addressesUrl}/${id}`;
    return this.http.delete<Address>(url, this.httpOptions).pipe(
      catchError(this.handleError<Address>('deleteAddressById'))
    );
  }

  /** PUT: update address by id */
  updateAddressById(address: Address): Observable<any> {
    const url = `${this.addressesUrl}/${address.id}`;
    return this.http.put(url, address, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateAddressById'))
    );
  }

  /** PUT: update entire collection of addresses */
  updateAddressCollection(addresses: Address[]): Observable<Address[]> {
    return this.http.put<Address[]>(this.addressesUrl, addresses, this.httpOptions)
      .pipe(
        catchError(this.handleError<Address[]>('updateAddressCollection', []))
      );
  }

  /** POST: add a collection of addresses */
  addAddressCollection(addresses: Address[]): Observable<Address[]> {
    return this.http.post<Address[]>(`${this.addressesUrl}/add-address-collection`, addresses, this.httpOptions)
      .pipe(
        catchError(this.handleError<Address[]>('addAddressCollection', []))
      );
  }

  /** Handle Http operation that failed */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}

