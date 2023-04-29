import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import  { toast } from "react-toastify";
import { deleteProduct, getProducts } from "../../../store/slices/product/productSlice";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import DeleteModal from "../../components/modals/DeleteModal";
import Tabbar from "../../components/tabbar/Tabbar";

export default function Product() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts({ keyword: searchQuery }));
    }, []);

    const products = useSelector(state => state?.product.products);
    console.log(products)

    const handleDelete = () => {
        dispatch(deleteProduct(productToDelete));
        setShowModal(false);
        toast.success(`Successfully deleted  ${productToDelete?.name}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (product) => {
        setProductToDelete(product);
        console.log(product)
        setShowModal(true);
    };

    const handleSearchChange = (event) =>{
        console.log(event.target.value)
        setSearchQuery(event.target.value)
        dispatch(getProducts({ keyword: event.target.value }));
    }
    return (
        <>
             
            <DeleteModal
                show={showModal}
                onHide={handleCloseModal}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete ${productToDelete?.name}?`}
            />
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar products="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side products-page">
                            {/* 1 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <h3 className="mb-3 text-secondary"> Products</h3>
                                <Link to="/admin-add-products" className="btn btn-secondary btn-lg fs-17"><i className="fa-solid fa-plus" /><span className="ms-2">Add products</span></Link>
                            </div>

                            {/* 2 */}
                            <div className="d-flex align-items-center justify-content-between search-buttons">
                                <h5 className="fs-18 text-secondary">Showing {products.length} Entries</h5>

                                <div className="input-group mb-3">
                                    <input onChange={handleSearchChange} type="text" className="form-control" placeholder="Search for products" aria-label="Search for products" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="table-div overflow mt-4">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Genre</th>
                                            <th title="Actual price" scope="col">Price</th>
           
                                            <th scope="col">Description</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow">
                                        {
                                            products.map((data) => {
                                                return (
                                                    <tr key={data?.id}>
                                                        <td>{data?.id}</td>
                                                        <td><p style={{width: "180px"}} className="text-truncate">{data?.name}</p></td>
                                                        <td><img className="img-thumbnail" src={`http://localhost:5000/images/${data?.img1}`} alt="product" /></td>
                                                        <td>{data?.genre}</td>
   
                                                        <td>{(data?.price) - (data?.discount)}</td>
                                                        <td><p style={{width: "150px"}} className="text-truncate">{data?.description}</p></td>
                                                        <td>
                                                            <button className="btn p-0" onClick={() => handleShowModal(data)} >
                                                                <i className="fa-solid fa-trash-can del" />
                                                            </button>
                                                            <Link to={`/admin-products/edit-product/${data.id}`} ><i className="fa-regular fa-pen-to-square edit" /></Link >
                                                            <Link to={`/admin-products/view-product/${data.id}`}><i className="fa-regular fa-eye view" /></Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination d-flex justify-content-center mt-4">
                                <nav aria-label="..." className="pe-5">
                                    <ul className="pagination pe-5">
                                        <li className="page-item">
                                            <Link className="page-link">Previous</Link>
                                        </li>
                                        <li className="page-item"><Link className="page-link">1</Link></li>
                                        <li className="page-item active" aria-current="page">
                                            <Link className="page-link">2</Link>
                                        </li>
                                        <li className="page-item"><Link className="page-link">3</Link></li>
                                        <li className="page-item">
                                            <Link className="page-link">Next</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}