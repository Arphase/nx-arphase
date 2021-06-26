export type UpdateProductPropertiesDto = {
  productComponents?: UpdateProductPropertyDto[];
  additionalOptions?: UpdateProductPropertyDto[];
  productId: number;
};

export interface UpdateProductPropertyDto {
  id: number;
  _destroy: boolean;
}
