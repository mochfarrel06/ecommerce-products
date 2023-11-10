import React, {useState, useEffect} from "react";
import {Col, Container, Row, Pagination} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import products from "../../utils/data.json";
import {StarFill, List, Grid} from "react-bootstrap-icons";
import {Link, useLocation} from "react-router-dom";
import {searchProducts} from "../../utils";
import FilterSortForm from "./components/FilterSortForm";

// Komponen untuk halaman produk dengan fungsionalitas sorting, filtering, dan pagination.
function ProductPage() {
  // State untuk mengelola tampilan grid atau list
  const [toggleView, setToggleView] = useState(true);
  // State untuk mengelola urutan pengurutan produk
  const [sortOrder, setSortOrder] = useState("asc");
  // State untuk menyimpan produk yang sudah diurutkan dan difilter
  const [sortedProducts, setSortedProducts] = useState([]);
  // State untuk mengelola opsi penyaringan produk
  const [filterOption, setFilterOption] = useState("all");
  // State untuk menentukan jumlah produk per halaman
  const [productsPerPage, setProductsPerPage] = useState(10);
  // State untuk menentukan halaman saat ini
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const location = useLocation();

  // Untuk mengubah tampilan menjadi box atau list
  const handleToggleView = () => {
    setToggleView(!toggleView);
  };

  /**
   * Mengelola perubahan pengurutan, penyaringan, dan jumlah produk per halaman.
   * @param {Event} e - Objek event dari perubahan pada elemen Form.
   */
  const handleSortAndFilter = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue.startsWith("sort")) {
      // Pengguna memilih opsi pengurutan
      setSortOrder(selectedValue.split("_")[1]);
    } else if (selectedValue.startsWith("filter")) {
      // Pengguna memilih opsi filter
      setFilterOption(selectedValue.split("_")[1]);
    } else if (selectedValue.startsWith("perPage")) {
      // Pengguna memilih jumlah produk per halaman
      setProductsPerPage(parseInt(selectedValue.split("_")[1], 10));
      setCurrentPage(1);
    }
  };

  /**
   * Menghitung halaman tergantung pada jumlah produk per halaman.
   * @param {Array} array - Array produk yang akan dipaginasi.
   * @param {number} currentPage - Halaman saat ini.
   * @param {number} productsPerPage - Jumlah produk per halaman.
   * @returns {Array} - Array produk yang ditampilkan pada halaman saat ini.
   */
  const paginate = (array, currentPage, productsPerPage) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return array.slice(startIndex, endIndex);
  };

  useEffect(() => {
    /**
     * Mengurutkan array produk berdasarkan nama.
     * @param {Array} array - Array produk yang akan diurutkan.
     * @param {string} order - Urutan pengurutan ("asc" atau "desc").
     * @returns {Array} - Array produk yang sudah diurutkan.
     */
    const sortProducts = (array, order) => {
      return array.slice().sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (order === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    };

    /**
     * Menerapkan filter pada array produk berdasarkan stok.
     * @param {Array} array - Array produk yang akan difilter.
     * @param {string} filter - Jenis filter ("max" atau "min").
     * @returns {Array} - Array produk yang sudah difilter.
     */
    const filterProducts = (array, filter) => {
      switch (filter) {
        case "maxRatingMaxStock":
          return array.slice().sort((a, b) => {
            if (b.stats.averageRating !== a.stats.averageRating) {
              return b.stats.averageRating - a.stats.averageRating;
            } else {
              return b.stock - a.stock;
            }
          });
        case "maxRatingMinStock":
          return array.slice().sort((a, b) => {
            if (b.stats.averageRating !== a.stats.averageRating) {
              return b.stats.averageRating - a.stats.averageRating;
            } else {
              return a.stock - b.stock;
            }
          });
        default:
          return array;
      }
    };

    // Tanggapi perubahan pada URL
    const searchParams = new URLSearchParams(location.search);
    const searchParam = searchParams.get("search");

    setSearchKeyword(searchParam || "");

    let filteredAndSortedProducts = products.data;

    // Lakukan pencarian berdasarkan parameter pencarian
    if (searchParam) {
      filteredAndSortedProducts = searchProducts(
        filteredAndSortedProducts,
        decodeURIComponent(searchParam)
      );
    }

    filteredAndSortedProducts = filterProducts(
      sortProducts([...filteredAndSortedProducts], sortOrder),
      filterOption
    );

    const paginatedProducts = paginate(
      filteredAndSortedProducts,
      currentPage,
      productsPerPage
    );

    setSortedProducts(paginatedProducts);
  }, [sortOrder, filterOption, productsPerPage, currentPage, location]);

  // Menghitung total halaman berdasarkan jumlah produk per halaman
  const totalPages = Math.ceil(products.data.length / productsPerPage);

  /**
   * Menangani klik tombol halaman sebelumnya.
   */
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  /**
   * Menangani klik tombol halaman berikutnya.
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((nextPage) => nextPage + 1);
    }
  };

  return (
    <div className="products-app">
      <Container>
        <FilterSortForm
          handleToggleView={handleToggleView}
          toggleView={toggleView}
          icon1={<Grid size={12} color="#000" />}
          icon2={<List size={12} color="#000" />}
          handleSortAndFilter={handleSortAndFilter}
          filterOption={filterOption}
        />
        <Row className="overflow-hidden products-container mb-5">
          {sortedProducts.map((datas, i) => (
            <Col
              key={i}
              xl={toggleView ? 2 : 12}
              lg={toggleView ? 3 : 12}
              md={toggleView ? 4 : 12}
              sm={toggleView ? 12 : 12}
              xs={12}
              className="mb-3"
            >
              {toggleView ? (
                <Card className="">
                  <Card.Img
                    variant="top"
                    src={datas.primary_image.thumbnail}
                    className="img-fluid"
                  />
                  <Card.Body className="p-3">
                    <Link to={`/products/${datas.product_id}`}>
                      <Card.Text className="text-truncate">
                        {datas.name}
                      </Card.Text>
                    </Link>
                    <Card.Title className="mt-3">
                      {datas.price.text_idr}
                    </Card.Title>
                    <div className="rating w-100 d-flex flex-column gap-2 mt-3">
                      <div className="d-flex align-items-center gap-2">
                        <StarFill size={14} color="#fed700" />
                        <Card.Text className="mb-0">
                          {datas.stats.averageRating
                            ? datas.stats.averageRating
                            : "0"}{" "}
                          |
                        </Card.Text>
                        {datas.label_groups.map((labels, i) => {
                          if (i >= 0 && i < 1) {
                            return (
                              <Card.Text key={i}>{labels.title}</Card.Text>
                            );
                          }
                        })}
                      </div>
                      <div>
                        <Card.Text>Stock {datas.stock}</Card.Text>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="overflow-hidden">
                  <Row>
                    <Col md={2}>
                      <Card.Img
                        variant="top"
                        src={datas.primary_image.thumbnail}
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={9}>
                      <Card.Body>
                        <Link to={`/products/${datas.product_id}`}>
                          <Card.Text className="text-truncate">
                            {datas.name}
                          </Card.Text>
                        </Link>
                        <Card.Title>{datas.price.text_idr}</Card.Title>
                        <div className="rating d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-column">
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <StarFill size={14} color="#fed700" />
                              <Card.Text>
                                {datas.stats.averageRating
                                  ? datas.stats.averageRating
                                  : "0"}{" "}
                                |
                              </Card.Text>
                            </div>
                            <div>
                              {datas.label_groups.map(
                                (labels, i) =>
                                  i >= 0 &&
                                  i < 1 && (
                                    <Card.Text key={i}>
                                      {labels.title}
                                    </Card.Text>
                                  )
                              )}
                            </div>
                          </div>
                          <div>
                            <Card.Text>Stock {datas.stock}</Card.Text>
                          </div>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              )}
            </Col>
          ))}
        </Row>
        <Row className="border px-4 py-2 justify-content-between">
          <Col md={6} className="d-flex mb-2 mb-md-0">
            <Pagination className="mb-0">
              <Pagination.Prev
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              />
              {Array.from({length: totalPages}).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
          <Col md={3} className="d-flex align-items-center mb-2 mb-md-0">
            Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
            {Math.min(currentPage * productsPerPage, products.data.length)} of{" "}
            {products.data.length} items
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductPage;
