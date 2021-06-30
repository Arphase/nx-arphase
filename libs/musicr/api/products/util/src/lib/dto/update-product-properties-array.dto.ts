export type UpdateProductPropertiesDto = {
  additionalOptions?: UpdateProductPropertyDto[];
  productId: number;
};

export interface UpdateProductPropertyDto {
  id: number;
  _destroy: boolean;
}
