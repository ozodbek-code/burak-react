import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enam";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));




export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever); 
  const [productSearch, setProductSearch] = useState<ProductInquiry> ({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
  });
  
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if(searchText === "") {
      productSearch.search = "";
      setProductSearch({...productSearch});
    }
  }, [searchText]);

  /** HANDLERS */

const searchCollectionHandler = (collection: ProductCollection) => {
  setProductSearch({ 
    ...productSearch,
    page: 1,
    productCollection: collection });
};

const searchOrderHandler = (order: string) => {
   productSearch.page = 1;
   productSearch.order = order;
   setProductSearch({...productSearch});
};

const searchProductHandler = () => {
  productSearch.search = searchText;
  setProductSearch({...productSearch});
};

const paginationHandler = (e: ChangeEvent<any>, value: number) => {
   productSearch.page = value;
   setProductSearch({...productSearch})
};

const chooseDishHandler = (id: string) => {
   history.push(`/products/${id}`)
}

  return (
    <div className={"products-page"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-title"}>
              <Box className={"category-title"}>Burak Restaurant</Box>
              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if(e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice" ? "primary" : "secondary"
                }
                className={"order"}
                 onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productViews" ? "primary" : "secondary"
                }
                className={"order"}
                 onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Stack className={"category-main"}>
                <Button
                variant= {"contained"}
                color={
                  productSearch.productCollection === ProductCollection.DISH 
                  ? "primary" 
                  : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                >
                  Dish
                </Button>

               <Button
                variant= {"contained"}
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                  ? "primary" 
                  : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                >
                  Other
                </Button>
                <Button 
                variant={"contained"} 
                color={
                  productSearch.productCollection === ProductCollection.DESSERT
                  ? "primary" 
                  : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
                >
                  Dessert
                </Button>
                 <Button 
                 variant={"contained"}
                 color={
                  productSearch.productCollection === ProductCollection.DRINK
                  ? "primary" 
                  : "secondary"}
                  onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
                  >
                  Drink
                </Button>
                 <Button 
                 variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.SALAD
                  ? "primary" 
                  : "secondary"}
                 onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                  >
                  Salad
                </Button>
              </Stack>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " litre "
                      : product.productSize + " size ";
                  return (
                    <Stack key={product._id} className={"product-card"} 
                    onClick={() => chooseDishHandler(product._id)}>
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url("${imagePath}")`,
                        }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>

                        <Button className={"shop-btn"}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            alt="cart"
                            style={{ display: "flex" }}
                          />
                        </Button>

                        <Button className={"view-btn"}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "grey" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                 
                      <Box className={"product-desc-box"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>

                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <Box className={"category-title"}>Our Family Brands</Box>
          <Stack className={"brand-list"}>
            <Box className={"review-box"}>
              <img src={"/img/gurme.webp"} alt="Gurme" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/sweets.webp"} alt="Sweets" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/seafood.webp"} alt="Seafood" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/doner.webp"} alt="Doner" />
            </Box>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our Address</Box>
            <iframe
              title="Burak Restaurant location"
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3!2d126.97!3d37.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMzJzM2LjAiTiAxMjbCsDU4JzEyLjAiRQ!5e0!3m2!1sen!2skr!4v1"
              width="1320"
              height="500"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}