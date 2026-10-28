import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

export default function Products() {
  const [searchText, setSearchText] = useState<string>("");
  const [activeOrder, setActiveOrder] = useState<string>("createdAt");
  const [activeCategory, setActiveCategory] = useState<string>("DISH");

  const orders = [
    { key: "createdAt", label: "New" },
    { key: "productPrice", label: "Price" },
    { key: "productViews", label: "Views" },
  ];

  const categories = [
    { key: "OTHER", label: "Other" },
    { key: "DESSERT", label: "Dessert" },
    { key: "DRINK", label: "Drink" },
    { key: "SALAD", label: "Salad" },
    { key: "DISH", label: "Dish" },
  ];

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
                />
                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
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
      color={"primary"}
      className={"order"}
    >
      New
    </Button>
    <Button
      variant={"contained"}
      color={"secondary"}
      className={"order"}
    >
      Price
    </Button>
    <Button
      variant={"contained"}
      color={"secondary"}
      className={"order"}
    >
      Views
    </Button>
  </Stack>
</Stack>

         <Stack className={"list-category-section"}>
  <Stack className={"product-category"}>
    <Stack className={"category-main"}>
      {categories.map((category) => (
        <Button
          key={category.key}
          variant={"contained"}
          color={
            activeCategory === category.key ? "primary" : "secondary"
          }
          onClick={() => setActiveCategory(category.key)}
        >
          {category.label}
        </Button>
      ))}
    </Stack>
  </Stack>

  <Stack className={"product-wrapper"}>
    {products.length !== 0 ? (
      products.map((product, index) => (
        <Stack key={index} className={"product-card"}>
        <Stack
  className={"product-img"}
  sx={{
    backgroundImage: `url("${product.imagePath}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
            <div className={"product-sale"}>Normal size</div>

            <Button className={"shop-btn"}>
              <img
                src={"/icons/shopping-cart.svg"}
                alt="cart"
                style={{ display: "flex" }}
              />
            </Button>

            <Button className={"view-btn"}>
              <Badge badgeContent={20} color="secondary">
                <RemoveRedEyeIcon sx={{ color: "white" }} />
              </Badge>
            </Button>
          </Stack>

          <Box className={"product-desc"}>
            <span className={"product-title"}>
              {product.productName}
            </span>

            <div className={"product-desc"}>
              <MonetizationOnIcon />
              {15}
            </div>
          </Box>
        </Stack>
      ))
    ) : (
      <Box className={"no-data"}>
        Products are not available!
      </Box>
    )}
  </Stack>
</Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={1}
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