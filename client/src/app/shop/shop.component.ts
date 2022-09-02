import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/prodictType';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchterm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'PriceL Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopServices: ShopService) {
    this.shopParams = this.shopServices.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false) {
    this.shopServices.getProducts(useCache).subscribe(
      (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopServices.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopServices.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    const params = this.shopServices.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopServices.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopServices.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopServices.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string) {
    const params = this.shopServices.getShopParams();
    params.sort = sort;
    this.shopServices.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any) {
    debugger;
    const params = this.shopServices.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopServices.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch() {
    const params = this.shopServices.getShopParams();
    params.search = this.searchterm.nativeElement.value;
    params.pageNumber = 1;
    this.shopServices.setShopParams(params);
    this.getProducts();
  }

  onReset() {
    this.searchterm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopServices.setShopParams(this.shopParams);
    this.getProducts();
  }
}
