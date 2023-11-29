import { Tag } from './../shared/models/Tag';
import { Injectable } from '@angular/core';
import { Store } from '../shared/models/Store';
import { sample_stores, sample_tags, } from 'src/data';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:1337/api';
  constructor(private http: HttpClient) { }

  getAll(): Store[] {
    return sample_stores;

  }

  getAllStoreBySearchTerm(searchTerm: string) {
    return this.getAll().filter(store => store.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllStoreByTagName(tag: string): Store[] {
    return this.getAll().filter(store => store.tags?.includes(tag));
  }

  getCurrentStoreAddress() {
    return this.http.get(`${this.apiUrl}/stores`);
  }

}

